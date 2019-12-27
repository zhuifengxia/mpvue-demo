<template>
  <div class="home">
    <search-bar :disabled="false" @onClick="onSearchBarClick" :hot-search="hotSearch"></search-bar>
    <home-card :data="homeCard"/>
    <home-banner img="http://www.youbaobao.xyz/book/res/bg.jpg" title="mpvue2.0实战多端小程序课程上线啦" sub-title="立即体验"
                 @onClick="onBannerClick"></home-banner>
    <div class="home-book">
      <home-book title="为你推荐" :row="1" :col="3" :data="recommend" mode="col" btn-text="换一批"
                 @onMoreClick="onBookMoreClick" @onBookClick="onHomeBookClick"></home-book>
      <home-book title="免费阅读" :row="2" :col="2" :data="freeRead" mode="row" btn-text="换一批"
                 @onMoreClick="onBookMoreClick" @onBookClick="onHomeBookClick"></home-book>
      <home-book title="当前最热" :row="1" :col="4" :data="hotBook" mode="col" btn-text="换一批"
                 @onMoreClick="onBookMoreClick" @onBookClick="onHomeBookClick"></home-book>
      <home-book title="分类" :row="3" :col="2" :data="category" mode="category" btn-text="查看全部"
                 @onMoreClick="onBookMoreClick" @onBookClick="onHomeBookClick"></home-book>
    </div>

  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'
  import HomeBook from '../../components/home/HomeBook'
  import {getHomeData} from '../../api/index'

  export default {
    components: {HomeBook, HomeBanner, HomeCard, SearchBar},
    data () {
      return {
        hotSearch: '',
        homeCard: {},
        banner: {},
        recommend: [],
        freeRead: [],
        hotBook: [],
        category: []
      }
    },
    mounted () {
      this.getHomeData()
    },
    methods: {
      getHomeData () {
        getHomeData({
          openId: '1234'
        }).then(res => {
          const {
            data: {
              hotSearch: {keyword}, shelf, shelfCount, banner, recommend, freeRead, hotBook, category
            }
          } = res.data
          this.hotSearch = keyword
          this.banner = banner
          this.recommend = recommend
          this.freeRead = freeRead
          this.hotBook = hotBook
          this.category = category
          this.homeCard = {
            bookList: shelf,
            num: shelfCount,
            userInfo: {
              avatar: 'https://www.youbaobao.xyz/mpvue-res/logo.jpg',
              nickname: '一米阳光'
            }
          }
        }).catch(err => {
          console.log('buhoyis' + err)
        })
      },
      onSearchBarClick () {
      },
      onBannerClick () {
        console.log('banner click')
      },
      onBookMoreClick () {
        console.log('onBookMoreClick')
      },
      onHomeBookClick () {
        console.log('onHomeBookClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-book {
    margin-top: 23px;
  }
</style>

