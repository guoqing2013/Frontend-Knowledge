<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script>

#使用manifest实现离线应用的功能
***

web程序指定可以缓存在本地的资源，以及缓存策略，使得程序能够在离线时仍然能够运行，也可以使程序在线时也可以从本地加载资源而不用重新从网络加载。


应用缓存（又称 AppCache）

使用缓存的优势：  
1. 离线浏览 - 用户可在离线时浏览您的网站；  
2. 速度 - 缓存资源为本地资源，因此加载速度较快；  
3. 服务器负载更少 - 浏览器只会从发生了更改的服务器下载资源;  


要用manifest，页面的html标签中中引入

    <html manifest="manifest.appcache">

    or

    <html manifest="https://mobile.twitter.com/cache/manifest?version=2.9">
    


app.manifest


    CACHE MANIFEST  
     
    #version 1.00  
     
    CACHE:  
    index.html  
    lib/sencha-touch-debug.js  
    app/app.js  
    app/model/model.js  
    app/controller/controller.js  
    app/store/store.js  
    app/view/view.js  
    resources/style/style.css  
    lib/sencha-touch.css  

    NETWORK:  
    http://maps.google.com/maps/api/js?sensor=true 
    http://maps.gstatic.com/intl/zh_cn/mapfiles/api-3/6/8/main.js  
    *  




