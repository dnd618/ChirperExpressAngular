var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var pathJSON = path.join(__dirname, 'data.json');
var chirpsAll = require('./ctrl.proc');
var newId = require('./shortid');
var timeStamp = require('./moment');




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
router.route('/one/:id')
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