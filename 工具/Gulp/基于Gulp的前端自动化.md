<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>



# 基于Gulp的前端自动化
***
[Gulp官方文档](https://github.com/gulpjs/gulp/tree/master/docs)  
[Gulp插件列表](http://gulpjs.com/plugins/)

Gulp是一种基于流的，代码优于配置的新一代构建工具。 

> Gulp具有高效性特点，因为它是通过Node.js强大的流，不需要写入临时文件/文件夹到磁盘，因此可以更快的完成构建。  
> Gulp允许你一次输入所有插件，然后把这一堆插件通过管流一次输出出来，比起安装每个插件，然后对每个插件进行输入输出（如Grunt）要快的多。


### 1. 安装

Gulp是基于Node.js的，故要首先安装 Node.js。  
Gulp需要全局安装，然后再在项目的开发目录中安装为本地模块。  

```npm install --global gulp```   
```npm install gulp --save-dev```  


### 2. 在项目根目录下创建 gulpfile.js


**在项目中安装你所需要的模块，如：**  
```npm install gulp-uglify --save-dev```


**创建 gulpfile.js**

    var gulp = require('gulp'),
       uglify = require('gulp-uglify');

    gulp.task('minify', function () {
       gulp.src('js/app.js')
          .pipe(uglify())
          .pipe(gulp.dest('build'))
    });

    gulp.task('default', ['minify']);


gulpfile.js加载gulp和gulp-uglify模块之后，使用gulp模块的task方法指定任务。
task方法有两个参数，第一个是任务名，第二个是任务函数。在任务函数中，使用gulp模块的src方法，指定所要处理的文件，然后使用pipe方法，将上一步的输出转为当前的输入，进行链式处理。

在上面代码中，使用两次pipe方法，也就是说做了两种处理。第一种处理是使用gulp-uglify模块，压缩源码；第二种处理是使用gulp模块的dest方法，将上一步的输出写入本地文件，这里是build.js（代码中省略了后缀名js）。

从上面的例子中可以看到，gulp充分使用了“管道”思想，就是一个数据流（stream）：src方法读入文件产生数据流，dest方法将数据流写入文件，中间是一些中间步骤，每一步都对数据流进行一些处理。



    var gulp = require('gulp');
    var coffee = require('gulp-coffee');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var imagemin = require('gulp-imagemin');
    var sourcemaps = require('gulp-sourcemaps');
    var del = require('del');
     
    var paths = {
      scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
      images: 'client/img/**/*'
    };
     
    // Not all tasks need to use streams
    // A gulpfile is just another node program and you can use all packages available on npm
    gulp.task('clean', function(cb) {
      // You can use multiple globbing patterns as you would with `gulp.src`
      del(['build'], cb);
    });
     
    gulp.task('scripts', ['clean'], function() {
      // Minify and copy all JavaScript (except vendor scripts)
      // with sourcemaps all the way down
      return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(coffee())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
    });
     
    // Copy all static images
    gulp.task('images', ['clean'], function() {
      return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
    });
     
    // Rerun the task when a file changes
    gulp.task('watch', function() {
      gulp.watch(paths.scripts, ['scripts']);
      gulp.watch(paths.images, ['images']);
    });

     
    // The default task (called when you run `gulp` from cli)
    gulp.task('default', ['watch', 'scripts', 'images']);


### 3.  5个gulp命令

* gulp.task(name, fn) 用于定义具体的任务
* gulp.run(tasks...) 尽可能多的并行运行多个task
* gulp.watch(glob, fn) 当glob内容发生改变时，执行fn
* gulp.src(glob) 返回一个可读的stream
* gulp.dest(glob) 返回一个可写的stream



参考链接：  
1. [http://markgoodyear.com/2014/01/getting-started-with-gulp/](http://markgoodyear.com/2014/01/getting-started-with-gulp/)  
2. [http://www.smashingmagazine.com/2014/06/11/building-with-gulp/](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/)  
3. [http://javascript.ruanyifeng.com/tool/gulp.html](http://javascript.ruanyifeng.com/tool/gulp.html)

