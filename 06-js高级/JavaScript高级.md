---
学习目标:
  - 理解面向对象开发思想
  - 掌握 JavaScript 面向对象开发相关模式
  - 掌握 JavaScript 中正则表达式的使用（重点）
---

# JavaScript 高级

<img src="./media/Unofficial_JavaScript_logo_2.svg.png" width="400" alt="">

## 课程介绍

### 目标

- 理解面向对象开发思想
- 掌握 JavaScript 面向对象开发相关模式
- 掌握在 JavaScript 中使用正则表达式

---

## 基本概念复习

> 由于 JavaScript 高级是针对 JavaScript 语言本身的一个**进阶学习**，所以在开始之前我们先对以前所学过的 JavaScript 相关知识点做一个**快速复习总结**。

### JavaScript是什么

- 解析执行：解释型的脚本语言
  - **通俗解释：运行js代码无需编译，直接通过解析器执行即可**
    - 注：编译语言类似于less，源代码需要处理后才能使用。
- 语言特点：
  - 弱类型语言
    - **通俗解释：变量声明时不需要指定可存储数据的类型。**
  - 动态语言
    - **通俗解释：指的是代码运行时才会检测变量类型，变量类型由当前保存的数据决定**
  - 头等函数 (First-class Function)
    - **通俗解释：函数不仅可以声明和调用，还可以像其他类型一样赋值在变量中，传递为参数，设置为返回值。换句话说，其他类型数据能做的操作，函数都能做**
      - 注：传统语言中，函数如果希望进行声明与调用之外的操作，则需要进行单独处理。
- 执行环境：
  - **浏览器**是最常见的 JavaScript 环境
  - 非浏览器环境中也使用 JavaScript ，例如 **node.js（后续阶段中学习）**
- 编程范式（编程风格）：
  - JavaScript是基于原型的、多范式的动态脚本语言，并且支持面向对象、命令式和声明式（如：函数式编程）编程风格
    - **通俗解释：JavaScript灵活性强，可以使用多种编程风格进行编程。**

### JavaScript 的组成

| 组成部分   | 说明                               |
| ---------- | ---------------------------------- |
| ECMAScript | 描述了该语言的语法和基本对象       |
| DOM        | 描述了处理网页内容的方法和接口     |
| BOM        | 描述了与浏览器进行交互的方法和接口 |

### JavaScript 与浏览器的关系

<img src="media/browser-js.png" alt="">

- 浏览器的两个重要组成部分：
  - 内核（渲染引擎）：用来执行html和css代码，同时提供WebAPI（DOM/BOM）功能
    - 内核功能由W3C规范约束。
  - JS解析器（JavaScript引擎）：用来执行ECMAScript代码。
    - 解析器功能由ECMA规范约束。

#### JavaScript 可以做什么

> Any application that can be written in JavaScript, will eventually be written in JavaScript.  
> 凡是能用 JavaScript 写出来的，最终都会用 JavaScript 写出来

