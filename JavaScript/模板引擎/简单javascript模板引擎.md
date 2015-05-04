<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>


<!--
    http://segmentfault.com/a/1190000000432600
    http://www.cnblogs.com/dolphinX/p/3489269.html
    http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html
-->



# 简单javascript模板引擎
***

### 一、模板引擎

通过分析模板，将数据和模板结合在一起输出最后的结果的程序称为模板引擎。



模板写法：

    <ul>
        <% for(var i in items){ %>
            <li class='<%= items[i].status %>'><%= items[i].text %></li>
        <% } %>
    </ul>

非模板写法：

    var temp = '<ul>';
    for(var i in items){
        temp += "<li class='" + items[i].status + "'>" + items[i].text + "</li>";
    }
    temp += '</ul>';






### 二、JS模板引擎的实现原理

想得到预期html字符串，我们必须设法让模板内部的javascript变量置换、javaScript语句执行，也就是把JavaScript代码剥离出来执行，把其它html语句拼接为一个字符串。
虽然每个引擎从模板语法、语法解析、变量赋值、字符串拼接的实现方式各有所不同，但关键的渲染原理仍然是动态执行 javascript 字符串。


#### 1. 正则进行简单的字符串置换
使用正则表达式寻找里面的模板参数，然后替换成传给引擎的具体数据。

    var TemplateEngine = function(tpl, data) {
        var re = /<%([^%>]+)?%>/g;
        while(match = re.exec(tpl)) {
            tpl = tpl.replace(match[0], data[match[1]])
        }
        return tpl;
    }

如果正则匹配成功，则match不为空，match[0]是匹配到的字符串 <% template %>，match[1]是捕获到的变量template。







#### 2. javascript动态函数
在js中function是字面语法，js的运行时会将字面的function转化成Function对象，所以实际上Function提供了更为底层和灵活的机制。

用 Function 类直接创建函数的语法如下：

    var function_name = new Function(arg1, arg2, ..., argN, function_body);

例如：

    //创建动态函数
    var fn = new Function("arg", "console.log(arg + 1);");  //参数: arg，函数体: console.log(arg + 1);
    //执行
    fn(2); // outputs 3



最终代码：

    module.exports = function(html, options) {
        var re = /<%(.+?)%>/g,
            reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
            code = 'with(obj) { var r=[];\n',
            cursor = 0,
            result;
        var add = function(line, js) {
            js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while(match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, '');
        try { result = new Function('obj', code).apply(options, [options]); }
        catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
        return result;
    }


更多资料:
[http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line](http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line)  

