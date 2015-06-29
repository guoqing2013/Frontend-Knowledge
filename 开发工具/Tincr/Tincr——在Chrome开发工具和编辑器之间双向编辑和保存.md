<link href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css" rel="stylesheet">
<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
<script >hljs.initHighlightingOnLoad();</script> 

<!--
http://addyosmani.com/blog/lets-tincr-bi-directional-editing-and-saving-with-the-chrome-devtools/

http://tin.cr/docs.html
-->

# Tincr——在Chrome开发工具和编辑器之间双向编辑和保存
- - -  


我们常常发现我们自己在调试代码时经常需要在Chrome开发工具和文本编辑器之间进行来回切换， 这耗费了我们很多不必要的时间。   
[Tincr](http://tin.cr/)都可以帮助我们解决这个问题。


### 1. Tincr是什么?
Tince的两大作用：

 - 在Chrome开发工具上的改变（css或js）立即同步到源文件中。 例如，我们常常使用“审查元素”的这个功能，然后尝试修改元素的样式，调试好后，又要将调试好的样式复制粘贴到编辑器中。
 - 在源文件中代码修改css或js后，浏览器会自动重新加载并展现新的页面效果。


**Tincr Demo Video**
<embed src="http://player.youku.com/player.php/sid/XMTI3MzE1NzU4OA==/v.swf" allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>

### 2. 安装
安装地址：[https://chrome.google.com/webstore/detail/tincr/lfjbhpnjiajjgnjganiaggebdhhpnbih](https://chrome.google.com/webstore/detail/tincr/lfjbhpnjiajjgnjganiaggebdhhpnbih)

### 3. 配置
安装成功后Tincr会在Chrome开发工具上添加一个新的tab。

![](newtab.jpg)



配置Tincr,遵循这些步骤 

1. 选择一个应用程序类型。 Tincr支持5应用程序类型 (Ruby on Rails, Chrome Extension, Http Web Server, Atlassian Plugin, Configuration file)
2. 单击Browse按钮，选择项目的根目录。(如果点击Browse按钮无效，则需要打开chrome://flags/，然后启用NPAPI)
3. 为你选定的项目类型定制您的配置设置或更改默认资源映射 （文件的url和文件的应用程序类型不能被自定义）
![](config.jpg)
![](step3.jpg)



