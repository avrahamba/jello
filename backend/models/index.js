const mongoose = require("mongoose");
const fs = require("fs");

const models = fs.readdirSync(__dirname + "/");

for (const model of models) {
    if (model === 'index.js' || model.includes(".orig")) continue;
    require(`./${model}`);
}

/**
 *
 * @type {Mongoose}
 */
module.exports = mongoose;