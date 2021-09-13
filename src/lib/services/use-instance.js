import { ref } from 'vue';

const mapInstance = ref(null);
const aMapComponent = ref(null);

const setMapInstance = (sss) => {
  mapInstance.value = sss;
};

const getMapInstance = () => {
  return mapInstance;
};

const setAMapComponent = (aMap) => {
  aMapComponent.value = aMap;
};

const getAMapComponent = () => {
  return aMapComponent;
};

export {
  getMapInstance,
  setMapInstance,
  getAMapComponent,
  setAMapComponent,
};
