<template>
  <div>
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
            fontSize: 8
          },
          detail: {
            show: true,
            fontSize: 13,
            offsetCenter: [0, '60%'],
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
      this.chartDataCpu.rows[0].value = parseFloat((this.kpiInfo.cpuusage.used * 100).toFixed(2))
      this.chartDataMem.rows[0].value = parseFloat((this.kpiInfo.memusage.used * 100).toFixed(2))
      this.chartDataDisk.rows[0].value = isNaN(parseFloat((this.kpiInfo.diskusage.used * 100).toFixed(2))) ? 0 : parseFloat((this.kpiInfo.diskusage.used * 100).toFixed(2))
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
</style>
