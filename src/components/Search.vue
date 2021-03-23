<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="search">
    <div class="rt">
      <el-form
        :model="formData"
        ref="formData"
        label-width="auto"
        :inline="true"
        class="clearfix"
      >
        <el-form-item
          prop="name"
          v-if="nameItem"
        >
          <el-input
            id="name"
            maxlength="20"
            v-model="formData.name"
            :placeholder="$t('app.packageList.name')"
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item
          prop="affinity"
          v-if="affinityItem"
        >
          <el-select
            id="affinity"
            v-model="formData.affinity"
            :placeholder="$t('app.packageList.affinity')"
            @change="search"
          >
            <el-option
              v-for="item in affinity"
              :label="item.label"
              :value="item.value"
              :key="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="type"
          v-if="typeItem"
        >
          <el-select
            id="type"
            v-model="formData.type"
            :placeholder="$t('app.packageList.type')"
            @change="search"
          >
            <el-option
              v-for="item in types"
              :label="item.label"
              :value="item.value"
              :key="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="status"
          v-if="statusItem"
        >
          <el-select
            id="status"
            v-model="formData.status"
            :placeholder="$t('app.distriList.status')"
            @change="search"
          >
            <el-option
              v-for="item in status"
              :label="item"
              :value="item"
              :key="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="ip"
          v-if="ipItem"
        >
          <el-input
            id="ip"
            maxlength="15"
            v-model="formData.ip"
            :placeholder="$t('app.packageList.ip')"
            @keyup.enter.native="search"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            id="searchBtn"
            type="primary"
            plain
            size="small"
            @click="search"
          >
            {{ $t('common.search') }}
          </el-button>
        </el-form-item>
        <div class="clearfix" />
      </el-form>
    </div>
  </div>
</template>

<script>
import { TYPES, AFFINITY } from '../tools/constant.js'
export default {
  props: {
    nameItem: {
      type: Boolean,
      default: true
    },
    affinityItem: {
      type: Boolean,
      default: true
    },
    statusItem: {
      type: Boolean,
      default: true
    },
    typeItem: {
      type: Boolean,
      default: false
    },
    ipItem: {
      type: Boolean,
      default: false
    },
    status: {
      type: Array,
      default () {
        return [
          'progress',
          'completed',
          'error'
        ]
      }
    }
  },
  data () {
    return {
      types: TYPES,
      affinity: AFFINITY,
      formData: {
        name: '',
        affinity: '',
        type: '',
        status: ''
      }
    }
  },
  methods: {
    search () {
      this.$emit('getSearchData', this.formData)
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('getSearchData', this.formData)
    }
  }
}
</script>
<style lang='less' scoped>
.search{
  height:65px;
  .el-select{
    width:100%;
  }
}
</style>
