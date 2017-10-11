# 初始化

---

## 引入地图

一般项目中，对于 em-map 的初始化只需要调用 `initEmfeMapApiLoader` 方法即可。

NPM 安装：

```javascript
import EmMap from 'em-map';

Vue.use(EmMap);
EmMap.initEmfeMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['EmfeMap.Scale', 'EmfeMap.OverView', 'EmfeMap.ToolBar', 'EmfeMap.MapType',...]
});
```

CDN 引入：

```javascript
window.EmMap.initEmfeMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['EmfeMap.Scale', 'EmfeMap.OverView', 'EmfeMap.ToolBar', 'EmfeMap.MapType',...]
});
```

## Promise

在**定制化程度较高**的项目中，开发者可能只想通过 em-map 引入高德地图，而部分实例化的操作直接基于高德地图的 sdk 完成。这个时候就需要 `lazyEmfeMapApiLoaderInstance`。

NPM 安装：

```javascript
import EmMap from 'em-map';
import { lazyEmfeMapApiLoaderInstance } from 'em-map';

Vue.use(EmMap);
EmMap.initEmfeMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['EmfeMap.Scale', 'EmfeMap.OverView', 'EmfeMap.ToolBar', 'EmfeMap.MapType',...]
});

lazyEmfeMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new EmfeMap.Map('amapContainer', {
    center: new EmfeMap.LngLat(121.59996, 31.197646)
  });
});
```

CDN 引入：

```javascript
window.EmMap.initEmfeMapApiLoader({
  key: 'YOUR_KEY',
  plugin: ['EmfeMap.Scale', 'EmfeMap.OverView', 'EmfeMap.ToolBar', 'EmfeMap.MapType',...]
});

window.EmMap.lazyEmfeMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new EmfeMap.Map('amapContainer', {
    center: new EmfeMap.LngLat(121.59996, 31.197646)
  });
});
```
