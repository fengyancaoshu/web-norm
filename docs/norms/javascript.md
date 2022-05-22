# JavaScript 规范

## 语法

- 变量不要先使用后声明
- 不要声明了变量却不使用
- 不要在同个作用域下声明同名变量
- 变量语义化
- debugger 不要出现在提交的代码里
- 使用===代替==，!==代替!=（==会自动进行类型转换，可能会出现奇怪的结果）
- 使用三元运算代替简单的 if-else
- 将复杂的函数分解成多个子函数，方便维护和复用

## 单行长度

不要超过 80，但如果编辑器开启 `word wrap`可以不考虑单行长度。

## 类型

- **原始值**: 相当于传值

  - `string`
  - `number`
  - `boolean`
  - `null`
  - `undefined`

    ```javascript
    let foo = 1,
        bar = foo;
    bar = 9;
    console.log(foo, bar); // => 1, 9
    ```

- **复杂类型**: 相当于传引用

  - `object`
  - `array`
  - `function`

    ```javascript
    let foo = [1, 2],
        bar = foo;
    bar[0] = 9;
    console.log(foo[0], bar[0]); // => 9, 9
    ```

## 对象

- 使用字面值创建对象

  ```javascript
  // bad
  let item = new Object();
  // good
  let item = {};
  ```

- 不要使用保留字 [reserved words](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Reserved_Words) 作为键

  ```javascript
  // bad
  let superman = {
    class: 'superhero',
    default: { clark: 'kent' },
    private: true
  };
  // good
  let superman = {
    klass: 'superhero',
    defaults: { clark: 'kent' },
    hidden: true
  };
  ```

## 数组

- 使用字面值创建数组

  ```javascript
  // bad
  let items = new Array();
  // good
  let items = [];
  ```

- 如果你不知道数组的长度，使用push

  ```javascript
  let someStack = [];
  // bad
  someStack[someStack.length] = 'abracadabra';
  // good
  someStack.push('abracadabra');
  ```

- 当你需要拷贝数组时使用slice

  ```javascript
  let len = items.length,
      itemsCopy = [],
      i;
  // bad
  for (i = 0; i < len; i++) {
    itemsCopy[i] = items[i];
  }
  // good
  itemsCopy = items.slice();
  ```

- 使用slice将类数组的对象转成数组.

  ```javascript
  function trigger() {
    let args = Array.prototype.slice.call(arguments);
    ...
  }
  ```

## 字符串

- 对字符串使用单引号 `''`

    ```javascript
    // bad
    let name = "Bob Parr";
    // good
    let name = 'Bob Parr';
    // bad
    let fullName = "Bob " + this.lastName;
    // good
    let fullName = 'Bob ' + this.lastName;
    ```

- 超过80个字符的字符串应该使用字符串连接换行
  - 注: 如果过度使用，长字符串连接可能会对性能有影响.

    ```javascript
    // bad
    let errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
    // bad
    let errorMessage = 'This is a super long error that \
    was thrown because of Batman. \
    When you stop to think about \
    how Batman had anything to do \
    with this, you would get nowhere \
    fast.';
    // good
    let errorMessage = 'This is a super long error that ' +
    'was thrown because of Batman.' +
    'When you stop to think about ' +
    'how Batman had anything to do ' +
    'with this, you would get nowhere ' +
    'fast.';
    ```

- 编程时使用join而不是字符串连接来构建字符串，特别是IE

  ```javascript
  let items,
      messages,
      length, i;
  messages = [{
    state: 'success',
    message: 'This one worked.'
  },{
    state: 'success',
    message: 'This one worked as well.'
  },{
    state: 'error',
    message: 'This one did not work.'
  }];
  length = messages.length;
  // bad
  function inbox(messages) {
    items = '<ul>';
    for (i = 0; i < length; i++) {
      items += '<li>' + messages[i].message + '</li>';
    }
    return items + '</ul>';
  }
  // good
  function inbox(messages) {
    items = [];
    for (i = 0; i < length; i++) {
      items[i] = messages[i].message;
    }
    return '<ul><li>' + items.join('</li><li>') + '</li></ul>';
  }
  ```

## 函数

- 函数表达式:

    ```javascript
    // 匿名函数表达式
    let anonymous = function() {
      return true;
    };
    // 有名函数表达式
    let named = function named() {
      return true;
    };
    // 立即调用函数表达式
    (function() {
      console.log('Welcome to the Internet. Please follow me.');
    })();
    ```

