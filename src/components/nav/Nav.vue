<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div>
    <Navcomp
      :scroll-top-prop="scrollTop"
      :is-home-prop="isHome"
      :to-path-prop="toPath"
      class="clearfix"
      @clickLogo="clickLogo"
      @changeLange="changeLange"
      @logout="logout"
      @beforeLogout="beforeLogout"
      :json-data-prop="jsonData"
      :if-guest-prop="ifGuest"
      :user-name-prop="userName"
      :user-center-page-prop="userCenterPage"
      :nav-bgcolor-prop="navBgcolor"
      :nav-menu-fontsize-prop="navMenuFontsize"
    />
  </div>
</template>

<script>
import NavData from '../../data/NavData.js'
import NavDataCn from '../../data/NavDataCn.js'
import Navcomp from 'eg-view/src/components/EgNav.vue'
import { user } from '../../tools/request.js'
import { PROXY_PREFIX_CURRENTSERVER, PLATFORMNAME_EG } from '../../tools/constant.js'
import { common } from '../../tools/common.js'
export default {
  name: 'Navgation',
  components: {
    Navcomp
  },
  data () {
    return {
      scrollTop: 0,
      isHome: true,
      toPath: '/index',
      ifGuest: true,
      loginPage: '',
      userCenterPage: '',
      forceModifyPwPage: '',
      jsonData: [],
      language: '',
      smallMenu: false,
      userName: '',
      wsSocketConn: null,
      wsMsgSendInterval: null,
      manualLoggout: false,
      navBgcolor: 'transparent',
      navMenuFontsize: 20
    }
  },
  mounted () {
    window.addEventListener('message', (event) => {
      var data = event.data
      if (data.cmd === 'iframeLanguageChange') {
        let lang = data.params.lang
        this.changeLang(lang)
      }
    })
    this.language = localStorage.getItem('language') || 'cn'
    if (this.language === 'cn') {
      this.jsonData = NavDataCn
    } else {
      this.jsonData = NavData
    }
    this.$i18n.locale = this.language
    this.getuserInfo()
  },
  beforeDestroy () {
    clearTimeout(this.wsMsgSendInterval)
    this.wsMsgSendInterval = null
  },
  methods: {
    clickLogo () {
      this.$router.push('/')
    },
    changeLange () {
      this.language = localStorage.getItem('language') || 'cn'
      if (this.language === 'cn') {
        this.language = 'en'
        this.jsonData = NavData
      } else {
        this.language = 'cn'
        this.jsonData = NavDataCn
      }
      this.$i18n.locale = this.language
      localStorage.setItem('language', this.language)
      this.getuserInfo()
    },
    getuserInfo () {
      user.getUserInfo().then(res => {
        this.userName = res.data.userName
        sessionStorage.setItem('userId', res.data.userId)
        sessionStorage.setItem('access_token', res.data.accessToken)
        sessionStorage.setItem('isSecureBackend', res.data.isSecureBackend)
        this.loginPage = res.data.loginPage
        this.userCenterPage = res.data.userCenterPage
        this.forceModifyPwPage = res.data.forceModifyPwPage
        if (res.data.userName !== 'guest') {
          this.ifGuest = false
        }
        if (this.jumpToForceModifyPw()) {
          return
        }
        if (res.data.authorities.indexOf('ROLE_MECM_GUEST') < 0) {
          sessionStorage.setItem('rlp', 418)
        } else {
          sessionStorage.removeItem('rlp')
        }
        if (res.data.authorities.indexOf('ROLE_MECM_ADMIN') < 0) {
          this.jsonData.splice(4, 1)
        }
        this.startHttpSessionInvalidListener(res.data.sessId)
        this.sendPageLoadedMsg(res.data.userId)
      })
      this.switchLan()
    },
    switchLan () {
      // Switch language
      let lanIndex = window.location.href.search('language')
      if (lanIndex > 0) {
        let lan = window.location.href.substring(lanIndex + 9, lanIndex + 11)
        this.language = lan
        localStorage.setItem('language', this.language)
        this.$i18n.locale = this.language
      }
    },
    sendPageLoadedMsg (userId) {
      if (window.parent !== window) {
        let _possibleTopWinOriginUrlList = []
        if (PROXY_PREFIX_CURRENTSERVER) {
          _possibleTopWinOriginUrlList.push(window.location.origin)
        } else {
          _possibleTopWinOriginUrlList.push(common.getPlatformUrlPrefix(PLATFORMNAME_EG))
        }
        _possibleTopWinOriginUrlList.forEach(_possibleTopWinOriginUrl => {
          window.top.postMessage({
            cmd: 'subpageLoaded',
            params: { userId }
          }, _possibleTopWinOriginUrl)
        })
      }
    },
    startHttpSessionInvalidListener (sessId) {
      if (typeof (WebSocket) === 'undefined') {
        return
      }
      let _wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://'
      this.wsSocketConn = new WebSocket(_wsProtocol + window.location.host + PROXY_PREFIX_CURRENTSERVER + '/wsserver/' + sessId)
      let _thisObj = this
      this.wsSocketConn.onmessage = function (msg) {
        clearTimeout(_thisObj.wsMsgSendInterval)
        _thisObj.wsMsgSendInterval = null
        if (_thisObj.manualLoggout) {
          return
        }
        let _hintInfo = _thisObj.$t('nav.hsInvalidHint')
        if (msg && msg.data) {
          if (msg.data === '1') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForTimeout') + _hintInfo
          } else if (msg.data === '2') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForLogout') + _hintInfo
          } else if (msg.data === '3') {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForServerStopped') + _hintInfo
          } else {
            _hintInfo = _thisObj.$t('nav.hsInvalidHintForTimeout') + _hintInfo
          }
        }
        if (_thisObj.ifGuest) {
          window.location.reload()
          return
        }
        _thisObj.$confirm(_hintInfo, _thisObj.$t('common.warning'), {
          confirmButtonText: _thisObj.$t('nav.reLogin'),
          cancelButtonText: _thisObj.$t('nav.refresh'),
          type: 'warning'
        }).then(() => {
          _thisObj.logout()
        }).catch(() => {
          window.location.reload()
        })
      }
      this.wsMsgSendInterval = setInterval(() => {
        this.wsSocketConn.send('')
      }, 10000)
    },
    os () {
      let UserAgent = navigator.userAgent.toLowerCase()
      return {
        isWindows: /windows/.test(UserAgent),
        isMac: /mac/.test(UserAgent)
      }
    },
    openNav () {
      this.smallMenu = !this.smallMenu
    },
    closeMenu (data) {
      this.smallMenu = data
    },
    languageConfirmEn () {
      this.language = 'cn'
      this.lang = 'English'
      this.jsonData = NavDataCn
    },
    languageConfirmCn () {
      this.language = 'en'
      this.lang = '简体中文'
      this.jsonData = NavData
    },
    changeLang (lang) {
      if (lang === 'cn' || this.language === 'en') {
        this.languageConfirmEn()
      } else {
        this.languageConfirmCn()
      }
      this.$i18n.locale = this.language
      localStorage.setItem('language', this.language)
      let appDom = document.getElementById('app')
      if (this.language === 'cn') {
        appDom.style.fontFamily = 'Huaweisans, Arial, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
      } else {
        if (this.os.isMac) {
          appDom.style.fontFamily = 'PingFang, FZLTXHJW, Hiragino Sans GB, Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
        } else {
          appDom.style.fontFamily = 'Microsoft YaHei, FZLTXHJW, Microsoft JhengHei, sans-serif'
        }
      }
    },
    beforeLogout () {
      this.$confirm(this.$t('nav.logoutTip'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    jumpLogoTo () {
      this.$router.push('/')
    },
    logout () {
      this.manualLoggout = true
      sessionStorage.clear()
      user.logout().then(res => {
        this.enterLoginPage()
      }).catch(() => {
        this.enterLoginPage()
      })
    },
    enterLoginPage () {
      window.location.href = this.loginPage + '&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER + '&lang=' + this.language
    },
    openUserAccountCenter () {
      window.open(this.userCenterPage + '?lang=' + this.language)
    },
    jumpToForceModifyPw () {
      if (this.ifGuest) {
        return false
      }
      if (this.forceModifyPwPage) {
        window.location.href = this.forceModifyPwPage
        return true
      }

      return false
    }
  }
}
</script>

<style lang='less' scoped>
.navgation{
  padding: 0 10%;
  background: #5e40c8;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: 64px;
  top: 0px;
  width: 100%;
  position: fixed;
  z-index: 999;
  .logo{
    height:64px;
    width:430px;
    line-height: 65px;
    img{
      position: relative;
      top: 13px;
      width: 147px;
      height: 40px;
    }
    span{
      position: relative;
      top:-28px;
      font-size: 16px;
      color:#ffffff;
      left:20px;
      cursor:pointer;
    }
    span.blue{
      color:#409EFF;
    }
  }
  .language {
    display: inline-block;
    line-height: 85px;
    font-size: 14px;
    color: #6c92fa;
    cursor: pointer;
    span {
      width:64px!important;
      top:3px!important;
    }
    span:hover {
      text-decoration: underline;
    }
  }
  .user {
    display: inline-block;
    line-height: 65px;
    font-size: 14px;
    color: #6c92fa;
    span {
      width:100%;
      top:3px!important;
    }
    span:hover {
      text-decoration: underline;
    }
  }
  #usericon{
    position: relative;
    z-index: 99;
    top: 8px;
    padding-right: 10px;
    cursor: pointer;
  }
  .nav-tabs{
    height:100%;
    font-size:20px;
    line-height: 64px;
    margin-right: 10px;
    span{
      height:24px;
      margin-right: 10px;
      position: relative;
      top:8px;
      cursor:pointer;
      color:#f5f5f5;
    }
    span.el-icon-user-solid.blue{
      color:#409EFF;
    }
  }
  // 移动端
  .el-icon-s-unfold{
    color:#ffffff;
    line-height: 65px;
    top: 3px;
    position: relative;
  }
  .menu-div{
    overflow-y: auto;
  }
}
</style>
