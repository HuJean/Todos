var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_REG = '注册';

router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        //userRePwd = req.body['txtUserRePwd'],
        md5 = crypto.createHash('md5');
    userPwd = md5.update(userPwd).digest('hex');

    var newUser = new User({
      username: userName,
      userpwd: userPwd
    });

    //检查用户名是否已经存在
    User.find({"username":userName},function (error, results) {
        if(error){
            console.log("error :" + error);
        }else{
            if (results != null && results.length>0) {
                res.locals.error = '用户名已存在';
                res.render('reg', { title: TITLE_REG });
                return;
            }else{
                newUser.save(function (err,result) {
                    if (err) {
                        res.locals.error = err;
                        res.render('reg', { title: TITLE_REG });
                        return;
                    }else{
                        if(!!result._id) {
                            res.locals.success = '注册成功，点击去登陆。' ;
                        }else{
                            res.locals.error = '注册失败，请重新操作！';
                        }
                        res.render('reg', { title: TITLE_REG });
                    }
                });
            }

        }
    });
});

module.exports = router;