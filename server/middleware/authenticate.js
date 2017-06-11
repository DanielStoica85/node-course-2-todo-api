var {User} = require('./../models/user.js');

var authenticate = (req, res, next) => {
	// 1. get token from request header
	var token = req.header('x-auth');
	// 2. find the user related to token and return it in promise
	// 3. modify request user and token if found
	User.findByToken(token).then((user) => {
		if (!user) {
			return Promise.reject();
		}

		req.user = user;
		req.token = token;
		next();
	}).catch((e) => {
		res.status(401).send();
	});
};

module.exports = {
	authenticate: authenticate
}