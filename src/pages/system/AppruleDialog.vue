<template>
  <div>
    <el-row>
      <el-col>
        <el-form
          label-width="auto"
          :model="form"
          ref="form"
          :rules="rules"
        >
          <el-form-item
            :label="$t('system.appLcm.name')"
            prop="appRuleName"
          >
            <el-input
              id="name"
              maxlength="20"
              v-model="form.appRuleName"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.packageList.ip')"
            prop="appRuleIp"
          >
            <el-input
              id="ip"
              v-model="form.appRuleIp"
              :disabled="ipDisable"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appLcm.port')"
            prop="appRulePort"
          >
            <el-input
              id="port"
              v-model="form.appRulePort"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        id="confirmBtn"
        type="primary"
        size="small"
        @click="confirmToRegister('form')"
      >
        {{ $t('common.confirm') }}
      </el-button>
      <el-button
        id="cancelBtn"
        size="small"
        @click="cancel"
      >
        {{ $t('common.cancel') }}
      </el-button>
    </span>
  </div>
</template>

<script>
import { inventory } from '../../tools/request.js'
export default {
  props: {
    rowdata: {
      required: true,
      type: Object
    },
    type: {
      required: true,
      type: Number
    }
  },
  watch: {
    type: {
      immediate: true,
      handler  (val) {
        if (this.type === 1) {
          this.register()
        } else {
          this.handleEdit()
        }
      }
    }
  },
  data () {
    return {
      ipDisable: false,
      form: {
        appRuleIp: '',
        appRulePort: 30206,
        userName: '',
        appRuleName: ''
      },
      editType: 1
    }
  },
  computed: {
    rules () {
      return {
        appRuleIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appRulePort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appRuleName: [
          { required: true, message: this.$t('app.ruleConfig.appRuleMgrMust'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ]
      }
    }
  },
  methods: {
    register () {
      this.title = this.$t('app.ruleConfig.appRuleManReg')
      this.form = {
        appRuleIp: '',
        appRulePort: 30206,
        userName: '',
        appRuleName: ''
      }
      this.ipDisable = false
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    handleEdit () {
      this.title = this.$t('app.ruleConfig.appRuleManEdit')
      this.ipDisable = true
      let middleData = JSON.parse(JSON.stringify(this.rowdata))
      this.form = middleData
    },
    confirmToRegister (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.type === 1) {
            inventory.create(4, this.form).then(res => {
              this.showMessage('success', this.$t('tip.regAppManSuc'), 1500)
              this.cancel()
            }, error => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(this.$t('tip.recordExist'))
              } else if (error.response.status === 403) {
                this.$message.error(this.$t('tip.loginOperation'))
              } else {
                this.$message.error(error.response.data)
              }
            })
          } else {
            inventory.modify(4, this.form, this.form.appRuleIp).then(res => {
              this.showMessage('success', this.$t('tip.modAppRuleSuc'), 1500)
              this.cancel()
            }, error => {
              this.$message.error(error.response.data)
            })
          }
        }
      })
    },
    cancel () {
      this.$emit('close', 'closeEditDialog')
    }
  },
  mounted () {}
}

</script>
<style lang='less' scoped>
</style>
