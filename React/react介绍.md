<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>

<!--
   http://www.cnblogs.com/snandy/archive/2012/03/12/2390782.html
   http://my.oschina.net/felumanman/blog/263330?p=1
-->



# React简介
***

**React 不是一个MVC框架**
React是一个用来构建可拼装化的UI界面的js库。它鼓励创造可复用性的UI组件，这些组件的特点之一是当前数据会随着时间发生改变。


**React 不使用模版**
习惯上，web应用的UI界面是通过模版或HTML指令来搭建的。你可以使用这一整套将页面抽象化了的模版来构造你的UI界面。













CSS的模块化：推荐**BIGPIPE**或者**LESS（Sass，Stylus）**
JavaScript的模块化：使用模块加载器，**requireJS**，**seaJS**


## 一、AMD规范和CommonJS规范
* AMD (Asynchromous Module Definition 异步模块定义)，浏览器中的模块规范，使模块和它的依赖可以被异步加载，并且又可以按照正确的顺序去加载。
* CommonJS (致力于设计、规划并标准化 JavaScript API) 是服务器端模块的规范，其模块加载的方式为同步的模式，Node.js采用了这个规范。


> CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD  CMD 解决方案。


### 1. AMD

















