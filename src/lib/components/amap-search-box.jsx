import RegisterComponentMixin from '../mixins/register-component';
import { getMapInstance } from '../services/use-instance';

export default {
  name: 'EmAmapSearchBox',
  mixins: [RegisterComponentMixin],
  props: ['searchOption', 'onSearchResult', 'events', 'default'],
  emits: ['on-search-result'],
  setup() {
    const mapInstance = getMapInstance();
    return {
      mapInstance,
    };
  },
  data() {
    return {
      keyword: this.default || '',
      tips: [],
      selectedTip: -1,
      loaded: false
    };
  },
  computed: {
    _autoComplete() {
      if (!this.loaded) { return; }
      return new AMap.Autocomplete(this.searchOption || {});
    },
    _placeSearch() {
      if (!this.loaded) { return; }
      return new AMap.PlaceSearch(this.searchOption || {});
    }
  },
  watch: {
    default(val, oldVal) {
      if (val !== oldVal) {
        this.keyword = val;
      }
    }
  },
  mounted() {
    if (this.mapInstance) {
      this.loaded = true;
      this._onSearchResult = this.onSearchResult || (() => {});
      // register init event
      this.events && this.events.init && this.events.init({
        autoComplete: this._autoComplete,
        placeSearch: this._placeSearch
      });
    }
  },
  methods: {
    autoComplete() {
      if (!this.keyword || !this._autoComplete) { return; }
      this._autoComplete.search(this.keyword, (status, result) => {
        if (status === 'complete') {
          this.tips = result.tips;
        }
      });
    },
    search() {
      this.tips = [];
      if (!this._placeSearch) { return; }
      this._placeSearch.search(this.keyword, (status, result) => {
        if (result && result.poiList && result.poiList.count) {
          const { poiList: { pois } } = result;
          const LngLats = pois.map((poi) => {
            poi.lat = poi.location.lat;
            poi.lng = poi.location.lng;
            return poi;
          });
          this._onSearchResult(LngLats);
          this.$emit('on-search-result', LngLats)
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
    }
  },
  render() {
    const containerProps = {
      class: 'em-vue-search-box-container',
      onKeydown: (ev) => {
        if (ev.keyCode === 38) {
          this.selectTip('down');
        }
        if (ev.keyCode === 40) {
          this.selectTip('up');
        }
      }
    }
    const searchProps = {
      onKeyup: (ev) => {
        if (ev.keyCode === 13) {
          this.search();
        }
      },
      onInput: this.autoComplete,
    };

    const tipsLiNodes = this.tips.map((tipItem, tipIdx) => {
      const liProps = {
        key:tipIdx,
        class: {
          'em-vue-search-selected': tipIdx === this.selectedTip,
        },
        onClick: () => {
          this.changeTip(tipItem);
        },
        onMouseover: () => {
          this.selectedTip = tipIdx;
        },
      }
      return (<li {...liProps}>{ tipItem.name }</li>);
    });

    return (<div
      {...containerProps}
    >
      <div class="em-vue-search-box-wrapper">
        <input
          v-model={this.keyword}
          type="text"
          {...searchProps}
        />
        <span class="em-vue-search-btn" onClick={this.search}>搜索</span>
      </div>
      <div class="em-vue-search-tips">
        <ul>
          { tipsLiNodes }
        </ul>
      </div>
    </div>)
  },
};
