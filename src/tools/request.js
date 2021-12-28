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

import axios from 'axios'
import ElementUI from 'element-ui'
import i18n from '../locales/i18n.js'
import 'element-ui/lib/theme-chalk/index.css'

const PROXY_PREFIX_CURRENTSERVER = window.location.pathname.slice(0, window.location.pathname.length - 1)
const PROXY_PREFIX_USERMGMT = '/edgegallery/usermgmt'
const PROXY_PREFIX_HEALTHCHECK = '/edgegallery/healthcheck'

let inventoryApi = PROXY_PREFIX_CURRENTSERVER + '/mecm-inventory/inventory/v1'
let apmApi = PROXY_PREFIX_CURRENTSERVER + '/mecm-apm/apm/v1'
let appoApi = PROXY_PREFIX_CURRENTSERVER + '/mecm-appo/appo/v1'

let inventoryUrl = ['/applcms', '/mechosts', '/appstores', '/apprulemanagers', '/mepms']

axios.interceptors.request.use(
  config => {
    config.headers['access_token'] = getToken()
    return config
  },
  error => {
    ElementUI.Message.error(i18n.t('tip.loginStatusFailed'))
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      ElementUI.Message.error(i18n.t('tip.loginStatusFailed'))
      let host = window.location.hostname
      setTimeout(() => {
        if (PROXY_PREFIX_CURRENTSERVER) {
          window.location.href = window.location.origin + PROXY_PREFIX_USERMGMT + '/index.html?enable_sms=false&return_to=' + window.location.origin + PROXY_PREFIX_CURRENTSERVER
        } else {
          window.location.href = 'https://' + host + ':30067/index.html?enable_sms=false&return_to=' + window.location.origin
        }
      }, 1500)
    }
    return Promise.reject(error)
  }
)

function getUserId () {
  return sessionStorage.getItem('userId')
}

function getToken () {
  return sessionStorage.getItem('access_token')
}

function GET (url, params) {
  return axios.get(url, {
    params: params
  })
}

function POST (url, params) {
  return axios.post(url, params)
}

function PUT (url, params) {
  return axios.put(url, params)
}

