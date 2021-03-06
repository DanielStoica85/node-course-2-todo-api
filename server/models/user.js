const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// USER Example:

// {
// 	email: 'andrew@example.com',
// 	password: 'kdshkajdhkdshkhdadsh'
// 	tokens: [{
// 		access: 'auth',
// 		token: 'kjhsjkhfjkhkjhdj'
// 	}]
// }

var UserSchema = new mongoose.Schema({
	email : {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value);
			},
			message: '{VALUE} is not a valid email.'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

// override method to decide what gets returned when mongoose model is JSONed
// this method is automatically called by res.send()
UserSchema.methods.toJSON = function() {
	var user = this;
	// from mongoose model to object
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
}

// add an INSTANCE method for creating a token and adding it to the user
UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';
	// generate token by using: 1. object to be signed 2. secret value
	var token = jwt.sign({_id: user._id.toHexString(), access: access}, process.env.JWT_SECRET).toString();
	// add access and newly generated token to tokens array of user
	user.tokens.push({
		access: access,
		token: token
	})

	// instead of Promise chained to a Promise, we just return the token
	// will chain to this when calling method in server.js
	return user.save().then(() => {
		return token;
	});
}

// add an instance method for deleting token
UserSchema.methods.removeToken= function(token) {
	var user = this;

	// $pull ->mongodb operator to remove items from an array that matches a criteria 
	return user.update({
		$pull: {
			tokens: {
				token: token
			}
		}
	});

};

// add a MODEL method
UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	// use try.catch because jwt.verify returns errors if something is incorrect
	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}

	// use return because it is a promise and we will chain to it
	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

// model method to find by credentials
UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;

	return User.findOne({email: email}).then((user) => {
		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (!res) {
					reject();
				}
				else {
					resolve(user);
				}
			});
		});
	});
};

// mongoose middleware to be run before user save takes place
// if password was modified, hashit and save it
UserSchema.pre('save', function(next) {
	var user = this;

	if (user.isModified('password') === true) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});

	} else {
		next();
	}
})

var User = mongoose.model('User', UserSchema);

module.exports = {User}