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
  <div style="height:100%;">
    <el-row
      :gutter="10"
      style="height:60%;"
    >
      <el-col
        :span="24"
        class="progerss-item"
        style="height:100%;"
      >
        <div id="cpuChart" />
        <div class="chartName">
          CPU
        </div>
      </el-col>
      <el-col
        :span="24"
        class="progerss-item"
        style="height:100%;"
      >
        <div id="memChart" />
        <div class="chartName">
          MEM
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    kpiInfo: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      cpuData: {
        name: 'CPU',
        value: 0
      },
      memData: {
        name: 'MEM',
        value: 0
      }

    }
  },
  watch: {
    kpiInfo: function () {
      this.setData()
    }
  },
  methods: {
    regAndSetOption (id, data) {
      let seriesArr = [
        {
          type: 'gauge',
          radius: '98%',
          min: 0,
          max: 100,
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: [
                [1, '#8254f8']
              ]
            }
          },
          axisTick: {
            show: true,
            splitNumber: 5,
            lineStyle: {
              color: '#ffffff',
              width: 2
            },
            length: 1
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          pointer: {
            show: false
          },
          detail: {
            show: false
          }
        },
        {
          type: 'gauge',
          splitNumber: 4,
          radius: '90%',
          min: 0,
          max: 100,
          pointer: {
            show: true,
            width: 5,
            length: '60%'
          },
          axisTick: {
            show: true,
            splitNumber: 7,
            lineStyle: {
              color: '#8254f8',
              width: 1
            },
            length: 6
          },
          axisLine: {
            lineStyle: {
              width: 10,
              color: [[1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#61caa6'
              },

              {
                offset: 0.62,
                color: '#fcb35d'
              },

              {
                offset: 1,
                color: '#da2d2d'
              }
              ])]],
              borderColor: '#8254f8',
              borderWidth: '2'
            }
          },
          splitLine: {
            show: true,
            length: '28%',
            lineStyle: {
              color: '#8254f8',
              width: 2
            }
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: true,
            fontSize: 15,
            color: '#ffffff',
            offsetCenter: [0, '70%'],
            formatter: '{value}%'
          },
          data: [{
            value: data.value
          }]
        }
      ]
      let myChart1 = echarts.init(document.getElementById(id))
      myChart1.setOption({
        series: seriesArr
      })
      let myChart2 = echarts.init(document.getElementById(id))
      myChart2.setOption({
        series: seriesArr
      })
    },
    setData () {
      this.cpuData.value = parseFloat(this.kpiInfo.cpuusage).toFixed(2)
      this.memData.value = parseFloat(this.kpiInfo.memusage).toFixed(2)
      this.regAndSetOption('cpuChart', this.cpuData)
      this.regAndSetOption('memChart', this.memData)
    }
  },
  mounted () {
    if (JSON.stringify(this.kpiInfo) !== '{}') {
      this.setData()
    }
  }
}
</script>
<style lang='less' scoped>
  .progerss-item {
    text-align: center;
    color: white;
    .el-progress__text {
      color: white;
    }
    p{
      position: relative;
      top:0px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      color: #DCE0FF;
    }
  }
  #cpuChart{
    width:100%;
    height:100%;
  }
  #memChart{
    width:100%;
    height:100%;
  }
  .chartName{
    color: #000000;
    height: 30px;
    line-height: 30px;
    position: relative;
    top: -17%;
  }
</style>
