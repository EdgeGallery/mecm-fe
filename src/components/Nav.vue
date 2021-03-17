<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="navgation">
    <el-row :gutter="10">
      <el-col
        :lg="6"
        :md="12"
        :sm="12"
        :xs="12"
      >
        <div
          class="logo"
          @click="jumpLogoTo"
        >
          <img
            class="cp"
            src="../assets/images/logo.png"
            alt=""
          >
        </div>
      </el-col>
      <el-col
        :lg="12"
        class="hidden-md-and-down"
      >
        <div>
          <Topbar
            v-if="!smallMenu"
            :json-data="jsonData"
          />
        </div>
      </el-col>
      <el-col
        :lg="6"
        :md="12"
        :sm="12"
        :xs="12"
      >
        <div class="nav-tabs">
          <div class="btn rt hidden-lg-and-up">
            <em
              class="el-icon-s-unfold"
              @click="openNav"
            />
          </div>
          <div class="language rt">
            <span @click="changeLang">{{ lang }}</span>
          </div>
          <div class="user rt">
            <span
              @click="logout()"
              v-if="ifGuest"
            >{{ $t('nav.login') }}</span>
            <span
              v-if="!ifGuest"
            >{{ userName }}</span>
            <span
              v-if="!ifGuest"
            >|</span>
            <span
              v-if="!ifGuest"
              @click="openUserAccountCenter()"
            >{{ $t('nav.userAccountCenter') }}</span>
            <span
              v-if="!ifGuest"
            >|</span>
            <span
              @click="beforeLogout()"
              v-if="!ifGuest"
            >{{ $t('nav.logout') }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-collapse-transition>
      <div
        v-if="smallMenu"
        id="menu-div"
      >
        <Topbarsmall
          :json-data="jsonData"
          @closeMenu="closeMenu"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import NavData from '../data/NavData.js'
import NavDataCn from '../data/NavDataCn.js'
import { user } from '../tools/request.js'
import Topbar from '../components/Topbar'
import Topbarsmall from '../components/Topbarsmall'
export default {
  name: 'Navgation',
  components: {
    Topbar,
    Topbarsmall
  },
  data () {
    return {
      loginPage: '',
      userCenterPage: '',
      ifGuest: true,
      jsonData: [],
      language: 'cn',
      lang: 'English',
      smallMenu: false,
      userName: ''
    }
  },
  watch: {
    $route (to, from) {
      sessionStorage.setItem('before_route', to.path)
    }
  },
  mounted () {
    this.jsonData = NavDataCn
    this.language = localStorage.getItem('language') || 'cn'
    this.$i18n.locale = this.language
    if (this.language === 'cn') {
      this.lang = 'English'
      this.jsonData = NavDataCn
    } else {
      this.lang = '简体中文'
      this.jsonData = NavData
    }
    if (!localStorage.getItem('language')) { localStorage.setItem('language', 'cn') }
    user.getUserInfo().then(res => {
      this.userName = res.data.userName
      sessionStorage.setItem('userId', res.data.userId)
      sessionStorage.setItem('access_token', res.data.accessToken)
      sessionStorage.setItem('isSecureBackend', res.data.isSecureBackend)
      this.loginPage = res.data.loginPage
      this.userCenterPage = res.data.userCenterPage
      if (res.data.userName !== 'guest') {
        this.ifGuest = false
      }
      if (res.data.authorities.indexOf('ROLE_MECM_ADMIN') > -1) {
        sessionStorage.setItem('rlp', 418)
      } else {
        sessionStorage.removeItem('rlp')
      }
    })
  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
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
    changeLang () {
      if (this.language === 'en') {
        this.language = 'cn'
        this.lang = 'English'
        this.jsonData = NavDataCn
      } else {
        this.language = 'en'
        this.lang = '简体中文'
        this.jsonData = NavData
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
      sessionStorage.removeItem('before_route')
      sessionStorage.clear()
      user.logout().then(res => {
        window.location.href = window.location.href.indexOf('https') > -1
          ? this.loginPage + '&return_to=' + 'https://' + window.location.host
          : this.loginPage + '&return_to=' + 'http://' + window.location.host
      }).catch(error => {
        if (error.response.status === 401) {
          location.reload()
        }
      })
    },
    openUserAccountCenter () {
      window.open(this.userCenterPage)
    }
  }
}
</script>

<style lang='less' scoped>
.navgation{
  background: #282B33;
  height: 65px;
  top: 0px;
  width: 100%;
  position: fixed;
  z-index: 2;
  .logo{
    height:65px;
    width:430px;
    line-height: 65px;
    margin-left:17px;
    img{
      position: relative;
      top: 0px;
      width:150px;
    }
    span{
      position: relative;
      top:-28px;
      font-size: 18px;
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
    line-height: 65px;
    font-size: 14px;
    color: #6c92fa;
    span {
      width:60px!important;
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
  .nav-tabs{
    height:100%;
    font-size:20px;
    line-height: 50px;
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
