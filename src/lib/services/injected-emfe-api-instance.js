let lazyEmfeMapApiLoaderInstance = null;
import EmfeMapAPILoader from './lazy-emfe-api-loader';
import Vue from 'vue';
export const initEmfeMapApiLoader = (config) => {
  if (Vue.prototype.$isServer) return;
  // if (lazyEmfeMapApiLoaderInstance) throw new Error('You has already initial your lazyEmfeMapApiLoaderInstance, just import it');
  if (lazyEmfeMapApiLoaderInstance) return;
  if (!lazyEmfeMapApiLoaderInstance) lazyEmfeMapApiLoaderInstance = new EmfeMapAPILoader(config);
  lazyEmfeMapApiLoaderInstance.load();
};
export { lazyEmfeMapApiLoaderInstance };
