<template></template>
<script>
import registerMixin from '../mixins/register-component';
export default {
  name: 'ElAmapGroundImage',
  mixins: [registerMixin],
  props: [
    'vid',
    'clickable',
    'opacity',
    'url',
    'bounds',
    'visible',
    'events',
    'onceEvents'
  ],
  data() {
    return {
      converters: {},
      handlers: {
        visible(flag) {
          if (flag === false) {
            this.setMap(null);
          }
          else {
            this.setMap(this.amap);
          }
        }
      }
    };
  },
  unmounted() {
    this.amapComponent.setMap(null);
  },
  methods: {
    initComponent(options) {
      this.amapComponent = new AMap.GroundImage(options.url, options.bounds, options);
    }
  }
};
</script>
