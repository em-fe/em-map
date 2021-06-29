<template>
</template>

<script>
import { onMounted, nextTick } from 'vue';
import { getMapInstance } from '../use-instance';

export default {
  name: 'WAmapMarker',
  props: [
  ],
  setup(props) {
    const renderMap = async () => {
      const mapInstance = getMapInstance();
      if (mapInstance.value) {
        await mapInstance.value.load();
        await nextTick();
        console.log(mapInstance.value, 'mapInstance.value');
        var marker = new AMap.Marker({
            position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '北京'
        });
        console.log(AMap.Marker, 'AMap.Marker');
      }
    };

    onMounted(async () => {
      await renderMap();
    });
    // onMounted(async () => {
    //   // var marker = new AMap.Marker({
    //   //     position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //   //     title: '北京'
    //   // });
    //   console.log(AMap,'AMap.Marker');
    // });

    // 将创建的点标记添加到已有的地图实例：
    // map.add(marker);

    // // 移除已创建的 marker
    // map.remove(marker);
  },
}
</script>
