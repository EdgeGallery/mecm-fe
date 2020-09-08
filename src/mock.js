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
      'ip': '119.8.125.174',
      'hostname': '119.8.125.174',
      'zipcode': '',
      'city': '北京市/北京市/东城区/景山街道',
      'address': 'Beijing',
      'affinity': 'X86',
      'username': '',
      'password': '',
      'edgeName': null,
      'edgeNexusIp': '119.8.125.174',
      'edgeNexusPort': '119.8.125.174',
      'edgeNexusUsername': '119.8.125.174',
      'edgeNexusPassword': '119.8.125.174',
      'tenantId': '7269638e-5637-4b8c-8178-b5112ba7b69b',
      'appLcmIp': '119.8.125.174',
      'k8sURL': ''
    }
  ]
}

const appData = function () {
  return [
    {
      'appInstanceId': '2781e05a-cf90-4c26-a88e-958e2c341ae9',
      'appPackageId': 'd5a8f47c498f4a9bab8f07f3da592d64',
      'tenant': '7269638e-5637-4b8c-8178-b5112ba7b69b',
      'appName': 'p1',
      'appDescr': '',
      'mecHost': '119.8.125.174',
      'workLoadId': 'positioningservice',
      'appLcmHost': '119.8.125.174',
      'operationalStatus': 'Instantiated',
      'info': 'Deployed',
      'appId': '64734976e87048a98bbb9496bc70d686'
    }
  ]
}

const packageData = function () {
  return [
    {
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
    },
    {
      affinity: 'x86',
      appId: '3a1fcdff6b2249919028621dc1d1a1a8',
      contact: null,
      createTime: '2020-08-27 11:35:14.969237',
      details: 'template_service↵===↵This repo is used for develop app based on osdt mep↵',
      downloadCount: 2,
      iconUrl: null,
      industry: 'Smart Park',
      name: 'testapp',
      provider: 'Huawei',
      score: 5,
      shortDesc: 'test8',
      type: 'Video Application',
      userId: '7269638e-5637-4b8c-8178-b5112ba7b69b',
      userName: 'wenson'
    },
    {
      affinity: 'x86',
      appId: '3a1fcdff6b2249919028621dc1d1a1a9',
      contact: null,
      createTime: '2020-08-27 11:35:14.969237',
      details: 'template_service↵===↵This repo is used for develop app based on osdt mep↵',
      downloadCount: 2,
      iconUrl: null,
      industry: 'Smart Park',
      name: 'testapp',
      provider: 'Huawei',
      score: 5,
      shortDesc: 'test9',
      type: 'Video Application',
      userId: '7269638e-5637-4b8c-8178-b5112ba7b69b',
      userName: 'wenson'
    }
  ]
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

Mock.mock('/mock/login', userData)
Mock.mock('/mock/mechosts', hostData)
Mock.mock('/mock/appInstanceList', appData)
Mock.mock('/mock/appPackageList', packageData)
Mock.mock('/mock/appDistributionList', distributionData)
Mock.mock('/mock/applcms', applcmData)
Mock.mock('/mock/appstores', appstoreData)
