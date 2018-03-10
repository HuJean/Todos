var express = require('express'),
    path = require("path"),
    url = require("url"),
    router = express.Router(),    
    formidable = require('formidable'),
    fs = require('fs'),
    TITLE = '主页',
    AVATAR_UPLOAD_FOLDER = '/images/',
    User = require('../models/user.js'),
    TodoList = require('../models/todolist.js');

router.get('/', function(req, res) {
  if(req.cookies.islogin){ 
      console.log('cookies:' + req.cookies.islogin);
      req.session.username = req.cookies.islogin;
  }
  if(req.session.username){    
      console.log('session:' + req.session.username);
      res.locals.username = req.session.username;      
  }else{
      //重定向到登陆页面
      res.redirect('/login');
      return;    
  }
  var userName = req.session.username||'';
  //查询数据库，获取所有的list
  TodoList.find({'username' : userName}, function(err, todolist) {
      if(!!todolist && todolist.length>0){
          res.locals.todolist = JSON.stringify(todolist); ;
      }else{
          res.locals.todolist = '';
      }
      req.session.todolist = res.locals.todolist;
      res.render('index',{title:'主页'});
    });

});

router.post('/update', function(req,res) {
    //console.log(req.body);
    var data = req.body;
    if(!!data){
        var username = data.username || '';
        var newItem = data.newItem || '';
        var state = data.state || '';

        var newTodoList = new TodoList({
            username: username,
            todo: newItem,
            state: state
        });
        newTodoList.save(function (err,result) {
            if (err){
                console.log(err);
            }else{
                if(!!result._id) {
                    //返回数据
                    data = {
                        Code:200,
                        todo: result.todo,
                        id: result._id
                    }
                    res.send(data);
                }else {
                    console.log("插入失败");
                }
            }
        });
    }
});
router.post('/updatebyid', function(req,res) {
    var data = req.body;
    if(!!data) {
        var id = data.id || '';
        var newItem = data.newItem || '';
        TodoList.update({_id:id}, {todo: newItem}, function (err, result) {
            if (err){
                console.log(err);
            }else{
                if(!!result && result.ok==1){
                    //返回数据
                    data = {
                        Code:200
                    }
                    res.send(data);
                }else {
                    console.log("更新失败");
                }
            }
        });
    }
});
router.post('/updatestatebyid', function(req,res) {
    var data = req.body;
    if(!!data) {
        var id = data.id || '';
        var newState = data.newState || '';
        TodoList.update({_id:id}, {state: newState}, function (err, result) {
            if (err){
                console.log(err);
            }else{
                if(!!result && result.ok==1){
                    //返回数据
                    data = {
                        Code:200
                    }
                    res.send(data);
                }else {
                    console.log("更新状态失败");
                }
            }
        });
    }
});

router.post('/delete', function(req,res) {
    var data = req.body;
    if(!!data){
        var _id = data._id || '';
        TodoList.remove({"_id":_id},function (err,result) {
            if (err){
                console.log(err);
            }else{
                if(!!result && result.ok==1) {
                    //返回数据
                    data = {
                        Code:200
                    }
                    res.send(data);
                }else {
                    console.log("删除失败");
                }
            }
        });
    }
});
router.post('/deleteByState', function(req,res) {
    var data = req.body;
    if(!!data){
        var username = data.username || '';
        var state = 1;
        TodoList.remove({"username":username,"state":state},function (err,result) {
            if (err){
                console.log(err);
            }else{
                if(!!result && result.ok==1) {
                    //返回数据
                    data = {
                        Code:200
                    }
                    res.send(data);
                }else {
                    console.log("清除完成失败");
                }
            }
        });
    }
});

router.post('/updatestatebycheck', function(req,res) {
    var data = req.body;
    if(!!data){
        var username = data.username || '';
        var state = data.state || '';
        TodoList.updateMany({"username":username},{"state":state},function (err,result) {
            if (err){
                console.log(err);
            }else{
                if(!!result && result.ok==1) {
                    //返回数据
                    data = {
                        Code:200
                    }
                    res.send(data);
                }else {
                    console.log("全选失败");
                }
            }
        });
    }
});


module.exports = router;