- 绝对不要在一个非函数块里声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但是它们解析不同。
  - **注:** ECMA-262定义把`块`定义为一组语句，函数声明不是一个语句。[阅读ECMA-262对这个问题的说明](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97).

    ```javascript
    // bad
    if (currentUser) {
      function test() {
        console.log('Nope.');
      }
    }
    // good
    if (currentUser) {
      let test = function test() {
        console.log('Yup.');
      };
    }
    ```

  - 绝对不要把参数命名为 `arguments`, 这将会逾越函数作用域内传过来的 `arguments` 对象.

    ```javascript
    // bad
    function nope(name, options, arguments) {
      // ...stuff...
    }
    // good
    function yup(name, options, args) {
      // ...stuff...
    }
    ```

## 属性

- 当使用变量访问属性时使用中括号.

  ```javascript
  let luke = {
    jedi: true,
    age: 28
  };
  function getProp(prop) {
    return luke[prop];
  }
  let isJedi = getProp('jedi');
  ```

## 变量

- 总是使用 `let` 来声明变量，如果不这么做将导致产生全局变量，我们要避免污染全局命名空间。

```javascript
// bad
superPower = new SuperPower();
// good
let superPower = new SuperPower();
```

- 使用一个 `let` 以及新行声明多个变量，缩进4个空格。

    ```javascript
    // bad
    let items = getItems();
    let goSportsTeam = true;
    let dragonball = 'z';
    // good
    let items = getItems(),
        goSportsTeam = true,
        dragonball = 'z';
    ```

  - 最后再声明未赋值的变量，当你想引用之前已赋值变量的时候很有用。

    ```javascript
    // bad
    let i, len, dragonball,
        items = getItems(),
        goSportsTeam = true;
    // bad
    let i, items = getItems(),
        dragonball,
        goSportsTeam = true,
        len;
    // good
    let items = getItems(),
        goSportsTeam = true,
        dragonball,
        length,
        i;
    ```

  - 在作用域顶部声明变量，避免变量声明和赋值引起的相关问题。

    ```javascript
    // bad
    function() {
      test();
      console.log('doing stuff..');
      //..other stuff..
      let name = getName();
      if (name === 'test') {
        return false;
      }
      return name;
    }
    // good
    function() {
      let name = getName();
      test();
      console.log('doing stuff..');
      //..other stuff..
      if (name === 'test') {
        return false;
      }
      return name;
    }
    // bad
    function() {
      let name = getName();
      if (!arguments.length) {
        return false;
      }
      return true;
    }
    // good
    function() {
      if (!arguments.length) {
        return false;
      }
      let name = getName();
      return true;
    }
    ```

## 条件表达式和等号

- 适当使用 `===` 和 `!==` 以及 `==` 和 `!=`.
- 条件表达式的强制类型转换遵循以下规则：

  - **对象** 被计算为 **true**
  - **Undefined** 被计算为 **false**
  - **Null** 被计算为 **false**
  - **布尔值** 被计算为 **布尔的值**
  - **数字** 如果是 **+0, -0, or NaN** 被计算为 **false** , 否则为 **true**
  - **字符串** 如果是空字符串 `''` 则被计算为 **false**, 否则为 **true**

    ```javascript
    if ([0]) {
      // true
      // An array is an object, objects evaluate to true
    }
    ```

- 使用快捷方式.

    ```javascript
    // bad
    if (name !== '') {
      // ...stuff...
    }
    // good
    if (name) {
      // ...stuff...
    }
    // bad
    if (collection.length > 0) {
      // ...stuff...
    }
    // good
    if (collection.length) {
      // ...stuff...
    }
    ```

  - 阅读 [Truth Equality and JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108) 了解更多

## 块

- 给所有多行的块使用大括号

  ```javascript
  // bad
  if (test)
    return false;
  // good
  if (test) return false;
  // good
  if (test) {
    return false;
  }
  // bad
  function() { return false; }
  // good
  function() {
    return false;
  }
  ```

## 注释

