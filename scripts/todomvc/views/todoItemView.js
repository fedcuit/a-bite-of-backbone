var myTodoApp = myTodoApp || {};

myTodoApp.TodoItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item',
    template: _.template($("#todoItemTemplate").html()),
    initialize: function () {
        this.render();
        this.listenTo(this.model, "destroy", this.remove);
        this.listenTo(this.model, "change", this.render);
        this.listenTo(this.model, "visible:completed", this.showCompleted);
        this.listenTo(this.model, "visible:uncompleted", this.showUncompleted);
        this.listenTo(this.model, "visible:all", this.showAll);
    },
    render: function () {
        return this.$el.html(this.template(this.model.attributes));
    },
    events: {
        "change .toggle": "handleToggle",
        "click .destroy": "handleDestroy"
    },
    handleToggle: function () {
        this.model.save({"completed": this.$('.toggle').prop('checked')});
    },

    handleDestroy: function () {
        this.model.destroy();
    },
    showCompleted: function () {
        this.$el.toggleClass('hidden', !this.model.get("completed"));
    },
    showUncompleted: function () {
        this.$el.toggleClass('hidden', this.model.get("completed"));
    },
    showAll: function () {
        this.$el.removeClass('hidden');
    }
});
