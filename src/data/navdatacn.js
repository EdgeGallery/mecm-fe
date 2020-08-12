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

const mecm = [
  {
    'id': '2.1',
    'icon': '',
    'name': '概述',
    'path': '/',
    'pageId': '2.0',
    'display': false
  },
  {
    'id': '2.2',
    'name': '应用管理',
    'path': '/mecm/app/pakage',
    'pageId': '2.0.1',
    'display': false,
    'children': [
      {
        'id': '2.3',
        'name': '应用包列表',
        'path': '/mecm/apac/list',
        'pageId': '2.0.1.1',
        'display': false
      },
      {
        'id': '2.4',
        'name': '应用包分发',
        'path': '/mecm/edge/list',
        'pageId': '2.0.1.2',
        'display': false
      },
      {
        'id': '2.5',
        'name': '应用实例',
        'path': '/mecm/ains/list',
        'pageId': '2.0.1.3',
        'display': false
      }
    ]
  },
  {
    'id': '2.6',
    'name': '边缘节点',
    'path': '/mecm/host/list',
    'pageId': '2.0.2',
    'display': false,
    children: [
      {
        'id': '2.7',
        'name': '边缘节点列表',
        'path': '/mecm/node/list',
        'pageId': '2.0.2.1',
        'display': false
      },
      {
        'id': '2.8',
        'name': 'MEP列表',
        'path': '/mecm/mep/list',
        'pageId': '2.0.2.2',
        'display': false
      }
    ]
  },
  {
    'id': '2.9',
    'name': '系统',
    'path': '/mecm/systems',
    'pageId': '2.0.3',
    'display': false,
    'children': [
      {
        'id': '2.10',
        'name': '外部系统管理',
        'path': '/mecm/systems/external',
        'pageId': '2.0.3.1',
        'display': false,
        children: [
          {
            'id': '2.11',
            'name': 'APP LCM注册系统',
            'path': '/mecm/systems/external/applcm',
            'pageId': '2.0.3.1.1',
            'display': false
          },
          {
            'id': '2.12',
            'name': '边缘节点注册系统',
            'path': '/mecm/systems/external/edgenodes',
            'pageId': '2.0.3.1.2',
            'display': false
          },
          {
            'id': '2.13',
            'name': '应用市场注册系统',
            'path': '/mecm/systems/external/store',
            'pageId': '2.0.3.1.3',
            'display': false
          }
        ]
      }
    ]
  }
]

export default mecm