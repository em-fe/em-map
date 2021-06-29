import { ref } from 'vue';

let mapInstance = null;

const setMapInstance = (sss) => {
  console.log(sss, 12);
  mapInstance = sss;
};

const getMapInstance = () => {
  console.log(mapInstance, 1123);
  return mapInstance;
};

export {
  getMapInstance,
  setMapInstance
};
