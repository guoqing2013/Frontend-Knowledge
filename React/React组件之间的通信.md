# React组件之间的通信


## 父子组件

### 父组件向子组件通讯

父组件 => 子组件： 父组件同过props将数据传递给子组件

parent组件传给child组件，符合react的单向数据流理念，自上到下传递props。

```javascript
// 父组件
class Parent extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    }
  }

  handleChange = e => {
    this.value = e.target.value;
  }

  handleClick = () => {
    this.setState({
      value: this.value,
    })
  }

  render() {
    return (
      <div>
        我是parent
        <input onChange={this.handleChange} />
        <div className="button" onClick={this.handleClick}>通知</div>
        <div>
          <Child value={this.state.value} />
        </div> 
      </div>
    );
  }
}
```


```javascript
// 子组件
class Child extends Component {
  render() {
    const { value } = this.props;
    return (
      <div>
        我是Child，得到传下来的值：{value}
      </div>
    );
  }
}
```

父组件做的就是定义好 state ，定义好事件函数，input onChange 的时候，去缓存 value 值，然后点击 button 的时候，改变 state , 子组件只负责展示 value 。


### 子组件向父组件通讯

父组件 <= 子组件： 子组件想要改变父组件数据，则通过父组件通过props传递传给子组件一个回调函数到子组件中


child 组件通知 parent 组件， 主要是依靠 parent 传下来的 callback 函数执行，改变 parent 组件的状态，或者把 child 自己的 state 通知 parent 。分两种情况：

- state 定义在 parent 组件

```javascript
// parent

class Parent extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    }
  }

  setValue = value => {
    this.setState({
      value,
    })
  }

  render() {
    return (
      <div>
        <div>我是parent, Value是：{this.state.value}</div> 
        <Child setValue={this.setValue} />
      </div>
    );
  }
}
```


```javascript
class Child extends Component {

  handleChange = e => {
    this.value = e.target.value;
  }

  handleClick = () => {
    const { setValue } = this.props;
    setValue(this.value);
  }

  render() {
    return (
      <div>
        我是Child
        <div className="card">
          state 定义在 parent
          <input onChange={this.handleChange} />
          <div className="button" onClick={this.handleClick}>通知</div>
        </div>
      </div>
    );
  }
}
```

parent 组件把改变 state 的 setValue 函数传给 child ，child 组件自己处理内部的状态（这里是表单的value值），当 child 组件分发消息的时候， 执行 parent 的 setValue 函数，从而改变了 parent 的 state，state发生变化， parent 组件执行 re-render 。


- state 定义在 child 组件

```javascript
// parent

class Parent extends Component {

  onChange = value => {
    console.log(value, '来自 child 的 value 变化');
  }

  render() {
    return (
      <div>
        <div>我是parent
        <Child onChange={this.onChange} />
      </div>
    );
  }
}
```

```javascript
class Child extends Component {

  constructor() {
    super();
    this.state = {
      childValue: ''
    }
  }

  childValChange = e => {
    this.childVal = e.target.value;
  }

  childValDispatch = () => {
    const { onChange } = this.props;
    this.setState({
      childValue: this.childVal,
    }, () => { onChange(this.state.childValue) })
  }

  render() {
    return (
      <div>
        我是Child
        <div className="card">
          state 定义在 child
          <input onChange={this.childValChange} />
          <div className="button" onClick={this.childValDispatch}>通知</div>
        </div>
      </div>
    );
  }
}
```

有时候 state 是需要定义在 child 组件的，比如弹窗， CheckBox 这种开关性质的，逻辑是重复的，state 定义在组件内部更好维护， 复用性更好。但是 child 的 state 是需要告知我的 parent 组件的， 同样还是执行 parent 传下来的 change 函数。



## 兄弟组件间通讯


有时候可能出现页面中的某两部分通信，比如省市的级联选择，点击 button 改变颜色等等，组件并不是父子级，没有嵌套关系的时候。这种时候通常是依赖共有的顶级 Container 处理或者第三方的状态管理器。其实原理都是相通的，兄弟 A 的 value 发生变化，分发的时候把 value 值告诉一个中间者 C ，C 会自动告知 B，实现 B 的自动render 。


### 利用共有的Container

```javascript
// container
class Container extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    }
  }
  
  setValue = value => {
    this.setState({
      value,
    })
  }

  render() {
    return (
      <div>
        <A setValue={this.setValue}/>
        <B value={this.state.value} />
      </div>
    );
  }
}
```

```javascript
// 兄弟A
class A extends Component {

  handleChange = (e) => {
    this.value = e.target.value;
  }

  handleClick = () => {
    const { setValue } = this.props;
    setValue(this.value);
  }

  render() {
    return (
      <div className="card">
        我是Brother A, <input onChange={this.handleChange} />
        <div className="button" onClick={this.handleClick}>通知</div>
      </div>
    )
  }
}
```

```javascript
// 兄弟B
const B = props => (
  <div className="card">
    我是Brother B, value是：
    {props.value}
  </div>
);
export default B;
```

组件 A 中的表单 value 值，告知了父级 Container 组件（通过 setValue 函数改变 state），组件 B 依赖于 Container 传下来的 state，会做出同步更新。这里的中间者是 Container。

只适用于组件层次很少的情况，当组件层次很深的时候，整个沟通的效率就会变得很低。
还有一个问题，由于 Parent 的 state 发生变化，会触发 Parent 及从属于 Parent 的子组件的生命周期，各个组件中的 componentDidUpdate 方法均被触发。


