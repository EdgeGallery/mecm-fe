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
    >
      <el-col
        :lg="6"
        :md="12"
        :sm="24"
        :xs="24"
        class="content-right"
      >
        <div
          class="edge-souces"
          v-if="alarmStatus === 'alarms'"
        >
          <label class="overviewLabel">{{ $t('overview.overview') }}</label>
          <div class="nodeBasicInfo">
            <p><span>{{ city }}{{ $t('overview.edgeNodes') }}：</span>{{ nodeNum }}</p>
            <p><span>{{ $t('overview.onlineNodes') }}：</span>{{ nodeNum }}</p>
            <p><span>{{ $t('overview.offlineNodes') }}：</span>0</p>
          </div>
          <Chart :chart-data="chartData" />
          <label class="overviewLabel">{{ $t('nav.nodeList') }}</label>
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
                  <span style="margin-left: 10px">{{ scope.row.mechostName }}</span>
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
                    class="cp"
                    @click="showDetail(scope.row)"
                  >
                    {{ $t('common.detail') }}
                  </button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div
          class="edge-souces"
          v-if="alarmStatus !== 'alarms'"
        >
          <el-row
            :gutter="10"
          >
            <label class="overviewLabel">{{ $t('overview.nodeInfo') }}</label>
            <div class="nodeBasicInfo">
              <p>
                <span>{{ $t('overview.nodeName') }}</span>{{ nodeBasicInfo.mechostName }}
              </p>
              <p>
                <span>{{ $t('overview.nodeIp') }}</span>{{ nodeBasicInfo.mechostIp }}
              </p>
              <p><span>{{ $t('overview.nodeAddress') }}</span>{{ nodeBasicInfo.city }}</p>
            </div>
            <label class="overviewLabel">{{ $t('overview.k8sResc') }}</label>
            <div>
              <Usage :kpi-info="kpiInfo" />
            </div>
          </el-row>
        </div>
        <div
          class="edge-souces"
          v-if="alarmStatus !== 'alarms'"
        >
          <label class="overviewLabel">{{ $t('overview.mepInfo') }}</label>
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
        </div>
        <div
          class="edge-souces"
          v-if="alarmStatus !== 'alarms'"
        >
          <el-row>
            <el-col :span="12">
              <el-select
                v-model="edgeApp"
                style="width:100%;"
                @change="appChange"
              >
                <el-option
                  v-for="item in edgeAppList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="12">
              <div
                style="float:right;margin-bottom:15px;"
              >
                <el-button
                  id="manageBtn"
                  type="primary"
                  @click="checkServiceInfo()"
                  :loading="loginBtnLoading"
                >
                  {{ $t('overview.manage') }}
                </el-button>
                <el-button
                  id="maintenBtn"
                  class="ml20"
                  :disabled="true"
                  type="primary"
                >
                  {{ $t('overview.maintenance') }}
                </el-button>
              </div>
            </el-col>
            <el-col :span="24">
              <el-table
                :data="mepCapData"
                class="capaTable"
                style="width: 100%"
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
      </el-col>
      <el-col
        :lg="18"
        :md="12"
        :sm="24"
        :xs="24"
        style="height:100%;padding-left:0!important;"
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

import manageDialog from '../components/overview/ManageDialog.vue'
import Usage from '../components/overview/Usage.vue'
import Map from '../components/overview/Map.vue'
import { appo, inventory } from '../tools/request.js'
import Chart from '../components/overview/Chart.vue'
export default {
  components: {
    manageDialog,
    Map,
    Chart,
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
      detail: {}
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
  methods: {
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
      this.nodeList = msg
      this.nodeList.forEach(item => {
        item.city = item.city.split('/')[0]
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
      inventory.getHwCapa(ip).then(res => {
        if (res.data) {
          let str = res.data.response
          this.kpiInfo = JSON.parse(str)
          console.log(this.kpiInfo)
        }
      }).catch(() => {
        // this.$message.error(this.$t('tip.getKpiFailed'))
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
      window.open('http://' + this.edgeIp + ':30095')
    }
  }
}
</script>
<style lang='less'>
.mecm-overview {
  position: absolute;
  top: 65px;
  width: 100%;
  height:calc(100% - 65px);
  overflow: auto;
  background:#131111;
  background-size: cover;
  box-sizing: border-box;
}
  label.overviewLabel{
    font-family: PingFangSC-Medium,sans-serif;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 24px;
    display: block;
    padding:8px 0;
    background: #494b4e;
    padding-left: 8px;
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
  .nodeBasicInfo{
    color:#F5F5F5;
    padding: 0 0 25px 0;
    margin-top: 15px;
    p{
      font-size: 16px;
      line-height: 32px;
      padding: 0 10px;
      span{
        display: inline-block;
        color:#c0c4cc;
      }
    }
  }
  .content-right {
      padding: 0!important;
      background: #2f2d2d;
      height: 100%;
    .my-title {
      color: white;
    }
    .edge-souces {
      padding: 15px 15px 0 15px;
      .el-table {
        border-color: #2395db !important;
        color: white;
        .el-table__row:nth-child(2n) {
          background: #102238 !important;
        }
        .el-table__row:nth-child(2n + 1) {
          background: #2D4868 !important;
        }
        td {
          padding: 3px 0;
          .cell {
            line-height: 30px !important;
          }
        }
        .headerClassName {
          th {
            background: #152437 !important;
            color: #F5F5F5;
          }
          .cell::before{
            content:'';
            display:inline-block;
            height:13px;
            width:2px;
            background: #f5f5f5;
            margin-right:4px;
            position: relative;
            top:3px;
          }
        }
      }
      .el-table::before,
      .el-table--border::after {
        height: 0 !important;
      }
      .el-table--border th {
        border-right: 1px solid #2395db !important;
      }
      .el-table tbody tr:hover > td {
        background-color: transparent;
      }
      .el-table td, .el-table th.is-leaf{
        border-bottom: none;
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
        background-color: #2c58a6;
        border-color: #0263ff;
      }
    }
  }
  .headerClassName{
    font-size: 13px;
  }
  .hwCapData{
    margin-top:15px;
  }
  .capaTable{
    max-height: 185px;
    overflow-y: auto;
  }
  .nodelistTable{
    max-height: 350px;
    overflow-y: auto;
  }
</style>
