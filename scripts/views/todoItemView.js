var myTodoApp = myTodoApp || {};

myTodoApp.TodoItemView = Backbone.View.extend({
    el: $("#mainContent"),
    template: _.template($("#todoItemTemplate").html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
    },
    events: {
        "click .toggle": "handleToggle",
        "click .destroy": "handleDestroy"
    },
    handleToggle: function () {
        alert("are you going to check this one?");
    },

    handleDestroy: function () {
        alert("are you going to destroy this one?")
    }
});
