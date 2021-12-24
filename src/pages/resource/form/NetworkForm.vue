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
  <div class="network-form">
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('resourceMgr.createNetwork') }}
      </div>
      <el-form
        :model="createNetworkForm"
        ref="form"
        :rules="rules"
        label-position="right"
        :label-width="language==='cn'? '100px': '130px'"
      >
        <el-form-item
          :label="$t('resourceMgr.networkName')"
          prop="networkName"
          class="w100"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.networkName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.subnetName')"
          prop="subnetName"
          class="w100"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.subnetName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.networkAddr')"
          prop="networkAddr"
          class="w100"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.networkAddr"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.ipVersion')"
          prop="ipVersion"
          class="w100"
        >
          <el-select
            size="small"
            v-model="createNetworkForm.ipVersion"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in ipVersionList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.gatewayIP')"
          prop="gatewayIp"
          class="w100"
        >
          <el-input
            size="small"
            v-model="createNetworkForm.gatewayIp"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.isShared')"
          prop="shared"
          class="w100"
        >
          <el-radio
            class="default_radio"
            v-model="createNetworkForm.shared"
            label="1"
          >
            true
          </el-radio>
          <el-radio
            class="default_radio"
            v-model="createNetworkForm.shared"
            label="2"
          >
            false
          </el-radio>
        </el-form-item>
      </el-form>
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
import { appo } from '../../../tools/request.js'
export default {
  components: {
  },
  props: {
  },
  data () {
    const validateAddr = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\/24)$/
      if (!value) {
        callback(new Error(this.$t('resourceMgr.enterIp')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('resourceMgr.enterRightIp')))
      } else {
        callback()
      }
    }
    const validateGateway = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!value) {
        callback(new Error(this.$t('resourceMgr.enterIp')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('resourceMgr.enterRightIp')))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: true,
      ipVersionList: [
        { label: 'ipv4', value: 'ipv4' },
        { label: 'ipv6', value: 'ipv6' }
      ],
      createNetworkForm: {
        networkName: '',
        networkAddr: '',
        ipVersion: '',
        gatewayIp: '',
        subnetName: ''
      },
      rules: {
        networkName: [{ required: true, message: this.$t('resourceMgr.nameRule'), trigger: 'blur' }],
        networkAddr: [{ required: true, validator: validateAddr, trigger: 'blur' }],
        gatewayIp: [{ required: true, validator: validateGateway, trigger: 'blur' }],
        ipVersion: [{ required: true, message: this.$t('resourceMgr.ipVersionRule'), trigger: 'blur' }],
        subnetName: [{ required: true, message: this.$t('resourceMgr.subnetNameRule'), trigger: 'blur' }]
      },
      language: localStorage.getItem('language'),
      shared: '1'
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    confirmAction () {
      let _hostIp = sessionStorage.getItem('hostIp')
      let _params = {
        name: this.createNetworkForm.networkName,
        shared: this.createNetworkForm.shared === '1',
        subnet: {
          name: this.createNetworkForm.subnetName,
          cidr: this.createNetworkForm.networkAddr,
          gatewayIp: this.createNetworkForm.gatewayIp
        }
      }
      appo.createNetwork(_hostIp, _params).then(res => {
        this.$message.success(this.$t('resourceMgr.createNetworkSuccess'))
        this.$emit('reloadTableData')
        this.handleClose()
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createNetworkFailed'))
        this.handleClose()
      })
    },
    cancelAction () {
      this.handleClose()
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less" scoped>
.network-form{
  .w100 {
    width: 75%;
    display: inline-block;
  }
}
</style>
