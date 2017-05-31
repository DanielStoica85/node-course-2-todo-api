// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
	if (err) {

		// use "return" instead of "if/else"
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.');

	// db.collection('Todos').find({completed: false}).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos.', err);
	// })

	// db.collection('Todos').find({
	// 	_id: new ObjectID('592f1bdae4ef0a23f8f22420')
	// }).toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos.', err);
	// })

	// db.collection('Todos').find().count().then((count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.log('Unable to fetch todos.', err);
	// });

	db.collection('Users').find({name: 'Daniel'}).toArray().then(function(users) {
		console.log('Users with the name Daniel:');
		console.log(JSON.stringify(users, undefined, 2));
	}, (err) => {
		console.log('unable to fetch users with Daniel as name.');
	})


	// db.close();
});

