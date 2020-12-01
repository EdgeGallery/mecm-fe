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
            :data="dnsRulesData"
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
                  @click="copyDnsRules"
                >
                  {{ $t('common.copy') }}
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
            :data="trafficRulesData"
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
                  @click="copyTrafficRule"
                >
                  {{ $t('common.copy') }}
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
      :title="$t('app.instanceList.addRule')"
      :visible.sync="dialog"
      width="45%"
    >
      <div class="dialogContent">
        <Dnsrule v-if="dns" />
        <Trafficrule v-if="!dns" />
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
          @click="dns?addDnsRules():addTrafficRules()"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('app.ruleConfig.trafficFilter')"
      :visible.sync="filterShow"
      width="45%"
    >
      <div class="dialogContent">
        <el-table :data="filterData">
          <el-table-column
            prop="srcAddress"
            :label="$t('app.ruleConfig.srcAddress')"
            width="120"
          />
          <el-table-column
            prop="srcPort"
            :label="$t('app.ruleConfig.srcPort')"
          />
          <el-table-column
            prop="dstAddress"
            :label="$t('app.ruleConfig.dstAddress')"
            width="120"
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '../components/BreadCrumb'
import Dnsrule from './Dnsrule'
import Trafficrule from './Trafficrule'
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
      dnsRulesData: [],
      trafficRulesData: [],
      filterShow: false,
      filterData: [],
      dnsRules: {
        dnsRuleId: 'DNS132654',
        domainName: 'edgegallery.org',
        ipAddressType: 'IP_V4',
        dnsServerIp: '1.2.3.4',
        ttl: '86400'
      },
      trafficRules: {
        trafficRuleId: '111',
        action: 'DROP',
        filterType: 'FLOW',
        priority: 125,
        trafficFilter: [{
          ipAddressType: 'IP_V4',
          srcAddress: '172.30.2.0/28',
          srcPort: '8080',
          dstAddress: '118.9.25.452/28',
          dstPort: '30000',
          protocol: 'ANY',
          qci: '1',
          dscp: '0',
          tc: '1'
        }, {
          ipAddressType: 'IP_V4',
          srcAddress: '172.30.2.0/28',
          srcPort: '8080',
          dstAddress: '118.9.25.452/28',
          dstPort: '30000',
          protocol: 'ANY',
          qci: '1',
          dscp: '0',
          tc: '1'
        }]
      }
    }
  },
  mounted () {

  },
  methods: {
    onDnsRulesJsonChange (value) {
      console.log('value:', value)
    },
    onTrafficRulesJsonChange (value) {
      console.log('value:', value)
    },
    addTrafficRules () {
      this.dialog = false
      this.trafficRulesData.push(this.trafficRules)
      this.$message.success(this.$t('tip.successToAddRules'))
    },
    addDnsRules () {
      this.dialog = false
      this.dnsRulesData.push(this.dnsRules)
      this.$message.success(this.$t('tip.successToAddRules'))
    },
    checkFilter (row) {
      this.filterShow = true
      this.filterData = row.trafficFilter
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
    editTrafficRule () {},
    copyTrafficRule () {},
    deleteTrafficRule () {},
    editDnsRules () {},
    copyDnsRules () {},
    deleteDnsRules () {}
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
</style>
