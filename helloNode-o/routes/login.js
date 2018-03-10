var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_LOGIN = '登录',
    TodoList = require('../models/todolist.js');

router.get('/', function(req, res) {
    res.render('login',{title:TITLE_LOGIN});
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        md5 = crypto.createHash('md5');
    var wherestr = {'username' : userName};
    User.find(wherestr, function(err, results){
        if(!!results && results.length>0){
            userPwd = md5.update(userPwd).digest('hex');
            if(results[0].username != userName || results[0].userpwd != userPwd){
                res.locals.error = '用户名或密码有误';
                res.render('login',{title:TITLE_LOGIN});
                return;
            }else{
                if(isRem){
                    //设置cookie
                    res.cookie('islogin', userName, { maxAge: 600000 });
                }
                res.locals.username = userName;
                req.session.username = res.locals.username;
                //获取todolist
                TodoList.find({'username' : userName}, function(err, todolist) {
                    if(!!todolist && todolist.length>0){
                        res.locals.todolist = JSON.stringify(todolist); ;
                    }else{
                        res.locals.todolist = '';
                    }
                    req.session.todolist = res.locals.todolist;
                    res.redirect('/');
                    return;
                });
            }
        }else{
            res.locals.error = '用户不存在';
            res.render('login',{title:TITLE_LOGIN});
        }
    });
});
module.exports = router;