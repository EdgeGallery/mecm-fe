<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div style="height:100%;">
    <div class="content">
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
import CityMap from '../assets/js/CityMap'
import { edge } from '../tools/request'
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
// import Fill from 'ol/style/Fill'
// import Stroke from 'ol/style/Stroke'
import XYZ from 'ol/source/XYZ'
import InteractionSelect from 'ol/interaction/Select'

import axios from 'axios'
export default {
  name: 'Map',
  data () {
    return {
      chinaId: 100000,
      chinaName: 'china',
      chinaJson: null,
      nodeData: [],
      continue: true,
      btnShow: false,
      map: null,
      showMainView: true
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
            item.coordinates = item.coordinates.split(',')
          })
          this.nodeData = res.data
          this.mapChart('mapChart')
          if (this.$i18n.locale === 'en') {
            this.$emit('area', res.data, 'All')
          } else {
            this.$emit('area', res.data, '全国')
          }
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
            console.log(param)
            this.$emit('node', param.data)
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
            if (params.componentType === 'markPoint') {
              tipHtml = '<div style="width:310px;height:150px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' + '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' + '</i>' +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' + '节点信息' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '节点名称：' + '<span style="color:#11ee7d;margin:0 6px;">' + params.data.mechostName + '</span>' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '节点IP：' + '<span style="color:#f48225;margin:0 6px;">' + params.data.mechostIp + '</span>' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '节点地址：' + '<span style="color:#f4e925;margin:0 6px;">' + params.data.city + '</span>' + '</p>' +
              '</div>' + '</div>'
            } else {
              let num = 0
              data.forEach(item => {
                if (item.city.indexOf(params.data.name) > -1) {
                  num++
                }
              })
              tipHtml = '<div style="width:240px;height:130px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' + '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' + '</i>' +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' + '地域节点信息' + '</span>' + '</div>' +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '在线节点：' + '<span style="color:#11ee7d;margin:0 6px;">' + num + '</span>' + '个' + '</p>' +
              '<p style="color:#fff;font-size:12px;">' + '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' + '</i>' +
              '离线节点：' + '<span style="color:#f48225;margin:0 6px;">' + 0 + '</span>' + '个' + '</p>' +
              '</div>' + '</div>'
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
                fontSize: 14
              },
              emphasis: {
                show: true,
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                // 常规
                areaColor: '#013C62',
                borderColor: '#2ab8ff'
                // 立体
                // borderColor: '#2cb3dd',
                // borderWidth: 0.8,
                // areaColor: {
                //   type: 'linear-gradient',
                //   x: 1000,
                //   y: 600,
                //   x2: 1000,
                //   y2: 0,
                //   colorStops: [{
                //     offset: 0,
                //     color: '#274d68' // 0% 处的颜色
                //   }, {
                //     offset: 1,
                //     color: '#09132c' // 50% 处的颜色
                //   }],
                //   global: true // 缺省为 false
                // }
                // 炫酷

              },
              emphasis: {
                areaColor: '#5c6ff3'
              }
            },
            data: this.initMapData(mapJson),
            markPoint: {
              symbol: 'image://./w.png',
              symbolSize: [26, 26],
              data: data
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
          center: data[0].coord,
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
                // 午夜蓝图
                // url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
              })

            })
          ],
          view: new View({
            projection: 'EPSG:4326',
            center: data[0].coord,
            zoom: 16
          })
        })
      }
      let lnglats = []
      this.nodeData.forEach(item => {
        lnglats.push(item.coordinates)
      })

      // 创建Feature对象集合
      var features = []
      for (var i = 0; i < lnglats.length; i++) {
        features.push(
          new OlFeature({
            type: 'icon',
            geometry: new OlGeomPoint(lnglats[i]),
            eventTarget_: data,
            style: './style.json'
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
            src: './w.png',
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
            src: './ww.png',
            scale: 0.3
          })
        }))
      })
    }
  }
}

</script>

<style lang='less' scoped>
.content {
  width: 100%;
  height: 100%;
  .chart,.chart1 {
    height: 100%;
  }
  .return{
    position: absolute !important;
    top:15px !important;
    left:27% !important;
  }
}
</style>
