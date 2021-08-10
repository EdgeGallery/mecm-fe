<template>
  <div>
    <el-row>
      <el-col
        class="mt20 progerss-item"
      >
        <ve-gauge
          :data="chartDataCpu"
          height="100px"
          :settings="chartSettings"
        />
        <p>CPU</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        class="mt20 progerss-item"
      >
        <ve-gauge
          :data="chartDataMem"
          height="100px"
          :settings="chartSettings"
        />
        <p>MEM</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    kpiInfo: {
      required: true,
      type: Object
    }
  },
  data () {
    this.chartSettings = {
      seriesMap: {
        'Usage': {
          splitNumber: 4,
          radius: '90%',
          min: 0,
          max: 100,
          pointer: {
            show: true,
            width: 3,
            length: '60%',
            color: '#0067d1'
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 8,
              color: [
                [0.3, '#20ea71'],
                [0.7, '#23a7f5'],
                [1, '#f919d3']
              ],
              borderColor: '#000',
              borderWidth: '2'
            }
          },
          splitLine: {
            show: false,
            length: '28%',
            lineStyle: {
              color: '#fff',
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
      this.chartDataCpu.rows[0].value = parseFloat(this.kpiInfo.cpuusage).toFixed(2)
      this.chartDataMem.rows[0].value = parseFloat(this.kpiInfo.memusage).toFixed(2)
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
    margin-top:-5px;
    color: white;
    .el-progress__text {
      color: white;
    }
    p{
      position: relative;
      top:-10px;
      color:#ddd;
      font-size:14px;
    }
  }
</style>
