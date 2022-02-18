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
  <div class="overview-content">
    <div class="resource-introduction">
      <el-row :gutter="24">
        <el-col :span="12">
          <span class="resource-status">{{ $t('resourceMgr.resourceStatus') }}</span>
        </el-col>
        <el-col
          :span="12"
          class="resourcePercentage"
        >
          <em class="title-icon-blue" />{{ $t("resourceMgr.minPercentage") }}
          <em class="title-icon-yellow" />{{ $t("resourceMgr.middlePercentage") }}
          <em class="title-icon-red" />{{ $t("resourceMgr.maxPercentage") }}
        </el-col>
      </el-row>
    </div>
    <div
      class="resource-content"
      v-if="isShowContent"
    >
      <el-row
        class="resource-row"
        :gutter="24"
      >
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticInstanceData"
          />
        </el-col>
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticVpuData"
          />
        </el-col>
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticRamData"
          />
        </el-col>
      </el-row>
      <el-row
        class="resource-row"
        :gutter="24"
      >
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticFloatingIpsData"
          />
        </el-col>
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticSecurityGroupsData"
          />
        </el-col>
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticServerGroupsData"
          />
        </el-col>
      </el-row>
      <el-row
        class="resource-row"
        :gutter="24"
      >
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticPortData"
          />
        </el-col>
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticNetworkData"
          />
        </el-col>
        <el-col :span="8">
          <ResourceGrid
            :statistic-data="statisticSubnetData"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ResourceGrid from './ResourceGrid.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    ResourceGrid
  },
  props: {
  },
  data () {
    return {
      statisticInstanceData: {},
      statisticVpuData: {},
      statisticRamData: {},
      statisticFloatingIpsData: {},
      statisticSecurityGroupsData: {},
      statisticServerGroupsData: {},
      statisticPortData: {},
      statisticNetworkData: {},
      statisticSubnetData: {},
      isShowContent: false
    }
  },
  methods: {
    getKpi (ip) {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.getNodeKpi(_hostIp).then(res => {
        this.statisticInstanceData = {
          index: 1,
          totalUsed: res.data.data.totalInstancesUsed,
          maxTotal: res.data.data.maxTotalInstances,
          percent: res.data.data.totalInstancesUsed / res.data.data.maxTotalInstances * 100
        }
        this.statisticVpuData = {
          index: 2,
          totalUsed: res.data.data.totalCoresUsed,
          maxTotal: res.data.data.maxTotalCores,
          percent: res.data.data.totalCoresUsed / res.data.data.maxTotalCores * 100
        }
        this.statisticRamData = {
          index: 3,
          totalUsed: res.data.data.totalRAMUsed,
          maxTotal: res.data.data.maxTotalRAMSize,
          percent: res.data.data.totalRAMUsed / res.data.data.maxTotalRAMSize * 100
        }
        this.statisticFloatingIpsData = {
          index: 4,
          totalUsed: res.data.data.totalFloatingIpsUsed,
          maxTotal: res.data.data.maxTotalFloatingIps,
          percent: res.data.data.totalFloatingIpsUsed / res.data.data.maxTotalFloatingIps * 100
        }
        this.statisticSecurityGroupsData = {
          index: 5,
          totalUsed: res.data.data.security_groupUsed,
          maxTotal: res.data.data.security_groupLimit,
          percent: res.data.data.security_groupUsed / res.data.data.security_groupLimit * 100
        }
        this.statisticServerGroupsData = {
          index: 6,
          totalUsed: res.data.data.totalServerGroupsUsed,
          maxTotal: res.data.data.maxServerGroups,
          percent: res.data.data.totalServerGroupsUsed / res.data.data.maxServerGroups * 100
        }
        this.statisticPortData = {
          index: 7,
          totalUsed: res.data.data.portUsed,
          maxTotal: res.data.data.portLimit,
          percent: res.data.data.portUsed / res.data.data.portLimit * 100
        }
        this.statisticNetworkData = {
          index: 8,
          totalUsed: res.data.data.networkUsed,
          maxTotal: res.data.data.networkLimit,
          percent: res.data.data.networkUsed / res.data.data.networkLimit * 100
        }
        this.statisticSubnetData = {
          index: 9,
          totalUsed: res.data.data.subnetUsed,
          maxTotal: res.data.data.subnetLimit,
          percent: res.data.data.subnetUsed / res.data.data.subnetLimit * 100
        }
        this.isShowContent = true
      }).catch(error => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.getKpiFailed'))
      })
    }
  },
  mounted () {
    this.getKpi()
  }
}
</script>
<style lang="less" scoped>
.overview-content{
  width: 1053px;
  height: 570px;
  padding-top: 1px;
  border-radius: 16px;
  background: #2E147C;
  .resource-introduction{
    margin-top: 40px;
    margin-left: 50px;
    .resourcePercentage{
      text-align: center;
      color: #FFFFFF;
      .title-icon-blue{
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 14px;
        background: #40C8A0;
        margin-right: 5px;
        position: relative;
        top: 2px;
        margin-left: 14px;
      }
      .title-icon-yellow{
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 14px;
        background: #FFB74A;
        margin-right: 5px;
        position: relative;
        top: 2px;
        margin-left: 14px;
      }
      .title-icon-red{
        display: inline-block;
        width: 14px;
        height: 14px;
        border-radius: 14px;
        background: #DA572E;
        margin-right: 5px;
        position: relative;
        top: 2px;
        margin-left: 14px;
      }
    }
    .resource-status{
      font-weight: 600;
      margin-left: 10px;
      color: #FFFFFF;
    }
  }
  .resource-content{
    margin-top: 20px;
    margin-left: 60px;
    .resource-row{
      margin-top: 40px;
    }
  }
  .el-select{
    border-radius: 20px;
    color: #FFFFFF;
  }
}
</style>
