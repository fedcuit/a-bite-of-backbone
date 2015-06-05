var myTodoApp = myTodoApp || {};

myTodoApp.TodoList = Backbone.Collection.extend({
    model: myTodoApp.TodoItem,
    localStorage: new Backbone.LocalStorage('a-bit-of-backbone')
});
var todoList = new myTodoApp.TodoList();