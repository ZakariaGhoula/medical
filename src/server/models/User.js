var mongoose = require('mongoose');
var passwordHelper = require('../helpers/password');
var tokenHelper = require('../helpers/token');
var Schema = mongoose.Schema;
var _ = require('lodash');


var UserSchema = mongoose.Schema({
    id: {type: String, unique: true},
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    passwordSalt: {
        type: String,
        required: true,
        select: false
    },
    level:String,
    typeuser:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastname: String,
    firstname: String,
    token: String,
    username: String,

    gender: String,
    birthday: String,
    provider: String,
    media: Object,
    is_active: Boolean,
});


//module.exports = mongoose.model('User', UserSchema);

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.statics.authenticate = function (email, password, callback) {
    this.findOne({email: email}).select('+password +passwordSalt').exec(function (err, user) {
        if (err) {
            return callback(err, null);
        }

        // no user found just return the empty user
        if (!user) {
            return callback(err, user);
        }

        // verify the password with the existing hash from the user
        passwordHelper.verify(password, user.password, user.passwordSalt, function (err, result) {
            if (err) {
                return callback(err, null);
            }

            // if password does not match don't return user
            if (result === false) {
                return callback(err, null);
            }

            // remove password and salt from the result
            user.password = undefined;
            user.passwordSalt = undefined;
            // return user if everything is ok
            callback(err, user);
        });
    });
};UserSchema.statics.authenticateByToken = function (token, callback) {
    this.findOne({token: token}).select('+password +passwordSalt').exec(function (err, user) {
        if (err) {
            return callback(err, null);
        }

        // no user found just return the empty user
        if (!user) {
            return callback(err, user);
        }
        user.password = undefined;
        user.passwordSalt = undefined;
        // return user if everything is ok
        callback(err, user);

    });
};

/**
 * Create a new user with the specified properties
 *
 * @param {Object} opts - user data
 * @param {Function} callback
 */
UserSchema.statics.register = function (opts, callback) {
    var self = this;
    var data = _.cloneDeep(opts);

    //hash the password
    passwordHelper.hash(opts.password, function (err, hashedPassword, salt) {
        if (err) {
            return callback(err);
        }

        tokenHelper.generate(30, function (err, token) {
            if (err) {
                return callback(err);
            }
            data.token = token;
            data.password = hashedPassword;
            data.passwordSalt = salt;

            //create the user
            self.model('User').create(data, function (err, user) {
                if (err) {
                    return callback(err, null);
                }

                // remove password and salt from the result
                user.password = undefined;
                user.passwordSalt = undefined;
                // return user if everything is ok
                callback(err, user);
            });


        });
    });
};

/**
 * Create an instance method to change password
 *
 */
UserSchema.methods.changePassword = function (oldPassword, newPassword, callback) {
    var self = this;

    // get the user from db with password and salt
    self.model('User').findById(self.id).select('+password +passwordSalt').exec(function (err, user) {
        if (err) {
            return callback(err, null);
        }

        // no user found just return the empty user
        if (!user) {
            return callback(err, user);
        }

        passwordHelper.verify(oldPassword, user.password, user.passwordSalt, function (err, result) {
            if (err) {
                return callback(err, null);
            }

            // if password does not match don't return user
            if (result === false) {
                var PassNoMatchError = new Error('Old password does not match.');
                PassNoMatchError.type = 'old_password_does_not_match';
                return callback(PassNoMatchError, null);
            }

            // generate the new password and save the changes
            passwordHelper.hash(newPassword, function (err, hashedPassword, salt) {
                self.password = hashedPassword;
                self.passwordSalt = salt;

                self.save(function (err, saved) {
                    if (err) {
                        return callback(err, null);
                    }

                    if (callback) {
                        return callback(err, {
                            success: true,
                            message: 'Password changed successfully.',
                            type: 'password_change_success'
                        });
                    }
                });
            });
        });
    });
};

// compile User model
module.exports = mongoose.model('User', UserSchema);