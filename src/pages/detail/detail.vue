<template>
  <div>
    <detail-book :book="book"></detail-book>

    <detail-stat :readers="book.readers" :readerNum="book.readerNum" :rankNum="book.rankNum"
                 :rankAvg="book.rankAvg"></detail-stat>

    <detail-rate :rate-value="book.rateValue" @onRateChange="onRateChange"></detail-rate>

    <detail-contents :contents="contents" @readBook="readBook"></detail-contents>

    <detail-bottom :isInShelf="isInShelf" @handleShelf="handleShelf" @readBook="readBook"></detail-bottom>
  </div>
</template>
<script>
  import DetailBook from '../../components/detail/DetailBook'
  import {bookContents, bookDetail, bookIsInShelf, bookRankSave, bookShelfRemove, bookShelfSave} from '../../api'
  import {getStorageSync} from '../../api/wechat'
  import DetailStat from '../../components/detail/DetailStat'
  import DetailRate from '../../components/detail/DetailRate'
  import DetailContents from '../../components/detail/DetailContents'
  import DetailBottom from '../../components/detail/DetailBottom'

  export default {
    components: {DetailBottom, DetailContents, DetailRate, DetailStat, DetailBook},
    data () {
      return {
        book: {},
        contents: [],
        isInShelf: false
      }
    },
    methods: {
      handleShelf () {
        const openId = getStorageSync('openId')
        const fileName = this.$route.query.fileName
        if (!this.isInShelf) {
          if (openId && fileName) {
            bookShelfSave({openId, fileName}).then(this.getBookIsInShelf)
          }
        } else {
          const vue = this
          mpvue.showModal({
            title: '提示',
            content: `是否确认将《${this.book.title}》移出书架？`,
            success (res) {
              if (res.confirm) {
                if (openId && fileName) {
                  bookShelfRemove({openId, fileName}).then(vue.getBookIsInShelf)
                }
              }
            }
          })
        }
      },
      readBook (href) {
        const qurey = {
          fileName: this.book.fileName,
          opf: this.book.opf
        }
        if (href) {
          const index = href.indexOf('/')
          if (index >= 0) {
            qurey.navigation = href.slice(index + 1)
          } else {
            qurey.navigation = href
          }
        }
        if (this.book && this.book.fileName) {
          this.$router.push({
            path: '/pages/read/mian',
            qurey
          })
        }
      },
      onRateChange (value) {
        const openId = getStorageSync('openId')
        const fileName = this.$route.query.fileName
        if (openId && fileName) {
          bookRankSave({
            openId, fileName, rank: value
          }).then(res => {
            this.getBookDetail()
          })
        }
      },
      getBookDetail () {
        const openId = getStorageSync('openId')
        const fileName = this.$route.query.fileName
        if (openId && fileName) {
          bookDetail({
            openId,
            fileName
          }).then(res => {
            this.book = res.data.data
          })
        }
      },
      getBookContents () {
        const fileName = this.$route.query.fileName
        if (fileName) {
          bookContents({
            fileName
          }).then(res => {
            this.contents = res.data.data
          })
        }
      },
      getBookIsInShelf () {
        const openId = getStorageSync('openId')
        const fileName = this.$route.query.fileName
        if (openId && fileName) {
          bookIsInShelf({
            openId,
            fileName
          }).then(res => {
            const {data} = res.data
            if (data.length === 0) {
              this.isInShelf = false
            } else {
              this.isInShelf = true
            }
          })
        }
      }
    },
    mounted () {
      this.getBookDetail()
      this.getBookContents()
      this.getBookIsInShelf()
    }
  }
</script>
<style lang="scss" scoped>

</style>
