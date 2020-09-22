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

//  Mock Data

import axios from 'axios'
require('../mock.js')

let inventoryUrl = ['/applcms', '/mechosts', 'appstores']

let user = {
  getUserInfo () {
    return axios.get('/mock/login')
  }
}

let overview = {
  getPackageInfo (item) {
    return axios.get('/mock/packageInfo')
  },
  getAppInfo () {
    return axios.get('/mock/instanceInfo')
  },
  getMepCap (host) {
    return axios.get('/mock/mepInfo')
  },
  getNodeKpi (ip) {
    return axios.get('/mock/kpiInfo')
  },
  getServiceInfo (instanceId) {
    return axios.get('/mock/seviceInfo')
  },
  getChart (cityId) {
    return {
      '100000': {
        'Overall': 13100,
        'Critical': 6700,
        'Major': 3600,
        'Minor': 2800
      },
      '110000': {
        'Overall': 1000,
        'Critical': 650,
        'Major': 300,
        'Minor': 50
      },
      '650000': {
        'Overall': 12100,
        'Critical': 6050,
        'Major': 3300,
        'Minor': 2750
      },
      '652800': {
        'Overall': 11000,
        'Critical': 5500,
        'Major': 3000,
        'Minor': 2500
      },
      '653200': {
        'Overall': 1100,
        'Critical': 550,
        'Major': 300,
        'Minor': 250
      }
    }
  }
}
let app = {
  getAppListFromAppStore (params) {
    return axios.get('/mock/appPackageList')
  },
  getPackageList (appId) {
    return axios.get('/mock/appPackageList')
  },
  getDistributionList () {
    return axios.get('/mock/appDistributionList')
  },
  getInstanceList (params) {
    return axios.get('/mock/instanceInfo')
  },
  getInstanceDetail (appInstanceId) {
    return axios.get('/mock/instanceInfo')
  }
}
let edge = {
  getNodeList () {
    return axios.get('/mock/mechosts')
  }
}
let system = {
  getList (type) {
    return axios.get('/mock' + inventoryUrl[1])
  }
}

export {
  user,
  overview,
  app,
  edge,
  system
}
