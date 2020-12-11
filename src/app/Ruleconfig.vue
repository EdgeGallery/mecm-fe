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
  <div class="ruleconfig">
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.mecm')"
      :second="$t('nav.appMana')"
      :third="$t('nav.ruleConfiguration')"
      :path="{ path: '/mecm/ains/list' }"
    />
    <div class="ruleconfigcontent">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="$t('app.ruleConfig.dnsRule')"
          name="dns"
        >
          <el-button
            size="mini"
            id="addDnsRuleBtn"
            class="btn"
            @click="addDnsRule"
          >
            {{ $t('app.instanceList.addDnsRules') }}
          </el-button>
          <el-button
            size="mini"
            class="btn"
            id="batchDeleteDnsBtn"
            @click="batchDeleteDns"
          >
            {{ $t('app.instanceList.batchDeleteDnsRules') }}
          </el-button>
          <el-table
            class="mt20"
            :data="dnsRuleData"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%;"
          >
            <el-table-column
              type="selection"
              revers-selection
              width="50"
            />
            <el-table-column
              prop="dnsRuleId"
              :label="$t('app.ruleConfig.dnsRuleId')"
            />
            <el-table-column
              prop="dnsServerIp"
              :label="$t('app.ruleConfig.ipAddress')"
            />
            <el-table-column
              prop="ipAddressType"
              :label="$t('app.ruleConfig.ipAddress')"
            />
            <el-table-column
              prop="domainName"
              :label="$t('app.ruleConfig.domainName')"
            />
            <el-table-column
              prop="ttl"
              :label="$t('app.ruleConfig.priority')"
            />
            <el-table-column
              :label="$t('common.operation')"
              align="center"
            >
              <template>
                <el-button
                  id="deleteBtn"
                  type="text"
                  size="small"
                  @click="editDnsRules"
                >
                  {{ $t('common.modify') }}
                </el-button>
                <el-button
                  id="distributeBtn"
                  type="text"
                  size="small"
                  @click="deleteDnsRules"
                >
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('app.ruleConfig.trafficRule')"
          name="traffic"
        >
          <el-button
            size="mini"
            class="btn"
            id="addTrafficRuleBtn"
            @click="addTrafficRule"
          >
            {{ $t('app.instanceList.addTrafficRules') }}
          </el-button>
          <el-button
            size="mini"
            class="btn"
            id="batchDeleteTrafficBtn"
            @click="batchDeleteTraffic"
          >
            {{ $t('app.instanceList.batchDeleteTrafficRules') }}
          </el-button>
          <el-table
            class="mt20"
            :data="trafficRuleData"
            border
            @selection-change="handleSelectionChange"
            style="width: 100%;"
          >
            <el-table-column
              type="selection"
              revers-selection
              width="50"
            />
            <el-table-column
              prop="trafficRuleId"
              :label="$t('app.ruleConfig.trafficRuleId')"
            />
            <el-table-column
              prop="filterType"
              :label="$t('app.ruleConfig.filterType')"
            />
            <el-table-column
              prop="priority"
              :label="$t('app.ruleConfig.priority')"
            />
            <el-table-column
              prop="action"
              :label="$t('app.ruleConfig.action')"
            />
            <el-table-column
              :label="$t('common.operation')"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  id=""
                  type="text"
                  size="small"
                  @click="checkFilter(scope.row)"
                >
                  {{ $t('app.ruleConfig.checkRules') }}
                </el-button>
                <el-button
                  id=""
                  type="text"
                  size="small"
                  @click="editTrafficRule"
                >
                  {{ $t('common.modify') }}
                </el-button>
                <el-button
                  id=""
                  type="text"
                  size="small"
                  @click="deleteTrafficRule"
                >
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('app.instanceList.addRule')"
      :visible.sync="dialog"
      :width="dns?'30%':'75%'"
    >
      <div class="dialogContent">
        <Dnsrule
          :dnsrule="dnsRule"
          v-if="dns"
        />
        <Trafficrule
          :trafficrule="trafficRule"
          :trafficfilter="trafficRule.trafficFilter"
          :dstinterface="trafficRule.dstInterface"
          v-if="!dns"
        />
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          @click="dialog=false"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          @click="addRules"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      :close-on-click-modal="false"
      title="详情"
      :visible.sync="filterShow"
      width="45%"
    >
      <div class="dialogContent">
        <!-- 分流规则 -->
        <p class="title">
          {{ $t('app.ruleConfig.trafficFilter') }}
        </p>
        <el-table
          class="mt20"
          border
          size="small"
          style="width: 100%;"
          :data="filterData"
        >
          <el-table-column
            prop="srcAddress"
            :label="$t('app.ruleConfig.srcAddress')"
          />
          <el-table-column
            prop="srcPort"
            :label="$t('app.ruleConfig.srcPort')"
          />
          <el-table-column
            prop="dstAddress"
            :label="$t('app.ruleConfig.dstAddress')"
          />
          <el-table-column
            prop="dstPort"
            :label="$t('app.ruleConfig.dstPort')"
          />
          <el-table-column
            prop="protocol"
            :label="$t('app.ruleConfig.protocol')"
          />
          <el-table-column
            prop="dstTunnelAddress"
            label="隧道目的地址"
          />
          <el-table-column
            prop="dstTunnelPort"
            label="隧道目的端口"
          />
          <el-table-column
            prop="srcTunnelAddress"
            label="隧道源地址"
          />
          <el-table-column
            prop="srcTunnelPort"
            label="隧道源端口"
          />
          <el-table-column
            prop="tag"
            label="Tag"
          />
          <el-table-column
            prop="qci"
            label="QCI"
          />
          <el-table-column
            prop="dscp"
            label="DSCP"
          />
          <el-table-column
            prop="tc"
            label="TC"
          />
        </el-table>

        <!-- 接口信息 -->
        <p class="title">
          接口信息
        </p>
        <el-table
          class="mt20"
          :data="interfaceData"
          border
          size="small"
          style="width: 100%;"
        >
          <el-table-column
            prop="interfaceType"
            label="接口类型"
          />
          <el-table-column
            prop="tunnelInfo.tunnelType"
            label="隧道类型"
          />
          <el-table-column
            prop="tunnelInfo.tunnelDstAddress"
            label="隧道目的地址"
            width="120px"
          />
          <el-table-column
            prop="tunnelInfo.tunnelSrcAddress"
            label="隧道源地址"
          />
          <el-table-column
            prop="tunnelInfo.tunnelSpecificData"
            label="隧道指定参数"
          />
          <el-table-column
            prop="dstMACAddress"
            label="目的MAC地址"
          />
          <el-table-column
            prop="srcMACAddress"
            label="源MAC地址"
          />
          <el-table-column
            prop="dstIPAddress"
            label="目的IP地址"
          />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../components/BreadCrumb'
