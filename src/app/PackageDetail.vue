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
  <div>
    <el-breadcrumb
      separator="/"
      class="breadcrumb"
    >
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ $t('nav.overview') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecm/apac/list' }">
        {{ $t('nav.appMana') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/mecm/apac/list' }">
        {{ $t('nav.packageMana') }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ $t('nav.appDetail') }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="app-detail">
      <div>
        <Edge :appid="appId" />
      </div>
    </div>
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
<style lang='less' >
.app-detail {
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
}
</style>
