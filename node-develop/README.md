# 搭建 node 开发环境

我们需要安装和管理多个 node 版本，可使用的 node 版本管理工具有 [n](https://github.com/tj/n) 和 [nvm](https://github.com/creationix/nvm)，选择一个即可，不要两个同时使用。

安装完成 node 版本管理工具后，即可安装和使用 node。

# npm

npm 用于自动管理包的依赖

### 初始化一个 node 项目

```
$ npm init
```

会生成 `package.json` 文件，它定义了项目的各种元信息及项目的依赖，因此项目在部署时，不必将 `node_modules` 目录上传到服务器，把 `node_modules` 加到 `.gitignore` 即可，只需执行

```
$ npm install
```

则 npm 会自动读取 `package.json` 中的依赖并安装在项目的 `node_modules` 下

### 安装 PACKAGE

不将依赖写入 `package.json`

```
$ npm install PACKAGE_NAME
```

将依赖写入 `package.json`

```
$ npm install PACKAGE_NAME --save
```

可同时安装多个 PACKAGE

```
$ npm install PACKAGE_NAME PACKAGE_NAME2 --save
```

默认从 npm 官方安装，如果指定镜像可加参数 `--registry=https://registry.npm.taobao.org`

```
$ npm install PACKAGE_NAME --registry=https://registry.npm.taobao.org --save
```

### 执行某个 js 文件

```
$ node app.js
```
