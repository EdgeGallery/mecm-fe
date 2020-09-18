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
      'userId': '7269638e-5637-4b8c-8178-b5112ba7b69b',
      'userName': 'wenson',
      'isSecureBackend': 'true',
      'loginPage': 'https://daily.auth.edgegallery.org?enable_sms=true',
      'accessToken': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiI3MjY5NjM4ZS01NjM3LTRiOGMtODE3OC1iNTExMmJhN2I2OWIiLCJzY29wZSI6WyJhbGwiXSwiZXhwIjoxNTk5MDIwNzExLCJzc29TZXNzaW9uSWQiOiJBRjJDQTVBRTUyRUMxMjI3QUI0QTJBQjY4RkNGN0VCRCIsInVzZXJOYW1lIjoid2Vuc29uIiwidXNlcklkIjoiNzI2OTYzOGUtNTYzNy00YjhjLTgxNzgtYjUxMTJiYTdiNjliIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BUFBTVE9SRV9URU5BTlQiLCJST0xFX0RFVkVMT1BFUl9URU5BTlQiLCJST0xFX01FQ01fVEVOQU5UIl0sImp0aSI6IjY1ZWFlZWRjLWY2MTItNDBlMC04OTA0LWQ2YTc0OWFjOGI0NCIsImNsaWVudF9pZCI6ImFwcHN0b3JlLWZlIiwiZW5hYmxlU21zIjoidHJ1ZSJ9.leS1kcr8rPvLf_4sbCISTKHaPANAJK2o4-Kp6djcsnbscRC2jlo4jRIWLQzziEJtq1jtSLq3P6tfDk2dK12uLNw_I425N6flXUD9Ayi4MAuV4iHlyOpeWs3xc_Y7aaouu7MJtOoAveHiue6aS7Nkf6I8t-_PFr9mas0dJdt1-c9hkk6tRpYPaygng_5M1U60Y1WuymwIJJ81yj7X6v1YEHgFsIvmXepA8kx046A32YM7gIkXVik58yzxdR0xyG4qHfUya2s67WMNxHHliNjKGzo50R7NG2GiSYMcDzfPEvj4JxfpzEFmeNC_irAAmbXhkIVUFWdJPnXW-NLLRuBwVw',
      'authorities': ['ROLE_APPSTORE_TENANT', 'ROLE_DEVELOPER_TENANT', 'ROLE_MECM_TENANT']
    }
  ]
}

const hostData = function () {
  return [
    {
      'mechostIp': '119.8.125.174',
      'mechostName': '119.8.125.174',
      'zipcode': '',
      'city': '北京市/北京市/东城区/景山街道',
      'address': 'Beijing',
      'affinity': 'X86',
      'username': '',
      'password': '',
      'edgeName': null,
      'edgerepoIp': '119.8.125.174',
      'edgerepoPort': '119.8.125.174',
      'edgerepoUsername': '119.8.125.174',
      'edgerepoPassword': '119.8.125.174',
      'tenantId': '7269638e-5637-4b8c-8178-b5112ba7b69b',
      'applcmIp': '119.8.125.174'
    }
  ]
}

const packageData = function () {
  let arr = []
  let data = {
    affinity: 'x86',
    appId: '3a1fcdff6b2249919028621dc1d1a1a7',
    contact: null,
    createTime: '2020-08-27 11:35:14.969237',
    details: 'template_service↵===↵This repo is used for develop app based on osdt mep↵',
    downloadCount: 2,
    iconUrl: null,
    industry: 'Smart Park',
    name: 'testapp',
    provider: 'Huawei',
    score: 5,
    shortDesc: 'test7',
    type: 'Video Application',
    userId: '7269638e-5637-4b8c-8178-b5112ba7b69b',
    userName: 'wenson'
  }
  for (let i = 0; i < 20; i++) {
    arr.push(data)
  }
  return arr
}

const distributionData = function () {
  return [
    {
      'appPackageId': '48237115a570445bab557de6ccad45c3',
      'appPackageName': 'test9',
      'appPackageDescription':
       'SRS/3.0，[OuXuli][release3]，是一个流媒体集群，支持RTMP/HLS/WebRTC/SRT/GB28181，高效、稳定、易用，简单而快乐',
      'appAffinity': 'x86',
      'appDownloadUrl': 'https://appstore-be-svc:8099/mec/appstore/v1/apps/b5cd45ef5a3048cabaa79a979a34f5c9/packages/48237115a570445bab557de6ccad45c3/action/download',
      'appIconUrl': 'https://appstore-be-svc:8099/mec/appstore/v1/apps/b5cd45ef5a3048cabaa79a979a34f5c9/packages/48237115a570445bab557de6ccad45c3/action/download',
      'provider': 'opensource',
      'appVersion': '3.0',
      'createdTime': '',
      'modifiedTime': '',
      'mecHost': [
        { hostIp: '159.138.140.246', status: 'Distributed' },
        { hostIp: '159.138.140.247', status: 'Distributed' },
        { hostIp: '159.138.140.248', status: 'Distributed' }
      ],
      'tenant': '7269638e-5637-4b8c-8178-b5112ba7b69b',
      'appId': '3a1fcdff6b2249919028621dc1d1a1a9'
    }
  ]
}

const instanceData = function () {
  let response = []
  let obj =
    {
      appDescriptor: 'heheh',
      appId: '069924b741724d31b86c8fdb9d1418ea',
      appInstanceId: 'd02223aa-215d-4f4f-a534-71c39d8caf92',
      appName: 'test',
      appPackageId: 'cb6dd64b20a64ba6b7b1b6991f136545',
      applcmHost: '159.138.30.89',
      mecHost: '159.138.30.89',
      operationInfo: '',
      operationalStatus: 'Create failed'
    }

  for (let i = 0; i < 15; i++) {
    response.push(obj)
  }
  return {
    response
  }
}

const applcmData = function () {
  return [
    {
      'ip': '119.8.125.174',
      'port': '30101',
      'managedMecHost': null,
      'username': 'wenson',
      'password': '######',
      'tenantId': '7269638e-5637-4b8c-8178-b5112ba7b69b'
    },
    { 'ip': '159.138.140.246',
      'port': '30101',
      'managedMecHost': null,
      'username': '',
      'password': '',
      'tenantId': '7269638e-5637-4b8c-8178-b5112ba7b69b'
    }
  ]
}

const appstoreData = function () {
  return [
    { 'url': 'https://appstore.edgegallery.com',
      'username': 'wenson',
      'password': '######',
      'appstorename': 'huaweiappstore',
      'producer': 'huawei',
      'time': '01-09-2020 09:04:04',
      'tenantId': '7269638e-5637-4b8c-8178-b5112ba7b69b'
    }
  ]
}

const alarmData = function () {
  let alarm = {
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
  return alarm
}

Mock.mock('/mock/login', userData)
Mock.mock('/mock/mechosts', hostData)
Mock.mock('/mock/appPackageList', packageData)
Mock.mock('/mock/appDistributionList', distributionData)
Mock.mock('/mock/appInstanceList', instanceData)
Mock.mock('/mock/applcms', applcmData)
Mock.mock('/mock/appstores', appstoreData)
Mock.mock('/mock/alarmData', alarmData)
