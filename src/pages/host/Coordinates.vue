<template>
  <div
    class="coord"
  >
    <el-row style="width: 100%;height: 100%">
      <el-col
        :span="18"
        style="height: 100%"
      >
        <div
          class="map-content"
          id="map"
        />
      </el-col>
      <el-col :span="6">
        <div class="operation-content">
          <div>
            <label for="long">{{ $t('system.edgeNodes.long') }}</label>
            <el-input v-model="long" />
          </div>
          <div>
            <label for="lat">{{ $t('system.edgeNodes.lat') }}</label>
            <el-input v-model="lat" />
          </div>
          <div
            class="btn-group"
            style="margin-top:15px;text-align:center;"
          >
            <el-button
              @click="confirm"
              type="primary"
              plain
            >
              {{ $t('common.confirm') }}
            </el-button>
            <el-button
              @click="close"
              type="primary"
              plain
            >
              {{ $t('common.cancel') }}
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
export default {
  data () {
    return {
      long: '',
      lat: ''
    }
  },
  mounted () {
    this.openlayers()
  },
  methods: {
    confirm () {
      this.$emit('confirmCoord', this.long + ',' + this.lat)
    },
    close () {
      this.$emit('confirmCoord')
    },
    openlayers (data) {
      this.btnShow = true
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })

          })
        ],
        view: new View({
          projection: 'EPSG:4326',
          center: ['108.6911', '34.28637'],
          zoom: 4
        })
      })
      this.map.on('click', (e) => {
        let coord = e.coordinate
        this.long = coord[0].toString().substr(0, 8)
        this.lat = coord[1].toString().substr(0, 8)
      })
    }
  }
}
</script>

<style scoped>
  .coord,.map-content{
    width: 100%;
    height: 100%;
  }
  .map-content{
    padding: 5px;
    border-radius: 15px;
  }
  .operation-content{
    padding: 10px;
  }
  label{
    color: #ffffff;
  }
</style>
