var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hatsSchema = new Schema({
    _id: String,
    name: String,
    price: String,
    material: String
});

module.exports = mongoose.model('Hat', hatsSchema);
