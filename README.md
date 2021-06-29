# em-map
高德地图之vue2组件
> em-map 是一套基于Vue 2.0和高德地图的地图组件。参照 [vue-amap](https://elemefe.github.io/vue-amap)

[![em-map](https://img.shields.io/npm/v/em-map.svg?style=flat-square)](https://www.npmjs.org/package/em-map)
[![NPM downloads](http://img.shields.io/npm/dm/em-map.svg?style=flat-square)](https://npmjs.org/package/em-map)
[![Package Quality](http://npm.packagequality.com/shield/em-map.svg)](http://packagequality.com/#?package=em-map)
[![NPM downloads](https://img.shields.io/npm/dt/em-map.svg?style=flat-square)](https://npmjs.org/package/em-map)


## 安装
```
npm install -S em-map
```

## 文档
[https://elemefe.github.io/vue-amap](https://elemefe.github.io/vue-amap)


## 快速上手

引入 em-map

```javascript
// 引入vue-amap
import VueAMap from 'em-amap';
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
});
```

## 组件

### 地图

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
</el-amap>
```

### 点坐标

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-marker v-for="marker in markers" :position="marker.position"></el-amap-marker>
</el-amap>
```

### 折线

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-polyline :path="polyline.path"></el-amap-polyline>
</el-amap>
```

### 多边形

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-polygon v-for="polygon in polygons" :path="polygon.path" :events="polygon.events"></el-amap-polygon>
</el-amap>
```

### 圆

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius"></el-amap-circle>
</el-amap>
```

### 图片覆盖物

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-ground-image v-for="groundimage in groundimages" :url="groundimage.url"></el-amap-ground-image>
</el-amap>
```

### 信息窗体

```javascript
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
  <el-amap-info-window v-for="window in windows" :position="window.position" :content="window.content" :open="window.open"></el-amap-info-window>
</el-amap>
```

### Search-Box

```javascript
<el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
<el-amap vid="amapDemo">
</el-amap>
```


## 参考

- [高德地图文档](https://lbs.amap.com/api/javascript-api/guide/abc/quickstart)
- [点标记 Marker 文档](https://lbs.amap.com/api/javascript-api/guide/overlays/marker)
- [点标记 Marker demo](https://lbs.amap.com/demo/javascript-api/example/marker/marker-content)
