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

let inventory = api + ':30203' + '/inventory/v1'
let apm = api + ':30202' + '/apm/v1'
let appo = api + ':30201' + '/appo/v1'

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
    } else if (error.response.status === 403) {
      ElementUI.Message.error(i18n.t('tip.loginOperation'))
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
let overview = {
  getPackageInfo (item) {
    return GET('/mec-appstore/mec/appstore/v1/apps/' + item.appId + '/packages/' + item.id)
  },
  getHwCapa (hostip) {
    return GET(inventory + '/tenants/' + getUserId() + '/mechosts/' + hostip + '/capabilities')
  },
  getNodeKpi (hostip) {
    return GET(appo + '/tenants/' + getUserId() + '/hosts/' + hostip + '/kpi')
  },
  getServiceInfo (instanceId) {
    return GET(appo + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  getMepCapabilities (hostip) {
    return GET(appo + '/tenants/' + getUserId() + '/hosts/' + hostip + '/mep_capabilities')
  }
}
let app = {
  getPackageList (appId) {
    return GET('/mec-appstore/mec/appstore/v1/apps/' + appId + '/packages')
  },
  getAppListFromAppStore () {
    return GET('/mec-appstore/mec/appstore/v1/apps')
  },
  downloadPackage (appId, packageId) {
    try {
      var elemIF = document.createElement('iframe')
      elemIF.src = '/mec-appstore/mec/appstore/v1/apps/' + appId + '/packages/' + packageId + '/action/download'
      elemIF.style.display = 'none'
      document.body.appendChild(elemIF)
      // 防止下载两次
      setTimeout(function () {
        document.body.removeChild(elemIF)
      }, 1000)
    } catch (e) {
      console.log(e)
    }
  },
  confirmToDistribute (params) {
    return POST(apm + '/tenants/' + getUserId() + '/packages', params)
  },
  getDistributionList () {
    return GET(apm + '/tenants/' + getUserId() + '/packages')
  },
  deleteDistributionApp (type, hostIp, packageId) {
    let url = apm + '/tenants/' + getUserId() + '/packages/' + packageId + '/hosts/' + hostIp
    if (type === 2) {
      url = apm + '/tenants/' + getUserId() + '/packages/' + packageId
    }
    return DELETE(url)
  },
  confirmToDeploy (params) {
    return POST(appo + '/tenants/' + getUserId() + '/app_instances', params)
  },
  confirmToBatchDeploy (params) {
    return POST(appo + '/tenants/' + getUserId() + '/app_instances/batch_create', params)
  },
  getInstanceInfo (instanceId) {
    return GET(appo + '/tenants/' + getUserId() + '/app_instance_infos/' + instanceId)
  },
  getBatchInstanceInfo (instanceId) {
    return GET(appo + '/tenants/' + getUserId() + '/app_instance_infos/appinstanceids?' + instanceId)
  },
  instantiateApp (instanceId) {
    return POST(appo + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  batchInstantiateApp (params) {
    return POST(appo + '/tenants/' + getUserId() + '/app_instances/batch_instantiate', params)
  },
  getInstanceList () {
    return GET(appo + '/tenants/' + getUserId() + '/app_instance_infos')
  },
  getInstanceDetail (appInstanceId) {
    return GET(appo + '/tenants/' + getUserId() + '/app_instances/' + appInstanceId)
  },
  deleteInstanceApp (instanceId) {
    return DELETE(appo + '/tenants/' + getUserId() + '/app_instances/' + instanceId)
  },
  batchDeleteInstanceApp (params) {
    return POST(appo + '/tenants/' + getUserId() + '/app_instances/batch_terminate', params)
  },
  addConfigRules (type, id, params) {
    if (type === 2) {
      return PUT(appo + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
    } else {
      return POST(appo + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
    }
  },
  deleteConfigRules (id, params) {
    return DELETE(appo + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration', params)
  },
  getConfigRules (id) {
    return GET(inventory + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration')
  },
  getTaskStatus (id) {
    return GET(appo + '/tenants/' + getUserId() + '/apprule_task_infos/' + id)
  }
}
let edge = {
  getNodeList () {
    return GET(inventory + '/tenants/' + getUserId() + '/mechosts')
  }
}
let system = {
  create (type, params) {
    return POST(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1], params)
  },
  getList (type) {
    return GET(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1])
  },
  modify (type, params, ip) {
    return PUT(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1] + '/' + ip, params)
  },
  delete (type, params) {
    return DELETE(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1] + '/' + params)
  },
  uploadConfig (ip, params) {
    return POST(inventory + '/tenants/' + getUserId() + '/mechosts/' + ip + '/k8sconfig', params)
  }
}

export {
  GET,
  POST,
  PUT,
  DELETE,
  user,
  overview,
  app,
  edge,
  system
}
