<template>
  <div style="padding: 200px;">
    <em-amap-search-box :default="city" @onSearchResult="onSearchResult"></em-amap-search-box>
    <!-- <em-amap-search-box :default="city" :on-search-result="onSearchResult"></em-amap-search-box> -->
    
    <!-- https://elemefe.github.io/vue-amap -->
    <!-- https://lbs.amap.com/api/lightmap/guide/picker -->
    <div style="width: 500px;height:500px;">
      <em-amap :center="coordinate" :zoom="scale">
        <em-amap-marker :position="coordinate"></em-amap-marker>
      </em-amap>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue';
export default {
  components: {
  },
  setup() {
    const city = ref('北京');
    const coordinate = ref([116, 39.92998577808024]);
    return {
      coordinate,
      city,
      scale: 14,
    };
  },
  methods: {
    onSearchResult(pois) {
      console.log(pois, 'pois');
      const newPoint = pois[0];
      this.coordinate = [newPoint.lng, newPoint.lat];
      this.city = newPoint.name;
    },
  },
};
</script>
