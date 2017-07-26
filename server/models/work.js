var mongoose = require('mongoose');

var Work = mongoose.model('Work', {
	imageurl: {
		type: String
	},
	client: {
		type: String
	},
	type: [String]
});

module.exports = {Work};
