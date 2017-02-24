var Message = require('../models/Message');
var bodyparser = require('body-parser');

module.exports = function (router) {
    router.use(bodyparser.json());

    //post a new message to db
    router.post('/message/add', function (req, res) {
        var newMessage = new Message(req.body);
        newMessage.save(function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json({result: data});

        });
    });  //get list message group
    router.get('/message/group/:groupId', function (req, res) {
        Message.find({
            groupId: req.params.groupId
        }, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }

            res.json({result: data});
        });
    });


}
