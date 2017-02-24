var Group = require('../models/Group');
var bodyparser = require('body-parser');
var User = require('../models/User');
var _ = require('lodash');
var fs = require('fs');
import mongoose from 'mongoose';
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

module.exports = function (router) {
    router.use(bodyparser.json());

    router.post('/group/new_group', function (req, res) {
        var newGroup = new Group(req.body);
        newGroup.save(function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }

            res.json({group: data});
        });

    });

    router.get('/group/user/:userId', function (req, res) {

        /*       Group.aggregate([
         {
         $match: {
         listUser: {
         $elemMatch: {userId: req.params.userId}
         }

         },
         }
         ],*/

        Group.find().elemMatch("listUser", {"userId": mongoose.Types.ObjectId(req.params.userId)}).find(
            //Group.find({"listUser.userId": "585e669b92305d1159141430"},
            function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                }


                //-- group user
                //if(data.length>1 && typeof(data[0]) !=="undefined" && data[0].listUser.length>0){
                if (data.length > 0 && typeof data[0] !== "undefined" && data[0].listUser.length > 0) {
                    var data_id = [];
                    for (var i in data[0].listUser) {
                        var userId = (data[0].listUser[i].userId);
                        data_id.push(userId);
                    }
                    User.find({"_id": {$in: data_id}}, function (err2, data2) {
                        if (err2) {
                            console.log(err2);
                            return res.status(500).json({msg: 'internal server error'});
                        }
                        data[0]["users"] = data2;
                        res.json(data);
                    });


                }
                else {
                    return res.status(404).json({msg: 'Aucun groupe trouvé'});
                }

            });


    });


    //--- udpate user
    router.post('/update_group', function (req, res) {
        if (!req.body.token) {

            return res.status(500).json({error: "Token is required."});
        }
        if (!req.body.groupId) {

            return res.status(500).json({error: "groupId is required."});
        }
        if (!req.body.userId) {

            return res.status(500).json({error: "UserId is required."});
        }


        var img = req.body.img_uri;
        var obj_media = {};
        if (img != null) {

            var imageBuffer = decodeBase64Image(img);
            var current_Date = new Date();
            var file_name = 'avatar-' + current_Date.getYear() + current_Date.getMonth() + current_Date.getDay() + current_Date.getHours() + current_Date.getMinutes() + current_Date.getSeconds() + '-' + req.body.groupId + '.jpg';
            fs.writeFile('public/group/' + file_name, imageBuffer.data, function (err) {
                //obj_media = {type:"profile",file: req.body.userId};
                obj_media = {type: "group", file: file_name};
                Group.update(
                    {_id: req.body.groupId},
                    {
                        $set: {
                            name: req.body.name,
                            media: obj_media

                        }

                    }, {
                        upsert: true
                    },
                    function (err2, data) {
                        if (err2) {
                            return res.status(500).json({error: 'Something went wrong, please try later.'});
                            // req.session.historyData.message = 'Something went wrong, please try later.'
                        }

                        Group.find({_id: req.body.groupId}, {
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
                        }, function (err3, data3) {
                            if (err3) {
                                console.log(err3);
                                return res.status(500).json({msg: 'internal server error'});
                            }


                            if (data3.length > 0 && typeof data3[0] !== "undefined" && data3[0].listUser.length > 0) {
                                var data_id = [];
                                for (var i in data3[0].listUser) {
                                    var userId = (data3[0].listUser[i].userId);
                                    data_id.push(userId);
                                }
                                User.find({"_id": {$in: data_id}}, function (err4, data4) {
                                    if (err4) {
                                        console.log(err4);
                                        return res.status(500).json({msg: 'internal server error'});
                                    }
                                    data3[0]["users"] = data4;
                                    res.json(data3);
                                });


                            }
                        });
                    }
                )
            });

        }

        else {


            Group.update(
                {_id: req.body.groupId},
                {
                    $set: {
                        name: req.body.name,
                    }

                }, {
                    upsert: true
                },
                function (err2, data) {
                    if (err2) {
                        return res.status(500).json({error: 'Something went wrong, please try later.'});
                        // req.session.historyData.message = 'Something went wrong, please try later.'
                    }


                    Group.find({_id: req.body.groupId}, {
                        id: 1,
                        name: 1,
                        private: 1,
                        listUser: 1,
                        media: 1,
                        createdAt: 1,
                        password: 1,
                        passwordSalt: 1,
                        updatedAt: 1,
                        users: 1,
                        _id: 1
                    }, function (err3, data3) {
                        if (err3) {
                            console.log(err3);
                            return res.status(500).json({msg: 'internal server error'});
                        }


                        if (data3.length > 0 && typeof data3[0] !== "undefined" && data3[0].listUser.length > 0) {
                            var data_id = [];
                            for (var i in data3[0].listUser) {
                                var userId = (data3[0].listUser[i].userId);
                                data_id.push(userId);
                            }
                            User.find({"_id": {$in: data_id}}, function (err4, data4) {
                                if (err4) {
                                    console.log(err4);
                                    return res.status(500).json({msg: 'internal server error'});
                                }


                                data3[0]["users"] = data4;

                                res.json(data3);
                            });


                        }
                    });

                }
            )

        }


    });


    router.post('/password/get', function (req, res) {
            if (!req.body.token) {

                return res.status(500).json({error: "Token is required."});
            }
            if (!req.body.groupId) {

                return res.status(500).json({error: "groupId is required."});
            }
            if (!req.body.userId) {

                return res.status(500).json({error: "UserId is required."});
            }
            Group.findOne(
                {listUser: {$elemMatch: {userId:  mongoose.Types.ObjectId(req.body.userId), isAdmin: true}}, _id: req.body.groupId},
                function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({msg: 'internal server error'});
                    }

                    res.json({'pwd': (data !== null) ? data.password : ""})
                }
            )
            ;


        }
    )
    ;
    router.post('/password/update', function (req, res) {
            if (!req.body.token) {

                return res.status(500).json({error: "Token is required."});
            }
            if (!req.body.groupId) {

                return res.status(500).json({error: "groupId is required."});
            }
            if (!req.body.userId) {

                return res.status(500).json({error: "UserId is required."});
            }
            if (!req.body.password) {

                return res.status(500).json({error: "password is required."});
            }
            Group.findOne(
                {listUser: {$elemMatch: {userId: req.body.userId, isAdmin: true}}, _id: req.body.groupId},
                function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({msg: 'internal server error'});
                    }


                    Group.update(
                        {_id: req.body.groupId},
                        {
                            $set: {
                                password: req.body.password,
                            }

                        }, {
                            upsert: true
                        },
                        function (err2, data2) {
                            if (err2) {
                                return res.status(500).json({error: 'Something went wrong, please try later.'});
                                // req.session.historyData.message = 'Something went wrong, please try later.'
                            }

                            res.json({'pwd': req.body.password});
                        }
                    )
                });
        }
    );


    ///---- ajout user
    router.post('/group/addUser', function (req, res) {

        if (!req.body.email) {
            return res.status(500).json({error: "E-mail is required."});
        }
        if (!req.body.password) {
            return res.status(500).json({error: "Password  is required."});
        }
        if (!req.body.firstname) {
            return res.status(500).json({error: "Firstname is required."});
        }

        if (!req.body.lastname) {
            return res.status(500).json({error: "lastName is required."});
        }
        if (!req.body.token) {
            return res.status(500).json({error: "token is required."});
        }
        if (!req.body.userId) {
            return res.status(500).json({error: "userId is required."});
        }
        if (!req.body.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }


        Group.findOne(
            {listUser: {$elemMatch: {userId: mongoose.Types.ObjectId(req.body.userId), isAdmin: true}}, _id: req.body.groupId},
            function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                }
                //-- 1 ajouter utilisateur
                var userData = _.pick(req.body, 'lastname', 'firstname', 'email', 'password', 'gender', 'level');
                User.register(userData, function (err, user) {

                    if (err && (11000 === err.code || 11001 === err.code)) {
                        // req.session.historyData.message = 'E-mail is already in use.'
                        return res.status(500).json({error: "E-mail is already in use."});
                        //return res.redirect('signup');
                    }

                    if (err) {
                        return res.status(500).json({error: 'Something went wrong, please try later.'});
                        // req.session.historyData.message = 'Something went wrong, please try later.'
                    }

                    //-- 2 ajouter au group

                    var list_user = data.listUser;

                    var user_to_list_user = {
                        userId: user._id,
                        isAdmin: false,
                        isSubadmin: false,
                        activated: true,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    };

                    list_user.push(user_to_list_user);
                    Group.update(
                        {_id: req.body.groupId},
                        {
                            $set: {
                                listUser: list_user
                            }

                        }, {
                            upsert: true
                        },
                        function (err3, data3) {
                            if (err3) {
                                return res.status(500).json({error: 'Something went wrong, please try later.'});
                                // req.session.historyData.message = 'Something went wrong, please try later.'
                            }
                            //-- 3 recup list group
                            Group.find({_id: req.body.groupId}, {
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
                            }, function (err4, data4) {
                                if (err4) {
                                    console.log(err4);
                                    return res.status(500).json({msg: 'internal server error'});
                                }


                                if (data4.length > 0 && typeof data4[0] !== "undefined" && data4[0].listUser.length > 0) {
                                    var data_id = [];
                                    for (var i in data4[0].listUser) {
                                        var userId = (data4[0].listUser[i].userId);
                                        data_id.push(userId);
                                    }
                                    User.find({"_id": {$in: data_id}}, function (err5, data5) {
                                        if (err5) {
                                            console.log(err5);
                                            return res.status(500).json({msg: 'internal server error'});
                                        }
                                        data4[0]["users"] = data5;
                                        res.json(data4);
                                    });


                                }
                            });
                        }
                    );


                    // return res.json(list_user);
                });


            });

    });


    //-- update user from admin
    router.post('/group/updateUser', function (req, res) {


        if (!req.body.userId) {
            return res.status(500).json({error: "lastName is required."});
        }
        if (!req.body.token) {
            return res.status(500).json({error: "token is required."});
        }
        if (!req.body.userAdminId) {
            return res.status(500).json({error: "userAdminId is required."});
        }
        if (!req.body.groupId) {
            return res.status(500).json({error: "groupId is required."});
        }
        var new_listUser = [];
        Group.findOne(
            {listUser: {$elemMatch: {userId: req.body.userAdminId, isAdmin: true}}, _id: req.body.groupId},
            function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({msg: 'internal server error'});
                }


                //--- list user
                User.update(
                    {_id: req.body.userId},
                    {
                        $set: {
                            level: req.body.level
                        }

                    }, {
                        upsert: true
                    }, function (err2, data2) {
                        if (err2) {
                            console.log(err2);
                            return res.status(500).json({msg: 'internal server error'});
                        }
                        //-- 3 recup list group
                        Group.find({_id: req.body.groupId}, {
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
                        }, function (err3, data3) {
                            if (err3) {
                                console.log(err3);
                                return res.status(500).json({msg: 'internal server error'});
                            }


                            var data_id = [];
                            if (data3.length > 0 && typeof data3[0] !== "undefined" && data3[0].listUser.length > 0) {

                                for (var i = 0; i < data3[0].listUser.length; i++) {


                                    var user = {
                                        userId: data3[0].listUser[i].userId,
                                        isAdmin: data3[0].listUser[i].isAdmin,
                                        isSubAdmin: data3[0].listUser[i].isSubAdmin,
                                        activated: data3[0].listUser[i].activated,

                                        createdAt: data3[0].listUser[i].createdAt,
                                        updatedAt: data3[0].listUser[i].updatedAt
                                    }
                                    if (data3[0].listUser[i].userId == req.body.userId) {


                                        var is_subAdmin = false;
                                        if ((req.body.subAdmin == true) || (req.body.subAdmin == "true")) {
                                            is_subAdmin = true;
                                        }
                                        if ((req.body.subAdmin == "false") || req.body.subAdmin == false) {
                                            console.log(user);
                                            is_subAdmin = false;
                                        }
                                        var activated = false;
                                        if ((req.body.activated == true) || (req.body.activated == "true")) {
                                            activated = true;
                                        }
                                        if ((req.body.activated == "false") || req.body.activated == false) {

                                            activated = false;
                                        }
                                        user.isSubAdmin = is_subAdmin;
                                        user.activated = activated;


                                    }
                                    if (user.userId != null) {
                                        new_listUser.push(user);
                                        var userId = (data3[0].listUser[i].userId);
                                        data_id.push(userId);
                                    }
                                }

                                Group.update(
                                    {_id: req.body.groupId},
                                    {
                                        $set: {
                                            listUser: new_listUser
                                        }

                                    },
                                    function (err4, data4) {
                                        if (err4) {
                                            console.log(err4);
                                            return res.status(500).json({error: 'Something went wrong, please try later.'});
                                            // req.session.historyData.message = 'Something went wrong, please try later.'
                                        }


                                        Group.find({_id: req.body.groupId}, {
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
                                        }, function (err5, data5) {
                                            if (err5) {
                                                console.log(err5);
                                                return res.status(500).json({msg: 'internal server error'});
                                            }


                                            if (data5.length > 0 && typeof data5[0] !== "undefined" && data5[0].listUser.length > 0) {
                                                var data_id = [];
                                                for (var i in data5[0].listUser) {
                                                    var userId = (data5[0].listUser[i].userId);
                                                    if (userId !== null)
                                                        data_id.push(userId);
                                                }
                                                User.find({"_id": {$in: data_id}}, function (err6, data6) {
                                                    if (err6) {
                                                        console.log(err6);
                                                        return res.status(500).json({msg: 'internal server error'});
                                                    }
                                                    data5[0]["users"] = data6;
                                                    res.json(data5);
                                                });

                                            }
                                        });

                                    });
                            }
                        });
                    });

            });


    });


}