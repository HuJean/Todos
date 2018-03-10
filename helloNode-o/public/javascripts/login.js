var f=function(){
    var _ = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v');
    //获取页面对象
    var _btn = _e._$get('btnSub');
    var _inform = _e._$get('ale_msg');
    var _userName = _e._$get('txtUserName');
    //按钮回调函数
    var onInputClick=function(_event){
        var _userName= _e._$get('txtUserName');
        var _userPsw= _e._$get('txtUserPwd');
        var _userNameVal= _userName.value.trim();
        var _userPswVal= _userPsw.value.trim();
        if(_userNameVal.length == 0){
            insertInform(_inform,'用户名不能为空');
            _userName.focus();
            var box=_e._$get('errorTip');
            _inform.style.display="block";
            disappearElement(box,2000);
            _event.preventDefault();
        }else if(_userPswVal.length == 0){
            insertInform(_inform,'密码不能为空');
            _userPsw.focus();
            var box=_e._$get('errorTip');
            _inform.style.display="block";
            disappearElement(box,2000);
            _event.preventDefault();
        }
    }
    _v._$addEvent(_btn,'click',onInputClick);

    setTimeout(function(){
        _inform.style.display="none";
    },2000);

    //检查cookie 是不是存在记录
    var _cookie = document.cookie;
    if(!!_cookie){
        var _c = _cookie.split("=");
        _userName.value = _c[1];
        //直接跳转到index页面
        window.location.href = "/";

    }

};
define(['{lib}base/event.js'],f);