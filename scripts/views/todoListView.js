var myTodoApp = myTodoApp || {};

myTodoApp.TodoListView = Backbone.View.extend({
    el: $("#mainContent"),
    initialize: function () {
        this.$newItemTitle = this.$(".newItem .title");
        this.$items = this.$('.items');
        this.listenTo(todoList, "add", this.addNew);
    },
    events: {
        "click .newItem .add": "addNewItem"
    },
    addNewItem: function () {
        var todoItem = new myTodoApp.TodoItem({title: this.$newItemTitle.val()});
        todoList.push(todoItem);
    },
    addNew: function (newItem) {
        var todoItemView = new myTodoApp.TodoItemView({"model": newItem});
        this.$items.append(todoItemView.render());
    }
});