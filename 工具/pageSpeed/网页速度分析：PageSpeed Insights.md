<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>

<!--
   http://www.cnblogs.com/snandy/archive/2012/03/12/2390782.html
   http://my.oschina.net/felumanman/blog/263330?p=1
-->



# 网页速度分析工具：PageSpeed Insights
***


PageSpeed Insights扩展安装地址：[点击安装](https://chrome.google.com/webstore/detail/pagespeed-insights-by-goo/gplegfbjlmmehdoakndmohflojccocli)


## PageSpeed Insights
###PageSpeed Insights的简介:
PageSpeed Insights是一款谷歌公司开发的网页速度分析插件，在Chrome中安装了PageSpeed Insights插件以后，用户在网站开发完成以后，就可以使用PageSpeed Insights插件来监控当前网站的运行速度，PageSpeed Insights插件在监控完成以后，还会给出一些网页速度优化的建议，用户可以参考其中的提示，在网站的开发或服务器开发方面更改产品的性能或增强服务器质量等方式来缩短网站的打开速度。  


![1](1.jpg)

使用方法：点击 “分析”，稍等一会儿就会给出分析结果。


![2](2.png)


PageSpeed的分析基于一个分为五类的最佳实践列表：

* 优化缓存——让你应用的数据和逻辑完全避免使用网络
* 减少回应时间——减少一连串请求-响应周期的数量
* 减小请求大小——减少上传大小
* 减小有效负荷大小——减小响应、下载和缓存页面的大小
* 优化浏览器渲染——改善浏览器的页面布局


以下是最佳典范，谷歌希望大家都能以此为目标：

* 服务器必须给予响应（＜200ms）
* 重定向数应最小化
* 首次渲染的往返次数应尽量减少
* 在即时显示内容上，应避免JavaScript和CSS外部阻塞
* 为浏览器布局和渲染预留时间（200ms）
* 优化JavaScript执行和渲染时间




最后推荐一个在线的页面分析测试网站： [http://gtmetrix.com/](http://gtmetrix.com/)
![3](3.jpg)
