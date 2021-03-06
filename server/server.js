var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var cors = require('cors');

var {mongoose} = require('./db/mongoose');
var {Post} = require('./models/post');
var {Read} = require('./models/read');  
var {Work} = require('./models/work');    

var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/work', (req, res) => {
	
	Work.find()
		.then((works) => {
			res.send({works});
		}, (e) => {
			res.status(404).send(e);
		})
});

app.get('/read', (req, res) => {
	
	Read.findOne({
		handle: "OWL"
	})
	// .then((reads) => {
	// 	res.send({reads});
	// }, (e) => {
	// 	console.log(e);
	// })
	.then((read) => {
		if(!read){
			return res.status(404).send();
		}

		res.send({
			booksread          : read.books_read,
			pagesread          : read.pages_read,
			lastestread_author : read.last_read.author,
			lastestread_title  : read.last_read.title

			});

	}).catch((e) => {
		console.log(e);
		res.status(400).send();
	});
});


app.get('/recent/:categoryslug', (req, res) => {
	var categoryslug = req.params.categoryslug;

	Post.find({
		primary_category: categoryslug
	})
	.limit(6)
	.sort( {date: -1} )
	.then((posts) => {
		res.send({posts});
	}, (e) => {
		res.status(404).send(e);
	})
});

app.get('/:categoryslug', (req, res) => {
	var categoryslug = req.params.categoryslug;

	Post.find({
		primary_category: categoryslug
	}).then((posts) => {
		res.send({posts});
	}, (e) => {
		res.status(404).send(e);
	})
});

app.get('/:categoryslug/:postslug', (req, res) => {
	
	var postslug = req.params.postslug;
	
	Post.findOne({
		slug: postslug
	}).then((post) => {
		if(!post){
			return res.status(404).send();
		}

		res.send({
			post        : post._id,
			postid      : post.id,
			postdate    : post.date,
			postdatgmt  : post.date_gmt,
			postslug    : post.slug,
			postcategory: post.primary_category,
			posttitle   : post.title.rendered,
			postcontent : post.content.rendered
		});
		
	}).catch((e) => {
		res.status(400).send();
	});
});


app.listen(port, () => {
	console.log(`Started on port ${port}`);
});
