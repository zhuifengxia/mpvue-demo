<template>
  <div class="search-bar">
    <div class="search-bar-wrapper">
      <van-icon class="search" name="search" size="16px" color="#858c96"></van-icon>
      <input class="search-bar-input"/>
      <van-icon class="clear" name="clear" size="16px" color="#858c96"></van-icon>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .search-bar {
    padding: 15px 15.5px;
  }

  .search-bar-wrapper {
    display: flex;
    height: 40px;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    background-color: #f5f7f9;
    border-radius: 20px;
    padding: 12px 17px;
  }

  .search-bar-input {
    flex: 1;
    margin: 0 8px;
  }

  .search, .clear {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>

