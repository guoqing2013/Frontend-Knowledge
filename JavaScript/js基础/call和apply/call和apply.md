<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script> 


## call和apply

### call

####1. 语法
function.call(thisobj, args...)


####2. 参数
thisobj: 调用function的对象。在函数主体中，thisobj是关键字this的值。

args...: (可选)任意多个参数，这些参数将传递给函数function。

####3. 描述
call()将指定的函数function作为对象thisobj的方法来调用，把参数列表中thisobj后的参数传递给它，返回值是调用函数后的返回值。在函数体内，关键字this引用thisobj对象。



    function Obj(){this.value="对象！";}
    var value="global 变量";
    function Fun(){alert(this.value);}

    Fun();   //global 变量
    Fun.call(window);  //global 变量
    Fun.call(document.getElementById('myText'));  //input text
    Fun.call(new Obj());   //对象！




### apply

####1. 语法  
function.apply(thisobj, args)

####2. 参数
thisobj: 调用function的对象。在函数主体中，thisobj是关键字this的值。

args: 一个数组，它的元素是要传递给函数function的参数值。


####3. 描述

apply()将指定的函数function作为对象thisobj的方法来调用，传递给它的是存放在数组args中的参数，返回的是调用function的返回值。在函数体内，关键字this引用thisobj对象。




### 两者的区别
对于apply和call两者在作用上是相同的，但两者在参数上有区别的。
对于第一个参数意义都一样，但对第二个参数：
apply传入的是一个参数数组，也就是将多个参数组合成为一个数组传入，而call则作为call的参数传入（从第二个参数开始）。
如 func.call(func1,var1,var2,var3)对应的apply写法为：func.apply(func1,[var1,var2,var3])
