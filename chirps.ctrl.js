var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var pathJSON = path.join(__dirname, 'data.json');
var chirpsAll = require('./chirps.proc');


//In class example for getting all users and chirps
router.route('/')
    .get(function(req, res, next) {
        var chirps = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        var users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

        var userMap = {};

        users.forEach(function(user) {
            userMap[user.id] = user.username;

        });

        chirps.forEach(function(chirp) {
            if (!userMap.hasOwnProperty(chirp.userid.toString())) {
                chirp.user = 'anonymous';
            } else {
                chirp.user = userMap[chirp.userid.toString()];
            }
        });

        res.send(chirps);
    });
//
router.route('/')
    .get(function(req, res){
        chirpsAll.all()
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });

    })

    .post(newId, timeStamp.generateTimeStamp, function(req, res){
        chirpsAll.create(req.body)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);
            })
    })

    .put(function(req, res){
        chirpsAll.update(req.body)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);
            })
        
    })

    .delete(function(req, res){
        chirpsAll.destroy(req.body.id)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);               
            })
        
    })
router.route('/user/:id')
    .get(function(req, res) {
        chirpsAll.read(req.params.id)
            .then(function(success){
                res.send(success);
            }, function(err){
                console.log(err);
                res.sendStatus(500);               
            })
    });
module.exports = router;

