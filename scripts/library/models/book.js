var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage: 'images/java4-front-500.jpg',
        title: 'No title',
        author: 'Unknown',
        releaseDate: 'Unknown',
        keywords: 'None'
    }
});
