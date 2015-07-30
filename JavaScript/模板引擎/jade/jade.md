<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>


<!--
    https://github.com/jadejs/jade/blob/master/Readme_zh-cn.md#a1
-->



# Jade模板引擎
***

### 一、安装

通过NPM:  
```$ npm install jade -g```

### 二、语法
jade官网教程：[http://jade-lang.com/](http://jade-lang.com/)  
jade语法文档：[http://naltatis.github.io/jade-syntax-docs/](http://naltatis.github.io/jade-syntax-docs/)


    doctype html
    html(lang="en")
      head
        title= pageTitle
        script(type='text/javascript').
          if (foo) bar(1 + 5)
      body
        h1 Jade - node template engine
        #container.col
          if youAreUsingJade
            p You are amazing
          else
            p Get on it!
          p.
            Jade is a terse and simple templating language with a
            strong focus on performance and powerful features.
	

becomes:

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Jade</title>
        <script type="text/javascript">
          if (foo) bar(1 + 5)
        </script>
      </head>
      <body>
        <h1>Jade - node template engine</h1>
        <div id="container" class="col">
          <p>You are amazing</p>
          <p>Jade is a terse and simple templating language with a strong focus on performance and powerful features.</p>
        </div>
      </body>
    </html>






### 三、Makefile 的一个例子
把Jade编译为一个可供浏览器使用的单文件，只需要简单的执行:  
```$ make jade.js```

通过执行 make， 下面的 Makefile 例子可以把 pages/*.jade 编译为 pages/*.html 。


### 四、 命令行
   
    使用: jade [options] [dir|file ...]

    选项:

      -h, --help         输出帮助信息
      -v, --version      输出版本号
      -o, --out <dir>    输出编译后的 HTML 到 <dir>
      -O, --obj <str>    JavaScript 选项
      -p, --path <path>  在处理 stdio 时，查找包含文件时的查找路径
      -P, --pretty       格式化 HTML 输出
      -c, --client       编译浏览器端可用的 runtime.js
      -D, --no-debug     关闭编译的调试选项(函数会更小)
      -w, --watch        监视文件改变自动刷新编译结果

    Examples:

      # 编译整个目录
      $ jade templates

      # 生成 {foo,bar}.html
      $ jade {foo,bar}.jade

      # 在标准IO下使用jade 
      $ jade < my.jade > my.html

      # 在标准IO下使用jade, 同时指定用于查找包含的文件
      $ jade < my.jade -p my.jade > my.html

      # 在标准IO下使用jade 
      $ echo "h1 Jade!" | jade

      # foo, bar 目录渲染到 /tmp
      $ jade foo bar --out /tmp 
 


