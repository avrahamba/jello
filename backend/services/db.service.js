Promise = require("bluebird");
Promise.config({
    longStackTraces: true,
    warnings: {
        wForgottenReturn: false
    }
});

// const MongoClient = require('mongodb').MongoClient;

const mongoose = require('../models')
// = require("mongoose");

const config = require('../config') // Can be shortend to '../config';
// When requiring just the folder, it will automatically look for index file


const connect = async () => {
    // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
    // by default, you need to set it to false.
    mongoose.set('useFindAndModify', false);

    //Connect to MongoDB with Mongoose
    mongoose.Promise = Promise;
    //Load the application models
    const db = await mongoose.connect(config.dbURL, {
        poolSize: 200,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });


    const mongo = mongoose.connection;
    mongo.on('error', error => console.log('mongo: ' + error.name))
    mongo.on('connected', () => console.log('mongo: Connected'))
    mongo.on('disconnected', () => console.log('mongo: Disconnected'))

    //Return the Mongoose connection instance
    return db;
}

module.exports = {
    connect
}
