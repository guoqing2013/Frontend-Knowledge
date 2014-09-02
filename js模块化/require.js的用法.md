##  require.js的用法


### 一、js模块的写法

> 在复杂的逻辑下，javascript需要被模块化，模块需要封装起来，只留下供外界调用的API。

**① Privileged Method**
```
function Human(sgender){
    //Private
    var age = 1,
	gender = sgender || 'Male';

    //Privileged Method
    this.growUp = function() {
        age++;
    }
}
```

**② Module Pattern**
```
function Human(sgender) {
    //Private
    var age = 1,
    gender = sgender || 'Male';

    //Public
    return {
        growUp: function() {
            age++;
        }
    };
}
```

### 二、AMD规范
**AMD**是“Asynchronous Module Definition”的缩写，意思就是“**异步模块定义**”（通过异步方式加载模块）。
使模块和它的依赖可以被异步加载，并且又可以按照正确的顺序去加载。


##### 1. AMD模式的优点 
* 定义模块的方法更清晰，更少污染全局环境，能够清楚地显示依赖关系。
* 直接支持客户端的浏览器环境。
* 允许非同步加载模块，也可以根据需要动态加载模块


`RequireJS 遵循的是 AMD（异步模块定义）规范。`
管理模块之间的依赖性，便于代码的编写和维护。



##### 2. AMD规范：
**define(id?, dependencies?, factory)**
定义一个模块。它包含三个参数，前两个参数都是可选的。
一个完整的模块定义包含模块名称，模块的依赖和回调函数

* 第一个参数 id：是一个string字符串，它表示模块的标识（也就是模块的路径，通过id才能知道从什么位置去加载依赖的模块）
* 第二个参数 dependencies：是一个数组，成员是依赖模块的:id
* 第三个参数 factory：是一个回调函数，在依赖的模块加载成功后，会执行这个回调函数，它的参数是所有依赖模块的引用，如果回调函数有返回值，会导出出来


```
define('adder', ['math'], function(math) {
    return {
        addTen: function(x) {
            return math.add(x, 10);
        }
    };
});
```

###### 匿名模块
> 在实际中，使用的更多的是匿名模块定义方式，因为这样更加的灵活，模块的标识和它的源代码不在相关，开发人员可以把这个模块放在任意的位置而不需要修改代码。一般只要在使用工具打包模块到一个文件中时，才会声明第一个参数，所以应该尽量避免给模块命名。


如果这个模块并没有依赖，那么默认的依赖是["require", "exports", "module"]
```
define(["require", "exports", "module"], function(require, exports, module) {
    console.log(exports);   //{}
    exports.addTem = function(x) {
        return x + 10;
    }
	//or
	//module.exports.addTemfunction(x) {
    //    return x + 10;
    //}
});
```

Dependencies that can not be evalluated until runtime or only loaded when a specific event occurs;

```
defind(function() {
    var isReady = false, 
        foobar;
    require(['foo', 'bar'], function(foo, bar) {
        isReady = true;
        foobar = foo() + bar();
    });
    return {
        isReady: isReady,
        foobar: foobar
    };
});
```



### 三、requireJS的使用
##### 1.
```<script data-main="js/main" src="js/require.js"></script>```
data-main 属性告诉 require.js 在 require.js  加载之后加载 js/main.js 

RequireJS 查找脚本的路径，主要是通过 baseUrl，在 data-main 中，声明了 baseUrl 的路径，在这句代码里也就是 js 文件夹；如果不声明 data-main，则 baseUrl 默认指向这个 html 页面所在的文件夹。当然，也可以通过配置来声明 baseUrl

##### 2.
在 main.js 中，可以通过 require() 加载依赖的脚本，这样不用在 html 中显示声明.main.js 相当于是一个入口点
```
require(['helper/util'], function(util) {
    // 当 scripts/helper/util.js 加载完毕，会执行这个回调函数
    // 如果 util.js 也声明了依赖的文件（模块），那么这个函数会等到那些依赖的文件（模块）加载完毕后才调用
});
```
注意，data-main 中声明的模块会被异步加载，也就意味着如果页面后面通过script标签加载多个脚本，这些脚本不一定在 data-main 中声明的模块加载之后才加载；或者后面的js代码如果有对 data-main 中声明的模块的依赖，则有可能会出现错误。

