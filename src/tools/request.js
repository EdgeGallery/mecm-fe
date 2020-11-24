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
//  本地调试时将request1.js改为request.js，即可使用mock api获取数据

import axios from 'axios'
require('../mock.js')

let inventoryUrl = ['/applcms', '/mechosts', '/appstores']

let user = {
  getUserInfo () {
    return axios.get('/mock/login')
  }
}

let overview = {
  getPackageInfo () {
    return axios.get('/mock/packageInfo')
  },
  getAppInfo () {
    return axios.get('/mock/instanceInfo')
  },
  getHmCapa () {
    return axios.get('/mock/getHmCapability')
  },
  getNodeKpi () {
    return axios.get('/mock/kpiInfo')
  },
  getServiceInfo () {
    return axios.get('/mock/seviceInfo')
  }
}
let app = {
  getAppListFromAppStore () {
    return axios.get('/mock/appPackageList')
  },
  getPackageList () {
    return axios.get('/mock/appPackageList')
  },
  getDistributionList () {
    return axios.get('/mock/appDistributionList')
  },
  getInstanceList () {
    return axios.get('/mock/instanceInfo')
  },
  getInstanceDetail () {
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
    return axios.get('/mock' + inventoryUrl[type - 1])
  }
}

export {
  user,
  overview,
  app,
  edge,
  system
}
