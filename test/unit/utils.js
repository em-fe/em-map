// import Vue from 'Vue';
import EmMap from '../../src/lib';
// Vue.use(EmMap);
// initAMap();

export function initAMap(options) {
  EmMap.initAMapApiLoader({
    key: '608d75903d29ad471362f8c58c550daf',
    plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor', 'Geolocation', 'Geocoder', 'MarkerClusterer'],
    ...options
  });
}
