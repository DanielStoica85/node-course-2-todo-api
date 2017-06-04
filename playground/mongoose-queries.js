const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js')

var id = '593091bb6ba9e61c1c387a7a';

if (!ObjectID.isValid(id)) {
	console.log('Id not valid.');
}

// query by an argument or by nothing
// works with strings and can convert them in object ids
Todo.find({
	_id: id
}).then((todos) => {
	console.log('Todos:', todos);
});

// returns first item that matches the query
Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo:', todo);
});

// returns a document by it's identifier
Todo.findById(id).then((todo) => {
	if (!todo) {
		return console.log('Id not found.');
	}
	console.log('Todo by id:', todo);
}).catch((e) => {
	console.log(e);
});

var userId = '5930732513c84309f04e4f16';

User.findById(userId).then((user) => {
	if (!user) {
		return console.log('User not found!');
	}
	console.log('User by id:', user);
}).catch((e) => console.log(e));