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
    <div
      class="logo lt"
      @click="jumpLogoTo"
    >
      <img
        src="../assets/images/logo.png"
        alt=""
      >
      <span>{{ $t('nav.mecm') }} V0.25</span>
    </div>
    <div>
      <Topbar :json-data="jsonData" />
    </div>
    <div class="nav-tabs rt">
      <div class="language rt">
        <span @click="changeLang">{{ language }}</span>
      </div>
      <div class="user rt">
        <span
          @click="beforeLogout()"
        >{{ $t('login.logout') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavData from '../data/NavData.js'
import NavDataCn from '../data/NavDataCn.js'
import { user } from '../tools/request.js'
import Topbar from '../components/Topbar.vue'
export default {
  name: 'Navgation',
  components: {
    Topbar
  },
  data () {
    return {
      loginPage: '',
      jsonData: [],
      language: 'English'
    }
  },
  watch: {
    $route (to, from) {
      sessionStorage.setItem('before_route', to.path)
    }
  },
  mounted () {
    this.jsonData = NavDataCn
    this.language = 'English'
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
    changeLang () {
      let language
      if (this.language === 'English') {
        this.language = '简体中文'
        language = 'en'
        this.jsonData = NavData
      } else {
        this.language = 'English'
        language = 'cn'
        this.jsonData = NavDataCn
      }
      this.$i18n.locale = language
      let appDom = document.getElementById('app')
      if (language === 'en') {
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
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    jumpLogoTo () {
      this.$router.push('/')
    },
    logout () {
      user.logout().then(res => {
        window.location.href = this.loginPage + '&return_to=' + 'https://' + window.location.host
      }).catch(error => {
        this.$message.error(error.message)
      })
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
      cursor: pointer;
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
      display: inline-block;
      width:100%;
      height:24px;
      margin-right: 20px;
      position: relative;
      top:8px;
      cursor:pointer;
      color:#f5f5f5;
    }
    span.el-icon-user-solid.blue{
      color:#409EFF;
    }
  .pop-txt{
    font-size: 21px;
    padding: 10%;
  }
  .promt-actions{
    text-align: center;
    padding: 2%;
  }
  .okbtn{
    font-size: 20px;
  }
  }
}
</style>
