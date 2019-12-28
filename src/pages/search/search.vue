<template>
  <div>
    <search-bar :focus="searchFocus" :hot-search="hotSearchKeyword" @onChange="onChange"
                @onClear="onClear" @onConfirm="onConfirm" ref="searchBar"></search-bar>

    <tag-group header-text="热门搜索" btn-text="换一批" @onBtnClick="changeHotSearch" @onTagClick="showBookDetail"
               :value="hotSearchArray" v-if="hotSearchArray.length>0&&!showList"></tag-group>

    <tag-group header-text="历史搜索" btn-text="清空" @onBtnClick="clearHistorySearch" @onTagClick="searchKeyWord"
               :value="historySearch" v-if="historySearch.length>0&&!showList"></tag-group>

    <search-list :data="searchList" v-if="showList"></search-list>
  </div>

</template>
<script>
  import SearchList from '../../components/search/SearchList'
  import SearchBar from '../../components/home/SearchBar'
  import TagGroup from '../../components/base/TagGroup'
  import {getStorageSync, setStorageSync, showToast} from '../../api/wechat'
  import {search, hotSearch} from '../../api/index'

  const KEY_HISTORY_SEARCH = 'historySearch'
  export default {
    components: {SearchBar, SearchList, TagGroup},
    computed: {
      showList () {
        const keys = Object.keys(this.searchList)
        return keys.length > 0
      },
      hotSearchArray () {
        const _hotSearch = []
        this.hotSearch.forEach(o => _hotSearch.push(o.title))
        return _hotSearch
      }
    },
    data () {
      return {
        hotSearch: [],
        hotSearchKeyword: '',
        historySearch: [],
        searchList: {},
        searchFocus: true,
        openId: '',
        page: 1
      }
    },
    methods: {
      onConfirm (keyword) {
        if (!keyword || keyword.trim().length === 0) {
          keyword = this.hotSearchKeyword
          this.$refs.searchBar.setValue(keyword)
        }
        this.onSearch(keyword)
        if (!this.historySearch.includes(keyword)) {
          this.historySearch.push(keyword)
          setStorageSync(KEY_HISTORY_SEARCH, this.historySearch)
        }
        this.searchFocus = false
      },
      onClear () {
        this.searchList = {}
      },
      onChange (keyword) {
        if (!keyword || keyword.trim().length === 0) {
          this.searchList = {}
          return
        }
        this.page = 1
        this.onSearch(keyword)
      },
      onSearch (keyword) {
        search({
          keyword, openId: this.openId, page: this.page
        }).then(res => {
          if (this.page > 1) {
            const {book} = res.data.data
            if (book && book.length > 0) {
              this.searchList.book.push(...book)
            } else {
              showToast('没有更多数据了')
            }
          } else {
            this.searchList = res.data.data
          }
        })
      },
      searchKeyWord (text) {
        this.$refs.searchBar.setValue(text)
        this.onSearch(text)
      },
      clearHistorySearch () {
        this.historySearch = []
        setStorageSync(KEY_HISTORY_SEARCH, [])
      },
      showBookDetail (text, index) {
        console.log('show book detail')
      },
      changeHotSearch () {
        hotSearch().then(res => {
          this.hotSearch = res.data.data
        })
      }
    },
    mounted () {
      this.page = 1
      this.openId = getStorageSync('openId')
      hotSearch().then(res => {
        this.hotSearch = res.data.data
      })
      this.hotSearchKeyword = this.$route.query.hotSearch
      this.historySearch = getStorageSync(KEY_HISTORY_SEARCH) || []
    },
    onPageScroll () {
      if (this.searchFocus) {
        this.searchFocus = false
      }
    },
    onReachBottom () {
      if (this.showList) {
        this.page++
        const searchWord = this.$refs.searchBar.getValue()
        this.onSearch(searchWord)
      }
    }
  }
</script>
<style lang="scss" scoped></style>
