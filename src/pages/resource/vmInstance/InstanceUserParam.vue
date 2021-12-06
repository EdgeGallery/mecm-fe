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
  <div
    class="instance-user-param"
  >
    <div class="radio-select">
      {{ $t('resourceMgr.enableUserParam') }}
      <el-radio
        class="default_radio"
        v-model="radio"
        label="1"
      >
        true
      </el-radio>
      <el-radio
        class="default_radio"
        v-model="radio"
        label="2"
      >
        false
      </el-radio>
    </div>
    <div class="user-textarea">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8}"
        v-model="testareaData"
      />
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      dialogVisible: true,
      radio: '1',
      testareaData: '',
      userConfigparam: {
        step: 'userConfigStep',
        configDrive: true,
        userData: ''
      }
    }
  },
  methods: {
    // receive msg from parent component
    parentMsg: function (active) {
      if (this.radio === '1') {
        this.userConfigparam.configDrive = true
      } else {
        this.userConfigparam.configDrive = false
      }
      this.userConfigparam.userData = this.testareaData
      this.$emit('getStepData', this.userConfigparam)
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.instance-user-param{
  .radio-select{
    text-align: left;
  }
  .user-textarea{
    margin-top: 20px;
    text-align: left;
  }
}
</style>
