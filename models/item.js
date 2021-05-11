let mongoose = require('mongoose');

let Schema = mongoose.Schema

let itemScheme = new Schema({
    item: String
})

module.exports = mongoose.model('item', itemScheme)