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
            :label="$t('system.appstore.appstoreName')"
            prop="appstoreName"
          >
            <el-input
              id="appstorename"
              maxlength="20"
              v-model="form.appstoreName"
            />
          </el-form-item>
          <el-form-item
            label="IP"
            prop="appstoreIp"
          >
            <el-input
              id="ip"
              maxlength="80"
              v-model="form.appstoreIp"
              :disabled="urlDisable"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appLcm.port')"
            prop="appstorePort"
          >
            <el-input
              id="port"
              maxlength="80"
              v-model="form.appstorePort"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appstore.appstoreRepo')"
            prop="appstoreRepo"
          >
            <el-input
              id="appstoreRepo"
              maxlength="20"
              v-model="form.appstoreRepo"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appstore.appstoreRepoName')"
            prop="appstoreRepoName"
          >
            <el-input
              id="appstoreRepoName"
              maxlength="20"
              v-model="form.appstoreRepoName"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appstore.appstoreRepoUserName')"
            prop="appstoreRepoUserName"
          >
            <el-input
              id="appstoreRepoUserName"
              maxlength="20"
              v-model="form.appstoreRepoUserName"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appstore.appstoreRepoPassword')"
            prop="appstoreRepoPassword"
          >
            <el-input
              id="appstoreRepoPassword"
              maxlength="80"
              v-model="form.appstoreRepoPassword"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.appstore.vendor')"
            prop="producer"
          >
            <el-input
              id="producer"
              maxlength="20"
              v-model="form.producer"
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
    appstoreData: {
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
      form: {
        appstoreIp: '',
        appstoreName: '',
        appstorePort: '',
        appstoreRepo: '',
        appstoreRepoName: '',
        appstoreRepoPassword: '',
        appstoreRepoUserName: '',
        producer: ''
      },
      urlDisable: false
    }
  },
  computed: {
    rules () {
      return {
        appstoreName: [
          { required: true, message: this.$t('verify.appstorenameTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ],
        appstoreIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appstorePort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appstoreRepo: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        appstoreRepoName: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        appstoreRepoUserName: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        appstoreRepoPassword: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        producer: [
          { required: true, message: this.$t('verify.vendorTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ]
      }
    }
  },
  methods: {
    register () {
      this.dialogVisible = true
      this.urlDisable = false
      this.dialogTitle = this.$t('system.appstore.appStoreReg')
      this.resetForm()
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    handleEdit () {
      this.dialogTitle = this.$t('system.appstore.appStoreModify')
      this.dialogVisible = true
      this.urlDisable = true
      let middleData = JSON.parse(JSON.stringify(this.appstoreData))
      this.form = middleData
    },
    confirmToRegister (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.type === 1) {
            inventory.create(3, this.form).then(res => {
              this.showSuccessTip()
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
            inventory.modify(3, this.form, this.form.appstoreIp).then(res => {
              this.showSuccessTip()
            }, error => {
              this.$message.error(error.response.data)
            })
          }
        }
      })
    },
    showSuccessTip () {
      this.showMessage('success', this.$t('tip.regAppStoreSuc'), 1500)
      this.initList()
      this.dialogVisible = false
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
