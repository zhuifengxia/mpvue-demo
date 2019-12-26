<template>
  <div class="home">
    <SearchBar :disabled="false" @onClick="onSearchBarClick"></SearchBar>
    <home-card/>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'
  import HomeCard from '../../components/home/HomeCard'

  export default {
    components: {HomeCard, SearchBar},
    methods: {
      onSearchBarClick () {
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

