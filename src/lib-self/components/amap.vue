<template>
  <div class="w-vue-amap-container">
    <div ref="renderMapNode" class="w-vue-amap"></div>
    <slot></slot>
  </div>
</template>

<script>
import { uuid } from '@fe6/shared';
import { computed, onMounted, nextTick, ref } from 'vue';
import { getMapInstance } from '../use-instance';
import { setMapModal } from '../use-map';
import { emitEvent } from '../mitt';
import CONST from '../constant';

export default {
  name: 'WAmap',
  props: [
    'vid',
    'events',
    'center',
    'zoom',
    'draggEnable',
    'level',
    'zooms',
    'lang',
    'cursor',
    'crs',
    'animateEnable',
    'isHotspot',
    'defaultLayer',
    'rotateEnable',
    'resizeEnable',
    'showIndoorMap',
    'indoorMap',
    'expandZoomRange',
    'dragEnable',
    'zoomEnable',
    'doubleClickZoom',
    'keyboardEnable',
    'jogEnable',
    'scrollWheel',
    'touchZoom',
    'mapStyle',
    'plugin',
    'features',
  ],
  setup(props) {
    const renderMapNode = ref(null);
    let amap = null;

    const plugins = computed(() => {
      let plus = [];
      // amap plugin prefix reg
      const amap_prefix_reg = /^AMap./;

      // parse plugin full name
      const parseFullName = (pluginName) => {
        return amap_prefix_reg.test(pluginName) ? pluginName : `AMap.${pluginName}`;
      };

      // parse plugin short name
      const parseShortName = (pluginName) => {
        return pluginName.replace(amap_prefix_reg, '');
      };

      if (typeof props.plugin === 'string') {
        plus.push({
          pName: parseFullName(props.plugin),
          sName: parseShortName(props.plugin)
        });
      }
      else if (props.plugin instanceof Array) {
        plus = props.plugin.map((oPlugin) => {
          let nPlugin = {};

          if (typeof oPlugin === 'string') {
            nPlugin = {
              pName: parseFullName(oPlugin),
              sName: parseShortName(oPlugin)
            };
          }
          else {
            oPlugin.pName = parseFullName(oPlugin.pName);
            oPlugin.sName = parseShortName(oPlugin.pName);
            nPlugin = oPlugin;
          }

          return nPlugin;
        });
      }

      return plus;
    });

    const addPlugins = () => {
      const _notInjectPlugins = plugins.value.filter(_plugin => !AMap[_plugin.sName]);

      if (!_notInjectPlugins || !_notInjectPlugins.length) { return addMapControls(); }
      return amap.plugin(_notInjectPlugins, addMapControls);
    };

    const renderMap = async() => {
      const mapInstance = getMapInstance();
      if (mapInstance.value && renderMapNode.value) {
        await mapInstance.value.load();
        const elementID = props.vid || uuid();
        renderMapNode.value.id = elementID;
        await nextTick();
        console.log(renderMapNode.value, 'renderMapNode.value');
        amap = new AMap.Map(elementID);
        emitEvent(CONST.AMAP_READY_EVENT, amap);
        if (plugins.value && plugins.value.length) {
          addPlugins();
        }
      }
    };

    onMounted(async() => {
      await renderMap();
    });
    console.log(getMapInstance().value, 'mapInstance');
    return {
      renderMapNode,
      plugins,
    };
  },
};
</script>

<style lang="scss">
.w-vue-amap-container {
  height: 100%;
  .w-vue-amap {
    height: 100%;
  }
}
</style>
