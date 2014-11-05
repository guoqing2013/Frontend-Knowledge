<!--
http://tgideas.qq.com/webplat/info/news_version3/804/808/811/m579/201307/216460.shtml

http://wenku.baidu.com/link?url=foCse_EOL-v_WHP8LYircMvpZaMy9pCQnv49lr3zPRF-ZJJGYY3bzARBHMH220gpMpomh-e2dU89-fbtr-8F07nAEqoYqQfvsJIjKfdxObq

http://javascript.ruanyifeng.com/tool/grunt.html
-->

# Grunt 前端自动化构建工具

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

对应的版本可以加上各种限定，主要有以下几种：  
> 指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。  
> 波浪号：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。  
> 插入号：比如?1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。  
> latest：安装最新版本。


## Gruntfile.js
Gruntfile主要有三个方法：

* grunt.initConfig：定义各种模块的参数，每一个成员项对应一个同名模块。

* grunt.loadNpmTasks：加载完成任务所需的模块。

* grunt.registerTask：定义具体的任务。第一个参数为任务名，第二个参数是一个数组，表示该任务需要依次使用的模块。default任务名表示，如果直接输入grunt命令，后面不跟任何参数，这时所调用的模块（该例为uglify）。

<pre>
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
</pre>




待续







































