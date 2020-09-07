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

let sysApi = api + ':30105'
let mecmApi = api + ':30107'
let meoApi = api + ':30108'
let infoApi = api + ':30106'

function GET (url, params, headers) {
  return axios.get(url, {
    params: params,
    headers: headers
  })
}

function POST (url, params, headers) {
  return axios.post(url, params, { headers: headers })
}

function PUT (url, params, headers) {
  return axios.put(url, params, { headers: headers })
}

function DELETE (url, params, headers) {
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
    return GET('/auth/login-info')
  },
  logout () {
    let headers = {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
    }
    return axios.post('/logout', '', { withCredentials: true, headers: headers })
  }
}

let overview = {
  getPackageInfo (item) {
    let url = '/mec-appstore/mec/appstore/v1/apps/' + item.appId + '/packages/' + item.id
    return GET(url)
  },
  getAppInfo () {
    let url = infoApi + '/tenant/' + getUserId() + '/appInstanceInfo'
    let headers = {
      'Authorization': 'Basic YnBlbDpwYXNzd29yZDEk',
      'access_token': getToken()
    }
    return GET(url, '', headers)
  },
  getMepCap (host) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/hosts/' + host + '/mep-capabilities'
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    return GET(url, '', headers)
  },
  getNodeKpi (ip) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/hosts/' + ip
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    return GET(url, '', headers)
  },
  getServiceInfo (instanceId) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + instanceId
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    return GET(url, '', headers)
  }
}
let app = {
  confirmToDistribute (csarId, params) {
    let headers = {
      'token': getToken()
    }
    let url = mecmApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/package/' + csarId
    return POST(url, params, headers)
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
    let url = mecmApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/package/'
    return GET(url)
  },
  confirmToDeploy (params) {
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance'
    return POST(url, params, headers)
  },
  instantiateApp (instanceId, params) {
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + instanceId
    return POST(url, params, headers)
  },
  deletDistributionApp (type, hostIp, packageId) {
    let url = mecmApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/package/' + packageId + '/host/' + hostIp
    if (type === 2) {
      url = mecmApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/package/' + packageId
    }
    return DELETE(url)
  },
  getInstanceList (params) {
    let url = infoApi + '/tenant/' + getUserId() + '/appInstanceInfo'
    let headers = {
      'Authorization': 'Basic YnBlbDpwYXNzd29yZDEk',
      'access_token': getToken()
    }
    return GET(url, '', headers)
  },
  getInstanceDetail (appInstanceId) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + appInstanceId
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    return GET(url, '', headers)
  },
  deleteInstanceApp (appInstanceId, params) {
    let url = meoApi + '/mec/v1/mgmt/tenant/' + getUserId() + '/app_instance/' + appInstanceId
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    return DELETE(url, params, headers)
  }
}
let edge = {
  getNodeList () {
    let url = sysApi + '/tenant/' + getUserId() + '/hosts'
    return GET(url)
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
    return POST(sysApi + '/tenant/' + getUserId() + url, params)
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
    return GET(sysApi + '/tenant/' + getUserId() + url)
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
    return PUT(sysApi + '/tenant/' + getUserId() + url, params)
  },
  delete (type, params) {
    let url = ''
    if (type === 3) {
      url = '/appstores/appstore'
      return DELETE(sysApi + '/tenant/' + getUserId() + url, params)
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
    let headers = {
      'Authorization': 'Basic SW5mcmFQb3J0YWxDbGllbnQ6cGFzc3dvcmQxJA==',
      'access_token': getToken()
    }
    return POST(url, params, headers)
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