- 使用 `/** ... */` 进行多行注释，包括描述，指定类型以及参数值和返回值

    ```javascript
    // bad
    // make() returns a new element
    // based on the passed in tag name
    //
    // @param <String> tag
    // @return <Element> element
    function make(tag) {
      // ...stuff...
      return element;
    }
    // good
    /**
    * make() returns a new element
    * based on the passed in tag name
    * @param <String> tag
    * @return <Element> element
    */
    function make(tag) {
        // ...stuff...
        return element;
    }
    ```

- 使用 `//` 进行单行注释，在评论对象的上面进行单行注释，注释前放一个空行.

    ```javascript
    // bad
    let active = true;  // is current tab
    // good
    // is current tab
    let active = true;
    // bad
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      let type = this._type || 'no type';
      return type;
    }
    // good
    function getType() {
      console.log('fetching type...');
      // set the default type to 'no type'
      let type = this._type || 'no type';
      return type;
    }
    ```

  - 如果你有一个问题需要重新来看一下或如果你建议一个需要被实现的解决方法的话需要在你的注释前面加上 `FIXME` 或 `TODO` 帮助其他人迅速理解

    ```javascript
    function Calculator() {
      // FIXME: shouldn't use a global here
      total = 0;
      return this;
    }
    ```

    ```javascript
    function Calculator() {
      // TODO: total should be configurable by an options param
      this.total = 0;
      return this;
    }
    ```

## 文档注释

头部注释本文档的说明内容和作用

```javascript
<!--
    @name: 文件名称
    @description: 相关内容描述
    @author: jiaxin
-->
```

## 函数注释

定义的方法需要完善注释，格式如下：

```javascript
/**
 * @func
 * @desc 一个带参数的函数
 * @param {string} a - 参数a
 * @param {number} b=1 - 参数b默认值为1
 * @param {string} c=1 - 参数c有两种支持的取值</br>1—表示x</br>2—表示xx
 * @param {object} d - 参数d为一个对象
 * @param {string} d.e - 参数d的e属性
 * @param {string} d.f - 参数d的f属性
 * @param {object[]} g - 参数g为一个对象数组
 * @param {string} g.h - 参数g数组中一项的h属性
 * @param {string} g.i - 参数g数组中一项的i属性
 * @param {string} [j] - 参数j是一个可选参数
 * @return {string} x - 函数返回值
 */
function foo(a, b, c, d, g, j) {
  // ...
  return x;
}
```

## 类型转换

- 在语句的开始执行类型转换.
- 字符串:

    ```javascript
    //  => this.reviewScore = 9;
    // bad
    let totalScore = this.reviewScore + '';
    // good
    let totalScore = '' + this.reviewScore;
    // bad
    let totalScore = '' + this.reviewScore + ' total score';
    // good
    let totalScore = this.reviewScore + ' total score';
    ```

- 对数字使用 `parseInt` 并且总是带上类型转换的基数.

   ```javascript
   let inputValue = '4';
   // bad
   let val = new Number(inputValue);
   // bad
   let val = +inputValue;
   // bad
   let val = inputValue >> 0;
   // bad
   let val = parseInt(inputValue);
   // good
   let val = Number(inputValue);
   // good
   let val = parseInt(inputValue, 10);
   // good
   /**
   * parseInt was the reason my code was slow.
   * Bitshifting the String to coerce it to a
   * Number made it a lot faster.
   */
   let val = inputValue >> 0;
   ```

- 布尔值:

```javascript
let age = 0;
// bad
let hasAge = new Boolean(age);
// good
let hasAge = Boolean(age);
// good
let hasAge = !!age;
```

## 构造器

- 给对象原型分配方法，而不是用一个新的对象覆盖原型，覆盖原型会使继承出现问题。

  ```javascript
  function Jedi() {
    console.log('new jedi');
  }
  // bad
  Jedi.prototype = {
    fight: function fight() {
      console.log('fighting');
    },
    block: function block() {
      console.log('blocking');
    }
  };
  // good
  Jedi.prototype.fight = function fight() {
    console.log('fighting');
  };
  Jedi.prototype.block = function block() {
    console.log('blocking');
  };
  ```

- 方法可以返回 `this` 帮助方法可链。

  ```javascript
  // bad
  Jedi.prototype.jump = function() {
    this.jumping = true;
    return true;
  };
  Jedi.prototype.setHeight = function(height) {
    this.height = height;
  };
  let luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20) // => undefined
  // good
  Jedi.prototype.jump = function() {
    this.jumping = true;
    return this;
  };
  Jedi.prototype.setHeight = function(height) {
    this.height = height;
    return this;
  };
  let luke = new Jedi();
  luke.jump()
    .setHeight(20);
  ```

