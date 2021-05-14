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

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'overview',
      component: () => import('../pages/overview/Index.vue')
    },
    {
      path: '/mecm/app/package',
      name: 'package',
      component: () => import('../pages/app/PackageList.vue')
    }, {
      path: '/mecm/app/ruleconfig',
      name: 'rule',
      component: () => import('../pages/app/RuleConfig.vue')
    },
    {
      path: '/mecm/app/distribution',
      name: 'detail',
      component: () => import('../pages/app/PackageDetail.vue')
    },
    {
      path: '/mecm/app/instance',
      name: 'instance',
      component: () => import('../pages/app/InstanceList.vue')
    },
    {
      path: '/mecm/node/index',
      name: 'hostOverview',
      component: () => import('../pages/host/Index.vue')
    },
    {
      path: '/mecm/system/applcm',
      name: 'applcm',
      component: () => import('../pages/system/Applcm.vue')
    },
    {
      path: '/mecm/system/apprule',
      name: 'apprule',
      component: () => import('../pages/system/Apprule.vue')
    },
    {
      path: '/mecm/system/appstore',
      name: 'appstore',
      component: () => import('../pages/system/Appstore.vue')
    }
  ]
})
