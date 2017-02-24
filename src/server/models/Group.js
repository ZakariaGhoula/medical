'use strict';

var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    id: {type: String, unique: true},
    name: String,
    private: Boolean,
    listUser: Array,
    users: Array,
    media: Object,
    createdAt: String,
    password: String,
    updatedAt: String
});

module.exports = mongoose.model('Group', groupSchema);