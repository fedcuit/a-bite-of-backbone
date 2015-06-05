var myTodoApp = myTodoApp || {};

myTodoApp.TodoListView = Backbone.View.extend({
    el: $("#mainContent"),
    initComponents: function () {
        this.$toggleAll = this.$('.toggle-all');
        this.$newItemTitle = this.$(".newItem .title");
        this.$items = this.$('.items');
        this.$itemCount = this.$('.badge');
    },
    initialize: function () {
        this.initComponents();
        this.listenTo(todoList, "add", this.addNew);
        this.listenTo(todoList, "add remove", this.updateCounter);
    },
    events: {
        "click .newItem .add": "addByClick",
        "keypress .newItem .title": "addByEnter",
        "change .toggle-all": "toggleAll",
        "click .completed": "filterCompleted",
        "click .uncompleted": "filterUncompleted",
        "click .all": "filterAll",
        "click .clear-done": "clearDone"
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
    },
    updateCounter: function () {
        this.$itemCount.text(todoList.models.length);
    },
    filterCompleted: function () {
        todoList.each(function (todo) {
            todo.trigger("visible:completed");
        });
    },
    filterUncompleted: function () {
        todoList.each(function (todo) {
            todo.trigger("visible:uncompleted");
        });
    },
    filterAll: function () {
        todoList.each(function (todo) {
            todo.trigger("visible:all");
        });
    },
    clearDone: function () {
        todoList.chain().filter(function (todo) {
            return todo.get("completed");
        }).each(function (todo) {
            todo.destroy();
        });
    }
});