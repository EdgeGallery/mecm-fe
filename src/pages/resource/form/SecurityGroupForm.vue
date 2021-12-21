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
      width="35%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />
        {{ dlgType==="createDlg" ? $t('resourceMgr.createSecurityGroup'):$t('resourceMgr.editSecurityGroup') }}
      </div>
      <el-form
        :model="securityGroupForm"
        ref="form"
        :rules="rules"
        label-position="right"
        label-width="100px"
      >
        <el-form-item
          :label="$t('resourceMgr.name')"
          prop="securityGroupName"
          class="w80"
        >
          <el-input
            size="small"
            v-model="securityGroupForm.securityGroupName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.description')"
          prop="securityGroupDescription"
          class="w80"
        >
          <el-input
            size="small"
            v-model="securityGroupForm.securityGroupDescription"
          />
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
    }
  },
  data () {
    return {
      dialogVisible: true,
      securityGroupForm: {
        securityGroupName: '',
        securityGroupDescription: ''
      },
      rules: {
        securityGroupName: [{ required: true, message: this.$t('resourceMgr.nameRule'), trigger: 'blur' }]
      }
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
        name: this.securityGroupForm.securityGroupName
      }
      appo.createSecurityGroup(_hostIp, _params).then(res => {
        this.$message.success(this.$t('resourceMgr.createSecurityGroupSuccess'))
        this.$emit('reloadTableData')
        this.handleClose()
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createSecurityGroupFailed'))
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
.network-form{
  .w80 {
    width: 90%;
    display: inline-block;
  }
}
</style>
