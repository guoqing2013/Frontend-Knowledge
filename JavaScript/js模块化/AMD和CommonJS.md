<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script> 

<!--
 http://www.html-js.com/article/2126 
 https://github.com/jnotnull/JavaScript-Sturcture/wiki/%E6%A8%A1%E5%9D%97%E5%8C%96%EF%BC%8C%E9%80%9A%E5%BE%80%E6%9C%AA%E6%9D%A5JavaScript%E5%BA%93%E4%B9%8B%E8%B7%AF
-->

## 依赖管理：AMD和CommonJS 
> 模块的概念并不新颖，我们经常使用他们。你可能知道JS可不仅仅只用于浏览器端，它可以运行于服务端甚至是TV。

AMD模块规范，针对模块的异步加载，主要用于浏览器端；
CommonJS规范，针对模块的同步加载，主要用于服务器端，即node.js环境。

- [**requirejs**](http://requirejs.org/)以amd模块开发规范来约束前端模块开发,最后上线的时候提供r.js命令行工具来生成合并压缩文件
- [**browserify**](https://www.npmjs.org/package/browserify)以commonjs模块开发规范来约束前端模块开发,最后上线时提供命令行生成合并文件

### AMD  

**异步模块定义（AMD）** 是一个用来定义异步加载模块的JS API，它一般用于浏览器端因为在调试和跨域访问中需要异步加载。AMD可以在开发阶段把各个模块分散在各个不同的文件中。

AMD使用了define方法，用来定义一个模块并导出对象。使用AMD，我们可以引用任何依赖。


    define(['alpha'], function (alpha) {
      return {
        verb: function () {
          return alpha.verb() + 2;
        }
      };
    });



### CommonJS

NodeJS使用了CommonJS，通过一个esports对象或module.exports来定义一个模块的内容

    // someModule.js
    exports.someModule = function () {
      return "foo";
    };


按照CommonJS的描述，使用require方法来引用

    // do something with `myModule`
    var myModule = require('someModule');



### 统一模块定义(UMD)
通过if else来判断当前哪个方案可用，如果支持AMD或者CommonJS，那就可以直接使用它，这个解决方案被称为UMD。
 [**umd github**](https://github.com/umdjs/umd/blob/master/returnExports.js)


    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            define(['b'], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory(require('b'));
        } else {
            root.returnExports = factory(root.b);
        }
    }(this, function (b) {
        return {};
    }));


通用模块规范,它兼容了AMD和CommonJS，同时还支持老式的“全局”变量规范：


    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            // Node, CommonJS之类的
            module.exports = factory(require('jquery'));
        } else {
            // 浏览器全局变量(root 即 window)
            root.returnExports = factory(root.jQuery);
        }
    }(this, function ($) {
        //    方法
        function myFunc(){};

        //    暴露公共方法
        return myFunc;
    }));


例：依赖了多个组件并且暴露多个方法


    (function (root, factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD
            define(['jquery', 'underscore'], factory);
        } else if (typeof exports === 'object') {
            // Node, CommonJS之类的
            module.exports = factory(require('jquery'), require('underscore'));
        } else {
            // 浏览器全局变量(root 即 window)
            root.returnExports = factory(root.jQuery, root._);
        }
    }(this, function ($, _) {
        //    方法
        function a(){};    //    私有方法，因为它没被返回 (见下面)
        function b(){};    //    公共方法，因为被返回了
        function c(){};    //    公共方法，因为被返回了

        //    暴露公共方法
        return {
            b: b,
            c: c
        }
    }));


### ES6模块
JS库已经影响了原生JS语言了，比如类管理。下一代JS语言ES6会支持import和export。

    /// myModule.js
    function myModule () {
      // module content
    }
    export myModule;


    import {myModule} from 'myModule';