function DELETE (url, params) {
  return axios.delete(url, {
    data: params
  })
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
    return axios.get(PROXY_PREFIX_CURRENTSERVER + '/auth/login-info')
  },
  logout () {
    return axios({
      method: 'POST',
      url: PROXY_PREFIX_CURRENTSERVER + '/logout',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
      }
    })
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
  },
  syncFromApm () {
    return POST(apmApi + '/tenants/' + getUserId() + '/app_package_infos/sync')
  },
  getApptemplateApi (packageId) {
    return GET(apmApi + '/tenants/' + getUserId() + '/packages/' + packageId + '/apptemplate')
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
  instantiateApp (instanceId, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instances/' + instanceId, params)
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
  },
  syncFromAppo () {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instance_infos/sync')
  },
  setProfile (id) {
    return POST(appoApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/profile')
  },
  createFlavor (hostIp, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/flavors', params)
  },
  queryFlavorsByMechost (hostIp) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/flavors')
  },
  queryFlavorByFlavorId (hostIp, flavorId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/flavors/' + flavorId)
  },
  deleteFlavorByFlavorId (hostIp, flavorId) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/flavors/' + flavorId)
  },

  createImage (hostIp, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/images', params)
  },
  importImage (hostIp, imageId, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/images/' + imageId, params)
  },
  queryImagesByMechost (hostIp) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/images')
  },
  queryImageByImageId (hostIp, imageId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/images/' + imageId)
  },
  deleteImageByImageId (hostIp, imageId) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/images/' + imageId)
  },

  createNetwork (hostIp, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/networks', params)
  },
  queryNetworksByMechost (hostIp) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/networks')
  },
  queryNetworkByNetworkId (hostIp, networkId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/networks/' + networkId)
  },
  deleteNetworkByNetworkId (hostIp, networkId) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/networks/' + networkId)
  },

  createSecurityGroup (hostIp, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/securityGroups', params)
  },
  querySecurityGroupsByMechost (hostIp) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/securityGroups')
  },
  querySecurityGroupBySecurityGroupId (hostIp, securityGroupId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/securityGroups/' + securityGroupId)
  },
  deleteSecurityGroupBySecurityGroupId (hostIp, securityGroupId) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/securityGroups/' + securityGroupId)
  },
  createSecurityGroupRule (hostIp, securityGroupId, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/securityGroups/' + securityGroupId + '/securityGroupRules', params)
  },
  querySecurityGroupRulesByMechost (hostIp, securityGroupId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/securityGroups/' + securityGroupId)
  },
  deleteSecurityGroupRuleBySecurityGroupRuleId (hostIp, securityGroupId, securityGroupRuleId) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/securityGroups/' + securityGroupId + '/securityGroupRules/' + securityGroupRuleId)
  },

  createVM (hostIp, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/servers', params)
  },
  queryVMsByMechost (hostIp) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/servers')
  },
  queryVMByVMId (hostIp, serverId) {
    return GET(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/servers/' + serverId)
  },
  deleteVMByVMId (hostIp, serverId) {
    return DELETE(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/servers/' + serverId)
  },
  operateVM (hostIp, serverId, params) {
    return POST(appoApi + '/tenants/' + getUserId() + '/hosts/' + hostIp + '/servers/' + serverId, params)
  }
}

let inventory = {
  create (type, params) {
    if (type === 2) {
      return POST(inventoryApi + '/tenants/' + getUserId() + inventoryUrl[type - 1], params)
    } else {
      return POST(inventoryApi + inventoryUrl[type - 1], params)
    }
  },
  getList (type) {
    if (type === 2) {
      return GET(inventoryApi + '/tenants/' + getUserId() + inventoryUrl[type - 1])
    } else {
      return GET(inventoryApi + inventoryUrl[type - 1])
    }
  },
  modify (type, params, ip) {
    if (type === 2) {
      return PUT(inventoryApi + '/tenants/' + getUserId() + inventoryUrl[type - 1] + '/' + ip, params)
    } else {
      return PUT(inventoryApi + inventoryUrl[type - 1] + '/' + ip, params)
    }
  },
  delete (type, params) {
    if (type === 2) {
      return DELETE(inventoryApi + '/tenants/' + getUserId() + inventoryUrl[type - 1] + '/' + params)
    } else {
      return DELETE(inventoryApi + inventoryUrl[type - 1] + '/' + params)
    }
  },
  uploadConfig (ip, params) {
    return POST(inventoryApi + '/tenants/' + getUserId() + '/mechosts/' + ip + '/k8sconfig', params)
  },
  getConfigRules (id) {
    return GET(inventoryApi + '/tenants/' + getUserId() + '/app_instances/' + id + '/appd_configuration')
  },
  getHwCapa (hostip) {
    return GET(inventoryApi + '/tenants/' + getUserId() + '/mechosts/' + hostip + '/capabilities')
  },
  syncApprule (ip) {
    return GET(inventoryApi + '/tenants/' + getUserId() + '/mepms/' + ip + '/apprule/sync')
  },
  syncMechost (ip) {
    return GET(inventoryApi + '/mepms/' + ip + '/mechost/sync')
  }
}

let check = {
  healthCheck () {
    let _healthCheckUrlPrefix = 'http://' + window.location.host.split(':')[0] + ':32757'
    if (PROXY_PREFIX_CURRENTSERVER) {
      _healthCheckUrlPrefix = window.location.origin + PROXY_PREFIX_HEALTHCHECK
    }
    return axios.get(_healthCheckUrlPrefix + '/health-check/v1/center/tenants/' + getUserId() + '/action/start', {
      headers: {
        'Content-Type': 'application/json',
        'access_token': sessionStorage.getItem('accessToken')
      }
    })
  }
}

export {
  GET,
  POST,
  PUT,
  DELETE,
  user,
  apm,
  appo,
  inventory,
  check,
  PROXY_PREFIX_CURRENTSERVER
}
