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
          label-width="auto"
          class="configForm"
          :model="dnsRule"

          ref="dnsRule"
          :rules="formRules"
        >
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item
                :label="$t('app.ruleConfig.dnsRuleId')"
                prop="dnsRuleId"
              >
                <el-input
                  id=""
                  maxlength="30"
                  v-model="dnsRule.dnsRuleId"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.domainName')"
                prop="domainName"
              >
                <el-input
                  id=""
                  maxlength="30"
                  v-model="dnsRule.domainName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.ruleConfig.ipAddressType')"
                prop="ipAddressType"
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
              <el-form-item
                :label="$t('app.ruleConfig.ipAddress')"
                prop="ipAddress"
              >
                <el-input
                  id=""
                  maxlength="30"
                  v-model="dnsRule.ipAddress"
                />
              </el-form-item>
              <el-form-item
                label="ttl"
                prop="ttl"
              >
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
          size="small"
          @click="resetForm('dnsRule')"
        >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          size="small"
          @click="confirmToAddDnsRules"
        >
          {{ $t('common.confirm') }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { appo, inventory } from '../tools/request.js'
export default {
  data () {
    return {
      dialog: false,
      index: -1,
      timer: null,
      loading: false,
      type: 1,
      dnsRuleTableData: [],
      dnsRule: {
        dnsRuleId: '',
        domainName: 'domainname',
        ipAddressType: 'IP_V4',
        ipAddress: '192.5.14.68',
        ttl: '85000'
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
  computed: {
    formRules () {
      let formRules = {
        dnsRuleId: [
          { required: true, message: this.$t('idMust'), trigger: 'blur' }
        ],
        domainName: [
          { required: true, message: this.$t('domainMust'), trigger: 'blur' }
        ],
        ipAddress: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        ttl: [
          { required: true, message: this.$t('tip.ttl'), trigger: 'blur' }
        ]
      }
      return formRules
    }
  },
  methods: {
    getAppRules () {
      inventory.getConfigRules(sessionStorage.getItem('instanceId')).then(res => {
        if (res.data) {
          this.type = 2
          this.rule = res.data
          this.appName = this.rule.appName
          this.dnsRuleTableData = res.data.appDNSRule
        }
      })
      this.loading = false
    },
    resetForm (formName) {
      this.dialog = false
      this.$refs[formName].resetFields()
    },
    addAppRule (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            appDNSRule: [],
            appName: this.appName,
            appSupportMp1: true
          }
          data.appDNSRule.push(this.dnsRule)
          console.log(data)
          appo.addConfigRules(this.type, sessionStorage.getItem('instanceId'), data).then(res => {
            if (res.data) {
              appo.getTaskStatus(res.data.response.apprule_task_id).then(response => {
                if (response.data.response.configResult === 'FAILURE') {
                  this.$message.error(this.$t('app.ruleConfig.mepError'))
                } else {
                  this.dialog = false
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
    showDialog () {
      this.index = -1
      this.dialog = true
      this.dnsRule = {
        dnsRuleId: '',
        domainName: 'domainname',
        ipAddressType: 'IP_V4',
        ipAddress: '192.5.14.68',
        ttl: '85000'
      }
    },
    handleSelectionChange (selection) {
      this.selectedData = selection
    },
    confirmToAddDnsRules () {
      this.addAppRule('dnsRule')
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
        closeOnClickModal: false,
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
        appo.deleteConfigRules(sessionStorage.getItem('instanceId'), data).then(res => {
          this.showMessage('success', this.$t('app.ruleConfig.delRuleSuc'), 1500)
          this.loading = true
          this.timer = setTimeout(() => { this.getAppRules() }, 3000)
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
</style>
