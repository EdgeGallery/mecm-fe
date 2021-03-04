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
      address: '4/4.1/114.059448,22.653555',
      affinity: 'X86',
      applcmIp: '119.8.63.144',
      appRuleIp: '119.8.47.2',
      city: '北京市/海淀区/中国信通院',
      edgerepoIp: '119.8.47.2',
      edgerepoName: null,
      edgerepoPort: '1234',
      edgerepoUsername: '',
      mechostIp: '119.8.63.144',
      mechostName: 'Node',
      coordinates: '116.35,39.979508',
      userName: '',
      zipCode: '',
      appRuleManagerIp: '119.8.47.2',
      capability: 'GPU',
      hwcapabilities: [{
        'hwType': 'GPU',
        'hwVendor': 'gpu',
        'hwModel': 'gpu'
      },
      {
        'hwType': 'NPU',
        'hwVendor': 'npu',
        'hwModel': 'npu'
      }]
    },
    {
      address: '2/2.1/118.822617,31.871027',
      affinity: 'X86',
      applcmIp: '119.8.47.2',
      appRuleIp: '119.8.47.2',
      city: '江苏省/南京市/紫金山实验室',
      edgerepoIp: '119.8.47.2',
      edgerepoName: null,
      edgerepoPort: '1234',
      edgerepoUsername: '',
      mechostIp: '119.8.47.2',
      coordinates: '118.82832,31.876148',
      mechostName: 'Node',
      userName: '',
      zipCode: '',
      capability: 'GPU',
      hwcapabilities: [{
        'hwType': 'GPU',
        'hwVendor': 'gpu',
        'hwModel': 'gpu'
      },
      {
        'hwType': 'NPU',
        'hwVendor': 'npu',
        'hwModel': 'npu'
      }]
    },
    {
      address: '4/4.1/114.059448,22.653555',
      affinity: 'X86',
      applcmIp: '119.8.63.144',
      appRuleIp: '119.8.47.2',
      city: '北京市/海淀区/中国信通院',
      edgerepoIp: '119.8.47.2',
      edgerepoName: null,
      edgerepoPort: '1234',
      edgerepoUsername: '',
      mechostIp: '119.8.63.144',
      mechostName: 'Node',
      coordinates: '116.35,39.979508',
      userName: '',
      zipCode: '',
      appRuleManagerIp: '119.8.47.2',
      capability: 'GPU',
      hwcapabilities: [{
        'hwType': 'GPU',
        'hwVendor': 'gpu',
        'hwModel': 'gpu'
      },
      {
        'hwType': 'NPU',
        'hwVendor': 'npu',
        'hwModel': 'npu'
      }]
    },
    {
      address: '2/2.1/118.822617,31.871027',
      affinity: 'X86',
      applcmIp: '119.8.47.2',
      appRuleIp: '119.8.47.2',
      city: '江苏省/南京市/紫金山实验室',
      edgerepoIp: '119.8.47.2',
      edgerepoName: null,
      edgerepoPort: '1234',
      edgerepoUsername: '',
      mechostIp: '119.8.47.2',
      coordinates: '118.82832,31.876148',
      mechostName: 'Node',
      userName: '',
      zipCode: '',
      capability: 'GPU',
      hwcapabilities: [{
        'hwType': 'GPU',
        'hwVendor': 'gpu',
        'hwModel': 'gpu'
      },
      {
        'hwType': 'NPU',
        'hwVendor': 'npu',
        'hwModel': 'npu'
      }]
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
    userName: 'Xxx'
  }]
}

const instanceList = function () {
  return {
    'response': [
      {
        'appInstanceId': '4b6944f1-655c-4f77-9e86-c0c4eb629c9c',
        'appPackageId': '9eb381e222dd4a3898fc61f7182bba24',
        'appName': 'zone',
        'appId': '73b6f66992ab4798a55350f419a210af',
        'appDescriptor': 'zone',
        'mecHost': '119.8.47.2',
        'applcmHost': '119.8.47.2',
        'operationalStatus': 'Instantiated',
        'operationInfo': 'success'
      }
    ]
  }
}

