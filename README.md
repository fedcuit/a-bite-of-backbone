
A bit of Backbone
==========
这个项目包含了一些我在学习Backbone的练习过的例子, 另外还有一些笔记.

比较有用的一些资料

* [Backbone API](http://backbonejs.org/#Events) 
* [Backbone turorials](https://backbonetutorials.com/)
* [TodoMVC](http://todomvc.com/examples/backbone/)

***

Model
-------

在`Backbone`的理念中, 一个`Model`应该算是存在于客户端的与服器端`resource`/`entiry`对应的一个JS对象, 定义一个`Model`很简单:

``` javascript
TodoItem = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },
    validate: function (attributes) {
      // validation goes here
    }
})
```

创建一个`Model`的实例就是创建一个对象 `var todoItem = new TodoItem()`, 下面对定义在`Model`中的常用属性做一下说明(_这些属性其实是一些钩子, `Backbone`希望我们去重写这些属性_)

* `defaults`

  通过这个属性来指定`Model`的默认值
  * 当创建Model实例的时候没有传入对象来初始化, 那么这个实例的属性就与`defaults`指定的属性值是一致的, 如:
  
  ``` javascript
  var todoItem = new TodoItem();
  console.log(JSON.stringify(todoItem.toJSON()))
  // {"title":"","completed":false}
  ```
  * 当创建Model实例时传入了对象, 那么这个对象会跟`defaults`进行merge
  ``` javascript
  var todoItem = new TodoItem({"newAttr": "valueOfNewAttr", "title": "Build a time machine"})
  console.log(JSON.stringify(todoItem.toJSON()))
  // {"newAttr":"valueOfNewAttr","title":"Build a time machine","completed":false}
  ```
