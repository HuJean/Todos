define(['{lib}base/event.js',
    '{pro}/util.js',
    '{pro}/rtodos.js'
],function() {
    var _ = NEJ.P,
        _g = window,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _p = _('nej.ut');

    //组件注入
    var _todolist = _e._$get('listValue');
    var _listValue = [];
    var todos = [];
    if(!!_todolist){
        var _value = _todolist.value;
        if(!!_value){
            _listValue = JSON.parse(_value);
        }
    }
    if(!!_listValue){
        var _len = _listValue.length;
        for(var i=0;i<_len;i++){
            todos.unshift({completed:_listValue[i].state,description:_listValue[i].todo,id:_listValue[i]._id});
        }
    }
    var app = new TodoMVC({
        data: {
            todos: todos,
            username: _e._$get('nameinput').value
        }
    }).$inject("#todoapp");
});
