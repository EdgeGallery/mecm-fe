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
import { edge } from '../tools/request'
import codeToText from '../tools/codetotext'
import echarts from 'echarts'
import axios from 'axios'

let myChart = null

export default {
  name: 'ChinaMap',
  mounted: function () {
    // this.getNodeList()
    this.mapChart('mapChart')
  },
  data () {
    return {
      chinaId: 100000,
      chinaName: 'china',
      chinaJson: null,
      mapStack: [],
      parentId: null,
      parentName: null,
      nodeData: []
    }
  },
  methods: {
    async getNodeList () {
      await edge.getNodeList().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            let obj = {}
            obj.coord = codeToText(item.city)
            obj.ip = item.ip
            this.geoCode(obj)
          })
        }
      })
    },
    geoCode (obj) {
      // var geocoder = new AMap.Geocoder({
      //   city: ''
      // })
      // geocoder.getLocation(obj.coord, function (status, result) {
      //   if (status === 'complete' && result.geocodes.length) {
      //     var lnglat = result.geocodes[0].location
      //     let coord = []
      //     coord.push(lnglat.Q)
      //     coord.push(lnglat.R)
      //     obj.coord = coord
      //     // this.nodeData.push(obj)
      //   } else {
      //     console.error('failed')
      //   }
      // })
    },
    back () {
      if (this.mapStack.length !== 0) {
        let map = this.mapStack.pop()
        axios
          .get('./map/' + map.mapId + '.json', {})
          .then(response => {
            const mapJson = response.data
            this.this.registerAndsetOption(
              myChart,
              map.mapId,
              map.mapName,
              mapJson,
              false
            )
            this.parentId = map.mapId
            this.parentName = map.mapName
          })
      }
    },
    mapChart (divid) {
      axios.get('./map/' + this.chinaId + '.json', {}).then(response => {
        const mapJson = response.data
        this.chinaJson = mapJson
        myChart = echarts.init(document.getElementById(divid))
        this.registerAndsetOption(myChart, this.chinaId, this.chinaName, mapJson, false)
        this.parentId = this.chinaId
        this.parentName = 'china'
        myChart.on('click', param => {
          let cityId = CityMap[param.name]
          if (cityId) {
            axios
              .get('./map/' + cityId + '.json', {})
              .then(res => {
                const mapJson1 = res.data
                this.registerAndsetOption(
                  myChart,
                  cityId,
                  param.name,
                  mapJson1,
                  true
                )
              })
          } else {
            this.registerAndsetOption(myChart, this.chinaId, this.chinaName, this.chinaJson, false)
            this.mapStack = []
            this.parentId = this.chinaId
            this.parentName = this.chinaName
          }
        })
      })
    },
    registerAndsetOption (myChart1, id, name, mapJson, flag) {
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
            color: ['#42a8be', '#00a69c', '#95ea95']
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
            data: setTimeout(() => {
              this.initMapData(mapJson)
            }, 1000),
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
              data: [
                {
                  coord: [],
                  name: 'abc'
                }
              ]
            }
          }
        ]
      })
      if (flag) {
        this.mapStack.push({
          mapId: this.parentId,
          mapName: this.parentName
        })
        this.parentId = id
        this.parentName = name
      }
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
