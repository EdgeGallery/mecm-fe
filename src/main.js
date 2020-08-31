/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/common.css'
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './locales/i18n.js'
import VCharts from 'v-charts'
import VueAMap from 'vue-amap'
import { pcaa } from 'area-data-vue'
import 'area-linkage-vue/dist/index.css'
import AreaLinkageVue from 'area-linkage-vue'
Vue.prototype.$pcaa = pcaa

Vue.use(AreaLinkageVue)

Vue.use(VueAMap)

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(mavonEditor)
Vue.config.productionTip = false

VueAMap.initAMapApiLoader({
  key: '85daac944eb6dd5690d235151d0e5dc7',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.ControlBar', 'AMap.MouseTool', 'AMap.GeometryUtil', 'AMap.DistrictSearch'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11'
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
