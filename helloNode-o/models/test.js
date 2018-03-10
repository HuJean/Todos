var User = require("./user.js");
/**
 * 插入
 */
/*function insert(id,name,pwd) {
    var user = new User({
        uid : id,
        username:name,
        userpwd: pwd
    });

    user.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    });
}*/
/**
 * 更新
 */
/*function update(id,name,pwd){
    var wherestr = {'uid' : id};
    var updatestr = {
        'username': name,
        'userpwd': pwd
    };
    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}*/
/**
 * 删除
 */
/*function del(id){
    var wherestr = {'uid' : id};
    User.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}*/
/**
 * 查找
 */
/*
function getById(id){
    var wherestr = {'uid' : id};
    User.find(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}*/
