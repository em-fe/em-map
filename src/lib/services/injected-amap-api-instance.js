import AMapAPILoader from './lazy-amap-api-loader';

import { setMapInstance, getMapInstance } from './use-instance';

const lazyAMapApiLoaderInstance = null;

export const initAMapApiLoader = (config) => {
  // const isServer = typeof window === 'undefined';
  // if (isServer) { return; }

  // const instance = getMapInstance();

  // let mapInstance = null;
  // // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  // if (instance.value) { return; }
  // if (!instance.value) {
  //   mapInstance = new AMapAPILoader(config);
  //   setMapInstance(mapInstance);
  // }
  // mapInstance.load();

  const isServer = typeof window === 'undefined';
  if (isServer) { return; }
  const instance = getMapInstance();
  if (instance.value) { return; }
  if (!instance.value) {
    instance.value = new AMapAPILoader(config);
    setMapInstance(instance.value);
  }
};
export { lazyAMapApiLoaderInstance };
