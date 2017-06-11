// all of this is ignored by heroku, where env = 'production'

var env = process.env.NODE_ENV || 'development';


// get properties from config.json, which will be ignored by git
if (env === 'development' || env === 'test') {
	var config = require('./config.json');
	var envConfig = config[env];

	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	});
}

// if (env === 'development') {
// 	process.env.port = 3000;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp';
// } else if (env === 'test') {
// 	process.env.port = 3000;
// 	process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest';
// }