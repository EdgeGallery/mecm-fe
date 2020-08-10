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

const HttpProxyAgent = require('http-proxy-agent')
module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/sysApi': {
        target: 'http://159.138.63.8:30105',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/sysApi': '/'
        }
      },
      '/mecmApi': {
        target: 'http://159.138.63.8:30107',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/mecmApi': '/'
        }
      },
      '/meoApi': {
        target: 'http://159.138.63.8:30108',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/meoApi': '/'
        }
      },
      '/infoApi': {
        target: 'http://159.138.63.8:30106',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/infoApi': '/'
        }
      },
      '/mec-appstore': {
        target: 'http://mec-appstore',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/mec-appstore': '/'
        }
      },
      '/user-mgmt-be': {
        target: 'http://user-mgmt-be',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/user-mgmt-be': '/'
        }
      },
      '/mecm-esr': {
        target: 'http://mecm-esr',
        agent: new HttpProxyAgent('http://127.0.0.1:8082'),
        changeOrigin: true,
        pathRewrite: {
          '^/mecm-esr': '/'
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
