'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    id: String,
    groupId: String,
    userId: String,
    content: Object,
    time: String
});

module.exports = mongoose.model('Message', messageSchema);