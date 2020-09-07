import VueAMap from 'vue-amap'
function geoCode (val) {
  var address = val
  var geocoder = new VueAMap.Geocoder({
    city: '010'
  })
  geocoder.getLocation(address, function (status, result) {
    if (status === 'complete' && result.geocodes.length) {
      var lnglat = result.geocodes[0].location
      console.log(lnglat)
    } else {
      console.error('根据地址查询位置失败')
    }
  })
}

export default geoCode
