<template>
  <div>
    <shelf-user-info :user-info="userInfo" :read-day="readDay" :num="shelfList.length"></shelf-user-info>
    <shelf-list :shelf-list="shelfList"></shelf-list>
  </div>
</template>
<script>
  import ShelfUserInfo from '../../components/shelf/ShelfUserInfo'
  import ShelfList from '../../components/shelf/ShelfList'
  import {getStorageSync} from '../../api/wechat'
  import {bookIsInShelf, userDay} from '../../api'

  export default {
    components: {ShelfList, ShelfUserInfo},
    data () {
      return {
        userInfo: {},
        readDay: 0,
        shelfList: []
      }
    },
    onShow () {
      this.userInfo = getStorageSync('userInfo')
      const openId = getStorageSync('openId')
      userDay({openId}).then(res => {
        this.readDay = res.data.data.day
      })
      bookIsInShelf({openId}).then(res => {
        this.shelfList = res.data.data
        this.shelfList.push({})
      })
    }
  }
</script>
<style lang="scss" scoped></style>
