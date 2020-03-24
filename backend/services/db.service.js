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

module.exports = {
    connect
}

async function connect() {
    // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
    // by default, you need to set it to false.
    mongoose.set('useFindAndModify', false);
    /*if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }*/
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




