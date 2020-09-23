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
  api = 'https://' + window.location.href.split('//')[1].split(':')[0]
} else {
  api = 'http://' + window.location.host
}

// applcm port:30204
let inventory = api + ':30203' + '/inventory/v1'
let apm = api + ':30202' + '/apm/v1'
let appo = api + ':30201' + '/appo/v1'

let inventoryUrl = ['/applcms', '/mechosts', '/appstores']

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
    let url = '/mec-appstore/mec/appstore/v1/apps/' + item.appId + '/packages/' + item.id
    return GET(url)
  },
  getMepCap (hostip) {
    let url = appo + '/tenants/' + getUserId() + '/hosts/' + hostip + '/mep_capabilities'
    return GET(url, '')
  },
  getNodeKpi (hostip) {
    let url = appo + '/tenants/' + getUserId() + '/hosts/' + hostip + '/kpi'
    return GET(url, '')
  },
  getServiceInfo (instanceId) {
    let url = appo + '/tenants/' + getUserId() + '/app_instances/' + instanceId
    return GET(url, '')
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
  confirmToDistribute (params) {
    let url = apm + '/tenants/' + getUserId() + '/packages'
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
    let url = apm + '/tenants/' + getUserId() + '/packages'
    return GET(url)
  },
  confirmToDeploy (params) {
    let url = appo + '/tenants/' + getUserId() + '/app_instances'
    return POST(url, params)
  },
  getInstanceList (params) {
    let url = appo + '/tenants/' + getUserId() + '/app_instance_infos'
    return GET(url, '')
  },
  getInstanceInfo (instanceId) {
    let url = appo + '/tenants/' + getUserId() + '/app_instance_infos/' + instanceId
    return GET(url)
  },
  instantiateApp (instanceId) {
    let url = appo + '/tenants/' + getUserId() + '/app_instances/' + instanceId
    return POST(url)
  },
  deletDistributionApp (type, hostIp, packageId) {
    let url = apm + '/tenants/' + getUserId() + '/packages/' + packageId + '/hosts/' + hostIp
    if (type === 2) {
      url = apm + '/tenants/' + getUserId() + '/packages/' + packageId
    }
    return DELETE(url)
  },
  getInstanceDetail (appInstanceId) {
    let url = appo + '/tenants/' + getUserId() + '/app_instances/' + appInstanceId
    return GET(url, '')
  },
  deleteInstanceApp (instanceId) {
    let url = appo + '/tenants/' + getUserId() + '/app_instances/' + instanceId
    return DELETE(url)
  }
}
let edge = {
  getNodeList () {
    let url = inventory + '/tenants/' + getUserId() + '/mechosts'
    return GET(url)
  }
}
let system = {
  create (type, params) {
    return POST(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1], params)
  },
  getList (type, params) {
    return GET(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1])
  },
  modify (type, params, ip) {
    return PUT(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1] + '/' + ip, params)
  },
  delete (type, params) {
    return DELETE(inventory + '/tenants/' + getUserId() + inventoryUrl[type - 1] + '/' + params)
  },
  uploadConfig (ip, params) {
    let url = inventory + '/tenants/' + getUserId() + '/mechosts/' + ip + '/k8sconfig'
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
