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
    <!-- 分流规则 -->
    <p class="title">
      {{ $t('app.ruleConfig.trafficFilter') }}
    </p>
    <el-table
      class="mt20"
      border
      size="small"
      style="width: 100%;"
      :data="filterData"
    >
      <el-table-column
        prop="srcAddress"
        :label="$t('app.ruleConfig.srcAddress')"
      />
      <el-table-column
        prop="srcPort"
        :label="$t('app.ruleConfig.srcPort')"
      />
      <el-table-column
        prop="dstAddress"
        :label="$t('app.ruleConfig.dstAddress')"
      />
      <el-table-column
        prop="dstPort"
        :label="$t('app.ruleConfig.dstPort')"
      />
      <el-table-column
        prop="protocol"
        :label="$t('app.ruleConfig.protocol')"
      />
      <el-table-column
        prop="dstTunnelAddress"
        :label="$t('app.ruleConfig.dstTunnelAddress')"
      />
      <el-table-column
        prop="dstTunnelPort"
        :label="$t('app.ruleConfig.srcTunnelPort')"
      />
      <el-table-column
        prop="srcTunnelAddress"
        :label="$t('app.ruleConfig.srcTunnelAddress')"
      />
      <el-table-column
        prop="srcTunnelPort"
        :label="$t('app.ruleConfig.dstTunnelPort')"
      />
      <el-table-column
        prop="tag"
        label="Tag"
      />
      <el-table-column
        prop="qCI"
        label="QCI"
      />
      <el-table-column
        prop="dSCP"
        label="DSCP"
      />
      <el-table-column
        prop="tC"
        label="TC"
      />
    </el-table>

    <!-- 接口信息 -->
    <p class="title">
      接口信息
    </p>
    <el-table
      class="mt20"
      :data="interfaceData"
      border
      size="small"
      style="width: 100%;"
    >
      <el-table-column
        prop="interfaceType"
        :label="$t('app.ruleConfig.interfaceType')"
      />
      <el-table-column
        prop="tunnelInfo.tunnelType"
        :label="$t('app.ruleConfig.tunnelType')"
      />
      <el-table-column
        prop="tunnelInfo.tunnelDstAddress"
        :label="$t('app.ruleConfig.dstTunnelAddress')"
        width="120px"
      />
      <el-table-column
        prop="tunnelInfo.tunnelSrcAddress"
        :label="$t('app.ruleConfig.srcTunnelAddress')"
      />
      <el-table-column
        prop="tunnelInfo.tunnelSpecificData"
        :label="$t('app.ruleConfig.tunnelSpecificData')"
      />
      <el-table-column
        prop="dstMacAddress"
        :label="$t('app.ruleConfig.dstMacAddress')"
      />
      <el-table-column
        prop="srcMacAddress"
        :label="$t('app.ruleConfig.srcMacAddress')"
      />
      <el-table-column
        prop="dstIpAddress"
        label="目的IP地址"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      interfaceData: [],
      filterData: []
    }
  },
  methods: {},
  mounted () {
    this.filterData = this.data.trafficFilter
    this.interfaceData = this.data.dstInterface
  }
}

</script>
