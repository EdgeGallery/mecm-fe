<!--
  -  Copyright 2021 Huawei Technologies Co., Ltd.
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
  <div class="instance-dlg">
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('resourceMgr.createVMInstance') }}
      </div>
      <div>
        <el-steps
          class="work-steps"
          :active="active"
          finish-status="success"
        >
          <el-step
            class="step-item"
            :title="$t('resourceMgr.detail')"
          />
          <el-step
            :title="$t('resourceMgr.imageSelect')"
          />
          <el-step
            :title="$t('resourceMgr.instanceType')"
          />
          <el-step
            :title="$t('resourceMgr.network')"
          />
          <el-step
            :title="$t('resourceMgr.securityGroup')"
          />
          <el-step
            :title="$t('resourceMgr.userParam')"
          />
        </el-steps>
      </div>
      <div
        v-show="active===0"
        class="elSteps"
      >
        <InstanceDetail
          @getStepData="getStepData"
          ref="instanceDetail"
        />
      </div>
      <div
        v-show="active===1"
        class="elSteps"
      >
        <InstanceSelectImage
          @getStepData="getStepData"
          ref="instanceSelectImage"
        />
      </div>
      <div
        v-show="active===2"
        class="elSteps"
      >
        <InstanceType
          @getStepData="getStepData"
          ref="instanceType"
        />
      </div>
      <div
        v-show="active===3"
        class="elSteps"
      >
        <InstanceNetwork
          @getStepData="getStepData"
          ref="instanceNetwork"
        />
      </div>
      <div
        v-show="active===4"
        class="elSteps"
      >
        <InstanceSecurityGroup
          @getStepData="getStepData"
          ref="instanceSecurityGroup"
        />
      </div>
      <div
        v-show="active===5"
        class="elSteps"
      >
        <InstanceUserParam
          @getStepData="getStepData"
          ref="instanceUserParam"
        />
      </div>
      <div class="elButton">
        <el-button
          class="bgBtn"
          id="prevBtn"
          type="text"
          @click="previous"
          v-if="active>0"
        >
          <strong>{{ $t('resourceMgr.preStep') }}</strong>
        </el-button>
        <el-button
          class="bgBtn"
          id="nextBtn"
          type="text"
          @click="next"
          v-if="active<5"
        >
          <strong>{{ $t('resourceMgr.nextStep') }}</strong>
        </el-button>
        <el-button
          class="bgBtn"
          id="confirmBtn"
          type="text"
          @click="cancelAction"
        >
          <strong>{{ $t('resourceMgr.cancel') }}</strong>
        </el-button>
        <el-button
          class="bgBtn"
          id="text"
          type="text"
          @click="confirmAction"
          v-if="active===5"
        >
          <strong>{{ $t('resourceMgr.confirm') }}</strong>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import InstanceDetail from './InstanceDetail.vue'
import InstanceSelectImage from './InstanceSelectImage.vue'
import InstanceType from './InstanceType.vue'
import InstanceNetwork from './InstanceNetwork.vue'
import InstanceSecurityGroup from './InstanceSecurityGroup.vue'
import InstanceUserParam from './InstanceUserParam.vue'
import { appo } from '../../../tools/request.js'
export default {
  name: 'VMInstanceDlg',
  components: {
    InstanceDetail,
    InstanceSelectImage,
    InstanceType,
    InstanceNetwork,
    InstanceSecurityGroup,
    InstanceUserParam
  },
  data () {
    return {
      dialogVisible: true,
      active: 0,
      allStepData: {},
      hackReset: true
    }
  },

  methods: {
    rebuileComponents () {
      this.hackReset = false
      this.$nextTick(() => {
        this.hackReset = true
      })
    },
    next () {
      if (this.active < 5) {
        this.transferMsg(this.active)
        this.active++
      } else {
        this.$refs.instanceUserParam.parentMsg(this.active)
        this.active = 0
        setTimeout(() => {
          this.rebuileComponents()
        }, 100)
      }
    },
    transferMsg (activeIndex) {
      switch (activeIndex) {
        case 0:
          this.$refs.instanceDetail.parentMsg(0)
          break
        case 1:
          this.$refs.instanceSelectImage.parentMsg(1)
          break
        case 2:
          this.$refs.instanceType.parentMsg(2)
          break
        case 3:
          this.$refs.instanceNetwork.parentMsg(3)
          break
        case 4:
          this.$refs.instanceSecurityGroup.parentMsg(4)
          break
        case 5:
          this.$refs.instanceUserParam.parentMsg(5)
          break
        default:
          break
      }
    },
    previous () {
      this.active--
    },
    getStepData (data) {
      this.allStepData[data.step] = data
    },
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    confirmAction () {
      this.next()
      let _hostIp = sessionStorage.getItem('hostIp')
      let _params = {
        name: this.allStepData['stepDetail'].instanceName,
        flavor: this.allStepData['stepFlavor'].flavor,
        image: this.allStepData['stepImage'].imageId,
        availabilityZone: this.allStepData['stepDetail'].useDomain,
        user_data: this.allStepData['userConfigStep'].userData,
        configDrive: this.allStepData['userConfigStep'].configDrive,
        securityGroups: this.allStepData['stepSecurityGroup'].securityGroups,
        netWorks: this.allStepData['stepNetwork'].networks
      }
      appo.createVM(_hostIp, _params).then(res => {
        this.$message.success(this.$t('resourceMgr.createVMSuccess'))
        setTimeout(() => {
          this.$emit('reloadTableData')
          this.handleClose()
        }, 3000)
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createVMFailed'))
        this.handleClose()
      })
    },
    cancelAction () {
      this.handleClose()
    }
  }
}
</script>

<style lang="less" scoped>
.instance-dlg{
  width: 1000px;
  height: 550px;
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .elSteps {
    text-align: center;
    padding: 20px 0;
    box-sizing: border-box;
  }
  .elButton {
    text-align: right;
    height: 60px;
    button {
      height: 30px;
      width: 110px;
      line-height: 30px;
      padding: 0;
    }
  }
}
</style>
