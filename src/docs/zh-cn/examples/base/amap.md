# 地图实例

## 点击地图获取经纬度和具体地址

如果需要坐标转地址服务，也就是下面用到的 `Geocoder` ，请注意在地图初始化的时候要记得引入：

```javascript
window.EmMap.initEmfeMapApiLoader({
  key: 'YOUR_CODE',
  plugin: [... 'Geocoder']
});
```

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="emfe-page-container">
      <emfe-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        class="emfe-demo"
        :events="events">
      </emfe-amap>
      <div class="toolbar">
        position: [{{ lng }}, {{ lat }}] address: {{ address }}
      </div>
    </div>
  </template>

  <style>
    .emfe-demo {
      height: 300px;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        let self = this;

        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          address: '',
          events: {
            click(e) {
              let { lng, lat } = e.lnglat;
              self.lng = lng;
              self.lat = lat;

              // 这里通过高德 SDK 完成。
              var geocoder = new EmfeMap.Geocoder({
                radius: 1000,
                extensions: "all"
              });        
              geocoder.getAddress([lng ,lat], function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  if (result && result.regeocode) {
                    self.address = result.regeocode.formattedAddress;
                    self.$nextTick();
                  }
                }
              });        
            }
          },
          lng: 0,
          lat: 0
        };
      }
    };
  </script>

</script>
