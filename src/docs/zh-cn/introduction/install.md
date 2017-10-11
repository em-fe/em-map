# 安装

---

## npm 安装

推荐 npm 安装。

```
npm install em-map --save
```

<!-- ## CDN

目前可通过 [unpkg.com/em-map](https://unpkg.com/em-map/dist/index.js) 获取最新版本的资源。

```html
<script src="https://unpkg.com/em-map/dist/index.js"></script>
``` -->

## Hello World

通过 CDN 的方式我们可以很容易地使用 em-map 写出一个 Hello world 页面。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>demo | em-map</title>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="app">
      <emfe-amap vid="amap"></emfe-amap>
    </div>
  </body>
  <!-- 先引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/em-map/dist/index.js"></script>
  <script>
    // 初始化高德地图的 key 和插件
    window.EmMap.initEmfeMapApiLoader({
      key: 'YOUR_KEY',
      plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'EmfeMap.CircleEditor']
    });

    new Vue({
      el: '#app',
      data: function(){
        return { }
      }
    });
  </script>
</html>
```
