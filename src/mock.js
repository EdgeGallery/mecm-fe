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
const Mock = require('mockjs')
const userData = function () {
  return {
    'userId': '######',
    'userName': '******',
    'isSecureBackend': 'true',
    'loginPage': '',
    'accessToken': '######',
    'authorities': ['ROLE_MECM_ADMIN']
  }
}

const hostData = function () {
  return [
    {
      'mechostIp': '127.0.1.0',
      'mechostName': 'vmde',
      'zipCode': '',
      'city': '陕西省/西安市/雁塔区',
      'address': '华为基地',
      'affinity': 'X86',
      'userName': '',
      'mepmIp': '127.0.1.0',
      'coordinates': '108.8348,34.1995',
      'hwcapabilities': [ ],
      'vim': 'OpenStack',
      'configUploadStatus': 'Uploaded'
    },
    {
      'mechostIp': '127.0.1.2',
      'mechostName': 'vmde',
      'zipCode': '',
      'city': '陕西省/西安市/雁塔区',
      'address': '华为基地',
      'affinity': 'X86',
      'userName': '',
      'mepmIp': '127.0.1.0',
      'coordinates': '108.8348,34.1995',
      'hwcapabilities': [ ],
      'vim': 'OpenStack',
      'configUploadStatus': 'Uploaded'
    },
    {
      'mechostIp': '127.0.1.2',
      'mechostName': 'vmde',
      'zipCode': '',
      'city': 'Bangalore, India',
      'address': '华为',
      'affinity': 'X86',
      'userName': '',
      'mepmIp': '127.0.1.0',
      'coordinates': '77.5946,12.9716',
      'hwcapabilities': [ ],
      'vim': 'OpenStack',
      'configUploadStatus': 'Uploaded'
    },
    {
      'mechostIp': '127.0.1.2',
      'mechostName': 'vmde',
      'zipCode': '',
      'city': 'Chatswood, Australia',
      'address': '华为',
      'affinity': 'X86',
      'userName': '',
      'mepmIp': '127.0.1.0',
      'coordinates': '151.1833300,-33.8000000',
      'hwcapabilities': [ ],
      'vim': 'OpenStack',
      'configUploadStatus': 'Uploaded'
    },
    {
      'mechostIp': '127.0.1.2',
      'mechostName': 'vmde',
      'zipCode': '',
      'city': 'Cupertino, USA',
      'address': '华为',
      'affinity': 'X86',
      'userName': '',
      'mepmIp': '127.0.1.0',
      'coordinates': '-122.0322,37.3230',
      'hwcapabilities': [ ],
      'vim': 'OpenStack',
      'configUploadStatus': 'Uploaded'
    },
    {
      'mechostIp': '127.0.1.2',
      'mechostName': 'vmde',
      'zipCode': '',
      'city': 'Addis Ababa, Ethiopia',
      'address': '华为',
      'affinity': 'X86',
      'userName': '',
      'mepmIp': '127.0.1.0',
      'coordinates': '38.7578,8.9806',
      'hwcapabilities': [ ],
      'vim': 'OpenStack',
      'configUploadStatus': 'Uploaded'
    },
    {
      'mechostIp': '127.0.1.2',
      'mechostName': 'vmde',
      'zipCode': '',
      'city': ' SOUTH OAK WAY, UK',
      'address': '华为',
      'affinity': 'X86',
      'userName': '',
      'mepmIp': '127.0.1.0',
      'coordinates': '0.5927,51.2511',
      'hwcapabilities': [ ],
      'vim': 'OpenStack',
      'configUploadStatus': 'Uploaded'
    }
  ]
}

const checkHealth = function () {
  return [
    {
      checkedIp: '127.0.1.2',
      condition: false
    }, {
      checkedIp: '127.0.1.0',
      condition: true
    }
  ]
}

const packageData = function () {
  let data = [
    {
      'appId': '3741feeeb24c45e9a550799fb5ab1a89',
      'packageId': '848a11ee4c524304b7a8b2bfc5c95a8d',
      'name': 'location',
      'appstoreEndpoint': '119.8.63.144:30099',
      'size': '9784',
      'version': 'v1.2',
      'type': 'Video Application',
      'affinity': 'X86',
      'industry': 'Smart Park',
      'contact': null,
      'userId': '39937079-99fe-4cd8-881f-04ca8c4fe09d',
      'userName': 'admin',
      'status': 'Published',
      'shortDesc': 'location',
      'testTaskId': '7e407f18-9010-4111-811b-8d8b931ba100',
      'provider': 'HUAWEI',
      'syncStatus': 'IN_SYNC',
      'appstoreName': 'appstore1',
      'createTime': '2021-07-01T11:42:15.754',
      'updateTime': '2021-07-01T11:42:15.962',
      'operationalInfo': 'success'
    }
  ]
  return data
}

