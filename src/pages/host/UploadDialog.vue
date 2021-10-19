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
    <el-upload
      id="upload"
      class="upload-demo"
      drag
      action=""
      :http-request="submitUpload"
      :file-list="fileList"
      :multiple="false"
      accept=""
      :limit="1"
    >
      <em class="el-icon-upload" />
      <div class="el-upload__text">
        {{ $t('system.edgeNodes.howToUpload') }}
      </div>
      <div
        class="el-upload__tip"
        slot="tip"
      >
        {{ $t('system.edgeNodes.uploadTip') }}
      </div>
    </el-upload>
  </div>
</template>

<script>
import { inventory } from '../../tools/request.js'
export default {
  props: {
    mechostip: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      fileList: [],
      fileConfirm: true
    }
  },
  methods: {
    async submitUpload (content) {
      let params = new FormData()
      params.append('file', content.file)
      inventory.uploadConfig(this.mechostip, params).then(response => {
        this.showMessage('success', this.$t('tip.uploadSuc'), 1500)
        this.fileList = []
        this.$emit('close', 'closeUploadDialog')
      }).catch((error) => {
        console.log(error)
        this.$message.error(error)
        this.fileList = []
      })
    }
  }
}

</script>
