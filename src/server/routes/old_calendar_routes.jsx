var Group = require('../models/Group');
var bodyparser = require('body-parser');
var CalendarDayOff = require('../models/CalendarDayOff');
var CalendarParams = require('../models/CalendarParameters');
var User = require('../models/User');
var _ = require('lodash');
var fs = require('fs');
import mongoose from 'mongoose';
import moment from 'moment';

var enumerateDaysBetweenDates = function (startDate, endDate) {
    var dates = [];


    var currDate = moment(startDate).subtract(1, "day").clone().startOf('day');

    var lastDate = moment(endDate).clone().startOf('day');

    while (currDate.add('days', 1).diff(lastDate) <= 0) {
        //console.log(currDate.toDate());
        dates.push(currDate.clone().toDate());
    }

    return dates;
}


var getDayOff = function (date_search, array_of) {
    var day_picked = _.filter(array_of, function (day) {
        // console.log(date_search);
        // console.log(moment(date_search).startOf("day"));
        return moment(day.date).startOf("day").clone().diff(moment(date_search).startOf("day").clone()) == 0
    });
    if (typeof day_picked[0] !== "undefined") {
        return (day_picked[0]);
    }
    return null;
}

var getUserUsed = function (listDateSearch, list_used) {
    var users = _.filter(list_used, function (day) {
        for (var i in listDateSearch) {
            return moment(day.date).clone().diff(moment(listDateSearch[i]).clone()) == 0
        }
    });
    return users;
}

var getUsersForDayOff = function (day_off, list_user, list_id_user_used) {

    var list_rang = [];
    var final_return = [];
    if (day_off.r1) {
        list_rang.push("R1");
    }
    if (day_off.r2) {
        list_rang.push("R2");
    }
    if (day_off.r3) {
        list_rang.push("R3");
    }
    if (day_off.r4) {
        list_rang.push("R4");
    }
    if (day_off.r5) {
        list_rang.push("R5");
    }
    if (list_rang.length == 0) {
        for (var i in list_user) {
            var user = list_user[i];
            if (list_id_user_used.indexOf(user._id) < 0) {
                final_return.push(user);
            }
        }
    }
    else {
        for (var i in list_user) {
            var user = list_user[i];
            if (list_id_user_used.indexOf("" + user._id) < 0 && list_rang.indexOf(user.level) >= 0) {
                final_return.push(user);
            }
        }
    }
    return final_return;

}
var getUserNotUsedNormalDay = function (list_user, list_id_user_used) {
    var final_return = [];
    for (var i in list_user) {
        var user = list_user[i];
        if (list_id_user_used.indexOf("" + user._id) < 0) {
            final_return.push(user);
        }
    }
    return final_return;

}

