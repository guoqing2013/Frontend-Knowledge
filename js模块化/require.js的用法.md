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
**(1) define(id?, dependencies?, factory)**
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
defind(function(require) {
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

**(2) require() 调用模块**
```
require(["aModule", "bModule"], function(myFunctionA, myFunctionB) {
    myFunctionA();  // 使用aModule.js中的函数 myFunctionA
    myFunctionB();  // 使用bModule.js中的函数 myFunctionB
});
```

### 三、requireJS的使用
##### 1 
```<script data-main="js/main" src="js/require.js"></script>```
data-main 属性告诉 require.js 在 require.js  加载之后加载 js/main.js 

RequireJS 查找脚本的路径，主要是通过 baseUrl，在 data-main 中，声明了 baseUrl 的路径，在这句代码里也就是 js 文件夹；如果不声明 data-main，则 baseUrl 默认指向这个 html 页面所在的文件夹。当然，也可以通过配置来声明 baseUrl

##### 2
在 main.js 中，可以通过 require() 加载依赖的脚本，这样不用在 html 中显示声明.main.js 相当于是一个入口点
```
require(['helper/util'], function(util) {
    // 当 scripts/helper/util.js 加载完毕，会执行这个回调函数
    // 如果 util.js 也声明了依赖的文件（模块），那么这个函数会等到那些依赖的文件（模块）加载完毕后才调用
});
```
注意，data-main 中声明的模块会被异步加载，也就意味着如果页面后面通过 <script> 加载多个脚本，这些脚本不一定在 data-main 中声明的模块加载之后才加载；或者后面的js代码如果有对 data-main 中声明的模块的依赖，则有可能会出现错误。

##### 3
RequireJS 会假定所有依赖项默认都是脚本，所以书写依赖时可以省略 “.js”后缀，RequireJS 会自动加上这个后缀。
RequireJS 会自动把模块ID翻译成一个路径（path），我们也可以在配置中声明多个路径（paths），通过 baseUrl + paths，可以用很少的代码找到相应的 js 文件，比起 <script> 标签要优雅简洁很多。
如：baseUrl: 'js'
    require(['helper/util'], function() {})
则：src='js/helper/util.js'

一般来说，通过 baseUrl + paths 就可以找到js文件，不过有时候，可能会有例外，一旦 RequireJS 发现模块 ID 中包含如下的字符，那么它就不按照 baseUrl + paths 的方式来寻找这个模块的js文件了，而是采用 URL 的方式：

* 如果 ID 以 “.js” 结尾
* 如果 ID 以 “/” 开头
* 如果 ID 以 “http:” 或者 “https:” 开头

一般来说，最好使用 baseUrl + paths 的方式来声明模块ID，这样做会有更多的灵活性。同样的，我们在组织js代码文件的时候，尽量避免使用很深的路径，而最好把js文件都放置在 baseUrl 下面，最好不要超过两层的深度
