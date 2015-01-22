<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>

<!--
http://www.tuicool.com/articles/na67bm
-->


##backbone与服务器同步数据

backbone 默认实现了一套与RESTful风格的服务端同步模型的机制，这套机制不仅可以减轻开发人员的工作量，而且可以使模型变得更为健壮（在各种异常下仍能保持数据一致性）

### 一、RESTful 接口
REST 是目前大量 Web 2.0 网站使用的一种架构方案，同时它也是一种把世间一切看作无状态对象的思维模式。Web 上所有的东西（页面、图像等）本质上都是资源。一个 RESTful 的应用，包含了 GET、POST、PUT、DELETE 这四种 HTTP Verb 标准定义的语义操作，直接对应了后端对数据的增删改查。

**REST风格的接口:**

* GET /resources 获取资源列表
* POST /resources 创建一个资源，返回资源的全部或部分字段
* GET /resources/{id} 获取某个id的资源详情，返回资源的全部或部分字段
* DELETE /resources/{id} 删除某个资源
* PUT /resources/{id} 更新某个资源的 全部 字段，返回资源的全部或部分字段
* PATCH /resources/{id} 更新某个资源的 部分 字段，返回资源的全部或部分字段

这里我们使用node.js做服务器，[resourceserver](https://github.com/liammclennan/resourceserver)去处理backbone请求，使用`npm start`命令以启动服务器，成功后默认端口地址为http://localhost:3002。


### 二、Model Requests
#### 1. Read
**Model.fetch()** 会产生 GET ，目标url为 /resources/{id} ，并将获得的属性更新model。

    /**
     *  person.fetch()
     *    Reset the model's state from the server
     */
    var Person = Backbone.Model.extend({
        defaulsts: {
            name: '',
            age: ''
        },
        urlRoot: "http://localhost:3002/people"
    });

    var person = new Person({id: 1});
    person.fetch({
        success: function () {
            console.log(person.toJSON());
        }
    });


#### 2. Create
**Model.save()** 逻辑上，根据当前这个model的是否具有 id 来判断应该使用POST还是PUT，如果model没有id，表示是新的模型，将使用 POST ，将模型的字段全部提交到 /resources ；如果model具有id，表示是已经存在的模型，将使用 PUT ，将模型的全部字段提交到 /resources/{id} 。当传入 options 包含 patch:true 的时候，save会产生 PATCH

	/**
     *  person.save()
     *    Create or update depending upon person.isNew()
     *    Create is the same as collection.create()
     */
    var Person = Backbone.Model.extend({
        defaulsts: {
            name: '',
            age: ''
        },
        urlRoot: "http://localhost:3002/people"
    });

    var person = new Person();
    person.set({name: 'Timi', age: 8});
    person.save(); //被保存的新用户会自动创建一个新id


#### 3. Update

    var Person = Backbone.Model.extend({
        defaulsts: {
            name: '',
            age: ''
        },
        urlRoot: "http://localhost:3002/people"
    });

    var person = new Person({id: 1});
    person.set('age', 10);
    person.save();


#### 4. Delete
**Model.destroy()** 会产生 DELETE ，目标url为 /resources/{id} ，如果当前model不包含id时，不会与服务端同步，因为此时backbone认为model在服务端尚不存在，不需要删除

	/**
     *  person.destroy()
     *    Deletes the model on the server and removes it from its client-side collection
     */
    var Person = Backbone.Model.extend({
        defaulsts: {
            name: '',
            age: ''
        },
        urlRoot: "http://localhost:3002/people"
    });

    var person = new Person({id: 1});
    //person.fetch();
    person.destroy();



### 三、Collection Requests
**Collection.fetch()** 会产生 GET ，目标url为 /resources ，并对返回的数组中的每个对象，自动实例化model  
**Collection.create()** 实际将调用 Model.save
	
	var Person = Backbone.Model.extend({
	    defaulsts: {
	        name: '',
	        age: ''
	    }
	    //urlRoot: "http://localhost:3002/people"
	});
	
	
	var People = Backbone.Collection.extend({
	    model: Person,
	    url: "http://localhost:3002/people"
	});
	
	
	
	var PersonView = Backbone.View.extend({
	    tagName: 'li',
	    initialize: function() {
	        this.model.on('destroy', this.remove, this); // this.remove即this.$el.remove()
	    },
	    render: function() {
	        this.$el.html(this.model.get('name') + ' - ' + this.model.get('age'));  
	        return this;
	    }
	});
	
	var PeopleView = Backbone.View.extend({
	    tagName: 'ul',
	    initialize: function() {
	        this.collection.on('add', this.addOne, this);
	        // this.collection.on('sync', this.addOne, this);
	    },
	    render: function() {
	        this.$el.empty();
	        this.collection.each(this.addOne, this);
	        return this;
	    },
	    addOne: function(person) {
	        var personView = new PersonView({model: person});
	        this.$el.append( personView.render().el );
	    }
	});
	
	
	var people = new People();
	people.fetch().then(function() {  //从后台获取people集合
	    console.log(people.toJSON());
	    var peopleView = new PeopleView({collection: people});
	    $(document.body).append(peopleView.render().el);
	});
	
	
	people.create({name: ' Emma', age: 22}, {wait: true}); // 使用collection.create()可以创建一个新的person
	
	setTimeout(function() {
	    var firstPerson = people.at(0);  //删除第一个person
	    firstPerson.destroy();
	}, 1000);


### 四、backbone request options
Model.fetch()、Model.save()、Model.destroy()、Collection.fetch()、Collection.create()可以自定义一些配置参数，这些options 可以修改backbone和ajax请求的一些行为，可以使用的options包括：

* wait : 可以指定是否等待服务端的返回结果再更新model。默认情况下不等待
* url : 可以覆盖掉backbone默认使用的url格式
* attrs : 可以指定保存到服务端的字段有哪些，配合 options.patch 可以产生 PATCH 对模型进行部分更新
* patch : 指定使用部分更新的REST接口
* data : 会被直接传递给jquery的ajax中的data，能够覆盖backbone所有的对上传的数据控制的行为
* 其他 : options中的任何参数都将直接传递给jquery的ajax，作为其options

backbone通过Model的 **urlRoot** 属性或者是 Collection 的 **url** 属性得知具体的服务端接口地址，以便发起ajax。在Model的 url 默认实现中，Model除了会考察 urlRoot ，第二选择会是Model所在Collection的 url ，所有有时只需要在Collection里面书写 url 就可以了。

Backbone会根据与服务端要进行什么类型的操作，决定是否要添加 id 在 url 后面，以下代码是Model的默认 url 实现：

	url: function () {
	    var base =
	      _.result(this, 'urlRoot') ||
	      _.result(this.collection, 'url') ||
	      urlError();
	    if (this.isNew()) return base;
	    return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
	},

其中的正则式 /([^\/])$/ 是个很巧妙的处理，它解决了 url 最后是否包含 '/' 的不确定性。

这个正则匹配的是行末的非 / 字符，这样，像 /resources 这样的目标会匹配 s ，然后 replace 中使用分组编号 $1 捕获了 s ，将 s 替换为 s/ ，这样就自动加上了缺失的 / ；而当 /resources/ 这样目标却无法匹配到结果，也就不需要替换了。