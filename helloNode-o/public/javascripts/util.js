function insertInform(element,errorMsg) {
    var errorTip = document.createElement('div');
    errorTip.innerHTML = '<div id="errorTip" class="alert alert-warning">'+errorMsg+'</div> ';
    element.insertAdjacentElement("afterbegin",errorTip);
}
function disappearElement(element,time) {
    setTimeout(function(){
        element.style.display="none";
        //删除errortip
        var _delete =document.getElementById("errorTip");
        _delete.innerHTML = '';
    },time);
}
var updateTodo = function (username,newItem,state) {
    var _url = '/update';
    $.ajax({
        url: _url,
        type: 'post',
        data: {
            username: username,
            newItem: newItem,
            state: state
        },
        success: function (data) {
            if(!!data && data.Code==200){
                document.getElementById('todoid').value = data.id;
                console.log("success new");
            }
        },
        error:function (error) {
            console.log("error");
        }
    });
};
var updateTodoById = function (id,newItem) {
    var _url = '/updatebyid';
    $.ajax({
        url: _url,
        type: 'post',
        data: {
            id: id,
            newItem: newItem
        },
        success: function (data) {
            if(!!data && data.Code==200){
                console.log("success update by id");
            }
        },
        error:function (error) {
            console.log("error");
        }
    });
};
var updateStateById = function (id,newState) {
    var _url = '/updatestatebyid';
    $.ajax({
        url: _url,
        type: 'post',
        data: {
            id: id,
            newState: newState
        },
        success: function (data) {
            if(!!data && data.Code==200){
                //更新页面
                console.log("success upstate by id");
            }
        },
        error:function (error) {
            console.log("error");
        }
    });
};
var updateStateByCheck = function(username,state){
    $.ajax({
        url: '/updatestatebycheck',
        type: 'post',
        data: {
            username: username,
            state: state
        },
        success: function (data) {
            if(!!data && data.Code==200){
                console.log("success update state by check");
            }
        },
        error:function (error) {
            console.log("error");
        }
    });
};
var deleteById = function (id) {
    $.ajax({
        url: '/delete',
        type: 'post',
        data: {
            _id: id
        },
        success: function (data) {
            if(!!data && data.Code==200){
                console.log("success delete by id");
            }
        },
        error:function (error) {
            console.log("error");
        }
    });
};
var deleteByState = function(username){
    $.ajax({
        url: '/deleteByState',
        type: 'post',
        data: {
            username: username
        },
        success: function (data) {
            if(!!data && data.Code==200){
                //删除当前li
                console.log("success delete by state");
            }
        },
        error:function (error) {
            console.log("error");
        }
    });
};