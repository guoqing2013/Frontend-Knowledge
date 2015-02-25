<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>


<!--
    
-->



 
## Backbone.js教程 

> Backbone用于创建 MVC 类应用程序。  
> 模型-视图-控制器 (MVC) 是一个常见模式，其思想就是将视图和模型分离，通过控制器来连接他们  
> MVC支持将数据（比如通常用于Ajax交互的JSON对象）从表示层或从页面的文档对象模型（DOM）中分离出来，也可适用于客户端开发。


### 一、Model

    var Person = Backbone.Model.extend({
        initialize: function() {
            console.log('Welcome to this world');
        }
    });
    var person = new Person();

在new一个model的实例后就会触发initailize()函数（models，views和collections的工作机制都是一样的）


#### 1. 设置属性
两种方式：在创建model实例时进行传参，也可以在实例生成后通过model.set(obj)来进行设置或修改

    var Person = Backbone.Model.extend({
        initialize: function() {
            console.log('Welcome to this world');
        }
    });
    var person = new Person({name: "John doe", age: 50});
    delete person;

    var person = new Person();
    person.set({name: "Sally Doe", age: 29});



#### 2. 获取属性
使用model.get(name)方法获取属性值

    var Person = Backbone.Model.extend({});
    var person = new Person({name: "John doe", age: 50});
    var name = person.get('name'); //"John doe"




#### 3. 设置model默认属性

    var Person = Backbone.Model.extend({
        defaults: {
            name: 'John Doe',
            age: 30,
            children: []
        }
    });
    var person = new Person({
        name: "John doe",
        age: 50,
        children: ['Ryan']
    });
    var name = person.get('name'); //"John doe"



#### 4. 操纵model的属性

    var Person = Backbone.Model.extend({
        defaults: {
            name: 'John Doe',
            age: 30,
            children: []
        },
        adopt: function(newChildsName) {
            var childrenArray = this.get('children');
            childrenArray.push(newChildsName);
            this.set({children: childrenArray});
        }
    });

    var person = new Person({
        name: "John doe",
        age: 50,
        children: ['Ryan']
    });
    person.adopt('John Resig');
    var children = person.get('children'); // ["Ryan", "John Resig"]

    var person2 = new Person();
    var children2 = person2.get('children'); //[]


#### 5. 监听model的属性改变
通过 model.bind(event, callback)方法绑定change事件来监听属性改变。
this.bind("change", function(){}); 监听所有的属性

    var Person = Backbone.Model.extend({
        defaults: {
            name: 'John Doe',
            age: 30,
            occupation: 'worker'
        },
        initialize: function() {
            this.bind("change:name", function() {
                var name = this.get("name");
                console.log('new Name: ' + name );
            });
        },
        replaceNameAttr: function(name) {
            this.set({name: name});
        }
    });
    var person = new Person({name: "Jeffrey Way", age: 27});
    person.replaceNameAttr('Sally Doe');




#### 6. 在设置或存储属性的时候进行数据校验

    var Person = Backbone.Model.extend({
        defaults: {
            name: 'John Doe',
            age: 30,
            occupation: 'worker'
        },
        validate: function(attrs) {
            if (attrs.age < 0) {
                return 'age must be positive, stupid.';
            }
            if (!attrs.name) {
                return 'Every person must have a name, fool.';
            }
        },
        initialize: function() {
            this.on("invalid", function(model, error) {
                console.log(error);
            });
        }
    });

    var person = new Person();
    person.set({name: ''}, {validate: true}); //返回false
    person.set({age: -100}, {validate: true}); //返回false

    console.log(person.toJSON()); //{name: "John Doe", age: 30, occupation: "worker"}

person.toJSON();  返回对当前属性的copy
person.attributes 返回属性的直接引用，对其的任何改变就等于实例属性本身的改变，建议使用set()来编辑模型的属性并使用backbone的监听器


#### 7. 与服务器交互
模型被用来呈现来自服务器的数据以及将在你在模型上的操作转化为RESTful操作。  
  
一个模型的id属性指明了怎样在数据库汇总找到它，并且通常映射到surrogate key。  

在这里我们假设我们有一张叫做Users的mysql表格，它有id，name，email三列。  

服务器已经实现了一个RESTful URL /user，我们可以和它进行交互。  

我们的模型定义如下所示：

    var UserModel = Backbone.Model.extend({
        urlRoot: '/user',
        defaults: {
            name: '',
            email: ''
        }
    });



