const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js')

// remove multiple documents

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// remove first found document which will be returned
Todo.findOneAndRemove({_id: '5935ae04e99afae06c27ac97'}).then((todo) => {
	console.log(todo);
})

// remove first found by id and remove (will also be returned)
Todo.findByIdAndRemove('5935ae04e99afae06c27ac97').then((todo) => {
	console.log(todo);
});