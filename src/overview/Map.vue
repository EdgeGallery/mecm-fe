<template>
  <div>
    <div class="content">
      <div
        id="mapChart"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
import CityMap from '../assets/js/CityMap'
import { edge } from '../tools/request'
import echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'Map',
  data () {
    return {
      chinaId: 100000,
      chinaName: 'china',
      chinaJson: null,
      nodeData: []
    }
  },
  mounted () {
    this.getNodeList()
  },
  methods: {
    getNodeList () {
      edge.getNodeList().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            let obj = {}
            obj.coord = item.city.split('/').join('')
            obj.ip = item.mechostIp
            obj.city = item.city
            obj.name = item.mechostName
            this.geoCode(obj)
          })
          this.$emit('area', res.data, '全国')
        }
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.nodeData = []
          this.mapChart('mapChart')
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    geoCode (obj) {
      var geocoder = new AMap.Geocoder({
        city: ''
      })
      geocoder.getLocation(obj.coord, (status, result) => {
        if (status === 'complete' && result.geocodes.length) {
          var lnglat = result.geocodes[0].location
          let coord = []
          coord.push(lnglat.R)
          coord.push(lnglat.Q)
          obj.coord = coord
          this.nodeData.push(obj)
          this.mapChart('mapChart')
        } else {
          console.error('failed')
        }
      })
    },
    mapChart (divid) {
      axios.get('./map/' + this.chinaId + '.json', {}).then(response => {
        const mapJson = response.data
        this.chinaJson = mapJson
        let myChart = echarts.init(document.getElementById(divid))
        window.onresize = function () {
          myChart.resize()
        }
        this.regAndSetOption(myChart, this.chinaName, mapJson, false)
        // 防止重复点击
        if (myChart._$handlers.click) {
          myChart._$handlers.click.length = 0
        }
        myChart.on('click', (param) => {
          if (param.componentType === 'markPoint') {
            this.$emit('node', param.data)
          } else {
            let cityId = CityMap[param.name]
            let arr = []
            this.nodeData.forEach((val, index) => {
              if (val.city.indexOf(param.data.name) > -1) {
                arr.push(val)
              }
            })
            this.nodeData = arr
            this.$emit('area', this.nodeData, param.name)
            if (cityId && cityId !== '460200') {
              axios
                .get('./map/' + cityId + '.json', {})
                .then(res => {
                  const mapJson1 = res.data
                  this.regAndSetOption(
                    myChart,
                    param.name,
                    mapJson1,
                    true
                  )
                })
            } else {
              this.getNodeList()
              this.regAndSetOption(myChart, this.chinaName, this.chinaJson, false)
            }
          }
        })
      })
    },
    regAndSetOption (myChart1, name, mapJson, flag) {
      echarts.registerMap(name, mapJson)
      myChart1.setOption({
        visualMap: {
          show: false
        },
        series: [
          {
            type: 'map',
            map: name,
            zoom: 1.2,
            aspectScale: 0.75,
            label: {
              normal: {
                show: true,
                color: '#eee'
              },
              emphasis: {
                show: true,
                color: '#eee'
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#6077BB',
                borderColor: '#9BB6FF',
                borderWidth: 1
              },
              emphasis: {
                areaColor: '#7299FF',
                color: '#eee'
              }
            },
            regions: [],
            data: this.initMapData(mapJson),
            markPoint: {
              symbol: 'pin',
              symbolSize: [20, 20],
              hoverable: false,
              roam: true,
              itemStyle: {
                normal: {
                  color: '#06EB00'
                }
              },
              effect: {
                show: true,
                shadowBlur: 0
              },
              data: this.nodeData
            }
          }
        ]
      })
    },
    initMapData (mapJson) {
      let mapData = []
      for (let i = 0; i < mapJson.features.length; i++) {
        mapData.push({
          name: mapJson.features[i].properties.name
        })
      }
      return mapData
    }
  }
}

</script>

<style lang='less' scoped>
.content {
  width: 90%;
  height: 80vh;
  left: 5%;
  top: 10%;
  .chart {
    position: relative;
    height: 90%;
    top: 10%;
  }
}
</style>