- [知乎 - JavaScript 能做什么，该做什么？](https://www.zhihu.com/question/20796866)
- [最流行的编程语言 JavaScript 能做什么？](https://github.com/phodal/articles/issues/1)

#### JavaScript 发展历史（了解）

> [JavaScript 标准参考教程 - JavaScript 语言的历史](http://javascript.ruanyifeng.com/introduction/history.html)

- JavaScript 的诞生
  - 略
- JavaScript 与 ECMAScript 的关系
  - 略
- JavaScript 与 Java 的关系
  - 无本质关系
- JavaScript 的版本
  - ES3
  - ES5
  - ES6

### JavaScript 执行过程

JavaScript 运行分为两个阶段：

- 预解析
  + 全局预解析（所有全局变量和函数声明都会提前）
  + 函数内部预解析（所有的局部变量、函数和形参都会参与预解析）
    * 函数
    * 形参
    * 普通变量
- 代码执行

> 简单梳理：先预解析全局作用域，然后执行全局作用域中的代码，
> 在执行全局代码的过程中遇到函数调用就会先进行函数预解析，然后再执行函数内代码。

### 数据类型

- JavaScript数据类型分两大类
  - 基本数据类型（简单类型、原始类型）5个
    - **String 字符串类型**
    - **Number 数值类型**
    - **Boolean 布尔类型**
    - **undefined 未定义类型**
      - 通常为默认值，无需自己进行设置，用来表示存储区域还未被使用
      - 变量声明了没有赋值.如var ull;console.log(ull)此时输出的就是undefined
    - **null 空类型**
      - 均为主动设置，当我们希望清空一个存储区域时，手动设置为null即可
      - 如 var ull=null
  - 复杂数据类型
    - Object 对象类型
      - Object 对象类型
      - Array 数组类型
      - Date 日期类型
      - Function 函数类型
        - 函数与其他类型的作用有所不同，函数是用来存储代码的一种数据类型，用于代码复用
      - Math 数学对象
      - ... 其他（JSON、RegExp）
  - 基本类型和复杂类型的区别：
    - 存储数据个数不同
    - 内存中的存储方式不同
      - 基本类型在内存单元中存储的是**具体值**
      - 复杂类型在内存单元中存储的是**地址**
    - 复制方式不同
      - 基本类型可以直接通过赋值=方式进行复制
      - 如 var yll="优秀"
      - 复杂类型需要遍历拷贝（通过内置对象方法操作）
      - 

## JavaScript 面向对象概念

<img src="./media/mxdxkf.png" width="400" alt="">

### 什么是对象

对象的概念可以从两个角度去看：

1. 广义的对象：（大量对象）

> 通过学习我们会发现，JS是由代表各种功能的对象组成的。
>
> 有些类型本质就是对象，例如Date、Array。还有一些本质不是对象，但是具有对应的包装对象类型，例如String、Number、Boolean。通过这些构造器创建的就是对象，只不过不同对象具有不同功能。
>
> 老话讲，JavaScript中，Everything is object （万物皆对象）指的就是这一现象。

<img src="./media/20160823024542444.jpg" alt="">

2. 狭义的对象（单个对象）

> 狭义的对象指的是通过对象字面量 { } 或new Object() 创建的具体的对象类型。
>
> 规范ECMAScript-262 把对象定义为：**无序属性的集合，其属性可以包含基本值、对象或者函数**。
>
> 从这方便来看，对象是用来存储大量复杂数据的**容器**。

- 小结：
  - 综上所述，对象的形式有两大类，使用方式也不同。区分方式就是看对象的功能**是否需要复用**。
  - 构造函数（需要复用）：
    - 适用于对象功能需要重复使用的场景。
  - 对象字面量（无需复用）：
    - 适用于数据存储的场景。

### 面向对象与面向过程

- 什么是面向过程：

> 我们以前书写的传统代码的方式大概可以归纳为以下步骤：
>
> - 需求分析
> - 步骤划分
> - 知识点准备
> - 按步骤实现功能
>
> 实现功能时，我们要考虑功能的每一步，这种编程风格**专注于**功能实现的**过程**，所以称为过程式或**面向过程**的编程风格。
>

- 什么是面向对象：


>
> 而**面向对象**是不同于面向过程的**另一种编程风格**，并不是新的东西，只是对过程式代码的一种**高度封装**，目的在于提高代码的开发效率和可维护性。通俗来讲，就是**将面向过程的功能代码封装为一个（或多个）对象**，再通过对象的功能调用实现整体功能的一种方式

<img src="./media/664ba37eeee9f4623c06c066867f1d38_r.jpg" width="400" alt="">

面向对象编程 —— Object Oriented Programming，简称 OOP ，是一种编程开发思想。
它将某个实际需求，按功能进行划分后抽象为一个个对象，然后由对象之间的分工与合作，进行需求实现。

在面向对象程序开发思想中，每一个对象都是单独功能，多个对象明确分工，实现各自的功能。

因此，面向对象编程更适合多人合作的大型软件项目。

- 面向对象与面向过程概念小结：
  - 面向过程就是亲力亲为，事无巨细，面面俱到，步步紧跟，有条不紊
  - 面向对象就是找一个对象，指挥得结果
  - 面向对象将执行者转变成指挥者
  - 面向对象不是面向过程的替代，而是对面向过程的封装
    - 注：面向过程和面向对象无法对比，不能说面向对象比面向过程优秀，需要具体情况具体分析。

### 面向对象的特性

> 我们要学习面向对象操作，需要先了解面向对象操作的3个特性。

- 封装性

- ########将功能进行封装##

- 继承性

- ###### 功能的复用###

- 多态性

- ###### 灵活多用

## 面向对象操作

### class

> 如果要创建多个功能相似的对象，传统方式是使用构造函数进行对象功能封装，但书写方式较为繁琐。
>
> ES6提供了一种新方式，使用class关键字进行类的相关功能设置，用于简化对象的创建操作。

#### class的基本使用

```js
class 类名 {
  // 每个类都需要设置constructor构造方法，用来设置对象的属性
  constructor(需要的参数) {
    this.属性名1 = 属性值1;
    this.属性名2 = 属性值2;
    ...
  }(constructor与方法之间没有逗号)
    方法名1() {
      
    }
    方法名2() {
      
    }
}
  
// 创建类的实例（实例对象）
var 实例名 = new 类名(需要的参数);
// 创建的实例具有类中设置的所有属性和方法
```

#### class的继承

> 继承，是一个常见概念。生活中小A可以继承小A父亲小B的财产，这样可以快速致富....编程中的继承十分类似，指的是A类希望拥有B类中的功能，就可以通过extends进行快速操作。

```js
// 准备Peoson类中的功能
class Peoson {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log('hello, 我的名字是' + this.name)；
  }
}

// 准备Student类，继承Peoson类中的功能
class Student extends Peoson{
  constructor(name, age, school, score) {
    // 首先设置super(), 用于将父类Peoson的功能设置给Student并传参，注意此句必须设置！
    super(name, age); // 进行对应参数传递，顺序参考Peoson类constructor的传参顺序。
    // 调用super()后，才能给Student设置新属性
    this.school = school;
    this.score = score;
  }
  // 根据需求，可以设置一些方法
  study() {
    console.log('悬梁刺股，凿壁偷光');
  }
}

// 创建Student实例，可以使用Student和继承自Peoson的功能
var s1 = new Student('jack', 18, '黑马', 98);
```

#### 多态

> 多态字面意思为多种状态，指的是同一个功能被不同对象使用时可以产生不同效果。例如，数组和对象都具有toString()，但执行效果却完全不同，就是一种多态的形式。

设置方式：

```js
// 准备Peoson类中的功能
class Peoson {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log('hello, 我的名字是' + this.name)；
  }
}

// 准备Student类，继承Peoson类中的功能
class Student extends Peoson{
  constructor(name, age, school, score) {
    super(name, age);
    this.school = school;
    this.score = score;
  }
  // 方式1：设置同名方法后，会覆盖父类中的方法
  sayHi() {
    console.log('hi，我在悬梁刺股，凿壁偷光');
  }
  // 方式2：设置同名方法后，希望同时使用父类功能和新添加的功能
  sayHi() {
    // 调用super.父类方法名()用于设置父类功能
    super.sayHi()； 
    
    // 设置子类新功能即可（上下两步无特定顺序，按需设置即可）
    console.log('hi，我在悬梁刺股，凿壁偷光')；
  }
  // 注：测试代码时，上面两种选择其一尝试，无需全部书写。
}

// 创建Student实例，可以使用Student和继承自Peoson的功能
var s1 = new Student('jack', 18, '黑马', 98);
```




### 构造函数

> class是ES6推出的一种用于简化构造函数的语法形式，是语法层面的封装，本质上还是构造函数的功能。如果想更好的理解js的面向对象操作本质，我们还需要了解对构造函数的使用方式。

#### 创建方式

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
  this.sayName = function () {
    console.log(this.name)
  }
}

var p1 = new Person('Jack', 18)
p1.sayName() // => 'Jack'

var p2 = new Person('Mike', 23)
p2.sayName() // => 'Mike'
```

#### 问题与优化

使用构造函数带来的最大的好处就是创建对象更方便了，但是其本身也存在一个浪费内存的问题：

```javascript
function Person (name, age) {
  this.name = name;
  this.age = age;
  this.school = '黑马';
  this.sayHello = function () {
    console.log('hello ' + this.name);
  };
}

var p1 = new Person('Jack', 18);
var p2 = new Person('Rose', 16);
```

在该示例中，从表面上好像没什么问题，但是实际上这样做，有一个很大的弊端。
那就是对于每一个实例对象，`school` 和 `sayHello` 都是一模一样的内容，特别是sayHello，是一个函数，函数用来保存重复使用的代码，如果每次生成一个实例，都创建一个内容相同的函数，会多占用一些不必要的内存空间，如果实例对象很多，会造成极大的内存浪费。

```javascript
// 通过比较发现，多个实例的sayHello并不是同一个函数，说明相同的代码在内存中保存了多份。
console.log(p1.sayHello === p2.sayHello) // => false
```

对于这种问题我们可以把需要共享的函数定义到构造函数外部：

```javascript
function sayHello = function () {
  console.log('hello ' + this.name)
}

function Person (name, age) {
  this.name = name;
  this.age = age;
  this.school = '黑马'；
  this.sayHello = sayHello;
}

var p1 = new Person('Rose', 18);
var p2 = new Person('Jack', 16);

console.log(p1.sayHello === p2.sayHello); // => true
```

这样确实可以了，但是如果有多个需要共享的函数的话就会造成全局命名空间冲突的问题。

你肯定想到了可以把多个函数放到一个对象中用来避免全局命名空间冲突的问题：

```javascript
var fns = {
  sayHello: function () {
    console.log('hello ' + this.name);
  },
  sayAge: function () {
    console.log(this.age);
  }
};

function Person (name, age) {
  this.name = name;
  this.age = age;
  this.school = '黑马';
  this.sayHello = fns.sayHello;
  this.sayAge = fns.sayAge;
}

var p1 = new Person('Jack', 18);
var p2 = new Person('Rose', 16);

console.log(p1.sayHello === p2.sayHello); // => true
console.log(p1.sayAge === p2.sayAge); // => true
```

至此，我们利用自己的方式基本上解决了构造函数的内存浪费问题。
但是代码书写其他有些繁琐，而且fns与构造函数Person关联性不强，那有没有更好的方式呢？



### 原型

内容引导：

- 使用 **prototype 原型对象**解决构造函数的问题
- 分析 **构造函数、原型对象prototype 、实例对象** 三者之间的关系
- 属性成员查找原则：原型链
- 内置作对象的原型操作
- 构造的函数和原型对象使用建议

#### 更好的解决方案： `prototype`

Javascript 规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象。
这个对象的所有属性和方法，都会被构造函数的实例继承。

这也就意味着，我们可以把所有对象实例需要共享的属性和方法直接定义在 `prototype` 对象上。

```javascript
function Person (name, age) {
  this.name = name;
  this.age = age;
}

console.log(Person.prototype);

Person.prototype.school = '黑马';

Person.prototype.sayName = function () {
  console.log(this.name);
};

var p1 = new Person(..);
var p2 = new Person(..);

console.log(p1.sayName === p2.sayName); // => true
```

这时所有实例的 `school属性 `和`sayName()` 方法，
其实都是同一个内存地址，指向 `prototype` 对象，因此就提高了代码效率。

#### 构造函数、实例、原型三者之间的关系

<img src="./media/构造函数-实例-原型之间的关系.png" alt="">

任何函数都具有一个 `prototype` 属性，该属性是一个对象。

```javascript
function F () {}
console.log(F.prototype) // => object

F.prototype.sayHi = function () {
  console.log('hi!')
}
```

构造函数的 `prototype` 对象默认都有一个 `constructor` 属性，指向 `prototype` 对象所在函数。

```javascript
console.log(F.constructor === F) // => true
```

通过构造函数得到的实例对象内部会包含一个指向构造函数的 `prototype` 对象的指针 `__proto__`。

```javascript
var instance = new F()
console.log(instance.__proto__ === F.prototype) // => true
```

<p class="tip">
  `__proto__` 是非标准属性。
</p>

实例对象可以直接访问原型对象成员。

```javascript
实例对象.sayHi() // => hi!
```

总结：

- 任何函数都具有一个 `prototype` 属性，该属性是一个对象，称为原型对象，简称原型。
-  `prototype` 默认都有一个 `constructor` 属性，指向 `prototype` 对象所属的构造函数
- 通过构造函数得到的实例对象内部会包含一个指向构造函数的 `prototype` 对象的属性 `__proto__`


#### 更简单的原型语法

我们注意到，前面例子中每添加一个属性和方法就要敲一遍 `Person.prototype` 。
为减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype = {
  school: '黑马',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  }
}
```

在该示例中，我们将 `Person.prototype` 重置到了一个新的对象。
这样做的好处就是为 `Person.prototype` 添加成员简单了，但是也会带来一个问题，那就是原型对象丢失了 `constructor` 成员。

所以，我们为了保持 `constructor` 的指向正确，建议的写法是：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype = {
  constructor: Person, // => 手动将 constructor 指向正确的构造函数
  school: '黑马',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  }
}
```

#### 原生对象的原型

<p class="tip">
  所有函数都有 prototype 属性对象。
</p>

- Object.prototype
- Function.prototype
- Array.prototype
- String.prototype
- Number.prototype
- Date.prototype
- ...

练习：为数组对象和字符串对象扩展原型方法。



#### 原型对象使用建议

- 私有成员（一般就是非函数成员）放到构造函数中
- 共享成员（一般就是函数）放到原型对象中
- 如果重置了 `prototype` 记得修正 `constructor` 的指向

#### 构造函数的属性继承：借用构造函数

###### 使用构造函数的继承需要分两步进行操作:属性和方法分开来进行

```javascript
function Person (name, age) {
  this.type = 'human'
  this.name = name
  this.age = age
}

function Student (name, age) {
  // 借用构造函数继承属性成员
  Person.call(this, name, age)
}

var s1 = Student('张三', 18)
console.log(s1.type, s1.name, s1.age) // => human 张三 18
```

#### 构造函数的原型方法继承：拷贝继承（for-in）

```javascript
function Person (name, age) {
  this.type = 'human'
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.log('hello ' + this.name)
}
//继承父类函数的属性
function Student (name, age) {
  Person.call(this, name, age)
}

// 原型对象拷贝继承原型对象成员
for(var key in Person.prototype) {
  Student.prototype[key] = Person.prototype[key]
}

var s1 = Student('张三', 18)

s1.sayName() // => hello 张三
```

#### 另一种继承方式：原型继承

```javascript
function Person (name, age) {
  this.school = '黑马'
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.log('hello ' + this.name)
}

function Student (name, age) {
  Person.call(this, name, age)
}

// 利用原型的特性实现继承(继承父类原型中的方法)
Student.prototype = new Person()
// 覆盖后记得重设constructor
Student.constructor = Student;

var s1 = new Student('张三', 18)

console.log(s1.school) // => '黑马'

s1.sayName() // => hello 张三
```

#### 原型链

- 之前讨论过原型、构造函数、实例对象三者的关系，实例对象除了可以访问自身属性，还可以访问原型的属性。当实现继承后，实例对象可访问的原型就不是一个，而是多个，这多个原型组成的结构成为原型链。

- 原型链是用来描述对象属性访问范围的一种方式，由多个原型组成
- 原型链重点为Object.prototype
- 上述内容通过图示进行演示，言语较为苍白。。



## 函数进阶

### 函数的定义方式

- 函数声明
- 函数表达式
- `new Function`

#### 函数声明

```javascript
function foo () {

}
```

#### 函数表达式

```javascript
var foo = function () {

}
```

#### 函数声明与函数表达式的区别

- 函数声明必须有名字
- 函数声明会函数提升，在预解析阶段就已创建，声明前后都可以调用
- 函数表达式相当于变量赋值
- 函数表达式可以没有名字，例如匿名函数
- 函数表达式没有变量提升，在执行阶段创建，必须在表达式执行之后才可以调用
- 不要在if中使用函数声明语句声明函数，不同浏览器执行结果不同

下面是一个根据条件定义函数的例子：

```javascript
if (true) {
  function f () {
    console.log(1)
  }
} else {
  function f () {
    console.log(2)
  }
}
```

以上代码执行结果在不同浏览器中结果不一致。

不过我们可以使用函数表达式解决上面的问题：

```javascript
var f

if (true) {
  f = function () {
    console.log(1)
  }
} else {
  f = function () {
    console.log(2)
  }
}
```

### 函数的调用方式

- 普通函数
- 构造函数
- 对象方法

### 函数内 `this` 指向的不同场景

##### 伪数组:arguments具有索引和长度但是不能使用方法

函数的调用方式决定了 `this` 指向的不同：

| 调用方式     | this指向       |
| ------------ | -------------- |
| 非函数中使用 | window         |
| 普通函数调用 | window         |
| 构造函数调用 | 实例对象       |
| 对象方法调用 | 该方法所属对象 |

这就是对函数内部 this 指向的基本整理，写代码写多了自然而然就熟悉了。

### 函数也是对象

- 所有函数都是 `Function` 的实例

### call、apply、bind

那了解了函数 this 指向的不同场景之后，我们知道有些情况下我们为了使用某种特定环境的 this 引用，
这时候时候我们就需要采用一些特殊手段来处理了，例如我们经常在定时器外部备份 this 引用，然后在定时器函数内部使用外部 this 的引用。
然而实际上对于这种做法我们的 JavaScript 为我们专门提供了一些函数方法用来帮我们更优雅的处理函数内部 this 指向问题。
这就是接下来我们要学习的 call、apply、bind 三个函数方法。

#### call

`call()` 方法调用一个函数, 其具有一个指定的 `this` 值和分别地提供的参数(参数的列表)。

<p class="danger">
  注意：该方法的作用和 `apply()` 方法类似，只有一个区别，就是 `call()` 方法接受的是若干个参数的列表，而 `apply()` 方法接受的是一个包含多个参数的数组。
</p>

语法：

```javascript
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

参数：

- `thisArg`
  + 在 fun 函数运行时指定的 this 值
  + 如果指定了 null 或者 undefined 则内部 this 指向 window

- `arg1, arg2, ...`
  + 指定的参数列表

#### apply

`apply()` 方法调用一个函数, 其具有一个指定的 `this` 值，以及作为一个数组（或类似数组的对象）提供的参数。

<p class="danger">
  注意：该方法的作用和 `call()` 方法类似，只有一个区别，就是 `call()` 方法接受的是若干个参数的列表，而 `apply()` 方法接受的是一个包含多个参数的数组。
</p>

语法：

```javascript
fun.apply(thisArg, [argsArray])
```

参数：

- `thisArg`
- `argsArray`

`apply()` 与 `call()` 非常相似，不同之处在于提供参数的方式。
`apply()` 使用参数数组而不是一组参数列表。例如：

```javascript
fun.apply(this, ['eat', 'bananas'])
```

#### bind

bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。
当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。
一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

语法：

```javascript
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

参数：

- thisArg
  + 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。

- arg1, arg2, ...
  + 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

返回值：

返回由指定的this值和初始化参数改造的原函数拷贝。

示例1：

```javascript
this.x = 9; 
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

示例2：

```javascript
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```

#### 小结

- call 和 apply 特性一样
  + 都是用来调用函数，而且是立即调用
  + 但是可以在调用函数的同时，通过第一个参数指定函数内部 `this` 的指向
  + call 调用的时候，参数必须以参数列表的形式进行传递，也就是以逗号分隔的方式依次传递即可
  + apply 调用的时候，参数必须是一个数组，然后在执行的时候，会将数组内部的元素一个一个拿出来，与形参一一对应进行传递
  + 如果第一个参数指定了 `null` 或者 `undefined` 则内部 this 指向 window

- bind
  + 可以用来指定内部 this 的指向，然后生成一个改变了 this 指向的新的函数
  + 它和 call、apply 最大的区别是：bind 不会调用
  + bind 支持传递参数，它的传参方式比较特殊，一共有两个位置可以传递
    * 1. 在 bind 的同时，以参数列表的形式进行传递
    * 2. 在调用的时候，以参数列表的形式进行传递
    * 那到底以谁 bind 的时候传递的参数为准呢还是以调用的时候传递的参数为准
    * 两者合并：bind 的时候传递的参数和调用的时候传递的参数会合并到一起，传递到函数内部

### 函数的其它成员（了解）

- arguments
  + 实参集合
- caller
  + 函数的调用者
- length
  + 形参的个数
- name
  + 函数的名称

```javascript
function fn(x, y, z) {
  console.log(fn.length) // => 形参的个数
  console.log(arguments) // 伪数组实参参数集合
  console.log(arguments.callee === fn) // 函数本身
  console.log(fn.caller) // 函数的调用者
  console.log(fn.name) // => 函数的名字
}

function f() {
  fn(10, 20, 30)
}

f()
```

### 高阶函数

- 函数作为参数
- 函数作为返回值

#### 作为参数

```javascript
function eat (callback) {
  setTimeout(function () {
    console.log('吃完了')
    callback()
  }, 1000)
}

eat(function () {
  console.log('去唱歌')
})
```

#### 作为返回值

```javascript
function genFun (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === type
  }
}

var isArray = genFun('[object Array]')
var isObject = genFun('[object Object]')

console.log(isArray([])) // => true
console.log(isArray({})) // => true
```

### 函数闭包

#### 什么是闭包

函数内部声明的变量称为局部变量，也可以称为私有变量

闭包就是能够读取其他函数内部私有变量的函数，

由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，

所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

闭包的用途：

- 可以在函数外部读取函数内部的私有变量
  - 确保数据安全性
- 让函数内成员始终存活在内存中不被销毁

#### 一些关于闭包的例子

示例1：

```javascript
var arr = [10, 20, 30]
for(var i = 0; i < arr.length; i++) {
  arr[i] = function () {
    console.log(i)
  }
}
```

示例2：

```javascript
console.log(111)

for(var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  }, 0)
}
console.log(222)
```



#### 闭包的思考题

思考题 1：

```javascript
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  }
};

console.log(object.getNameFunc()())
```

思考题 2：

```javascript
var name = "The Window";　　
var object = {　　　　
  name: "My Object",
  getNameFunc: function () {
    var that = this;
    return function () {
      return that.name;
    };
  }
};
console.log(object.getNameFunc()())
```



### 函数递归

#### 递归执行模型

```javascript
function fn1 () {
  console.log(111)
  fn2()
  console.log('fn1')
}

function fn2 () {
  console.log(222)
  fn3()
  console.log('fn2')
}

function fn3 () {
  console.log(333)
  fn4()
  console.log('fn3')
}

function fn4 () {
  console.log(444)
  console.log('fn4')
}

fn1()
```

#### 举个栗子：计算阶乘的递归函数

```javascript
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
```

#### 递归应用场景

- 深拷贝等

---

## 正则表达式

- 了解正则表达式基本语法
- 能够使用JavaScript的正则对象

### 正则表达式简介

#### 什么是正则表达式

正则表达式：用于匹配规律规则的表达式，正则表达式最初是科学家对人类神经系统的工作原理的早期研究，现在在编程语言中有广泛的应用。正则表通常被用来检索、替换那些符合某个模式(规则)的文本。
正则表达式是对字符串操作的一种逻辑公式，就是用事先定义好的一些特定字符、及这些特定字符的组合，组成一个“规则字符串”，这个“规则字符串”用来表达对字符串的一种过滤逻辑。

#### 正则表达式的作用

1. 给定的字符串是否符合正则表达式的过滤逻辑(匹配)
2. 可以通过正则表达式，从字符串中获取我们想要的特定部分(提取)
3. 强大的字符串替换能力(替换)

#### 正则表达式的特点

1. 灵活性、逻辑性和功能性非常的强
2. 可以迅速地用极简单的方式达到字符串的复杂控制
3. 对于刚接触的人来说，比较晦涩难懂

### 正则表达式的测试

- [在线测试正则](https://c.runoob.com/front-end/854)
- 工具中使用正则表达式
  + sublime/vscode/word
  + 演示替换所有的数字

### 正则表达式的组成

- 普通字符
- 特殊字符(元字符)：正则表达式中有特殊意义的字符

示例演示：

- `\d` 匹配数字
- `ab\d` 匹配 ab1、ab2

### 元字符串

通过测试工具演示下面元字符的使用

#### 常用元字符串

| 元字符  | 说明              |
| ---- | --------------- |
| \d   | 匹配数字            |
| \D   | 匹配任意非数字的字符      |
| \w   | 匹配字母或数字或下划线     |
| \W   | 匹配任意不是字母，数字，下划线 |
| \s   | 匹配任意的空白符        |
| \S   | 匹配任意不是空白符的字符    |
| .    | 匹配除换行符以外的任意单个字符 |
| ^    | 表示匹配行首的文本(以谁开始) |
| $    | 表示匹配行尾的文本(以谁结束) |

#### 限定符

| 限定符   | 说明       |
| ----- | -------- |
| *     | 重复零次或更多次 |
| +     | 重复一次或更多次 |
| ?     | 重复零次或一次  |
| {n}   | 重复n次     |
| {n,}  | 重复n次或更多次 |
| {n,m} | 重复n到m次   |

#### 其它

```
[] 字符串用中括号括起来，表示匹配其中的任一字符，相当于或的意思
[^]  匹配除中括号以内的内容
\ 转义符
| 或者，选择两者中的一个。注意|将左右两边分为两部分，而不管左右两边有多长多乱
() 从两个直接量中选择一个，分组
   eg：gr(a|e)y匹配gray和grey
[\u4e00-\u9fa5]  匹配汉字
```

### 案例

验证手机号：

```javascript
^\d{11}$
```

验证邮编：

```javascript
^\d{6}$
```

验证日期 2012-5-01

```javascript
^\d{4}-\d{1,2}-\d{1,2}$
```

验证邮箱 xxx@itcast.cn：

```javascript
^\w+@\w+\.\w+$
```

验证IP地址 192.168.1.10

```javascript
^\d{1,3}\(.\d{1,3}){3}$
```

## JavaScript 中使用正则表达式

### 创建正则对象

方式1：

```javascript
var reg = new Regex('\d', 'i');
var reg = new Regex('\d', 'gi');
```

方式2：

```javascript
var reg = /\d/i;
var reg = /\d/gi;
```

#### 参数

| 标志   | 说明         |
| ---- | ---------- |
| i    | 忽略大小写      |
| g    | 全局匹配       |
| gi   | 全局匹配+忽略大小写 |

### 正则匹配

```javascript
// 匹配日期
var dateStr = '2015-10-10';
var reg = /^\d{4}-\d{1,2}-\d{1,2}$/
console.log(reg.test(dateStr));
```

### 正则提取

```javascript
// 1. 提取工资
var str = "张三：1000，李四：5000，王五：8000。";
var array = str.match(/\d+/g);
console.log(array);

// 2. 提取email地址
var str = "123123@xx.com,fangfang@valuedopinions.cn 286669312@qq.com 2、emailenglish@emailenglish.englishtown.com 286669312@qq.com...";
var array = str.match(/\w+@\w+\.\w+(\.\w+)?/g);
console.log(array);

// 3. 分组提取  
// 3. 提取日期中的年部分  2015-5-10
var dateStr = '2016-1-5';
// 正则表达式中的()作为分组来使用，获取分组匹配到的结果用Regex.$1 $2 $3....来获取
var reg = /(\d{4})-\d{1,2}-\d{1,2}/;
if (reg.test(dateStr)) {
  console.log(RegExp.$1);
}

// 4. 提取邮件中的每一部分
var reg = /(\w+)@(\w+)\.(\w+)(\.\w+)?/;
var str = "123123@xx.com";
if (reg.test(str)) {
  console.log(RegExp.$1);
  console.log(RegExp.$2);
  console.log(RegExp.$3);
}
```

### 正则替换

```javascript
// 1. 替换所有空白
var str = "   123AD  asadf   asadfasf  adf ";
str = str.replace(/\s/g,"xx");
console.log(str);

// 2. 替换所有,|，
var str = "abc,efg,123，abc,123，a";
str = str.replace(/,|，/g, ".");
console.log(str);
```

### 案例：表单验证

```html
QQ号：<input type="text" id="txtQQ"><span></span><br>
邮箱：<input type="text" id="txtEMail"><span></span><br>
手机：<input type="text" id="txtPhone"><span></span><br>
生日：<input type="text" id="txtBirthday"><span></span><br>
姓名：<input type="text" id="txtName"><span></span><br>
```

```javascript
//获取文本框
var txtQQ = document.getElementById("txtQQ");
var txtEMail = document.getElementById("txtEMail");
var txtPhone = document.getElementById("txtPhone");
var txtBirthday = document.getElementById("txtBirthday");
var txtName = document.getElementById("txtName");

//
txtQQ.onblur = function () {
  //获取当前文本框对应的span
  var span = this.nextElementSibling;
  var reg = /^\d{5,12}$/;
  //判断验证是否成功
  if(!reg.test(this.value) ){
    //验证不成功
    span.innerText = "请输入正确的QQ号";
    span.style.color = "red";
  }else{
    //验证成功
    span.innerText = "";
    span.style.color = "";
  }
};

//txtEMail
txtEMail.onblur = function () {
  //获取当前文本框对应的span
  var span = this.nextElementSibling;
  var reg = /^\w+@\w+\.\w+(\.\w+)?$/;
  //判断验证是否成功
  if(!reg.test(this.value) ){
    //验证不成功
    span.innerText = "请输入正确的EMail地址";
    span.style.color = "red";
  }else{
    //验证成功
    span.innerText = "";
    span.style.color = "";
  }
};
```

表单验证部分，封装成函数：

```javascript
var regBirthday = /^\d{4}-\d{1,2}-\d{1,2}$/;
addCheck(txtBirthday, regBirthday, "请输入正确的出生日期");
//给文本框添加验证
function addCheck(element, reg, tip) {
  element.onblur = function () {
    //获取当前文本框对应的span
    var span = this.nextElementSibling;
    //判断验证是否成功
    if(!reg.test(this.value) ){
      //验证不成功
      span.innerText = tip;
      span.style.color = "red";
    }else{
      //验证成功
      span.innerText = "";
      span.style.color = "";
    }
  };
}
```

通过给元素增加自定义验证属性对表单进行验证：

```html
<form id="frm">
  QQ号：<input type="text" name="txtQQ" data-rule="qq"><span></span><br>
  邮箱：<input type="text" name="txtEMail" data-rule="email"><span></span><br>
  手机：<input type="text" name="txtPhone" data-rule="phone"><span></span><br>
  生日：<input type="text" name="txtBirthday" data-rule="date"><span></span><br>
  姓名：<input type="text" name="txtName" data-rule="cn"><span></span><br>
</form>
```

```javascript
// 所有的验证规则
var rules = [
  {
    name: 'qq',
    reg: /^\d{5,12}$/,
    tip: "请输入正确的QQ"
  },
  {
    name: 'email',
    reg: /^\w+@\w+\.\w+(\.\w+)?$/,
    tip: "请输入正确的邮箱地址"
  },
  {
    name: 'phone',
    reg: /^\d{11}$/,
    tip: "请输入正确的手机号码"
  },
  {
    name: 'date',
    reg: /^\d{4}-\d{1,2}-\d{1,2}$/,
    tip: "请输入正确的出生日期"
  },
  {
    name: 'cn',
    reg: /^[\u4e00-\u9fa5]{2,4}$/,
    tip: "请输入正确的姓名"
  }];

addCheck('frm');


//给文本框添加验证
function addCheck(formId) {
  var i = 0,
      len = 0,
      frm =document.getElementById(formId);
  len = frm.children.length;
  for (; i < len; i++) {
    var element = frm.children[i];
    // 表单元素中有name属性的元素添加验证
    if (element.name) {
      element.onblur = function () {
        // 使用dataset获取data-自定义属性的值
        var ruleName = this.dataset.rule;
        var rule =getRuleByRuleName(rules, ruleName);

        var span = this.nextElementSibling;
        //判断验证是否成功
        if(!rule.reg.test(this.value) ){
          //验证不成功
          span.innerText = rule.tip;
          span.style.color = "red";
        }else{
          //验证成功
          span.innerText = "";
          span.style.color = "";
        }
      }
    }
  }
}

// 根据规则的名称获取规则对象
function getRuleByRuleName(rules, ruleName) {
  var i = 0,
      len = rules.length;
  var rule = null;
  for (; i < len; i++) {
    if (rules[i].name == ruleName) {
      rule = rules[i];
      break;
    }
  }
  return rule;
}
```

## 补充

### 伪数组和数组

在JavaScript中，除了5种原始数据类型之外，其他所有的都是对象，包括函数（Function）。

#### 对象与数组的关系

在说区别之前，需要先提到另外一个知识，就是 JavaScript 的原型继承。
所有 JavaScript 的内置构造函数都是继承自 `Object.prototype` 。
在这个前提下，可以理解为使用 `new Array()` 或 `[]` 创建出来的数组对象，都会拥有 `Object.prototype` 的属性值。

```javascript
var obj = {};// 拥有 Object.prototype 的属性值
var arr = [];
//使用数组直接量创建的数组，由于 Array.prototype 的属性继承自 Object.prototype，
//那么，它将同时拥有 Array.prototype 和 Object.prototype 的属性值
```

可以得到对象和数组的第一个区别：对象没有数组 Array.prototype 的属性值。

#### 什么是数组

数组具有一个最基本特征：索引，这是对象所没有的，下面来看一段代码：

```javascript
var obj = {};
var arr = [];
 
obj[2] = 'a';
arr[2] = 'a';
 
console.log(obj[2]); // => a
console.log(arr[2]); // => a
console.log(obj.length); // => undefined
console.log(arr.length); // => 3
```

- obj[2]输出'a'，是因为对象就是普通的键值对存取数据
- 而arr[2]输出'a' 则不同，数组是通过索引来存取数据，arr[2]之所以输出'a'，是因为数组arr索引2的位置已经存储了数据
- obj.length并不具有数组的特性，并且obj没有保存属性length，那么自然就会输出undefined
- 而对于数组来说，length是数组的一个内置属性，数组会根据索引长度来更改length的值
- 为什么arr.length输出3，而不是1
  + 在给数组添加元素时，并没有按照连续的索引添加，所以导致数组的索引不连续，那么就导致索引长度大于元素个数

#### 什么是伪数组

1. 拥有 length 属性，其它属性（索引）为非负整数(对象中的索引会被当做字符串来处理，这里你可以当做是个非负整数串来理解)
2. 不具有数组所具有的方法

伪数组，就是像数组一样有 `length` 属性，也有 `0、1、2、3` 等属性的对象，看起来就像数组一样，但不是数组，比如:

```javascript
var fakeArray = {
  "0": "first",
  "1": "second",
  "2": "third",
  length: 3
};
 
for (var i = 0; i < fakeArray.length; i++) {
  console.log(fakeArray[i]);
}
 
Array.prototype.join.call(fakeArray,'+');
```

常见的伪数组有：

- 函数内部的 `arguments`
- DOM 对象列表（比如通过 `document.getElementsByTags` 得到的列表）
- jQuery 对象（比如 `$("div")` ）

伪数组是一个 Object，而真实的数组是一个 Array。

伪数组存在的意义，是可以让普通的对象也能正常使用数组的很多方法，比如：

```javascript
var arr = Array.prototype.slice.call(arguments);
 
Array.prototype.forEach.call(arguments, function(v) {
  // 循环arguments对象
});

// push
// some
// every
// filter
// map
// ...
```

以上在借用数组的原型方法的时候都可以通过数组直接量来简化使用：

```javascript
var obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}

;[].push.call(obj, 'd')

console.log([].slice.call(obj))

;[].forEach.call(obj, function (num, index) {
  console.log(num)
})
```

#### 小结

- 对象没有数组 Array.prototype 的属性值，类型是 Object ，而数组类型是 Array
- 数组是基于索引的实现， length 会自动更新，而对象是键值对
- 使用对象可以创建伪数组，伪数组可以正常使用数组的大部分方法

### 

---

## 附录

### A 代码规范

#### 代码风格

- [JavaScript Standard Style ](https://github.com/feross/standard)
- [Airbnb JavaScript Style Guide() {](https://github.com/airbnb/javascript)

#### 校验工具

- [JSLint](https://github.com/douglascrockford/JSLint)
- [JSHint](https://github.com/jshint/jshint)
- [ESLint](https://github.com/eslint/eslint)

### B Chrome 开发者工具

### C 文档相关工具

- 电子文档制作工具: [docute](https://github.com/egoist/docute)
- 流程图工具：[DiagramDesigner](http://logicnet.dk/DiagramDesigner/)
