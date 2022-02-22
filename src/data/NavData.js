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

const NavData = [
  {
    'id': '2.1',
    'icon': '',
    'name': 'Overview',
    'path': '/',
    'pageId': '2.1.1',
    'display': true
  },
  {
    'id': '2.2',
    'name': 'APP Management',
    'path': '/app/pakage',
    'pageId': '2.2.1',
    'display': true,
    'children': [
      {
        'id': '2.2.1',
        'name': 'Package Management',
        'path': '/mecm/app/package',
        'pageId': '2.2.1.1',
        'display': true
      },
      {
        'id': '2.2.2',
        'name': 'App Instance List',
        'path': '/mecm/app/instance',
        'pageId': '2.2.1.2',
        'display': true
      }
    ]
  },
  {
    'id': '2.3',
    'name': 'Edge Nodes',
    'path': '/mecm/node/index',
    'pageId': '2.3.1',
    'display': true
  },
  {
    'id': '2.4',
    'name': 'Systems',
    'path': '/systems',
    'pageId': '2.4.1',
    'display': true,
    'children': [
      {
        'id': '2.4.1',
        'name': 'MEPM',
        'path': '/mecm/system/mepm',
        'pageId': '2.4.1.1',
        'display': true
      },
      {
        'id': '2.4.2',
        'name': 'App Store',
        'path': '/mecm/system/appstore',
        'pageId': '2.4.1.2',
        'display': true
      }
    ]
  },
  {
    'id': '2.5',
    'name': 'Resource Management',
    'path': '/mecm/resource/manager',
    'pageId': '2.5.1',
    'display': true,
    'authority': ['ROLE_MECM_ADMIN']
  }
]

export default NavData
