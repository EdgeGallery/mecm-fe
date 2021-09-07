<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div class="mapContainer">
    <div class="content">
      <div
        id="mapChart"
        class="chart"
        v-show="showMainView"
      />
      <div
        id="mapDetailMap"
        class="detailMap"
        v-show="!showMainView"
      />
      <el-button
        type="primary"
        class="return"
        v-if="btnShow"
        @click="returnOverviewModel"
      >
        {{ $t('overview.returnOverview') }}
      </el-button>
    </div>
  </div>
</template>

<script>
import CityMap from '../../assets/js/CityMap'
import { inventory, check } from '../../tools/request.js'
import echarts from 'echarts'

import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OlFeature from 'ol/Feature'
import OlGeomPoint from 'ol/geom/Point'
import OlLayerVector from 'ol/layer/Vector'
import OlSourceVector from 'ol/source/Vector'
import OlCluster from 'ol/source/Cluster'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import XYZ from 'ol/source/XYZ'
import InteractionSelect from 'ol/interaction/Select'

import axios from 'axios'
export default {
  name: 'Map',
  props: {
    detail: {
      required: true,
      type: Object,
      detault: function () {
        return null
      }
    }
  },
  data () {
    return {
      chinaId: 100000,
      chinaName: 'china',
      chinaJson: null,
      nodeData: [],
      continue: true,
      btnShow: false,
      map: null,
      showMainView: true,
      language: localStorage.getItem('language'),
      getNodeTimeout: null,
      nodeStatusList: []
    }
  },
  mounted () {
    this.getNodeStatus()
    this.getNodeTimeout = setTimeout(() => { this.getNodeList() })
    let detailMap = document.getElementById('mapDetailMap')
    detailMap.style.height = window.innerHeight
  },
  watch: {
    detail () {
      let arr = []
      arr.push(this.detail)
      this.showLayers(arr)
      this.$emit('node', this.detail)
    },
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getNodeList()
    }
  },
  beforeDestroy () {
    this.getNodeTimeout = null
    clearInterval(this.getNodeTimeout)
  },
  methods: {
    getNodeList () {
      inventory.getList(2).then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            item.coordinates = item.coordinates.split(',')
            this.nodeStatusList.forEach(val => {
              if (val.checkedIp === item.mechostIp) {
                item.status = val.condition
              }
            })
          })
          this.nodeData = res.data
          this.mapChart('mapChart')
          this.$emit('area', res.data, '')
        }
      }, error => {
        console.log(error)
      })
    },
    getNodeStatus () {
      check.healthCheck().then(res => {
        this.nodeStatusList = res.data
      })
    },
    showLayers (arr) {
      this.showMainView = false
      this.$nextTick(() => {
        this.openlayers(arr)
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
        myChart.on('click', (param) => {
          if (param.componentType === 'markPoint') {
            let arr = []
            arr.push(param.data)
            this.$emit('node', param.data)
            this.showLayers(arr)
          } else {
            if (this.continue) {
              this.mapAreaClick(param, myChart)
            } else {
              this.regAndSetOption(myChart, this.chinaName, this.chinaJson, false)
            }
          }
        })
      })
    },
    mapAreaClick (param, myChart) {
      let cityId = CityMap[param.name]
      let arr = []
      this.nodeData.forEach((val, index) => {
        if (val.city.indexOf(param.data.name) > -1) {
          arr.push(val)
        }
      })
      if (arr.length === 0) {
        this.returnOverviewModel()
      }
      axios
        .get('./map/' + cityId + '.json', {})
        .then(res => {
          this.btnShow = true
          const mapJson1 = res.data
          this.regAndSetOption(
            myChart,
            param.name,
            mapJson1,
            true
          )
          this.$emit('area', arr, param.name)
        }).catch(err => {
          if (arr.length > 0) {
            this.showLayers(arr)
          }
          console.log(err)
        })
    },
    regAndSetOption (myDetailMap, name, mapJson, flag) {
      let data = this.nodeData
      data.forEach(item => {
        item.coord = item.coordinates
      })
      echarts.registerMap(name, mapJson)
      myDetailMap.setOption({
        visualMap: {
          show: false
        },
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: '#000',
            decoration: 'none'
          },
          formatter: function (params) {
            var tipHtml = ''
            let num = 0
            data.forEach(item => {
              if (item.city.indexOf(params.data.name) > -1) {
                num++
              }
            })
            if (localStorage.getItem('language') === 'en') {
              if (params.componentType === 'markPoint') {
                tipHtml = `<div class="showLabelArea">
                            <div class="secondLabel">
                              Node Info
                            </div>
                            <div class="labelContent">
                              <p>Name：${params.data.mechostName}</p>
                              <p>IP：${params.data.mechostIp}</p>
                              <p>Address：${params.data.city}</p>
                            </div>
                          </div>`
              } else {
                tipHtml = `<div class="showLabelArea">
                            <div class="secondLabel">
                              Area Node Info
                            </div>
                            <div class="labelContent">
                              <p>Online：${num}</p>
                              <p>Offline：0</p>
                            </div>
                          </div>`
              }
            } else {
              if (params.componentType === 'markPoint') {
                tipHtml = `<div class="showLabelArea">
                            <div class="secondLabel">
                              节点信息
                            </div>
                            <div class="labelContent">
                              <p>名称：${params.data.mechostName}</p>
                              <p>IP：${params.data.mechostIp}</p>
                              <p>地址：${params.data.city}</p>
                            </div>
                          </div>`
              } else {
                tipHtml = `<div class="showLabelArea">
                            <div class="secondLabel">
                              地域节点信息
                            </div>
                            <div class="labelContent">
                              <p>在线节点：${num}</p>
                              <p>离线节点：0</p>
                            </div>
                          </div>`
              }
            }
            return tipHtml
          }
        },
        series: [
          {
            type: 'map',
            map: name,
            zoom: 1,
            aspectScale: 0.75,
            animationDelayUpdate: 300,
            top: '8%',
            label: {
              normal: {
                show: true,
                color: '#252525',
                fontSize: 12,
                fontFamily: 'HarmonyHeiTi',
                formatter: function (params) {
                  if (localStorage.getItem('language') === 'en') {
                    let pinyin = require('pinyin')
                    let city = pinyin(params.name, { style: pinyin.STYLE_NORMAL }).join('').replace(/^\S/, s => s.toUpperCase())
                    if (params.name === '重庆') {
                      city = 'Chongqing'
                    } else if (params.name === '西藏') {
                      city = 'Xizang'
                    }
                    return city
                  } else {
                    return params.name
                  }
                }
              },
              emphasis: {
                show: true,
                color: '#fff'
              }

            },
            itemStyle: {
              normal: {
                areaColor: '#e7e5ec',
                borderColor: '#000000',
                boxShadow: '10px 20px 30px '
              },
              emphasis: {
                areaColor: '#5d3ec6'
              }
            },
            data: this.initMapData(mapJson),
            markPoint: {
              symbol: 'image://./outer.png',
              symbolSize: [26, 26],
              hoverAnimation: true,
              data: data
            }
          }
        ]
      })
    },
    initMapData (mapJson) {
      let mapData = []
      for (let features of mapJson.features) {
        mapData.push({
          name: features.properties.name
        })
      }
      return mapData
    },
    returnOverviewModel () {
      let myChart = echarts.init(document.getElementById('mapChart'))
      this.regAndSetOption(myChart, this.chinaName, this.chinaJson, false)
      this.showMainView = true
      this.btnShow = false
      this.continue = true
      this.$emit('area', this.nodeData, '')
    },
    openlayers (data) {
      let _this = this
      this.btnShow = true
      if (this.map) {
        this.map.setView(new View({
          projection: 'EPSG:4326',
          center: data[0].coordinates,
          zoom: 16
        }))
      } else {
        this.map = new Map({
          target: 'mapDetailMap',
          layers: [
            new TileLayer({
              source: new XYZ({
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              })

            })
          ],
          view: new View({
            projection: 'EPSG:4326',
            center: data[0].coordinates,
            zoom: 16
          })
        })
      }
      let lnglats = []
      this.nodeData.forEach(item => {
        lnglats.push(item.coordinates)
      })

      // 创建Feature对象集合
      let features = []
      for (let lnglat of lnglats) {
        features.push(
          new OlFeature({
            type: 'icon',
            geometry: new OlGeomPoint(lnglat),
            eventTarget_: data
          })
        )
      }
      var source = new OlSourceVector({
        features: features
      })

      var clusterSource = new OlCluster({
        distance: 0,
        source: source
      })

      var clusters = new OlLayerVector({
        source: clusterSource,
        style: new Style({
          image: new Icon({
            src: './outer.png',
            scale: 0.3
          })
        }),
        zIndex: 999
      })

      this.map.addLayer(clusters)

      this.map.on('click', (e) => {
        // 在点击时获取像素区域
        var pixel = this.map.getEventPixel(e.originalEvent)
        this.map.forEachFeatureAtPixel(pixel, function (feature) {
          data.forEach(item => {
            if (feature.geometryChangeKey_.target.extent_[0] === parseFloat(item.coordinates[0])) {
              _this.$emit('node', item)
            }
          })
        })
      })

      let selectSingleClick = new InteractionSelect({})

      // 监听选中事件，然后在事件处理函数中改变被选中的`feature`的样式
      this.map.addInteraction(selectSingleClick)
      selectSingleClick.on('select', function (event) {
        event.selected[0].setStyle(new Style({
          image: new Icon({
            src: './inner.png',
            scale: 0.3
          })
        }))
      })
    }
  }
}

</script>

<style lang='less' scoped>
.mapContainer{
  height: 100%;
}
.content {
  width: 100%;
  height: 100%;
  .chart,.detailMap {
    height: 100%;
    width: 100%;
    z-index: 99;
    background: #f6f6f6;
    border-radius: 20px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  }
  .return{
    position: relative;
    top: -55px;
    left: 80%;
    z-index: 999;
    background: #000000;
    opacity: 0.4;
    color: #ffff;
    border-radius: 6px;
    width: 125px;
    height: 35px;
    font-size: 16px;
    line-height: 35px;
    padding: 0;
  }
}

</style>
