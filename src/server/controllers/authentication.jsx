'use strict';

var passport = require('passport');

module.exports.signin = signinUser;

function signinUser(req, res, next) {
    // add validation before calling the authenicate() method

    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            return res.status(400).send(info);
        }

        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }

            // you can send a json response instead of redirecting the user
            //res.status(200).json(user);

            res.redirect('/');
        });
    })(req, res, next);
};