<template>
  <div style="padding: 200px;">
    <el-amap-search-box :default="city" :on-search-result="onSearchResult"></el-amap-search-box>
    <!-- https://elemefe.github.io/vue-amap -->
    <!-- https://lbs.amap.com/api/lightmap/guide/picker -->
    <div style="width: 500px;height:500px;">
      <el-amap :center="coordinate" :zoom="scale">
        <el-amap-marker :position="coordinate"></el-amap-marker>
      </el-amap>
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
