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
        :lg="10"
        :md="10"
        :sm="10"
        :xs="10"
        style="height: 100%;"
      >
        <div
          class="edge-souces blockContent"
          v-if="showType === 'overview'"
          style="height: 300px;margin-bottom: 30px; border-radius:16px;margin-top: 0;"
        >
          <div id="nodeChart" />
        </div>
        <div
          class="blockContent"
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
                    :class="scope.row.status?'el-icon-success':'el-icon-error'"
                  /> {{ scope.row.status?$t('common.online'):$t('common.offline') }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="city"
                width="150"
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
          v-else
        >
          <el-row
            :gutter="10"
          >
            <div
              class="blockContent"
              style="margin-top: 0;"
            >
              <div class="secondLabel">
                {{ $t('overview.nodeInfo') }}
              </div>
              <div class="nodeBasicInfo">
                <p class="nodeInfo">
                  <span>{{ $t('overview.nodeName') }}</span>{{ nodeBasicInfo.mechostName }}
                  <span style="margin-left: 25px;">{{ $t('overview.nodeIp') }}</span>{{ nodeBasicInfo.mechostIp }}
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
              style="height: 260px;"
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
import echarts from 'echarts'
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
      nodeBasicInfo: null,
      nodeNum: 0,
      onlineNum: 0,
      offlineNum: 0,
      city: '',
      edgeIp: '',
      nodeList: [],
      detail: {},
      screenHeight: 0,
      usageData: {},
      myChart: null,
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
        matrixPopDiv.style.top = nodelistTable.offsetTop + 100 + 'px'
        matrixPopDiv.style.left = nodelistTable.offsetLeft + 160 + 'px'
      }
    },
    handleRowSelection (ip) {
      appo.getNodeKpi(ip).then(res => {
        if (res.data) {
          this.usageData = res.data.data
          this.intervalDialog = setInterval(() => this.showDialogPosition())
          this.showUsageDialog = true
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
      msg.forEach(item => {
        if (item.status) {
          this.onlineNum++
        } else {
          this.offlineNum++
        }
      })
      this.loadNodeChart(this.$i18n.locale)
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
          this.mepCapData = res.data
        }
      })
    },
    getNodeKpi (ip) {
      appo.getNodeKpi(ip).then(res => {
        if (res.data) {
          this.kpiInfo = res.data.data
        } else {
          this.kpiInfo = {}
        }
      }).catch((err) => {
        console.log(err)
        this.kpiInfo = {}
      })
    },
    loadNodeChart (locale) {
      let nodeData = [{
        name: this.$t('overview.onlineNodes'),
        value: this.onlineNum
      }, {
        name: this.$t('overview.offlineNodes'),
        value: this.offlineNum
      }]

      let data = []
      let color = ['#23F1BA', '#FFE169']
      for (var i = 0; i < nodeData.length; i++) {
        data.push({
          value: nodeData[i].value,
          name: nodeData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: color[i],
              shadowColor: color[i]
            }
          }
        })
      }
      let option = {
        color: color,
        title: {
          text: this.$t('overview.edgeNodes') + this.nodeNum,
          top: '46%',
          textAlign: 'center',
          left: '49%',
          textStyle: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '400'
          }
        },
        legend: {
          orient: 'vertical',
          y: 'top',
          data: [this.$t('overview.onlineNodes'), this.$t('overview.offlineNodes')],
          right: 20,
          top: 20,
          align: 'left',
          textStyle: {
            color: '#fff',
            fontSize: 13
          }
        },
        series: [{
          name: 'node-chart',
          type: 'pie',
          radius: [80, 95],
          top: 20,
          hoverAnimation: true,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#fff',
                fontSize: 13,
                formatter: function (params) {
                  if (params.name !== '') {
                    let num = 'Number: '
                    if (locale === 'cn') {
                      num = '数量：'
                    }
                    return params.name + '\n' + '\n' + num + params.value
                  } else {
                    return ''
                  }
                }
              },
              labelLine: {
                length: 10,
                length2: 90,
                show: true,
                color: '#fff'
              }
            }
          },
          data: data
        }]
      }
      setTimeout(() => {
        let nodeChart = document.getElementById('nodeChart')
        this.myChart = echarts.init(nodeChart)
        this.myChart.setOption(option, true)
      })
    }
  }
}
</script>
<style lang='less'>
  #nodeChart{
    width: 100%;
    height: 100%;
  }
  .mecm-overview {
    position: absolute;
    top: 64px;
    width: 100%;
    height:calc(100% - 114px);
    overflow: auto;
    background-size: cover;
    box-sizing: border-box;
    padding-top: 50px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .ml20 {
    margin-left: 20px;
  }
  .nodeBasicInfo{
    color:#ffffff;
    font-size: 18px;
    margin: 15px 0 15px 30px;
    .nodeInfo:nth-child(2){
      padding: 15px 0;
    }
  }
  .my-title {
    color: white;
  }
  .blockContent{
    height: calc(100% - 330px);
    border-radius:16px;
    padding: 20px;
    margin-top: 15px;
    background: rgba(46,20,124,0.7);
    backdrop-filter: blur(12px);
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

  .nodeTable.headerClassName{
    font-size: 14px !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }
  .nodelistTable{
    max-height: 450px;
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
    box-sizing: border-box;
    padding-left: 20px!important;
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
    padding: 20px 3%;
    .numLeft{
      width: 50%;
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
