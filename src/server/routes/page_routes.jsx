var Page = require('../models/Page');
var bodyparser = require('body-parser');

module.exports = function (router) {
    router.use(bodyparser.json());


    // query DB for messages for a specific conversation
    router.get('/page/:page/:lng', function (req, res) {
        Page.find({page: req.params.page,lang:req.params.lng}, function (err, data) {
            if (err) {
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }


            res.json(data);
        });
    });


}
