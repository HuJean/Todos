var mongoose = require('./db.js');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    userpwd: {
        type: String
    }
});

module.exports = mongoose.model('User',UserSchema);