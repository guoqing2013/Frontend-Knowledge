
# react-redux

> React-Redux是官方提供的一个库，用来结合redux和react的模块。React-Redux提供了两个接口**Provider**、**connect**。


## 概念


### 展示组件

展示组件（presentational component） 
也叫UI组件、纯组件 

- 负责UI显示
- 无状态不使用this.state
- 数据来自this.props
- 不使用任何redux的API

展示组件其实就是把我们的普通组件的数据与逻辑抽离出来


### 容器组件

容器组件（container component） 
特点如下：

- 负责管理数据和业务逻辑
- 带有内部状态
- 使用redux的API

容器组件是由我们react-redux库的API通过展示组件生成的



##  connect

- mapStateToProps（输入逻辑） 
     负责将通过state获得的数据映射到展示组件的this.props。它是一个函数，接收参数state对象，如果有必要的话，还可以使用第二个参数：容器组件的props属性 
返回一个对象表示state到展示组件props的映射关系

```javascript
const mapStateToProps = (state) => {
    return {
        list          //表示我们在展示组件中可以通过this.props.list来获取这个数组
        : 
        state.list    // 表示我们要将state的list数组传递给内部的展示组件
    }
}
```



- mapDispatchToProps（输出逻辑）  
     负责将用户操作转化为Action的功能函数映射到展示组件的this.props.

与它的兄弟不同，它既可以是函数也可以是对象 
作为函数，它会得到store.dispatch作为参数 
同样还有一个容器组件的props属性可以使用 


```javascript
const mapDispatchToProps = (state, ownProps) => {
    return {
        onClick     // 表示我们在展示组件中可以通过this.props.onClick来获取这个函数
        : 
        () => {    // 表示我们要传递给内部展示组件的函数（函数功能：dispatch一个action）
            dispatch({
                type: 'SET_FILTER',
                filter: ownProps.filter
            })
        }
    }
}
```


对象写法：

```javascript
const mapDispatchToProps = {
    onClick: (filter) => {
        type: 'SET_FILTER',
        filter: filter
    }
}
```



connect返回一个函数，它接受一个React组件的构造函数作为连接对象，最终返回连接好的组件构造函数。

```javascript
const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
```


##  Provider

Provider 是一个React组件，它的作用是保存store给子组件中的connect使用。

它的工作很简单，就是接受Redux的store作为props，并将其声明为`context`的属性之一，子组件可以在声明了`contextTypes`之后可以方便的通过`this.context.store`访问到store。不过我们的组件通常不需要这么做，将store放在context里，是为了给下面的connect用的。


```javascript
// config app root
const history = createHistory()
const root = (
  <Provider store={store} key="provider">
    <Router history={history} routes={routes} />
  </Provider>
)

// render
ReactDOM.render(
  root,
  document.getElementById('root')
)
```




