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
  <div class="ruleconfig">
    <div class="topLabel">
      {{ $t('nav.ruleConfiguration') }}
      <div class="block" />
    </div>
    <div class="btnMain">
      <el-button
        type="primary"
        id="deleteInsBtn"
      >
        <span class="iconcont add" />
        <span>新增规则</span>
      </el-button>
    </div>
    <div class="contentList">
      <el-tabs
        v-model="activeName"
        type="card"
      >
        <el-tab-pane
          :label="$t('app.ruleConfig.dnsRule')"
          name="dns"
        >
          <DnsPannel />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('app.ruleConfig.trafficRule')"
          name="traffic"
        >
          <TrafficPannel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import DnsPannel from './Dns.vue'
import TrafficPannel from './Traffic.vue'
export default {
  components: {
    DnsPannel,
    TrafficPannel
  },
  data () {
    return {
      activeName: 'dns'
    }
  }
}

</script>
<style lang='less' scoped>

</style>
