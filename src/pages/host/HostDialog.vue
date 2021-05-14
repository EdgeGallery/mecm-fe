<template>
  <div>
    <div class="k8s">
      <el-row>
        <el-form
          label-width="auto"
          :model="currForm"
          ref="currForm"
          :rules="rules"
        >
          <el-form-item
            :label="$t('system.edgeNodes.systemPlatform')"
          >
            <el-radio-group
              v-model="currForm.vim"
              @change="changeType"
            >
              <el-radio
                label="K8S"
              >
                K8S
              </el-radio>
              <el-radio
                label="OpenStack"
              >
                OpenStack
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            :label="$t('app.packageList.name')"
            prop="mechostName"
          >
            <el-input
              id="hostname"
              maxlength="20"
              v-model="currForm.mechostName"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.packageList.ip')"
            prop="mechostIp"
          >
            <el-input
              id="ip"
              v-model="currForm.mechostIp"
              :disabled="isDisable"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.edgeNodes.location')"
            prop="city"
          >
            <el-cascader
              :options="options"
              :placeholder="$t('system.edgeNodes.chooseLocation')"
              v-model="selectedArea"
              @change="onChanged"
              ref="myCascader"
            >
              <template slot-scope="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </el-form-item>
          <!-- <el-form-item
            :label="$t('system.edgeNodes.location')"
            prop="city"
          >
            <area-select
              v-model="selectedArea"
              :data="$pcaa"
              :level="3"
              type="text"
            />
          </el-form-item>
          <el-form-item
            label="坐标"
            prop="city"
          >
            <el-input
              id="coord"
              v-model="currForm.mechostIp"
              placeholder="请输入经度和纬度，使用英文‘,’分割"
            />
          </el-form-item> -->
          <el-form-item
            :label="$t('app.packageList.affinity')"
            prop="affinity"
          >
            <el-radio-group v-model="currForm.affinity">
              <el-radio
                v-for="(item,index) in affinityList"
                :key="index"
                :label="item"
              >
                {{ item }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            :label="$t('system.edgeNodes.hwCapability')"
          >
            <el-checkbox-group
              v-model="capabilities"
            >
              <el-checkbox
                v-for="(item,index) in capability"
                :key="index"
                :label="item"
              />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="App LCM"
            prop="applcmIp"
          >
            <el-select
              id="applcmip"
              v-model="currForm.applcmIp"
              :placeholder="$t('system.edgeNodes.applcmIp')"
            >
              <el-option
                v-for="(item,index) in applcmList"
                :key="index"
                :label="item.applcmIp"
                :value="item.applcmIp"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="App Rule MGR"
            prop="appRuleIp"
          >
            <el-select
              id="apprulemgrip"
              v-model="currForm.appRuleIp"
              placeholder="App Rule MGR IP"
            >
              <el-option
                v-for="(item,index) in appRuleIpList"
                :key="index"
                :label="item.appRuleIp"
                :value="item.appRuleIp"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        id="confirmBtn"
        type="primary"
        size="small"
        @click="confirm('currForm')"
      >{{ $t('common.confirm') }}</el-button>
      <el-button
        id="cancelBtn"
        size="small"
        @click="cancel()"
      >{{ $t('common.cancel') }}</el-button>
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
    type: function (val) {
      if (this.type === 1) {
        this.register()
      } else {
        this.handleModify()
      }
    }
  },
  data () {
    return {
      currForm: {
        address: '',
        affinity: '',
        applcmIp: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        appRuleIp: '',
        coordinate: '',
        vim: 'K8S'
      },
      falsecapabilities: [],
      capabilities: [],
      gpuModel: '',
      gpuVendor: '',
      npuModel: '',
      npuVendor: '',
      options: [
        {
          value: '1',
          label: this.$t('area.beijing'),
          children: [{
            value: '1.1',
            label: this.$t('area.haidian'),
            children: [{
              value: '116.35,39.979508',
              label: this.$t('area.caict')
            }, {
              value: '116.185087,40.054096',
              label: this.$t('area.huaweiBeijing')
            }]
          }]
        },
        {
          value: '1',
          label: this.$t('area.shanxi'),
          children: [{
            value: '1.1',
            label: this.$t('area.xian'),
            children: [{
              value: '108.839257,34.197356',
              label: this.$t('area.huaweiXian')
            }, {
              value: '108.916787,34.230834',
              label: this.$t('area.xidian')
            }]
          }]
        }, {
          value: '2',
          label: this.$t('area.jiangsu'),
          children: [{
            value: '2.1',
            label: this.$t('area.nanjing'),
            children: [{
              label: this.$t('area.zijinshan'),
              value: '118.822617,31.871027'
            }]
          }]
        }, {
          value: '3',
          label: this.$t('area.shanghai'),
          children: [{
            value: '3.1',
            label: this.$t('area.pudong'),
            children: [
              {
                label: this.$t('area.huaweiShanghai'),
                value: '121.633202,31.26335'
              }
            ]
          }]
        }, {
          value: '4',
          label: this.$t('area.guangdong'),
          children: [{
            value: '4.1',
            label: this.$t('area.shenzhen'),
            children: [
              {
                label: this.$t('area.huaweiBantian'),
                value: '114.054927,22.658795'
              },
              {
                label: this.$t('area.tiananyungu'),
                value: '114.064276,22.661791'
              },
              {
                label: this.$t('area.clab'),
                value: '114.05283,22.656889'
              },
              {
                label: this.$t('area.SUSTech'),
                value: '113.996625,22.603375'
              }
            ]
          }]
        }, {
          value: '5',
          label: this.$t('area.shandong'),
          children: [{
            value: '5.1',
            label: this.$t('area.qingdao'),
            children: [{
              value: '120.4154467,36.1322617',
              label: this.$t('area.haier')
            }]
          }]
        }
      ],
      op: false,
      area: false,
      applcmList: [],
      appRuleIpList: [],
      selectedArea: [],
      editType: 1,
      isDisable: false,
      affinityList: ['X86', 'ARM64', 'ARM32'],
      capability: ['GPU', 'NPU']
    }
  },
  computed: {
    rules () {
      return {
        mechostIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        mechostName: [
          { required: true, message: this.$t('verify.hostnameTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ],
        city: [
          { required: true, message: this.$t('tip.typeCity'), trigger: 'change' }
        ],
        coordinates: [
          { required: true, message: this.$t('verify.coordinates'), trigger: 'blur' }
        ],
        appRuleIp: [
          { required: true, message: this.$t('verify.appRuleManaVerify'), trigger: 'change' }
        ],
        applcmIp: [
          { required: true, message: this.$t('verify.appLcmIpTip'), trigger: 'change' }
        ],
        affinity: [
          { required: true, message: this.$t('verify.affinityTip'), trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    changeType () {
      this.op = !this.op
    },
    onChanged (val) {
      this.currForm.coordinates = this.$refs.myCascader.getCheckedNodes()[0].value
      this.currForm.city = this.$refs.myCascader.getCheckedNodes()[0].pathLabels.join('/')
      this.currForm.address = val.join(',')
    },
    handleModify () {
      this.getList()
      this.editType = 2
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(this.rowdata))
      this.currForm = middleData
      this.selectedArea = this.rowdata.address.split('/')
      this.dialogVisible = true
      this.area = true
      this.rowdata.hwcapabilities.forEach(item => {
        this.capabilities.push(item.hwType)
      })
    },
    cancel () {
      this.$refs.myCascader.$refs.panel.activePath = []
      this.area = false
      this.area = false
      this.isDisable = false
      this.resetForm()
      this.$emit('close', 'closeDialog')
    },
    resetForm () {
      this.currForm = {
        address: '',
        affinity: '',
        applcmIp: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        appRuleIp: '',
        coordinate: '',
        vim: 'K8S'
      }
      this.selectedArea = []
      this.capabilities = []
    },
    register () {
      this.editType = 1
      this.resetForm()
      this.isDisable = false
      this.dialogVisible = true
      this.area = true
      this.$nextTick(() => {
        this.$refs.currForm.resetFields()
      })
      this.getList()
    },
    getList () {
      inventory.getList(1).then(res => {
        this.applcmList = res.data
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.applcmList = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
      inventory.getList(4).then(res => {
        this.appRuleIpList = res.data
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.appRuleIpList = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    confirm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.currForm.hwcapabilities = []
          if (this.capabilities.length > 0) {
            this.capabilityJudgement()
          }
          this.currForm.address = this.selectedArea.join('/')
          if (this.editType === 1) {
            inventory.create(2, this.currForm).then(response => {
              this.showMessage('success', this.$t('tip.sucToRegNode'), 1500)
              this.afterOperation()
            }).catch((error) => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else if (error.response.status === 403) {
                this.$message.error(this.$t('tip.loginOperation'))
              } else {
                this.$message.error(error.response.data)
              }
            })
          } else {
            inventory.modify(2, this.currForm, this.currForm.mechostIp).then(response => {
              this.showMessage('success', this.$t('tip.sucToModNode'), 1500)
              this.afterOperation()
            }).catch(() => {
              this.$message.error(this.$t('tip.failToModifyNode'))
            })
          }
        }
      })
    },
    capabilityJudgement () {
      if (this.capabilities.includes('GPU')) {
        let obj = {}
        obj.hwType = 'GPU'
        this.currForm.hwcapabilities.push(obj)
      }
      if (this.capabilities.includes('NPU')) {
        let obj = {}
        obj.hwType = 'NPU'
        this.currForm.hwcapabilities.push(obj)
      }
    },
    afterOperation () {
      this.$refs.myCascader.$refs.panel.activePath = []
      this.area = false
      this.isDisable = false
      this.resetForm()
      this.$emit('close', 'closeDialog')
    }
  },
  mounted () {
    console.log(this.rowdata)
  }
}

</script>
<style lang='less' scoped>

</style>
