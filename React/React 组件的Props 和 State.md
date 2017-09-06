# React 组件的Props 和 State 

props和state都是用于描述component状态的，

props是一个父组件传递给子组件的数据流，这个数据流可以一直传递到子孙组件。而state代表的是一个组件内部自身的状态，只能在组件内部修改。


## State

如果component的某些状态需要被改变，并且会影响到component的render，那么这些状态就应该用state表示。
例如：一个购物车的component，会根据用户在购物车中添加的产品和产品数量，显示不同的价格，那么“总价”这个状态，就应该用state表示。

```javascript
var SiteDropdown = React.createClass({
  getInitalState: function() {
    return: {
      showOptions: false
    }
  },
  render: function() {
    var opts;
    if(this.state.showOptions) {
      <ul>
      	<li>itbilu.com</li>
      	<li>yijiebuyi.com</li>
      	<li>niefengjun.cn</li>
      </ul>
    };
    return (
      <div onClick={this.handleClick} >
      </ div>
    )
  },
  handleClick: function() {
    this.setSate({
      showOptions: true
    })
  }
});
```

随着state的改变，render也会被调用，React会对比render的返回值，如果有变化就会DOM。

## Props

如果component的某些状态由外部所决定，并且会影响到component的render，那么这些状态就应该用props表示。
例如：一个下拉菜单的component，有哪些菜单项，是由这个component的使用者和使用场景决定的，那么“菜单项”这个状态，就应该用props表示，并且由外部传入。

props是一个父组件传递给子组件的数据流，数据流是单向的，只会从父组件传递到子组件。

```javascript
<Child data = {this.state.childData}/>
```

从子组件的角度来看，props是不可变的。如何改变子组件的props？我们仅仅需要改变父组件内部的state即可，父组件的state改变之后，引起父组件重新渲染，在渲染的过程中，子组件的data变成父组件this.state.childDtat的值。这样父组件内部state改变，就会引起子组件的改变。

这样就形成里从上而下的数据流，也就是React常说的单向数据流，这个“向”是向下。
我们常常利用这个原理更新子组件，从而衍生出一种模式，父组件：处理复杂的业务逻辑、交互以及数据等。子组件：称它为Stateless组件即无状态组件，只用作展示。在我们开发过程中，尽可能多个使用无状态组件，可以缕清业务之间的逻辑关系,提高渲染效率。




## Props与state的比较

React会根据props或state更新视图状态。虽然二者有些类似，但应用范围确不尽相同。具体表现如下：

* props会在整个组件数中传递数据和配置，props可以设置任命类型的数据，应该把它当做组件的数据源。其不但可以用于上级组件与下组件的通信，也可以用其做为事件处理器。
* state只能在组件内部使用，state只应该用于存储简单的视图状（如：上面示例用于控制下拉框的可见状态）。
* props和state都不能直接修改，而应该分别使用setProps()和setSate()方法修改。


