// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, db) => {
	if (err) {

		// use "return" instead of "if/else"
		return console.log('Unable to connect to MongoDB server.');
	}
	console.log('Connected to MongoDB server.');

	// deleteMany

	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// deleteOne

	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(function(result) {
	// 	console.log(result);
	// })

	//findOneAndDelete

	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result);
	// })

	// delete names 'Daniel'

	db.collection('Users').deleteMany({name: 'Daniel'}).then((result) => {
		console.log(result);
	});

	// delete 'Ghita' by id

	 db.collection('Users').findOneAndDelete({_id: new ObjectID('592f1e8a80af8b08bc049a72')}).then((result) => {
	 	console.log(result);
	 });


	// db.close();
});

