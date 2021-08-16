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
      <h3
        class="mapTxt"
        v-show="showMainView"
      >
        {{ $t('overview.distributionDisplay') }}
      </h3>
      <div
        id="mapChart"
        class="chart"
        v-show="showMainView"
      />
      <div
        id="mapChart1"
        class="chart1"
        v-show="!showMainView"
      />
      <el-button
        type="primary"
        class="return"
        size="small"
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
import { inventory } from '../../tools/request.js'
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
      language: localStorage.getItem('language')
    }
  },
  mounted () {
    this.getNodeList()
  },
  watch: {
    detail () {
      let arr = []
      arr.push(this.detail)
      console.log(arr)
      this.showLayers(arr)
      this.$emit('node', this.detail)
    },
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getNodeList()
    }
  },
  methods: {
    getNodeList () {
      inventory.getList(2).then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach((item, index) => {
            item.coordinates = item.coordinates.split(',')
          })
          this.nodeData = res.data
          this.mapChart('mapChart')
          this.$emit('area', res.data, '')
        }
      }, error => {
        console.log(error)
      })
    },
    showLayers (arr) {
      console.log(arr)
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
    regAndSetOption (myChart1, name, mapJson, flag) {
      let data = this.nodeData
      data.forEach(item => {
        item.coord = item.coordinates
      })
      echarts.registerMap(name, mapJson)
      myChart1.setOption({
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
                tipHtml = '<div class="div1">' +
              '<div class="div2">' + '<i class="span1">' + '</i>' +
              '<span class="span2">' + 'Node Information' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              'Node Name：' + '<span class="span7">' + params.data.mechostName + '</span>' + '</p>' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              'Node IP：' + '<span class="span9">' + params.data.mechostIp + '</span>' + '</p>' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              'Node Location：' + '<span class="span10">' + params.data.city + '</span>' + '</p>' +
              '</div>' + '</div>'
              } else {
                tipHtml = '<div class="div3">' +
              '<div class="div4">' + '<i class=="span6">' + '</i>' +
              '<span class="span8">' + 'Area Node Info' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              'Online Node：' + '<span class="span7">' + num + '</span>' + '个' + '</p>' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              'Offline Node：' + '<span class="span9">' + 0 + '</span>' + '个' + '</p>' +
              '</div>' + '</div>'
              }
            } else {
              if (params.componentType === 'markPoint') {
                tipHtml = '<div class="div5">' +
              '<div class="div6">' + '<i class="i1">' + '</i>' +
              '<span class="span8">' + '节点信息' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              '节点名称：' + '<span class="span7">' + params.data.mechostName + '</span>' + '</p>' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              '节点IP：' + '<span class="span9">' + params.data.mechostIp + '</span>' + '</p>' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              '节点地址：' + '<span class="span10">' + params.data.city + '</span>' + '</p>' +
              '</div>' + '</div>'
              } else {
                tipHtml = '<div class="div7">' +
              '<div class="div6">' + '<i class="i1">' + '</i>' +
              '<span class="span8">' + '地域节点信息' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              '在线节点：' + '<span class="span7">' + num + '</span>' + '个' + '</p>' +
              '<p class="p1">' + '<i class="span3">' + '</i>' +
              '离线节点：' + '<span class="span9">' + 0 + '</span>' + '个' + '</p>' +
              '</div>' + '</div>'
              }
            }
            return tipHtml
          }
        },
        series: [
          {
            type: 'map',
            map: name,
            zoom: 1.2,
            aspectScale: 0.75,
            animationDelayUpdate: 300,
            label: {
              normal: {
                show: true,
                color: '#fff',
                fontSize: 12,
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
                // 常规
                areaColor: '#122045',
                borderColor: '#2ab8ff',
                boxShadow: '10px 20px 30px '
              },
              emphasis: {
                areaColor: '#5c4dfe'
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
          target: 'mapChart1',
          layers: [
            new TileLayer({
              source: new XYZ({
                // openstreet
                url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                // 高德地图
                // url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
                // url: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0'
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .chart,.chart1 {
    height: 85%;
    width: 85%;
    margin: 0%;
    z-index: 99;
    background: #2d325a;
    border-radius: 5%;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  }
  .mapTxt{
    position: relative;
    top: -10px;
    color: white;
    text-align: left;
    width: 85%;
    padding: 10px;
    font-size: 20px;
  }
  .return{
    position: absolute !important;
    top:42px !important;
    left:43% !important;
  }
}

</style>