const swCapability = function () {
  return { 'response': '[{"capabilityId":"e56e5731576e243ecf62dcda9b7ba470","capabilityName":"ExampleService10","status":"ACTIVE","version":"1.0.1","consumers":[]},{"capabilityId":"e56e5731576e243ecf62dcda9b7ba470","capabilityName":"ExampleService10","status":"ACTIVE","version":"1.0.1","consumers":[]},{"capabilityId":"e56e5731576e243ecf62dcda9b7ba470","capabilityName":"ExampleService10","status":"ACTIVE","version":"1.0.1","consumers":[]},{"capabilityId":"e56e5731576e243ecf62dcda9b7ba470","capabilityName":"ExampleService10","status":"ACTIVE","version":"1.0.1","consumers":[]},{"capabilityId":"e56e5731576e243ecf62dcda9b7ba470","capabilityName":"ExampleService10","status":"ACTIVE","version":"1.0.1","consumers":[]},{"capabilityId":"e56e5731576e243ecf62dcda9b7ba470","capabilityName":"ExampleService10","status":"ACTIVE","version":"1.0.1","consumers":[]},{"capabilityId":"e56e5731576e243ecf62dcda9b7ba470","capabilityName":"ExampleService10","status":"ACTIVE","version":"1.0.1","consumers":[]}]\n' }
}

const kpiInfo = function () {
  let data = {
    'cpuusage': { 'total': 1600653686.904, 'used': '0.68' },
    'memusage': { 'total': 1600653686.906, 'used': '0.004406774826102075' },
    'diskusage': { 'total': '0.0', 'used': '0.0' }
  }
  return {
    response: JSON.stringify(data)
  }
}

const hwCapability = function () {
  return {
    hwcapabilities: [{
      'hwType': 'GPU',
      'hwVendor': 'gpu',
      'hwModel': 'gpu'
    },
    {
      'hwType': 'NPU',
      'hwVendor': 'npu',
      'hwModel': 'npu'
    }]
  }
}

const packageInfo = function () {
  return {
    'packageId': '9eb381e222dd4a3898fc61f7182bba24',
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
    'mecHostInfo': [
      { 'hostIp': '119.8.47.2', 'status': 'Distributed', 'error': '' },
      { 'hostIp': '119.8.53.4', 'status': 'Distributed', 'error': '' },
      { 'hostIp': '119.8.53.5', 'status': 'Distributed', 'error': '' }
    ]
  },
  {
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
    'mecHostInfo': [
      { 'hostIp': '119.8.47.2', 'status': 'Distributed', 'error': '' },
      { 'hostIp': '119.8.53.4', 'status': 'Distributed', 'error': '' },
      { 'hostIp': '119.8.53.5', 'status': 'Error', 'error': '' }
    ]
  }]
}

