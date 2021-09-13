import { ref } from 'vue';

const mapInstance = ref(null);

const setMapInstance = (sss) => {
  mapInstance.value = sss;
};

const getMapInstance = () => {
  return mapInstance;
};

export {
  getMapInstance,
  setMapInstance
};
