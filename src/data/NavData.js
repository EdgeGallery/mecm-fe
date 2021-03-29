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
    'pageId': '2.0',
    'display': false
  },
  {
    'id': '2.2',
    'name': 'APP Management',
    'path': '/mecm/app/pakage',
    'pageId': '2.0.1',
    'display': false,
    'children': [
      {
        'id': '2.3',
        'name': 'Package Management',
        'path': '/mecm/apac/list',
        'pageId': '2.0.1.1',
        'display': false
      },
      {
        'id': '2.5',
        'name': 'App Instance List',
        'path': '/mecm/ains/list',
        'pageId': '2.0.1.3',
        'display': false
      }
    ]
  },
  {
    'id': '2.6',
    'name': 'Edge Nodes',
    'path': '/mecm/node/list',
    'pageId': '2.0.2',
    'display': false
  },
  {
    'id': '2.9',
    'name': 'Systems',
    'path': '/mecm/systems',
    'pageId': '2.0.3',
    'display': false,
    'children': [
      {
        'id': '2.11',
        'name': 'App LCM',
        'path': '/mecm/systems/external/applcm',
        'pageId': '2.0.3.1.1',
        'display': false
      },
      {
        'id': '2.14',
        'name': 'App Rule',
        'path': '/mecm/systems/external/apprule',
        'pageId': '2.0.3.1.4',
        'display': false
      },
      {
        'id': '2.12',
        'name': 'App Store',
        'path': '/mecm/systems/external/store',
        'pageId': '2.0.3.1.3',
        'display': false
      }
    ]
  }
]

export default NavData
