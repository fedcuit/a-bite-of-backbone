
A bit of Backbone
==========
这个项目包含了一些我在学习Backbone的练习过的例子, 另外还有一些笔记.

比较有用的一些资料

* [Backbone API](http://backbonejs.org/#Events) 
* [Backbone tutorials](https://backbonetutorials.com/)
* [TodoMVC](http://todomvc.com/examples/backbone/)

***

Model
-------

在`Backbone`的理念中, 一个`Model`应该算是存在于客户端的与服器端`resource`/`entity`对应的一个JS对象, 定义一个`Model`很简单:

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
  console.log(JSON.stringify(todoItem.toJSON()));
  // {"title":"","completed":false}
  ```
  * 当创建Model实例时传入了对象, 那么这个对象会跟`defaults`进行merge
  ``` javascript
  var todoItem = new TodoItem({"newAttr": "valueOfNewAttr", "title": "Build a time machine"});
  console.log(JSON.stringify(todoItem.toJSON()));
  // {"newAttr":"valueOfNewAttr","title":"Build a time machine","completed":false}
  ```
* `validate`

   将对`Model`的验证逻辑放在这个属性对应的方法中, 一般情况下, 我们不会直接调用这个`validate`方法, 而它扮演的角色有点像`实现`定义在父类中的`抽象方法`, 而这个方法会在`Model`的其他方法中被用到, 比如以下的这些方法:
   * `isValid()`
   我们可以调用`Model`上的`isValid()`方法来判断这个`Model`上的属性值满足验证条件
   
   ```javascript
   TodoItem = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },
    validate: function (attributes, options) {
        if (attributes.title.indexOf("<") != -1) {
            return "html tag is now allowed is title"
        }
    }
   });
   var todoItem = new TodoItem({
       "title": "<script>...</script>"
   });
   console.log(todoItem.isValid());
   // false
   ```
   * `save()` or `set()`
   
        默认情况下调用`Model`的`save()`方法会触发`validate()`, 可以通过在`save()`的时候使用option `{validate: false}`来跳过验证. 类似的, 也可以在`set()`时通过option `{validate: true}`来触发验证.
        > `validate()`方法的返回值比较有趣, 如果验证通过了, 则什么都不用返回, 如果验证失败了, 则需要返回点什么(字符中或是对象都可以).
   
   `validate()`方法验证失败之后有两件事件会发现:

   1. 将`validate()`返回的结果添加到`Model`中, 可以通过`model.validationError`来访问
   2. 在`Model`上触发`invalid`事件, 并像model和error绑定对回调函数上

View
---------
简单讲, `View`就是用来展示`Model`里面的数据的.

这样可以简单回顾一下我用过的一些前端JS框架是怎么处理数据展示的, 从最原始的jQuery开始:
只使用jQuery的时候, 当我们已经通过AJAX拿到数据之后, 我们可能需要先定位到需要显示数据的元素然后通过`el.val('...')`或者`el.text('...')`将数据手动设置上去. 当元素的值被更新之后需要将修改反应到后端时, 我们可能需要取到所有的元素的最新值然后发送到后台.

如上面那样通过操作对应的单个的DOM元素去设置值的方式写起来很繁琐, 如果返回的数据里面有十几甚至几十个条目的话, 写出来的代码更是毫无美感可言, 于是人们想到了使用JS`模板`, 通过一段通常是写在`<head></head>`中`<script type="text/template" id="myTemplate">...</script>`来表示最终要后面的HTML的结构, 在其中使用占位符来标识哪里部分需要被真正传入的数据替换. 定义好模板后, 当拿到AJAX的返回结果时, 我们只需要将数据填充到这个模板, 然后将生成的HTML添加到页面中就可以了, 一句话就可以搞定, 比如 `$container.html(_.template($('#myTemplate'), ajaxReponseData))`. 比较常用的模板引擎有`mustache`, `underscore template`

事情发展到这里还没完, 现在数据显示的问题解决的差不多了, 但是如果用户将某些DOM元素的值修改之后, 我们还需要将所有的元素的值读取一遍, 然后将这些值发送到后台去更新这条记录. 我们通过模板技术解决了繁琐的DOM设值, 但是数据的更新还是一个问题.

一起来看看Backbone的`View`是如何解决这个问题.

首先我们需要定义一个Backbone `View`, 定义的方法与`Model`非常的类似, 只需要继承`View`就可以了:
``` javascript
TodoItemView = Backbone.View.extend({
    template: _.template($("#todoItemTemplate").html()),
    initialize: function () {
        this.render();
    },
    render: function () {
        return this.$el.html(this.template(this.model.attributes));
    },
    events: {
        "click .toggle": "handleToggle",
        "click .destroy": "handleDestroy"
    },
    handleToggle: function () {
        this.model.set('completed', this.$('.toggle').prop('checked'));
    }
}
```
与上面提到的方式不同, Backbone `View`实现了细粒度的数据更新, 通过对对应的组件进行事件监听, 当某个组件的值被修改时, 只需要将被修改的属性更新到`Model`中.

下面介绍一下`View`中比较重要的几个属性(钩子):
* `initialize`

    通常在这个属性对应的方法里面去生成最初的视图, 如上例中所求, 在`initialize`方法中将模板填充之后添加到`View`对应的HTML容器中.
* `el`
    
    这个属性通常是一个_css selector_, 对应页面中这个`View`将被添加到HTML元素, 可以理解成是这个`View`的container, 个人理解是在创建Backbone `Collection`, `View`, `Model`的实例的时候, 都可以向其中传入一个对象, 这个对象的属性会与定义时的那些属性进行merge. 所以`el`既可以声明在`View`类的定义中, 也可以通过参加传入, 如 `var todoItemView = new TodoItemView({el: jQuery('.todoItem'});`
    在`View`内部使用的时候, 通常是通过`this.$el`来操作这个容器, `this.$el`将会引用你配置的`el`对应的jQuery对象.
    除了`el`之外, 还有一些其他的属性也是跟`View`的容器想关的:
    * `tagName`
    * `className`
    
    如果没有配置`View`的`el`属性, 那么默认将使用一个`DIV`来包装`View`的内容, 这时候如果配置了`tagName`, 那么就会使用`<tagName></tagName>`来包装, 如果还有`className`的话, 那就变成了`<tagName class="valueOfClassNameProp"></tagName>`
* `this.$('css selector')`

    一开始我也比较疑惑`this.$()`与`$()`有什么区别, 看了源码之后才发现原来`this.$()`是在当时`View`的范围内查找元素, 是个挺实用的方法.
    ```javascript
    $: function(selector) {
      return this.$el.find(selector);
    },
    ```
* `events`

    这个属性应该是`View`所特有的, 它里面定义了一组元素上可能发生的事件以及对应的处理方法, 如:
    ```javascript
    events: {
        "click .toggle": "handleToggle",
        "click .destroy": "handleDestroy"
    },
    handleToggle: function () {
        this.model.set('completed', this.$('.toggle').prop('checked'));
    }
    ```
    如在`.toggle`元素上点击时会执行`handleToggle`方法. 这种事件监听方式其实与`jQuery.on()`非常的类似:
    * `jQuery.on(eventType, selector, handler)`
    * `"eventType selector": "handler"`

