# API 接口规范

项目中 `src/api/ajax.js` 文件中封装了 axios 的常用配置和一些工具函数。

## 默认配置

根据需要自行添加或修改。

```js
{
    baseURL: '/api',
    responseType: 'json'
}
```

针对 `post` 和 `put` 请求把 `Content-Type` 设为 `application/x-www-form-urlencoded`。

```js
const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Content-Type'] = FORM_CONTENT_TYPE
axios.defaults.headers.put['Content-Type'] = FORM_CONTENT_TYPE
```

## 工具函数

* `GET(url[, params])`
* `POST(url, body)`
* `PUT(url, body)`
* `DELETE (url[, params])`

```js
import { GET, POST, PUT, DELETE } from './api/ajax'
GET('/url').then(data => console.log(data))
POST('/url', params).then(data => console.log(data))
PUT('/url', params).then(data => console.log(data))
DELETE('/url').then(data => console.log(data))
```

> `data` 即为 `response.data`。

## 工具类

对常用 REST 请求格式的封装。以一个实体 User 为例，基础 URL 为 `/api/user`，则：

* 查询 **GET** `/api/user/:id`
* 添加 **POST** `/api/user`
* 修改 **PUT** `/api/user/:id`
* 删除 **DELETE** `/api/user/:id`

注意：**export default class Api**

* `constructor(url)`
* `add(model)`
* `update(id, model)`
* `delete(id[, params])`
* `one(id[, params])`
* `all([params])`

```js
// CityApi.js
import Ajax, { GET } from './ajax'
// 通过 Ajax 类实例化拥有基础的 QRUD 能力
const CityApi = new Ajax('/city')
// 如果需要额外的个性化请求，借助 GET、POST、PUT、DELETE 工具方法添加
CityApi.paging = params => GET('/city2', params)
export default CityApi
```

## 调用

```js
// actions.js
import CityApi from 'api/city'
export default {
    getCitys(store) {
        CityApi.all().then(data => {
            store.commit('citys', data.citys)
        })
    }
}
```

```vue
// componet
<template>...</template>
<script>
import CityApi from 'api/city'
export default {
    data() {
        return {
            cityData: []
        }
    },
    created() {
        CityApi.all().then(data => {
            this.cityData = data.citys
        })
    }
}
</script>
```

## 多级资源请求

路径模版约定为：`/api/资源名/:资源id/子资源名/:子资源id`。

假如我们要请求用户的团队信息，则：

* 添加 **POST** `/api/user/:userId/team`
* 查询 **GET** `/api/user/:userId/team`
* 查询单个 **GET** `/api/user/:userId/team/:teamId`
* 修改 **PUT** `/api/user/:userId/team/:teamId`
* 删除 **DELETE** `/api/user/:userId/team/:teamId`

```js
// teamApi.js
import Ajax from './ajax'
const TeamApi = new Api('/user/:userId/team')
export default TeamApi
```

```js
// 调用
import TeamApi from 'api/teamApi'
// 添加
TeamApi.add(userId, team)
// 查询用户所有团队
TeamApi.all(userId)
// 查询用户某个团队
TeamApi.one(userId, teamId)
// 修改
TeamApi.update(userId, teamId, team)
// 删除
TeamApi.delete(userId, teamId)
```

总结来说：

* `Ajax` 基础类只需要传一个 URL pattern，就可以实例化符合 RESTful 规范的接口调用。
* 所有 URL pattern 上的占位符按顺序传入，`body` 或 `params` 永远作为最后一个参数传入

## HTTP 接口返回格式 (Scheme)

  接口状态码 (HTTP Code): => 200

  接口输出 (Response): JSON => {error, msg, data, ver}

  ```javascript
  {
    "error": ${error_code},        // {String} api status code, defaults to '0',
    "msg": ${api_status_message},  // {String} api status message
    "data": ${api_data},           // {Mixed} Generic type for api data response, can be null, empty "", 0, {}, [] etc,.
    "ver": ${api_version}          // {String} version identify, defaults to '1.0'
  }
  ```

  **`error` 字段状态码定义**

* 状态码为字符串类型 (String). eg. "0" (注意有双引号)
* 0 ~ 100 为系统保留状态
* "-100" -  session timeout (登陆验证)
* "0"    -  api success (default value)
* "1"    -  internal error (后端接口未知错误)
* "2"    -  redirect url (页面跳转响应)
* **业务状态码建议使用 100以后的数值 (>100)**. eg: 0x101F, 0x1013

  示例:

  ```javascripton
  {"error": "2", "msg": "user session timeout", "data": "http://login.yunhou.com/login.php?t", "ver": "1.0"}
  ```

## 其他

* 本规范适用所有前后端数据接口规范，json, jsonp
* 接口输出**必须是规范的 JSON 字符串**, 拒绝手动拼接 json 字符串返回，请参考 <http://json.org/>

## Global config specification

  页面全局 js 配置规范

  > 主要用于前后端数据交互时用到的一些配置项输出，减少一些额外的 HTTP 接口请求，
  >
  > 页面常量，首屏页面 JSON 数据，等都可考虑页面直接输出。
  >
  > 一些影响首屏页面绚染的接口尽量采用内联输出。 比如，获取服务端时间接口等 ...

  ```javascript
  window['$PAGE_DATA'] = {
      // Client time for bpm.js
      startTime: new Date,
      // Diff time with backend
      diffTime: {UNIX_TIMESTAMP} - new Date, // {UNIX_TIMESTAMP} - sync with server unix timestamp
      // Page logic config data, eg. urls etc,.
      data: {
          ....
      }
  };
  ```

  注：业务配置数据建议使用 `$PAGE_DATA.data` 字段, 前端做相应处理。

  附: 后端输出参考:

  ```html
  <script>
  // first declaration
  window['$PAGE_DATA'] || window['$PAGE_DATA'] = {};
  window['$PAGE_DATA']['xxx'] = xxx;
  // 业务全局
  window['$PAGE_DATA']['data'] = {
      ...
  };
  window['$PAGE_DATA']['data']['foo'] = {
      ...
  };
  </script>
  ```
