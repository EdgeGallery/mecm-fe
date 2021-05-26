/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
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
//  本地调试替换request.js

import axios from 'axios'
require('../mock.js')

let inventoryUrl = ['/applcms', '/mechosts', '/appstores', '/apprulemanagers']

let user = {
  getUserInfo () {
    return axios.get('/mock/login')
  }
}

let apm = {
  getDistributionList () {
    return axios.get('/mock/appDistributionList')
  },
  getAppPackageList () {
    return axios.get('/mock/appPackageList')
  }
}
let appo = {
  getInstanceList () {
    return axios.get('/mock/instanceInfo')
  },
  getInstanceDetail () {
    return axios.get('/mock/instanceInfo')
  },
  getAppInfo () {
    return axios.get('/mock/instanceInfo')
  },
  getMepCapabilities () {
    return axios.get('/mock/getSwCapability')
  },
  getNodeKpi () {
    return axios.get('/mock/kpiInfo')
  },
  getServiceInfo () {
    return axios.get('/mock/seviceInfo')
  }
}
let inventory = {
  getList (type) {
    return axios.get('/mock' + inventoryUrl[type - 1])
  },
  getHwCapa () {
    return axios.get('/mock/getHwCapability')
  },
  getConfigRules () {
    return axios.get('/mock/getConfigRules')
  }
}

export {
  user,
  apm,
  appo,
  inventory
}
