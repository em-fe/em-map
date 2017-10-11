# em-map
高德地图之vue2组件
> em-map是一套基于Vue 2.0和高德地图的地图组件。参照 [vue-amap](https://elemefe.github.io/vue-amap)

## 快速上手

引入 em-amap

```javascript
// 引入 em-amap
import EmfeMap from 'em-map';
Vue.use(EmfeMap);

// 初始化 em-map
EmfeMap.initEmfeMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['EmfeMap.Autocomplete', 'EmfeMap.PlaceSearch', 'EmfeMap.Scale', 'EmfeMap.OverView', 'EmfeMap.ToolBar', 'EmfeMap.MapType', 'EmfeMap.PolyEditor', 'EmfeMap.CircleEditor']
});
```

## 组件

### 地图

```javascript
<emfe-amap vid="amapDemo" :zoom="zoom" :center="center">
</emfe-amap>
```

### 点坐标

```javascript
<emfe-amap vid="amapDemo" :zoom="zoom" :center="center">
  <emfe-emfe-marker v-for="marker in markers" :position="marker.position"></emfe-emfe-marker>
</emfe-amap>
```

### 折线

```javascript
<emfe-amap vid="amapDemo" :zoom="zoom" :center="center">
  <emfe-emfe-polyline :path="polyline.path"></emfe-emfe-polyline>
</emfe-amap>
```

### 多边形

```javascript
<emfe-amap vid="amapDemo" :zoom="zoom" :center="center">
  <emfe-emfe-polygon v-for="polygon in polygons" :path="polygon.path" :events="polygon.events"></emfe-emfe-polygon>
</emfe-amap>
```

### 圆

```javascript
<emfe-amap vid="amapDemo" :zoom="zoom" :center="center">
  <emfe-emfe-circle v-for="circle in circles" :center="circle.center" :radius="circle.radius"></emfe-emfe-circle>
</emfe-amap>
```

### 图片覆盖物

```javascript
<emfe-amap vid="amapDemo" :zoom="zoom" :center="center">
  <emfe-emfe-ground-image v-for="groundimage in groundimages" :url="groundimage.url"></emfe-emfe-ground-image>
</emfe-amap>
```

### 信息窗体

```javascript
<emfe-amap vid="amapDemo" :zoom="zoom" :center="center">
  <emfe-emfe-info-window v-for="window in windows" :position="window.position" :content="window.content" :open="window.open"></emfe-emfe-info-window>
</emfe-amap>
```

### Search-Box

```javascript
<emfe-emfe-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></emfe-emfe-search-box>
<emfe-amap vid="amapDemo">
</emfe-amap>
