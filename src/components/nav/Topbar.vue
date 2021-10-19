<!--
  -  Copyright 2020-2021 Huawei Technologies Co., Ltd.
  -
  -  Licensed under the Apache License, Version 2.0 (the "License");
  -  you may not use this file except in compliance with the License.
  -  You may obtain a copy of the License at
  -
  -      http://www.apache.org/licenses/LICENSE-2.0
  -
  -  Unless required by applicable law or agreed to in writing, software
  -  distributed under the License is distributed on an "AS IS" BASIS,
  -  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  -  See the License for the specific language governing permissions and
  -  limitations under the License.
  -->

<template>
  <div
    class="main-sidebar lt"
    id="topBar"
  >
    <el-menu
      :default-active="indexName"
      :unique-opened="true"
      router
      @select="handleSelect"
      text-color="#9F85C0"
      background-color="#280B4E"
      active-text-color="#ffffff"
      mode="horizontal"
    >
      <!-- 一级菜单 -->
      <template v-for="item in jsonData">
        <el-submenu
          v-if="item.children && item.children.length"
          :index="item.path"
          :key="item.id"
          :id="item.id"
        >
          <template slot="title">
            <em :class="item.icon" /><span class="first-menu">{{ item.name }}</span>
          </template>

          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <el-submenu
              v-if="itemChild.children && itemChild.children.length"
              :index="itemChild.path"
              :key="itemChild.id"
              :id="item.id"
            >
              <template slot="title">
                <em :class="itemChild.icon" /><span class="second-menu">{{ itemChild.name }}</span>
              </template>

              <!-- 三级菜单 -->
              <el-menu-item
                v-for="itemChild_Child in itemChild.children"
                :index="itemChild_Child.path"
                :key="itemChild_Child.id"
                :id="item.id"
              >
                <em :class="itemChild_Child.icon" />
                <span slot="title">{{ itemChild_Child.name }}</span>
              </el-menu-item>
            </el-submenu>

            <el-menu-item
              v-else
              :index="itemChild.path"
              :key="itemChild.id"
              :id="item.id"
            >
              <em :class="itemChild.icon" />
              <span
                slot="title"
                class="second-menu"
                v-html="itemChild.href=='1'? itemChild.html:itemChild.name"
              >{{ itemChild.name }}</span>
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item
          v-else
          :index="item.path"
          :key="item.id"
          :id="item.id"
        >
          <em :class="item.icon" />
          <span
            slot="title"
            class="first-menu"
          >{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'MainSidebar',
  props: {
    jsonData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      indexName: ''
    }
  },
  methods: {
    handleSelect (path) {
      this.indexName = path
      this.$root.$emit('refreshDnd')
      this.$root.$emit('refreshProvision')
    }

  },
  watch: {
    $route (to, from) {
      this.indexName = to.path
      // 解决MECDeveloper下DevTools导航子菜单首次点击没有选中状态问题
      if (this.indexName === '/mecm/app/distribution') {
        this.indexName = '/mecm/app/package'
      } else if (this.indexName === '/mecm/app/ruleconfig/addTrafficRules') {
        this.indexName = '/mecm/app/instance'
      } else if (this.indexName === '/mecm/app/ruleconfig') {
        this.indexName = '/mecm/app/instance'
      }
      // post message to unified platform
      let content = window
      content.parent.postMessage({
        cmd: 'routeTo',
        params: {
          module: 'mecm',
          path: to.path,
          activeMenuPath: this.indexName
        }
      }, '*')
    }
  },
  mounted () {
    let indexName = this.$route.fullPath
    if (indexName === '/mecm/app/distribution') {
      this.indexName = '/mecm/app/package'
    } else if (indexName === '/mecm/app/ruleconfig') {
      this.indexName = '/mecm/app/instance'
    } else if (indexName === '/mecm/app/ruleconfig/addTrafficRules') {
      this.indexName = '/mecm/app/instance'
    }
  }
}

</script>
<style lang='less'>
.main-sidebar{
  .el-menu.el-menu--horizontal{
  height: 64px;
  border:none!important;
  .el-menu-item{
    height: 64px;
    line-height: 64px;
    background: #5e40c8 !important;
    color: white;
  }
}
.el-menu--horizontal>.el-submenu .el-submenu__title{
  height: 64px !important;
  line-height: 64px !important;
  background-color: #5e40c8 !important;
  color: white;
}
.el-menu{
  display: flex;
  .first-menu{
    font-size: 16px;
    font-weight: bold;
  }
  .second-menu{
    font-size: 15px;
  }
  .third-menu{
    font-size: 12px;
  }
}
}

</style>
