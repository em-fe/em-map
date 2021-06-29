import AMapAPILoader from './lazy-amap-api-loader';

import { setMapInstance, getMapInstance } from './use-instance';

const lazyAMapApiLoaderInstance = null;

export const initAMapApiLoader = (config) => {
  const isServer = typeof window === 'undefined';
  if (isServer) { return; }

  const instance = getMapInstance();

  let mapInstance = null;
  // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  if (instance) { return; }
  if (!instance) {
    mapInstance = new AMapAPILoader(config);
    setMapInstance(mapInstance);
  }
  mapInstance.load();
};
export { lazyAMapApiLoaderInstance };
