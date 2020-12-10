<template>
  <div id="rule">
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
              v-model="trafficrule.trafficRuleId"
            />
          </el-form-item>
          <el-form-item :label="$t('app.ruleConfig.priority')">
            <el-input-number
              v-model="trafficrule.priority"
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
              v-model="trafficrule.action"
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
              v-model="trafficrule.filterType"
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
        :data="trafficfilter"
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
              @click="modifyFilterLines(scope.$index, scope.row)"
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
    <div v-if="trafficrule.action==='FORWARD_DECAPSULATED'||trafficrule.action==='FORWARD_AS_IS'">
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
          :data="dstinterface"
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
                @click="modifyInterfaceLines(scope.$index, scope.row)"
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
                v-model="trafficFilter.qci"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="DSCP">
              <el-input
                id=""
                maxlength="30"
                v-model="trafficFilter.dscp"
              />
            </el-form-item>
            <el-form-item label="TC">
              <el-input
                id=""
                maxlength="30"
                v-model="trafficFilter.tc"
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
                v-model="dstInterface.srcMACAddress"
              />
            </el-form-item>
            <el-form-item label="目的MAC地址">
              <el-input
                v-model="dstInterface.dstMACAddress"
              />
            </el-form-item>
          </div>
          <div v-if="dstInterface.interfaceType==='IP'">
            <p class="title">
              IP信息
            </p>
            <el-form-item label="目的IP地址">
              <el-input
                v-model="dstInterface.dstIPAddress"
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
</template>

<script>
export default {
  name: 'Rule',
  components: {},
  props: {
    trafficrule: {
      required: true,
      type: Object
    },
    trafficfilter: {
      required: true,
      type: Array
    },
    dstinterface: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      innerFilterVisible: false,
      innerInterfaceVisible: false,
      activeName: 'dns',
      addType: 1,
      editIndex: 0,
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
      rule: {
        appSupportMp1: false,
        appName: 'abc',
        appTrafficRule: [
          {
            action: '',
            filterType: '',
            priority: 125,
            trafficRuleId: '',
            trafficFilter: [
              {
                srcAddress: [],
                srcPort: [],
                dstAddress: [],
                dstPort: [],
                protocol: [],
                qci: '1',
                dscp: '0',
                tc: '1',
                srcTunnelAddress: '',
                srcTunnelPort: '',
                dstTunnelAddress: '',
                dstTunnelPort: ''
              }
            ],
            dstInterface: [{
              interfaceType: '',
              tunnelInfo: {
                tunnelType: '',
                tunnelDstAddress: '',
                tunnelSrcAddress: '',
                tunnelSpecificData: ''
              },
              srcMACAddress: '',
              dstMACAddress: '',
              dstIPAddress: ''
            }],
            appDNSRule: [
              {
                dnsRuleRedirectRuleId: '',
                domainName: '',
                ipAddressType: '',
                dnsServerIp: ''
              }
            ]
          }
        ]
      },
      trafficFilter: {
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: 'ANY',
        qci: '1',
        dscp: '0',
        tc: '1',
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
        srcMACAddress: '',
        dstMACAddress: '',
        dstIPAddress: ''
      },
      middleData: {
        ipAddressType: '',
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: '',
        qci: '',
        dscp: '',
        tc: ''
      }
    }
  },
  methods: {
    addNewFilter () {
      this.trafficFilter = {
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: '',
        qci: '',
        dscp: '',
        tc: '',
        srcTunnelAddress: '',
        srcTunnelPort: '',
        dstTunnelAddress: '',
        dstTunnelPort: ''
      }
      this.innerFilterVisible = true
      this.addType = 1
    },
    addNewInterface () {
      this.dstInterface = {
        interfaceType: '',
        tunnelInfo: {
          tunnelType: '',
          tunnelDstAddress: '',
          tunnelSrcAddress: '',
          tunnelSpecificData: ''
        },
        srcMACAddress: '',
        dstMACAddress: '',
        dstIPAddress: ''
      }
      this.innerInterfaceVisible = true
      this.addType = 1
    },
    confirmToAddFilter () {
      let data = JSON.parse(JSON.stringify(this.trafficFilter))
      if (this.addType === 1) {
        this.trafficfilter.push(data)
      } else {
        this.trafficfilter.splice(this.editIndex, 1)
        this.trafficfilter.push(data)
      }
      this.innerFilterVisible = false
    },
    confirmToAddInterface () {
      let data = JSON.parse(JSON.stringify(this.dstInterface))
      if (this.addType === 1) {
        this.dstinterface.push(data)
      } else {
        this.dstinterface.splice(this.editIndex, 1)
        this.dstinterface.push(data)
      }
      this.innerInterfaceVisible = false
    },
    modifyFilterLines (index, rows) {
      this.addType = 2
      this.editIndex = index
      this.innerFilterVisible = true
      this.middleData = JSON.parse(JSON.stringify(rows))
      this.trafficFilter = this.middleData
    },
    modifyInterfaceLines (index, rows) {
      this.addType = 2
      this.editIndex = index
      this.innerInterfaceVisible = true
      this.middleData = JSON.parse(JSON.stringify(rows))
      this.dstInterface = this.middleData
    },
    deleteFilterLines (index, rows) {
      this.trafficfilter.splice(index, 1)
    },
    deleteInterfaceLines (index, rows) {
      this.dstinterface.splice(index, 1)
    },
    cancelEditFilter () {
      this.innerFilterVisible = false
    },
    cancelEditInterface () {
      this.innerInterfaceVisible = false
    }
  },
  mounted () {

  }
}
</script>
<style lang='less' scoped>
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
  .btn{
    position: relative;
    top: -10px;
    padding-right: 7px;;
  }
</style>
