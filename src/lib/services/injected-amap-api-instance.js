import { ref } from 'vue';

import AMapAPILoader from './lazy-amap-api-loader';
let lazyAMapApiLoaderInstance = ref(null);

export const initAMapApiLoader = (config) => {
  const isServer = typeof window === 'undefined';
  if (isServer) { return; }
  // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  if (lazyAMapApiLoaderInstance.value) { return; }
  if (!lazyAMapApiLoaderInstance.value) { lazyAMapApiLoaderInstance.value = new AMapAPILoader(config); }
  lazyAMapApiLoaderInstance.value.load();
};
export { lazyAMapApiLoaderInstance };
