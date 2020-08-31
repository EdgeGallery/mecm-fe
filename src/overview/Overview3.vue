<template>
  <div>
    <div
      id="container"
      :style="{width:width+'px',height:height+'px',margin:'34px auto'}"
    />
  </div>
</template>

<script>
import AMap from 'AMap' // 引入高德地图AMap
export default {
  name: 'GMap',
  props: {
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: window.innerHeight
    }
  }, // 添加变量，方便组件复用
  data () {
    return {
      map: null,
      polygons: [],
      district: null
    }
  },
  methods: {
    // 初始化地图
    initMap () {
      let self = this
      let map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10
      })
      self.map = map
    }

  },
  // 在mounted阶段调用（mounted可以操作DOM）
  mounted () {
    this.initMap()
  }
}
</script>
