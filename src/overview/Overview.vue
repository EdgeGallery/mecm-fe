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
  <div class="mecm-overview">
    <el-row
      :gutter="20"
      style="height: 100%;"
    >
      <el-col
        :span="6"
        class="content-right"
      >
        <div class="edge-souces mt20">
          <label class="overviewLabel">{{ $t('overview.statistics') }}</label>
          <el-select
            class="mt20"
            v-model="alarmStatus"
            style="width:100%;"
          >
            <el-option
              :label="$t('overview.alarms')"
              value="alarms"
            />
            <el-option
              :label="$t('overview.nodeinfo')"
              value="nodeinfo"
            />
          </el-select>
        </div>
        <div
          class="edge-souces mt20"
          v-if="alarmStatus === 'alarms'"
        >
          <label class="overviewLabel">{{ $t('overview.alarms') }}</label>
          <Chart :chart-data="chartData" />
        </div>
        <div
          class="edge-souces mt20"
          v-if="alarmStatus !== 'alarms'"
        >
          <label class="overviewLabel">{{ $t('overview.regionEdge') }}</label>
          <el-select
            class="mt20"
            v-model="regionEdge"
            style="width:100%;"
            @change="nodeChange"
          >
            <el-option
              v-for="item in regionEdgeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div
          class="edge-souces ml20"
          v-if="alarmStatus !== 'alarms'"
        >
          <el-row :gutter="40">
            <label class="overviewLabel">{{ $t('overview.k8sResc') }}</label>
            <el-col
              :span="8"
              class="mt20 progerss-item"
            >
              <ve-gauge
                :data="chartDataCpu"
                height="150px"
                :settings="chartSettings"
              />
              <p>CPU</p>
            </el-col>
            <el-col
              :span="8"
              class="mt20 progerss-item"
            >
              <ve-gauge
                :data="chartDataMem"
                height="150px"
                :settings="chartSettings"
              />
              <p>MEM</p>
            </el-col>
            <el-col
              :span="8"
              class="mt20 progerss-item"
            >
              <ve-gauge
                :data="chartDataDisk"
                height="150px"
                :settings="chartSettings"
              />
              <p>DISK</p>
            </el-col>
          </el-row>
        </div>
        <div
          class="edge-souces"
          v-if="alarmStatus !== 'alarms'"
        >
          <label class="overviewLabel">{{ $t('overview.mepCapa') }}</label>
          <el-table
            :data="mepCapabilitiesData"
            class="mt20"
            header-row-class-name="headerClassName"
          >
            <el-table-column
              prop="capabilityName"
              :label="$t('overview.capa')"
            />
            <el-table-column
              prop="consumers.length"
              :label="$t('overview.numOfApp')"
            />
            <el-table-column
              prop="status"
              :label="$t('overview.available')"
            />
            <el-table-column
              prop="version"
              :label="$t('app.packageList.version')"
            />
          </el-table>
        </div>
        <div
          class="edge-souces"
          v-if="alarmStatus !== 'alarms'"
        >
          <label class="overviewLabel">{{ $t('overview.app') }}</label>
          <el-select
            class="mt20"
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
          <br>
          <el-row :gutter="20">
            <el-col :span="24">
              <div
                style="float:right;margin-bottom:15px;"
                class="mt20"
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
                  type="primary"
                >
                  {{ $t('overview.maintenance') }}
                </el-button>
              </div>
              <el-table
                :data="appPackageList"
                style="width: 100%"
                header-row-class-name="headerClassName"
              >
                <el-table-column
                  prop="affinity"
                  :label="$t('overview.capa')"
                />
                <el-table-column
                  prop="provider"
                  :label="$t('app.packageList.vendor')"
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
        :span="16"
        :offset="2"
        style="height: 100%;"
      >
        <Map
          @node="clickNode"
          @area="clickMap"
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
import Map from './Map.vue'
import { user, overview, edge } from '../tools/request.js'
import Chart from './Chart.vue'
export default {
  components: {
    manageDialog,
    Map,
    Chart
  },
  data () {
    this.chartSettings = {
      dataName: {
        'Usage': ''
      },
      seriesMap: {
        'Usage': {
          radius: '90%',
          axisLine: {
            lineStyle: {
              color: [[1, '#6C92FA']],
              width: 7
            }
          },
          axisTick: {
            length: 0,
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            length: 0,
            show: false,
            lineStyle: {
              width: 2,
              color: '#fff'
            }
          },
          pointer: {
            length: '0%',
            width: 0,
            color: 'transparent'
          },
          detail: {
            backgroundColor: 'transparent',
            fontSize: 20,
            offsetCenter: [0, '5%'],
            formatter: (value) => {
              let val = value + '%'
              return val
            }
          },
          title: {
            offsetCenter: [0, '-40%'],
            textStyle: {
              fontSize: 20,
              fontStyle: 'italic',
              color: '#fff'
            }
          }
        }
      }
    }
    return {
      serviceInfo: {},
      mapEvents: {
        click: v => {
          console.log(v)
          this.assembly(v.name)
        }
      },
      alarmStatus: 'alarms',
      regionEdge: '',
      regionEdgeIp: '',
      regionEdgeList: [],
      mepCapabilitiesData: [],
      edgeApp: '',
      edgeAppList: [],
      chartDataCpu: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      chartDataMem: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      chartDataDisk: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      capabilitiesData: [],
      manageDialogStatus: false,
      nodeList: [],
      infoList: [],
      appPackageList: [],
      kpiInfo: [],
      loginBtnLoading: false,
      chartData: {}
    }
  },
  methods: {
    resetData () {
      this.regionEdge = ''
      this.chartDataCpu.rows[0].value = 0
      this.chartDataMem.rows[0].value = 0
      this.chartDataDisk.rows[0].value = 0
      this.mepCapabilitiesData = []
      this.appPackageList = []
      this.edgeAppList = []
      this.edgeApp = ''
    },
    clickNode (msg) {
      this.alarmStatus = 'nodeinfo'
      console.log(msg)
    },
    clickMap (msg) {
      this.alarmStatus = 'alarms'
      console.log(msg)
    },
    async nodeChange (val) {
      await this.resetData()
      await this.getNodeKpi(this.regionEdge)
      await this.getMepCap(this.regionEdge)
      await this.getAppInfo()
    },
    appChange (val) {
      this.edgeAppList.forEach(item => {
        if (item.value === val) {
          this.edgeApp = val
          this.getPackageInfo(item)
        }
      })
    },
    async assembly (city) {
      this.regionEdgeList = []
      if (this.nodeList && this.nodeList.length > 0) {
        this.nodeList.forEach(item => {
          if (item.city.indexOf(city) > -1) {
            let obj = {}
            obj.label = item.hostname
            obj.value = item.ip
            this.regionEdgeList.push(obj)
          }
        })
      }
      await this.resetData()
      if (this.regionEdgeList.length > 0) {
        this.regionEdge = this.regionEdgeList[0].label
        this.regionEdgeIp = this.regionEdgeList[0].value
        await this.getNodeKpi(this.regionEdgeList[0].value)
        await this.getMepCap(this.regionEdgeList[0].value)
        await this.getAppInfo()
      }
    },
    async getHostsInfo (city) {
      await user.getUserInfo()
      edge.getNodeList().then(res => {
        this.nodeList = res.data
        this.assembly(city)
      }).catch(() => {
        // this.$message.error(this.$t('tip.getNodeListFailed'))
      })
    },
    getPackageInfo (app) {
      overview.getPackageInfo(app).then(res => {
        this.appPackageList = []
        let obj = {}
        obj.affinity = res.data.affinity
        obj.provider = res.data.provider
        obj.version = res.data.version
        this.appPackageList.push(obj)
      }).catch(() => {
        // this.$message.error(this.$t('tip.getPackageInfoFailed'))
      })
    },
    getAppInfo () {
      overview.getAppInfo().then(res => {
        this.infoList = res.data
        if (this.infoList && this.infoList.length > 0) {
          this.infoList.forEach(item => {
            if (item.mecHost === this.regionEdgeIp) {
              let obj = {}
              obj.label = item.appName
              obj.value = item.appInstanceId
              obj.id = item.appPackageId
              obj.appId = item.appId
              this.edgeAppList.push(obj)
            }
          })
          this.edgeApp = this.edgeAppList[0].value
          if (this.edgeAppList.length > 0) {
            this.getPackageInfo(this.edgeAppList[0])
          }
        }
      }).catch(() => {
        // this.$message.error(this.$t('tip.getAppInfoFailed'))
      })
    },
    getMepCap (host) {
      overview.getMepCap(host).then(res => {
        if (res && res.data) {
          if (res.data.status !== 500) {
            this.mepCapabilitiesData = res.data
          }
        }
      }).catch(() => {
        // this.$message.error(this.$t('tip.getCapaFailed'))
      })
    },
    getNodeKpi (ip) {
      overview.getNodeKpi(ip).then(res => {
        this.kpiInfo = res.data
        if (res.data) {
          this.chartDataCpu.rows[0].value = (JSON.parse(res.data[1]).data.result[0].value[1] * 100).toFixed(2)
          this.chartDataMem.rows[0].value = (JSON.parse(res.data[2]).data.result[0].value[1] * 100).toFixed(2)
          this.chartDataDisk.rows[0].value = (JSON.parse(res.data[0]).data.result[0].value[1] * 100).toFixed(2)
        }
      }).catch(() => {
        // this.$message.error(this.$t('tip.getKpiFailed'))
      })
    },
    getServiceInfo (instanceId) {
      if (this.appPackageList.length > 0) {
        this.loginBtnLoading = true
        overview.getServiceInfo(instanceId).then(res => {
          this.serviceInfo = res.data
          this.manageDialogStatus = true
          this.loginBtnLoading = false
        }).catch(() => {
          this.loginBtnLoading = false
          // this.$message.error(this.$t('tip.getServiceFailed'))
        })
      } else {
        this.loginBtnLoading = false
        // this.$message.warning(this.$t('tip.noPackage'))
      }
    },
    async checkServiceInfo () {
      await this.getServiceInfo(this.edgeApp)
    },
    getChartData (data) {
      this.chartData = data
    }
  },
  mounted () {
    this.getHostsInfo('北京')
  },
  beforeMount () {
    this.$root.$on('refreshChart', this.getChartData)
  }
}
</script>
<style lang='less'>
.mecm-overview {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background: url('../assets/images/overview-bg.png') center no-repeat;
  margin-top: 60px;
  padding: 0 30px;
}
  label.overviewLabel{
    opacity: 0.8;
    font-family: PingFangSC-Medium,sans-serif;
    font-size: 20px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 24px;
    display: block;
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
  .content-right {
    height: 100%;
    padding:0!important;
    .my-title {
      color: white;
    }
    .edge-souces {
      padding: 0 0 20px 20px;
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
            height:15px;
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
    .progerss-item {
      text-align: center;
      color: white;
      .el-progress__text {
        color: white;
      }
      p{
        position: relative;
        top:-25px;
        color:#ddd;
        font-size:14px;
      }
    }
  }
  .headerClassName{
    font-size: 12px;
  }
</style>
