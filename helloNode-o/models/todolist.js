var mongoose = require('./db.js');
var Schema = mongoose.Schema;
//用户名 todo内容 状态
var TodoListSchema = new Schema({
    username : {
        type: String
    },
    todo: {
        type: String
    },
    state: {
        type: Number
    }
});

module.exports = mongoose.model('TodoList',TodoListSchema);