<template>
<div class="emfe-vue-emfe-container">
    <div class="emfe-vue-amap"></div>
    <slot></slot>
</div>
</template>
<script>
   import guid from '../utils/guid';
   import CONST from '../utils/constant';
   import { lngLatTo, toLngLat, toPixel } from '../utils/convert-helper';
   import registerMixin from '../mixins/register-component';
   import {lazyEmfeMapApiLoaderInstance} from '../services/injected-emfe-api-instance';
   export default {
     name: 'emfe-amap',
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
       'amapManager'  // 地图管理 manager
     ],

     beforeCreate() {
       this._loadPromise = lazyEmfeMapApiLoaderInstance.load();
     },

     destroyed() {
       this.$amap && this.$amap.destroy();
     },

     computed: {
       /**
        * convert plugin prop from 'plugin' to 'plugins'
        * unify plugin options
        * @return {Array}
        */
       plugins() {
         let plus = [];
         // amap plugin prefix reg
         const amap_prefix_reg = /^EmfeMap./;

         // parse plugin full name
         const parseFullName = (pluginName) => {
           return amap_prefix_reg.test(pluginName) ? pluginName : 'EmfeMap.' + pluginName;
         };

         // parse plugin short name
         const parseShortName = (pluginName) => {
           return pluginName.replace(amap_prefix_reg, '');
         };

         if (typeof this.plugin === 'string') {
           plus.push({
             pName: parseFullName(this.plugin),
             sName: parseShortName(this.plugin)
           });
         } else if (this.plugin instanceof Array) {
           plus = this.plugin.map(oPlugin => {
             let nPlugin = {};

             if (typeof oPlugin === 'string') {
               nPlugin = {
                 pName: parseFullName(oPlugin),
                 sName: parseShortName(oPlugin)
               };
             } else {
               oPlugin.pName = parseFullName(oPlugin.pName);
               oPlugin.sName = parseShortName(oPlugin.pName);
               nPlugin = oPlugin;
             }

             return nPlugin;
           });
         }

         return plus;
       }
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
             this.setStatus({zoomEnable: flag});
           },
           dragEnable(flag) {
             this.setStatus({dragEnable: flag});
           },
           rotateEnable(flag) {
             this.setStatus({rotateEnable: flag});
           }
         }
       };
     },

     mounted() {
       this.createMap();
     },

     addEvents() {
       this.$amapComponent.on('moveend', () => {
         let centerLngLat = this.$amapComponent.getCenter();
         this.center = [centerLngLat.getLng(), centerLngLat.getLat()];
       });
     },

     methods: {
       addPlugins() {
         let _notInjectPlugins = this.plugins.filter(_plugin => !EmfeMap[_plugin.sName]);

         if (!_notInjectPlugins || !_notInjectPlugins.length) return this.addMapControls();
         return this.$amapComponent.plugin(_notInjectPlugins, this.addMapControls);
       },

       addMapControls() {
         if (!this.plugins || !this.plugins.length) return;

         //  store plugin instances
         this.$plugins = this.$plugins || {};

         this.plugins.forEach(_plugin => {
           let realPlugin = this.convertEmfeMapPluginProps(_plugin);
           this.$plugins[realPlugin.pName] = new EmfeMap[realPlugin.sName](realPlugin);

           // add plugin into map
           this.$amapComponent.addControl(this.$plugins[realPlugin.pName]);

           // register plugin event
           if (_plugin.events) {
             // invoke init callback
             if (realPlugin.events.init) {
               realPlugin.events.init(this.$plugins[realPlugin.pName]);
             }

             for (let k in _plugin.events) {
               let v = _plugin.events[k];
               if (k === 'init') continue;
               EmfeMap.event.addListener(this.$plugins[realPlugin.pName], k, v);
             }
           }
         });
       },

       /**
        * parse plugin
        * @param  {Object}
        * @return {Object}
        */
       convertEmfeMapPluginProps(plugin) {

         if (typeof plugin === 'object' && plugin.pName) {
           switch (plugin.pName) {
             case 'EmfeMap.ToolBar': {
               // parse offset
               if (plugin.offset && plugin.offset instanceof Array) {
                 plugin.offset = toPixel(plugin.offset);
               }
               break;
             }
             case 'EmfeMap.Scale': {
               // parse offset
               if (plugin.offset && plugin.offset instanceof Array) {
                 plugin.offset = toPixel(plugin.offset);
               }
               break;
             }
           }
           return plugin;
         } else {
           return '';
         }
       },

       setStatus(option) {
         this.$amap.setStatus(option);
       },

       createMap() {
         this._loadPromise.then(() => {
           let mapElement = this.$el.querySelector('.emfe-vue-amap');
           const elementID = this.vid || guid();
           mapElement.id = elementID;
           this.$amap = this.$amapComponent = new EmfeMap.Map(elementID, this.convertProps());
           if (this.amapManager) this.amapManager.setMap(this.$amap);
           this.$emit(CONST.AMAP_READY_EVENT, this.$amap);
           this.$children.forEach(component => {
             component.$emit(CONST.AMAP_READY_EVENT, this.$amap);
           });
           if (this.plugins && this.plugins.length) {
             this.addPlugins();
           }
         });
       },
       $$getCenter() {
         return lngLatTo(this.center);
       }
     }
   };
</script>

<style lang="scss">
.emfe-vue-emfe-container {
  height: 100%;
.emfe-vue-amap {
    height: 100%;
  }
}
</style>
