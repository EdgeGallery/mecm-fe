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
const Mock = require('mockjs')
const userData = function () {
  return [
    {
      'userId': '######',
      'userName': '******',
      'isSecureBackend': 'true',
      'loginPage': '',
      'accessToken': '######',
      'authorities': []
    }
  ]
}

const hostData = function () {
  return [
    {
      address: '78hao',
      affinity: 'X86',
      applcmIp: '119.8.53.3',
      city: '山西省/太原市/晋源区/义井街道',
      edgerepoIp: '119.8.53.3',
      edgerepoName: null,
      edgerepoPort: '8123',
      edgerepoUsername: '',
      mechostIp: '119.8.53.3',
      mechostName: 'Node',
      userName: '',
      zipCode: '',
      capability: 'GPU'
    }
  ]
}

const packageData = function () {
  return [ {
    affinity: 'X86',
    appId: '73b6f66992ab4798a55350f419a210af',
    contact: null,
    createTime: '2020-09-14 20:00:57.29812',
    details: '',
    downloadCount: 25,
    iconUrl: null,
    industry: 'Smart Park',
    name: 'zone-swr-test1',
    provider: 'Huawei',
    score: 5,
    shortDesc: 'for testing',
    type: 'Video Application',
    userId: '92e5d627-a501-479b-922a-8e63eb92cf57',
    userName: 'wenson'
  }]
}

const instanceInfo = function () {
  return {
    'response': [
      {
        'appInstanceId': '4b6944f1-655c-4f77-9e86-c0c4eb629c9c',
        'appPackageId': '9eb381e222dd4a3898fc61f7182bba24',
        'appName': 'zone',
        'appId': '73b6f66992ab4798a55350f419a210af',
        'appDescriptor': 'zone',
        'mecHost': '119.8.53.3',
        'applcmHost': '119.8.53.3',
        'operationalStatus': 'Instantiated',
        'operationInfo': 'success'
      }
    ]
  }
}

const kpiInfo = function () {
  let data = {
    'cpuusage': { 'total': 1600653686.904, 'used': '0.025' },
    'memusage': { 'total': 1600653686.906, 'used': '0.004406774826102075' },
    'diskusage': { 'total': '0.0', 'used': '0.0' }
  }
  return {
    response: JSON.stringify(data)
  }
}

const packageInfo = function () {
  return {
    'csarId': '9eb381e222dd4a3898fc61f7182bba24',
    'downloadUrl': '/home/appstore/7b002245635b4563a3d4dd4c96168556/7b002245635b4563a3d4dd4c96168556.csar',
    'iconUrl': '/home/appstore/70d3278cbf654377beeb3d178ad01ff3/70d3278cbf654377beeb3d178ad01ff3.png',
    'size': '0',
    'createTime': '2020-09-14 20:00:57.29812',
    'name': 'zone-swr-test1',
    'version': '1.0',
    'type': 'Video Application',
    'details': '',
    'affinity': 'X86',
    'industry': 'Smart Park',
    'contact': null,
    'appId': '73b6f66992ab4798a55350f419a210af'
  }
}

const distributionData = function () {
  return [{
    'appPkgId': '9eb381e222dd4a3898fc61f7182bba24',
    'appPkgName': 'zone-swr-test1',
    'appPkgVersion': '1.0',
    'appPkgPath': 'https://appstore-be-svc:8099/mec/appstore/v1/apps/73b6f66992ab4798a55350f419a210af/packages/9eb381e222dd4a3898fc61f7182bba24/action/download',
    'appProvider': 'Huawei',
    'appPkgDesc': 'for testing',
    'appPkgAffinity': 'X86',
    'appIconUrl': 'https://appstore-be-svc:8099/mec/appstore/v1/apps/73b6f66992ab4798a55350f419a210af/icon',
    'createdTime': '2020-09-19T07:31:33.267',
    'modifiedTime': '2020-09-19T07:31:33.455',
    'appId': '73b6f66992ab4798a55350f419a210af',
    'mecHostInfo': [{ 'hostIp': '119.8.53.3', 'status': 'Distributed', 'error': '' }]
  }]
}

const applcmData = function () {
  return [
    {
      'applcmIp': '119.8.125.174',
      'applcmPort': '30101',
      'userName': 'wenson'
    },
    {
      'applcmIp': '119.8.125.175',
      'applcmPort': '30102',
      'userName': 'wenson'
    }
  ]
}

const appstoreData = function () {
  return [
    { 'url': 'https://appstore.edgegallery.com',
      'userName': 'wenson',
      'appstoreName': 'huaweiappstore',
      'producer': 'huawei',
      'time': '01-09-2020 09:04:04'
    }
  ]
}

const serviceInfoData = function () {
  let data =
  {
    'pods':
    [
      {
        'podstatus': 'Running',
        'podname': 'zoon-minder-6c99b874-wc8zn',
        'containers': [
          { 'containername': 'zoonminder',
            'metricsusage': {
              'cpuusage': '83538/4000000',
              'memusage': '167305216/16656244736',
              'diskusage': '0/100276072165'
            }
          }
        ]
      }, {
        'podstatus': 'Running',
        'podname': 'zoon-minder-db-67dbdfcfc-2vlvz',
        'containers': [
          {
            'containername': 'zoondb',
            'metricsusage': {
              'cpuusage': '340110/4000000',
              'memusage': '270934016/16656244736',
              'diskusage': '0/100276072165'
            }
          }
        ]
      }
    ]
  }

  let res = { response: JSON.stringify(data) }
  return res
}

const alarmData = function () {
  let alarm = {}
  return alarm
}

Mock.mock('/mock/login', userData)
Mock.mock('/mock/mechosts', hostData)
Mock.mock('/mock/appPackageList', packageData)
Mock.mock('/mock/appDistributionList', distributionData)
Mock.mock('/mock/applcms', applcmData)
Mock.mock('/mock/appstores', appstoreData)
Mock.mock('/mock/alarmData', alarmData)
Mock.mock('/mock/seviceInfo', serviceInfoData)
Mock.mock('/mock/instanceInfo', instanceInfo)
Mock.mock('/mock/packageInfo', packageInfo)
Mock.mock('/mock/kpiInfo', kpiInfo)
