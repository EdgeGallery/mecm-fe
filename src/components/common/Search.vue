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
  <div class="search">
    <div>
      <el-form
        label-width="auto"
        :inline="true"
        class="clearfix"
        @submit.native.prevent
      >
        <el-form-item
          prop="name"
        >
          <el-input
            id="name"
            maxlength="20"
            v-model="value"
            :placeholder="placeholder"
            @keyup.enter.native="search"
            @input="check()"
          >
            <em
              slot="suffix"
              class="el-input__icon el-icon-search"
            />
          </el-input>
        </el-form-item>
        <div class="clearfix" />
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    search () {
      this.$emit('getSearchData', this.value)
    },
    check () {
      if (this.value === '') {
        this.$emit('getSearchData', '')
      }
    }
  }
}
</script>
