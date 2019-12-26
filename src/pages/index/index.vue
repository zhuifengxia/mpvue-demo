<template>
  <div class="home">
    <SearchBar :disabled="false" @onClick="onSearchBarClick"></SearchBar>
    <home-card/>
    <home-banner img="http://www.youbaobao.xyz/book/res/bg.jpg" title="mpvue2.0实战多端小程序课程上线啦" sub-title="立即体验"
                 @onClick="onBannerClick"></home-banner>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import HomeCard from '../../components/home/HomeCard'
  import HomeBanner from '../../components/home/HomeBanner'

  export default {
    components: {HomeBanner, HomeCard, SearchBar},
    methods: {
      onSearchBarClick () {
      },
      onBannerClick () {
        console.log('banner click')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

