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
            prop="applcmName"
          >
            <el-input
              id="name"
              maxlength="20"
              v-model="form.applcmName"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.packageList.ip')"
            prop="applcmIp"
          >
            <el-input
              id="ip"
              v-model="form.applcmIp"
              :disabled="ipDisable"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appLcm.port')"
            prop="applcmPort"
          >
            <el-input
              id="port"
              v-model="form.applcmPort"
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
        applcmIp: '',
        applcmPort: 30204,
        userName: '',
        applcmName: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        applcmIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        applcmPort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        applcmName: [
          { required: true, message: this.$t('verify.applcmNameTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ]
      }
    }
  },
  methods: {
    register () {
      this.form = {
        applcmIp: '',
        applcmPort: 30204,
        userName: '',
        applcmName: ''
      }
      this.dialogVisible = true
      this.ipDisable = false
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    handleEdit () {
      this.dialogVisible = true
      this.ipDisable = true
      let middleData = JSON.parse(JSON.stringify(this.rowdata))
      this.form = middleData
    },
    confirmToRegister (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.type === 1) {
            inventory.create(1, this.form).then(res => {
              this.showMessage('success', this.$t('tip.regAppLcmSuc'), 1500)
              this.initList()
              this.dialogVisible = false
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
            inventory.modify(1, this.form, this.form.applcmIp).then(res => {
              this.showMessage('success', this.$t('tip.modAppLcmSuc'), 1500)
              this.initList()
              this.dialogVisible = false
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
