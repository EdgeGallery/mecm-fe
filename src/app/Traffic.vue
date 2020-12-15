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
      >
        {{ $t('app.instanceList.batchDeleteTrafficRules') }}
      </el-button>

      <!-- trafficRuleTable -->
      <el-table
        class="mt20"
        :data="trafficRuleTableData"
        border
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
              @click="deleteTraRule(scope.$index, trafficRuleTableData)"
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
      title="详情"
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

        <el-form label-width="120px">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item :label="$t('app.ruleConfig.trafficRuleId')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="appTrafficRule.trafficRuleId"
                />
              </el-form-item>
              <el-form-item :label="$t('app.ruleConfig.priority')">
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
                @click="addNewFilter()"
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
              label="隧道目的地址"
            />
            <el-table-column
              prop="dstTunnelPort"
              label="隧道目的端口"
              width="120px"
            />
            <el-table-column
              prop="srcTunnelAddress"
              label="隧道源地址"
              width="120px"
            />
            <el-table-column
              prop="srcTunnelPort"
              label="隧道源端口"
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
                  @click="modifyFilterLines(scope.$index,scope.row)"
                >
                  {{ $t('common.modify') }}
                </el-button>
                <el-button
                  id="deleteBtn"
                  type="text"
                  size="small"
                  @click="deleteFilterLines(scope.$index, scope.row)"
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
            转发接口信息
            <el-button-group class="rt">
              <el-button
                type="text"
                class="btn"
                @click="addNewInterface()"
              >
                新增接口信息
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
                prop="dstMacAddress"
                label="目的MAC地址"
              />
              <el-table-column
                prop="srcMacAddress"
                label="源MAC地址"
              />
              <el-table-column
                prop="dstIpAddress"
                label="目的IP地址"
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
                    @click="modifyInterfaceLines(scope.$index,scope.row)"
                  >
                    {{ $t('common.modify') }}
                  </el-button>
                  <el-button
                    id="deleteBtn"
                    type="text"
                    size="small"
                    @click="deleteInterfaceLines(scope.$index, scope.row)"
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
          title="分流规则"
          :visible.sync="innerFilterVisible"
          append-to-body
        >
          <el-row>
            <el-form label-width="125px">
              <el-col :span="12">
                <el-form-item :label="$t('app.ruleConfig.srcAddress')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.srcAddress"
                    placeholder="多个IP请用','分割"
                  />
                </el-form-item>
                <el-form-item :label="$t('app.ruleConfig.srcPort')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.srcPort"
                    placeholder="多个端口请用','分割"
                  />
                </el-form-item>
                <el-form-item :label="$t('app.ruleConfig.dstAddress')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dstAddress"
                    placeholder="多个IP请用','分割"
                  />
                </el-form-item>
                <el-form-item :label="$t('app.ruleConfig.dstPort')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dstPort"
                    placeholder="多个端口请用','分割"
                  />
                </el-form-item>
                <el-form-item label="标签">
                  <el-input
                    v-model="trafficFilter.tag"
                  />
                </el-form-item>
                <el-form-item :label="$t('app.ruleConfig.protocol')">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.protocol"
                  />
                </el-form-item>
                <el-form-item label="QCI">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.qCI"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="DSCP">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.dSCP"
                  />
                </el-form-item>
                <el-form-item label="TC">
                  <el-input
                    id=""
                    maxlength="30"
                    v-model="trafficFilter.tC"
                  />
                </el-form-item>
                <el-form-item label="隧道目的地址">
                  <el-input
                    v-model="trafficFilter.dstTunnelAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道目的端口">
                  <el-input
                    v-model="trafficFilter.dstTunnelPort"
                  />
                </el-form-item>
                <el-form-item label="隧道源地址">
                  <el-input
                    v-model="trafficFilter.srcTunnelAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道源端口">
                  <el-input
                    v-model="trafficFilter.srcTunnelPort"
                  />
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="cancelEditFilter()">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="confirmToAddFilter()"
            >
              确认
            </el-button>
          </div>
        </el-dialog>

        <!-- interface dialog -->
        <el-dialog
          :close-on-click-modal="false"
          width="30%"
          title="接口信息"
          :visible.sync="innerInterfaceVisible"
          append-to-body
        >
          <el-row>
            <el-form label-width="125px">
              <p class="title">
                接口信息
              </p>
              <el-form-item
                label="interfaceType"
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
              <div v-if="dstInterface.interfaceType==='TUNNEL'">
                <p class="title">
                  隧道信息
                </p>
                <el-form-item label="隧道类型">
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
                <el-form-item label="隧道源地址">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelSrcAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道目的地址">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelDstAddress"
                  />
                </el-form-item>
                <el-form-item label="隧道指定参数">
                  <el-input
                    v-model="dstInterface.tunnelInfo.tunnelSpecificData"
                  />
                </el-form-item>
              </div>
              <div v-if="dstInterface.interfaceType==='MAC'">
                <p class="title">
                  MAC信息
                </p>
                <el-form-item label="源MAC地址">
                  <el-input
                    v-model="dstInterface.srcMacAddress"
                  />
                </el-form-item>
                <el-form-item label="目的MAC地址">
                  <el-input
                    v-model="dstInterface.dstMacAddress"
                  />
                </el-form-item>
              </div>
              <div v-if="dstInterface.interfaceType==='IP'">
                <p class="title">
                  IP信息
                </p>
                <el-form-item label="目的IP地址">
                  <el-input
                    v-model="dstInterface.ddstIpAddress"
                  />
                </el-form-item>
              </div>
            </el-form>
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="cancelEditInterface()">
              取 消
            </el-button>
            <el-button
              type="primary"
              @click="confirmToAddInterface()"
            >
              确认
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
          @click="operationDialog=false"
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
      operationDialog: false,
      innerFilterVisible: false,
      innerInterfaceVisible: false,
      showDetail: false,
      index: -1,
      rule: {
        appTrafficRule: [],
        appDNSRule: [],
        appName: sessionStorage.getItem('instanceName'),
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
        action: '',
        filterType: '',
        priority: 0,
        trafficFilter: [],
        dstInterface: []
      },
      trafficFilterData: [],
      dstInterfaceData: [],
      trafficFilter: {
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: '',
        qCI: '',
        dSCP: '',
        tC: '',
        tag: '',
        srcTunnelAddress: '',
        srcTunnelPort: '',
        dstTunnelAddress: '',
        dstTunnelPort: ''
      },
      dstInterface: {
        interfaceType: '',
        tunnelInfo: {
          tunnelType: '',
          tunnelDstAddress: '',
          tunnelSrcAddress: '',
          tunnelSpecificData: ''
        },
        srcMacAddress: '',
        dstMacAddress: '',
        ddstIpAddress: ''
      },
      interfaceIndex: -1,
      filterIndex: -1
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
    getAppRules () {
      app.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          console.log(res.data)
          this.rule = JSON.parse(JSON.stringify(res.data))
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
          console.log(this.trafficRuleTableData)
        }
      })
    },
    addAppRules () {
      app.addConfigRules(sessionStorage.getItem('instanceId'), this.rule).then(res => {
        if (res.data) {
          this.getAppRules()
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
      if (this.index !== -1) {
        this.rule.appTrafficRule[this.index].trafficFilter = data
        this.rule.appTrafficRule[this.index].dstInterface = this.dstInterfaceData
      } else {
        this.appTrafficRule.trafficFilter = data
        this.appTrafficRule.dstInterface = this.dstInterfaceData
        this.rule.appTrafficRule.push(this.appTrafficRule)
      }
      console.log(this.rule)
      this.addAppRules()
      this.operationDialog = false
    },
    checkDetail (row) {
      console.log(row)
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
    deleteTraRule (index, row) {
      this.rule.appTrafficRule.splice(index, 1)
      // this.addAppRules()
    },
    addNewFilter () {
      this.filterIndex = -1
      this.innerFilterVisible = true
    },
    modifyFilterLines (index, row) {
      this.filterIndex = index
      this.trafficFilter = row
      this.innerFilterVisible = true
    },
    modifyInterfaceLines (index, row) {
      this.interfaceIndex = index
      this.dstInterface = row
      this.innerInterfaceVisible = true
    },
    addNewInterface () {
      this.interfaceIndex = -1
      this.innerInterfaceVisible = true
    },
    deleteFilterLines (index, rows) {
      this.trafficFilterData.splice(index, 1)
    },
    deleteInterfaceLines (index, rows) {
      this.dstInterfaceData.splice(index, 1)
    },
    cancelEditFilter () {
      this.innerFilterVisible = false
    },
    cancelEditInterface () {
      this.innerInterfaceVisible = false
    },
    confirmToAddFilter () {
      if (this.filterIndex !== -1) {
        this.trafficFilterData[this.filterIndex] = this.trafficFilter
      } else {
        this.trafficFilterData.push(this.trafficFilter)
      }
      this.innerFilterVisible = false
    },
    confirmToAddInterface () {
      if (this.filterIndex !== -1) {
        this.dstInterfaceData[this.interfaceIndex] = this.dstInterface
      } else {
        this.dstInterfaceData.push(this.dstInterface)
      }
      this.innerInterfaceVisible = false
    }
  },
  mounted () {
    this.getAppRules()
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
