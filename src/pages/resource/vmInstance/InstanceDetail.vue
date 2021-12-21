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
    class="network-form"
  >
    <el-form
      :model="createInstanceDetailForm"
      ref="form"
      :rules="rules"
      label-position="right"
      :label-width="language==='cn'? '100px':'130px'"
    >
      <el-form-item
        :label="$t('resourceMgr.instanceName')"
        prop="instanceName"
        class="w50"
      >
        <el-input
          size="small"
          v-model="createInstanceDetailForm.instanceName"
        />
      </el-form-item>
      <el-form-item
        :label="$t('resourceMgr.description')"
        prop="description"
        class="w50"
      >
        <el-input
          size="small"
          v-model="createInstanceDetailForm.description"
        />
      </el-form-item>
      <el-form-item
        :label="$t('resourceMgr.useDomain')"
        prop="useDomain"
        class="w50"
      >
        <el-select
          size="small"
          v-model="createInstanceDetailForm.useDomain"
          :style="{width: '100%'}"
        >
          <el-option
            v-for="item in useDomainList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('resourceMgr.number')"
        prop="number"
        class="w50"
      >
        <el-input
          size="small"
          v-model="createInstanceDetailForm.number"
        />
      </el-form-item>
    </el-form>
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
      language: localStorage.getItem('language'),
      createInstanceDetailForm: {
        step: 'stepDetail',
        instanceName: '',
        description: '',
        useDomain: '',
        number: ''
      },
      useDomainList: [
        { label: 'nova', value: 'nova' },
        { label: 'az.dc', value: 'az.dc' }
      ],
      rules: {
        instanceName: [{ required: true, message: this.$t('resourceMgr.nameRule'), trigger: 'blur' }],
        useDomain: [{ required: true, message: this.$t('resourceMgr.availabilityZoneRule'), trigger: 'blur' }]
      }
    }
  },
  methods: {
    // receive msg from parent component
    parentMsg: function (active) {
      this.$emit('getStepData', this.createInstanceDetailForm)
    }
  },
  mounted () {
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
  .w50 {
    width: 50%;
    display: inline-block;
  }
}
</style>
