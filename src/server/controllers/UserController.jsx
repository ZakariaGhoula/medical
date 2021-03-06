var User = require('../models/User');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

exports.register = function (req, res) {
    console.log("registering: " + req.body.firstName);
    User.register(new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        provider:"email",
        is_active:true,
        token:""
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            res.send({
                success: true,
                user: user
            });
        }
    });
};

exports.login = function (req, res, next) {

    User.authenticate()(req.body.email, req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(user, function (err) {
                res.send({
                    success: true,
                    user: user
                });
            });
        }
    });

};

exports.getLogin = function (req, res) {

    if (req.user) {

        return res.send({
            success: true,
            user: req.user
        });

    } //res.send(500, {status:500, message: 'internal error', type:'internal'}); == deprecated


    res.send({
        success: false,
        message: 'not authorized'
    });
};