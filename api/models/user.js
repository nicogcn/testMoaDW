var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const usersSchema = new Schema({
    _id: String,
    email: String,
    hats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hat' }]
});

module.exports = mongoose.model('User', usersSchema);
