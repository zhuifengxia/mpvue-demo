import {getOpenId} from './index'

export function getSetting (auth, onSuccess, onFail) {
  mpvue.getSetting({
    success (res) {
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
      console.log(res)
    },
    fail (err) {
      console.log(err)
    }
  })
}

export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success (res) {
      let {userInfo} = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail (err) {
      console.log(err)
    }
  })
}

export function setStorageSync (key, data) {
  mpvue.setStorageSync(key, data)
}

export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpenId (callback) {
  mpvue.login({
    success (res) {
      if (res.code) {
        const {code} = res
        getOpenId(code).then(res => {
          let {data: {data: {openid}}} = res
          setStorageSync('openId', openid)
          callback && callback(openid)
        }).catch(err => {
          setStorageSync('openId', '1234')
          callback && callback(getStorageSync('openId'))
          console.log(err)
        })
      } else {
        console.log(res)
      }
    },
    fail (err) {
      console.log(err)
    }
  })
}

export function showLoading (title) {
  mpvue.showLoading({
    title,
    mask: true
  })
}

export function hideLoading () {
  mpvue.hideLoading()
}

export function showToast (title) {
  mpvue.showToast({
    title: title,
    duration: 2000
  })
}
