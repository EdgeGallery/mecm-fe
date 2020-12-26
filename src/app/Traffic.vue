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
  <div>
    <!-- pannel -->
    <div class="pannel">
      <el-button
        size="mini"
        class="btn"
        id="addTrafficRuleBtn"
        @click="showDialog"
      >
        {{ $t('app.instanceList.addTrafficRules') }}
      </el-button>
      <el-button
        size="mini"
        class="btn"
        id="batchDeleteTrafficBtn"
        @click="batchDeleteTrafficRule"
      >
        {{ $t('app.instanceList.batchDeleteTrafficRules') }}
      </el-button>

      <!-- trafficRuleTable -->
      <el-table
        v-loading="loading"
        class="mt20"
        :data="trafficRuleTableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange"
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
              @click="checkDetail(scope.row)"
            >
              {{ $t('app.ruleConfig.checkRules') }}
            </el-button>
            <el-button
              id=""
              type="text"
              size="small"
              @click="editTraRule(scope.$index, trafficRuleTableData)"
            >
              {{ $t('common.modify') }}
            </el-button>
            <el-button
              id=""
              type="text"
              size="small"
              @click="deleteTraRule(scope.$index,scope.row)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- check Detail dialog-->
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('common.detail')"
      :visible.sync="showDetail"
      width="45%"
    >
      <div class="dialogContent">
        <Detail
          :data="detail"
        />
      </div>
    </el-dialog>

    <!-- all operation dialog -->
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('app.instanceList.addRule')"
      :visible.sync="operationDialog"
      width="75%"
    >
      <div class="dialogContent">
        <p class="title">
          {{ $t('app.ruleConfig.trafficRule') }}
        </p>

        <el-form
          label-width="120px"
          :model="appTrafficRule"
          status-icon
          ref="appTrafficRule"
          :rules="formRules"
        >
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('app.ruleConfig.trafficRuleId')"
                prop="trafficRuleId"
              >
                <el-input
                  id=""
                  maxlength="30"
                  v-model="appTrafficRule.trafficRuleId"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.priority')"
              >
                <el-input-number
                  v-model="appTrafficRule.priority"
                  :min="1"
                  :max="255"
                  label="1-255"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('app.ruleConfig.action')"
              >
                <el-select
                  v-model="appTrafficRule.action"
                  :placeholder="$t('tip.pleaseSelect')"
                >
                  <el-option
                    v-for="item in action"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.filterType')"
              >
                <el-select
                  v-model="appTrafficRule.filterType"
                  :placeholder="$t('tip.pleaseSelect')"
                >
                  <el-option
                    v-for="item in filterType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <!-- 新增Filter -->
        <div>
          <p class="title">
            {{ $t('app.ruleConfig.trafficFilter') }}
            <el-button-group class="rt">
              <el-button
                type="text"
                class="btn"
                @click="addNew(1)"
              >
                {{ $t('app.instanceList.addFilter') }}
              </el-button>
            </el-button-group>
          </p>

          <!-- filter table -->
          <el-table
            class="mt20"
            :data="trafficFilterData"
            border
            size="small"
            style="width: 100%;"
          >
            <el-table-column
              prop="srcAddress"
              :label="$t('app.ruleConfig.srcAddress')"
              width="120px"
            />
            <el-table-column
              prop="srcPort"
              :label="$t('app.ruleConfig.srcPort')"
            />
            <el-table-column
              prop="dstAddress"
              :label="$t('app.ruleConfig.dstAddress')"
              width="120px"
            />
            <el-table-column
              prop="dstPort"
              :label="$t('app.ruleConfig.dstPort')"
            />
            <el-table-column
              prop="dstTunnelAddress"
              :label="$t('app.ruleConfig.dstTunnelAddress')"
            />
            <el-table-column
              prop="dstTunnelPort"
              :label="$t('app.ruleConfig.srcTunnelPort')"
              width="120px"
            />
            <el-table-column
              prop="srcTunnelAddress"
              :label="$t('app.ruleConfig.srcTunnelAddress')"
              width="120px"
            />
            <el-table-column
              prop="srcTunnelPort"
              :label="$t('app.ruleConfig.dstTunnelPort')"
              width="120px"
            />
            <el-table-column
              prop="tag"
              label="Tag"
            />
            <el-table-column
              prop="qCI"
              label="QCI"
            />
            <el-table-column
              prop="dSCP"
              label="DSCP"
            />
            <el-table-column
              prop="tC"
              label="TC"
            />
            <el-table-column
              :label="$t('common.operation')"
              width="120"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  id=""
                  type="text"
                  size="small"
                  @click="modifyLines(scope.$index,scope.row,1)"
                >
                  {{ $t('common.modify') }}
                </el-button>
                <el-button
                  id="deleteBtn"
                  type="text"
                  size="small"
                  @click="deleteLines(scope.$index, trafficFilterData)"
                >
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 新增interface -->
        <div>
          <p class="title">
            {{ $t('app.ruleConfig.interfaceDescriptor') }}
            <el-button-group class="rt">
              <el-button
                type="text"
                class="btn"
                @click="addNew(2)"
              >
                {{ $t('app.ruleConfig.addNewInterfaceInfo') }}
              </el-button>
            </el-button-group>
          </p>

          <!-- interface table -->
          <div>
            <el-table
              class="mt20"
              :data="dstInterfaceData"
              border
              size="small"
              style="width: 100%;"
            >
              <el-table-column
                prop="interfaceType"
                :label="$t('app.ruleConfig.interfaceType')"
              />
              <el-table-column
                prop="tunnelInfo.tunnelType"
                :label="$t('app.ruleConfig.tunnelType')"
              />
              <el-table-column
                prop="tunnelInfo.tunnelDstAddress"
                :label="$t('app.ruleConfig.dstTunnelAddress')"
                width="120px"
              />
              <el-table-column
                prop="tunnelInfo.tunnelSrcAddress"
                :label="$t('app.ruleConfig.srcTunnelAddress')"
              />
              <el-table-column
                prop="tunnelInfo.tunnelSpecificData"
                :label="$t('app.ruleConfig.tunnelSpecificData')"
              />
              <el-table-column
                prop="dstMacAddress"
                :label="$t('app.ruleConfig.dstMacAddress')"
              />
              <el-table-column
                prop="srcMacAddress"
                :label="$t('app.ruleConfig.srcMacAddress')"
              />
              <el-table-column
                prop="dstIpAddress"
                :label="$t('app.ruleConfig.dstAddress')"
              />
              <el-table-column
                :label="$t('common.operation')"
                width="120"
                fixed="right"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button
                    id=""
                    type="text"
                    size="small"
                    @click="modifyLines(scope.$index,scope.row,2)"
                  >
                    {{ $t('common.modify') }}
                  </el-button>
                  <el-button
                    id="deleteBtn"
                    type="text"
                    size="small"
                    @click="deleteLines(scope.$index, dstInterfaceData)"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- Filter dialog -->
        <el-dialog
          :close-on-click-modal="false"
          width="50%"
          :title="$t('app.ruleConfig.trafficRule')"
          :visible.sync="innerFilterVisible"
          append-to-body
        >
          <el-row>
            <el-form
              label-width="125px"
              :model="trafficFilter"
              status-icon
              ref="trafficFilter"
              :rules="formTrafficfilterRules"
            >
              <el-col :span="12">
                <el-form-item
                  :label="$t('app.ruleConfig.srcAddress')"
                  prop="srcAddress"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.srcAddress"
                    :placeholder="$t('app.ruleConfig.mutipleIp')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.srcPort')"
                  prop="srcPort"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.srcPort"
                    :placeholder="$t('app.ruleConfig.mutiplePort')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.dstAddress')"
                  prop="dstAddress"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dstAddress"
                    :placeholder="$t('app.ruleConfig.mutipleIp')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.dstPort')"
                  prop="dstPort"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dstPort"
                    :placeholder="$t('app.ruleConfig.mutiplePort')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.tag')"
                  prop="tag"
                >
                  <el-input
                    v-model="trafficFilter.tag"
                    :placeholder="$t('app.ruleConfig.mutipleTag')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.protocol')"
                  prop="protocol"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.protocol"
                    :placeholder="$t('app.ruleConfig.mutipleProtocol')"
                  />
                </el-form-item>
                <el-form-item
                  label="QCI"
                  prop="qCI"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.qCI"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="DSCP"
                  prop="dSCP"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dSCP"
                  />
                </el-form-item>
                <el-form-item
                  label="TC"
                  prop="tc"
                >
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.tC"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.dstTunnelAddress')"
                  prop="dstTunnelAddress"
                >
                  <el-input
                    v-model="trafficFilter.dstTunnelAddress"
                    :placeholder="$t('app.ruleConfig.mutipleIp')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.srcTunnelPort')"
                  prop="dstTunnelPort"
                >
                  <el-input
                    v-model="trafficFilter.dstTunnelPort"
                    :placeholder="$t('app.ruleConfig.mutiplePort')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.srcTunnelAddress')"
                  prop="srcTunnelAddress"
                >
                  <el-input
                    v-model="trafficFilter.srcTunnelAddress"
                    :placeholder="$t('app.ruleConfig.mutipleIp')"
                  />
                </el-form-item>
                <el-form-item
                  :label="$t('app.ruleConfig.dstTunnelPort')"
                  prop="srcTunnelPort"
                >
                  <el-input
                    v-model="trafficFilter.srcTunnelPort"
                    :placeholder="$t('app.ruleConfig.mutiplePort')"
                  />
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="cancelEdit('trafficFilter')">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button
              type="primary"
              @click="confirmToAdd('trafficFilter')"
            >
              {{ $t('common.confirm') }}
            </el-button>
          </div>
        </el-dialog>

        <!-- interface dialog -->
        <el-dialog
          :close-on-click-modal="false"
          width="30%"
          :title="$t('app.ruleConfig.interfaceInfo')"
          :visible.sync="innerInterfaceVisible"
          append-to-body
        >
          <el-row>
            <el-form
              label-width="125px"
              :model="dstInterface"
              status-icon
              ref="dstInterface"
              :rules="formInterfaceRules"
            >
              <p class="title">
                {{ $t('app.ruleConfig.interfaceInfo') }}
              </p>
              <el-form-item
                :label="$t('app.ruleConfig.interfaceType')"
                prop="interfaceType"
              >
                <el-select
                  v-model="dstInterface.interfaceType"
                  :placeholder="$t('tip.pleaseSelect')"
                >
                  <el-option
                    v-for="item in interfaceType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <p class="title">
                {{ $t('app.ruleConfig.tunnelInfo') }}
              </p>
              <el-form-item
                :label="$t('app.ruleConfig.tunnelType')"
                prop="tunnelType"
              >
                <el-select
                  v-model="dstInterface.tunnelInfo.tunnelType"
                  :placeholder="$t('tip.pleaseSelect')"
                >
                  <el-option
                    v-for="item in tunnelType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.srcTunnelAddress')"
                prop="tunnelSrcAddress"
              >
                <el-input
                  v-model="dstInterface.tunnelInfo.tunnelSrcAddress"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.dstTunnelAddress')"
                prop="tunnelDstAddress"
              >
                <el-input
                  v-model="dstInterface.tunnelInfo.tunnelDstAddress"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.tunnelSpecificData')"
                prop="tunnelSpecificData"
              >
                <el-input
                  v-model="dstInterface.tunnelInfo.tunnelSpecificData"
                />
              </el-form-item>
              <p class="title">
                {{ $t('app.ruleConfig.macInfo') }}
              </p>
              <el-form-item
                :label="$t('app.ruleConfig.srcMacAddress')"
                prop="srcMacAddress"
              >
                <el-input
                  v-model="dstInterface.srcMacAddress"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.dstMacAddress')"
                prop="dstMacAddress"
              >
                <el-input
                  v-model="dstInterface.dstMacAddress"
                />
              </el-form-item>
              <p class="title">
                {{ $t('app.ruleConfig.ipInfo') }}
              </p>
              <el-form-item
                :label="$t('app.ruleConfig.dstAddress')"
                prop="dstIpAddress"
              >
                <el-input
                  v-model="dstInterface.dstIpAddress"
                />
              </el-form-item>
            </el-form>
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="cancelEdit('dstInterface')">
              {{ $t('common.cancel') }}
            </el-button>
            <el-button
              type="primary"
              @click="confirmToAdd('dstInterface')"
            >
              {{ $t('common.confirm') }}
            </el-button>
          </div>
        </el-dialog>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          @click="cancelAddRule"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          @click="confirmToAddTraRules"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { app } from '../tools/request.js'
