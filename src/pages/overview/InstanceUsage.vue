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
      </el-col>
      <el-col
        :span="24"
        class="progerss-item"
        style="height:100%;"
      >
        <div id="memChart" />
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
      cpuData: [
        {
          name: 'CPU',
          value: 0
        }
      ],
      memData: [
        {
          name: 'MEM',
          value: 0
        }
      ]
    }
  },
  watch: {
    kpiInfo: function () {
      this.setData()
    }
  },
  methods: {
    regAndSetOption (id, pieData) {
      var titleArr = []
      var seriesArr = []

      pieData.forEach(function (item, index) {
        titleArr.push({
          text: item.name,
          left: '50%',
          top: '80%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '16',
            color: '#DCE0FF',
            textAlign: 'center'
          }
        })
        seriesArr.push(
          {
            type: 'pie',
            name: '外层细圆环',
            radius: ['72%', '74%'],
            center: ['50%', '40%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: '#9DA3D3'
              }
            },
            label: {
              show: false
            },
            data: [100]
          },
          {
            type: 'pie',
            name: '内层层细圆环',
            radius: ['55%', '57%'],
            center: ['50%', '40%'],
            hoverAnimation: false,
            clockWise: false,
            itemStyle: {
              normal: {
                color: '#9DA3D3'
              }
            },
            label: {
              show: false
            },
            data: [100]
          },
          {
            type: 'pie',
            zlevel: 3,
            silent: true,
            radius: ['48%', '50%'],
            center: ['50%', '40%'],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: dotArr()
          }
        )
      })
      seriesArr.push(
        {
          name: pieData[0].name,
          type: 'pie',
          clockWise: false,
          radius: ['60%', '66%'],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#6E34FA'
                },
                {
                  offset: 1,
                  color: '#5467df'
                }
              ]),
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: ['50%', '40%'],
          data: [
            {
              value: pieData[0].value,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + '%'
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    color: '#FFE898'
                  }
                }
              }
            }
          ]
        }
      )
      if (id === 'cpuChart') {
        let myChart1 = echarts.init(document.getElementById(id))
        myChart1.setOption({
          grid: {
            left: '5%',
            right: '2%',
            bottom: '0%',
            top: '0%',
            containLabel: true
          },
          title: titleArr,
          series: seriesArr
        })
      } else {
        let myChart2 = echarts.init(document.getElementById(id))
        myChart2.setOption({
          grid: {
            left: '5%',
            right: '2%',
            bottom: '0%',
            top: '0%',
            containLabel: true
          },
          title: titleArr,
          series: seriesArr
        })
      }
    },
    setData () {
      this.cpuData[0].value = parseFloat(this.kpiInfo.cpuusage).toFixed(2)
      this.memData[0].value = parseFloat(this.kpiInfo.memusage).toFixed(2)
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

function dotArr () {
  let dataArr = []
  for (var i = 0; i < 80; i++) {
    if (i % 2 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 1,
        itemStyle: {
          normal: {
            color: '#676a6c',
            borderWidth: 1,
            borderColor: '#9DA3D3'
          }
        }
      })
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 2,
        itemStyle: {
          normal: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: 'rgba(0,0,0,0)'
          }
        }
      })
    }
  }
  return dataArr
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
      font-family: HarmonyHeiTi;
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
</style>
