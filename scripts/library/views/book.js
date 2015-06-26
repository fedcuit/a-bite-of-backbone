var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'bookContainer',
    staticTemplate: _.template($('#bookTemplate').html()),
    initialize: function () {
    },

    render: function () {
        debugger;
        this.$el.html(this.staticTemplate(this.model.toJSON()));
        return this;
    }
});