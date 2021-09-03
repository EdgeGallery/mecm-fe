<template>
  <div class="usageDiv">
    <el-row :gutter="10">
      <el-col
        :span="8"
        class="mt20 progerss-item"
      >
        <ve-gauge
          :data="chartDataCpu"
          height="150px"
          :settings="chartSettings"
        />
        <p>CPU</p>
      </el-col>
      <el-col
        :span="8"
        class="mt20 progerss-item"
      >
        <ve-gauge
          :data="chartDataMem"
          height="150px"
          :settings="chartSettings"
        />
        <p>MEM</p>
      </el-col>
      <el-col
        :span="8"
        class="mt20 progerss-item"
        v-if="kpiInfo.diskusage"
      >
        <ve-gauge
          :data="chartDataDisk"
          height="150px"
          :settings="chartSettings"
        />
        <p>DISK</p>
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
    // var color =
    this.chartSettings = {
      seriesMap: {
        'Usage': {
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
            splitNumber: 7, // 刻度的段落数
            lineStyle: {
              color: '#8254f8',
              width: 1 // 刻度的宽度
            },
            length: 6 // 刻度的长度
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
            show: true,
            distance: 5,
            color: '#fff',
            fontSize: 10
          },
          detail: {
            show: true,
            fontSize: 15,
            offsetCenter: [0, '70%'],
            formatter: '{value}%'
          }
        }
      }
    }
    return {
      chartDataCpu: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      chartDataMem: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      },
      chartDataDisk: {
        columns: ['type', 'value'],
        rows: [
          { type: 'Usage', value: 0 }
        ]
      }
    }
  },
  watch: {
    kpiInfo: function () {
      this.setData()
    }
  },
  methods: {
    setData () {
      this.chartDataCpu.rows[0].value = parseFloat(((this.kpiInfo.cpuusage.used / this.kpiInfo.cpuusage.total) * 100).toFixed(2))
      this.chartDataMem.rows[0].value = parseFloat(((this.kpiInfo.memusage.used / this.kpiInfo.memusage.total) * 100).toFixed(2))
      this.chartDataDisk.rows[0].value = isNaN(parseFloat(((this.kpiInfo.diskusage.used / this.kpiInfo.diskusage.total) * 100).toFixed(2))) ? 0 : parseFloat((this.kpiInfo.diskusage.used * 100).toFixed(2))
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
.usageDiv{
  margin-bottom: 15px;
  .progerss-item {
    text-align: center;
    color: white;
    .el-progress__text {
      color: white;
    }
    p{
      color:#5b4ad1;
      font-size:16px;
    }
  }
}
</style>
