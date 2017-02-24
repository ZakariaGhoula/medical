var mongoose = require('mongoose');



var PageSchema = mongoose.Schema({
    id: { type: String, unique: true },
    lang: String,
    page: String,
    content: Object,

});

module.exports = mongoose.model('Page', PageSchema);