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
  <div>
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.mecm')"
      :second="$t('nav.edgeNodes')"
      :third="$t('nav.nodeList')"
      :path="{ path: '/mecm/node/list' }"
    />
    <div
      class="nodelist"
      id="nodelist"
    >
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
            prop="mechostName"
            sortable
            :label="$t('app.packageList.name')"
          >
            <template slot-scope="scope">
              <em
                class="el-icon-success"
                :style="{color: '#67C23A'}"
              />
              <span style="margin-left: 10px">{{ scope.row.mechostName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mechostIp"
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
            prop="capability"
            label="HM Capability"
          />
          <el-table-column
            prop="edgerepoIp"
            sortable
            label="Edge RepoIP"
          />
          <el-table-column
            prop="edgerepoPort"
            sortable
            label="Edge Repo Port"
          />
          <el-table-column
            prop="applcmIp"
            sortable
            label="App LCM IP"
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
          title="Node Monitor"
        />
      </el-dialog>
      <input
        type="text"
        id="btn"
        style="width: 0;height: 0;position:fixed;top:100%;z-index:-5;"
      >
    </div>
  </div>
</template>

<script>
import { edge } from '../tools/request.js'
import searchForm from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'
import Breadcrumb from '../components/BreadCrumb'

export default {
  name: 'Nodelist',
  components: {
    searchForm, Pagination, Breadcrumb
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
              dataKey = 'mechostIp'
            } else if (key === 'name') {
              dataKey = 'mechostName'
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
      this.src = 'https://' + row.mechostIp + ':30000/dashboards'
      this.dialogVisible = true
    },
    getNodeList (row) {
      edge.getNodeList().then(response => {
        this.tableData = this.paginationData = response.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.nodelist{
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
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
