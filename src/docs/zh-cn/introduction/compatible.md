# 兼容高德原生 SDK

---

`em-map` 能够抛开高德原生 SDK 覆盖大多数场景，但对于部分定制化程度较高的场景而言，可能还是需要引入高德原生 SDK 来支持。这章将介绍如何在 em-map 中使用高德 SDK。


## 实例方式

对于大多数 `em-map` 组件，都有 `init` 这个 `event`，参数为高德的实例，通过这样暴露高德实例的方式，开发者能够非常自由地将原生 SDK 和 em-map 结合起来使用。

这里以 `emfe-amap` 组件举例。`emfe-amap` 比较特殊，它同时还支持一个 `emfe-manager` 属性，通过这个属性，可以在任何地方拿到高德原生 `EmfeMap.Map` 实例。下面的例子，将介绍两种方式的使用。

*若涉及到高德原生 `EmfeMap` 需要注意的点：*

* 确保 `em-map` 的导入名不是 `EmfeMap`，推荐 `import EmMap from 'em-map'` 避免和高德全局的 `EmfeMap` 冲突。
* 若 `eslint` 报错 `EmfeMap is undefined` 之类的错误。请将 `EmfeMap` 配置到 `.eslintrc` 的 `globals` 中。

<vuep template="#example"></vuep>

<script v-pre type="text/x-template" id="example">

  <template>
    <div class="emfe-page-container">
      <emfe-amap vid="amapDemo"  :center="center" :map-manager="amapManager" :zoom="zoom" :events="events" class="emfe-demo">
      </emfe-amap>

      <div class="toolbar">
        <button @click="add()">add marker</button>
      </div>
    </div>
  </template>

  <style>
    .emfe-demo {
      height: 300px;
    }
  </style>

  <script>
    // NPM 方式
    // import { EmfeMapManager } from 'em-map';
    // CDN 方式
    let amapManager = new EmMap.EmfeMapManager();
    module.exports = {
      data: function() {
        return {
          zoom: 12,
          center: [121.59996, 31.197646],
          amapManager,
          events: {
            init(o) {
              let marker = new EmfeMap.Marker({
                position: [121.59996, 31.197646]
              });

              marker.setMap(o);
            }
          }
        };
      },

      methods: {
        add() {
          let o = amapManager.getMap();
          let marker = new EmfeMap.Marker({
            position: [121.59996, 31.177646]
          });

          marker.setMap(o);
        }
      }
    };
  </script>

</script>