const appRuleData = function () {
  return {
    'appDNSRule': [
      {
        'dnsRuleId': 'DNS25841',
        'domainName': 'domainname',
        'ipAddressType': 'IP_V4',
        'ipAddress': '1.1.1.1',
        'ttl': 86400
      },
      {
        'dnsRuleId': 'DNS25841',
        'domainName': 'domainname',
        'ipAddressType': 'IP_V4',
        'ipAddress': '1.1.1.1',
        'ttl': 86400
      }
    ],
    'appTrafficRule': [
      {
        'trafficRuleId': 'TrafficRule1',
        'filterType': 'FLOW',
        'priority': 1,
        'action': 'DROP',
        'trafficFilter': [
          {
            'srcAddress': [
              '192.168.1.1',
              '1.1.1.1'
            ],
            'srcPort': [
              '8080',
              '1234'
            ],
            'dstAddress': [
              '192.168.1.1'
            ],
            'dstPort': [
              '8080',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '1.1.1.1'
            ],
            'dstTunnelAddress': [
              '2.2.2.2'
            ],
            'srcTunnelPort': [
              '8080'
            ],
            'dstTunnelPort': [
              '8080'
            ],
            'qCI': 1,
            'dSCP': 0,
            'tC': 1
          },
          {
            'srcAddress': [
              '192.168.1.1',
              '1.1.1.1'
            ],
            'srcPort': [
              '8080',
              '1234'
            ],
            'dstAddress': [
              '192.168.1.1'
            ],
            'dstPort': [
              '8080',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '1.1.1.1'
            ],
            'dstTunnelAddress': [
              '2.2.2.2'
            ],
            'srcTunnelPort': [
              '8080'
            ],
            'dstTunnelPort': [
              '8080'
            ],
            'qCI': 1,
            'dSCP': 0,
            'tC': 1
          }
        ],
        'dstInterface': [
          {
            'interfaceType': 'tunnel',
            'tunnelInfo': {
              'tunnelType': 'tunneltype',
              'tunnelDstAddress': '1.1.1.1',
              'tunnelSrcAddress': '2.2.2.2',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:07:39:28:e1:4f',
            'dstMacAddress': 'da:07:39:28:e1:4f',
            'dstIpAddress': '3.3.3.3'
          },
          {
            'interfaceType': 'tunnel',
            'tunnelInfo': {
              'tunnelType': 'tunneltype',
              'tunnelDstAddress': '1.1.1.1',
              'tunnelSrcAddress': '2.2.2.2',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:07:39:28:e1:4f',
            'dstMacAddress': 'da:07:39:28:e1:4f',
            'dstIpAddress': '3.3.3.3'
          }
        ]
      },
      {
        'trafficRuleId': 'TrafficRule1',
        'filterType': 'FLOW',
        'priority': 1,
        'action': 'DROP',
        'trafficFilter': [
          {
            'srcAddress': [
              '192.168.1.1',
              '1.1.1.1'
            ],
            'srcPort': [
              '8080',
              '1234'
            ],
            'dstAddress': [
              '192.168.1.1'
            ],
            'dstPort': [
              '8080',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '1.1.1.1'
            ],
            'dstTunnelAddress': [
              '2.2.2.2'
            ],
            'srcTunnelPort': [
              '8080'
            ],
            'dstTunnelPort': [
              '8080'
            ],
            'qCI': 1,
            'dSCP': 0,
            'tC': 1
          },
          {
            'srcAddress': [
              '192.168.1.1',
              '1.1.1.1'
            ],
            'srcPort': [
              '8080',
              '1234'
            ],
            'dstAddress': [
              '192.168.1.1'
            ],
            'dstPort': [
              '8080',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '1.1.1.1'
            ],
            'dstTunnelAddress': [
              '2.2.2.2'
            ],
            'srcTunnelPort': [
              '8080'
            ],
            'dstTunnelPort': [
              '8080'
            ],
            'qCI': 1,
            'dSCP': 0,
            'tC': 1
          }
        ],
        'dstInterface': [
          {
            'interfaceType': 'tunnel',
            'tunnelInfo': {
              'tunnelType': 'tunneltype',
              'tunnelDstAddress': '1.1.1.1',
              'tunnelSrcAddress': '2.2.2.2',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:07:39:28:e1:4f',
            'dstMacAddress': 'da:07:39:28:e1:4f',
            'dstIpAddress': '3.3.3.3'
          },
          {
            'interfaceType': 'tunnel',
            'tunnelInfo': {
              'tunnelType': 'tunneltype',
              'tunnelDstAddress': '1.1.1.1',
              'tunnelSrcAddress': '2.2.2.2',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:07:39:28:e1:4f',
            'dstMacAddress': 'da:07:39:28:e1:4f',
            'dstIpAddress': '3.3.3.3'
          }
        ]
      }
    ],
    'appName': 'appname',
    'appSupportMp1': true
  }
}

const applcmData = function () {
  return [
    {
      'applcmIp': '119.8.125.174',
      'applcmName': 'APPLCM',
      'applcmPort': '30101',
      'userName': 'Xxx'
    }
  ]
}

const apprulemanagersData = function () {
  return [
    {
      'appRuleIp': '119.8.125.174',
      'appRuleName': 'MGR1',
      'appRulePort': '30206',
      'userName': 'Xxx'
    }
  ]
}

const appstoreData = function () {
  return [
    { 'appstoreIp': '119.8.63.144', 'appstorePort': '30099', 'appstoreName': 'appstore', 'appstoreRepoName': 'appstorerepo', 'appstoreRepo': '119.8.63.144:443', 'appstoreRepoUserName': 'admin', 'appstoreRepoPassword': 'Harbor@12345', 'producer': 'huawei' }
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

Mock.mock('/mock/login', userData)
Mock.mock('/mock/mechosts', hostData)
Mock.mock('/mock/appPackageList', packageData)
Mock.mock('/mock/appDistributionList', distributionData)
Mock.mock('/mock/applcms', applcmData)
Mock.mock('/mock/apprulemanagers', apprulemanagersData)
Mock.mock('/mock/appstores', appstoreData)
Mock.mock('/mock/seviceInfo', serviceInfoData)
Mock.mock('/mock/instanceInfo', instanceList)
Mock.mock('/mock/packageInfo', packageInfo)
Mock.mock('/mock/kpiInfo', kpiInfo)
Mock.mock('/mock/getHwCapability', hwCapability)
Mock.mock('/mock/getSwCapability', swCapability)
Mock.mock('/mock/getConfigRules', appRuleData)