import Detail from './TrafficDetail.vue'
export default {
  components: {
    Detail
  },
  data () {
    return {
      dialog: false,
      timer: null,
      loading: false,
      operationDialog: false,
      innerFilterVisible: false,
      innerInterfaceVisible: false,
      showDetail: false,
      index: -1,
      appName: sessionStorage.getItem('instanceName'),
      rule: {
        appTrafficRule: [],
        appDNSRule: [],
        appName: '',
        appSupportMp1: true
      },
      detail: {},
      filterType: [
        {
          value: 'FLOW',
          label: 'FLOW'
        },
        {
          value: 'PACKET',
          label: 'PACKET'
        }
      ],
      action: [
        {
          value: 'DROP',
          label: 'DROP'
        },
        {
          value: 'FORWARD_DECAPSULATED',
          label: 'FORWARD_DECAPSULATED'
        },
        {
          value: 'FORWARD_AS_IS',
          label: 'FORWARD_AS_IS'
        },
        {
          value: 'PASSTHROUGH',
          label: 'PASSTHROUGH'
        },
        {
          value: 'SUPLICATED_DECAPSULATED',
          label: 'SUPLICATED_DECAPSULATED'
        }

      ],
      interfaceType: [
        {
          value: 'TUNNEL',
          label: 'TUNNEL'
        },
        {
          value: 'MAC',
          label: 'MAC'
        },
        {
          value: 'IP',
          label: 'IP'
        }
      ],
      tunnelType: [
        {
          value: 'GTP-U',
          label: 'GTP-U'
        },
        {
          value: 'GRE',
          label: 'GRE'
        }
      ],
      trafficRuleTableData: [],
      appTrafficRule: {
        trafficRuleId: '',
        action: 'DROP',
        filterType: 'FLOW',
        priority: 0,
        trafficFilter: [],
        dstInterface: []
      },
      trafficFilterData: [],
      dstInterfaceData: [],
      trafficFilter: {
        srcAddress: '192.168.1.1/32',
        srcPort: '8080',
        dstAddress: '192.168.1.1/32',
        dstPort: '8080',
        protocol: 'ANY',
        qCI: '0',
        dSCP: '0',
        tC: '0',
        tag: 'tag',
        srcTunnelAddress: '1.1.1.1',
        srcTunnelPort: '8080',
        dstTunnelAddress: '2.2.2.2',
        dstTunnelPort: '8080'
      },
      dstInterface: {
        interfaceType: 'TUNNEL',
        tunnelInfo: {
          tunnelType: 'GRE',
          tunnelDstAddress: '3.3.3.3',
          tunnelSrcAddress: '4.4.4.4',
          tunnelSpecificData: 'any'
        },
        srcMacAddress: '02-00-00-00-00-00',
        dstMacAddress: '02-00-00-00-00-00',
        dstIpAddress: '5.5.5.5'
      },
      interfaceIndex: -1,
      filterIndex: -1,
      selectedData: [],
      type: 1
    }
  },
  computed: {
    formformInterfaceRulesRules () {
      let formInterfaceRules = {
        tunnelDstAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        tunnelSrcAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        srcMacAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, message: this.$t('verify.normalVerify') }
        ],
        dstMacAddress: [
          { required: false, message: this.$t('tip.macMust'), trigger: 'blur' },
          { pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, message: this.$t('verify.normalVerify') }
        ],
        dstIpAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ]
      }
      return formInterfaceRules
    },
    formRules () {
      let formRules = {
        trafficRuleId: [
          { required: true, message: this.$t('idMust'), trigger: 'blur' }
        ]
      }
      return formRules
    },
    formTrafficfilterRules () {
      let formTrafficfilterRules = {
        srcAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        srcPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        dstAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        dstPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        srcTunnelAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        srcTunnelPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        dstTunnelAddress: [
          { required: false, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        dstTunnelPort: [
          { required: false, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ]
      }
      return formTrafficfilterRules
    }
  },
  methods: {
    showDialog () {
      this.index = -1
      this.operationDialog = true
    },
    changeSToA (str) {
      return str.split(',')
    },
    changeAToS (arr) {
      return arr.join(',')
    },
    handleSelectionChange (selection) {
      this.selectedData = selection
    },
    cancelAddRule () {
      this.$refs.appTrafficRule.resetFields()
      this.operationDialog = false
    },
    getAppRules () {
      app.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          this.type = 2
          this.rule = JSON.parse(JSON.stringify(res.data))
          this.appName = res.data.appName
          this.rule.appTrafficRule.forEach(val => {
            val.trafficFilter.forEach(item => {
              item.srcAddress = this.changeAToS(item.srcAddress)
              item.srcPort = this.changeAToS(item.srcPort)
              item.dstAddress = this.changeAToS(item.dstAddress)
              item.dstPort = this.changeAToS(item.dstPort)
              item.protocol = this.changeAToS(item.protocol)
              item.srcTunnelAddress = this.changeAToS(item.srcTunnelAddress)
              item.dstTunnelAddress = this.changeAToS(item.dstTunnelAddress)
              item.srcTunnelPort = this.changeAToS(item.srcTunnelPort)
              item.dstTunnelPort = this.changeAToS(item.dstTunnelPort)
              item.tag = this.changeAToS(item.tag)
            })
          })
          this.trafficRuleTableData = this.rule.appTrafficRule
        }
      })
      this.loading = false
    },
    addAppRules () {
      this.$refs.appTrafficRule.validate((valid) => {
        if (valid) {
          let data = {
            appTrafficRule: [],
            appName: this.appName,
            appSupportMp1: true
          }
          this.operationDialog = false
          data.appTrafficRule.push(this.appTrafficRule)
          console.log(data)
          app.addConfigRules(this.type, sessionStorage.getItem('instanceId'), data).then(res => {
            if (res.data) {
              app.getTaskStatus(res.data.response.apprule_task_id).then(response => {
                if (response.data.response.configResult === 'FAILURE') {
                  this.$message.error(this.$t('app.ruleConfig.mepError'))
                } else {
                  if (this.index === -1) {
                    this.showMessage('success', this.$t('app.ruleConfig.addRuleSuc'), 1500)
                  } else {
                    this.showMessage('success', this.$t('app.ruleConfig.editRuleSuc'), 1500)
                  }
                }
              })
              this.loading = true
              this.timer = setTimeout(() => { this.getAppRules() }, 3000)
            }
          })
        }
      })
    },
    confirmToAddTraRules () {
      let data = JSON.parse(JSON.stringify(this.trafficFilterData))
      data.forEach(item => {
        item.srcAddress = this.changeSToA(item.srcAddress)
        item.srcPort = this.changeSToA(item.srcPort)
        item.dstAddress = this.changeSToA(item.dstAddress)
        item.dstPort = this.changeSToA(item.dstPort)
        item.protocol = this.changeSToA(item.protocol)
        item.srcTunnelAddress = this.changeSToA(item.srcTunnelAddress)
        item.dstTunnelAddress = this.changeSToA(item.dstTunnelAddress)
        item.srcTunnelPort = this.changeSToA(item.srcTunnelPort)
        item.dstTunnelPort = this.changeSToA(item.dstTunnelPort)
        item.tag = this.changeSToA(item.tag)
      })
      this.appTrafficRule.trafficFilter = data
      this.appTrafficRule.dstInterface = this.dstInterfaceData
      console.log(this.appTrafficRule)
      this.addAppRules()
    },
    checkDetail (row) {
      this.detail = row
      this.showDetail = true
    },
    editTraRule (index, row) {
      this.index = index
      this.operationDialog = true
      this.appTrafficRule = row[index]
      this.trafficFilterData = row[index].trafficFilter
      this.dstInterfaceData = row[index].dstInterface
    },
    batchDeleteTrafficRule () {
      if (this.selectedData.length > 0) {
        this.deleteTraRule(-1, this.selectedData)
      } else {
        this.$message.warning(this.$t('tip.oneAtLeast'))
      }
    },
    deleteTraRule (index, row) {
      this.$confirm(this.$t('tip.ifContinue'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        let data = {
          appTrafficRule: [],
          appDNSRule: []
        }
        if (index !== -1) {
          data.appTrafficRule.push(row.trafficRuleId)
        } else {
          row.forEach(item => {
            data.appTrafficRule.push(item.trafficRuleId)
          })
        }
        app.deleteConfigRules(sessionStorage.getItem('instanceId'), data).then(res => {
          this.showMessage('success', this.$t('app.ruleConfig.delRuleSuc'), 1500)
          this.loading = true
          this.timer = setTimeout(() => { this.getAppRules() }, 3000)
        })
      })
    },
    modifyLines (index, row, type) {
      if (type === 1) {
        this.filterIndex = index
        this.trafficFilter = JSON.parse(JSON.stringify(row))
        this.innerFilterVisible = true
      } else {
        this.interfaceIndex = index
        this.dstInterface = JSON.parse(JSON.stringify(row))
        this.innerInterfaceVisible = true
      }
    },
    addNew (type) {
      if (type === 1) {
        this.filterIndex = -1
        this.innerFilterVisible = true
      } else {
        this.interfaceIndex = -1
        this.innerInterfaceVisible = true
      }
    },
    deleteLines (index, rows) {
      rows.splice(index, 1)
    },
    cancelEdit (form) {
      this.innerFilterVisible = false
      this.innerInterfaceVisible = false
      this.$refs[form].resetFields()
    },
    confirmToAdd (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (form === 'trafficFilter') {
            if (this.filterIndex !== -1) {
              this.trafficFilterData[this.filterIndex] = this.trafficFilter
              this.$set(this.trafficFilterData, this.filterIndex, this.trafficFilter)
            } else {
              this.trafficFilterData.push(this.trafficFilter)
            }
            this.innerFilterVisible = false
          } else {
            if (this.interfaceIndex !== -1) {
              this.dstInterfaceData[this.interfaceIndex] = this.dstInterface
              this.$set(this.dstInterfaceData, this.interfaceIndex, this.dstInterface)
            } else {
              this.dstInterfaceData.push(this.dstInterface)
            }
            this.innerInterfaceVisible = false
          }
        }
      })
    }
  },
  mounted () {
    this.getAppRules()
  },
  beforeDestroy () {
    this.timer = null
    clearTimeout(this.timer)
  }
}

</script>
<style lang='less' scoped>
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
