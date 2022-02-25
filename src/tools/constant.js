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

const PROXY_PREFIX_CURRENTSERVER = window.location.pathname.slice(0, window.location.pathname.length - 1)
const PORT_CURRENTSERVER = '30093'
const DOMAIN_CURRENTSERVER = 'mecm'

const PLATFORMNAME_EG = 'EG'

const PROXY_PREFIX_USERMGMT = '/edgegallery/usermgmt'

const PLATFORM_LIST = [
  {
    name: PLATFORMNAME_EG,
    port: '30095',
    domain: 'edgegallery',
    proxyPrefix: '/edgegallery/web'
  }
]

const INDUSTRY = [
  {
    label: ['智慧园区', 'Smart Park'],
    value: 'Smart Park',
    selected: false,
    type: 'industry'
  },
  {
    label: ['智慧商超', 'Smart Supermarket'],
    value: 'Smart Supermarket',
    selected: false,
    type: 'industry'
  },
  {
    label: ['工业制造', 'Industrial Manufacturing'],
    value: 'Industrial Manufacturing',
    selected: false,
    type: 'industry'
  },
  {
    label: ['交通物流', 'Transportation Logistics'],
    value: 'Transportation Logistics',
    selected: false,
    type: 'industry'
  },
  {
    label: ['水利', 'Water Conservancy'],
    value: 'Water Conservancy',
    selected: false,
    type: 'industry'
  },
  {
    label: ['游戏竞技', 'Game Competition'],
    value: 'Game Competition',
    selected: false,
    type: 'industry'
  },
  {
    label: ['开源', 'Open Source'],
    value: 'Open Source',
    selected: false,
    type: 'industry'
  },
  {
    label: ['其他', 'Other'],
    value: 'Other',
    selected: false,
    type: 'industry'
  }
]

const TYPESFORAPP = [
  {
    label: ['视频应用', 'Video Application'],
    value: 'Video Application',
    selected: false,
    type: 'types'
  },
  {
    label: ['游戏', 'Game'],
    value: 'Game',
    selected: false,
    type: 'types'
  },
  {
    label: ['视频监控', 'Video Surveillance'],
    value: 'Video Surveillance',
    selected: false,
    type: 'types'
  },
  {
    label: ['安全', 'Safety'],
    value: 'Safety',
    selected: false,
    type: 'types'
  },
  {
    label: ['区块链', 'Blockchain'],
    value: 'Blockchain',
    selected: false,
    type: 'types'
  },
  {
    label: ['智能设备', 'Smart Device'],
    value: 'Smart Device',
    selected: false,
    type: 'types'
  },
  {
    label: ['物联网', 'Internet of Things'],
    value: 'Internet of Things',
    selected: false,
    type: 'types'
  },
  {
    label: ['大数据', 'Big Data'],
    value: 'Big Data',
    selected: false,
    type: 'types'
  },
  {
    label: ['AR/VR', 'AR/VR'],
    value: 'AR/VR',
    selected: false,
    type: 'types'
  },
  {
    label: ['API', 'API'],
    value: 'API',
    selected: false,
    type: 'types'
  },
  {
    label: ['SDK', 'SDK'],
    value: 'SDK',
    selected: false,
    type: 'types'
  },
  {
    label: ['MEP', 'MEP'],
    value: 'MEP',
    selected: false,
    type: 'types'
  }
]

const TYPES = [
  {
    label: 'Video',
    value: 'Video'
  },
  {
    label: 'Game',
    value: 'Game'
  },
  {
    label: 'Video Surveillance',
    value: 'Video Surveillance'
  },
  {
    label: 'AR',
    value: 'AR'
  },
  {
    label: 'Calculate',
    value: 'Calculate'
  },
  {
    label: 'MEP',
    value: 'MEP'
  }
]

const AFFINITY = [
  {
    label: 'X86',
    value: 'X86'
  },
  {
    label: 'ARM64',
    value: 'ARM64'
  },
  {
    label: 'ARM32',
    value: 'ARM32'
  }
]

const SORT_BY = [
  {
    label: 'Most',
    value: 'Most'
  },
  {
    label: 'Name',
    value: 'Name'
  },
  {
    label: 'Score',
    value: 'Score'
  }
]

const IMAGESTATUS = [
  {
    labelcn: '未瘦身',
    labelen: 'No Slim',
    value: 0
  },
  {
    labelcn: '瘦身中',
    labelen: 'Sliming',
    value: 1
  },
  {
    labelcn: '瘦身成功',
    labelen: 'Slim Succeed',
    value: 2
  },
  {
    labelcn: '瘦身失败',
    labelen: 'Slim Failed',
    value: 3
  }
]

export {
  PROXY_PREFIX_CURRENTSERVER,
  PROXY_PREFIX_USERMGMT,
  PLATFORM_LIST,
  PORT_CURRENTSERVER,
  DOMAIN_CURRENTSERVER,
  PLATFORMNAME_EG,
  TYPES,
  AFFINITY,
  SORT_BY,
  TYPESFORAPP,
  INDUSTRY,
  IMAGESTATUS
}
