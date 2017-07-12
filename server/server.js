var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var cors = require('cors');

var {mongoose} = require('./db/mongoose');
var {Post} = require('./models/post');

var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());


app.get('/:categoryslug/:postslug', (req, res) => {
	// res.send(req.params.postslug);
	var postslug = req.params.postslug;
	//
	Post.findOne({
		slug: postslug
	}).then((post) => {
		if(!post){
			return res.status(404).send();
		}

		res.send({
			post: post._id,
			postid: post.id,
			postdate: post.date,
			postdatgmt: post.date_gmt,
			postslug: post.slug,
			postcategory: post.primary_category,
			posttitle: post.title.rendered,
			postcontent: post.content.rendered
		});
		//console.log('post: ', post);
	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () => {
	console.log(`Started on port ${port}`);
});
