import { onMounted, computed, ref } from 'vue';
import guid from '../utils/guid';
import CONST from '../utils/constant';
import { lngLatTo, toLngLat, toPixel } from '../utils/convert-helper';
import registerMixin from '../mixins/register-component';
import { getMapInstance } from '../services/use-instance';
import { emitEvent } from '../mixins/mitt';

export default {
  name: 'EmAmap',
  mixins: [registerMixin],
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
    'amapManager' // 地图管理 manager
  ],

  setup(props) {
    const amapNode = ref(null);
    let amapComponent = null;
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
      return amapComponent.plugin(_notInjectPlugins, addMapControls);
    };
    const renderMap = async () => {
      const mapInstance = getMapInstance();
      if (mapInstance.value && amapNode.value) {
        await mapInstance.value.load();
        const elementID = props.vid || guid();
        amapNode.value.id = elementID;
        amap = amapComponent = new AMap.Map(elementID, {
          zoom: props.zoom || 14
        });
        if (props.center) { amap.setCenter(props.center); }
        if (props.amapManager) { props.amapManager.setMap(amap); }
        emitEvent('AMAP_READY_EVENT', amap);
        // TODO [fix] 删除了 $children
        // https://v3.cn.vuejs.org/guide/migration/children.html#_2-x-%E8%AF%AD%E6%B3%95
        //  this.$children.forEach(component => {
        //    emitEvent(CONST.AMAP_READY_EVENT, this.amap);
        //  });
        if (plugins.value && plugins.value.length) {
          addPlugins();
        }
      }
    };

    onMounted(async () => {
      await renderMap();
    });

    return {
      amapNode,
      plugins,
    };
  },

  data() {
    return {
      converters: {
        center(arr) {
          return toLngLat(arr);
        }
      },
      handlers: {
        zoomEnable(flag) {
          this.setStatus({ zoomEnable: flag });
        },
        dragEnable(flag) {
          this.setStatus({ dragEnable: flag });
        },
        rotateEnable(flag) {
          this.setStatus({ rotateEnable: flag });
        }
      }
    };
  },

  unmounted() {
    this.amap && this.amap.destroy();
  },

  addEvents() {
    this.amapComponent.on('moveend', () => {
      const centerLngLat = this.amapComponent.getCenter();
      this.center = [centerLngLat.getLng(), centerLngLat.getLat()];
    });
  },

  methods: {

    addMapControls() {
      if (!this.plugins || !this.plugins.length) { return; }

      //  store plugin instances
      this.$plugins = this.$plugins || {};

      this.plugins.forEach((_plugin) => {
        const realPlugin = this.convertAMapPluginProps(_plugin);
        this.$plugins[realPlugin.pName] = new AMap[realPlugin.sName](realPlugin);

        // add plugin into map
        this.amapComponent.addControl(this.$plugins[realPlugin.pName]);

        // register plugin event
        if (_plugin.events) {
          // invoke init callback
          if (realPlugin.events.init) {
            realPlugin.events.init(this.$plugins[realPlugin.pName]);
          }

          for (const k in _plugin.events) {
            const v = _plugin.events[k];
            if (k === 'init') { continue; }
            AMap.event.addListener(this.$plugins[realPlugin.pName], k, v);
          }
        }
      });
    },

    /**
        * parse plugin
        * @param  {Object}
        * @return {Object}
        */
    convertAMapPluginProps(plugin) {
      if (typeof plugin === 'object' && plugin.pName) {
        switch (plugin.pName) {
          case 'AMap.ToolBar': {
            // parse offset
            if (plugin.offset && plugin.offset instanceof Array) {
              plugin.offset = toPixel(plugin.offset);
            }
            break;
          }
          case 'AMap.Scale': {
            // parse offset
            if (plugin.offset && plugin.offset instanceof Array) {
              plugin.offset = toPixel(plugin.offset);
            }
            break;
          }
        }
        return plugin;
      }
      else {
        return '';
      }
    },

    setStatus(option) {
      this.amap.setStatus(option);
    },

    $$getCenter() {
      return lngLatTo(this.center);
    }
  },
  render() {
    return (<div class="em-vue-amap-container">
    <div class="em-vue-amap" ref="amapNode"></div>
    {this.$slots.default && this.$slots.default()}
  </div>)
  }
};