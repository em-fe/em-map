// polyfills
import './polyfills';

import upperCamelCase from 'uppercamelcase';

// 初始化接口
import {initEmfeMapApiLoader} from './services/injected-emfe-api-instance';

// 组建导入
import EmfeMap from './components/emfe.vue';
import EmfeMapMarker from './components/emfe-marker.vue';
import EmfeMapSearchBox from './components/emfe-search-box.vue';
import EmfeMapCircle from './components/emfe-circle.vue';
import EmfeMapGroupImage from './components/emfe-ground-image.vue';
import EmfeMapInfoWindow from './components/emfe-info-window.vue';
import EmfeMapPolyline from './components/emfe-polyline.vue';
import EmfeMapPolygon from './components/emfe-polygon.vue';

// managers
import EmfeMapManager from './managers/emfe-manager';

let components = [
  EmfeMap,
  EmfeMapMarker,
  EmfeMapSearchBox,
  EmfeMapCircle,
  EmfeMapGroupImage,
  EmfeMapInfoWindow,
  EmfeMapPolygon,
  EmfeMapPolyline
];

let EmMap = {
  initEmfeMapApiLoader,
  EmfeMapManager
};

EmMap.install = (Vue) => {
  if (EmMap.installed) return;
  Vue.config.optionMergeStrategies.deferredReady = Vue.config.optionMergeStrategies.created;
  components.map(_component => {
    Vue.component(_component.name, _component);
    EmMap[upperCamelCase(_component.name).replace(/^El/, '')] = _component;
  });
};

const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;
  EmMap.install(Vue);
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
  // window.VueAmap = EmMap;
};

export default EmMap;

export {
  EmfeMapManager,
  initEmfeMapApiLoader
};
export { lazyEmfeMapApiLoaderInstance } from './services/injected-emfe-api-instance';
