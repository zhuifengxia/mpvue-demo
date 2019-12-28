<template>
  <div>
    <home-book :row="category.length/2" :col="2" :data="category" mode="category" :show-button="false"
               :show-title="false" @onBookClick="oncategoryClick"></home-book>
  </div>
</template>
<script>
  import HomeBook from '../../components/home/HomeBook'
  import {categoryList} from '../../api'

  export default {
    components: {HomeBook},
    data () {
      return {
        category: []
      }
    },
    methods: {
      oncategoryClick (category) {
        this.$router.push({
          path: '/pages/list/main',
          query: {
            key: 'categoryId', text: category.category, title: category.categoryText
          }
        })
      }
    },
    mounted () {
      categoryList().then(res => {
        this.category = res.data.data
      })
    }
  }
</script>
<style lang="scss" scoped></style>
