require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');

var app = express();
const port = process.env.PORT;

// middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {

	Todo.find().then((todos) => {
		res.send({todos: todos});
	}, (e) => {
		res.status(400).send(e);
	});

});

app.get('/todos/:id', (req, res) => {
	
	// validate id, if not respond with 404 and empty body
		// findById 
			// success - if todo - send it back
			// if no todo - send 404 with empty body
			// error - 400 with empty body

	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		res.status(400).send();
	}
	else {
		Todo.findById(id).then((todo) => {
			if (!todo) {
				res.status(404).send();
			}
			else {
				res.status(200).send({todo});
			}
		}).catch((e) => {
			res.status(500).send();
		}
	)};

});

app.delete('/todos/:id', (req, res) => {

	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		res.status(400).send();
	}
	else {
		Todo.findByIdAndRemove(id).then((todo) => {
			if (!todo) {
				res.status(404).send();
			}
			else {
				res.status(200).send({todo});
			}
		}).catch((e) => {
			res.status(500).send();
		});
	}

});

app.patch('/todos/:id', (req, res) => {

	var id = req.params.id;
	// extract properties that user should be able to update
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		res.status(400).send();
	}
	else {
		if (_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		}
		else {
			body.completed = false;
			body.completedAt = null;
		}
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			res.status(404).send();
		}
		else {
			res.send({todo: todo});
		}
	}).catch((e) => {
		res.status(400).send();
	})

});

app.post('/users', (req, res) => {
	// create new user in db with only email and password
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	// save user, generate token, save user with token, return user with token as header
	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
});

// require authentication, find the associated user and send it back
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});


app.listen(port, () => {
	console.log(`Started on port ${port}.`);
});

module.exports = {app};