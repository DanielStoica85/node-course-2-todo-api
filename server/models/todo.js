var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		// remove leading or trailing white space:
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	},
	// will store the id of the user who created it
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

module.exports = {
	Todo
}