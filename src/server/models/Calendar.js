'use strict';

var mongoose = require('mongoose');

var calendarParamsSchema = mongoose.Schema({
    id: {type: String},
    groupId: String,
    date_start: String,
    date_end: String,
    nbr_by_watch: String,
    dispatch: Array,
    is_active: Boolean,
    date_created:String,
    date_updated:String


});

module.exports = mongoose.model('Calendar', calendarParamsSchema);