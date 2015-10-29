<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>


# CSS单行、多行文本溢出显示省略号
- - -  


使用**text-overflow: ellipsis**属性，可以让溢出的文本显示省略标记(…)。
想要实现溢出时产生省略号的效果。还必须定义：强制文本在一行内显示（white-space:nowrap）及溢出内容为隐藏（overflow:hidden）。只有这样才能实现溢出文本显示省略号的效果



### 1. 单行文本溢出显示省略号

    p {
         width:200px;                   /*对宽度的定义,根据情况修改*/
         white-space: nowrap;
         overflow: hidden;

         -o-text-overflow: ellipsis;    /* Opera */
         text-overflow:    ellipsis;    /* IE, Safari (WebKit) */
    }


### 2. 多行文本溢出显示省略号

在WebKit浏览器或移动端的页面，可以直接使用-webkit-line-clamp属性实现多行溢出文本显示省略号。
-webkit-line-clamp属性， 限制在一个块元素显示的文本的行数。

    .multiline-ellipsis {
        display: block;
        display: -webkit-box;
        max-width: 400px;
        height: 109.2px;
        margin: 0 auto;
        font-size: 26px;
        line-height: 1.4;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }


### 3. 检测元素的内容是否溢出

通常,我们可以比较client[Height|Width]和scroll[Height|Width]的大小来判断元素（overflow为hidden时）的内容是否有溢出。

    function checkOverflow(el) {
        var curOverflow = el.style.overflow; 
        if (!curOverflow || curOverflow === "visible") {
            el.style.overflow = "hidden";
        }
        var isOverflowing = el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;
        el.style.overflow = curOverflow;
        return isOverflowing;
    }

