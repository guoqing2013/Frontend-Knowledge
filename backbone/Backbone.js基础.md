
<!--
    http://toybuy360admin.gotoip4.com/?p=31
-->

<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet"> 


 
# Backbone.js教程
- - - 
## 一、Model
<pre>
var Person = Backbone.Model.extend({
    initialize: function() {
        console.log('Welcome to this world');
    }
});
var person = new Person();
</pre>
在new一个model的实例后就会触发initailize()函数（models，views和collections的工作机制都是一样的）


### 1. 设置属性
两种方式：在创建model实例时进行传参，也可以在实例生成后通过model.set(obj)来进行设置或修改
<pre>
var Person = Backbone.Model.extend({
    initialize: function() {
        console.log('Welcome to this world');
    }
});
var person = new Person({name: "John doe", age: 50});
delete person;

var person = new Person();
person.set({name: "Sally Doe", age: 29});
</pre>


### 2. 获取属性
使用model.get(name)方法获取属性值
<pre>
var Person = Backbone.Model.extend({});
var person = new Person({name: "John doe", age: 50});
var name = person.get('name'); //"John doe"
</pre>



### 3. 设置model默认属性
<pre>
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
</pre>



### 4. 操纵model的属性
<pre>
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
</pre>


### 5. 监听model的属性改变
通过 model.bind(event, callback)方法绑定change事件来监听属性改变。
this.bind("change", function(){}); 监听所有的属性
<pre>
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
</pre>



### 6. 在设置或存储属性的时候进行数据校验
<pre>
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
</pre>
person.toJSON();  返回对当前属性的copy  
person.attributes 返回属性的直接引用，对其的任何改变就等于实例属性本身的改变，建议使用set()来编辑模型的属性并使用backbone的监听器


### 7. 与服务器交互
模型被用来呈现来自服务器的数据以及将在你在模型上的操作转化为RESTful操作。  
  
一个模型的id属性指明了怎样在数据库汇总找到它，并且通常映射到surrogate key。  

在这里我们假设我们有一张叫做Users的mysql表格，它有id，name，email三列。  

服务器已经实现了一个RESTful URL /user，我们可以和它进行交互。  

我们的模型定义如下所示： 
<pre>
var UserModel = Backbone.Model.extend({
	urlRoot: '/user',
	defaults: {
		name: '',
		email: ''
	}
}); 
</pre>


### 8. 创建一个新模型
如果我们想要在服务器上创建一个新的用户我们需要实例化一个UserModel然后调用save方法。如果模型的id属性是null，Backbone.js就会发送一个POST请求到服务器的urlRoot。
<pre>
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
</pre>

我们的表格现在应该有这些值：  
<pre>
1,'Thomas','thomasalwydavis@gmail.com' 
</pre>



### 9. 获取一个模型
既然我们已经存储了一个新的user模型，我们可以从服务器获取它。我们知道上面例子中的id是1。  

如果我们实例化一个id是1的模型，Backbone.js将就自动加上’/id’从urlRoot发送一个get请求。（符合RESTful的传统）  
<pre>
//在这里我们设置了模型的id   
var user = new UserModel({id: 1});

//下面的获取将会执行GET /user/1    
//服务器将会从数据库中返回id,name以及email  
user.fetch({
    success: function(user) {
        alert(user.toJSON());
    }
});
</pre>



### 10. 更新一个模型
既然我们的模型已经存在于服务器上，我们可以使用一个PUT请求来执行一个更新操作。我们将使用save API，它很智能，如果已经有一个id存在它将发送一个PUT请求而不是一个POST请求。
<pre>
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
</pre>



### 11. 删除一个模型
当一个模型拥有了一个id时我们知道它已经存在于服务器上了，因此如果我们想要从吴福气上将它移除我们可以调用destory。destory将触发DELETE /user/id(符合RESTful的传统)。
<pre>
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
</pre>











## 二、View
### 1. “el”属性
"el"属性引用DOM对象，每个view都会有个"el"属性，如果没有定义的话它会默认创建一个空的div元素。
<pre>
<xmp>
<ul id="personList"></ul>
<script>
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
</script>
</xmp>
</pre>


### 2. 模板加载
<pre>
<xmp>
<ul id="personList"></ul>
<script id="personTemplate" type="text/template">
   <strong><%= name %></strong> (<%= age %>) - <%= occupation %> 
</script>

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

</xmp>
</pre>



### 3. 事件监听
<pre>
<xmp>

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


(function() {
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
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
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
})();

</xmp>
</pre>






## 三、Collection
### 1. 什么是一个集合
Backbone中的集合简单来说就是一列有序的模型。它可以被使用在例如下面例子这样的情形：
<pre>
- 模型：Student，集合：ClassStudents 
- 模型：Todo Item，集合：Todo List
- 模型：Animals，集合：Zoo
</pre>


一般来说你的集合只使用一种类型的模型，但是模型本身并不限于在一种类型的集合中使用：
<pre>
- 模型：Student，集合：Gym Class
- 模型：Student，集合：Art Class
- 模型：Student，集合：English Class
</pre>


下面是一个一般的模型/集合的例子：
<pre>
var Song = Backbone.Model.extend({
    initialize: function() {
        console.log('Music is the answer');
    }
});

var Album = Backbone.Collection.extend({
    model: Song
});
</pre>



### 2. 创建一个集合
<pre>
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
myAlbum.add(song4); //添加一条数据

</pre>



## 四、Router
### 1. 什么是一个路由
当使用了哈希标签(#)的时候，Backbone中的路由器用于将你的应用路由到相应的URL.在传统的MVC印象中路由似乎并不是必须的。然而Backbone中的路由器在你的应用需要URL路由/历史的功能时非常有用。

定义一个路由器需要至少一个路由以及一个映射到具体路由的函数。在下面的例子中我们将会来定义一个路由。

还要注意的一点是路由解释URL中位于”#”标签之后的任何东西。你的应用中的所有连接需要标的到”#/action”或者”#action”。(在哈希标签后面添加一个正斜杠看起来更好看，例如: http://example.com/#/user/help)。
<pre>
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
</pre>

<pre>
    var AppRouter = Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute"   //匹配 http://example.com/#anything-here
        },
        defaultRoute: function(actions) {
            console.log(actions);
        }
    });

   //初始化路由器 
    var appRouter = new AppRouter;
    Backbone.history.start();
</pre>



### 2. 动态路由
:params  匹配斜杠之间的任何URL内容  
*splats  匹配URL中的任何数字内容  
<pre>
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
</pre>



<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>  
<script >hljs.initHighlightingOnLoad();</script> 





































