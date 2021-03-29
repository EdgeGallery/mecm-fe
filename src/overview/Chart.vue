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
    <div class="box">
      <div
        id="barChart"
        class="chart"
      />
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'

let myChart1
export default {
  name: 'BarChart',
  props: {
    chartData: {
      type: Object,
      default: function () {
        return []
      }
    }
  },
  watch: {
    chartData: function (newVal, oldVal) {
      this.prepareData()
      this.setOptions()
      this.mapChart()
    }
  },
  data () {
    return {
      myChart1: null,
      option: null,
      alarmData: [],
      alarmLabel: [
        { 'label': 'Online', 'color': '#67C23A' },
        { 'label': 'Offline', 'color': '#FF3333' }
      ]
    }
  },
  mounted () {
    this.prepareData()
    this.setOptions()
    this.mapChart()
    let self = this
    this.echartInstance = echarts.init(document.getElementById('barChart'))
    window.addEventListener('resize', function () {
      self.echartInstance.resize()
    })
  },
  methods: {
    prepareData () {
      this.alarmData = this.alarmLabel.map((chartD, index) => {
        return {
          name: this.alarmLabel[index].label,
          type: 'bar',
          barWidth: '10%',
          data: [ this.chartData[this.alarmLabel[index].label] ],
          color: this.alarmLabel[index].color,
          z: 3
        }
      })
    },
    setOptions () {
      this.option = {
        type: 'bar',
        xAxis: {
          name: 'status',
          type: 'category',
          splitLine: {
            show: false
          },
          nameLocation: 'end',
          nameGap: 3
        },
        yAxis: {
          name: 'Num',
          splitLine: {
            show: false
          },
          minInterval: 1
        },
        legend: {
          data: this.alarmLabel.map(data => {
            return data.label
          })
        },
        series: this.alarmData
      }
    },
    mapChart () {
      myChart1 = echarts.init(document.getElementById('barChart'), 'dark')
      myChart1.setOption(this.option, true)
    }
  }
}
</script>
<style scoped>
.box {
  width: 100%;
  height: 25vh;
}
.chart {
  position: relative;
  height: 100%;
}
</style>
