var f=function(){
    var _ = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v');

    //获取页面对象
    var _btn = _e._$get('btnSub');
    var _inform = _e._$get('ale_msg');
    //item节点点击事件
    var onInputClick=function(_event){
        //参数获取
        //_event.preventDefault();
        var _userName= _e._$get('txtUserName');
        var _userPsw= _e._$get('txtUserPwd');
        var _userRePsw= _e._$get('txtUserRePwd');
        var _userNameVal= _userName.value.trim();
        var _userPswVal= _userPsw.value.trim();
        var _userRePswVal= _userRePsw.value.trim();
        if(_userNameVal.length == 0) {
            insertInform(_inform, '用户名不能为空');
            _userName.focus();
            _inform.style.display = "block";
            disappearElement(_inform, 2000);
            _event.preventDefault();
        }else if(_userPswVal.length == 0){
            insertInform(_inform,'密码不能为空');
            _userName.focus();
            _inform.style.display="block";
            disappearElement(_inform,2000);
            _event.preventDefault();
        }else if(_userRePswVal.length == 0){
            insertInform(_inform,'重复密码不能为空');
            _userName.focus();
            _inform.style.display="block";
            disappearElement(_inform,2000);
            _event.preventDefault();
        }else if(_userRePswVal != _userPswVal){
            insertInform(_inform,'两次密码不一致');
            _userName.focus();
            _inform.style.display="block";
            disappearElement(_inform,2000);
            _event.preventDefault();
        }
    }
    _v._$addEvent(_btn,'click',onInputClick);
    setTimeout(function(){
        _inform.style.display="none";
    },2000);

};
define(['{lib}base/event.js'],f);