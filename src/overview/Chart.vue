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
        { 'label': 'Total', 'color': '#6b91fa' },
        { 'label': 'Online', 'color': '#67C23A' },
        { 'label': 'Offline', 'color': '#FF3333' }
      ]
    }
  },
  mounted () {
    this.prepareData()
    this.setOptions()
    this.mapChart()
  },
  methods: {
    prepareData () {
      this.alarmData = this.alarmLabel.map((chartD, index) => {
        return {
          name: this.alarmLabel[index].label,
          type: 'bar',
          barWidth: '10%',
          barGap: '100%',
          data: [ this.chartData[this.alarmLabel[index].label] ],
          color: this.alarmLabel[index].color,
          axisLabel: {
            interval: 0,
            rotate: 30
          },
          z: 3,
          label: {
            normal: {
              position: 'right',
              show: true
            }
          }
        }
      })
    },
    setOptions () {
      this.option = {
        tooltip: {
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 40,
          width: '90%',
          bottom: '10%',
          left: 10,
          background: 'trasparent',
          containLabel: true
        },
        xAxis: {
          name: '#',
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30
          }
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
  left: 5%;
  top: 10%;
}
.chart {
  position: relative;
  height: 100%;
  top: 10%;
}
</style>
