import { firstCapitalize } from '@fe6/shared';

import { initAMapApiLoader } from './init';

import AMap from './components/amap.vue';
import AMapMarker from './components/amap-marker.vue';
import AMapSearchBox from './components/amap-search-box.vue';

const VueAMap = {
  initAMapApiLoader,
};

const components = [
  AMap,
  AMapMarker,
  AMapSearchBox,
];

VueAMap.install = (Vue) => {
  if (VueAMap.installed) { return; }
  components.map((_component) => {
    Vue.component(_component.name, _component);
    VueAMap[firstCapitalize(_component.name).replace(/^W/, '')] = _component;
  });
};

export {
  initAMapApiLoader
}

export default VueAMap;

