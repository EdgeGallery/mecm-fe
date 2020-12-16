<template>
  <div>
    <!-- pannel -->
    <div class="pannel">
      <el-button
        size="mini"
        id="addDnsRuleBtn"
        class="btn"
        @click="showDialog"
      >
        {{ $t('app.instanceList.addDnsRules') }}
      </el-button>
      <el-button
        size="mini"
        class="btn"
        id="batchDeleteDnsBtn"
        @click="batchDeleteDnsRule"
      >
        {{ $t('app.instanceList.batchDeleteDnsRules') }}
      </el-button>
      <el-table
        class="mt20"
        :data="dnsRuleTableData"
        v-loading="loading"
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
          prop="dnsRuleId"
          :label="$t('app.ruleConfig.dnsRuleId')"
        />
        <el-table-column
          prop="ipAddress"
          :label="$t('app.ruleConfig.ipAddress')"
        />
        <el-table-column
          prop="ipAddressType"
          :label="$t('app.ruleConfig.ipAddressType')"
        />
        <el-table-column
          prop="domainName"
          :label="$t('app.ruleConfig.domainName')"
        />
        <el-table-column
          prop="ttl"
          label="ttl"
        />
        <el-table-column
          :label="$t('common.operation')"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              id="deleteBtn"
              type="text"
              size="small"
              @click="editDnsRule(scope.$index, dnsRuleTableData)"
            >
              {{ $t('common.modify') }}
            </el-button>
            <el-button
              id="deleteBtn"
              type="text"
              size="small"
              @click="deleteDnsRule(scope.$index,scope.row)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- dialog -->
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('app.instanceList.addRule')"
      :visible.sync="dialog"
      width="30%"
    >
      <div class="dialogContent">
        <el-form
          label-width="130px"
          class="configForm"
        >
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item :label="$t('app.ruleConfig.dnsRuleId')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="dnsRule.dnsRuleId"
                />
              </el-form-item>
              <el-form-item :label="$t('app.ruleConfig.domainName')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="dnsRule.domainName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.ipAddressType')"
              >
                <el-select
                  v-model="dnsRule.ipAddressType"
                  :placeholder="$t('tip.pleaseSelect')"
                >
                  <el-option
                    v-for="item in ipAddressType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('app.ruleConfig.ipAddress')">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="dnsRule.ipAddress"
                />
              </el-form-item>
              <el-form-item label="ttl">
                <el-input
                  id=""
                  maxlength="30"
                  v-model="dnsRule.ttl"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
          @click="confirmToAddDnsRules"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { app } from '../tools/request.js'
export default {
  data () {
    return {
      dialog: false,
      index: -1,
      timer: null,
      loading: false,
      dnsRuleTableData: [],
      dnsRule: {
        dnsRuleId: '',
        domainName: '',
        ipAddressType: '',
        ipAddress: '',
        ttl: ''
      },
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
      selectedData: [],
      appName: sessionStorage.getItem('instanceName'),
      rule: {
        'appTrafficRule': [],
        'appDNSRule': [],
        'appName': '',
        'appSupportMp1': true
      }
    }
  },
  methods: {
    getAppRules () {
      app.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          this.rule = res.data
          this.appName = this.rule.appName
          this.dnsRuleTableData = res.data.appDNSRule
        }
      })
      this.loading = false
    },
    addAppRule () {
      let data = {
        appDNSRule: [],
        appName: this.appName,
        appSupportMp1: true
      }
      data.appDNSRule.push(this.dnsRule)
      console.log(data)
      app.addConfigRules(this.index, sessionStorage.getItem('instanceId'), data).then(res => {
        if (res.data) {
          app.getTaskStatus(res.data.response.apprule_task_id).then(response => {
            if (response.data.response.configResult === 'FAILURE') {
              this.$message.error(this.$t('app.ruleConfig.mepError'))
            } else {
              this.dialog = false
              if (this.index === -1) {
                this.$message.success(this.$t('app.ruleConfig.addRuleSuc'))
              } else {
                this.$message.success(this.$t('app.ruleConfig.editRuleSuc'))
              }
            }
          })
          this.loading = true
          this.timer = setTimeout(() => { this.getAppRules() }, 2000)
        }
      })
    },
    showDialog () {
      this.index = -1
      this.dialog = true
    },
    handleSelectionChange (selection) {
      this.selectedData = selection
    },
    confirmToAddDnsRules () {
      this.addAppRule()
    },
    editDnsRule (index, row) {
      this.index = index
      this.dialog = true
      let data = JSON.parse(JSON.stringify(row[index]))
      this.dnsRule = data
    },
    deleteDnsRule (index, row) {
      this.$confirm(this.$t('tip.ifContinue'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let data = {
          appTrafficRule: [],
          appDNSRule: []
        }
        if (index !== -1) {
          data.appDNSRule.push(row.dnsRuleId)
        } else {
          row.forEach(item => {
            data.appDNSRule.push(item.dnsRuleId)
          })
        }
        app.deleteConfigRules(sessionStorage.getItem('instanceId'), data).then(res => {
          this.$message.success(this.$t('app.ruleConfig.delRuleSuc'))
          this.loading = true
          this.timer = setTimeout(() => { this.getAppRules() }, 2000)
        })
      })
    },
    batchDeleteDnsRule () {
      if (this.selectedData.length > 0) {
        this.deleteDnsRule(-1, this.selectedData)
      } else {
        this.$message.warning(this.$t('tip.oneAtLeast'))
      }
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
