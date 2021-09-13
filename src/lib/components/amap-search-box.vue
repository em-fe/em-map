<template>
  <div
    class="el-vue-search-box-container"
    @keydown.up="selectTip('up')"
    @keydown.down="selectTip('down')"
  >
    <div class="search-box-wrapper">
      <input
        v-model="keyword"
        :placeholder="placeholder"
        type="text"
        @keyup.enter="search"
        @input="autoComplete"
      />
      <!-- <span class="search-btn" @click="search">搜索</span> -->
      <span class="search-btn" @click="search"><SearchOutlined /></span>
    </div>
    <div class="search-tips">
      <ul>
        <li
          v-for="(tip, index) in tips"
          :key="index"
          :class="{ 'autocomplete-selected': index === selectedTip }"
          @click="changeTip(tip)"
          @mouseover="selectedTip = index"
        >
          {{ tip.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
.el-vue-search-box-container {
  position: relative;
  width: 100%;
  height: 32px;
  line-height: 32px;
  background: #fff;
  z-index: 10;
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: "tnum";
  display: inline-block;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;

  .search-box-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    input {
      flex: 1;
      height: 20px;
      line-height: 20px;
      letter-spacing: 0.5px;
      font-size: 14px;
      text-indent: 10px;
      box-sizing: border-box;
      border: none;
      outline: none;
    }

    .search-btn {
      position: absolute;
      right: 14px;
      top: 0;
      color: #666;
      // width:
      // position: absolute;
      // right: 0;
      // top: -1px;
      // width: 64px;
      // height: 32px;
      // color: #fff;
      // font-size: 14px;
      // font-family: "PingFangSC-Regular";
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // cursor: pointer;
      // background: #1890ff;
    }
  }

  .search-tips {
    position: absolute;
    top: 100%;
    border: 1px solid #dbdbdb;
    background: #fff;
    overflow: auto;

    ul {
      padding: 0;
      margin: 0;

      li {
        height: 40px;
        line-height: 40px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        padding: 0 10px;
        cursor: pointer;

        &.autocomplete-selected {
          background: #eee;
        }
      }
    }
  }
}
</style>
<script>
import RegisterComponentMixin from '../mixins/register-component';
import { getMapInstance, getAMapComponent } from '../services/use-instance';
import { SearchOutlined } from '@ant-design/icons-vue';
export default {
  name: 'ElAmapSearchBox',
  components: {
    SearchOutlined,
  },
  mixins: [RegisterComponentMixin],
  props: ['searchOption', 'onSearchResult', 'events', 'default', 'placeholder'],
  setup() {
    const mapInstance = getMapInstance();
    const aMapComponent = getAMapComponent();
    return {
      mapInstance,
      aMapComponent,
    };
  },
  data() {
    return {
      keyword: this.default || '',
      placeholder: this.placeholder || '请输入具体位置',
      tips: [],
      selectedTip: -1,
      loaded: false,
    };
  },
  computed: {
    _autoComplete() {
      if (!this.loaded) {
        return;
      }
      return new AMap.Autocomplete(this.searchOption || {});
    },
    _placeSearch() {
      if (!this.loaded) {
        return;
      }
      return new AMap.PlaceSearch(this.searchOption || {});
    },
  },
  watch: {
    default(val, oldVal) {
      if (val !== oldVal) {
        this.keyword = val;
      }
    },
  },
  mounted() {
    if (this.mapInstance) {
      this.loaded = true;
      this._onSearchResult = this.onSearchResult;
      // register init event
      this.events
        && this.events.init
        && this.events.init({
          autoComplete: this._autoComplete,
          placeSearch: this._placeSearch,
        });
    }
  },
  methods: {
    autoComplete() {
      if (!this.keyword || !this._autoComplete) {
        return;
      }
      this._autoComplete.search(this.keyword, (status, result) => {
        if (status === 'complete') {
          this.tips = result.tips;
        }
      });
    },
    search() {
      this.tips = [];
      if (!this._placeSearch) {
        return;
      }
      this._placeSearch.search(this.keyword, (status, result) => {
        if (result && result.poiList && result.poiList.count) {
          const {
            poiList: { pois },
          } = result;
          const LngLats = pois.map((poi) => {
            poi.lat = poi.location.lat;
            poi.lng = poi.location.lng;
            return poi;
          });
          this._onSearchResult(LngLats);
        }
        else if (result.poiList === undefined) {
          throw new Error(result);
        }
      });
    },
    changeTip(tip) {
      this.keyword = tip.name;
      this.search();
    },
    selectTip(type) {
      if (type === 'up' && this.selectedTip > 0) {
        this.selectedTip -= 1;
        this.keyword = this.tips[this.selectedTip].name;
      }
      else if (type === 'down' && this.selectedTip + 1 < this.tips.length) {
        this.selectedTip += 1;
        this.keyword = this.tips[this.selectedTip].name;
      }
    },
  },
};
</script>
