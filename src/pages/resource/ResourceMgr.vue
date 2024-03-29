<!--
  - Copyright 2021 Huawei Technologies Co., Ltd.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
  <div class="resource-content padding_default">
    <div
      class="topLabel"
      style="margin-left: 0;"
    >
      {{ $t('resourceMgr.resManager') }}
    </div>
    <div class="main-tabs">
      <div class="nodeIP">
        <span class="host-text">{{ $t('resourceMgr.currentHost') }}</span>
        <el-select
          :popper-append-to-body="false"
          v-model="currentEdgeNode"
          :placeholder="$t('resourceMgr.selectEdgeNode')"
        >
          <el-option
            v-for="item in edgeNodeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
            @click.native="changeEdgeNode()"
          />
        </el-select>
      </div>
      <el-tabs
        class="elTabs"
        v-model="activeName"
        @tab-click="handleClick"
        tab-position="left"
        :class="{'enLeft':language==='en'}"
      >
        <el-tab-pane
          class="tab-item"
          name="1"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('1')"
            @mouseleave="groupListLeave('1')"
          >
            <em class="overview_default" />{{ $t('resourceMgr.resourceOverview') }}
          </span>
          <div v-if="activeName==='1'">
            <ResourceOverview />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="2"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('2')"
            @mouseleave="groupListLeave('2')"
          >
            <em class="vm_default" />{{ $t('resourceMgr.vm') }}
          </span>
          <div v-if="activeName==='2'">
            <VMManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="3"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('3')"
            @mouseleave="groupListLeave('3')"
          >
            <em class="image_default" />{{ $t('resourceMgr.image') }}
          </span>
          <div v-if="activeName==='3'">
            <ImageManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="4"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('4')"
            @mouseleave="groupListLeave('4')"
          >
            <em class="network_default" />{{ $t('resourceMgr.network') }}
          </span>
          <div v-if="activeName==='4'">
            <NetworkManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="5"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('5')"
            @mouseleave="groupListLeave('5')"
          >
            <em class="flavor_default" />{{ $t('resourceMgr.flavor') }}
          </span>
          <div v-if="activeName==='5'">
            <FlavorManager />
          </div>
        </el-tab-pane>
        <el-tab-pane
          name="6"
        >
          <span
            slot="label"
            @mouseenter="groupListHover('6')"
            @mouseleave="groupListLeave('6')"
          >
            <em class="securityGroup_default" />{{ $t('resourceMgr.securityGroup') }}
          </span>
          <div v-if="activeName==='6'">
            <SecurityGroupManager />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import ResourceOverview from './manager/ResourceOverview.vue'
import VMManager from './manager/VMManager.vue'
import ImageManager from './manager/ImageManager.vue'
import NetworkManager from './manager/NetworkManager.vue'
import FlavorManager from './manager/FlavorManager.vue'
import SecurityGroupManager from './manager/SecurityGroupManager.vue'
import { inventory } from '../../tools/request.js'
export default {
  components: {
    ResourceOverview,
    VMManager,
    ImageManager,
    NetworkManager,
    FlavorManager,
    SecurityGroupManager
  },
  data () {
    return {
      activeName: '-1',
      selectedName: '1',
      currentEdgeNode: '',
      edgeNodeList: [],
      language: localStorage.getItem('language')
    }
  },
  methods: {
    changeEdgeNode () {
      sessionStorage.setItem('hostIp', this.currentEdgeNode)
      this.reloadTab()
    },
    groupListHover (index) {
      this.selectedName = index
    },
    groupListLeave (index) {
      this.selectedName = 1
    },
    handleClick (tab, event) {
      this.reloadTab()
    },
    reloadTab () {
      let _tempActiveName = this.activeName
      this.activeName = '-1'
      this.$nextTick(() => {
        this.activeName = _tempActiveName
      })
    },
    getHosts () {
      inventory.getList(2).then(response => {
        response.data.forEach((item) => {
          if (item.vim === 'OpenStack') {
            let node = {
              name: item.mechostName,
              value: item.mechostIp
            }
            this.edgeNodeList.push(node)
          }
        })
        if (sessionStorage.getItem('hostIp')) {
          this.currentEdgeNode = sessionStorage.getItem('hostIp')
          this.activeName = '1'
        } else if (this.edgeNodeList.length > 0) {
          this.currentEdgeNode = this.edgeNodeList[0].value
          sessionStorage.setItem('hostIp', this.currentEdgeNode)
          this.activeName = '1'
          this.reloadTab()
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('tip.failedToGetList'))
      })
    }
  },
  mounted () {
    this.getHosts()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less">
.resource-content{
  .main-tabs{
    min-height:750px;
    background: rgba(46,20,124,0.7);
    margin-top:20px;
    border-radius:20px;
    padding:43px 57px 60px 48.5px;
    box-shadow: 0 6px 68px 0 rgba(94, 64, 200, 0.06);
    .nodeIP{
      text-align: right;
      margin-right: 25px;
      .el-popper{
        text-align: center;
        min-width: 160px !important;
        width: 160px !important;
        margin-left: 30px;
      }
      .host-text{
        color: #ffffff;
        margin-right: 15px;
      }
    }
    .elTabs{
      margin-top: 20px;
    }
    .el-tabs__item{
      height: 49px;
      line-height: 50px;
      margin:7px 8.5px;
      border-radius: 8px;
      font-size: 16px;
      .overview_default{
        background: url('../../assets/images/overview_default.png') no-repeat;
      }
      .vm_default{
        background: url('../../assets/images/vm_default.png') no-repeat;
      }
      .image_default{
        background: url('../../assets/images/image_default.png') no-repeat;
      }
      .network_default{
        background: url('../../assets/images/network_default.png') no-repeat;
      }
      .flavor_default{
        background: url('../../assets/images/flavor_default.png') no-repeat;
      }
      .securityGroup_default{
        background: url('../../assets/images/securityGroup_default.png') no-repeat;
      }
      span{
        display: inline-block;
        height: 50px;
        em{
          float: left;
          width: 28px;
          height: 28px;
          margin: 15px 3px 0 0;
        }
      }
    }
    .el-tabs--left .el-tabs__item.is-left:hover {
      border: 1px solid #43F6AD;
    }
    .el-tabs--left .el-tabs__item.is-left.is-active{
      border: 1px solid #43F6AD;
    }
    .el-tabs--left .el-tabs__item.is-left{
      text-align: left;
      font-size:20px;
      color: #ffffff;
      box-sizing: border-box;
    }
    .el-tabs--left .el-tabs__header.is-left{
      margin-right: 60px;
    }
    .el-tabs--left.enLeft .el-tabs__header.is-left{
      margin-right: 10px;
    }
    .el-tabs--left .el-tabs__active-bar.is-left{
      display: none;
    }
    .el-tabs__nav-wrap.is-left::after{
      width: 0;
    }
    .el-select{
      width: 220px !important;
    }
  }
}
</style>
