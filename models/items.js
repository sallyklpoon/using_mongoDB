let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let itemScheme = new Schema({
    name: String
});

module.exports = mongoose.model('items', itemScheme);