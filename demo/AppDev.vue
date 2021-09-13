<template>
  <div style="padding: 200px;">
    <el-amap-search-box :default="city" :on-search-result="onSearchResult"></el-amap-search-box>
    <!-- https://elemefe.github.io/vue-amap -->
    <!-- https://lbs.amap.com/api/lightmap/guide/picker -->
    <div style="width: 500px;height:500px;">
      <el-amap ref="emMapRef" :center="coordinate" :zoom="scale">
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
    const city = ref('');
    const emMapRef = ref(null);
    // const coordinate = ref([116.397451, 39.909187]);
    const coordinate = ref([114.314268, 34.797991]);
    return {
      coordinate,
      city,
      scale: 14,
      emMapRef,
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
