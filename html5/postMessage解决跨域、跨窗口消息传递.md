# postMessage处理iframe 跨域问题

window.postMessage() 方法可以安全地实现跨源通信。

otherWindow.postMessage(message, targetOrigin, [transfer]);


> 背景：由于同源策略存在，javascript的跨域一直都是一个棘手的问题。**父页面无法直接获取iframe内部的跨域资源；同时，iframe内部的跨域资源也无法将信息直接传递给父页面。**


## Window.postMessage()

Window.postMessage 提供了一种安全的跨域通讯方案


### 发送

```
otherWindow.postMessage( message , origin [ , transfer] )
```
**otherWindow**
跨域的window对象的引用，比如iframe、window.open创建的对象等。

**message**
发给跨域对象的消息，可以是string,object,number等对象

**origin**
指定消息发送的域名，可以使用通配符 


### 接收

我们可以监听window 的 "message" 事件来获取到传递过来的值

```
window.onmessage = function(event) {
	console.log(event.data); //传递过来的信息

	console.log(event.source); //发送数据的window的引用，例如b域名收到a域名的消息，此时的source指的是a域名的window，你可以通过它来实现双向通讯。

	console.log(event.origin); //发送消息的域名，包含了协议和端口（如 fhttps://developer.mozilla.org:443），通常情况下 默认端口会被省略，例如 fhttps://www.google.com 意味着省略了端口443 , fhttp://www.google.com 省略了端口 80。
  }

};
```

## example

父页面代码
```
// Main page:
window.onmessage = function(event) {
    alert(event.data);
};

// Trigger:
// <iframe id="myframe" src="framed.htm"></iframe>
document.getElementById('myframe').contentWindow.postMessage('','*');
```

iframe页面

```
// framed.htm:
window.onmessage = function(event) {
    //注意，在生产环境中，一定要验证event.origin，以避免潜在的安全问题
    event.source.postMessage(document.body.innerHTML, event.origin);
};
```