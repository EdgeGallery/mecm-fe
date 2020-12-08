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

const NavDataCn = [
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
        'id': '2.2.1',
        'name': '应用包管理',
        'path': '/mecm/apac/list',
        'pageId': '2.0.1.1',
        'display': false
      },
      {
        'id': '2.2.3',
        'name': '应用实例管理',
        'path': '/mecm/ains/list',
        'pageId': '2.0.1.3',
        'display': false
      }
    ]
  },
  {
    'id': '2.3',
    'name': '边缘节点',
    'path': '/mecm/node/list',
    'pageId': '2.0.2',
    'display': false
  },
  {
    'id': '2.4',
    'name': '系统',
    'path': '/mecm/systems',
    'pageId': '2.0.3',
    'display': false,
    'children': [
      {
        'id': '2.4.1',
        'name': '外部系统管理',
        'path': '/mecm/systems/external',
        'pageId': '2.0.3.1',
        'display': false,
        children: [
          {
            'id': '2.4.1.1',
            'name': 'App LCM注册系统',
            'path': '/mecm/systems/external/applcm',
            'pageId': '2.0.3.1.1',
            'display': false
          },
          {
            'id': '2.4.1.4',
            'name': 'App Rule MGR 注册系统',
            'path': '/mecm/systems/external/apprule',
            'pageId': '2.0.3.1.4',
            'display': false
          },
          {
            'id': '2.4.1.2',
            'name': '边缘节点注册系统',
            'path': '/mecm/systems/external/edgenodes',
            'pageId': '2.0.3.1.2',
            'display': false
          },
          {
            'id': '2.4.1.3',
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

export default NavDataCn
