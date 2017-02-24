'use strict';

var mongoose = require('mongoose');

var calendarParamsSchema = mongoose.Schema({
    id: {type: String, unique: true},
    groupId: String,
    date: String,
    r1: Boolean,
    r2: Boolean,
    r3: Boolean,
    r4: Boolean,
    r5: Boolean,

});

module.exports = mongoose.model('Calendar_Days_off', calendarParamsSchema);