#### 8. 创建一个新模型
如果我们想要在服务器上创建一个新的用户我们需要实例化一个UserModel然后调用save方法。如果模型的id属性是null，Backbone.js就会发送一个POST请求到服务器的urlRoot。

    var UserModel = Backbone.Model.extend({
        urlRoot: '/user',
        defaults: {
            name: '',
            email: ''
        }
    });

    var user = new UserModel();
    //注意到我们没有设置一个'id'属性
    var userDetails = {
        name: 'Thomas',
        email: 'thomasalwyndavis@gmail.com'
    };
    //因为我们没有设置一个'id'属性，服务器将会调用POST /user 连同一个{name: 'Thomas',email: 'thomasalwydavis@gmail.com'}
    //服务器应该保存数据并且返回一个包含新的'id'的相应
    user.save(userDetails, {
        success: function(user) {
            alert(user.toJSON());
        }
    });

save() 函数将在后台委托给 Backbone.sync，这是负责发出 RESTful 请求的组件，默认使用 jQuery 函数 $.ajax()。
由于调用了 REST 风格架构，每个 Create、Read、Update 或 Delete (CRUD) 活动均会与各种不同类型的 HTTP 请求（POST、GET、PUT 和 DELETE）相关联。首先保存模型对象，使用一个 POST 请求，创建一个标识符 ID，其后，尝试发送对象到服务器，使用一个 PUT 请求。



我们的表格现在应该有这些值：

    1,'Thomas','thomasalwydavis@gmail.com'



#### 9. 获取一个模型
既然我们已经存储了一个新的user模型，我们可以从服务器获取它。我们知道上面例子中的id是1。  

如果我们实例化一个id是1的模型，Backbone.js将就自动加上’/id’从urlRoot发送一个get请求。（符合RESTful的传统）

    //在这里我们设置了模型的id
    var user = new UserModel({id: 1});

    //下面的获取将会执行GET /user/1
    //服务器将会从数据库中返回id,name以及email
    user.fetch({
        success: function(user) {
            alert(user.toJSON());
        }
    });



fetch()方法属于异步调用，因此，在等待服务器响应时，应用程序不会终止。在一些情况下，要操作来自服务器的原始数据，可以使用集合的parse()方法。

    var UserCollection = Backbone.Collection.extend({
        model: UserModel,
		url: '/user',
        parse: function(data) {
            // 'data' contains the raw JSON object
            console.log(data);
        }
    });
	



集合提供的另一个有趣的方法是 reset()，它允许将多个模型设置到一个集合中。reset() 方法可以非常方便地将数据引导到集合中，比如页面加载，来避免用户等待异步调用返回。


**自动模型构造**　　

利用 Collection 的 fetch ，可以加载服务端数据集合，与此同时，可以自动创建相关的Model实例，并调用构造方法


**元素重复判断**  　　　

Collection 会根据 Model 的 idAttribute 指定的唯一键，来判断元素是否重复，默认情况下唯一键是 id ，可以重写 *idAttribute* 来覆盖。当元素重复的时候，可以选择是丢弃重复元素，还是合并两种元素，默认是丢弃的


**模型转化**　　

有时从REST接口得到的数据并不能完全满足界面的处理需求，可以通过 Model.parse 或者 Collection.parse 方法，在实例化Backbone对象前，对数据进行预处理。
Model.parse 用来对返回的单个对象进行属性的处理，而 Collection.parse 用来对返回的集合进行处理，通常是过滤掉不必要的数据。例如：

    //只挑选type=1的book
    var Books = Backbone.Collection.extend({
        parse:function(models,options){
            return _.filter(models , function(model){
                return model.type == 1;
            })
        }
    })


    //为Book对象添加url属性，以便渲染
    var Book = Backbone.Model.extend({
        parse: function(model,options){
            return _.extend(model,{ url : '/books/' + model.id });
        }
    })


通过Collection的 fetch ，自动实例化的Model，其parse也会被调用。





#### 10. 更新一个模型
既然我们的模型已经存在于服务器上，我们可以使用一个PUT请求来执行一个更新操作。我们将使用save API，它很智能，如果已经有一个id存在它将发送一个PUT请求而不是一个POST请求。

    //这里我们设置这个模型的'id'
    var user = new UserModel({
        id: 1,
        name: 'Thomas',
        email: 'thomasalwydavis@gmail.com'
    });

    //现在我们改变name并更新服务器
    //因为已经有一个'id'存在了，Backbone.js将会连同
    //{name: 'Davis',email: 'thomasalwydavis@gmail.com'} 一起触发PUT /user/1
    user.save({name: 'Davis'},{
        success: function(model){
            alert(user.toJSON());
        }
    });




