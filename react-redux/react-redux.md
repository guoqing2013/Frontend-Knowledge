# react-redux

> React-Redux是官方提供的一个库，用来结合redux和react的模块。


React-Redux提供了两个接口**Provider**、**connect**。

## 1. Provider

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

## 2. connect



