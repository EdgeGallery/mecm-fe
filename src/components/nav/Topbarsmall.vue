<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
  <div class="main-sidebar-small">
    <el-menu
      :default-active="indexName"
      :unique-opened="true"
      router
      @select="handleSelect"
      text-color="#fff"
      background-color="rgba(0,0,0,0.4)"
      active-text-color="#6c92fa"
      active-color="#6c92fa"
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
      this.$emit('closeMenu', false)
    }

  },
  watch: {
    $route (to, from) {
      this.indexName = to.path
      // 解决MECDeveloper下DevTools导航子菜单首次点击没有选中状态问题
      if (this.indexName === '/mecm/app/distribution') {
        this.indexName = '/mecm/app/package'
      } else if (this.indexName === '/mecm/app/ruleconfig') {
        this.indexName = '/mecm/app/instance'
      } else if (this.indexName === '/mecm/app/ruleconfig/addTrafficRules') {
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
.main-sidebar-small{
  position: relative;
  overflow-y: auto;
  z-index: 9999;
  background: #280B4E;
  .el-menu{
    background: rgba(0, 0, 0, 0.6);
    border-right: none;
    .el-submenu.is-active, .el-menu-item.is-active{
      background: #5e40c8;
      .first-menu{
        color: #6c92fa;
      }
    }
    .el-submenu__title{
      background-color: #5e40c8;
      color: white !important;
    }
    .el-submenu__title:hover{
      color: white !important;
    }
    .el-icon-arrow-down:before{
      color: #fff;
      font-size: 16px;
    }
  }
}

</style>
