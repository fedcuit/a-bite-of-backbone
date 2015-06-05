var myTodoApp = myTodoApp || {};

myTodoApp.TodoItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template($("#todoItemTemplate").html()),
    initialize: function () {
        this.render();
        this.listenTo(this.model, "destroy", this.remove);
    },
    render: function () {
        return this.$el.html(this.template(this.model.attributes));
    },
    events: {
        "change .toggle": "handleToggle",
        "click .destroy": "handleDestroy"
    },
    handleToggle: function () {
        this.model.set("completed", this.$('.toggle').prop('checked'));
    },

    handleDestroy: function () {
        this.model.destroy();
    }
});
