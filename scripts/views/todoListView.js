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

        this.render();
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
    render: function() {
        todoList.fetch({reset: true});
        todoList.each(function (todo) {
            this.renderItem(todo);
        }, this);
    },
    addByClick: function () {
        todoList.create({title: this.$newItemTitle.val()});
    },
    addByEnter: function (event) {
        if (event.charCode == 13) {
            this.addByClick();
        }
    },
    renderItem: function (item) {
        var todoItemView = new myTodoApp.TodoItemView({"model": item});
        this.$items.append(todoItemView.render());
    },
    addNew: function (newItem) {
        if (newItem.isValid()) {
            this.renderItem(newItem);
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