# HTML 规范

## 页面头部

1. 文档类型统一使用 html5 的 doctype：
2. lang 属性统一使用 en，特殊场景特殊处理
3. 字符编码统一指定为'UTF-8'
4. 页面标题(Title)： 页面名称-产品中文全称-官方网站-腾讯游戏-产品 slogan，28 个汉字以内
5. 页面关键字(Keywords)： Keywords 为产品名、专题名、专题相关名词，之间用英文半角逗号隔开
6. 页面描述(Description) ：不超过 150 个字符，描述内容要和页面内容相关。
7. IE 兼容模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

1. 移动端禁止缩放

PC 端头部示范：

```Javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PC 端 标题</title>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta name="keywords"
          content="关键字内容"/>
    <meta name="description"
          content="网站描述内容"/>
</head>
<body>
</body>
</html>
```

移动端头部示范：

```Javascript
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>移动端 标题</title>
    <!-- 禁止缩放 -->
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
    <!-- 为了防止页面数字被识别为电话号码，可根据实际需要添加： -->
    <meta name="format-detection" content="telephone=no">
    <!-- 让添加到主屏幕的网页再次打开时全屏展示，可添加： 删除默认的苹果工具栏和菜单栏  -->
    <meta content="yes" name="mobile-web-app-capable">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta name="Description" content="页面的描述内容"/>
    <meta name="Keywords" content="页面关键字"/>
    <!-- External CSS -->
    <link rel="stylesheet" href="demo.css">
    <!-- In-document CSS -->
    <style>

    </style>
</head>
<body>

<!-- External JS -->
<script src="demo.js"></script>

<!-- In-document JS -->
<script>

</script>
</body>
</html>
```

## HTML 标签

1. 标签必须合法且闭合、嵌套正确，标签名需小写，**不要使用 HTML5 已经废弃的标签。eg：b、 em**
2. 自定义标签需要符合语义化，必须小写
3. 标签的自定义属性以 data-开头，后面跟小写单词，多单词使用下划线连接如：\<a data-goods_num='18' href="javascript:;" >\</a>
4. 缩进使用空格键(2 个)
5. 引入 CSS 和 JavaScript 文件时一般不需要指定 type 属性，因为 text/css 和 text/javascript 分别是它们的默认值。css 放在上面 head 中，JavaScript 放在 body 下面紧临</body>
6. boolean 属性指不需要声明取值的属性，XHTML 需要每个属性声明取值，但是 HTML5 并不需要；boolean 属性的存在表示取值为 true，不存在则表示取值为 false。
7. 在编写 HTML 代码时，需要尽量避免多余的父节点；很多时候，需要通过迭代和重构来使 HTML 变得更少。删除无意义的空标签，不要用标签名来设置样式
8. 标签中属性必须添加双引号（非单引号)，应该按照特定的顺序出现以保证易读性；

> 属性顺序:
>
> 1. class
> 2. id
> 3. name
> 4. data-\*
> 5. src, for, type, href, value , max-length, max, min, pattern
> 6. placeholder, title, alt
> 7. aria-\*, role
> 8. required, readonly, disabled
>
>> class 是为高可复用组件设计的，所以应处在第一位；
>> id 更加具体且应该尽量少使用，所以将它放在第二位。
