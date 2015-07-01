<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>

<!--
   http://www.cnblogs.com/snandy/archive/2012/03/12/2390782.html
   http://my.oschina.net/felumanman/blog/263330?p=1
-->



# 页面预加载功能（prefetch）
***

在HTML5里，出现了一个新的用来优化网站速度的新功能：页面资源预加载/预读取(Link prefetch)。


### 1. 什么是预加载
当前页面加载完成之后，让浏览器后台静悄悄的下载指定的页面、文档、图片等资源。

页面资源预加载，目的是让浏览器在空闲时间下载或预读取一些文档资源，用户在将来将会访问这些资源。
一个Web页面可以对浏览器设置一系列的预加载指示，当浏览器加载完当前页面后，它会在后台静悄悄的加载指定的文档，并把它们存储在缓存里。当用户访问到这些预加载的文档后，浏览器能快速的从缓存里提取给用户。
注：HTTPS协议资源下也可以使用prefetch。




### 2. 如何使用预加载

HTML5提供了3种方法
    - prefetch（预读取）
    - prerender（预渲染）
    - dns-prefetch（DNS预解析）



    prefetch（预读取-用法）

    <!-- 页面，可以使用绝对或者相对路径 --> 
    <link rel="prefetch" href="page2.html" /> 

    <!-- 图片，也可以是其他类型的文件 -->
    <link rel="prefetch" href="sprite.png" /> 


火狐和Chrome

    <link rel="prefetch" href="http://www.example.com/"> <!--  火狐 -->
    <link rel="prerender" href="http://www.example.com/"> <!-- Chrome -->

    <link rel="prefetch prerender" href="http://www.example.com/" > <!-- 同时兼容两个浏览器，可以写成这样 -->


Mozilla还提供了不一样的rel属性去预加载：
    
    <link rel="prefetch alternate stylesheet" title="Designed for Mozilla" href="mozspecific.css" />
    <link rel="next" href="2.html" />



### 3. 什么情况下应该预加载页面资源

* 当页面有幻灯片类似的服务时，预加载/预读取接下来的1-3页和之前的1-3页。 
* 预加载那些整个网站通用的图片。 
* 预加载网站上搜索结果的下一页。 


<!--
### 4. 禁止页面资源预加载(Link prefetch)
火狐浏览器里有一个选项可以禁止任何的页面资源预加载(Link prefetch)功能，你可以这样设置： 

	user_pref("network.prefetch-next", false);
-->


### 4. 面资源预加载注意事项

* 预加载不能跨域工作，包括跨域拉取cookies。
* 预加载会污染你的网站访问量统计，因为有些预加载到浏览器的页面用户可能并未真正访问。
* 火狐浏览器从2003年开始就已经提供了对这项预加载术的支持。



更多资料:
1. [https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)  
2. [https://medium.com/@luisvieira_gmr/html5-prefetch-1e54f6dda15d](https://medium.com/@luisvieira_gmr/html5-prefetch-1e54f6dda15d)  
3. [http://yujiangshui.com/three-html5-feature-intro/](http://yujiangshui.com/three-html5-feature-intro/)  


















