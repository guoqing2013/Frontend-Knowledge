<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>

<!--
   http://www.cnblogs.com/snandy/archive/2012/03/12/2390782.html
   http://my.oschina.net/felumanman/blog/263330?p=1
-->



# 前端模块化开发
***

模块化是一种处理复杂系统分解成为更好的可管理模块的方式，它可以把系统代码划分为一系列职责单一，高度解耦且可替换的模块，系统中某一部分的变化将如何影响其它部分就会变得显而易见，系统的可维护性更加简单易得。

> 前端模块，是能独立提供功能且能够复用的模块化代码。

模块化的目的：  
    1. 减少循环依赖  
    2. 减少耦合  
    3. 提高开发的效率。   
    (规避命名的冲突、全局变量的污染、有利于代码的维护、异步加载模块对页面性能方面有提升)



CSS的模块化：推荐**BIGPIPE**或者**LESS（Sass，Stylus）**  
JavaScript的模块化：使用模块加载器，**requireJS**，**seaJS**


## 一、AMD规范和CommonJS规范
* AMD (Asynchromous Module Definition 异步模块定义)，浏览器中的模块规范，使模块和它的依赖可以被异步加载，并且又可以按照正确的顺序去加载。
* CommonJS (致力于设计、规划并标准化 JavaScript API) 是服务器端模块的规范，其模块加载的方式为同步的模式，Node.js采用了这个规范。


> CommonJS 加载模块是同步的，所以只有加载完成才能执行后面的操作。像Node.js主要用于服务器的编程，加载的模块文件一般都已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式，所以CommonJS规范比较适用。但如果是浏览器环境，要从服务器加载模块，这是就必须采用异步模式。所以就有了 AMD  CMD 解决方案。


### 1. AMD
（1） AMD设计出一个简洁的写模块API：

    define(id?, dependencies?, factory);

其中：

- id: 模块标识，一般省略。
- dependencies: 所依赖的模块。
- factory: 模块的实现，或者一个JavaScript对象。
<hr style="border:none;"/>         

    // math.js
    define(function() {
        var add = function(x, y) {　　　　　　
            return x + y;　　　　
        };　　　　
        return {
    　　　　　　add: add　　　　
        };　　
    });
    
定义数据对象模块：

    //data.js
    define({
        users: [],
        members: []
    });


AMD规范允许输出模块兼容CommonJS规范，这时define方法如下：

    define(function (require, exports, module) {
        var reqModule = require("./someModule");
        requModule.test();
        exports.asplode = function () {
            //someing
        }
    });


（2）加载模块：使用require获取依赖模块，使用exports导出API。



### 2. CommonJS Module
require - 用来引入依赖  
export - 用来导出模块  

（1）根据CommonJS规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为 **global** 对象的属性。

    global.warning = true;   //global即为window对象

上面的代码的warning变量，可以被所有模块读取。


（2）使用一个**esports**对象或**module.exports**来定义一个模块的内容

    var i = 1;
    var max = 30;

    module.exports = function () {
      for (i -= 1; i++ < max; ) {
        console.log(i);
      }
      max *= 1.1;
    };
    
（3）使用**require**或**require.async**方法加载模块

    // do something with `myModule`
    var myModule = require('someModule');

require 提供的是一种类似于后端语言的同步调用方式，调用的时候默认所需要的模块都已经加载完成，解决方案会负责完成静态资源的加载。
[require.async](https://www.npmjs.com/package/require.async) 提供的是一种异步加载方式，主要用来满足“按需加载”的场景，在require.async被执行的时候才去加载所需要的模块，当模块加载回来会执行相应的回调函数。

一般require用于处理首页首屏所需要的模块，require.async用于处理首屏外的按需模块。




## 二、requireJS和Browerify
CommonJS Module和AMD都是为了解决JS模块化的规范API，CommonJS更适合于Server端，而AMD基本是用于浏览器端。

- [**requirejs**](http://requirejs.org/) 以AMD模块开发规范来约束前端模块开发,最后上线的时候提供r.js命令行工具来生成合并压缩文件
- [**browserify**](https://www.npmjs.org/package/browserify) 以commonjs模块开发规范来约束前端模块开发,最后上线时提供命令行生成合并文件

### 1. requireJS

加载模块：

    // main.js
    require(['math'], function(math) {
        alert(math.add(1, 1))
    });

require()函数接受两个参数。  
第一个参数是一个数组，表示所依赖的模块，上例就是['math']，即主模块依赖这一个模块；  
第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。



### 2. Browserify —— 利用Node.js实现JS模块化加载
Browserify 可以让你使用类似于 node 的 require() 的方式来组织浏览器端的 Javascript 代码，通过预编译让前端 Javascript 可以直接使用 Node NPM 安装的一些库。

安装： `npm install -g browserify`  
使用 browserify 编译：`$ browserify main.js > bundle.js`

现在 main.js 需要的所有其它文件都会被编译进 bundle.js 中，包括很多层 require() 的情况也会一起被递归式的编译过来。

编译好的 js 可以直接拿到浏览器使用

    <script src="bundle.js"></script>




## 三、使用AngularJS，Browserify和Grunt开发web应用（待续）

















