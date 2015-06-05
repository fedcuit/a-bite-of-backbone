var myTodoApp = myTodoApp || {};

myTodoApp.TodoList = Backbone.Collection.extend({
    model: myTodoApp.TodoItem,
    localStorage: new Backbone.LocalStorage('a-bit-of-backbone'),
    filterCompleted: function () {
        this.each(function (todo) {
            todo.trigger("visible:completed");
        });
    },
    filterUncompleted: function () {
        this.each(function (todo) {
            todo.trigger("visible:uncompleted");
        });
    },
    filterAll: function () {
        this.each(function (todo) {
            todo.trigger("visible:all");
        });
    },
    clearDone: function () {
        this.chain().filter(function (todo) {
            return todo.get("completed");
        }).each(function (todo) {
            todo.destroy();
        });
    },
    toggleAll: function (checked) {
        todoList.each(function (todo) {
            todo.set('completed', checked);
            todo.save();
        }, this);
    }
});
var todoList = new myTodoApp.TodoList();