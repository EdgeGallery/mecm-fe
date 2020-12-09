<template>
  <div>
    <div class="content">
      <div
        id="mapChart"
        class="chart"
      />
      <el-button
        type="primary"
        class="return"
        size="small"
        v-if="btnShow"
        @click="returnOverviewModel"
      >
        返回主视图
      </el-button>
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
      nodeData: [],
      continue: true,
      btnShow: false
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
            obj.address = item.address
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
            if (this.continue) {
              this.mapAreaClick(param, myChart)
            } else {
              this.getNodeList()
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
      this.nodeData = arr
      this.$emit('area', this.nodeData, param.name)
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
        }).catch(err => {
          console.log(err)
          this.continue = false
          var geocoder = new AMap.Geocoder({
            city: ''
          })
          geocoder.getLocation(param.name, (status, result) => {
            if (status === 'complete' && result.geocodes.length) {
              var lnglat = result.geocodes[0].location
              let coord = []
              coord.push(lnglat.R)
              coord.push(lnglat.Q)
              this.mapDetails(coord, this.nodeData)
            } else {
              console.error('failed')
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
    },
    returnOverviewModel () {
      let myChart = echarts.init(document.getElementById('mapChart'))
      this.getNodeList()
      this.regAndSetOption(myChart, this.chinaName, this.chinaJson, false)
      this.btnShow = false
    },
    mapDetails (coord, data) {
      this.btnShow = true
      const _this = this
      this.continue = false
      var map = new AMap.Map('mapChart', {
        zoom: 12,
        center: coord,
        viewMode: '3D',
        mapStyle: 'amap://styles/macaron'
      })
      let markers = []
      data.forEach(item => {
        let marker = new AMap.Marker({
          position: item.coord,
          icon: './cloudEdge.svg',
          title: item.ip,
          extData: item
        })
        markers.push(marker)
      })

      map.add(markers)

      for (let i = 0; i < markers.length; i++) {
        AMap.event.addListener(markers[i], 'click', function () {
          _this.$emit('node', markers[i].getExtData())
        })
      }
    }
  }
}

</script>

<style lang='less' scoped>
.content {
  width: 98%;
  height: 90vh;
  .chart,.chart1 {
    position: relative;
    height: 90%;
    top: 7%;
    left:2%
  }
  .return{
    position: absolute;
    top:10px;
    right:0;
  }
}
</style>
