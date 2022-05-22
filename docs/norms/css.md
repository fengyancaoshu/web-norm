# CSS 规范

## CSS 引入方式

- 一般情况使用外部样式表：统一使用 link 标签，少用@import（原生 import 有加载性能问题），sass、less、vue.js 等文件使用 import 命令除外（因为最终前端构建工具会将引入文件编译成一个 css 文件）

```CSS
<link rel="stylesheet" href="xxx.css">
```

- 个别情况使用内部样式表：页面非常简单且样式非常少的单独页面，如：纯图片海报页面，纯文字协议页面

- 尽可能避免使用行内样式

## CSS 引入顺序

先引框架 css 的再引公共 css 然后私有 css 的最后写内部的 css，如下：

```CSS
<link href="/css/swiper.min.css">
<link href="/css/common.css">
<link href="/css/.css">
```

## CSS 代码风格

- css 头部统一加上@charset 声明，如下： @charset "utf-8";
- 禁止使用 ID 选择器来定义元素样式
- 避免使用!important 和 z-index。调整结构和引用顺序实现
- 禁止使用层级过深的选择器，最多 3 级。eg: ul.pro_list > li > p
- 除非是样式 reset 需要，禁止对纯元素选择器设置特定样式，避免样式污染

  > PC 端和移动端通用 reset 示例
  >
  > > ```CSS
  > >   body,html{width:100%;min-height:100%;/*移动端*/-webkit-user-select:none;user-select:none/*
  > >   禁止选中文本（如无文本选中需求，此为必选项） */}
  > >   body{background-color:#fff;color:#333;font-size:16px;font-family:PingFangSC-Regular}
  > >   a,body,button,dd,div,dl,dt,h1,h2,h3,h4,h5,h6,img,input,li,ol,p,select,table,td,textarea,th,tr,ul{box-sizing:border-box;margin:0;padding:0;border:0}
  > >   button,input,select,textarea{outline:0;font-size:100%}
  > >   h1,h2,h3,h4,h5,h6{font-size:100%}
  > >   li,ol,ul{list-style:none}
  > >   a{cursor:pointer}
  > >   a,a:hover{text-decoration:none}
  > >   ::-webkit-input-placeholder{color:#B0B0B0}
  > >   :-moz-placeholder{color:#B0B0B0}
  > >   ::-moz-placeholder{color:#B0B0B0}
  > >   :-ms-input-placeholder{color:#B0B0B0}
  > > ```

- 媒体查询顺序由大到小

```CSS
  @media only screen and (max-width: 1080px), only screen and (max-device-width:1080px) {}
  @media only screen and (max-width: 960px), only screen and (max-device-width:960px) { }
```

- 引号 最外层统一使用双引号；url 的内容要用引号；属性选择器中的属性值需要引号。

- CSS 属性的声明顺序与性能无关，但是为了易于阅读统一规范 按如下顺序

```css
  .declaration-order {
    /* 定位 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    float: right;
    /* 盒模型 */
    display: block;
    width: 100px;
    height: 100px;
    /* 外观 */
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    background-color: #f5f5f5;
    /* 排版 */
    color: #333;
    text-align: center;
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    /*透明度*/
    opacity: 1;
  }
  ```

- 如兼容性要求可满足flex布局，可以优先采用

- 项目上线前先添加兼容性前缀 [Autoprefixer](https://autoprefixer.github.io/)，然后压缩代码

## 语法

- 使用组合选择器时，保持每个独立的选择器占用一行.
- 为了代码的易读性，在每个声明的左括号前增加一个空格.
- 声明块的右括号应该另起一行.
- 每条声明 : 后应该插入一个空格.
- 每条声明应该只占用一行来保证错误报告更加准确.
- 所有声明应该以分号结尾.虽然最后一条声明后的分号是可选的，但是如果没有他，你的代码会更容易出错.
- 逗号分隔的取值，都应该在逗号之后增加一个空格.比如说 box-shadow
- 不要在颜色值 rgb() rgba() hsl() hsla()和 rect() 中增加空格，并且不要带有取值前面不必要的 0 (比如，使用 .5 替代 0.5).
- 所有的十六进制值都应该使用小写字母，例如 #fefefe. 尽可能使用短的十六进制数值，例如使用 #fff 替代 #ffffff.
- 为选择器中的属性取值添加引号，例如 input[type="text"]. 他们只在某些情况下可有可无，所以都使用引号可以增加一致性.
- 不要为 0 指明单位，比如使用 margin: 0; 而不是 margin: 0px;.
