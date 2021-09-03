<template>
  <div style="height:100%;">
    <div class="secondLabel">
      {{ $t('overview.monitor') }}
      <span
        class="popoverClose"
        @click="close()"
      >×</span>
    </div>
    <el-row
      :gutter="10"
      style="height:100%;"
    >
      <el-col
        :span="12"
        class="progerss-item"
      >
        <ve-gauge
          :data="chartDataCpu"
          height="150px"
          :settings="chartSettings"
        />
        <p>CPU</p>
      </el-col>
      <el-col
        :span="12"
        class="progerss-item"
      >
        <ve-gauge
          :data="chartDataMem"
          height="150px"
          :settings="chartSettings"
        />
        <p>MEM</p>
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
    },
    close () {
      this.$emit('closePopover', 'close')
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
      color: #5b4ad1;
    }
  }
  #chart{
    width:100%;
    height:100%;
  }
</style>
