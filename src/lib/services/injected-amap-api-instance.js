import AMapAPILoader from './lazy-amap-api-loader';
let lazyAMapApiLoaderInstance = null;

export const initAMapApiLoader = (config) => {
  const isServer = typeof window === 'undefined';
  if (isServer) { return; }
  // if (lazyAMapApiLoaderInstance) throw new Error('You has already initial your lazyAMapApiLoaderInstance, just import it');
  if (lazyAMapApiLoaderInstance) { return; }
  if (!lazyAMapApiLoaderInstance) { lazyAMapApiLoaderInstance = new AMapAPILoader(config); }
  lazyAMapApiLoaderInstance.load();
};
export { lazyAMapApiLoaderInstance };
