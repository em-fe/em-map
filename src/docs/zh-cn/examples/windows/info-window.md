# 信息窗体

## 切换信息窗体

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="emfe-page-container">
      <emfe-amap
        vid="amapDemo"  
        :center="center"
        :zoom="zoom"  
        class="emfe-demo">
        <emfe-emfe-marker v-for="marker in markers" :position="marker.position" :events="marker.events"></emfe-emfe-marker>
        <emfe-emfe-info-window v-for="window in windows" :position="window.position" :visible="window.visible" :content="window.content"></emfe-emfe-info-window>
      </emfe-amap>
    </div>
  </template>

  <style>
    .emfe-demo {
      height: 300px;
    }

    .prompt {
      background: white;
      width: 100px;
      height: 30px;
      text-align: center;
    }
  </style>

  <script>
    module.exports = {
      data: function() {
        return {
          zoom: 16,
          center: [121.59996, 31.197646],
          markers: [],
          windows: []
        };
      },

      mounted() {
        let markers = [];
        let windows = [];

        let num = 10;
        let self = this;

        for (let i = 0 ; i < num ; i ++) {
          markers.push({
            position: [121.59996, 31.197646 + i * 0.001],
            events: {
              click() {
                self.windows.forEach(window => {
                  window.visible = false;
                });

                self.$nextTick(() => {
                  self.windows[i].visible = true;
                });
              }
            }
          });

          windows.push({
            position: [121.59996, 31.197646 + i * 0.001],
            content: `<div class="prompt">${ i }</div>`,
            visible: false
          });
        }

        this.markers = markers;
        this.windows = windows;
      }
    };
  </script>

</script>
