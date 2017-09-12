# webpack中利用require.ensure()实现按需加载
<!--- - - -->

## require.ensure()

webpack中的require.ensure()可以实现按需加载资源包括js,css等。

require.ensure(dependencies: String[], callback: function(require), chunkName: String)

第一个参数是个数组，标明依赖的模块，这些会提前加载;

第二个是回调函数，在这个回调函数里面的require的文件会被单独打包成一个chunk,不会和主文件打包在一起，这样就生成了两个chunk,第一次加载时只加载主文件，当点击时就会加载单独打包的chunk。

第三个参数是模块名，用于构建时生成文件时命名使用。chunkName 是提供给这个特定的 require.ensure() 的 chunk 的名称。通过提供 require.ensure() 不同执行点相同的名称，我们可以保证所有的依赖都会一起放进相同的 文件束(bundle)。

注意点：require.ensure的模块只会被下载下来，不会被执行，只有在回调函数使用require(模块名)后，这个模块才会被执行。

## 示例

webpack.config.ensure.js

```javascript
var path = require("path");
module.exports = {
    entry: "./example.ensure.js",
    output: {
        path: path.join(__dirname, "ensure"),
        filename: "[name].bundle.js",
        chunkFilename: "[name].chunk.js"
    }
};
```

example.ensure.js

```javascript
require.ensure(["./module1"], function(require) {
    console.log("aaa");
    var module2 = require("./module2");
    console.log("bbb");
    require("./module1");
}, 'test');
```

module1.js

```javascript
console.log("module1");
module.exports = 1;
```


module2.js

```javascript
console.log("module2");
module.exports = 2; ;
```


构建结果

命令行中运行webpack --config webpack.config.ensure.js 
- main.bundle.js 
- example.amd.js 
- 1.chunk.js 
- module1.js 
- module2.js

运行结果

浏览器中运行ensure/index.html，控制台输出：

aaa
module2
bbb
module1


