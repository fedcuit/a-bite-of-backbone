var myTodoApp = myTodoApp || {};

myTodoApp.TodoItem = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },
    validate: function (attributes) {
        if (s(attributes.title).isBlank()) {
            return "Task name can not be empty";
        }
    }
});