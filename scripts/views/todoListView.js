var myTodoApp = myTodoApp || {};

myTodoApp.TodoListView = Backbone.View.extend({
    el: $("#mainContent"),
    initialize: function () {
        this.$toggleAll = this.$('.toggle-all');
        this.$newItemTitle = this.$(".newItem .title");
        this.$items = this.$('.items');
        this.listenTo(todoList, "add", this.addNew);
    },
    events: {
        "click .newItem .add": "addByClick",
        "keypress .newItem .title": "addByEnter",
        "change .toggle-all": "toggleAll"
    },
    addByClick: function () {
        var todoItem = new myTodoApp.TodoItem({title: this.$newItemTitle.val()});
        todoList.push(todoItem);
    },
    addByEnter: function (event) {
        if (event.charCode == 13) {
            this.addByClick();
        }
    },
    addNew: function (newItem) {
        if (newItem.isValid()) {
            var todoItemView = new myTodoApp.TodoItemView({"model": newItem});
            this.$items.append(todoItemView.render());
            this.$newItemTitle.val('');
        } else {
            alert(newItem.validationError);
        }
    },
    toggleAll: function () {
        var self = this;
        todoList.each(function (todo) {
            todo.set('completed', self.$toggleAll.prop("checked"));
        });
    }
});