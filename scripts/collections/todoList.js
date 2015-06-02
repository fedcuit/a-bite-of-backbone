var myTodoApp = myTodoApp || {};

myTodoApp.TodoList = Backbone.Collection.extend({
    model: myTodoApp.TodoItem
});
var todoList = new myTodoApp.TodoList();