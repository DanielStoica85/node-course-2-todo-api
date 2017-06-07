// all of this is ignored by heroku, where env = 'production'

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	process.env.port = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp';
} else if (env === 'test') {
	process.env.port = 3000;
	process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest';
}