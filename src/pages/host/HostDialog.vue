<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
    <div class="k8s">
      <el-row>
        <el-form
          label-width="auto"
          :model="currForm"
          ref="currForm"
          :rules="rules"
          :inline="true"
        >
          <el-form-item
            label="VIM"
            style="width:100%;"
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
            style="width:100%;"
          >
            <el-input
              id="location"
              v-model="currForm.city"
              :placeholder="$t('system.edgeNodes.location')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.edgeNodes.address')"
            prop="address"
            style="width:100%;"
          >
            <el-input
              id="address"
              v-model="currForm.address"
              :placeholder="$t('system.edgeNodes.address')"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.edgeNodes.coordinates')"
            prop="coordinates"
            style="width:100%;"
          >
            <el-input
              id="coord"
              v-model="currForm.coordinates"
              :placeholder="$t('system.edgeNodes.coordPlaceholder')"
            />
            <el-button
              @click="isShowMap=true"
              class="get-coord"
              type="primary"
              plain
            >
              {{ $t('system.edgeNodes.getCoord') }}
            </el-button>
          </el-form-item>
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
            label="GPU Info"
            v-if="capabilities.includes('GPU')"
          >
            <el-row :gutter="24">
              <el-col :span="5">
                <el-input
                  type="text"
                  v-model="gpuModel"
                  placeholder="Model"
                />
              </el-col>
              <el-col :span="5">
                <el-input
                  type="text"
                  v-model="gpuVendor"
                  placeholder="Vendor"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="NPU Info"
            v-if="capabilities.includes('NPU')"
          >
            <el-row :gutter="24">
              <el-col :span="5">
                <el-input
                  type="text"
                  v-model="npuModel"
                  placeholder="Model"
                />
              </el-col>
              <el-col :span="5">
                <el-input
                  type="text"
                  v-model="npuVendor"
                  placeholder="Vendor"
                />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item
            label="MEPM"
            prop="mepmIp"
          >
            <el-select
              id="mepmip"
              v-model="currForm.mepmIp"
              :placeholder="$t('system.edgeNodes.mepmIp')"
            >
              <el-option
                v-for="(item,index) in mepmList"
                :key="index"
                :label="item.mepmIp"
                :value="item.mepmIp"
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
    <div
      class="coord-comp"
      v-if="isShowMap"
    >
      <Coord
        @confirmCoord="confirmCoord"
      />
    </div>
  </div>
</template>

<script>
import { inventory } from '../../tools/request.js'
import Coord from './Coordinates.vue'
export default {
  components: {
    Coord
  },
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
          this.handleModify()
        }
      }
    }
  },
  data () {
    return {
      currForm: {
        address: '',
        affinity: '',
        mepmIp: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        appRuleIp: '',
        coordinates: '',
        vim: 'K8S'
      },
      isShowMap: false,
      falsecapabilities: [],
      capabilities: [],
      gpuModel: '',
      gpuVendor: '',
      npuModel: '',
      npuVendor: '',
      op: false,
      mepmList: [],
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
        address: [
          { required: true, message: this.$t('tip.typeAddress'), trigger: 'change' }
        ],
        coordinates: [
          { required: true, message: this.$t('verify.coordinates'), trigger: 'blur' }
        ],
        appRuleIp: [
          { required: true, message: this.$t('verify.appRuleManaVerify'), trigger: 'change' }
        ],
        mepmIp: [
          { required: true, message: this.$t('verify.mepmIpTip'), trigger: 'change' }
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
    confirmCoord (val) {
      if (val) {
        this.currForm.coordinates = val
      }
      this.isShowMap = false
    },
    handleModify () {
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(this.rowdata))
      this.currForm = middleData
      this.dialogVisible = true
      this.rowdata.hwcapabilities.forEach(item => {
        this.capabilities.push(item.hwType)
        if (item.hwType === 'GPU') {
          this.gpuVendor = item.hwVendor
          this.gpuModel = item.hwModel
        } else if (item.hwType === 'NPU') {
          this.npuVendor = item.hwVendor
          this.npuModel = item.hwModel
        }
      })
    },
    cancel () {
      this.isDisable = false
      this.location.length = 0
      this.resetForm()
      this.$refs.currForm.resetFields()
      this.$emit('close', 'closeDialog')
    },
    resetForm () {
      this.currForm = {
        address: '',
        affinity: '',
        mepmIp: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        appRuleIp: '',
        coordinates: '',
        vim: 'K8S'
      }
      this.capabilities = []
    },
    register () {
      this.$refs.currForm.resetFields()
      this.resetForm()
      this.isDisable = false
      this.dialogVisible = true
    },
    getMepmList () {
      inventory.getList(5).then(res => {
        this.mepmList = res.data
      }, error => {
        console.log(error)
      })
    },
    confirm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.currForm.hwcapabilities = []
          if (this.capabilities.length > 0) {
            this.capabilityJudgement()
          }
          if (this.type === 1) {
            inventory.create(2, this.currForm).then(response => {
              this.showMessage('success', this.$t('tip.sucToRegNode'), 1500)
              this.cancel()
            }).catch((error) => {
              if (error.response.data.details[0] === 'Record already exist') {
                this.$message.error('Record already exist')
              } else if (error.response.status === 403) {
                this.$message.error(this.$t('tip.loginOperation'))
              }
            })
          } else {
            inventory.modify(2, this.currForm, this.currForm.mechostIp).then(response => {
              this.showMessage('success', this.$t('tip.sucToModNode'), 1500)
              this.cancel()
            }).catch((error) => {
              console.log(error)
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
        obj.hwVendor = this.gpuVendor
        obj.hwModel = this.gpuModel
        this.currForm.hwcapabilities.push(obj)
      }
      if (this.capabilities.includes('NPU')) {
        let obj = {}
        obj.hwType = 'NPU'
        obj.hwVendor = this.npuVendor
        obj.hwModel = this.npuModel
        this.currForm.hwcapabilities.push(obj)
      }
    }
  },
  created () {
    this.getMepmList()
  }
}

</script>
<style lang='less' scoped>
.referCoord{
  height:25px;
  font-size: 12px;
  a{
    color: #166bea;
  }
}

.coord-comp{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
.get-coord{
  margin-top: 10px;
}
</style>
