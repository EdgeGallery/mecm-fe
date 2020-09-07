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
import echarts from 'echarts'
import axios from 'axios'

let myChart
export default {
  name: 'ChinaMap',
  data () {
    return {
      chinaId: 100000,
      chinaName: 'china',
      chinaJson: null,
      mapStack: [],
      parentId: null,
      parentName: null,
      nodeData: [],
      myChart: null
    }
  },
  mounted () {
    this.mapChart('mapChart')
  },
  methods: {
    mapChart (divid) {
      axios.get('./map/' + this.chinaId + '.json', {}).then(response => {
        const mapJson = response.data
        this.chinaJson = mapJson
        myChart = echarts.init(document.getElementById('mapChart'))
        this.registerAndsetOption(myChart, this.chinaId, this.chinaName, this.chinaJson, false)
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
      this.setOption(myChart1, mapJson)
      if (flag) {
        this.mapStack.push({
          mapId: this.parentId,
          mapName: this.parentName
        })
        this.parentId = id
        this.parentName = name
      }
    },
    setOption (myChart1, mapJson) {
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
</style>
