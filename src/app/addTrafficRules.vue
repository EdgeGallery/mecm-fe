<template>
  <div class="ruleconfig">
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.mecm')"
      :second="$t('nav.appMana')"
      :third="$t('nav.ruleConfiguration')"
      :forth="$t('app.instanceList.addTrafficRules')"
      :path="{ path: '/mecm/ains/list' }"
      :pathto="{ path: '/mecm/ruleconfig#2' }"
    />
    <div class="ruleconfigcontent">
      <el-form label-width="120px">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('app.ruleConfig.trafficRuleId')">
              <el-input
                id=""
                maxlength="30"
                v-model="rule.trafficRuleId"
              />
            </el-form-item>
            <el-form-item :label="$t('app.ruleConfig.priority')">
              <el-input-number
                v-model="rule.priority"
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
                v-model="rule.action"
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
              v-model="rule.filterType"
            >
              <el-select
                v-model="rule.filterType"
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
        <p class="title">
          {{ $t('app.ruleConfig.trafficFilter') }}
          <el-button-group class="rt">
            <el-button
              type="text"
              class="btn"
              @click.native.prevent="addNew()"
            >
              {{ $t('app.instanceList.addFilter') }}
            </el-button>
          </el-button-group>
        </p>
        <el-table
          class="mt20"
          :data="filterTableData"
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
                @click="modifyLines(scope.$index, scope.row)"
              >
                {{ $t('common.modify') }}
              </el-button>
              <el-button
                id="deleteBtn"
                type="text"
                size="small"
                @click="deleteLines(scope.$index, scope.row)"
              >
                {{ $t('common.delete') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/BreadCrumb'
export default {
  name: 'Rule',
  components: {
    Breadcrumb
  },
  data () {
    return {
      drawer: false,
      dialog: false,
      innerVisible: false,
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
      rule: {
        trafficRule: [
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
                srcTunerAddress: '',
                dstTunerAddress: '',
                srcTunerAddressL: ''
              },
              {
                srcAddress: [],
                srcPort: [],
                dstAddress: [],
                dstPort: [],
                protocol: [],
                qci: '1',
                dscp: '0',
                tc: '1'
              }
            ]
          }
        ],
        dnsRule: [
          {
            dnsRuleRedirectRuleId: '',
            domainName: '24',
            ipAddressType: '',
            dnsServerIp: ''
          }, {
            dnsRuleRedirectRuleId: '',
            domainName: '24',
            ipAddressType: '',
            dnsServerIp: ''
          }
        ]
      },
      filterTableData: [
        {
          ipAddressType: 'IP_V6',
          srcAddress: 'a',
          srcPort: 'b',
          dstAddress: 'c',
          dstPort: 'd',
          protocol: 'ANY',
          qci: '1',
          dscp: '0',
          tc: '1'
        }
      ],
      trafficFilter: {
        ipAddressType: '',
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: 'ANY',
        qci: '1',
        dscp: '0',
        tc: '1'
      },
      middleData: {
        ipAddressType: '',
        srcAddress: '',
        srcPort: '',
        dstAddress: '',
        dstPort: '',
        protocol: 'ANY',
        qci: '1',
        dscp: '0',
        tc: '1'
      }
    }
  },
  methods: {
    addNew () {
      this.drawer = true
      // this.innerVisible = true
      this.addType = 1
    },
    confirmToAdd () {
      let data = JSON.parse(JSON.stringify(this.trafficFilter))
      if (this.addType === 1) {
        this.filterTableData.push(data)
      } else {
        this.filterTableData.splice(this.editIndex, 1)
        this.filterTableData.push(data)
      }
      this.innerVisible = false
    },
    modifyLines (index, rows) {
      this.addType = 2
      this.editIndex = index
      this.innerVisible = true
      this.middleData = JSON.parse(JSON.stringify(rows))
      this.trafficFilter = this.middleData
    },
    deleteLines (index, rows) {
      this.filterTableData.splice(index, 1)
    },
    cancelEdit () {
      this.innerVisible = false
    }
  },
  mounted () {
    this.dialog = true
  }
}
</script>
<style lang='less' scoped>
  .ruleconfigcontent {
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
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
}
</style>
