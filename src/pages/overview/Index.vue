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
    <div
      class="top"
      v-if="showType === 'overview'"
    >
      <el-row
        :gutter="20"
        style="height: 100%;"
        class="padding-lr"
      >
        <el-col
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24"
          class="content-right"
        >
          <div
            class="edge-souces"
          >
            <div class="blockContent">
              <div class="nodeBasicInfo">
                <div class="dataContent">
                  <div class="totalNum defaultNum">
                    <div class="numLeft lt">
                      <img
                        alt="flw"
                        src="../../assets/images/zongshu_icon.png"
                      >
                    </div>
                    <div class="numRight lt">
                      <p class="num">
                        {{ nodeNum }}
                      </p>
                      <p class="defaultName">
                        {{ $t('overview.edgeNodes') }}
                      </p>
                    </div>
                  </div>
                  <div class="onlineNum defaultNum">
                    <div class="numLeft lt">
                      <img
                        alt="flw"
                        src="../../assets/images/zxjds_icon.png"
                      >
                    </div>
                    <div class="numRight lt">
                      <p class="num">
                        {{ nodeNum }}
                      </p>
                      <p class="defaultName">
                        {{ $t('overview.onlineNodes') }}
                      </p>
                    </div>
                  </div>
                  <div class="offlineNum defaultNum">
                    <div class="numLeft lt">
                      <img
                        alt="flw"
                        src="../../assets/images/lxjds_icon.png"
                      >
                    </div>
                    <div class="numRight lt">
                      <p class="num">
                        0
                      </p>
                      <p class="defaultName">
                        {{ $t('overview.offlineNodes') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-row
        :gutter="20"
        style="height:100%;"
      >
        <el-col
          :lg="10"
          :md="10"
          :sm="24"
          :xs="24"
        >
          <div
            class="blockContent"
            id="nodeListDiv"
            v-if="showType === 'overview'"
          >
            <div class="secondLabel">
              {{ $t('nav.nodeList') }}
            </div>
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
                  <template
                    slot-scope="scope"
                  >
                    <div
                      @click="handleRowSelection(scope.row.mechostIp)"
                    >
                      <span
                        class="hostName name"
                      >{{ scope.row.mechostName }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="mechostIp"
                  :label="$t('app.packageList.ip')"
                />
                <el-table-column
                  prop="status"
                  :label="$t('app.packageList.status')"
                >
                  <template slot-scope="scope">
                    <span><em
                      class="el-icon-success"
                      style="color:#67C23A;"
                    /> {{ scope.row.status }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="city"
                  :label="$t('system.edgeNodes.location')"
                />
                <el-table-column
                  :label="$t('common.operation')"
                >
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      @click="showDetail(scope.row)"
                    >
                      {{ $t('common.detail') }}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div
            class="edge-souces"
            v-if="showType === 'details'"
          >
            <el-row
              :gutter="10"
            >
              <div class="blockContent">
                <div class="secondLabel">
                  {{ $t('overview.nodeInfo') }}
                </div>
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
                <div class="secondLabel">
                  {{ $t('overview.k8sResc') }}
                </div>
                <div>
                  <Usage :kpi-info="kpiInfo" />
                </div>
              </div>
              <div
                class="blockContent"
                id="mepInfoDiv"
              >
                <div class="secondLabel">
                  {{ $t('overview.capaInfo') }}
                  <div class="selectCapa rt">
                    <el-select
                      v-model="capaType"
                      :placeholder="$t('tip.pleaseSelect')"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="language==='cn'?item.label[0]:item.label[1]"
                        :value="item.value"
                      />
                    </el-select>
                  </div>
                </div>
                <el-table
                  :data="hwCapData"
                  header-row-class-name="headerClassName"
                  class="hwCapData"
                  v-if="capaType==='hardware'"
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
                <el-table
                  :data="mepCapData"
                  class="mepCapaTable"
                  header-row-class-name="headerClassName"
                  v-if="capaType==='software'"
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
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col
          :lg="14"
          :md="14"
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
    </div>
    <div
      id="matrixPopDiv"
      class="popover"
      v-if="showUsageDialog"
    >
      <EdgeNodeUsage
        :kpi-info="usageData"
        @closePopover="showUsageDialog=false"
      />
    </div>
  </div>
</template>

<script>

import Usage from './Usage.vue'
import EdgeNodeUsage from './EdgeNodeUsage.vue'
import Map from './Map.vue'
import { appo, inventory } from '../../tools/request.js'
export default {
  components: {
    Map,
    Usage,
    EdgeNodeUsage
  },
  data () {
    return {
      serviceInfo: {},
      showType: 'overview',
      hwCapData: [],
      mepCapData: [],
      edgeApp: '',
      edgeAppList: [],
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
      screenHeight: 0,
      usageData: {},
      showUsageDialog: false,
      intervalDialog: {},
      options: [
        {
          value: 'hardware',
          label: ['硬件能力', 'Hardware']
        }, {
          value: 'software',
          label: ['软件能力', 'Software']
        }
      ],
      capaType: 'hardware',
      language: localStorage.getItem('language') || 'cn'
    }
  },
  watch: {
    '$i18n.locale': function (val) {
      if (val === 'en') {
        this.city = 'All '
      } else {
        this.city = '全国'
      }
      this.language = val
    }
  },
  methods: {
    showDialogPosition () {
      if (this.showUsageDialog) {
        clearInterval(this.intervalDialog)
        let nodelistTable = document.getElementsByClassName('nodelistTable')[0]
        let matrixPopDiv = document.getElementsByClassName('popover')[0]
        matrixPopDiv.style.top = nodelistTable.offsetTop + 300 + 'px'
        matrixPopDiv.style.left = nodelistTable.offsetLeft + 360 + 'px'
      }
    },
    handleRowSelection (ip) {
      this.showUsageDialog = false
      appo.getNodeKpi(ip).then(res => {
        if (res.data) {
          this.usageData = res.data
          this.showUsageDialog = true
          this.intervalDialog = setInterval(() => this.showDialogPosition())
        }
      }).catch(() => {
        this.$message.error(this.$t('tip.getAppInfoFailed'))
      })
    },
    resetData () {
      this.hwCapData = []
      this.edgeAppList = []
      this.edgeApp = ''
      this.edgeIp = ''
    },
    clickNode (val) {
      this.nodeBasicInfo = val
      let bottom = document.getElementsByClassName('bottom')
      bottom[0].style.height = '94%'
      bottom[0].style.marginTop = '2%'
      this.showType = 'details'
      this.resetData()
      this.getNodeKpi(val.mechostIp)
      this.getHwCapa(val.mechostIp)
      this.getMepCapa(val.mechostIp)
      this.getAppInfo(val.mechostIp)
      this.edgeIp = val.mechostIp
    },
    clickMap (msg, city) {
      if (city !== '1') {
        let bottom = document.getElementsByClassName('bottom')
        bottom[0].style.height = '71%'
        bottom[0].style.marginTop = '0px'
        this.showType = 'overview'
      }
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
          this.mepCapData = res.data.response
        }
      })
    },
    getNodeKpi (ip) {
      appo.getNodeKpi(ip).then(res => {
        if (res.data) {
          this.kpiInfo = res.data
        }
      })
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
    background: url('../../assets/images/overview_bg.png') center no-repeat;
    background-size: cover;
    box-sizing: border-box;
    padding-right: 15px;
  }
  #nodeListDiv{
    background: #fff;
    box-shadow: none !important;
  }
  .mt20 {
    margin-top: 20px;
  }
  .ml20 {
    margin-left: 20px;
  }
  .nodeBasicInfo{
    color:#380879;

    font-size: 18px;
    margin: 15px 0 15px 30px;
    .nodeInfo:nth-child(2){
      padding: 15px 0;
    }
  }
  .content-right {
      padding: 0!important;
    .my-title {
      color: white;
    }
    .edge-souces {
      padding: 15px 15px 0 15px;
      .blockContent{
        padding: 15px 20px;
        margin-top: 15px;
        border-radius:30px;
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
    }
  }

  .nodeTable.headerClassName{
    font-size: 14px !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }
  .nodelistTable{
    max-height: 300px;
    overflow-y: auto;
  }
  .hostName{
    margin-left: 10px;
  }
  .infoPanel{
    float:right;
    margin-bottom:15px;
  }
  .mapPanel{
    height: 100%;
    padding-left:0!important;
    background:#fff;
    box-sizing: border-box;
    border-radius: 5%;
  }
  .showDetails{
    width: 43px;
    height: 24px;
    background: #efefef;
    color: #7a6e8a;
    border: none;
    border-radius: 5px;
    line-height: 24px;
  }
  .dataContent{
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
  }
  .defaultNum{
    font-size: 48px;
    width: 30%;
    height: 150px;
    color: #ffff;
    background: url('../../assets/images/jdzs_bg.png') center no-repeat;
    background-size: 120% 150%;
    padding: 20px 50px;
    .numLeft{
      width: 50%;
      padding-left: 8%;
    }
    .numRight{
      width: 50%;
      position: relative;
      top: -15px;
      p{
        color: #6040c8;
        text-align: center;
      }
      .num{
        font-size: 76px;
        font-weight: bold;
      }
      .defaultName{
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .popover {
    width: 370px;
    height: 250px;
    transform-origin: center-bottom;
    z-index: 2007;
    position: absolute;
    padding: 15px;
    background: #ffffff;
    box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
  .bottom{
    height: 68%;
    margin: 0 10%;
    padding: 40px 35px;
    background: #fff;
    border-radius: 20px;
  }
  .selectCapa{
    display: inline-block;
    .el-select{
      width: 137px;
      height: 30px;
      .el-input__inner{
        height: 30px;
        border: 1px solid #5e40c8 !important;
        border-radius: 8px !important;
      }
      .el-input__icon{
        line-height: 30px;
      }
    }
  }
  .mepCapaTable{
    max-height: 300px;
    overflow-y: auto;
  }
</style>