var select_user_dayoff = function (user_to_select, day_off, nbr_to_select) {
    var final_return = [];
    var user_to_select = _.uniq(user_to_select);

    //--- 1 condition
    var list_rang = [];
    if (day_off.r1) {
        list_rang.push("R1");
    }
    if (day_off.r2) {
        list_rang.push("R2");
    }
    if (day_off.r3) {
        list_rang.push("R3");
    }
    if (day_off.r4) {
        list_rang.push("R4");
    }
    if (day_off.r5) {
        list_rang.push("R5");
    }


    if (user_to_select.length < nbr_to_select) {
        nbr_to_select = user_to_select.length;

    }

    if (list_rang.length > 0) {
        var nfound = false;
        while (final_return.length < nbr_to_select && nfound == false) {
            for (var i in list_rang) {
                var r = list_rang[i];
                for (var i in user_to_select) {
                    var user = user_to_select[i];
                    if (r == user.level && final_return.length < nbr_to_select) {
                        if (final_return.indexOf(user) < 0) {
                            final_return.push(user);
                            break;
                        }

                    }
                }
                if (final_return.length == nbr_to_select) {

                    break;
                }
            }
            if (final_return.length == nbr_to_select) {
                break;
            }
            if (final_return.length == 0) {
                console.log('rien day off');
                nfound = true;
                break;
            }
        }
        /* for (var i in user_to_select) {
         var user = user_to_select[i];

         if (list_rang.indexOf(user.level) >= 0 && final_return.length <= nbr_to_select) {
         final_return.push(user_to_select[i])
         }
         }*/
        /*
         if (list_rang.length < nbr_to_select) {
         }
         else {
         for (var i in user_to_select) {
         var user = user_to_select[i];
         var user_prev = (typeof final_return[final_return.length - 1] !== "undefined") ? final_return[final_return.length - 1] : null;
         if (list_rang.indexOf(user.level) >= 0 && final_return.length < nbr_to_select) {
         //if(user_prev!=null && user_prev.level !=)
         final_return.push(user_to_select[i])
         list_rang.splice(user.level, 1);
         //list_rang.pop(user.level);
         }
         }
         }*/
    }
    else {
        for (var i in user_to_select) {

            if (final_return.length < nbr_to_select)
                final_return.push(user_to_select[i])
        }
    }

    return final_return;
}
var select_normal_rang = function (params) {
    var list_rang = [];
    list_rang['R1'] = [];
    list_rang['R2'] = [];
    list_rang['R3'] = [];
    list_rang['R4'] = [];
    list_rang['R5'] = [];

    //--- params
    /* "r4_5": false,
     "r3_5": false,
     "r3_4": false,
     "r2_5": false,
     "r2_4": true,
     "r2_3": false,
     "r1_5": false,
     "r1_4": false,
     "r1_3": true,
     "r1_2": false*/
    if (params.r1_2) {
        list_rang['R1'].push("R2");
        list_rang['R2'].push("R1");

    }
    if (params.r1_3) {
        list_rang['R1'].push("R3");
        list_rang['R3'].push("R1");
    }
    if (params.r1_4) {
        list_rang['R1'].push("R4");
        list_rang['R4'].push("R1");
    }
    if (params.r1_5) {
        list_rang['R1'].push("R5");
        list_rang['R5'].push("R1");
    }
    if (params.r2_3) {
        list_rang['R2'].push("R3");
        list_rang['R3'].push("R2");
    }
    if (params.r2_4) {
        list_rang['R2'].push("R4");
        list_rang['R4'].push("R2");
    }
    if (params.r2_5) {
        list_rang['R2'].push("R5");
        list_rang['R5'].push("R2");
    }
    if (params.r3_4) {
        list_rang['R3'].push("R3");
        list_rang['R4'].push("R3");
    }
    if (params.r3_5) {
        list_rang['R3'].push("R5");
        list_rang['R5'].push("R3");
    }
    if (params.r4_5) {
        list_rang['R4'].push("R5");
        list_rang['R5'].push("R4");
    }

    return list_rang;
}
var select_user_normal = function (user_to_select, params, nbr_to_select) {

    var final_return = [];
    var user_to_select = _.uniq(user_to_select);
    if (user_to_select.length < nbr_to_select) {
        nbr_to_select = user_to_select.length;

    }

    var element_first = _.sample(user_to_select);
    if (typeof element_first.level !== "undefined") {
        var element_level = element_first.level;
        var oposite_level_list = params[element_level];
        final_return.push(element_first);
    }
    else {
        var element_first = _.sample(user_to_select);
        var element_level = element_first.level;
        var oposite_level_list = params[element_level];
        final_return.push(element_first);

    }


    var nfound = false;

    if (oposite_level_list.length > 0) {
        var found = false;
        for (var i in oposite_level_list) {
            var r = oposite_level_list[i];
            for (var j in user_to_select) {
                var user = user_to_select[j];
                if (r == user.level && final_return.length < nbr_to_select) {
                    if (final_return.indexOf(user) < 0) {
                        found = true;
                    }
                }
            }
        }

        if (found) {
            console.log("on a trouvé un complementaire");
            while (final_return.length < nbr_to_select) {


                for (var i in oposite_level_list) {
                    var r = oposite_level_list[i];
                    for (var i in user_to_select) {
                        var user = user_to_select[i];
                        if (r == user.level && final_return.length < nbr_to_select) {
                            if (final_return.indexOf(user) < 0) {
                                final_return.push(user);
                                break;
                            }

                        }
                    }

                    if (final_return.length == nbr_to_select) {

                        break;
                    }
                    if (final_return.length == 0) {
                        nfound = true;
                        console.log('rien day on');
                    }
                }
                if (typeof final_return[final_return.length - 1] !== "undefined") {
                    oposite_level_list = params[final_return[final_return.length - 1].level]
                }

                if (final_return.length == nbr_to_select) {
                    break;
                }

            }
        }
        else {
            for (var i in user_to_select) {

                if (final_return.length < nbr_to_select)
                    final_return.push(user_to_select[i])
            }
        }
    }


    /*
     /* for (var i in user_to_select) {
     var user = user_to_select[i];

     if (list_rang.indexOf(user.level) >= 0 && final_return.length <= nbr_to_select) {
     final_return.push(user_to_select[i])
     }
     }
     /*
     if (list_rang.length < nbr_to_select) {
     }
     else {
     for (var i in user_to_select) {
     var user = user_to_select[i];
     var user_prev = (typeof final_return[final_return.length - 1] !== "undefined") ? final_return[final_return.length - 1] : null;
     if (list_rang.indexOf(user.level) >= 0 && final_return.length < nbr_to_select) {
     //if(user_prev!=null && user_prev.level !=)
     final_return.push(user_to_select[i])
     list_rang.splice(user.level, 1);
     //list_rang.pop(user.level);
     }
     }
     }
     }
     else {
     for (var i in user_to_select) {

     if (final_return.length < nbr_to_select)
     final_return.push(user_to_select[i])
     }
     }*/

    return final_return;

}
module.exports = function (router) {
    router.use(bodyparser.json());


    //--- udpate user
    router.post('/calendar/update_calendar_params', function (req, res) {


        if (!req.body.token) {

            return res.status(500).json({error: "Token is required."});
        }
        if (!req.body.groupId) {

            return res.status(500).json({error: "groupId is required."});
        }
        if (!req.body.userId) {

            return res.status(500).json({error: "UserId is required."});
        }


        CalendarParams.update(
            {groupId: (req.body.groupId)},
            {
                $set: {
                    groupId: (req.body.groupId),
                    levelCross: req.body.levelCross,
                    nbr_day_off: req.body.nbr_day_off,
                    nbr_by_watch: req.body.nbr_by_watch,
                    length_hour_watch: req.body.length_hour_watch,
                }

            }, {
                upsert: true
            },
            function (err2, data) {
                if (err2) {
                    console.log(err2);
                    return res.status(500).json({error: 'Something went wrong, please try later.'});
                    // req.session.historyData.message = 'Something went wrong, please try later.'
                }


                CalendarParams.findOne({groupId: req.body.groupId}, {

                    groupId: 1,
                    levelCross: 1,
                    nbr_day_off: 1,
                    nbr_by_watch: 1,
                    length_hour_watch: 1,
                    id: 1
                }, function (err3, data3) {
                    if (err3) {
                        console.log(err3);
                        return res.status(500).json({msg: 'internal server error'});
                    }


                    res.json(data3);


                });

            }
        )


    });


    //--- get params calendar
    router.get('/calendar/get_calendar_params/:groupId', function (req, res) {
        if (!req.params.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        CalendarParams.findOne({groupId: req.params.groupId}, {
            groupId: 1,
            levelCross: 1,
            nbr_day_off: 1,
            nbr_by_watch: 1,
            length_hour_watch: 1,
            id: 1
        }, function (err3, data3) {
            if (err3) {
                console.log(err3);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(data3);
        });
    });

    //--- get params calendar
    router.post('/calendar/add_day_off', function (req, res) {
        if (!req.body.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        if (!req.body.token) {
            return res.status(500).json({error: "token is required."});
        }
        if (!req.body.userId) {
            return res.status(500).json({error: "userId is required."});
        }

        var date_off = moment(req.body.date).format();

        var data = {
            groupId: req.body.groupId,
            date: date_off,
            r1: req.body.r1,
            r2: req.body.r2,
            r3: req.body.r3,
            r4: req.body.r4,
            r5: req.body.r5
        }

        var CalDayOff = new CalendarDayOff(data);
        CalDayOff.save(function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }


            //--- calendrier
            CalendarDayOff.find({groupId: req.body.groupId}, {
                    groupId: 1,
                    date: 1,
                    r1: 1,
                    r2: 1,
                    r3: 1,
                    r4: 1,
                    r5: 1
                }, function (err2, data2) {
                    if (err2) {
                        console.log(err2);
                        return res.status(500).json({msg: 'internal server error'});
                    }
                    res.json(data2);
                }
            );


        });

    });
    router.post('/calendar/update_day_off', function (req, res) {
        if (!req.body.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        if (!req.body.token) {
            return res.status(500).json({error: "token is required."});
        }
        if (!req.body.userId) {
            return res.status(500).json({error: "userId is required."});
        }
        if (!req.body._id) {
            return res.status(500).json({error: "_id is required."});
        }


        CalendarDayOff.update({_id: req.body._id}, {
                $set: {
                    date: moment(req.body.date).startOf("day").format(),
                    r1: req.body.r1,
                    r2: req.body.r2,
                    r3: req.body.r3,
                    r4: req.body.r4,
                    r5: req.body.r5,
                }

            },
            function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                }


                //--- calendrier
                CalendarDayOff.find({groupId: req.body.groupId}, {
                        groupId: 1,
                        date: 1,
                        r1: 1,
                        r2: 1,
                        r3: 1,
                        r4: 1,
                        r5: 1
                    }, function (err2, data2) {
                        if (err2) {
                            console.log(err2);
                            return res.status(500).json({msg: 'internal server error'});
                        }
                        res.json(data2);
                    }
                );


            });

    });


    //--- get params calendar
    router.get('/calendar/get_day_off/:groupId', function (req, res) {
        if (!req.params.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        CalendarDayOff.find({groupId: req.params.groupId}, {
                groupId: 1,
                date: 1,
                r1: 1,
                r2: 1,
                r3: 1,
                r4: 1,
                r5: 1
            }, function (err2, data2) {
                if (err2) {
                    console.log(err2);
                    return res.status(500).json({msg: 'internal server error'});
                }
                res.json(data2);
            }
        );
    });

    router.post('/calendar/delete_day_off', function (req, res) {
        if (!req.body.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        if (!req.body.token) {
            return res.status(500).json({error: "token is required."});
        }
        if (!req.body.userId) {
            return res.status(500).json({error: "userId is required."});
        }
        if (!req.body._id) {
            return res.status(500).json({error: "_id is required."});
        }


        CalendarDayOff.remove({_id: req.body._id}, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }


            CalendarDayOff.find({groupId: req.body.groupId}, {
                    groupId: 1,
                    date: 1,
                    r1: 1,
                    r2: 1,
                    r3: 1,
                    r4: 1,
                    r5: 1
                }, function (err2, data2) {
                    if (err2) {
                        console.log(err2);
                        return res.status(500).json({msg: 'internal server error'});
                    }


                    res.json(data2);
                }
            );
        })
    });


    router.post('/calendar/create_planning', function (req, res) {
            if (!req.body.groupId) {
                return res.status(500).json({error: "groupId is required."});
            }


            //-- recup liste des params
            CalendarParams.findOne({groupId: req.body.groupId}, {
                groupId: 1,
                levelCross: 1,
                nbr_day_off: 1,
                nbr_by_watch: 1,
                length_hour_watch: 1,
                id: 1
            }, function (err_params, data_params) {
                if (err_params) {
                    console.log(err_params);
                    return res.status(500).json({msg: 'internal server error'});
                }

                //-- recup liste des jours feries
                CalendarDayOff.find({
                        groupId: req.body.groupId,
                        date: {
                            $gte: moment(req.body.start_date).format(),
                            $lte: moment(req.body.end_date).endOf('day').format()
                        }
                    }, {
                        groupId: 1,
                        date: 1,
                        r1: 1,
                        r2: 1,
                        r3: 1,
                        r4: 1,
                        r5: 1
                    }, function (err_days_off, data_days_off) {
                        if (err_days_off) {
                            console.log(err_days_off);
                            return res.status(500).json({msg: 'internal server error'});
                        }

                        //--- recup liste users
                        Group.findOne({_id: req.body.groupId}, {
                            id: 1,
                            name: 1,
                            private: 1,
                            listUser: 1,
                            media: 1,
                            createdAt: 1,
                            password: 1,
                            passwordSalt: 1,
                            updatedAt: 1,
                            _id: 1
                        }, function (err_group, data_group) {
                            if (err_group) {
                                console.log(err_group);
                                return res.status(500).json({msg: 'internal server error'});
                            }


                            var data_id = [];
                            var list_user = (data_group != null && typeof data_group.listUser !== "undefined") ? data_group.listUser : [];

                            for (var i in list_user) {
                                var user_list = list_user[i];
                                if (user_list.userId != null && user_list.activated == true && user_list.isAdmin == false) {
                                    data_id.push(user_list.userId);
                                }
                            }

                            User.find({"_id": {$in: data_id}}, {
                                    _id: 1,
                                    level: 1,
                                    gender: 1
                                }, function (err_user, data_user) {
                                    if (err_user) {
                                        console.log(err_user);
                                        return res.status(500).json({msg: 'internal server error'});
                                    }
                                    /*------------------------*/
                                    /*---  TRAITEMENT CAL----*/
                                    /*----------------------*/
                                    var range_date = enumerateDaysBetweenDates(moment.utc(req.body.start_date).format(), moment.utc(req.body.end_date).format())
                                    var final_data = [];
                                    var list_day_per_id = [];
                                    var list_id_out_system = [];
                                    var data_param_rang = select_normal_rang(data_params.levelCross);
                                    var nbr_limt_prs = range_date.length / data_user.length;
                                    for (var i in range_date) {
                                        var is_off = false;
                                        var is_next_off = true;
                                        var day_off_picked = null;
                                        var day_next_off_picked = null;
                                        var day_before_off_picked = null;


                                        //--- nbr watch by prs


                                        //-- 1 test if day off and before /next off
                                        if (typeof range_date[i] !== "undefined") {
                                            var day_off_picked = getDayOff(range_date[i], data_days_off);
                                        }
                                        /*if (day_before != null) {
                                         var day_before_off_picked = getDayOff(day_before, data_days_off);

                                         }
                                         if (typeof range_date[i + 1] !== "undefined") {
                                         var day_next_off_picked = getDayOff(range_date[i], data_days_off);
                                         }
                                         */
                                        //-- 2 retrieve nbr day off before today
                                        var dates_before = [];
                                        for (var j = 0; j <= data_params.nbr_day_off; j++) {
                                            if ((typeof range_date[i - j] !== "undefined") && (range_date[i - j] != range_date[i]) && range_date[i - j] != null) {
                                                dates_before.push(range_date[i - j]);
                                            }
                                        }
                                        //-- 2 recup user


                                        var listUserUsed = getUserUsed(dates_before, final_data);
                                        var list_user_to_select = [];
                                        var list_id_used = [];


                                        if (listUserUsed.length == 0) {
                                            if (day_off_picked != null)
                                                list_user_to_select = getUsersForDayOff(day_off_picked, data_user, list_id_used);
                                            else
                                                list_user_to_select = getUserNotUsedNormalDay(data_user, list_id_used);
                                        }
                                        else {
                                            for (var j in listUserUsed) {
                                                listUserUsed[j].users.map(function (u, i) {
                                                    list_id_used.push("" + u._id);
                                                });
                                            }

                                            list_id_used = _.uniq(list_id_used);

                                            if (day_off_picked != null)
                                                list_user_to_select = getUsersForDayOff(day_off_picked, data_user, list_id_used);
                                            else {
                                                for (var l in list_id_out_system) {

                                                    list_id_used.push(list_id_out_system[l]);
                                                }
                                                list_id_used = _.uniq(list_id_used);
                                                list_user_to_select = getUserNotUsedNormalDay(data_user, list_id_used);
                                            }

                                        }
                                        list_id_used = _.uniq(list_id_used);


                                        //console.log(list_user_to_select);


                                        //--- selection user by combinaison
                                        var list_final_user = [];
                                        if (day_off_picked !== null) {
                                            list_final_user = select_user_dayoff(list_user_to_select, day_off_picked, data_params.nbr_by_watch);
                                        }
                                        else {
                                            list_final_user = select_user_normal(list_user_to_select, data_param_rang, data_params.nbr_by_watch)

                                        }

                                        //-- retirer les element qui ont deja été utilisé
                                        if (list_final_user.length > 0) {
                                            for (var k in list_final_user) {
                                                var uid = list_final_user[k]._id;
                                                if (typeof list_day_per_id[list_final_user[k]._id] !== "undefined") {
                                                    list_day_per_id[list_final_user[k]._id] = list_day_per_id[list_final_user[k]._id] + 1;
                                                }
                                                else {
                                                    list_day_per_id[list_final_user[k]._id] = 1;
                                                }
                                            }

                                        }


                                        //--- 3 insert list final data
                                        var final_data_day = {
                                            date: moment(range_date[i]).format(),
                                            isOff: day_off_picked !== null,
                                            users: list_final_user,

                                        }
                                        final_data.push(final_data_day);
                                        for (var l in list_day_per_id) {
                                            if (Math.floor(nbr_limt_prs) == list_day_per_id[l]) {

                                                list_id_out_system.push(l);
                                            }
                                        }

                                        list_id_out_system = _.uniq(list_id_out_system);

                                        if (data_user.length - list_id_out_system.length <= 2 * nbr_limt_prs) {

                                            list_id_out_system = [];


                                            /*  for (var l in list_id_out_system) {
                                             if (Math.ceil(nbr_limt_prs) > list_id_out_system[l]) {


                                             console.log("min : " + l);
                                             console.log("min : " + list_id_out_system[l]);
                                             }
                                             else {
                                             console.log("max : " + l);
                                             }
                                             }

                                             }
                                             list_id_out_system = _.uniq(list_id_out_system);*/
                                        }
                                    }
                                console.log(list_day_per_id);
                                    res.json({
                                        "nbr_limt_prs": nbr_limt_prs,
                                        "length_us": data_user.length,
                                        "length_out": list_id_out_system.length,

                                        "final_data": final_data,

                                        "users": data_user,
                                        "group": data_group,
                                        "days_off": data_days_off,
                                        "params": data_params
                                    });
                                }
                            );

                        });


                    }
                );


            });


            //--- traimtement


        }
    )
    ;
}