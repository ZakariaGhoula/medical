var User = require('../models/User');
var bodyparser = require('body-parser');
var _ = require('lodash');
var fs = require('fs');
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
     router.use(bodyparser.json({limit: '5mb'}));
    router.use(bodyparser.urlencoded({limit: '5mb', extended: true}));

    /*--- register */
    router.post('/signup', function (req, res) {
        if (!req.body.email) {
            return res.status(500).json({error: "E-mail is required."});
        }
        if (!req.body.password) {
            return res.status(500).json({error: "Password  is required."});
        }
        if (!req.body.firstname) {
            return res.status(500).json({error: "Firstname is required."});
        }

        //-- to do confirm
        var userData = _.pick(req.body, 'lastname', 'firstname', 'email', 'password');
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
            return res.json(user);
        });

    });

    /*----- signin */
    router.post('/signin', function (req, res) {

        if (!req.body.email) {

            return res.status(500).json({error: "E-mail is required."});
        }
        if (!req.body.password) {
            return res.status(500).json({error: "Password  is required."});
        }
        User.authenticate(req.body.email, req.body.password, function (err, user) {
            if (err || !user) {
                return res.status(404).json({error: 'No user found.'});
            }
            return res.json(user);
        });


    });
    //--- signin token
    router.post('/signin_token', function (req, res) {

        if (!req.body.token) {

            return res.status(500).json({error: "Token is required."});
        }
        User.authenticateByToken(req.body.token, function (err, user) {
            if (err || !user) {
                return res.status(404).json({error: 'No user found.'});
            }
            return res.json(user);
        });
    });
    //--- udpate user
    router.post('/update_user', function (req, res) {
        if (!req.body.token) {

            return res.status(500).json({error: "Token is required."});
        }
        if (!req.body.userId) {

            return res.status(500).json({error: "UserId is required."});
        }


        var img = req.body.img_uri;
        var obj_media = {};
        if(img!=null){
            //path.join(__dirname, 'dist')
            console.log(__dirname)
            var imageBuffer = decodeBase64Image(img);
            var current_Date = new Date();
            var file_name = 'avatar-'+current_Date.getYear()+current_Date.getMonth()+current_Date.getDay()+current_Date.getHours()+current_Date.getMinutes()+current_Date.getSeconds()+'-'+req.body.userId+'.jpg';
            fs.writeFile('public/user/'+file_name, imageBuffer.data, function(err) {
                //obj_media = {type:"profile",file: req.body.userId};
                obj_media = {type:"profile",file: file_name};
                User.update(
                    {_id: req.body.userId, token: req.body.token},
                    {
                        $set: {
                            lastname: req.body.lastname,
                            email: req.body.email,
                            firstname: req.body.firstname,
                            gender: req.body.gender,
                            birthday: req.body.birthday,
                            media:obj_media

                        }

                    }, {
                        upsert: true
                    },
                    function (err2, data) {
                        if (err2) {
                            return res.status(500).json({error: 'Something went wrong, please try later.'});
                            // req.session.historyData.message = 'Something went wrong, please try later.'
                        }
                        User.authenticateByToken(req.body.token, function (err, user) {
                            if (err || !user) {
                                return res.status(404).json({error: 'No user found.'});
                            }
                            return res.json(user);
                        });

                    }
                )
            });

        }

        else{


            User.update(
                {_id: req.body.userId, token: req.body.token},
                {
                    $set: {
                        lastname: req.body.lastname,
                        email: req.body.email,
                        firstname: req.body.firstname,
                        gender: req.body.gender,
                        birthday: req.body.birthday,

                    }

                }, {
                    upsert: true
                },
                function (err2, data) {
                    if (err2) {
                        return res.status(500).json({error: 'Something went wrong, please try later.'});
                        // req.session.historyData.message = 'Something went wrong, please try later.'
                    }
                    User.authenticateByToken(req.body.token, function (err, user) {
                        if (err || !user) {
                            return res.status(404).json({error: 'No user found.'});
                        }
                        return res.json(user);
                    });

                }
            )

        }


    });



};