var mongoose = require('mongoose');

var Read = mongoose.model('Read',{
    books_read: {
        type: Number
    },
    pages_read: {
        type: Number
    },
    last_read: {
        author: {
            type: String
        },
        title: {
            type: String
        }
    }

}, 'read');

module.exports = {Read};