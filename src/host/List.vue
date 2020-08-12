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
  <div
    class="nodelist"
    id="nodelist"
  >
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mecm/overview' }">
          {{ $t('nav.mecm') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mecm/node/list' }">
          Edge Nodes
        </el-breadcrumb-item>
        <el-breadcrumb-item>Edge Node List</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <searchForm
      :status-item="false"
      :affinity-item="false"
      :ip-item="true"
      @getSearchData="getSearchData"
    />
    <div class="tableDiv">
      <el-table
        :data="currPageTableData"
        v-loading="dataLoading"
        border
        style="width: 100%;"
      >
        <el-table-column
          prop="hostname"
          sortable
          :label="$t('app.packageList.name')"
        >
          <template slot-scope="scope">
            <i
              class="el-icon-success"
              :style="{color: '#67C23A'}"
            />
            <!-- <i class="el-icon-warning" :style="{color: '#E6A23C'}" v-if="mepReadyNodes.indexOf(scope.row.ip) === -1"></i> -->
            <span style="margin-left: 10px">{{ scope.row.hostname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          sortable
          :label="$t('app.packageList.ip')"
        />
        <el-table-column
          prop="city"
          sortable
          :label="$t('app.packageList.city')"
        />
        <el-table-column
          prop="address"
          sortable
          :label="$t('app.packageList.address')"
        />
        <el-table-column
          prop="affinity"
          sortable
          :label="$t('app.packageList.affinity')"
        />
        <el-table-column
          prop="edgeNexusIp"
          sortable
          label="Edge Nexus Ip"
        />
        <el-table-column
          prop="edgeNexusPort"
          sortable
          label="Edge Nexus Port"
        />
        <el-table-column
          prop="appLcmIp"
          sortable
          label="App Lcm Ip"
        />
        <el-table-column
          prop="k8sURL"
          sortable
          label="K8S URL"
        />
        <el-table-column
          :label="$t('common.operation')"
        >
          <template slot-scope="scope">
            <el-button
              id="monitorBtn"
              type="text"
              size="small"
              @click="handleMonitor(scope.row)"
            >
              {{ $t('edgeNode.monitor') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBar">
        <Pagination
          :table-data="paginationData"
          @getCurrentPageData="getCurrentPageData"
        />
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="75%"
      class="my-dialog"
    >
      <iframe
        style="height:800px;width:100%;position:relative;left:-50px;"
        id="iframe_a"
        :src="src"
        frameborder="0"
      />
    </el-dialog>
    <input
      type="text"
      id="btn"
      style="width: 0;height: 0;position:fixed;top:100%;z-index:-5;"
    >
  </div>
</template>

<script>
import { edge } from '../tools/request.js'
import searchForm from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'Nodelist',
  components: {
    searchForm, Pagination
  },
  data () {
    return {
      currPageTableData: [],
      paginationData: [],
      edgeNodeSearchInput: '',
      dialogVisible: false,
      dataLoading: true,
      tableData: [],
      mepReadyNodes: [],
      src: ''
    }
  },
  mounted () {
    this.getNodeList()
  },
  methods: {
    // 对app表格进行筛选 val：需要查询的值  key: 数据对应的字段
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key]
        if (itemVal) return itemVal.indexOf(val) > -1
      })
    },
    // 根据搜索组件进行筛选
    getSearchData (data) {
      this.paginationData = this.tableData
      // hostname ip  后端对应的字段
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = ''
            if (key === 'ip') {
              dataKey = 'ip'
            } else if (key === 'name') {
              dataKey = 'hostname'
            }
            this.filterTableData(data[key].toLowerCase(), dataKey)
          }
        }
        if (!reset) this.paginationData = this.tableData
      }
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    jumpTo (path) {
      this.$router.push(path)
    },
    handleMonitor (row) {
      this.src = 'http://' + row.ip + ':30000/dashboards'
      this.dialogVisible = true
    },
    getNodeList (row) {
      edge.getNodeList().then(response => {
        this.tableData = this.paginationData = response.data
        this.dataLoading = false
      }).catch(() => {
        this.$message.error(this.$t('tip.getNodeListFailed'))
      })
    }
  }
}
</script>

<style lang='less' scoped>
.nodelist{
  .tableDiv {
    margin-top: 20px;
  }
  /deep/ .el-dialog .el-dialog__header{
    padding:0 !important;
  }
  /deep/ .el-dialog__body{
    padding:0 !important;
  }
  /deep/ .el-dialog{
    background: transparent !important;
    margin-top:8vh !important;
    overflow: hidden !important;
    box-shadow: none !important;
  }
  /deep/ .el-dialog__headerbtn{
    display:none !important;
  }
}
</style>
