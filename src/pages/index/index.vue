<template>
  <div class="home">
    <SearchBar :disabled="false" @onClick="onSearchBarClick"></SearchBar>
  </div>
</template>

<script>
  import SearchBar from '../../components/home/SearchBar'

  export default {
    components: {SearchBar},
    methods: {
      onSearchBarClick () {
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>