- 可以写一个自定义的toString()方法，但是确保它工作正常并且不会有副作用。

  ```javascript
  function Jedi(options) {
    options || (options = {});
    this.name = options.name || 'no name';
  }
  Jedi.prototype.getName = function getName() {
    return this.name;
  };
  Jedi.prototype.toString = function toString() {
    return 'Jedi - ' + this.getName();
  };
  ```

## 事件

- 当给事件附加数据时，传入一个哈希而不是原始值，这可以让后面的贡献者加入更多数据到事件数据里而不用找出并更新那个事件的事件处理器

  ```js
  // bad
  $(this).trigger('listingUpdated', listing.id);
  ...
  $(this).on('listingUpdated', function(e, listingId) {
    // do something with listingId
  });
  ```

    更好:

  ```js
  // good
  $(this).trigger('listingUpdated', { listingId : listing.id });
  ...
  $(this).on('listingUpdated', function(e, data) {
    // do something with data.listingId
  });
  ```

## 模块

- 模块应该以 `!` 开始，这保证了如果一个有问题的模块忘记包含最后的分号在合并后不会出现错误
- 这个文件应该以驼峰命名，并在同名文件夹下，同时导出的时候名字一致
- 加入一个名为noConflict()的方法来设置导出的模块为之前的版本并返回它
- 总是在模块顶部声明 `'use strict';`

```javascript
// fancyInput/fancyInput.js
!function(global) {
  'use strict';
  let previousFancyInput = global.FancyInput;
  function FancyInput(options) {
    this.options = options || {};
  }
  FancyInput.noConflict = function noConflict() {
    global.FancyInput = previousFancyInput;
    return FancyInput;
  };
  global.FancyInput = FancyInput;
}(this);
```

## jQuery

- 缓存jQuery查询

```javascript
// bad
function setSidebar() {
  $('.sidebar').hide();
  // ...stuff...
  $('.sidebar').css({
    'background-color': 'pink'
  });
}
// good
function setSidebar() {
  let $sidebar = $('.sidebar');
  $sidebar.hide();
  // ...stuff...
  $sidebar.css({
    'background-color': 'pink'
  });
}
```

- 对DOM查询使用级联的 `$('.sidebar ul')` 或 `$('.sidebar ul')`
- 对有作用域的jQuery对象查询使用 `find`

```javascript
// bad
$('.sidebar', 'ul').hide();
// bad
$('.sidebar').find('ul').hide();
// good
$('.sidebar ul').hide();
// good
$('.sidebar > ul').hide();
// good (slower)
$sidebar.find('ul');
// good (faster)
$($sidebar[0]).find('ul');
```

## ES6+ 基本规范

总结

- 使用 let 定义变量，const 定义常量
- 字符串拼接使用模板字符串
- 使用箭头函数取代简单的函数
- 优先使用解构赋值
- 使用扩展运算符（…） 复制数组
- 使用 Array.from 方法将类似数组的对象转为数组
- 使用 promise 代替回调函数

### 1、引用

- 对所有的引用使用 const ；不要使用 var；

  > 为什么？这能确保你无法对引用重新赋值，也不会导致出现 bug 或难以理解。
  >
```javascript
// bad
var a = 1;
var b = 2;
// good
const a = 1;
const b = 2;
```

- 如果你一定需要可变动的引用，使用 let 代替 var；

  > 为什么？因为 let 是块级作用域，而 var 是函数作用域。
  >
```javascript
// bad
var count = 1;
if (true) {
  count += 1;
}
// good, use the let.
let count = 1;
if (true) {
  count += 1;
}
```

- 注意 let 和 const 都是块级作用域；

