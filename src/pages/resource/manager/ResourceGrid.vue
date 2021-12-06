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
  <div class="resource-grid">
    <div :class="language==='cn'?'grid-chart': 'grid-chart-en'">
      <el-progress
        type="circle"
        :stroke-width="12"
        :width="80"
        :percentage="showPercent"
        :color="showPercent>=80?'#DA572E':showPercent>=50?'#FFB74A':'#40C8A0'"
      />
    </div>
    <div :class="language==='cn'?'gird-statistic': 'gird-statistic-en'">
      <div :class="language==='cn'?'statistic-div': 'statistic-div-en'">
        <span class="statistic-detail">
          {{
            statisticData.index===1?$t('resourceMgr.vmAmount'):
            statisticData.index===2?$t('resourceMgr.vcpuAmount'):
            statisticData.index===3?$t('resourceMgr.ramAmount'):
            statisticData.index===4?$t('resourceMgr.floatIpAmount'):
            statisticData.index===5?$t('resourceMgr.securityGroupAmount'):
            statisticData.index===6?$t('resourceMgr.serverGroupAmount'):
            "unknow"
          }}: {{ statisticData.totalUsed }}</span>
      </div>
      <div :class="language==='cn'?'statistic-div': 'statistic-div-en'">
        <span class="statistic-detail">{{ $t('resourceMgr.total') }}: {{ statisticData.maxTotal===-1?$t('resourceMgr.noLimit'):statisticData.maxTotal }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    statisticData: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      language: localStorage.getItem('language'),
      showPercent: 0
    }
  },
  methods: {

  },
  mounted () {
    this.showPercent = Math.round(this.statisticData.percent)
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less" scoped>
.resource-grid{
  width: 258px;
  height: 112px;
  border: 1px solid #7A6E8A;
  border-radius: 15px;
  display: flex;
  .grid-chart{
    margin-top: 16px;
    margin-left: 30px;
  }
  .gird-statistic{
    margin-top: 30px;
    margin-left: 25px;
    .statistic-div{
      padding: 3px;
      .statistic-detail{
        color: #1F1348;
      }
    }
  }
  .grid-chart-en{
    margin-top: 16px;
    margin-left: 15px;
  }
  .gird-statistic-en{
    margin-top: 30px;
    margin-left: 10px;
    .statistic-div-en{
      padding: 3px;
      .statistic-detail{
        color: #1F1348;
      }
    }
  }
}
</style>
