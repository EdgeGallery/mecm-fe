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
    <div
      class="breadcrumb"
    >
      <el-breadcrumb
        separator=" | "
      >
        <el-breadcrumb-item :to="{ path: '/' }">
          {{ $t('nav.overview') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mecm/app/package' }">
          {{ $t('nav.appMana') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mecm/app/package' }">
          {{ $t('nav.packageMana') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.appDetail') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <Edge :appid="appId" />
  </div>
</template>
<script>
import Edge from './EdgeList'
export default {
  components: {
    Edge
  },
  data () {
    return {
      appId: window.location.href.split('=')[1] || sessionStorage.getItem('appId')
    }
  }
}
</script>
