<!--
  - Copyright 2021 Huawei Technologies Co., Ltd.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
  <div class="flavor-form">
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('resourceMgr.createFlavor') }}
      </div>
      <el-form
        :model="createFlavorForm"
        ref="form"
        :rules="rules"
        label-position="right"
        :label-width="language==='cn'? '100px': '120px'"
      >
        <el-form-item
          :label="$t('resourceMgr.name')"
          prop="flavorName"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createFlavorForm.flavorName"
          />
        </el-form-item>
        <el-form-item
          label="ID"
          prop="flavorID"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createFlavorForm.flavorID"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.flavorVCPU')"
          prop="flavorVCPU"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createFlavorForm.flavorVCPU"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.ram')"
          prop="flavorRAM"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createFlavorForm.flavorRAM"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.rootDisk')"
          prop="flavorRootDisk"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createFlavorForm.flavorRootDisk"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.tempDisk')"
          prop="flavorTempDisk"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createFlavorForm.flavorTempDisk"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.swapDisk')"
          prop="flavorSwapDisk"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createFlavorForm.flavorSwapDisk"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.flavorConfig')"
          prop="extraSpecs"
          class="w100"
        >
          <el-input
            size="small"
            v-model="showExtraSpecs"
          >
            <span
              slot="suffix"
              @click="addMore"
              class="el-icon-more"
            />
          </el-input>
        </el-form-item>
      </el-form>
      <div v-if="isShwoFlavorConfigDlg">
        <FlavorConfig
          v-model="isShwoFlavorConfigDlg"
          @configData="getConfigData"
          :key-value-datas="keyValueDatas"
        />
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="small"
          @click="confirmAction"
        >
          {{ $t('resourceMgr.confirm') }}
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="cancelAction"
        >
          {{ $t('resourceMgr.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import FlavorConfig from './FlavorConfig.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    FlavorConfig
  },
  props: {
  },
  data () {
    return {
      dialogVisible: true,
      showExtraSpecs: 'network_internet=mec_network_internet1;network_mep=mec_network_mep1',
      createFlavorForm: {
        flavorName: '',
        flavorID: '',
        flavorVCPU: '',
        flavorRAM: '',
        flavorRootDisk: '',
        flavorTempDisk: '',
        flavorSwapDisk: '',
        extraSpecs: {}
      },
      rules: {
        flavorName: [{ required: true, message: this.$t('resourceMgr.nameRule'), trigger: 'blur' }],
        flavorVCPU: [{ required: true, message: this.$t('resourceMgr.vCPURule'), trigger: 'blur' }],
        flavorRAM: [{ required: true, message: this.$t('resourceMgr.ramRule'), trigger: 'blur' }],
        flavorRootDisk: [{ required: true, message: this.$t('resourceMgr.rootDiskRule'), trigger: 'blur' }],
        flavorTempDisk: [{ required: true, message: this.$t('resourceMgr.tempDiskRule'), trigger: 'blur' }],
        flavorSwapDisk: [{ required: true, message: this.$t('resourceMgr.swapDiskRule'), trigger: 'blur' }]
      },
      isShwoFlavorConfigDlg: false,
      keyValueDatas: []
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    confirmAction () {
      let _hostIp = sessionStorage.getItem('hostIp')
      this.transArrToObj(this.keyValueDatas)
      let _params = {
        name: this.createFlavorForm.flavorName,
        vcpus: parseInt(this.createFlavorForm.flavorVCPU, 10),
        ram: parseInt(this.createFlavorForm.flavorRAM, 10),
        disk: parseInt(this.createFlavorForm.flavorRootDisk, 10),
        swap: parseInt(this.createFlavorForm.flavorSwapDisk, 10),
        extraSpecs: this.createFlavorForm.extraSpecs
      }
      appo.createFlavor(_hostIp, _params).then(res => {
        this.$message.success(this.$t('resourceMgr.createFlavorSuccess'))
        this.$emit('reloadTableData')
        this.handleClose()
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createFlavorFailed'))
        this.handleClose()
      })
    },
    cancelAction () {
      this.handleClose()
    },
    transStrToArr (data) {
      let _objArr = []
      if (data) {
        let _tempArr = data.split(';')
        _tempArr.forEach(item => {
          let _obj = {
            name: '',
            value: ''
          }
          _obj.name = item.split('=')[0]
          _obj.value = item.split('=')[1]
          _objArr.push(_obj)
        })
      }
      return _objArr
    },
    transArrToObj (data) {
      data.forEach(item => {
        this.createFlavorForm.extraSpecs[item.name] = item.value
      })
    },
    addMore () {
      this.isShwoFlavorConfigDlg = true
      this.keyValueDatas = this.transStrToArr(this.showExtraSpecs)
    },
    getConfigData (data) {
      this.showExtraSpecs = data
      this.keyValueDatas = this.transStrToArr(this.showExtraSpecs)
    }
  }
}
</script>
<style lang="less" scoped>
.flavor-form{
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .w100 {
    width: 100%;
    display: inline-block;
    .el-icon-more{
      color: #0A0A0A;
      background: #efefef;
      padding: 2px 8px;
      border-radius: 5px;
      position: relative;
      top: 1px;
      cursor: pointer;
    }
  }
  .el-input {
    width: 85%;
  }
}
</style>
