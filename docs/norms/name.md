# 命名规范

## 命名严谨性、语义化

代码中的命名严禁使用拼音与英文混合的方式，更不允许直接使用中文的方式。
说明：正确的 英文拼写和语法可以让阅读者易于理解，避免歧义。注意，即使纯拼音命名方式也要避免采用

正例：henan/luoyang/rmb 等国际通用的名称，可视同英文

反例： DaZhePromotion [打折] / getPingfenByName() [评分] / int 某变量 = 3

杜绝完全不规范的缩写，避免望文不知义：

反例： AbstractClass“缩写”命名成 AbsClass；condition “缩写”命名成 condi，此类随意缩写严重 降低了代码的可阅读性。

## 项目命名

全部采用小写方式，以中线分隔。

正例：mall-management-system

反例：mall_management-system / mallManagementSystem

## 目录命名

全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数。

正例： scripts/styles/components/images/utils/layouts/demo-styles/demo-scripts/img/doc

反例： script/style/demo_scripts/demoStyles/imgs/docs

【特殊】VUE 的项目中的 components 中的组件目录，使用 kebab-case 命名。

正例： head-search/page-loading/authorized/notice-icon

反例：HeadSearch/PageLoading

【特殊】VUE 的项目中的除 components 组件目录外的所有目录也使用 kebab-case 命名。

正例： page-one/shopping-car/user-management

反例： ShoppingCar/UserManagement

## JS、CSS、SCSS、HTML、PNG 文件命名

全部采用小写方式， 以中划线分隔。

正例： render-dom.js/signup.css/index.html/company-logo.png

反例： renderDom.js/UserManagement.html

## CSS 以及编译语言 命名

1. class 类名使用小写字母，以中划线分隔
2. id 采用小驼峰式命名
3. 变量、函数、混合等采用小驼峰式命名

## JS 相关命名

- 变量名采用小驼峰命名, 比较推荐的变量命名查询网站 [CODELF](https://unbug.github.io/codelf/)
- 类命名采用大驼峰
- 常量采用全大写方式， 以下划线分隔；eg：MAX_COUNT
- 函数名采用小驼峰命名，以动词开始。 getName(), 返回类型是布尔类型，一般以 is 开头，eg: isEnable();
- 变量和函数命名，不要担心长度，一定要语义化合乎逻辑。eg: saveImageToPhotosAlbum()
- 变量和函数名不能以数字开始，不能使用保留字；jQuery 对象以'$'符号开头，私有变量以'\_'开头
