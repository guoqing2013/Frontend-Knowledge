<!--
http://javascript.ruanyifeng.com/tool/grunt.html

http://blog.csdn.net/lihongxun945/article/details/8958063

http://tgideas.qq.com/webplat/info/news_version3/804/808/811/m579/201307/216460.shtml
-->

# Grunt 前端自动化构建工具
- - - 
中文介绍网址：[http://www.gruntjs.net/](http://www.gruntjs.net/)  
英文介绍网址：[http://gruntjs.com/](http://gruntjs.com/)

Grunt是一个自动任务运行器，会按照预先设定的顺序自动运行一系列的任务。如：合并文件、压缩代码、检查语法错误、将Sass代码转成CSS代码等等。这可以简化工作流程，减轻重复性工作带来的负担。


## 安装 grunt-cli
安装 grunt-cli，将Grunt命令行（CLI）安装到全局环境中  
`npm install grunt-cli -g`

## 配置 grunt
项目中添加两份文件：package.json 和 Gruntfile。  
1. **paskage.json** 此文件被npm用于存储项目的元数据，以便将此项目发布为npm模块。你可以在此文件中列出项目以来的grunt和grunt插件，置于devDependencies配置段内。  
2. **Gruntfile**: Gruntfile.js是Grunt的配置文件，用来配置或定义任务（task）并加载Grunt插件的。  
*Grunt项目的结构*：
![Grunt项目的结构](http://guoqing2013.3vzhuji.com/markdown/grunt/pic1.png)

### 创建package.json文件的方式
 * 大部分 [grunt-init](http://gruntjs.com/project-scaffolding)  模版都会自动创建特定于项目的package.json文件。
 * [npm init](https://www.npmjs.org/doc/cli/npm-init.html)命令会创建一个基本的package.json文件。
 * 复制下面的案例，并根据需要做扩充，参考此说明.

<pre>
{
    "name": "mypackage", //项目名称
    "version": "0.7.0", //版本
    "description": "Sample package for CommonJS. This package demonstrates the required elements of a CommonJS package.", //项目描述
    "keywords": ["package", "example"],  //有利于使用npm search时找到该项目
    "maintainers": [{   //项目维护人
        "name": "Bill Smith",
        "email": "bills@example.com",
        "web": "http://www.example.com"
    }],
 // "author": "Mary Brown", //项目作者 （一个人）
    "contributors": [{ //项目贡献人（多个人）
        "name": "Mary Brown",
        "email": "maryb@embedthis.com",
        "web": "http://www.embedthis.com"
    }],
    "dependencies": {  //项目运行所依赖的模块
        "express": "latest", 
        "mongoose": "~3.8.3",
        "handlebars-runtime": "~1.0.12",
        "express3-handlebars": "~0.5.0",
        "MD5": "~1.2.0"
    },
    "devDependencies": { //项目开发所需要的模块
        "bower": "~1.2.8",
        "grunt": "~0.4.1",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-jshint": "~0.7.2",
        "grunt-contrib-uglify": "~0.2.7",
        "grunt-contrib-clean": "~0.5.0",
        "browserify": "2.36.1",
        "grunt-browserify": "~1.3.0",
    },
    "os": ["linux", "macos", "win"], //表示在哪些操作系统下可以运行  
    "cpu": ["x86", "ppc", "x86_64"], //表在哪些cpu架构下可以运行
    // "engines": ["v8", "ejs", "node", "rhino"],  
    "engines": { //该项目所需要的node.js版本。
        "node": ">= 0.8.0"
    },
    "scripts": { //指定运行脚本命令的npm命令行缩写，比如start指定了运行npm run start时，所要执行的命令。
        "preinstall": "echo here it comes!",  
        "postinstall": "echo there it goes!",
        "start": "node index.js"
    },
    "directories": {
        "lib": "src/lib",
        "bin": "local/binaries",
        "jars": "java"
    }
}
</pre>

有了package.json文件，直接使用 `npm install` 命令，就会在当前目录中安装所需要的模块。

> `m -rf node_modules && npm cache clean ` 清除modules

对应的版本可以加上各种限定，主要有以下几种：  
> 指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。  
> 波浪号：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。  
> 插入号：比如?1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。  
> latest：安装最新版本。


## Gruntfile.js
<pre>
module.exports = function(grunt) {

  // 配置Grunt各种模块的参数
  grunt.initConfig({
    jshint: { /* jshint的参数 */ },
    concat: { /* concat的参数 */ },
    uglify: { /* uglify的参数 */ },
    watch:  { /* watch的参数 */ }
  });

  // 从node_modules目录加载模块文件
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 每行registerTask定义一个任务
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('check', ['jshint']);

};
</pre>

Gruntfile主要有三个方法：

* grunt.initConfig：定义各种模块的参数，每一个成员项对应一个同名模块。
* grunt.loadNpmTasks：加载完成任务所需的模块。
* grunt.registerTask：定义具体的任务。第一个参数为任务名，第二个参数是一个数组，表示该任务需要依次使用的模块。default任务名表示，如果直接输入grunt命令，后面不跟任何参数，这时所调用的模块（该例为jshint，concat和uglify）；该例的check任务则表示使用jshint插件对代码进行语法检查。


上面的代码一共加载了四个模块：  
jshint（检查语法错误）、concat（合并文件）、uglify（压缩代码）和watch（自动执行）。接下来，有两种使用方法。  

（1）命令行执行某个模块，如运行jshint模块。    
		`grunt jshint`    

（2）命令行执行某个任务。  
		`grunt check`


## grunt插件
<section id="readme">
    <h4 id="-grunt-contrib-clean-https-github-com-gruntjs-grunt-contrib-clean-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-clean-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-clean-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-clean-png-https-david-dm-org-gruntjs-grunt-contrib-clean-">
        <a href="https://github.com/gruntjs/grunt-contrib-clean">
            grunt-contrib-clean
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-clean">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-clean.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-clean">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-clean.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Clean files and folders.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-coffee-https-github-com-gruntjs-grunt-contrib-coffee-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-coffee-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-coffee-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-coffee-png-https-david-dm-org-gruntjs-grunt-contrib-coffee-">
        <a href="https://github.com/gruntjs/grunt-contrib-coffee">
            grunt-contrib-coffee
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-coffee">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-coffee.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-coffee">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-coffee.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compile CoffeeScript files to JavaScript.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-compass-https-github-com-gruntjs-grunt-contrib-compass-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-compass-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-compass-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-compass-png-https-david-dm-org-gruntjs-grunt-contrib-compass-">
        <a href="https://github.com/gruntjs/grunt-contrib-compass">
            grunt-contrib-compass
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-compass">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-compass.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-compass">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-compass.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compile Sass to CSS using Compass
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-compress-https-github-com-gruntjs-grunt-contrib-compress-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-compress-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-compress-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-compress-png-https-david-dm-org-gruntjs-grunt-contrib-compress-">
        <a href="https://github.com/gruntjs/grunt-contrib-compress">
            grunt-contrib-compress
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-compress">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-compress.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-compress">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-compress.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compress files and folders.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-concat-https-github-com-gruntjs-grunt-contrib-concat-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-concat-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-concat-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-concat-png-https-david-dm-org-gruntjs-grunt-contrib-concat-">
        <a href="https://github.com/gruntjs/grunt-contrib-concat">
            grunt-contrib-concat
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-concat">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-concat.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-concat">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-concat.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Concatenate files.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-connect-https-github-com-gruntjs-grunt-contrib-connect-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-connect-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-connect-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-connect-png-https-david-dm-org-gruntjs-grunt-contrib-connect-">
        <a href="https://github.com/gruntjs/grunt-contrib-connect">
            grunt-contrib-connect
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-connect">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-connect.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-connect">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-connect.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Start a connect web server.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-copy-https-github-com-gruntjs-grunt-contrib-copy-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-copy-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-copy-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-copy-png-https-david-dm-org-gruntjs-grunt-contrib-copy-">
        <a href="https://github.com/gruntjs/grunt-contrib-copy">
            grunt-contrib-copy
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-copy">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-copy.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-copy">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-copy.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Copy files and folders.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-cssmin-https-github-com-gruntjs-grunt-contrib-cssmin-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-cssmin-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-cssmin-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-cssmin-png-https-david-dm-org-gruntjs-grunt-contrib-cssmin-">
        <a href="https://github.com/gruntjs/grunt-contrib-cssmin">
            grunt-contrib-cssmin
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-cssmin">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-cssmin.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-cssmin">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-cssmin.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compress CSS files.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-csslint-https-github-com-gruntjs-grunt-contrib-csslint-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-csslint-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-csslint-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-csslint-png-https-david-dm-org-gruntjs-grunt-contrib-csslint-">
        <a href="https://github.com/gruntjs/grunt-contrib-csslint">
            grunt-contrib-csslint
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-csslint">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-csslint.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-csslint">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-csslint.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Lint CSS files.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-handlebars-https-github-com-gruntjs-grunt-contrib-handlebars-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-handlebars-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-handlebars-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-handlebars-png-https-david-dm-org-gruntjs-grunt-contrib-handlebars-">
        <a href="https://github.com/gruntjs/grunt-contrib-handlebars">
            grunt-contrib-handlebars
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-handlebars">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-handlebars.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-handlebars">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-handlebars.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Precompile Handlebars templates to JST file.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-htmlmin-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-htmlmin-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-htmlmin-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-htmlmin-png-https-david-dm-org-gruntjs-grunt-contrib-htmlmin-">
        <a href="https://github.com/gruntjs/grunt-contrib">
            grunt-contrib-htmlmin
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-htmlmin">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-htmlmin.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-htmlmin">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-htmlmin.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Minify HTML
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-imagemin-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-imagemin-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-imagemin-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-imagemin-png-https-david-dm-org-gruntjs-grunt-contrib-imagemin-">
        <a href="https://github.com/gruntjs/grunt-contrib">
            grunt-contrib-imagemin
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-imagemin">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-imagemin.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-imagemin">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-imagemin.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Minify PNG, JPEG and GIF images
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-jade-https-github-com-gruntjs-grunt-contrib-jade-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-jade-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-jade-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-jade-png-https-david-dm-org-gruntjs-grunt-contrib-jade-">
        <a href="https://github.com/gruntjs/grunt-contrib-jade">
            grunt-contrib-jade
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-jade">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-jade.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-jade">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-jade.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compile Jade templates.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-jasmine-https-github-com-gruntjs-grunt-contrib-jasmine-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-jasmine-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-jasmine-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-jasmine-png-https-david-dm-org-gruntjs-grunt-contrib-jasmine-">
        <a href="https://github.com/gruntjs/grunt-contrib-jasmine">
            grunt-contrib-jasmine
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-jasmine">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-jasmine.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-jasmine">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-jasmine.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Run jasmine specs headlessly through PhantomJS.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-jshint-https-github-com-gruntjs-grunt-contrib-jshint-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-jshint-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-jshint-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-jshint-png-https-david-dm-org-gruntjs-grunt-contrib-jshint-">
        <a href="https://github.com/gruntjs/grunt-contrib-jshint">
            grunt-contrib-jshint
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-jshint">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-jshint.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-jshint">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-jshint.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Validate files with JSHint.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-jst-https-github-com-gruntjs-grunt-contrib-jst-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-jst-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-jst-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-jst-png-https-david-dm-org-gruntjs-grunt-contrib-jst-">
        <a href="https://github.com/gruntjs/grunt-contrib-jst">
            grunt-contrib-jst
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-jst">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-jst.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-jst">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-jst.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Precompile Underscore templates to JST file.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-less-https-github-com-gruntjs-grunt-contrib-less-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-less-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-less-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-less-png-https-david-dm-org-gruntjs-grunt-contrib-less-">
        <a href="https://github.com/gruntjs/grunt-contrib-less">
            grunt-contrib-less
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-less">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-less.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-less">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-less.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compile LESS files to CSS.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-nodeunit-https-github-com-gruntjs-grunt-contrib-nodeunit-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-nodeunit-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-nodeunit-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-nodeunit-png-https-david-dm-org-gruntjs-grunt-contrib-nodeunit-">
        <a href="https://github.com/gruntjs/grunt-contrib-nodeunit">
            grunt-contrib-nodeunit
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-nodeunit">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-nodeunit.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-nodeunit">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-nodeunit.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Run Nodeunit unit tests.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-qunit-https-github-com-gruntjs-grunt-contrib-qunit-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-qunit-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-qunit-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-qunit-png-https-david-dm-org-gruntjs-grunt-contrib-qunit-">
        <a href="https://github.com/gruntjs/grunt-contrib-qunit">
            grunt-contrib-qunit
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-qunit">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-qunit.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-qunit">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-qunit.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Run QUnit unit tests in a headless PhantomJS instance.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-requirejs-https-github-com-gruntjs-grunt-contrib-requirejs-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-requirejs-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-requirejs-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-requirejs-png-https-david-dm-org-gruntjs-grunt-contrib-requirejs-">
        <a href="https://github.com/gruntjs/grunt-contrib-requirejs">
            grunt-contrib-requirejs
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-requirejs">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-requirejs.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-requirejs">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-requirejs.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Optimize RequireJS projects using r.js.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-sass-https-github-com-gruntjs-grunt-contrib-sass-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-sass-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-sass-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-sass-png-https-david-dm-org-gruntjs-grunt-contrib-sass-">
        <a href="https://github.com/gruntjs/grunt-contrib-sass">
            grunt-contrib-sass
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-sass">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-sass.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-sass">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-sass.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compile Sass to CSS
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-stylus-https-github-com-gruntjs-grunt-contrib-stylus-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-stylus-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-stylus-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-stylus-png-https-david-dm-org-gruntjs-grunt-contrib-stylus-">
        <a href="https://github.com/gruntjs/grunt-contrib-stylus">
            grunt-contrib-stylus
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-stylus">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-stylus.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-stylus">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-stylus.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compile Stylus files to CSS.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-uglify-https-github-com-gruntjs-grunt-contrib-uglify-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-uglify-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-uglify-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-uglify-png-https-david-dm-org-gruntjs-grunt-contrib-uglify-">
        <a href="https://github.com/gruntjs/grunt-contrib-uglify">
            grunt-contrib-uglify
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-uglify">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-uglify.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-uglify">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-uglify.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Minify files with UglifyJS.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-watch-https-github-com-gruntjs-grunt-contrib-watch-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-watch-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-watch-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-watch-png-https-david-dm-org-gruntjs-grunt-contrib-watch-">
        <a href="https://github.com/gruntjs/grunt-contrib-watch">
            grunt-contrib-watch
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-watch">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-watch.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-watch">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-watch.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Run predefined tasks whenever watched file patterns are added, changed
            or deleted.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-yuidoc-https-github-com-gruntjs-grunt-contrib-yuidoc-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-yuidoc-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-yuidoc-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-yuidoc-png-https-david-dm-org-gruntjs-grunt-contrib-yuidoc-">
        <a href="https://github.com/gruntjs/grunt-contrib-yuidoc">
            grunt-contrib-yuidoc
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-yuidoc">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-yuidoc.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-yuidoc">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-yuidoc.png" alt="Dependency Status">
        </a>
    </h4>
    <blockquote>
        <p>
            Compile YUIDoc Documentation.
        </p>
    </blockquote>
    <h4 id="-grunt-contrib-symlink-https-github-com-gruntjs-grunt-contrib-symlink-build-status-https-secure-travis-ci-org-gruntjs-grunt-contrib-symlink-png-branch-master-http-travis-ci-org-gruntjs-grunt-contrib-symlink-dependency-status-https-david-dm-org-gruntjs-grunt-contrib-symlink-png-https-david-dm-org-gruntjs-grunt-contrib-symlink-">
        <a href="https://github.com/gruntjs/grunt-contrib-symlink">
            grunt-contrib-symlink
        </a>
        <a href="http://travis-ci.org/gruntjs/grunt-contrib-symlink">
            <img src="https://secure.travis-ci.org/gruntjs/grunt-contrib-symlink.png?branch=master"
            alt="Build Status">
        </a>
        <a href="https://david-dm.org/gruntjs/grunt-contrib-symlink">
            <img src="https://david-dm.org/gruntjs/grunt-contrib-symlink.png" alt="Dependency Status">
        </a>
    </h4>
</section>

### 参考链接
1. <a href="http://javascript.ruanyifeng.com/tool/grunt.html" target="_blank">http://javascript.ruanyifeng.com/tool/grunt.html</a>
2. <a href="http://blog.csdn.net/lihongxun945/article/details/8958063" target="_blank">http://blog.csdn.net/lihongxun945/article/details/8958063</a>












































