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
          label="DNS Rule"
          name="dns"
        >
          <el-button
            size="mini"
            @click="addDnsRule"
          >
            {{ $t('app.instanceList.addDnsRules') }}
          </el-button>
          <el-button
            size="mini"
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
              prop="dnsServerIp"
              label="DNS IP Address"
              width="180"
            />
            <el-table-column
              prop="ipAddressType"
              label="IP Address Type"
              width="180"
            />
            <el-table-column
              prop="domainName"
              label="Domain Name"
              width=""
            />
            <el-table-column
              :label="$t('common.operation')"
              width="180"
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
          label="Traffic Rule"
          name="traffic"
        >
          <el-button
            size="mini"
            @click="addTrafficRule"
          >
            {{ $t('app.instanceList.addTrafficRules') }}
          </el-button>
          <el-button
            size="mini"
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
              prop="trafficFilter.srcAddress"
              label="SRC Address"
              width="180"
            />
            <el-table-column
              prop="trafficFilter.srcPort"
              label="SRC Port"
              width="180"
            />
            <el-table-column
              prop="trafficFilter.dstAddress"
              label="DST Address"
              width="180"
            />
            <el-table-column
              prop="trafficFilter.dstPort"
              label="DST Port"
              width="180"
            />
            <el-table-column
              prop="trafficFilter.protocol"
              label="Protocol"
            />
            <el-table-column
              prop="trafficFilter.qci"
              label="QCI"
            />
            <el-table-column
              prop="trafficFilter.dscp"
              label="DSCP"
            />
            <el-table-column
              prop="trafficFilter.tc"
              label="TC"
            />
            <el-table-column
              prop="priority"
              label="Priority"
              width="180"
            />
            <el-table-column
              prop="action"
              label="Action"
            />
            <el-table-column
              :label="$t('common.operation')"
              width="180"
            >
              <template>
                <el-button
                  id="deleteBtn"
                  type="text"
                  size="small"
                  @click="editTrafficRule"
                >
                  {{ $t('common.modify') }}
                </el-button>
                <el-button
                  id="distributeBtn"
                  type="text"
                  size="small"
                  @click="copyTrafficRule"
                >
                  {{ $t('common.copy') }}
                </el-button>
                <el-button
                  id="distributeBtn"
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
      :title="$t('app.distriList.deploymentConf')"
      :visible.sync="dialog"
      width="50%"
    >
      <div class="dialogContent">
        <vue-json-editor
          v-if="dns"
          v-model="dnsRules"
          :show-btns="true"
          :expanded-on-start="true"
          @json-change="onDnsRulesJsonChange"
        />
        <vue-json-editor
          v-if="!dns"
          v-model="trafficRules"
          :show-btns="true"
          :expanded-on-start="true"
          @json-change="onTrafficRulesJsonChange"
        />
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
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
  </div>
</template>

<script>
import Breadcrumb from '../components/BreadCrumb'
import vueJsonEditor from 'vue-json-editor'
// import Dnsrule from './Dnsrule'
// import Trafficrule from './Trafficrule'
export default {
  name: 'Ruleconfig',
  components: {
    Breadcrumb,
    vueJsonEditor
    // Dnsrule,
    // Trafficrule
  },
  data () {
    return {
      activeName: 'dns',
      dns: true,
      dialog: false,
      dnsRulesData: [],
      trafficRulesData: [],
      dnsRules: {
        dnsRuleRedirectRuleId: 'DNS11112525',
        domainName: 'demo.edgegallery.org',
        ipAddressType: 'IP_V4',
        dnsServerIp: '119.25.142.25'
      },
      trafficRules: {
        action: 'DROP',
        filterType: 'FLOW',
        priority: 125,
        trafficFilter: {
          ipAddressType: 'IP_V4',
          srcAddress: '172.30.2.0/28',
          srcPort: '8080',
          dstAddress: '118.9.25.452/28',
          dstPort: '30000',
          protocol: 'ANY',
          qci: '1',
          dscp: '0',
          tc: '1'
        }
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
      this.trafficRulesData.push(this.trafficRules)
      this.$message.success('你已经成功添加一条流量规则')
    },
    addDnsRules () {
      console.log(this.dnsRule)
      this.dnsRulesData.push(this.dnsRules)
      this.$message.success('你已经成功添加一条DNS规则')
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
</style>
