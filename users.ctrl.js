var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var pathJSON = path.join(__dirname, 'user.json');
var usersAll = require('./users.proc');
var newId = require('./shortid');

router.route('/')
    .get(function(req, res){
        usersAll.all()
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });

    })
// router.route('/one/:id')
//     .get(function(req, res) {
//         usersAll.read(req.params.id)
//             .then(function(success){
//                 res.send(success);
//             }, function(err){
//                 console.log(err);
//                 res.sendStatus(500);               
//             })
//     });
module.exports = router;