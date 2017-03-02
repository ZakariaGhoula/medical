var Group = require('../models/Group');
var Calend = require('../models/Calendar');
var bodyparser = require('body-parser');
var CalendarDayOff = require('../models/CalendarDayOff');
var CalendarParams = require('../models/CalendarParameters');
var User = require('../models/User');
var _ = require('lodash');
var fs = require('fs');
var Combinatorics = require('js-combinatorics');
var shuffle = require('shuffle-array');
import mongoose from 'mongoose';
import moment from 'moment';

var enumerateDaysBetweenDates = function (startDate, endDate) {
    var dates = [];


    var currDate = moment(startDate).subtract(1, "day").clone().startOf('day');

    var lastDate = moment(endDate).clone().startOf('day');

    while (currDate.add('days', 1).diff(lastDate) <= 0) {

        dates.push(currDate.clone().toDate());
    }

    return dates;
}


var getDayOff = function (date_search, array_of) {
    var day_picked = _.filter(array_of, function (day) {
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

var coupleForDayOff = function (user_to_select, day_off, nbr_to_select) {


};
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
        list_rang['R3'].push("R4");
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
    // list_rang = _.uniq(list_rang);
    return list_rang;
}

var combinaison_group = function (params, data_user) {


    var final = [];


    for (var i in params) {
        var combi = [];
        if (typeof data_user[i] !== "undefined") {

            for (var j in data_user[i]) {
                combi.push(data_user[i][j]);
            }
        }

        for (var i2 in params[i]) {
            if (typeof data_user[params[i][i2]] !== "undefined") {

                for (var j in data_user[params[i][i2]]) {
                    combi.push(data_user[params[i][i2]][j]);
                }
            }
        }
        if (combi.length > 0)
            final.push(combi);
    }

    //--- array unique of array
    var new_final = [];
    for (var i in final) {
        for (var j in final) {

            var arr1 = final[i];
            var arr2 = final[j];
            var arr3 = final[j].reverse();

            if (!_.isEqual(arr1, arr2)) {
                _.pullAll(final, [arr1]);
                if (new_final.indexOf(arr1) < 0 && new_final.indexOf(arr2) < 0 && new_final.indexOf(arr3) < 0) {
                    new_final.push(arr1);
                }
            }
        }
    }
    return new_final;
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
var check_days_off = function (user_selected, to_day, nbr_day_off, final_cal, nbr_user_by_day = 2) {
    var date_before = [];
    var results = null;
    var is_ok = true;
    for (var i = 0; i <= nbr_day_off; i++) {

        var currDate = moment(to_day).subtract(i, "day").clone().startOf('day');

        results = _.filter(final_cal, function (o) {

            return currDate.diff(o.date_day) <= 0;
        });

    }

    for (var u in results) {
        var user = results[u];

        for (var j = 0; j < nbr_user_by_day; j++) {

            //     while (nb_attribute > 0) {
            var level_j = user.user['userId_' + parseInt(j + 1)];
            var level_uj = user_selected['userId_' + parseInt(j + 1)];

            for (var k = j; k < nbr_user_by_day; k++) {
                if (k > j) {
                    var level_k = user.user['userId_' + parseInt(k + 1)];
                    var level_uk = user_selected['userId_' + parseInt(k + 1)];

                    if (level_j == level_uj || level_uj == level_k || level_uk == level_k || level_uk == level_j) {
                        is_ok = false;


                    }


                    for (var n = k; n < nbr_user_by_day; n++) {

                        if (k < n) {
                            var level_n = user.user['userId_' + parseInt(n + 1)];
                            var level_un = user_selected['userId_' + parseInt(n + 1)];

                            if (level_n == level_uj || level_uk == level_n || level_un == level_n
                                || level_un == level_j || level_un == level_k) {
                                is_ok = false;
                            }


                        }
                    }
                }
            }

        }
    }

    return is_ok;

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

    //--- get  on calendar
    router.get('/calendar/get_planning/:calId/:groupId', function (req, res) {
        if (!req.params.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        if (!req.params.calId) {
            return res.status(500).json({error: "calId is required."});
        }
        Calend.find({groupId: req.params.groupId, _id: req.params.calId}, {
                groupId: 1,
                date_start: 1,
                date_end: 1,
                dispatch: 1,
                is_active: 1,
                date_created: 1,
                date_updated: 1
            }, function (err2, data2) {
                if (err2) {
                    console.log(err2);
                    return res.status(500).json({msg: 'internal server error'});
                }


                res.json(data2);
            }
        );
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


                                        //JOUR NORMAUX
                                        var data_param_rang = select_normal_rang(data_params.levelCross);
                                        //--- construction du tableau de user par level


                                        for (var i in data_user) {
                                            if (typeof list_day_per_id[data_user[i].level] == "undefined") {
                                                list_day_per_id[data_user[i].level] = [];
                                            }
                                            list_day_per_id[data_user[i].level].push({
                                                'level': data_user[i].level,
                                                'userId': data_user[i]._id,
                                                "nbr": 0
                                            });
                                        }

                                        var data_couple_combinaison = [];
                                        var data_elag_mix = combinaison_group(data_param_rang, list_day_per_id);

                                        for (var i in data_elag_mix) {
                                            var array_com = data_elag_mix[i];
                                            var cmb = Combinatorics.bigCombination(array_com, data_params.nbr_by_watch);
                                            var a = null;
                                            while (a = cmb.next()) {

                                                var na = a;//_.uniqWith(_.uniqBy(a, 'level'), _.isEqual);
                                                var p = 0;


                                                if (na.length == data_params.nbr_by_watch) {
                                                    var obj_to_use = {
                                                        day_off: false,
                                                        nbr_by_watch: data_params.nbr_by_watch,
                                                        date_off: [],
                                                        used: 0,
                                                    }
                                                    for (var z in na) {
                                                        obj_to_use['level_' + (parseInt(z) + 1)] = na[z].level;
                                                        obj_to_use['nb_' + (parseInt(z) + 1)] = 0;
                                                        obj_to_use['userId_' + (parseInt(z) + 1)] = na[z].userId;
                                                    }
                                                    data_couple_combinaison.push(obj_to_use);
                                                }
                                            }

                                        }
                                        var new_data_couple_comb = [];


                                        for (i in data_couple_combinaison) {
                                            var user = data_couple_combinaison[i];
                                            var inside = false;
                                            for (var j = 0; j < data_params.nbr_by_watch; j++) {

                                                var nb_attribute = ((parseInt(Object.keys(user).length) - 2 - data_params.nbr_by_watch)) / 2;
                                                //     while (nb_attribute > 0) {
                                                var level_j = user['level_' + parseInt(j + 1)];

                                                for (var k = j; k < data_params.nbr_by_watch; k++) {
                                                    if (k > j) {
                                                        var level_k = user['level_' + parseInt(k + 1)];


                                                        if (level_j != level_k) {
                                                            inside = true;
                                                        }
                                                        for (var n = k; n < data_params.nbr_by_watch; n++) {

                                                            if (k < n) {
                                                                var level_n = user['level_' + parseInt(n + 1)];

                                                                if (level_n != level_k || level_j != level_n) {
                                                                    inside = true
                                                                }

                                                            }
                                                        }
                                                    }
                                                }

                                            }
                                            if (inside) {
                                                new_data_couple_comb.push(user);
                                            }
                                        }
                                        shuffle(new_data_couple_comb);

                                        //--- traitement user days off
                                        var final_data_couple = [];
                                        //--tourne sur les jours feries et recuper les couples possible
                                        for (var date_d in range_date) {
                                            var day_off_picked = null;
                                            var d_day = range_date[date_d];
                                            if (typeof d_day !== "undefined") {
                                                var day_off_picked = getDayOff(d_day, data_days_off);
                                            }
                                            if (day_off_picked != null) {

                                                var list_rang = [];
                                                var list_day_per_id_off = [];
                                                //--- constuction couple
                                                if (day_off_picked.r1) {
                                                    list_rang.push("R1");
                                                }
                                                if (day_off_picked.r2) {
                                                    list_rang.push("R2");
                                                }
                                                if (day_off_picked.r3) {
                                                    list_rang.push("R3");
                                                }
                                                if (day_off_picked.r4) {
                                                    list_rang.push("R4");
                                                }
                                                if (day_off_picked.r5) {
                                                    list_rang.push("R5");
                                                }


                                                for (i in new_data_couple_comb) {
                                                    var user = new_data_couple_comb[i];
                                                    var inside = false;
                                                    for (var j = 0; j < data_params.nbr_by_watch; j++) {

                                                        var nb_attribute = ((parseInt(Object.keys(user).length) - 2 - data_params.nbr_by_watch)) / 2;
                                                        //     while (nb_attribute > 0) {
                                                        var level_j = user['level_' + parseInt(j + 1)];

                                                        for (var k = j; k < data_params.nbr_by_watch; k++) {
                                                            if (k > j) {
                                                                var level_k = user['level_' + parseInt(k + 1)];

                                                                if (list_rang.indexOf(level_j) > -1) {
                                                                    inside = true;
                                                                }


                                                                for (var n = k; n < data_params.nbr_by_watch; n++) {

                                                                    if (k < n) {
                                                                        var level_n = user['level_' + parseInt(n + 1)];

                                                                        if (list_rang.indexOf(level_n) > -1
                                                                            || list_rang.indexOf(level_k) > -1
                                                                            || list_rang.indexOf(level_j) > -1

                                                                        ) {
                                                                            inside = true;
                                                                        }


                                                                    }
                                                                }
                                                            }
                                                        }

                                                    }
                                                    if (inside) {
                                                        user.day_off = true;
                                                        user.date_off.push(day_off_picked.date);
                                                        final_data_couple.push(user);
                                                    }
                                                }
                                            }


                                        }


                                        //---- boucle pour le calendrier
                                        var fina_list_used = []
                                        var fina_list_rest = []
                                        var fina_cal_old = []
                                        var fina_cal = []
                                        if (final_data_couple.length == 0) {
                                            final_data_couple = new_data_couple_comb;
                                        }
                                        var nbr_max_use = Math.ceil(range_date.length / final_data_couple.length);

                                        for (var date_d in range_date) {
                                            var day_off_picked = null;
                                            var d_day = range_date[date_d];
                                            if (typeof d_day !== "undefined") {
                                                var day_off_picked = getDayOff(d_day, data_days_off);
                                            }

                                            if (day_off_picked != null) {
                                                var found = false;

                                                for (var i in final_data_couple) {
                                                    if (!found) {
                                                        var u = final_data_couple[i];
                                                        if (u.date_off.indexOf(day_off_picked.date) > -1) {
                                                            if (fina_list_used.indexOf(u) === -1 && final_data_couple[i].used <= nbr_max_use) {


                                                                var is_ok = false;
                                                                if (fina_cal.length == 0)
                                                                    is_ok = check_days_off(final_data_couple[i], d_day, data_params.nbr_day_off, fina_cal_old, data_params.nbr_by_watch);
                                                                else
                                                                    is_ok = check_days_off(final_data_couple[i], d_day, data_params.nbr_day_off, fina_cal, data_params.nbr_by_watch);

                                                                if (is_ok) {

                                                                    //  u.used = parseInt(u.used + 1);
                                                                    final_data_couple[i].used = parseInt(final_data_couple[i].used + 1);
                                                                    var final = {
                                                                        date_day: moment(day_off_picked.date).format(),
                                                                        user: final_data_couple[i],
                                                                        day_off: true,
                                                                    }
                                                                    fina_list_used.push(final_data_couple[i]);
                                                                    found = true;
                                                                    fina_cal.push(final);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }

                                            } else {

                                                var found = false;
                                                for (var i in final_data_couple) {
                                                    if (!found) {
                                                        var u = final_data_couple[i];
                                                        if (fina_list_used.indexOf(u) === -1 && final_data_couple[i].used <= nbr_max_use) {
                                                            var is_ok = false;
                                                            if (fina_cal.length == 0)
                                                                is_ok = check_days_off(final_data_couple[i], d_day, data_params.nbr_day_off, fina_cal_old, data_params.nbr_by_watch);
                                                            else
                                                                is_ok = check_days_off(final_data_couple[i], d_day, data_params.nbr_day_off, fina_cal, data_params.nbr_by_watch);

                                                            if (is_ok) {
                                                                final_data_couple[i].used = parseInt(final_data_couple[i].used + 1);
                                                                var final = {
                                                                    date_day: moment(d_day).format(),
                                                                    user: final_data_couple[i],
                                                                    day_off: false,
                                                                };
                                                                fina_list_used.push(final_data_couple[i]);

                                                                fina_cal.push(final);
                                                                found = true;
                                                            }

                                                        }
                                                    }

                                                }

                                            }
                                        }


                                        //--- save
                                        var newCalendar = new Calend({
                                            groupId: data_params.groupId,
                                            date_start: moment.utc(req.body.start_date).format(),
                                            date_end: moment.utc(req.body.end_date).format(),
                                            dispatch: fina_cal,
                                            nbr_by_watch: data_params.nbr_by_watch,
                                            is_active: false,
                                            date_created: moment().format(),
                                            date_updated: moment().format()
                                        });
                                        newCalendar.save(function (err, data) {
                                            if (err) {
                                                console.log(err);
                                                return res.status(500).json({msg: 'internal server error'});
                                            }
                                            //---- dispatch element calendar
                                            res.json({

                                                "calendar": newCalendar,

                                                "group": data_group,
                                                "days_off": data_days_off,
                                                "params": data_params
                                            });

                                        });

                                    }
                                );

                            });


                        }
                    );


                }
            )
            ;


//--- traimtement


        }
    )

    router.post('/calendar/update_planning', function (req, res) {
        if (!req.body.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        if (!req.body.calId) {
            return res.status(500).json({error: "calId is required."});
        }
        Calend.update(
            {_id: req.body.calId, groupId: req.body.groupId},
            {
                $set: {
                    is_active: req.body.is_active,
                    date_updated: moment().format(),
                    dispatch: req.body.dispatch

                }

            }, {
                upsert: true
            },
            function (err2, data) {
                if (err2) {
                    return res.status(500).json({error: 'Something went wrong, please try later.'});
                    // req.session.historyData.message = 'Something went wrong, please try later.'
                }

                res.json({result: data});
            });

    });
    ;
}