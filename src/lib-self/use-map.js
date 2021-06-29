import { ref } from 'vue';

let mapModal = ref(null);

const setMapModal = (sss) => {
  mapModal.value = sss;
};

const getMapModal = () => {
  return mapModal;
};

export {
  getMapModal,
  setMapModal
};
