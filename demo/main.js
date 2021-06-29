import { createApp, version } from 'vue';

import VueAMap from 'em-map';

import App from './AppDev.vue';

// eslint-disable-next-line no-console
console.log('Vue version: ', version);

const app = createApp(App);

// 饿了么 地图封装 start
app.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f6fac6d56d42b38537406e8cf17c31c0',
  plugin: ['PlaceSearch', 'Scale', 'EmfeMap.Marker'],
});
// 饿了么 地图封装 end

// Mount when the route is ready
app.mount('#root', true);
