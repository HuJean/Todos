Regular.event('enter', function(element, fire){
    Regular.dom.on(element, 'keypress', function(ev){
        if(ev.which === 13) fire(ev)
    })
});

var Todo = Regular.extend({
    name: "todo",
    template: "#todo",
    // edit an old todo
    editTodoDes: function(todo){
        //后台交互
        updateStateById(todo.id,todo.description);
        this.data.todo.editing = false
    },
    //修改状态
    changeStete: function(todo){
        updateStateById (todo.id,todo.completed==1?0:1);
    }
});

var TodoMVC = Regular.extend({
    template: '#todomvc', // id | template string | preparsed ast
    // get the list;
    computed: {
        completedLength: "this.getList('completed').length",
        activeLength: "this.getList('active').length",
        allCompleted: {
            get: function(){
                return this.data.todos.length === this.getList('completed').length
            },
            set: function(sign){
                this.data.todos.forEach(function(item){
                    item.completed = sign;
                })
            }
        }
    },
    getList: function(filter){
        if(!filter || filter === 'all')
            return this.data.todos;
        else
            return this.data.todos.filter(function(item){
                return filter === 'completed'? item.completed : !item.completed;
            });
    },
    // toggle all todo's completed state
    toggleAll: function(sign){
        this.data.todos.forEach(function(item){
            return item.completed = !sign;
        });
    },
    // clear all compleled
    clearCompleted: function(){
        var _username = this.data.username;
        this.data.todos = this.data.todos.filter(function(item){
            deleteByState(_username);
            return !item.completed
        });
    },
    // create a new todo
    newTodo: function(editTodo){
        var data = this.data;
        //后台交互
        updateTodo(data.username,editTodo,0);
        this.data.todos.unshift({completed:0,description:editTodo,id:document.getElementById('todoid').value});
        this.data.editTodo = "";
    },
    //delete a todo
    deleteTodo: function(todo,index){
        //后台交互
        deleteById(todo.id);
        this.data.todos.splice(index,1);
    },
    updateAll: function (allCompleted) {
        updateStateByCheck(this.data.username,allCompleted?0:1);
    }
});
