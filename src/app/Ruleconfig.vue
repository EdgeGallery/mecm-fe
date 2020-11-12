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
      :third="$t('nav.appDetail')"
      :path="{ path: '/mecm/apac/list' }"
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
            添加规则
          </el-button>
          <el-table
            class="mt20"
            :data="currPageTableData"
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
                >
                  修改
                </el-button>
                <el-button
                  id="distributeBtn"
                  type="text"
                  size="small"
                >
                  复制
                </el-button>
                <el-button
                  id="distributeBtn"
                  type="text"
                  size="small"
                >
                  删除
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
            添加规则
          </el-button>
          <el-table
            class="mt20"
            :data="trafficData"
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
                >
                  修改
                </el-button>
                <el-button
                  id="distributeBtn"
                  type="text"
                  size="small"
                >
                  复制
                </el-button>
                <el-button
                  id="distributeBtn"
                  type="text"
                  size="small"
                >
                  删除
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
        <Dnsrule v-if="dns" />
        <Trafficrule
          v-if="!dns"
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
        >
          {{ $t('common.confirm') }}
        </el-button>
      </span>
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
      currPageTableData: [
        {
          dnsRuleRedirectRuleId: 'DNS11112525',
          domainName: 'demo.edgegallery.org',
          ipAddressType: 'IP_V4',
          dnsServerIp: '119.25.142.25'
        },
        {
          dnsRuleRedirectRuleId: 'DNS11112526',
          domainName: 'demo.edgegallery.org',
          ipAddressType: 'IP_V6',
          dnsServerIp: '119.25.142.25'
        },
        {
          dnsRuleRedirectRuleId: 'DNS11112527',
          domainName: 'demo.edgegallery.org',
          ipAddressType: 'IP_v4',
          dnsServerIp: '119.25.142.25'
        }
      ],
      trafficData: [
        {
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
        },
        {
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
        },
        {
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
      ]
    }
  },
  mounted () {

  },
  methods: {
    handleSelectionChange () {},
    addDnsRule () {
      this.dns = true
      this.dialog = true
    },
    addTrafficRule () {
      this.dns = false
      this.dialog = true
    }
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
