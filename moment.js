var moment = require('moment');

function generateTimeStamp (req, res, next){
    var timeStamp = moment().format();
    req.body.timeStamp = timeStamp
    next();
};

module.exports.generateTimeStamp = generateTimeStamp;