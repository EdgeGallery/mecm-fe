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
  <div class="image-form">
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
        <em class="title_icon" />{{ $t('resourceMgr.createImage') }}
      </div>
      <el-form
        :model="createImageForm"
        ref="form"
        :rules="rules"
        label-position="right"
        :label-width="language==='cn'? '100px': '130px'"
      >
        <el-form-item
          :label="$t('resourceMgr.imageName')"
          prop="name"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.name"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.containerFormat')"
          prop="containerFormat"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.containerFormat"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.diskFormat')"
          prop="diskFormat"
          class="w50"
        >
          <el-select
            size="small"
            v-model="createImageForm.diskFormat"
            :style="{width: '100%'}"
          >
            <el-option
              v-for="item in diskFormatList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.properties')"
          prop="properties"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.properties"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.minDisk')"
          prop="minDisk"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.minDisk"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.minRam')"
          prop="minRam"
          class="w50"
        >
          <el-input
            size="small"
            v-model="createImageForm.minRam"
          />
        </el-form-item>
        <el-form-item
          :label="$t('resourceMgr.resourceUri')"
          prop="resourceUri"
          class="w100"
        >
          <el-input
            size="small"
            v-model="createImageForm.resourceUri"
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
  },
  data () {
    return {
      dialogVisible: true,
      diskFormatList: [
        { label: 'qcow2', value: 'qcow2' },
        { label: 'diskType2', value: 'diskType2' },
        { label: 'diskType3', value: 'diskType3' }
      ],
      createImageForm: {
        name: '',
        containerFormat: '',
        diskFormat: '',
        minRam: '',
        minDisk: '',
        properties: '',
        resourceUri: ''
      },
      rules: {
        name: [{ required: true, message: this.$t('resourceMgr.nameRule'), trigger: 'blur' }],
        minRam: [{ required: true, message: this.$t('resourceMgr.minRamRule'), trigger: 'blur' }],
        minDisk: [{ required: true, message: this.$t('resourceMgr.diskRule'), trigger: 'blur' }]
      },
      language: localStorage.getItem('language')
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
        name: this.createImageForm.name,
        containerFormat: this.createImageForm.containerFormat,
        diskFormat: this.createImageForm.diskFormat,
        minRam: parseInt(this.createImageForm.minRam),
        minDisk: parseInt(this.createImageForm.minDisk),
        properties: {}
      }
      appo.createImage(_hostIp, _params).then(res => {
        let _imageId = res.data.data.imageId
        this.importImage(_hostIp, _imageId)
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createImageFailed'))
      })
    },
    importImage (hostIp, imageId) {
      let _params = {
        resourceUri: this.createImageForm.resourceUri
      }
      appo.importImage(hostIp, imageId, _params).then(res => {
        this.$message.success(this.$t('resourceMgr.createImageSuccess'))
        this.$emit('reloadTableData')
        this.handleClose()
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createImageFailed'))
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
.image-form{
  .w50 {
    width: 50%;
    display: inline-block;
  }
  .w100 {
    width: 100%;
    display: inline-block;
  }
}
</style>
