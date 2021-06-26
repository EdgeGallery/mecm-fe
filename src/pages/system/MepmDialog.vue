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
            :label="$t('system.mepm.name')"
            prop="mepmName"
          >
            <el-input
              id="name"
              maxlength="20"
              v-model="form.mepmName"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.packageList.ip')"
            prop="mepmIp"
          >
            <el-input
              id="ip"
              v-model="form.mepmIp"
              :disabled="ipDisable"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.mepm.port')"
            prop="mepmPort"
          >
            <el-input
              id="port"
              v-model="form.mepmPort"
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
        id="cancelBtn"
        size="small"
        @click="cancel"
      >
        {{ $t('common.cancel') }}
      </el-button>
      <el-button
        id="confirmBtn"
        type="primary"
        size="small"
        @click="confirmToRegister('form')"
      >
        {{ $t('common.confirm') }}
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
        mepmIp: '',
        mepmPort: 31252,
        userName: '',
        mepmName: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        mepmIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        mepmPort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        mepmName: [
          { required: true, message: this.$t('verify.mepmNameTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs.form.resetFields()
      this.form = {
        mepmIp: '',
        mepmPort: 31252,
        userName: '',
        mepmName: ''
      }
      this.ipDisable = false
    },
    handleEdit () {
      this.ipDisable = true
      let middleData = JSON.parse(JSON.stringify(this.rowdata))
      this.form = middleData
    },
    confirmToRegister (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.type === 1) {
            inventory.create(5, this.form).then(res => {
              this.showMessage('success', this.$t('tip.regMepmSuc'), 1500)
              this.cancel()
            }, error => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else if (error.response.status === 403) {
                this.$message.error(this.$t('tip.loginOperation'))
              } else {
                this.$message.error(error.response.data)
              }
            })
          } else {
            inventory.modify(5, this.form, this.form.mepmIp).then(res => {
              this.showMessage('success', this.$t('tip.modMepmSuc'), 1500)
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
  }
}

</script>
<style lang='less' scoped>
</style>