const instanceList = function () {
  return {
    'response': [
      {
        'appInstanceId': '79sjkdnfk89h',
        'appPackageId': 'jshdfk687sydfhi87syfin',
        'appName': 'zone',
        'appId': '73b6f66992ab4798a55350f419a210af',
        'appDescriptor': 'zone',
        'mecHost': '127.0.0.1',
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
  let data = { 'data': { 'cpuusage': { 'total': 354819894, 'used': 106112506 }, 'memusage': { 'total': 10656432, 'used': 9098832 } } }
  return data
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
    'appId': '3741feeeb24c45e9a550799fb5ab1a89',
    'mecHostInfo': [
      { 'hostIp': '127.0.0.1', 'status': 'Distributed', 'error': '' },
      { 'hostIp': '127.0.0.1', 'status': 'Distributed', 'error': '' },
      { 'hostIp': '127.0.0.1', 'status': 'Distributed', 'error': '' }
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
        'ipAddress': '127.0.0.1',
        'ttl': 86400
      },
      {
        'dnsRuleId': 'DNS25841',
        'domainName': 'domainname',
        'ipAddressType': 'IP_V4',
        'ipAddress': '127.0.0.1',
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
              '127.0.0.1',
              '127.0.0.1'
            ],
            'srcPort': [
              '443',
              '1234'
            ],
            'dstAddress': [
              '127.0.0.1'
            ],
            'dstPort': [
              '443',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '127.0.0.1'
            ],
            'dstTunnelAddress': [
              '127.0.0.1'
            ],
            'srcTunnelPort': [
              '443'
            ],
            'dstTunnelPort': [
              '443'
            ],
            'qCI': 1,
            'dSCP': 0,
            'tC': 1
          },
          {
            'srcAddress': [
              '127.0.0.1',
              '127.0.0.1'
            ],
            'srcPort': [
              '443',
              '1234'
            ],
            'dstAddress': [
              '127.0.0.1'
            ],
            'dstPort': [
              '443',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '127.0.0.1'
            ],
            'dstTunnelAddress': [
              '127.0.0.1'
            ],
            'srcTunnelPort': [
              '443'
            ],
            'dstTunnelPort': [
              '443'
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
              'tunnelDstAddress': '127.0.0.1',
              'tunnelSrcAddress': '127.0.0.1',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:da:da:da:da:da',
            'dstMacAddress': 'da:da:da:da:da:da',
            'dstIpAddress': '127.0.0.1'
          },
          {
            'interfaceType': 'tunnel',
            'tunnelInfo': {
              'tunnelType': 'tunneltype',
              'tunnelDstAddress': '127.0.0.1',
              'tunnelSrcAddress': '127.0.0.1',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:da:da:da:da:da',
            'dstMacAddress': 'da:da:da:da:da:da',
            'dstIpAddress': '127.0.0.1'
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
              '127.0.0.1',
              '127.0.0.1'
            ],
            'srcPort': [
              '443',
              '1234'
            ],
            'dstAddress': [
              '127.0.0.1'
            ],
            'dstPort': [
              '443',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '127.0.0.1'
            ],
            'dstTunnelAddress': [
              '127.0.0.1'
            ],
            'srcTunnelPort': [
              '443'
            ],
            'dstTunnelPort': [
              '443'
            ],
            'qCI': 1,
            'dSCP': 0,
            'tC': 1
          },
          {
            'srcAddress': [
              '127.0.0.1',
              '127.0.0.1'
            ],
            'srcPort': [
              '443',
              '1234'
            ],
            'dstAddress': [
              '127.0.0.1'
            ],
            'dstPort': [
              '443',
              '1234'
            ],
            'protocol': [
              'ICMP'
            ],
            'tag': [
              'tag'
            ],
            'srcTunnelAddress': [
              '127.0.0.1'
            ],
            'dstTunnelAddress': [
              '127.0.0.1'
            ],
            'srcTunnelPort': [
              '443'
            ],
            'dstTunnelPort': [
              '443'
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
              'tunnelDstAddress': '127.0.0.1',
              'tunnelSrcAddress': '127.0.0.1',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:da:da:da:da:da',
            'dstMacAddress': 'da:da:da:da:da:da',
            'dstIpAddress': '127.0.0.1'
          },
          {
            'interfaceType': 'tunnel',
            'tunnelInfo': {
              'tunnelType': 'tunneltype',
              'tunnelDstAddress': '127.0.0.1',
              'tunnelSrcAddress': '127.0.0.1',
              'tunnelSpecificData': 'some data'
            },
            'srcMacAddress': 'da:da:da:da:da:da',
            'dstMacAddress': 'da:da:da:da:da:da',
            'dstIpAddress': '127.0.0.1'
          }
        ]
      }
    ],
    'appName': 'appname',
    'appSupportMp1': true
  }
}

const mepmData = function () {
  return [
    {
      'mepmIp': '127.0.0.1',
      'mepmName': 'MEPM',
      'mepmPort': '30101',
      'userName': 'Xxx'
    }, {
      'mepmIp': '127.0.0.1',
      'mepmName': 'MEPM',
      'mepmPort': '30101',
      'userName': 'Xxx'
    }
  ]
}

const appstoreData = function () {
  return [
    {
      'appstoreIp': '127.0.0.1',
      'appstorePort': '443',
      'appstoreName': 'appstore1',
      'appstoreRepoName': 'appstore',
      'appstoreRepo': '127.0.0.1:443',
      'appstoreRepoUserName': 'a',
      'appstoreRepoPassword': 'b',
      'producer': 'hw'
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
    ],
    'cpupercent': 0.0005,
    'mempercent': 0.0015716552738034295
  }
  return { response: JSON.stringify(data) }
}

const pacList = function () {
  let data = [

  ]
  return data
}

Mock.mock('/mock/login', userData)
Mock.mock('/mock/mechosts', hostData)
Mock.mock('/mock/appPackageList', packageData)
Mock.mock('/mock/appDistributionList', distributionData)
Mock.mock('/mock/mepms', mepmData)
Mock.mock('/mock/appstores', appstoreData)
Mock.mock('/mock/seviceInfo', serviceInfoData)
Mock.mock('/mock/instanceInfo', instanceList)
Mock.mock('/mock/packageInfo', packageInfo)
Mock.mock('/mock/kpiInfo', kpiInfo)
Mock.mock('/mock/getHwCapability', hwCapability)
Mock.mock('/mock/getSwCapability', swCapability)
Mock.mock('/mock/getConfigRules', appRuleData)
Mock.mock('/mock/appPackagefromAppstoreList', pacList)
Mock.mock('/mock/getNodeStatus', checkHealth)