#### 11. 删除一个模型
当一个模型拥有了一个id时我们知道它已经存在于服务器上了，因此如果我们想要从吴福气上将它移除我们可以调用destory。destory将触发DELETE /user/id(符合RESTful的传统)。

    //在这里我们设置一个模型的'id'
    var user = new Usermodel({
        id: 1,
        name: 'Thomas',
        email: 'thomasalwyndavis@gmail.com'
    });

    //因为已经存在'id'，Backbone.js将会触发
    //DELETE /user/1
    user.destory({
        success: function(){
            alert('Destoryed');
        }
    });












### 二、View
#### 1. “el”属性
"el"属性引用DOM对象，每个view都会有个"el"属性，如果没有定义的话它会默认创建一个空的div元素。


    <ul id="personList"></ul>

　　　　

    var Person = Backbone.Model.extend({
        defaults: {
            name: 'John Doe',
            age: 30,
            occupation: 'worker'
        }
    });

    var PersonView = Backbone.View.extend({
        tagName: 'li',
        className: 'person',
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html( this.model.get('name') + '(' + this.model.get('age') + ') - ' + this.model.get('occupation') );
        }
    });

    var person = new Person();
    var personView = new PersonView({model: person});
    $("#personList").append(personView.el);





#### 2. 模板加载

html

    <ul id="personList"></ul>
    <script id="personTemplate" type="text/template">
       <strong><%= name %></strong> (<%= age %>) - <%= occupation %>
    </script>


js

    var Person = Backbone.Model.extend({
        defaults: {
            name: 'John Doe',
            age: 30,
            occupation: 'worker'
        }
    });

    var PersonView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#personTemplate').html()),
        //template: _.template("<strong><%= name %></strong> (<%= age %>) - <%= occupation %>"), //Inline Templates
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    var person = new Person();
    var personView = new PersonView({ model: person });
    $("#personList").append(personView.el);






#### 3. 事件监听

html

    <h1>My Tasks</h1>
    <form id="addTask">
        <input type="text" placeholder="Your new task" />
        <input type="submit" value="Add Task" />
    </form>
    <div class="tasks">
        <script id="taskTemplate" type="text/template">
            <span><%= title %></span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </script>
    </div>

js

    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.template = function(id) {
        return _.template($('#' + id).html());
    };

    App.Models.Task = Backbone.Model.extend({
        validate: function(attrs) {
            if( !$.trim(attrs.title) ) {
                return 'A task requires a valid title.' ;
            }
        }
    });

    App.Collections.Tasks = Backbone.Collection.extend({
        model: App.Models.Task
    });

    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',
        initialize: function() {
            this.collection.on('add', this.addOne, this);
        },
        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },
        addOne: function(task) {
            var taskView = new App.Views.Task({ model: task });
            this.$el.append(taskView.render().el)
        }
    });

    App.Views.Task = Backbone.View.extend({
        tagName: 'li',

        template: template('taskTemplate'),

        initialize: function() {
            this.model.on('change', this.render, this); //change:id 侦听到元素的id属性被change后，自动更新内部对model的引用关系
            this.model.on('destroy', this.remove, this); //destroy  侦听到元素的 destroy 事件后，会自动将元素从集合中移除，并引发 remove 事件
        },

        events: {
            'click .edit': 'editTask',
            'click .delete': 'destroy'
        },

        editTask: function() {
            var newTaskTitle = prompt('What would you like to change the text to?', this.model.get('title'));
            // if( !newTaskTitle ) { return };
            this.model.set('title', newTaskTitle, {validate: true});
        },

        destroy: function() {
            this.model.destroy();
        },

        remove: function() {
            this.$el.remove();
        },

        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }
    });

    App.Views.AddTask = Backbone.View.extend({
        el: '#addTask',

        events: {
            'submit': 'submit'
        },

        initialize: function() {

        },

        submit: function(e) {
            e.preventDefault();
            var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
            var task = new App.Models.Task({ title: newTaskTitle });
            console.log(task);
            this.collection.add(task);
        }

    });



    var tasksCollection = new App.Collections.Tasks([
        {
            title: 'Go to the store',
            priority: 4
        },
        {
            title: 'Go to the mall',
            priority: 3
        },
        {
            title: 'Get to work',
            priority: 5
        }
    ]);

    var addTaskView = new App.Views.AddTask({collection: tasksCollection});

    var tasksView = new App.Views.Tasks({collection: tasksCollection});

    $('.tasks').html(tasksView.render().el);