import Dnsrule from './Dnsrule'
import Trafficrule from './Trafficrule'
import { app } from '../tools/request.js'
export default {
  name: 'Ruleconfig',
  components: {
    Breadcrumb,
    Dnsrule,
    Trafficrule
  },
  data () {
    return {
      activeName: 'dns',
      dns: true,
      dialog: false,
      dnsRuleData: [],
      trafficRuleData: [],
      filterShow: false,
      filterData: [],
      interfaceData: [],
      rules: {
        appTrafficRule: [],
        appDNSRule: [],
        appName: 'abc',
        appSupportMp1: false
      },
      dnsRule: {
        dnsRuleId: '',
        domainName: '',
        ipAddressType: '',
        dnsServerIp: '',
        ttl: ''
      },
      trafficRule: {
        trafficRuleId: '',
        action: '',
        filterType: '',
        priority: 0,
        trafficFilter: [],
        dstInterface: []
      }
    }
  },
  mounted () {

  },
  methods: {
    addConfigRules () {
      app.addConfigRules(sessionStorage.getItem('instanceId'), this.rules).then(res => {
        this.$message.success(this.$t('tip.successToAddRules'))
        this.getConfigRules()
      }).catch(err => {
        console.log(err)
      })
    },
    getConfigRules () {
      app.getConfigRules().then(res => {
        this.trafficRuleData = res.data.appTrafficRule
        this.dnsData = res.data.appDNSRule
      }).catch(err => {
        console.log(err)
      })
    },
    addRules () {
      this.rules.appTrafficRule.push(this.trafficRule)
      this.rules.appDNSRule.push(this.dnsRule)
      console.log(this.rules)
      this.getConfigRules()
      this.dialog = false
    },
    checkFilter (row) {
      this.filterShow = true
      this.filterData = row.trafficFilter
      this.interfaceData = row.dstInterface
    },
    handleClick () {},
    handleSelectionChange () {},
    addDnsRule () {
      this.dns = true
      this.dialog = true
    },
    addTrafficRule () {
      this.dns = false
      this.dialog = true
    },
    batchDeleteTraffic () {},
    batchDeleteDns () {},
    copyTrafficRule () {},
    deleteTrafficRule () {},
    editDnsRules (row) {
      this.dialog = true
      let data = JSON.parse(JSON.stringify(row))
      this.dnsRule = data
    },
    deleteDnsRules () {},
    editTrafficRule () {}
  }
}
</script>

<style lang='less' scoped>
.ruleconfigcontent {
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
}
.btn{
  margin:15px 15px 15px 0;
}
.title{
  margin:15px 3px;
  font-size:18px;
}
.title::before{
  content:'';
  display:inline-block;
  width:3px;
  height:17px;
  margin-right:3px;
  background: #409EFF;
  position: relative;
  top:2px;
}
</style>
