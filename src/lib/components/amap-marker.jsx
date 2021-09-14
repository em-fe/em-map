import registerMixin from '../mixins/register-component';
import { lngLatTo, pixelTo } from '../utils/convert-helper';
export default {
  name: 'EmAmapMarker',
  mixins: [registerMixin],
  props: [
    'vid',
    'position',
    'offset',
    'icon',
    'content',
    'topWhenClick',
    'bubble',
    'draggable',
    'raiseOnDrag',
    'cursor',
    'visible',
    'zIndex',
    'angle',
    'autoRotation',
    'animation',
    'shadow',
    'title',
    'clickable',
    'shape',
    'extData',
    'label',
    'events',
    'onceEvents'
  ],
  data() {
    return {
      converters: {
        shape(options) {
          return new AMap.MarkerShape(options);
        },
        shadow(options) {
          return new AMap.Icon(options);
        }
      },
      handlers: {
        zIndex(index) {
          this.setzIndex(index);
        },
        visible(flag) {
          flag === false ? this.hide() : this.show();
        }
      }
    };
  },
  methods: {
    initComponent(options) {
      if (this.position) {
        options.position = this.position;
      }
      this.amapComponent = new AMap.Marker(options);
    },
    $$getExtData() {
      return this.amapComponent.getExtData();
    },
    $$getPosition() {
      return lngLatTo(this.amapComponent.getPosition());
    },
    $$getOffset() {
      return pixelTo(this.amapComponent.getOffset());
    }
  },
  render() {
    console.log('marker');
    return null
  },
};
