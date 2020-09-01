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
import CityMap from '../assets/js/china-map.js'
import echarts from 'echarts'
import axios from 'axios'

let chinaId = 100000
let chinaName = 'china'
let chinaJson = null

let mapStack = []
let parentId = null
let parentName = null

let myChart = null
export default {
  name: 'ChinaMap',
  props: {
  },
  mounted: function () {
    this.mapChart('mapChart')
  },
  methods: {
    back () {
      if (mapStack.length !== 0) {
        console.log(1)
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
      axios.get('./map/' + chinaId + '.json', {}).then(response => {
        const mapJson = response.data
        chinaJson = mapJson
        myChart = echarts.init(document.getElementById(divid))
        registerAndsetOption(myChart, chinaId, chinaName, mapJson, false)
        parentId = chinaId
        parentName = 'china'
        myChart.on('click', function (param) {
          let cityId = CityMap[param.name]
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
          } else {
            registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false)
            mapStack = []
            parentId = chinaId
            parentName = chinaName
          }
        })
      })
    }
  }
}
function registerAndsetOption (myChart1, id, name, mapJson, flag) {
  console.log(id)
  echarts.registerMap(name, mapJson)
  myChart1.setOption({
    visualMap: {
      show: false, // 色系条是否显示
      min: 0,
      max: 45000, // 取其区间值就代表色系inRange中的一种颜色
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
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
          data: [
            {
              name: '广东温氏食品集团有限公司',
              coord: [112.10, 22.05]
            }, {
              name: '广东南宝集团有限公司',
              coord: [113.24, 22.84]
            }, {
              name: '双胞胎(集团)股份有限公司',
              coord: [115.89, 28.36]
            }, {
              name: '江西正邦科技股份有限公司',
              coord: [115.20, 26.295]
            }, {
              name: '中粮粮油有限公司饲料部',
              coord: [116.37, 39.83]
            }, {
              name: '四川特驱投资集团有限公司',
              coord: [104.32, 31.50]
            }, {
              name: '唐人神集团股份有限公司',
              coord: [113.42, 27.20]
            }, {
              name: '湖南九鼎科技(集团)有限公司',
              coord: [110.42, 28.16]
            }, {
              name: '湖南正虹科技发展股份有限公司',
              coord: [112.32, 26.53]
            }, {
              name: '广西壮族自治区扬翔饲料有限公司',
              coord: [109.43, 23.089]
            }, {
              name: '漓源饲料有限公司',
              coord: [108.58, 22.93]
            }, {
              name: '四川铁骑力士集团',
              coord: [103.53, 33.46]
            }, {
              name: '广东海大集团股份有限公司',
              coord: [113.17, 23.08]
            }, {
              name: '新希望六和股份有限公司',
              coord: [104.45, 32.42]
            }, {
              name: '东方希望集团有限公司',
              coord: [121.50, 30.55]
            }, {
              name: '通威股份有限公司',
              coord: [105.30, 31.5]
            }, {
              name: '辽宁大成农牧实业有限公司',
              coord: [125.48, 42.56]
            }, {
              name: '山东亚太中慧集团有限公司',
              coord: [120.30, 35.52]
            }, {
              name: '正大(中国)投资有限公司',
              coord: [117.1, 40.5]
            }, {
              name: '大北农集团',
              coord: [116.40, 40.02]
            }
          ]
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
