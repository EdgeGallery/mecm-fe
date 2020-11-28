<template>
  <div id="rule">
    <el-form label-width="120px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="Traffic Rule Id">
            <el-input
              id=""
              maxlength="30"
              v-model="rule.trafficRuleId"
            />
          </el-form-item>
          <el-form-item label="Priority">
            <el-input-number
              v-model="rule.priority"
              :min="1"
              :max="255"
              label="描述文字"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Action"
          >
            <el-select
              v-model="rule.action"
              placeholder="请选择"
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
            label="Filter Type"
            v-model="rule.filterType"
          >
            <el-select
              v-model="rule.filterType"
              placeholder="请选择"
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
        Traffic Filter
        <el-button-group class="rt">
          <el-button
            type="text"
            class="btn"
            @click="addNew()"
          >
            新增Filter
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
          label="SRC Address"
          width="120px"
        />
        <el-table-column
          prop="srcPort"
          label="SRC Port"
        />
        <el-table-column
          prop="dstAddress"
          label="DST Address"
          width="120px"
        />
        <el-table-column
          prop="dstPort"
          label="DST Port"
        />
        <el-table-column
          prop="protocol"
          label="Protocol"
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
    <el-dialog
      width="35%"
      title="Traffic Rule"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-row>
        <el-form label-width="120px">
          <el-col :span="12">
            <el-form-item
              label="IP Address Type"
            >
              <el-select
                v-model="trafficFilter.ipAddressType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in ipAddressType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Src Address">
              <el-input
                id=""
                maxlength="30"
                v-model="trafficFilter.srcAddress"
                placeholder="多个IP请用','分割"
              />
            </el-form-item>
            <el-form-item label="Src Port">
              <el-input
                id=""
                maxlength="30"
                v-model="trafficFilter.srcPort"
                placeholder="多个端口请用','分割"
              />
            </el-form-item>
            <el-form-item label="DST Address">
              <el-input
                id=""
                maxlength="30"
                v-model="trafficFilter.dstAddress"
                placeholder="多个IP请用','分割"
              />
            </el-form-item>
            <el-form-item label="DST Port">
              <el-input
                id=""
                maxlength="30"
                v-model="trafficFilter.dstPort"
                placeholder="多个端口请用','分割"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Protocol">
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
          </el-col>
        </el-form>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelEdit()">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="confirmToAdd()"
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
  components: {

  },
  data () {
    return {
      dialog: false,
      innerVisible: false,
      activeName: 'dns',
      addType: 1,
      editIndex: 0,
      ipAddressType: [
        {
          value: 'IP_V4',
          label: 'IP_V4'
        },
        {
          value: 'IP_V6',
          label: 'IP_V6'
        }
      ],
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
          value: 'ALLOW',
          label: 'ALLOW'
        }

      ],
      rule: {
        action: '',
        filterType: '',
        priority: 125,
        trafficFilter: [],
        dnsRule: {
          dnsRuleRedirectRuleId: '',
          domainName: '24',
          ipAddressType: '',
          dnsServerIp: ''
        }
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
      this.innerVisible = true
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
