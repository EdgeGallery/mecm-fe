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
  <div class="mecm-overview">
    <el-row
      :gutter="20"
      style="height: 100%;"
      class="padding-lr"
    >
      <el-col
        :lg="9"
        :md="12"
        :sm="24"
        :xs="24"
        class="content-right"
      >
        <div
          class="edge-souces"
          v-if="alarmStatus === 'alarms'"
        >
          <div class="blockContent">
            <p class="overviewLabel">
              {{ $t('overview.overview') }}
            </p>
            <div class="nodeBasicInfo">
              <div class="dataContent">
                <p class="totalNum defaultNum">
                  {{ nodeNum }}
                </p>
                <p class="onlineNum defaultNum">
                  {{ nodeNum }}
                </p>
                <p class="offlineNum defaultNum">
                  0
                </p>
              </div>
              <div style="display:flex;flex-direction:row;justify-content:space-evenly;">
                <p class="defaultName">
                  {{ $t('overview.edgeNodes') }}
                </p>
                <p class="defaultName">
                  {{ $t('overview.onlineNodes') }}
                </p>
                <p class="defaultName">
                  {{ $t('overview.offlineNodes') }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="blockContent"
            id="nodeListDiv"
          >
            <p class="overviewLabel">
              {{ $t('nav.nodeList') }}
            </p>
            <div class="nodeTable">
              <el-table
                :data="nodeList"
                header-row-class-name="headerClassName"
                class="hwCapData nodelistTable"
              >
                <el-table-column
                  prop="mechostName"
                  sortable
                  :label="$t('app.packageList.name')"
                >
                  <template slot-scope="scope">
                    <em
                      class="el-icon-success"
                      :style="{color: '#67C23A'}"
                    />
                    <span class="hostName">{{ scope.row.mechostName }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="mechostIp"
                  :label="$t('app.packageList.ip')"
                />
                <el-table-column
                  prop="city"
                  :label="$t('system.edgeNodes.location')"
                />
                <el-table-column
                  :label="$t('common.operation')"
                >
                  <template slot-scope="scope">
                    <button
                      class="cp showDetails"
                      @click="showDetail(scope.row)"
                    >
                      {{ $t('common.detail') }}
                    </button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div
          class="edge-souces"
          v-if="alarmStatus !== 'alarms'"
        >
          <el-row
            :gutter="10"
          >
            <div class="blockContent">
              <p class="overviewLabel">
                {{ $t('overview.nodeInfo') }}
              </p>
              <div class="nodeBasicInfo">
                <p class="nodeInfo">
                  <span>{{ $t('overview.nodeName') }}</span>{{ nodeBasicInfo.mechostName }}
                </p>
                <p class="nodeInfo">
                  <span>{{ $t('overview.nodeIp') }}</span>{{ nodeBasicInfo.mechostIp }}
                </p>
                <p class="nodeInfo">
                  <span>{{ $t('overview.nodeAddress') }}</span>{{ nodeBasicInfo.city }}
                </p>
              </div>
            </div>
            <div class="blockContent">
              <p class="overviewLabel">
                {{ $t('overview.k8sResc') }}
              </p>
              <div>
                <Usage :kpi-info="kpiInfo" />
              </div>
            </div>
            <div
              class="blockContent"
              id="mepInfoDiv"
            >
              <p class="overviewLabel">
                {{ $t('overview.mepInfo') }}
                <el-button
                  id="manageBtn"
                  type="primary"
                  class="rt"
                  style="position:relative;top:-5px;"
                  @click="checkServiceInfo()"
                  :loading="loginBtnLoading"
                >
                  {{ $t('overview.manage') }}
                </el-button>
              </p>
              <el-table
                :data="hwCapData"
                header-row-class-name="headerClassName"
                class="hwCapData"
              >
                <el-table-column
                  prop="hwType"
                  :label="$t('overview.mepCapa')"
                />
                <el-table-column
                  prop="hwVendor"
                  :label="$t('overview.vendor')"
                />
                <el-table-column
                  prop="hwModel"
                  :label="$t('overview.model')"
                />
              </el-table>
              <el-row style="padding-top: 15px;border-top: 1px solid #0A1446;">
                <el-col :span="24">
                  <el-table
                    :data="mepCapData"
                    class="capaTable"
                    header-row-class-name="headerClassName"
                  >
                    <el-table-column
                      prop="capabilityName"
                      :label="$t('overview.softwareCapa')"
                    />
                    <el-table-column
                      prop="status"
                      :label="$t('app.packageList.status')"
                    />
                    <el-table-column
                      prop="version"
                      :label="$t('app.packageList.version')"
                    />
                  </el-table>
                </el-col>
              </el-row>
            </div>
          </el-row>
        </div>
      </el-col>
      <el-col
        :lg="15"
        :md="12"
        :sm="24"
        :xs="24"
        class="mapPanel"
      >
        <Map
          @node="clickNode"
          @area="clickMap"
          :detail="detail"
        />
      </el-col>
    </el-row>
    <div v-if="manageDialogStatus">
      <manageDialog
        v-model="manageDialogStatus"
        :service-info="serviceInfo"
      />
    </div>
  </div>
</template>

<script>

import manageDialog from './ManageDialog.vue'
import Usage from './Usage.vue'
import Map from './Map.vue'
import { appo, inventory } from '../../tools/request.js'
export default {
  components: {
    manageDialog,
    Map,
    Usage
  },
  data () {
    return {
      serviceInfo: {},
      alarmStatus: 'alarms',
      hwCapData: [],
      mepCapData: [],
      edgeApp: '',
      edgeAppList: [],
      manageDialogStatus: false,
      infoList: [],
      kpiInfo: {},
      loginBtnLoading: false,
      chartData: {},
      nodeBasicInfo: null,
      nodeNum: 0,
      city: '',
      edgeIp: '',
      nodeList: [],
      detail: {},
      screenHeight: 0
    }
  },
  watch: {
    '$i18n.locale': function (val) {
      if (val === 'en') {
        this.city = 'All '
      } else {
        this.city = '全国'
      }
    }
  },
  mounted () {
    this.setcontentHeight()
  },
  updated () {
    let mepInfoDiv = document.getElementById('mepInfoDiv')
    mepInfoDiv.style.height = (Number(this.screenHeight) - 573) + 'px'
    let capaTable = document.getElementsByClassName('capaTable')
    capaTable[0].style.height = (Number(this.screenHeight) - 175) + 'px'
  },
  methods: {
    setcontentHeight (height) {
      this.screenHeight = window.innerHeight
      let nodeListDiv = document.getElementById('nodeListDiv')
      let nodelistTable = document.getElementsByClassName('nodelistTable')
      nodeListDiv.style.height = (Number(this.screenHeight) - 371) + 'px'
      console.log(nodelistTable)
      nodelistTable[0].style.maxHeight = (Number(this.screenHeight) - 307) + 'px'
    },
    resetData () {
      this.hwCapData = []
      this.edgeAppList = []
      this.edgeApp = ''
      this.edgeIp = ''
    },
    clickNode (val) {
      this.nodeBasicInfo = val
      this.alarmStatus = 'nodeinfo'
      this.resetData()
      this.getNodeKpi(val.mechostIp)
      this.getHwCapa(val.mechostIp)
      this.getMepCapa(val.mechostIp)
      this.getAppInfo(val.mechostIp)
      this.edgeIp = val.mechostIp
    },
    clickMap (msg, city) {
      this.alarmStatus = 'alarms'
      if (this.$i18n.locale === 'en') {
        this.city = city
      } else {
        if (city === '西藏') {
          this.city = 'Xizang'
        } else if (city === '重庆') {
          this.city = 'Chongqing'
        } else if (city === '全国') {
          this.city = 'All'
        } else {
          let pinyin = require('pinyin')
          this.city = pinyin(city, { style: pinyin.STYLE_NORMAL }).join('').replace(/^\S/, s => s.toUpperCase())
        }
      }
      this.nodeList = JSON.parse(JSON.stringify(msg))
      this.nodeList.forEach(item => {
        item.city += '/' + item.address
      })
      this.nodeNum = msg.length
      this.chartData =
        {
          'Total': this.nodeNum,
          'Online': this.nodeNum,
          'Offline': 0
        }
    },
    showDetail (row) {
      this.detail = row
    },
    appChange (val) {
      this.edgeAppList.forEach(item => {
        if (item.value === val) {
          this.edgeApp = val
        }
      })
    },
    getAppInfo (ip) {
      appo.getInstanceList().then(res => {
        this.infoList = res.data.response
        this.edgeAppList = []
        if (this.infoList && this.infoList.length > 0) {
          this.infoList.forEach(item => {
            if (item.mecHost === ip && item.operationalStatus === 'Instantiated') {
              let obj = {}
              obj.label = item.appName
              obj.value = item.appInstanceId
              obj.id = item.appPackageId
              obj.appId = item.appId
              this.edgeAppList.push(obj)
            }
          })
          this.edgeApp = this.edgeAppList[0].value
        }
      }).catch(() => {
        // this.$message.error(this.$t('tip.getAppInfoFailed'))
      })
    },
    getHwCapa (host) {
      inventory.getHwCapa(host).then(res => {
        if (res && res.data) {
          if (res.data.status !== 500) {
            this.hwCapData = res.data.hwcapabilities
          }
        }
      })
    },
    getMepCapa (host) {
      appo.getMepCapabilities(host).then(res => {
        if (res && res.data) {
          if (res.data.status !== 500) {
            this.mepCapData = JSON.parse(res.data.response)
          }
        }
      })
    },
    getNodeKpi (ip) {
      appo.getNodeKpi(ip).then(res => {
        if (res.data) {
          let str = res.data.response
          this.kpiInfo = JSON.parse(str)
        }
      })
    },
    getServiceInfo (instanceId) {
      if (this.edgeAppList.length > 0) {
        this.loginBtnLoading = true
        appo.getServiceInfo(instanceId).then(res => {
          this.serviceInfo = JSON.parse(res.data.response)
          this.manageDialogStatus = true
          this.loginBtnLoading = false
        }).catch((error) => {
          if (error.response.status === 412) {
            this.$message.error(error.response.data.response)
          } else if (error.response.status === 404) {
            this.$message.warning(this.$t('tip.getStatusDelay'))
          } else {
            this.$message.error('Network Error')
          }
          this.loginBtnLoading = false
          // this.$message.error(this.$t('tip.getServiceFailed'))
        })
      } else {
        this.loginBtnLoading = false
        // this.$message.warning(this.$t('tip.noPackage'))
      }
    },
    async checkServiceInfo () {
      window.open('http://' + this.edgeIp + ':30097' + '/mepm/mepinfo/' + this.edgeIp)
    }
  }
}
</script>
<style lang='less'>
  .mecm-overview {
    position: absolute;
    top: 64px;
    width: 100%;
    height:calc(100% - 64px);
    overflow: auto;
    background:#252a4a;
    background-size: cover;
    box-sizing: border-box;
    padding-right: 15px;
  }
  #nodeListDiv{
    background: #202342;
  }
  p.overviewLabel{
    font-family: FZLanTingHeiS-B-GB, Arial, sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: rgba(255, 255, 255, 0.9);
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .ml20 {
    margin-left: 20px;
  }
  .el-table td, .el-table th{
    padding:5px 0;
  }
  .el-table .has-gutter th{
    background: #2d325a!important;
  }
  .el-table__expanded-cell{
    background: transparent!important;
  }
  .el-table, .el-table__expanded-cell{
    background: transparent!important;
    border-radius: 10px !important;
  }
  .nodeBasicInfo{
    color:#CCCCCC;
    margin-top: 15px;
    .nodeInfo{
      font-size: 14px;
    }
    .nodeInfo:nth-child(2){
      padding: 15px 0;
    }
  }
  .content-right {
      padding: 0!important;
      height: 100%;
    .my-title {
      color: white;
    }
    .edge-souces {
      padding: 15px 15px 0 15px;
      .blockContent{
        padding: 15px 20px;
        margin: 5px;
        border: 1px solid #2d3258;
        background: #2d3258;
        margin-top: 15px;
        border-radius:30px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .el-select {
        .el-input {
          input {
            background-color: transparent;
            border: 1px solid #2395db;
            color: white;
          }
          .el-input__suffix {
            i {
              color: white;
            }
          }
        }
      }
      .el-button {
        background-color: #6e33fd;
        border-color: #6e33fd;
      }
    }
  }

  .nodeTable.headerClassName{
    font-size: 14px !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }
  .capaTable{
    max-height: 165px;
    overflow-y: auto;
  }
  .nodelistTable{
    max-height: 300px;
    overflow-y: auto;
    border-radius: 10px;
  }
  .hostName{
    margin-left: 10px;
  }
  .infoPanel{
    float:right;
    margin-bottom:15px;
  }
  .mapPanel{
    margin-top: 30px;
    height:calc(100% - 40px);
    padding-left:0!important;
    background:#202441;
    border: 1px solid #202441;
    box-sizing: border-box;
    border-radius: 5%;
  }
  .showDetails{
    width: 39px;
    height: 20px;
    background: #6e35f4;
    color: #ffffff;
    border: none;
    border-radius: 2px;
    line-height: 20px;
  }
  .dataContent{
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
  }
  .defaultNum{
    font-family: FZLanTingHeiS-B-GB, Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 59px;
    text-align: center;
    width: 90px;
    height: 80px;
  }
  .totalNum{
    color: #21D55E;
  }
  .onlineNum{
   color: #E05F17;
  }
  .offlineNum{
    color: #35EDED;
  }
  .defaultName{
    text-align: center;
    width: 90px;
    height: 80px;
    font-size: 14px;
    color: #cccccc;
  }
  .mecm-overview .el-table td,.mecm-overview .el-table th{
    height: 36px;
  }
</style>
