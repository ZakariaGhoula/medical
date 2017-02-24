'use strict';

var mongoose = require('mongoose');

var calendarParamsSchema = mongoose.Schema({
    id: {type: String, unique: true},
    groupId: String,

    levelCross: Object,
    nbr_day_off: String,
    nbr_by_watch: String,
    length_hour_watch: String,

});

module.exports = mongoose.model('Calendar_Parameters', calendarParamsSchema);