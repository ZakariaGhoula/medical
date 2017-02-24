var mongoose = require('mongoose');

var conversationSchema = mongoose.Schema({
    userId: String,
    isAdmin: Boolean,
    isSubAdmin: Boolean,
    createdAt: String,
    updatedAt: String
});

module.exports = mongoose.model('GroupUser', conversationSchema);