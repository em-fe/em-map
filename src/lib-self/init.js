import AMapAPILoader from './lazy-amap-api-loader';
import { setMapInstance, getMapInstance } from './use-instance';

export const initAMapApiLoader = (config) => {
  const isServer = typeof window === 'undefined';
  if (isServer) { return; }
  const instance = getMapInstance();
  if (instance.value) { return; }
  if (!instance.value) {
    instance.value = new AMapAPILoader(config);
    setMapInstance(instance.value);
  }
};
