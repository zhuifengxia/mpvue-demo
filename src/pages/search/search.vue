<template>
  <tag-group :value="tags" header-text="热门搜索" btn-text="换一批" @onTagClick="onTagClick"
             @onBtnClick="onBtnClick"></tag-group>
</template>
<script>
  import TagGroup from '../../components/base/TagGroup'

  export default {
    components: {TagGroup},
    data () {
      return {
        tags: [
          'aaa',
          'bbb',
          'ccc',
          'ddd',
          '测试测试测试测试',
          'mmm'
        ]
      }
    },
    methods: {
      onTagClick (text, index) {
        console.log('tag click', text, index)
      },
      onBtnClick () {
        console.log('btn click')
      }
    }
  }
</script>
<style lang="scss" scoped></style>
