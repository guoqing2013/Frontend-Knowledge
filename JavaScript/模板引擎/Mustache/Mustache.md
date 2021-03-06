<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>


<!--
http://www.thinksaas.cn/group/topic/265458/

-->



# javascript模板引擎之Mustache
***





Mustache是基于JavaScript实现的模版引擎，轻量级，语法更加的简单易用，很容易上手

### 一、 模板简介
模板通常是指嵌入了某种动态编程语言代码的文本，数据和模板通过某种形式的结合，可以变化出不同的结果。  
模板通常用来定义显示的形式，能够使得数据展现更为丰富，而且容易维护。例如，下面是一个模板的例子：

	<ul>
	    <% for(var i in items){ %>
	        <li class='<%= items[i].status %>'><%= items[i].text %></li>
	    <% } %>
	</ul>


如果有如下items数据：

	items:[
	    { text: 'text1' ,status:'done' },
	    { text: 'text2' ,status:'pending' },
	    { text: 'text3' ,status:'pending' },
	    { text: 'text4' ,status:'processing' }
	]	


通过某种方式的结合，可以产生下面的Html代码：

	<ul>
	    <li class='done'>text1<li>
	    <li class='pending'>text2<li>
	    <li class='pending'>text3<li>
	    <li class='processing'>text4<li>
	</ul>


如果不使用模板，想要达到同样的效果，即将上面的数据展现成结果的样子，需要像下面这样做：

	var temp = '<ul>';
	for(var i in items){
	    temp += "<li class='" + items[i].status + "'>" + items[i].text + "</li>";
	}
	temp += '</ul>';

**可以看出使用模板有如下好处：**

- 简化了html的书写
- 通过编程元素（比如循环和条件分支），对数据的展现更具有控制的能力
- 分离了数据与展现，使得展现的逻辑和效果更易维护


### 二、 模板引擎

通过分析模板，将数据和模板结合在一起输出最后的结果的程序称为模板引擎。

1. Mustache  
基于javascript 实现的模板引擎,类似于 Microsoft’s jQuery template plugin,但更简单易用!

2. Handlebars   
Handlebars为最流行的模板引擎之一，构建于Mustache之上。

3. [Underscore Templates](http://underscorejs.org/#template)  
“<%= %>”用于输出
<% %>用来包含JavaScript

4. [Jade](http://jade-lang.com/)  
Jade是受Haml的影响以JavaScript实现用于node的高性能模板引擎。


	// template.jade  
	  p  
	    | Hello,  
	    = name  
  
	// JS  
	jade.renderFile("template.jade", { name: "Jack" }, function(err, result) {  
		console.log(result);  // logs: Hello, Jack 		
	});  



Template-Engine-Chooser: [http://garann.github.io/template-chooser/](http://garann.github.io/template-chooser/)
![Template-Engine-Chooser](1.png)





### 三、 Mustache.js语法

Mustache 的模板语法很简单，就那么几个：

{{keyName}}
{{#keyName}} {{/keyName}}
{{^keyName}} {{/keyName}}
{{.}}
{{<partials}}
{{{keyName}}}
{{!comments}}


	var data = {
	    "company": "Apple",
	    "address": {
	        "street": "1 Infinite Loop Cupertino</br>",
	        "city": "California ",
	        "state": "CA ",
	        "zip": "95014 "
	    },
	    "product": ["Macbook", "iPhone", "iPod", "iPad"]
	 
	};
	


#### 1. {{keyName}} 
**{{}}**是 Mustache 的标示符，花括号里的 keyName 表示键名，这句的作用是直接输出与键名匹配的键值，例如：

	var tpl = '{{company}}'; 
	var html = Mustache.render(tpl, data); // 输出： Apple 

data 是数据，tpl 是定义的模板。


#### 2. {{#keyName}} {{/keyName}}
 以#开始、以/结束表示区块，它会根据当前上下文中的键值来对区块进行一次或多次渲染；

	var tpl = '{{#address}} <p>{{street}},{{city}},{{state}}</p> {{/address}}';
	var html = Mustache.render(tpl, data);  //输出： <p>1 Infinite Loop Cupertino&lt;/br&gt;,California,CA</p> 

注意：如果{{#keyName}} {{/keyName}}中的 keyName 值为 null, undefined, false；则不渲染输出任何内容。


#### 3. {{^keyName}} {{/keyName}}
该语法与{{#keyName}} {{/keyName}}类似，不同在于它是当 keyName 值为 null, undefined, false 时才渲染输出该区块内容。

	var tpl = '{{^nothing}}没找到 nothing 键名就会渲染这段{{/nothing}}';
	var html = Mustache.render(tpl, data); //输出： 没找到 nothing 键名就会渲染这段 


#### 4. {{.}}
{{.}}表示枚举，可以循环输出整个数组；

	var tpl = '{{#product}} <p>{{.}}</p> {{/product}}'; 
	var html = Mustache.render(tpl, data); //输出： <p>Macbook iPhone iPod iPad</p> 

#### 5. {{>partials}} 
{{>partials}} 以>开始表示子模块，如{{> address}}；当结构比较复杂时，我们可以使用该语法将复杂的结构拆分成几个小的子模块；

	var tpl = "<h1>{{company}}</h1> <ul>{{>address}}</ul>"；
	var partials = {
	    address: "{{#address}}<li>{{street}}</li><li>{{city}}</li><li>{{state}}</li><li>{{zip}}</li>{{/address}}"
	}；
	var html = Mustache.render(tpl, data, partials); 
	/* 
		输出：
		<h1>Apple</h1> 
		<ul>
		    <li>1 Infinite Loop Cupertino</br></li>
		    <li>California</li>
		    <li>CA</li>
		    <li>95014</li>
		</ul>
	*/

#### 6. {{{keyName}}}

{{keyName}}输出会将等特殊字符转译，如果想保持内容原样输出可以使用{{{}}}，例如：

	var tpl = '{{#address}} <p>{{{street}}}</p> {{/address}}';
	var html = Mustache.render(tpl, data);
	console.log(html); //<p>1 Infinite Loop Cupertino</br></p> 


#### 7. {{!comments}}
{{!comments}} !表示注释，注释后不会渲染输出任何内容。

{{!这里是注释}} //输出： 