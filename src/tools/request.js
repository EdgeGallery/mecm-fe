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

import axios from 'axios'
import ElementUI from 'element-ui'
import i18n from '../locales/i18n.js'
import 'element-ui/lib/theme-chalk/index.css'

let api
if (window.location.href.indexOf('30093') > -1) {
  api = 'https://' + window.location.href.split('//')[1].split(':')[0]
} else {
  api = 'https://' + window.location.host
}

let inventoryApi = api + ':30203' + '/inventory/v1'
let apmApi = api + ':30202' + '/apm/v1'
let appoApi = api + ':30201' + '/appo/v1'

let inventoryUrl = ['/applcms', '/mechosts', '/appstores', '/apprulemanagers']

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      ElementUI.Message.error(i18n.t('tip.loginStatusFailed'))
      let host = window.location.hostname
      setTimeout(() => {
        window.location.href = 'https://' + host + ':30067/index.html?enable_sms=false&return_to=' + window.location.href
      }, 1500)
    }
    return Promise.reject(error)
  }
)

function GET (url, params) {
  let headers = {
    'access_token': getToken()
  }
  return axios.get(url, {
    params: params,
    headers: headers
  })
}

function POST (url, params) {
  let headers = {
    'access_token': getToken()
  }
  return axios.post(url, params, { headers: headers })
}

function PUT (url, params) {
  let headers = {
    'access_token': getToken()
  }
  return axios.put(url, params, { headers: headers })
}

function DELETE (url, params) {
  let headers = {
    'access_token': getToken()
  }
  return axios.delete(url, {
    headers: headers,
    data: params
  })
}

function getUserId () {
  return sessionStorage.getItem('userId')
}

function getToken () {
  return sessionStorage.getItem('access_token')
}

function getCookie (name) {
  let arr = []
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr === document.cookie.match(reg)) {
    return (arr[2])
  } else {
    return null
  }
}

let user = {
  getUserInfo () {
    return axios.get('/auth/login-info')
  },
  logout () {
    return axios({
      method: 'POST',
      url: '/logout',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    })
  }
}

let appstore = {
  getPackageList (appId) {
    return GET('/mec-appstore/mec/appstore/v1/apps/' + appId + '/packages')
  },
  getAppListFromAppStore () {
    return GET('/mec-appstore/mec/appstore/v1/apps')
  }
}

let apm = {
  getAppPackageList (appstoreIp) {
    return GET(apmApi + '/apps/info/appstores/' + appstoreIp)
  },
  syncAppFromStore (params) {
    return POST(apmApi + '/apps/sync', params)
  },
  initApmPackages () {
    return GET(apmApi + '/apps/syncstatus')
  },
  getOneSyncStatus (appId, packageId) {
    return GET(apmApi + '/apps/' + appId + '/packages/' + packageId + '/syncstatus')
  },
  confirmToDistribute (params) {
    return POST(apmApi + '/tenants/' + getUserId() + '/packages', params)
  },
  getDistributionList () {
    return GET(apmApi + '/tenants/' + getUserId() + '/packages')
  },
  deleteDistributionApp (type, hostIp, packageId) {
    let url = apmApi + '/tenants/' + getUserId() + '/packages/' + packageId + '/hosts/' + hostIp
    if (type === 2) {
      url = apmApi + '/tenants/' + getUserId() + '/packages/' + packageId
    }
    return DELETE(url)
  }
}

let appo = {
  getNodeKpi (hostip) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostip + '/kpi')
  },
  getServiceInfo (instanceId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  getMepCapabilities (hostip) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostip + '/mep_capabilities')
  },
  confirmToDeploy (params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instances', params)
  },
  confirmToBatchDeploy (params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instances/batch_create', params)
  },
  getInstanceInfo (instanceId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/app_instance_infos/' + instanceId)
  },
  instantiateApp (instanceId) {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  batchInstantiateApp (params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instances/batch_instantiate', params)
  },
  getInstanceList () {
    return GET(appoApi + '/tenants/' + getUserId() + '/app_instance_infos')
  },
  getInstanceDetail (appInstanceId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/app_instances/' + appInstanceId)
  },
  deleteInstanceApp (instanceId) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  batchDeleteInstanceApp (params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instances/batch_terminate', params)
  },
  addConfigRules (type, id, params) {
    if (type === 2) {
      return PUT(appoApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
    } else {
      return POST(appoApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
    }
  },
  deleteConfigRules (id, params) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
  },
  getTaskStatus (id) {
    return GET(appoApi + '/tenants/' + getUserId() + '/apprule_task_infos/' + id)
  }
}

let inventory = {
  create (type, params) {
    return POST(inventoryApi + inventoryUrl[type - 1], params)
  },
  getList (type) {
    return GET(inventoryApi + inventoryUrl[type - 1])
  },
  modify (type, params, ip) {
    return PUT(inventoryApi + inventoryUrl[type - 1] + '/' + ip, params)
  },
  delete (type, params) {
    return DELETE(inventoryApi + inventoryUrl[type - 1] + '/' + params)
  },
  uploadConfig (ip, params) {
    return POST(inventoryApi + '/mechosts/' + ip + '/k8sconfig', params)
  },
  getConfigRules (id) {
    return GET(inventoryApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration')
  },
  getHwCapa (hostip) {
    return GET(inventoryApi + '/tenants/' + getUserId() + '/mechosts/' + hostip + '/capabilities')
  }
}

export {
  GET,
  POST,
  PUT,
  DELETE,
  user,
  appstore,
  apm,
  appo,
  inventory
}
