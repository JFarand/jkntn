var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
	id: {
		type: Number
	},
	date: {
		type: String
	},
	date_gmt: {
		type: String
	},
	slug: {
		type: String
	},
	primary_category: {
		type: String
	},
	title: {
		rendered: {
			type: String
		}
	},
	content: {
		rendered: {
			type: String
		}
	}
});

module.exports = {Post};
