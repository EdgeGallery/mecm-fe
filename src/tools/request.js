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

let api
if (window.location.href.indexOf('30093') > -1) {
  api = 'http://' + window.location.href.split('//')[1].split(':')[0]
} else {
  api = 'http://' + window.location.host
}

let inventory = api + ':30203' + '/inventory/v1'
let apm = api + ':30202' + '/apm/v1'
let appo = api + ':30201' + '/appo/v1'

let inventoryUrl = ['/applcms', '/mechosts', 'appstores']
let headers = {
  'access_token': getToken()
}

function GET (url, params) {
  return axios.get(url, {
    params: params,
    headers: headers
  })
}

function POST (url, params) {
  return axios.post(url, params, { headers: headers })
}

function PUT (url, params) {
  return axios.put(url, params, { headers: headers })
}

function DELETE (url, params) {
  return axios.delete(url, {
    params: params,
    headers: headers
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
  } else { return null }
}

let user = {
  getUserInfo () {
    return axios.get('/auth/login-info')
  },
  logout () {
    let header = {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    }
    return axios.post('/logout', '', { withCredentials: true, headers: header })
  }
}

let overview = {
  getPackageInfo (item) {
    let url = '/mec-appstore/mec/appstore/v1/apps/' + item.appId + '/packages/' + item.id
    return GET(url)
  },
  getAppInfo () {
    let url = appo + '/tenant/' + getUserId() + '/app_Instance_Infos'
    return GET(url, '')
  },
  getMepCap (host) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/hosts/' + host + '/mep-capabilities'
    return GET(url, '')
  },
  getNodeKpi (ip) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/hosts/' + ip
    return GET(url, '')
  },
  getServiceInfo (instanceId) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instances/' + instanceId
    return GET(url, '')
  }
}
let app = {
  confirmToDistribute (csarId, params) {
    let url = apm + '/mec/v1/mgmt/tenant/' + getUserId() + '/packages/' + csarId
    return POST(url, params)
  },
  getAppListFromAppStore (params) {
    let url = '/mec-appstore/mec/appstore/v1/apps'
    return GET(url)
  },
  getPackageList (appId) {
    let url = '/mec-appstore/mec/appstore/v1/apps/' + appId + '/packages'
    return GET(url)
  },
  readFile (appId, packageId, params) {
    let url = '/mec-appstore/mec/appstore/v1/apps/' + appId + '/packages/' + packageId + '/files'
    return POST(url, params)
  },
  downloadPackage (appId, packageId) {
    let url = '/mec-appstore/mec/appstore/v1/apps/' + appId + '/packages/' + packageId + '/action/download'
    try {
      var elemIF = document.createElement('iframe')
      elemIF.src = url
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
  getDistributionList () {
    let url = apm + '/mec/v1/mgmt/tenant/' + getUserId() + '/packages/'
    return GET(url)
  },
  confirmToDeploy (params) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instances'
    return POST(url, params)
  },
  instantiateApp (instanceId, params) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instances/' + instanceId
    return POST(url, params)
  },
  deletDistributionApp (type, hostIp, packageId) {
    let url = apm + '/mec/v1/mgmt/tenant/' + getUserId() + '/packages/' + packageId + '/host/' + hostIp
    if (type === 2) {
      url = apm + '/mec/v1/mgmt/tenant/' + getUserId() + '/packages/' + packageId
    }
    return DELETE(url)
  },
  getInstanceList (params) {
    let url = appo + '/tenant/' + getUserId() + '/app_Instance_Infos'
    return GET(url, '')
  },
  getInstanceDetail (appInstanceId) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instances/' + appInstanceId
    return GET(url, '')
  },
  deleteInstanceApp (appInstanceId, params) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instances/' + appInstanceId
    return DELETE(url, params)
  }
}
let edge = {
  getNodeList () {
    let url = inventory + '/tenant/' + getUserId() + '/hosts'
    return GET(url)
  }
}
let system = {
  create (type, params) {
    return POST(inventory + '/tenant/' + getUserId() + inventoryUrl[type - 1], params)
  },
  getList (type, params) {
    return GET(inventory + '/tenant/' + getUserId() + inventoryUrl[type - 1])
  },
  modify (type, params) {
    return PUT(inventory + '/tenant/' + getUserId() + inventoryUrl[type - 1], params)
  },
  delete (type, params) {
    return DELETE(inventory + '/tenant/' + getUserId() + inventoryUrl[type - 1] + params)
  },
  uploadConfig (ip, params) {
    let url = appo + '/mec/v1/mgmt/tenant/' + getUserId() + '/applcm/host/' + ip + '/k8sconfig'
    return POST(url, params)
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
