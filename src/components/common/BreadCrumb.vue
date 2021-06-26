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
  <div class="breadcrumb">
    <el-breadcrumb separator=" | ">
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ first }}
      </el-breadcrumb-item>
      <el-breadcrumb-item
        :to="jumpTo(path)"
        v-if="second"
      >
        {{ second }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="third">
        {{ third }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  components: {

  },
  props: {
    first: {
      required: true,
      type: String
    },
    second: {
      required: true,
      type: String
    },
    third: {
      default: '',
      type: String
    },
    path: {
      default: function () {
        return null
      },
      type: Object
    }
  },
  methods: {
    jumpTo (path) {
      return path
    }
  }
}
</script>
