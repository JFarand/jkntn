var mongoose = require('mongoose');

var Read = mongoose.model('Read',{
    books_read: {
        type: number
    },
    pages_read: {
        type: number
    },
    last_read: {
        author: {
            type: string
        },
        title: {
            type: string
        }
    }

});

module.exports = {Read};