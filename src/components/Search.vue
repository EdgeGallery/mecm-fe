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
    <el-row>
      <el-form
        :model="formData"
        ref="formData"
        label-width="120px"
      >
        <el-col
          :span="8"
          v-if="nameItem"
        >
          <el-form-item
            :label="$t('app.packageList.name')"
            prop="name"
          >
            <el-input
              id="name"
              v-model="formData.name"
              :placeholder="$t('app.packageList.name')"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="affinityItem"
        >
          <el-form-item
            :label="$t('app.packageList.affinity')"
            prop="affinity"
          >
            <el-select
              id="affinity"
              v-model="formData.affinity"
              :placeholder="$t('app.packageList.affinity')"
            >
              <el-option
                v-for="item in affinity"
                :label="item.label"
                :value="item.value"
                :key="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="typeItem"
        >
          <el-form-item
            :label="$t('app.packageList.type')"
            prop="type"
          >
            <el-select
              id="type"
              v-model="formData.type"
              :placeholder="$t('app.packageList.type')"
            >
              <el-option
                v-for="item in types"
                :label="item.label"
                :value="item.value"
                :key="item.label"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="statusItem"
        >
          <el-form-item
            :label="$t('app.distriList.status')"
            prop="status"
          >
            <el-select
              id="status"
              v-model="formData.status"
              :placeholder="$t('app.distriList.status')"
            >
              <el-option
                v-for="item in status"
                :label="item"
                :value="item"
                :key="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :span="8"
          v-if="ipItem"
        >
          <el-form-item
            :label="$t('app.packageList.ip')"
            prop="ip"
          >
            <el-input
              id="ip"
              v-model="formData.ip"
              :placeholder="$t('app.packageList.ip')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div
            class="flex"
            style="justify-content: center; align-items: center;"
          >
            <el-button
              id="resetBtn"
              @click="resetForm('formData')"
            >
              {{ $t('common.reset') }}
            </el-button>
            <el-button
              id="searchBtn"
              type="primary"
              @click="search"
            >
              {{ $t('common.search') }}
            </el-button>
          </div>
        </el-col>
        <div class="clearfix" />
      </el-form>
    </el-row>
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
        status: '',
        ip: ''
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
  },
  mounted () {}
}
</script>
<style lang='less' scoped>
.search{
  .el-select{
    width:100%;
  }
}
</style>
