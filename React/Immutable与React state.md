# Immutable与React state


## state

note：```state```必须是一个纯JS对象，而不是一个一成不变的集合；

React 建议把 this.state 当作 Immutable 的，因此修改前需要做一个 deepCopy，显得麻烦：

```javascript
import '_' from 'lodash';

const Component = React.createClass({
  getInitialState() {
    return {
      data: { times: 0 }
    }
  },
  handleAdd() {
    let data = _.cloneDeep(this.state.data);
    data.times = data.times + 1;
    this.setState({ data: data });
    // 如果上面不做 cloneDeep，下面打印的结果会是已经加 1 后的值。
    console.log(this.state.data.times);
  }
}
```

使用 Immutable 后：

```javascript
 getInitialState() {
    return {
      data: Map({ times: 0 })
    }
  },
  handleAdd() {
    this.setState({ data: this.state.data.update('times', v => v + 1) });
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'));
  }
```

再看一个例子：
```javascript
var React = require('react');
var { Map, List } = require('immutable');

var Component = React.createClass({

  getInitialState() {
    return {
      data: Map({ count: 0, items: List() })
    }
  },

  handleCountClick() {
    this.setState(({data}) => ({
      data: data.update('count', v => v + 1)
    }));
  },

  handleAddItemClick() {
    this.setState(({data}) => ({
      data: data.update('items', list => list.push(data.get('count')))
    }));
  },

  render() {
    var data = this.state.data;
    return (
      <div>
        <button onClick={this.handleCountClick}>Add to count</button>
        <button onClick={this.handleAddItemClick}>Save count</button>
        <div>
          Count: {data.get('count')}
        </div>
        Saved counts:
        <ul>
          {data.get('items').map(item => 
            <li>Saved: {item}</li>
          )}
        </ul>
      </div>
    );
  }

});

React.render(<Component />, document.body);
```

## Using individual values from Immutable state.
```javascript
render() {
    var data = this.state.data;
    return (
      <div>
        <div onClick={this.handleCountClick}>
          Count: {data.get('count')}
        </div>
```

参考：(https://github.com/facebook/immutable-js/wiki/Immutable-as-React-state)[https://github.com/facebook/immutable-js/wiki/Immutable-as-React-state]