### 三、Collection
#### 1. 什么是一个集合
Backbone中的集合简单来说就是一列有序的模型。它可以被使用在例如下面例子这样的情形：

- 模型：Student，集合：ClassStudents 
- 模型：Todo Item，集合：Todo List
- 模型：Animals，集合：Zoo



一般来说你的集合只使用一种类型的模型，但是模型本身并不限于在一种类型的集合中使用：

- 模型：Student，集合：Gym Class
- 模型：Student，集合：Art Class
- 模型：Student，集合：English Class



下面是一个一般的模型/集合的例子：

    var Song = Backbone.Model.extend({
        initialize: function() {
            console.log('Music is the answer');
        }
    });

    var Album = Backbone.Collection.extend({
        model: Song
    });




#### 2. 创建一个集合

    var Song = Backbone.Model.extend({
        defaults: {
            name: "Not specified",
            artist: "Not specified"
        }
    });

    var Album = Backbone.Collection.extend({
        model: Song
    });

    var song1 = new Song({name: "How Bizarre", artist: "OMC"});
    var song2 = new Song({name: "Sexual Healing", artist:"Marvin Gaye"});
    var song3 = new Song({name: "Talk It Over In Bed", artist: "OMC"});

    var myAlbum = new Album([song1, song2, song3]);
    //var myAlbum = new Album([{name: "How Bizarre", artist: "OMC"}, {name: "Sexual Healing", artist:"Marvin Gaye"}, {name: "Talk It Over In Bed", artist: "OMC"}]); //or you can do this
    console.log(myAlbum.models);   // [song1,song2,song3]
    console.log(myAlbum.toJSON());
    console.log(myAlbum.at(0)); // song1

    var song4 = new Song({name: "Can't We Talk It Over In Bed", artist: "OMC"});
    // 使用 add()/remove() 方法可以将一个模型添加和移动到集合中
    myAlbum.add(song4);
    myAlbum.remove(song4);




### 四、Router
#### 1. 什么是一个路由
含有大量 Ajax 交互的应用程序越来越像那些无页面刷新的应用程序。这些应用程序常常试图限制与单个页面的交互。该 SPI 方法提高了效率和速度，并使整个应用程序变得更灵敏。状态概念代替了页面概念。散列 (Hash) 片段被用于识别一个特定状态。散列片段 是 URL 中散列标签 (#) 后的那部分，是该类应用程序的关键元素。

路由解释URL中位于”#”标签之后的任何东西。你的应用中的所有连接需要标的到”#/action”或者”#action”。(在hash标签后面添加一个正斜杠看起来更好看，例如: http://example.com/#/user/help)。  
第一种写法：

    var AppRouter = Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute"   //匹配 http://example.com/#anything-here
        }
    });

    //初始化路由器
    var appRouter = new AppRouter;
    appRouter.on('route:defaultRoute', function(actions) {
        console.log(actions);
    });

    Backbone.history.start();

第二种写法：

    var AppRouter = Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute"   //匹配 http://example.com/#anything-here
        },
        defaultRoute: function(actions) {
            console.log(actions);
        }
    });

    var appRouter = new AppRouter;  //初始化路由器
    Backbone.history.start();  //监视散列片段中的任何变更


当实例化路由器时，会生成 Backbone.history 对象；它将自动引用 Backbone.History 函数。
Backbone.History 负责匹配路由和 router 对象中定义的活动。start() 方法触发后，将创建 Backbone.history 的 fragment 属性。它包含散列片段的值。该序列在根据状态次序管理浏览器历史方面十分有用。用户如果想要返回前一状态，单击浏览器的返回按钮。

通过一个启用 HTML5 特性 pushState 的配置调用 start() 方法。
对于那些支持 pushState 的浏览器，Backbone 将监视 popstate 事件以触发一个新状态。如果浏览器不能支持 HTML5 特性，那么 onhashchange 活动会被监视。如果浏览器不支持该事件，轮询技术将监视 URL 散列片段的任何更改。

#### 2. 动态路由
:params  匹配斜杠之间的任何URL内容  
*splats  匹配URL中的任何数字内容  

    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'index',
            'show/:id': 'show',
            'download/*filename': 'download',
            'search/:query': 'search',
            '*other': 'default'
        },
        index: function() {
            console.log('hi here from the index page');
        },
        show: function(id) {
            console.log('show route for id of ' + id);
        },
        download: function(filename) {
            console.log(filename);
        },
        search: function(query) {

        },
        default: function(other) {
            alert('Hmmm. not sure what you need here? You accessed to ' + other);
        }
    });

    new AppRouter;
    Backbone.history.start();









































