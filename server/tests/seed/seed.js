const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo.js');
const{User} = require('./../../models/user.js');



const userOneId = new ObjectID();
const userTwoId = new ObjectID();

// add user with x-auth token and user without x-auth token
const users = [{
	_id: userOneId,
	email: 'daniel@example.com',
	password: 'userOnePass',
	tokens: [{
		access: 'auth',
		token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
	}]
}, {
	_id: userTwoId,
	email: 'alina@example.com',
	password: 'userTwoPass'
}];

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done();
	})
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		Promise.all([userOne, userTwo]).then(() => {
			done();
		});
	});
};

module.exports = {todos, populateTodos, users, populateUsers};