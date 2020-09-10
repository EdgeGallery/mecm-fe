<template>
  <div>
    <div class="box">
      <div
        id="mapChart"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
import CityMap from '../assets/js/CityMap'
import { overview, edge } from '../tools/request'
import echarts from 'echarts'
import axios from 'axios'

let chinaId = 100000
let chinaName = 'china'
let chinaJson = null

let mapStack = []
let parentId = null
let parentName = null
let nodeData = []
let myChart = null
export default {
  name: 'ChinaMap',
  data () {
    return {
      // one: 1
    }
  },
  // watch: {
  //   one () {
  //     console.log(this.one)
  //     this.$emit('ipdata', nodeData)
  //   }
  // },
  mounted () {
    this.getNodeList()
  },
  methods: {
    async getNodeList () {
      await edge.getNodeList().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            let obj = {}
            obj.coord = item.city.split('/').join('')
            obj.ip = item.ip
            this.geoCode(obj)
          })
        }
      }, error => {
        if (error.response.status === '404' && error.response.detail === 'Record not found') {
          nodeData = []
          this.mapChart('mapChart')
        } else {
          this.$message.error(error.response.detail)
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
          nodeData.push(obj)
          this.mapChart('mapChart')
        } else {
          console.error('failed')
        }
      })
    },
    back () {
      if (mapStack.length !== 0) {
        let map = mapStack.pop()
        axios
          .get('./map/' + map.mapId + '.json', {})
          .then(response => {
            const mapJson = response.data
            registerAndsetOption(
              myChart,
              map.mapId,
              map.mapName,
              mapJson,
              false
            )
            parentId = map.mapId
            parentName = map.mapName
          })
      }
    },
    mapChart (divid) {
      const self = this
      axios.get('./map/' + chinaId + '.json', {}).then(response => {
        const mapJson = response.data
        chinaJson = mapJson
        myChart = echarts.init(document.getElementById(divid))
        window.onresize = function () {
          myChart.resize()
        }
        registerAndsetOption(myChart, chinaId, chinaName, mapJson, false)
        parentId = chinaId
        parentName = 'china'
        self.getChart(chinaId)
        myChart.on('click', (param) => {
          if (param.componentType === 'markPoint') {
            // this.one++
            this.$emit('node', param.data.ip)
          } else {
            let cityId = CityMap[param.name]
            this.$emit('area', param.data.name)
            if (cityId) {
              axios
                .get('./map/' + cityId + '.json', {})
                .then(res => {
                  const mapJson1 = res.data
                  registerAndsetOption(
                    myChart,
                    cityId,
                    param.name,
                    mapJson1,
                    true
                  )
                })
              self.getChart(cityId)
            } else {
              registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false)
              mapStack = []
              parentId = chinaId
              parentName = chinaName
              self.getChart(chinaId)
            }
          }
        })
      })
    },
    getChart (id) {
      let chartData = {}
      overview.getChart().then(res => {
        if (res.data[id]) {
          chartData = res.data[id]
        }
        this.$root.$emit('refreshChart', chartData)
      }).catch(() => {
        console.log('Failed to get chart data')
      })
    }
  }
}
function registerAndsetOption (myChart1, id, name, mapJson, flag) {
  echarts.registerMap(name, mapJson)
  myChart1.setOption({
    visualMap: {
      show: false,
      min: 0,
      max: 45000,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#42a8be', '#00a69c', '#95ea95'] // 上色范围
      }
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
        data: initMapData(mapJson),
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
          data: nodeData
        }
      }
    ]
  })
  if (flag) {
    mapStack.push({
      mapId: parentId,
      mapName: parentName
    })
    parentId = id
    parentName = name
  }
}

function initMapData (mapJson) {
  let mapData = []
  for (let i = 0; i < mapJson.features.length; i++) {
    mapData.push({
      name: mapJson.features[i].properties.name
    })
  }
  return mapData
}
</script>

<style scoped>
.title {
  width: 100%;
  height: 10vh;
  text-align: center;
  color: #fff;
  font-size: 2em;
  line-height: 10vh;
}
.box {
  width: 90%;
  height: 80vh;
  left: 5%;
  top: 10%;
}

.chart {
  position: relative;
  height: 90%;
  top: 10%;
}
.backBtn {
  position: absolute;
  top: 0;
  background-color: #00c298;
  border: 0;
  color: #fff;
  height: 27px;
  font-family: Microsoft Yahei,sans-serif;
  font-size: 1em;
  cursor: pointer;
}
.myBlog {
  position: absolute;
  top: 2px;
  right: 5%;
  display: block;
  border: 2px solid #262a53;
}
.myBlog a {
  text-decoration: none;
  display: inline-block;
  color: #fff;
  padding: 5px;
  font-size: 1em;
}

.myBlog a img {
  vertical-align: middle;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin: -5px 5px auto auto;
}
.bottom {
  position: absolute;
  width: 100%;
  height: 5%;
  line-height: 100%;
  left: 0;
  bottom: 0%;
  text-align: center;
}
</style>
