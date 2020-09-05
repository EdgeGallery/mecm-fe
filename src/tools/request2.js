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

let api
if (window.location.href.indexOf('30093') > -1) {
  api = 'http://' + window.location.href.split('//')[1].split(':')[0]
} else {
  api = 'http://' + window.location.host
}

let sysApi = api + ':30105'
let mecmApi = api + ':30107'
let meoApi = api + ':30108'

function GET (url) {
  return axios.get(URL)
}

function POST (url) {
  return axios.post(url)
}

function PUT (url) {
  return axios.put(url)
}

function DELETE (url) {
  return axios.delete(url)
}

function getUserId () {
  return sessionStorage.getItem('userId')
}

let user = {
  getUserInfo () {
    return axios.get('/mock/login')
  }
}

let overview = {
  getPackageInfo (item) {
    let url = '/mec-appstore/mec/appstore/v1/apps/' + item.appId + '/packages/' + item.id
    return GET(url)
  },
  getAppInfo () {
    return axios.get('/mock/appInstanceInfo')
  },
  getMepCap (host) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/hosts/' + host + '/mep-capabilities'

    return GET(url)
  },
  getNodeKpi (ip) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/hosts/' + ip

    return GET(url)
  },
  getServiceInfo (instanceId) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + instanceId

    return GET(url)
  }
}
let app = {
  confirmToDistribute (csarId, params) {
    let url = mecmApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/package/' + csarId
    return POST(url)
  },
  getAppListFromAppStore (params) {
    return axios.get('/mock/appPackageList')
  },
  getPackageList (appId) {
    return axios.get('/mock/appPackageList')
  },
  readFile (appId, packageId, params) {
    let url = '/mec-appstore/mec/appstore/v1/apps/' + appId + '/packages/' + packageId + '/files'
    return POST(url)
  },
  getDistributionList () {
    return axios.get('/mock/appDistributionList')
  },
  confirmToDeploy (params) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance'
    return POST(url)
  },
  instantiateApp (instanceId, params) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + instanceId
    return POST(url)
  },
  deletDistributionApp (type, hostIp, packageId) {
    let url = mecmApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/package/' + packageId + '/host/' + hostIp
    if (type === 2) {
      url = mecmApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/package/' + packageId
    }
    return DELETE(url)
  },
  getInstanceList (params) {
    return axios.get('/mock/appInstanceList')
  },
  getInstanceDetail (appInstanceId) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + appInstanceId

    return GET(url)
  },
  deleteInstanceApp (appInstanceId, params) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + appInstanceId

    return DELETE(url)
  }
}
let edge = {
  getNodeList () {
    return axios.get('/mock/hosts')
  }
}
let system = {
  create (type, params) {
    let url = ''
    if (type === 1) {
      url = '/applcm'
    } else if (type === 2) {
      url = '/host'
    } else {
      url = '/appstore'
    }
    return POST(sysApi + '/tenant/' + getUserId() + url)
  },
  getList (type, params) {
    let url = ''
    if (type === 1) {
      url = '/applcms'
    } else if (type === 2) {
      url = '/hosts'
    } else {
      url = '/appstores'
    }
    return axios.get('/mock' + url)
  },
  modify (type, params) {
    let url = ''
    if (type === 1) {
      url = '/applcm'
    } else if (type === 2) {
      url = '/host'
    } else {
      url = '/appstore'
    }
    return PUT(sysApi + '/tenant/' + getUserId() + url)
  },
  delete (type, params) {
    let url = ''
    if (type === 3) {
      url = '/appstores/appstore'
      return DELETE(sysApi + '/tenant/' + getUserId() + url)
    } else {
      if (type === 1) {
        url = '/applcms/applcm/'
      } else {
        url = '/hosts/host/'
      }
      return DELETE(sysApi + '/tenant/' + getUserId() + url + params)
    }
  },
  uploadConfig (ip, params) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/applcm/host/' + ip + '/k8sconfig'

    return POST(url)
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
