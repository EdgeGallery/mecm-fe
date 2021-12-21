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
  <div class="securityGroupFlavor-form">
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
        <em class="title_icon" />
        {{ dlgType==="createDlg" ? $t('resourceMgr.addSecurityGroupFlavor'):$t('resourceMgr.editSecurityGroupFlavor') }}
      </div>
      <el-form
        :model="securityGroupFlavorForm"
        ref="form"
        :rules="rules"
        label-position="right"
        label-width="110px"
      >
        <el-form-item
          :label="$t('resourceMgr.protocol')"
          prop="protocol"
          class="w50"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.protocol"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in protocolList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.direct')"
          prop="direct"
          class="w50"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.direct"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in directList"
              :key="item.value"
              :label="language==='cn'?item.label_cn: item.label_en"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.openPort')"
          prop="openPort"
          class="w50"
        >
          <el-select
            size="small"
            :style="{width: '100%'}"
            v-model="securityGroupFlavorForm.openPort"
          >
            <el-option
              v-for="item in portList"
              :key="item.value"
              :label="language==='cn'?item.label_cn: item.label_en"
              :value="item.value"
              @click.native="getSelectPortType(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.port')"
          prop="port"
          class="w50"
          v-if="isPortType"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.port"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.portRangeMin')"
          prop="portRangeMin"
          class="w100"
          v-if="isPortRangeType"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.portRangeMin"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.portRangeMax')"
          prop="portRangeMax"
          class="w100"
          v-if="isPortRangeType"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.portRangeMax"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.description')"
          prop="description"
          class="w100"
        >
          <el-input
            size="small"
            type="textarea"
            v-model="securityGroupFlavorForm.description"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.remote')"
          prop="remote"
          class="w50"
        >
          <el-select
            size="small"
            :style="{width: '100%'}"
            v-model="securityGroupFlavorForm.remote"
          >
            <el-option
              v-for="item in remoteList"
              :key="item.value"
              :label="language==='cn'?item.label_cn: item.label_en"
              :value="item.value"
              @click.native="getSelectRemoteType(item)"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="CIDR"
          prop="remoteIpPrefix"
          class="w50"
          v-if="isCIDR"
        >
          <el-input
            size="small"
            v-model="securityGroupFlavorForm.remoteIpPrefix"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.securityGroup')"
          prop="remoteGroupId"
          class="w100"
          v-if="!isCIDR"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.remoteGroupId"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in remoteGroupList"
              :key="item.value"
              :label="language==='cn'?item.label_cn: item.label_en"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.ethertype')"
          prop="ethertype"
          class="w100"
          v-if="!isCIDR"
        >
          <el-select
            size="small"
            v-model="securityGroupFlavorForm.ethertype"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in ethertypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
    dlgType: {
      required: true,
      type: String
    },
    securityGroupId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      dialogVisible: true,
      protocolList: [
        { label: 'TCP', value: 'tcp' },
        { label: 'UDP', value: 'udp' },
        { label: 'ICMP', value: 'icmp' },
        { label: 'ALL', value: 'all' }
      ],
      directList: [
        { label_cn: '入口', label_en: 'Ingress', value: 'ingress' },
        { label_cn: '出口', label_en: 'Egress', value: 'egress' }
      ],
      ethertypeList: [
        { label: 'IPv4', value: 'IPv4' },
        { label: 'IPv6', value: 'IPv6' }
      ],
      portList: [
        { label_cn: '端口', label_en: 'Port', value: 'port' },
        { label_cn: '端口范围', label_en: 'Port Range', value: 'portRange' },
        { label_cn: '所有端口', label_en: 'All Ports', value: 'allPort' }
      ],
      remoteList: [
        { label_cn: 'CIDR', label_en: 'CIDR', value: 'CIDR' },
        { label_cn: '安全组', label_en: 'Security Group', value: 'securityGroup' }
      ],
      language: localStorage.getItem('language'),
      isPortType: true,
      isPortRangeType: false,
      isCIDR: true,
      securityGroupFlavorForm: {
        protocol: '',
        direct: '',
        ethertype: '',
        description: '',
        port: '',
        openPort: '',
        remote: '',
        portRangeMin: '',
        portRangeMax: '',
        remoteIpPrefix: '',
        remoteGroupId: ''
      },
      rules: {
        direct: [{ required: true, message: this.$t('resourceMgr.directRule'), trigger: 'blur' }],
        openPort: [{ required: true, message: this.$t('resourceMgr.openPortRule'), trigger: 'blur' }],
        remote: [{ required: true, message: this.$t('resourceMgr.remoteRule'), trigger: 'blur' }],
        cidr: [{ required: true, message: this.$t('resourceMgr.cidrRule'), trigger: 'blur' }]
      },
      remoteGroupList: []
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
        securityGroupId: this.securityGroupId,
        direction: this.securityGroupFlavorForm.direct,
        protocol: this.securityGroupFlavorForm.protocol,
        ethertype: this.securityGroupFlavorForm.ethertype,
        port_range_min: parseInt(this.securityGroupFlavorForm.portRangeMin, 10),
        port_range_max: parseInt(this.securityGroupFlavorForm.portRangeMax, 10),
        remoteIpPrefix: this.securityGroupFlavorForm.remoteIpPrefix,
        remoteGroupId: this.securityGroupFlavorForm.remoteGroupId
      }
      appo.createSecurityGroupRule(_hostIp, this.securityGroupId, _params).then(res => {
        this.$message.success(this.$t('resourceMgr.createSecurityGroupFlavorSuccess'))
        this.$emit('reloadTableData')
        this.handleClose()
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createSecurityGroupRuleFailed'))
        this.handleClose()
      })
    },
    cancelAction () {
      this.handleClose()
    },
    getSelectPortType (item) {
      if (item.value === 'port') {
        this.isPortType = true
        this.isPortRangeType = false
      } else if (item.value === 'portRange') {
        this.isPortRangeType = true
        this.isPortType = false
      } else {
        this.isPortType = false
        this.isPortRangeType = false
      }
    },
    getSelectRemoteType (item) {
      if (item.value === 'CIDR') {
        this.isCIDR = true
      } else {
        this.isCIDR = false
      }
    },
    getRemoteGroupList () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.querySecurityGroupsByMechost(_hostIp).then(res => {
        res.data.data.forEach(item => {
          let _securityGroupItem = {
            label: item.name,
            value: item.id
          }
          this.remoteGroupList.push(_securityGroupItem)
        })
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.querySecurityGroupsFailed'))
      })
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  },
  mounted () {
    this.getRemoteGroupList()
    this.securityGroupFlavorForm.direct = this.directList[0].value
    this.securityGroupFlavorForm.remote = this.remoteList[0].value
    this.securityGroupFlavorForm.openPort = this.portList[0].value
  }
}
</script>
<style lang="less" scoped>
.securityGroupFlavor-form{
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .w100 {
    width: 100%;
    display: inline-block;
  }
  .el-input {
    width: 85%;
  }
}
</style>
