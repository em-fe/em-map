import { firstCapitalize } from '@fe6/shared';
import './style/index.scss';

// 初始化接口
import { initAMapApiLoader } from './services/injected-amap-api-instance';

// 组建导入
import AMap from './components/amap';
import AMapMarker from './components/amap-marker';
import AMapSearchBox from './components/amap-search-box';
import AMapCircle from './components/amap-circle';
import AMapGroupImage from './components/amap-ground-image';
import AMapInfoWindow from './components/amap-info-window';
import AMapPolyline from './components/amap-polyline';
import AMapPolygon from './components/amap-polygon';

// managers
import AMapManager from './managers/amap-manager';

const components = [
  AMap,
  AMapMarker,
  AMapSearchBox,
  AMapCircle,
  AMapGroupImage,
  AMapInfoWindow,
  AMapPolygon,
  AMapPolyline
];

const VueAMap = {
  initAMapApiLoader,
  AMapManager
};

VueAMap.install = (Vue) => {
  if (VueAMap.installed) { return; }
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  components.map((_component) => {
    Vue.component(_component.name, _component);
    VueAMap[firstCapitalize(_component.name).replace(/^El/, '')] = _component;
  });
};

const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) { return; }
  VueAMap.install(Vue);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  // window.VueAmap = VueAMap;
}

export default VueAMap;

export {
  AMapManager,
  initAMapApiLoader
};
export { lazyAMapApiLoaderInstance } from './services/injected-amap-api-instance';
