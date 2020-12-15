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
        label="隧道目的地址"
      />
      <el-table-column
        prop="dstTunnelPort"
        label="隧道目的端口"
      />
      <el-table-column
        prop="srcTunnelAddress"
        label="隧道源地址"
      />
      <el-table-column
        prop="srcTunnelPort"
        label="隧道源端口"
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
        label="接口类型"
      />
      <el-table-column
        prop="tunnelInfo.tunnelType"
        label="隧道类型"
      />
      <el-table-column
        prop="tunnelInfo.tunnelDstAddress"
        label="隧道目的地址"
        width="120px"
      />
      <el-table-column
        prop="tunnelInfo.tunnelSrcAddress"
        label="隧道源地址"
      />
      <el-table-column
        prop="tunnelInfo.tunnelSpecificData"
        label="隧道指定参数"
      />
      <el-table-column
        prop="dstMacAddress"
        label="目的MAC地址"
      />
      <el-table-column
        prop="srcMacAddress"
        label="源MAC地址"
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
<style lang='less' scoped>
</style>
