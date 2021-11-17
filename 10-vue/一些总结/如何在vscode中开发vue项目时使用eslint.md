## 如何在vscode中开发vue项目时使用eslint

关键字:vscode , eslint, vue-cli

## 名词界定

eslint是用来对代码进行检查的工具，它的使用不限于任何代码编辑器。

vscode是一个前端人员经常使用的编辑器，它强大的插件体系让程序员感受到写代码的方便，其中它就可以安装eslint插件。

vue cli是用来创建vue项目的脚手架工具，它内置了eslint代码检查的功能。它与vscode没有直接关系。

## 本文讨论的场景是

- 你用vuecli创建vue项目的同时选择了eslint
- 你用vscode来编写代码
- 你的vscode没有启用类似于vetur的第三方插件，没有启用自动格式化功能

## 在创建vue项目时选择eslint

在使用

```
vue create projectName
```

命令创建项目时，可以启用eslint
![image20200407214316035.png](F:\前端的学习\就业班,移动端的学习\vue的使用\1586268602731-image-20200407214316035.png)

建议使用 `ESLint + standard`（它的官网地址是https://github.com/standard/standard）

此时，你得到的package.json中会有eslint的相关包的信息:

```
{
  "devDependencies": {
    "eslint": "^6.7.2",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "eslint-plugin-vue": "^6.2.2",
  }
}
```

同时，在项目的根目录下还会有一个.eslintrc.js的文件，内容可能是如下这样：

```
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```

同时，在package.json的script命令中也会有一项是给eslint用的

```
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

你可以在运行`npm run lint`命令用来eslint检查并自动修复你代码中的问题。如果没有使用vscode，一样可以通过这个命令来运行eslint检查代码。

## 在vscode中安装eslint插件

在eslint中安装插件可以帮助我们更好的使用eslint的功能。在vscode的扩展（extensions）中去搜索eslint并安装。

![image20200407215328070.png](F:\前端的学习\就业班,移动端的学习\vue的使用\1586268683142-image-20200407215328070.png)

## 在vscode中对eslint进行配置

![image20200407220546225.png](F:\前端的学习\就业班,移动端的学习\vue的使用\3)

在根目目录下创建一个文件名`.vscode`，并在文件夹下创建一个名为`settings`的文件，内容如下：

```
{
    "eslint.run": "onType",
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.alwaysShowStatus": true
}
```

## 验收效果

此时，你在写代码的过程，如果按下ctrl+s保存代码，它会自动调用eslint去修复一些问题。

## 关闭eslint

在根目录中新建vue.config.js（如果有的话，就不用创建了）,在其中设置一项`lintOnSave: false`

```
module.exports = {
  lintOnSave: false
}
```