const {ObjectID} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
	console.log(`Started on port ${port}.`);
});

module.exports = {app};