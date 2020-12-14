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
      >
        {{ $t('app.instanceList.batchDeleteDnsRules') }}
      </el-button>
      <el-table
        class="mt20"
        :data="dnsRuleTableData"
        border
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
          :label="$t('app.ruleConfig.priority')"
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
              @click="deleteDnsRule(scope.$index, dnsRuleTableData)"
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
              <el-form-item :label="$t('app.ruleConfig.priority')">
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
      rule: {
        'appTrafficRule': [],
        'appDNSRule': [],
        'appName': sessionStorage.getItem('instanceName'),
        'appSupportMp1': true
      },
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
      ]
    }
  },
  methods: {
    getAppRules () {
      app.getConfigRules().then(res => {
        if (res.data) {
          this.rule = res.data
          this.dnsRuleTableData = res.data.appDNSRule
        } else {
          this.handleType = 1
        }
      })
    },
    addAppRule () {
      app.addConfigRules(sessionStorage.getItem('instanceId'), this.rule).then(res => {
        if (res.data) {
          this.getAppRules()
        }
      })
    },
    showDialog () {
      this.index = -1
      this.dialog = true
    },
    confirmToAddDnsRules () {
      if (this.index !== -1) {
        this.rule.appDNSRule[this.index] = this.dnsRule
      } else {
        this.rule.appDNSRule.push(this.dnsRule)
      }
      console.log(this.rule)
      this.addAppRule()
      this.dialog = false
    },
    editDnsRule (index, row) {
      this.index = index
      this.dialog = true
      let data = JSON.parse(JSON.stringify(row[index]))
      this.dnsRule = data
    },
    deleteDnsRule (index, row) {
      this.rule.appDNSRule.splice(index, 1)
    }
  },
  mounted () {
    this.getAppRules()
  }
}

</script>
<style lang='less' scoped>
</style>
