const mongoose = require("mongoose");

const dbConnection = function() {
    mongoose.connect('mongodb://127.0.0.1:27017/myLoginRegisterDB')
    .then(function() {
        console.log('connection is successful');
    });
}

module.exports = dbConnection;