### 利用Context

上面的方式，如果嵌套少还可以，如果嵌套特别多，比如一级导航栏下的二级导航栏下的某个按钮，要改变页面中 content 区域的 table 里的某个列的值...他们同属于一个 page 。这样传递 props 就会很痛苦，每一层组件都要传递一次。


```javascript
// 顶级公共组件
class Context extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
    };
  }

  setValue = value => {
    this.setState({
      value,
    })
  }

  getChildContext() { // 必需
    return { 
      value: this.state.value,
      setValue: this.setValue,
    };
  }
  render() {
    return (
      <div>
        <AParent />
        <BParent />
      </div>
    );
  }
}
// 必需
Context.childContextTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
};
```


```javascript
// A 的 parent
class AParent extends Component {
  render() {
    return (
      <div className="card">
        <A />
      </div>
    );
  }
}
// A
class A extends Component {

  handleChange = (e) => {
    this.value = e.target.value;
  }

  handleClick = () => {
    const { setValue } = this.context;
    setValue(this.value);
  }

  render() {
    return (
      <div>
        我是parentA 下的 A, <input onChange={this.handleChange} />
        <div className="button" onClick={this.handleClick}>通知</div>
      </div>
    );
  }
}
// 必需
A.contextTypes = {
  setValue: PropTypes.func,
};
```


```javascript
// B 的 parent
class BParent extends Component {
  render() {
    return (
      <div className="card">
        <B />
      </div>
    );
  }
}

// B
class B extends Component {

  render() {
    return (
      <div>
        我是parentB 下的 B, value是：
        {this.context.value}
      </div>
    );
  }
}

B.contextTypes = {
  value: PropTypes.string,
};
```


组件 A 仍是 消息的发送者，组件 B 是接收者， 中间者是 Context 公有 Container 组件。context是官方(文档)[https://facebook.github.io/react/docs/context.html]的一个 API ，通过 getChildContext 函数定义 context 中的值，并且还要求 childContextTypes 是必需的。这样属于这个 Container 组件的子组件，通过 ```this.context``` 就可以取到定义的值，并且起到跟 state 同样的效果。中间者其实还是 Container，只不过利用了上下文这样的 API ，省去了 props 的传递。另外：这个功能是实验性的，未来可能会有所改动。


### 发布订阅(pub/sub模式)

这种一个地方发送消息，另一个地方接收做出变化的需求，很容易想到的就是观察者模式了。

如果你想使用 Publish/Subscribe 模型，可以使用：(PubSubJS)[https://github.com/mroderick/PubSubJS]

React 团队使用的是：(js-signals)[http://millermedeiros.github.io/js-signals/] 它基于 Signals 模式，用起来相当不错。

```javascript
// 发布订阅类
class EventEmitter {
  _event = {}

  // on 函数用于绑定
  on(eventName, handle) {
    let listeners = this._event[eventName];
    if(!listeners || !listeners.length) {
      this._event[eventName] = [handle];
      return;
    }
    listeners.push(handle);
  }
  // off 用于移除
  off(eventName, handle) {
    let listeners = this._event[eventName];
    this._event[eventName] = listeners.filter(l => l !== handle);
  }
  // emit 用于分发消息
  emit(eventName, ...args) {
    const listeners = this._event[eventName];
    if(listeners && listeners.length) {
      for(const l of listeners) {
        l(...args);
      }
    }
  }
}
const event = new EventEmitter;
export { event };
```


```javascript
// Container
import A from './a';
import B from './b';

const Listener = () => {
  return (
    <div>
      <A />
      <B />
    </div>
  );
};
export default Listener;
```



```javascript
// 兄弟组件 A
import { event } from './eventEmitter';

class A extends Component {

  handleChange = e => {
    this.value = e.target.value;
  }

  handleClick = () => {
    event.emit('dispatch', this.value);
  }

  render() {
    return (
      <div className="card">
        我是Brother A, <input onChange={this.handleChange} />
        <div className="button" onClick={this.handleClick}>通知</div>
      </div>
    )
  }
}
```




```javascript
// 兄弟组件 B
import { event } from './eventEmitter';

class B extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    event.on('dispatch', this.valueChange);
  }

  componentWillUnmount() {
    event.off('dispatch', this.valueChange);
  }

  valueChange = value => {
    this.setState({
      value,
    })
  }

  render() {
    return (
      <div className="card">
        我是Brother B, value是：
        {this.state.value}
      </div>
    );
  }
}
```

仍然是组件 A 用于分发消息，组件 B 去接收消息。这里的中间者其实就是 event 对象。需要接收消息的 B 去订阅 dispatch 事件，并把回调函数 valueChange 传入，另外 B 定义了自己的 state，方便得到 value 值的时候自动渲染。组件 A 其实就是把内部的表单 value 在点击的时候分发，发布事件，从而 B 中的 valueChange 执行，改变 state。这种方式比较方便，也更直观，不需要借助 Container 组件去实现，省去了很多逻辑。

官网已经声明 Context 是一个比较高级的实验性的特性，在以后可能变动这个API。慎用。所以一般的不要使用。


### Redux || Mobx

Redux 或者 Mobx 是第三方的状态管理器，是这里我们通信的中间者。大型项目最直接的就是上库... 更方便，更不容易出错。 但其实小项目就没什么必要了。东西比较多，这里不再阐述它们的实现和做了什么。
