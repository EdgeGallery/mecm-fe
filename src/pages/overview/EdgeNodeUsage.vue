<template>
  <div style="height:100%;">
    <el-row
      :gutter="10"
      style="height:100%;"
    >
      <el-col
        :span="24"
        class="progerss-item"
        style="height:100%;"
      >
        <div id="chart" />
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
      pieData: [
        {
          name: 'CPU',
          value: 0
        },
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
    regAndSetOption (pieData) {
      console.log(pieData)
      let myChart1 = echarts.init(document.getElementById('chart'))
      var titleArr = []
      var seriesArr = []

      pieData.forEach(function (item, index) {
        titleArr.push({
          text: item.name,
          left: index * 50 + 24 + '%',
          top: '85%',
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
            radius: ['78%', '80%'],
            center: [index * 50 + 24 + '%', '40%'],
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
            data: [0]
          },
          {
            type: 'pie',
            name: '内层层细圆环',
            radius: ['47%', '49%'],
            center: [index * 50 + 24 + '%', '40%'],
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
            data: [0]
          },
          {
            type: 'pie',
            zlevel: 3,
            silent: true,
            radius: ['38%', '40%'],
            center: [index * 50 + 24 + '%', '40%'],
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
          radius: ['58%', '68%'],
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
          center: [0 * 50 + 24 + '%', '40%'],
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
                    fontWeight: 'bold',
                    color: '#FFE898'
                  }
                }
              }
            },
            {
              value: 100 - pieData[0].value,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                  color: 'rgba(0,0,0,0)'
                }
              }
            }
          ]
        },
        {
          name: pieData[1].name,
          type: 'pie',
          clockWise: false,
          radius: ['58%', '68%'],
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
          center: [1 * 50 + 24 + '%', '40%'],
          data: [
            {
              value: pieData[1].value,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + '%'
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '14',
                    fontWeight: 'bold',
                    color: '#FFE898'
                  }
                }
              }
            },
            {
              value: 100 - pieData[1].value,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                  color: 'rgba(0,0,0,0)'
                }
              }
            }
          ]
        }
      )
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
    },
    setData () {
      this.pieData[0].value = parseFloat(((this.kpiInfo.cpuusage.used / this.kpiInfo.cpuusage.total) * 100).toFixed(2))
      this.pieData[1].value = parseFloat(((this.kpiInfo.memusage.used / this.kpiInfo.memusage.total) * 100).toFixed(2))
      this.regAndSetOption(this.pieData)
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
  #chart{
    width:100%;
    height:100%;
  }
</style>