```javascript
// const 和 let 只存在于它们被定义的区块内。
{
  let a = 1;
  const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

### 2、对象

- 使用字面值创建对象；

```javascript
// bad
const item = new Object();
// good
const item = {};
```

- 使用对象方法的简写；

```javascript
// bad
const atom = {
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};
// good
const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```

- 使用对象属性值的简写；

```javascript
const lukeSkywalker = 'Luke Skywalker';
// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};
// good
const obj = {
  lukeSkywalker,
};
```

### 3、数组

- 使用字面值创建数组；

```javascript
// bad
const items = new Array();
// good
const items = [];
```

- 向数组添加元素时使用 Arrary#push 替代直接赋值；

```javascript
const someStack = [];
// bad
someStack[someStack.length] = 'abracadabra';
// good
someStack.push('abracadabra');
```

- 使用拓展运算符 ... 复制数组；

```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
```

- 使用 Array#from 把一个类数组对象转换成数组；

```javascript
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

### 4、解构

- 使用解构存取和使用多属性对象；

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;
  return `${firstName} ${lastName}`;
}
// good
function getFullName(obj) {
  const { firstName, lastName } = obj;
  return `${firstName} ${lastName}`;
}
// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

- 对数组使用解构赋值；

```javascript
const arr = [1, 2, 3, 4];
// bad
const first = arr[0];
const second = arr[1];
// good
const [first, second] = arr;
```

### 5、Strings字符处理

程序化生成字符串时，使用模板字符串代替字符串连接。

```javascript
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}
// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}
// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

### 6、箭头函数

当你必须使用函数表达式（或传递一个匿名函数）时，使用箭头函数符号。

> 为什么？因为箭头函数创造了新的一个 this 执行环境，通常情况下都能满足你的需求，而且这样的写法更为简洁。
> 什么时候不使用？如果你有一个相当复杂的函数，你或许可以把逻辑部分转移到一个函数声明上。

```javascript
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

如果一个函数适合用一行写出并且只有一个参数，那就把花括号、圆括号和 return 都省略掉。如果不是，那就不要省略。

> 语法糖。在链式调用中可读性很高。
> 什么时候不使用？当你打算回传一个对象的时候。

```javascript
// good
[1, 2, 3].map(x => x * x);
// good
[1, 2, 3].reduce((total, n) => {
  return total + n;
}, 0);
```

### 7、构造器

- 使用 class。避免直接操作 prototype；

```javascript
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}
// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}
```

- 用 extends 继承。extends 是一个内建的原型继承方法并且不会破坏 instanceof；

```javascript
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}
// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}
```

- 方法可以返回 this 来帮助链式调用；

```javascript
// bad
Jedi.prototype.jump = function() {
  this.jumping = true;
  return true;
};
Jedi.prototype.setHeight = function(height) {
  this.height = height;
};
const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined
// good
class Jedi {
  jump() {
    this.jumping = true;
    return this;
  }
  setHeight(height) {
    this.height = height;
    return this;
  }
}
const luke = new Jedi();
luke.jump()
  .setHeight(20);
```

### 8、函数参数

- 不要使用 arguments。可以选择 rest 语法 ... 替代；

```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
// good
function concatenateAll(...args) {
  return args.join('');
}
```

- 直接给函数的参数指定默认值，不要使用一个变化的函数参数；

```javascript
// really bad
function handleThings(opts) {
  // 不！我们不应该改变函数参数。
  // 更加糟糕: 如果参数 opts 是 false 的话，它就会被设定为一个对象。
  // 但这样的写法会造成一些 Bugs。
  //（译注：例如当 opts 被赋值为空字符串，opts 仍然会被下一行代码设定为一个空对象。）
  opts = opts || {};
  // ...
}
// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}
// good
function handleThings(opts = {}) {
  // ...
}
```

### 9、迭代器

不要使用 iterators。使用高阶函数例如 map() 和 reduce() 替代 for-of；

```javascript
const numbers = [1, 2, 3, 4, 5];
// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}
sum === 15;
// good
let sum = 0;
numbers.forEach((num) => sum += num);
sum === 15;
// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```

### 10、模块

- 使用模组 (import/export) 而不是其他非标准模块系统。你可以编译为你喜欢的模块系统；

> 为什么？模块就是未来，让我们开始迈向未来吧。

```javascript
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;
// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;
// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

- 不要使用通配符 import；

> 为什么？这样能确保你只有一个默认 export。

```javascript
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';
// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

- 不要从 import 中直接 export。

> 为什么？虽然一行代码简洁明了，但让 import 和 export 各司其职让事情能保持一致。

```javascript
// bad
// filename es6.js
export { es6 as default } from './airbnbStyleGuide';
// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```
