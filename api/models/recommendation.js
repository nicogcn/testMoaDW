var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const recommendationsSchema = new Schema({
    _id: String,
    name: String,
    material: String,
    price: String
});

module.exports = mongoose.model('Recommendation', recommendationsSchema);