##### 3.
RequireJS 会假定所有依赖项默认都是脚本，所以书写依赖时可以省略 “.js”后缀，RequireJS 会自动加上这个后缀。
RequireJS 会自动把模块ID翻译成一个路径（path），我们也可以在配置中声明多个路径（paths），通过 baseUrl + paths，可以用很少的代码找到相应的 js 文件，比起script标签要优雅简洁很多。
如：baseUrl: 'js'
    require(['helper/util'], function() {})
则：src='js/helper/util.js'

一般来说，通过 baseUrl + paths 就可以找到js文件，不过有时候，可能会有例外，一旦 RequireJS 发现模块 ID 中包含如下的字符，那么它就不按照 baseUrl + paths 的方式来寻找这个模块的js文件了，而是采用 URL 的方式：

* 如果 ID 以 “.js” 结尾
* 如果 ID 以 “/” 开头
* 如果 ID 以 “http:” 或者 “https:” 开头

一般来说，最好使用 baseUrl + paths 的方式来声明模块ID，这样做会有更多的灵活性。同样的，我们在组织js代码文件的时候，尽量避免使用很深的路径，而最好把js文件都放置在 baseUrl 下面，最好不要超过两层的深度



##### 4. 加载模块
```
requirejs.config({
    //默认从 js/lib 中加载模块
    baseUrl : 'js/lib',

    //如果模块ID以app开头，则会在 js/app 目录下寻找
    //不过要注意千万不要加上 ".js"，否则paths的规则就会失效
    paths : {
        app : '../app'
    }
});
```

```
requirejs(['jquery', 'aModule', 'bModule'],
    function ($, myFunctionA, myFunctionB) {
        //jQuery, aModule 和 bModule 模块都加载完毕后，会执行这个函数

        //TODO
    }
);
```

##### 5. 定义模块
RequireJS 要求一个js文件只定义一个模块。
每加载一个模块，就会产生一个HTTP请求，RequireJS 提供了一个优化工具（r.js）

* 定义一个只有键值对，没有任何依赖的模块
```
define({
    color: 'black',
    size: 'M'
});
```
* 定义一个函数，没有依赖
```
define(function() {
    //TODO
    return {
        color: 'black',
        size: 'M'
    }
});
```


定义一个有依赖的函数，第一个参数是依赖的模块ID数组，后面是回调函数，会在所有依赖加载完毕后执行：
```
define(['cart'], function(cart) {
    //TODO
    return {
        color: 'blue',
        size: 'M',
        addToCart: function() {
            cart.add(this);
        }
    };
});
```
当然不一定只是返回Object，也可以返回一个函数：
```
define(['cart'], function(cart) {
     return function(title) {
         return title ? (window.title = title) : cart.name;
     };
});
```

##### 6. RequireJS工作原理
RequireJS 采用 head.appendChild() 的方式来加载所有依赖的脚本
```
function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //作为js文件载入
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") {  //作为css文件载入
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("myscript.js", "js")
loadjscssfile("javascript.php", "js")
loadjscssfile("mystyle.css", "css")
```

##### 7. 加载非规范的模块
在加载没有实现AMD规范的模块时，RequireJS 也提供了简洁的方式，就是通过配置定义这些模块的特征
```
requirejs.config({
    // 要使用 shim 来配置没有实现 AMD 规范的模块
    // 不过注意 shim 不能用来配置已经实现 AMD 规范的模块
    shim : {
        'backbone' : {
            //定义依赖，会在 backbone.js 载入前载入这些依赖
            deps : ['underscore', 'jquery'],
            //导出 Backbone
            exports : 'Backbone'
        },
        'underscore' : {
            exports : '_'
        }
    }
});
```
//jQuery
```
requirejs.config({
    shim : {
        'jquery,colorize' : {
            deps : ['jquery'],
            exports: 'jQuery.fn.colorize'
        },
        'jquery.scroll' : {
            deps : ['jquery'],
            exports : 'jQuery.fn.scroll'
        }
    }
});
```
