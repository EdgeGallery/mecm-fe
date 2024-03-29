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
import VueI18n from 'vue-i18n'
import en from './en.js'
import cn from './cn.js'
import locale from 'element-ui/lib/locale'
Vue.use(VueI18n)
const messages = {
  en: en,
  cn: cn
}

const i18n = new VueI18n({
  locale: 'cn',
  messages
})
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
