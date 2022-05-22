# 规范化管理工具

## .editorconfig

统一编辑器编码风格，编辑器推荐使用 vscode, 对应的插件名是EditorConfig for VS Code
常用配置如下

```csharp
# 告诉EditorConfig插件，这是根文件，不用继续往上查找
root = true

# 匹配全部文件
[*]
# 结尾换行符，可选"lf"、"cr"、"crlf"
end_of_line = lf
# 在文件结尾插入新行
insert_final_newline = true
# 删除一行中的前后空格
trim_trailing_whitespace = true
# 匹配js和py结尾的文件
[*.{js,py}]
# 设置字符集
charset = utf-8
# 缩进风格，可选"space"、"tab"
indent_style = space
# 缩进的空格数
indent_size = 2

```

## eslint+prettier+vuter

vscode设置代码自动格式化

* setting.json中配置如下

```javascript
{
  // -----------------------自动格式化配置eslint+prettier-----------------------
  // 每次保存自动格式化ctrl+s
  "editor.formatOnSave": true,
  // 每次保存的时候将代码按eslint格式进行修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  //配置内配置对 .vue 文件的格式化
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  //配置内配置对 .ts 文件的格式化
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  //配置内配置对 .js 文件的格式化
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  //配置内配置对 .json 文件的格式化
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

* 项目目录下添加 .prettierrc

```javascript
{
  "semi": true, //去掉末尾分号
  "singleQuote": true, //单引号代替双引号
  "printWidth": 80 //多少字符自动换行
}
```

* 项目目录下添加 .eslintrc.js

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: [
    // vue3 相关
    'plugin:vue/vue3-essential',
    // vue2 相关
    'plugin:vue/essential',
    "@vue/standard"
  ],
  "parserOptions": {
    ecmaVersion: 6,
    sourceType: 'module',
    parser: "babel-eslint",
  },
  plugins: [
    'vue'
  ],
  globals: {//全局变量
    document,
    navigator,
    window,
  }
  // "off"或者0    //关闭规则
  // "warn"或者1    //在打开的规则作为警告（不影响退出代码）
  // "error"或者2    //把规则作为一个错误（退出代码触发时为1）
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 0 //首选const
  }
}
```

## stylelint

* 其支持 Less、Sass 等这类预处理器
* 在社区活跃度上，有非常多的第三方插件。
* 在Facebook，Github，WordPress 等公司得到实践，能够覆盖很多场景

1、 安装stylelint

```cmd
yarn add -D stylelint
```

2、项目根目录 stylelint.config.js

```javascript
module.exports = {
  processors: [],
  plugins: [],
  extends: "stylelint-config-standard", // 这是官方推荐的方式
  rules: {
    "at-rule-empty-line-before": "always"|"never",
    "at-rule-name-case": "lower"|"upper",
    "block-no-empty": true,
  }
};
```

## commitlint

在多人协作的背景下，git 仓库和 workflow 的作用很重要。而对于 commit 提交的信息说明存在一定规范

* commitlint: 安装，制定提交规范（采用默认）

```cmd
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

* 生成配置文件commitlint.config.js，当然也可以是 .commitlintrc.js

```cmd
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```

* husky: 还要为 git 配置 husky ，对 git 的 commit 操作进行校验。husky继承了Git下所有的钩子，在触发钩子的时候，husky可以阻止不合法的commit，push等等

```cmd
npm install husky --save-dev
```

* 在 package.json 中引入 husky

```json
// package.json
{
  ...
  ...
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

* 提交格式

```cmd
git commit -m <type>[optional scope]: <description>
```

> * type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
> * optional scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
> * description：一句话描述此次提交的主要内容，做到言简意赅。

类型 |  描述
-|-|-
build | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
chore | 其他修改, 比如改变构建流程、或者增加依赖库、工具等
ci | 持续集成修改
docs | 文档修改
feat | 新特性、新功能
fix | 修改bug
perf | 优化相关，比如提升性能、体验
refactor | 代码重构
revert | 回滚到上一个版本
style | 代码格式修改, 注意不是 css 修改
test | 测试用例修
