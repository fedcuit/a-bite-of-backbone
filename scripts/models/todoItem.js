var myTodoApp = myTodoApp || {};

myTodoApp.TodoItem = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    }
});