<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script> 

<!-- 
http://www.ido321.com/1646.html 
http://www.open-open.com/lib/view/open1450681593198.html
-->


# 前端模块化工具-Webpack
<!--- - - -->

## 一、webpack是什么

web开发中常用到的静态资源主要有JavaScript、CSS、图片、Jade等文件，webpack中将静态资源文件称之为模块。webpack是一个module bundler(模块打包工具)，其可以兼容多种js书写规范，且可以处理模块间的依赖关系，具有更强大的js模块化的功能。

Webpack对它们进行统一的管理以及打包发布，其官方主页用下面这张图来说明Webpack的作用：
<img src="https://webpack.github.io/assets/what-is-webpack.png" alt="webpack" title="">



## 二、webpack特性

webpack具有requireJs和browserify的功能，但仍有很多自己的新特性：

1. 对 CommonJS 、 AMD 、ES6的语法做了兼容
2. 对js、css、图片等资源文件都支持打包
3. 串联式模块加载器以及插件机制，让其具有更好的灵活性和扩展性，例如提供对CoffeeScript、ES6的支持
4. 有独立的配置文件webpack.config.js
5. 可以将代码切割成不同的chunk，实现按需加载，降低了初始化时间
6. 支持 SourceUrls 和 SourceMaps，易于调试
7. 具有强大的Plugin接口，大多是内部插件，使用起来比较灵活
8. webpack 使用异步 IO 并具有多级缓存。这使得 webpack 很快且在增量编译上更加快


## 三、Webpack安装和配置

### 安装

webpack 可以作为全局的npm模块安装，也可以在当前项目中安装  

```npm install -g webpack```  
```npm install --save-dev webpack```


### 配置

每个项目下都必须配置有一个 **webpack.config.js**, webpack.config.js文件通常放在项目的根目录中，它本身也是一个标准的Commonjs规范的模块：

```javascript
var path = require('path');
module.exports = {
    entry: path.resolve(__dirname, './src/entry.js'),
    output: {
        path: path.resolve(__dirname, './assets'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
};
```



#### 1. **entry**

entry参数定义了打包后的入口文件，可以是个字符串或数组或者是对象；如果是数组，数组中的所有文件会打包生成一个filename文件；如果是对象，可以将不同的文件构建成不同的文件:

```javascript
{
    entry: {
        page1: "./page1",
        
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    output: {
        path: "dist/js/page",
        publicPath: "/output/",
        filename: "[name].bundle.js"
    }
}
```

该段代码最终会生成一个 page1.bundle.js 和 page2.bundle.js，并存放到 ./dist/js/page 文件夹下


#### 2. **output**

output参数是个对象，定义了输出文件的位置及名字：

```javascript
output: {
        path: "dist/js/page",
        publicPath: "/output/",
        filename: "[name].bundle.js"
}
```
path: 打包文件存放的绝对路径
publicPath: 网站运行时的访问路径
filename:打包后的文件名

当我们在entry中定义构建多个文件时，filename可以对应的更改为[name].js用于定义不同文件构建后的名字


#### 3. **module**

在webpack中JavaScript，CSS，LESS，TypeScript，JSX，CoffeeScript，图片等静态文件都是模块，不同模块的加载是通过模块加载器（webpack-loader）来统一管理的。loaders之间是可以串联的，一个加载器的输出可以作为下一个加载器的输入，最终返回到JavaScript上：

```javascript
module: {
        //加载器配置
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            
            //.js 文件使用 jsx-loader 来编译处理
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            
            //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    }
```

**test**项表示匹配的资源类型，**loader**或**loaders**项表示用来加载这种类型的资源的loader，loader的使用可以参考 [using loaders](http://webpack.github.io/docs/using-loaders.html)，更多的loader可以参考 [list of loaders](http://webpack.github.io/docs/list-of-loaders.html)。

**！**用来定义loader的串联关系，”-loader”是可以省略不写的，多个loader之间用“!”连接起来，但所有的加载器都需要通过npm来加载。

此外，还可以添加用来定义png、jpg这样的图片资源在小于10k时自动处理为base64图片的加载器：

```javascript
{ test: /\.(png|jpg)$/,loader: 'url-loader?limit=10000'}
```

给css和less还有图片添加了loader之后，我们不仅可以像在node中那样require js文件了，我们还可以require css、less甚至图片文件：

```javascript
require('./bootstrap.css');
require('./myapp.less');
var img = document.createElement('img');
img.src = require('./glyph.png');
```

注意，require()还支持在资源path前面指定loader，即require(![loaders list]![source path])形式：

```javascript
require("!style!css!less!bootstrap/less/bootstrap.less");
// “bootstrap.less”这个资源会先被"less-loader"处理，
// 其结果又会被"css-loader"处理，接着是"style-loader"
// 可类比pipe操作
```

require()时指定的loader会覆盖配置文件里对应的loader配置项。


#### 4. **resolve**

webpack在构建包的时候会按目录的进行文件的查找，resolve属性中的extensions数组中用于配置程序可以自行补全哪些文件后缀：

```javascript
 resolve: {
        //查找module的话从这里开始查找
        root: '/pomy/github/flux-example/src', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
```

然后我们想要加载一个js文件时，只要require(‘common’)就可以加载common.js文件了。

注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.


#### 5. **plugin**

webpack提供了[丰富的组件]用来满足不同的需求，当然我们也可以自行实现一个组件来满足自己的需求：

```javascript
plugins: [
     //your plugins list
 ]
```


在webpack中编写js文件时，可以通过require的方式引入其他的静态资源，可通过loader对文件自动解析并打包文件。通常会将js文件打包合并，css文件会在页面的header中嵌入style的方式载入页面。但开发过程中我们并不想将样式打在脚本中，最好可以独立生成css文件，以外链的形式加载。这时extract-text-webpack-plugin插件可以帮我们达到想要的效果。需要使用npm的方式加载插件，然后参见下面的配置，就可以将js中的css文件提取，并以指定的文件名来进行加载。

```npm install extract-text-webpack-plugin –save-dev```


```javascript
plugins: [
    new ExtractTextPlugin('styles.css')
]
```

#### 6. **externals**

当我们想在项目中require一些其他的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，这在实际开发中很有必要。此时我们就可以通过配置externals参数来解决这个问题：

```javascript
externals: {
     "jquery": "jQuery"
}
```

这样我们就可以放心的在项目中使用这些API了：var jQuery = require("jquery");


#### 7. **context**

当我们在require一个模块的时候，如果在require中包含变量，像这样：

```javascript
require("./mods/" + name + ".js");
```

那么在编译的时候我们是不能知道具体的模块的。但这个时候，webpack也会为我们做些分析工作：

(1)分析目录：’./mods’；   
(2)提取正则表达式：’/^.*.js$/’；

```javascript
var currentBase = process.cwd();
var context = abcOptions.options.context ? abcOptions.options.context : 
path.isAbsolute(entryDir) ? entryDir : path.join(currentBase, entryDir);
```

关于 webpack.config.js 更详尽的配置可以参考[这里](http://webpack.github.io/docs/configuration.html)



## webpack常用命令


 * webpack 最基本的启动webpack命令
 * webpack -w 提供watch方法，实时进行打包更新
 * webpack -p 对打包后的文件进行压缩
 * webpack -d 提供SourceMaps，方便调试
 * webpack --colors 输出结果带彩色，比如：会用红色显示耗时较长的步骤
 * webpack --profile 输出性能数据，可以看到每一步的耗时
 * webpack --display-modules 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块