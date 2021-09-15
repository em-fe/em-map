import RegisterComponentMixin from '../mixins/register-component';
import { getMapInstance } from '../services/use-instance';
import { SearchOutlined } from '@ant-design/icons-vue';
import { mapSearchPlaceholder } from '../../constant';
import areaData from '../../json/area-data.json';

export default {
  name: 'EmAmapSearchBox',
  mixins: [RegisterComponentMixin],
  props: ['searchOption', 'onSearchResult', 'events', 'default', 'placeholder'],
  emits: ['on-search-result'],
  components: {
    SearchOutlined
  },
  setup() {
    const mapInstance = getMapInstance();
    return {
      mapInstance,
    };
  },
  data() {
    return {
      keyword: this.default || '',
      placeholders: this.placeholder || mapSearchPlaceholder,
      tips: [],
      selectedTip: -1,
      selectCode: 0,
      loaded: false,
    };
  },
  computed: {
    _autoComplete() {
      if (!this.loaded) { return; }
      return new AMap.Autocomplete(this.searchOption || {});
    },
    _placeSearch() {
      if (!this.loaded) { return; }
      const { selectCode } = this;
      let searchOption = undefined;
      if (selectCode) {
        searchOption = {
          city: selectCode,
          citylimit: true,
        }
      } else {
        searchOption = this.searchOption;
      }
      return new AMap.PlaceSearch(searchOption || {});
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
    autoComplete(e) {
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
            poi.lat = poi.location.Q;
            poi.lng = poi.location.R;
            return poi;
          });
          this._onSearchResult(LngLats, areaData[this.selectCode]);
          this.$emit('on-search-result', LngLats)
        }
        else if (result.poiList === undefined) {
          throw new Error(result);
        }
      });
    },
    changeTip(tip) {
      this.keyword = tip.name;
      this.selectCode = tip.adcode;
      this.search();
    },
    selectTip(type) {
      if (type === 'up' && this.selectedTip > 0) {
        this.selectedTip -= 1;
        this.keyword = this.tips[this.selectedTip].name;
        this.selectCode = this.tips[this.selectedTip].adcode;
      }
      else if (type === 'down' && this.selectedTip + 1 < this.tips.length) {
        this.selectedTip += 1;
        this.keyword = this.tips[this.selectedTip].name;
        this.selectCode = this.tips[this.selectedTip].adcode;
      }
    },
    handleInput(ev) {
      this.keyword = ev.target.value;
      this.autoComplete();
    }
  },
  render() {
    const containerProps = {
      class: 'em-vue-search-box-container',
      onKeydown: (ev) => {
        if (ev.keyCode === 38) {
          this.selectTip('up');
        }
        if (ev.keyCode === 40) {
          this.selectTip('down');
        }
      }
    }
    const searchProps = {
      onKeyup: (ev) => {
        if (ev.keyCode === 13) {
          const tipItem = this.tips[this.selectedTip];
          if (tipItem) {
            this.keyword = tipItem.name;
            this.selectCode = tipItem.adcode;
          }
          this.search();
        }
      },
      // onInput: this.autoComplete,
      onInput: this.handleInput,
    };

    const tipsLiNodes = this.tips.map((tipItem, tipIdx) => {
      const liProps = {
        key:tipIdx,
        class: {
          'em-vue-search-selected': tipIdx === this.selectedTip,
        },
        onClick: () => {
          console.log(tipItem);
          this.changeTip(tipItem);
        },
        onMouseover: () => {
          this.selectedTip = tipIdx;
        },
      }
      return (<li {...liProps}>{ tipItem.name }<span>{ tipItem.district }</span></li>);
    });

    return (<div
      {...containerProps}
    >
      <div class="em-vue-search-box-wrapper">
        <input
          placeholder={this.placeholders}
          value={this.keyword}
          type="text"
          {...searchProps}
        />
        <span class="em-vue-search-btn"><SearchOutlined /></span>
      </div>
      <div class="em-vue-search-tips">
        <ul>
          { tipsLiNodes }
        </ul>
      </div>
    </div>)
  },
};
