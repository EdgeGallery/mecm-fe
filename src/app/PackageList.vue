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
      :second="$t('nav.appMana')"
      :third="$t('nav.packageMana')"
      :path="{ path: '/mecm/apac/list' }"
    />
    <div class="apacList">
      <Search
        @getSearchData="getSearchData"
        :status-item="false"
        :type-item="false"
      />
      <div class="tableDiv">
        <div class="el-row-button-input">
          <el-button
            id="syncBtn"
            style="float:right;"
            type="primary"
            @click="getAppListFromAppStore()"
          >
            {{ $t('app.packageList.synchronize') }}
          </el-button>
        </div>
        <el-row>
          <el-col
            :span="24"
            class="table"
          >
            <el-table
              v-loading="dataLoading"
              :data="currPageTableData"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                prop="name"
                sortable
                :label="$t('app.packageList.name')"
              />
              <el-table-column
                prop="userName"
                sortable
                :label="$t('app.packageList.auth')"
              />
              <el-table-column
                prop="provider"
                sortable
                :label="$t('app.packageList.vendor')"
              />
              <el-table-column
                prop="type"
                sortable
                :label="$t('app.packageList.type')"
              />
              <el-table-column
                prop="affinity"
                sortable
                :label="$t('app.packageList.affinity')"
              />
              <el-table-column
                prop="shortDesc"
                sortable
                width="350"
                :label="$t('app.packageList.desc')"
              >
                <template slot-scope="scope">
                  <p
                    :title="scope.row.shortDesc"
                    class="shortdesc"
                  >
                    {{ scope.row.shortDesc }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('common.operation')"
                width="180"
              >
                <template slot-scope="scope">
                  <el-button
                    id="detailBtn"
                    @click="checkDetail(scope.row)"
                    type="text"
                    size="small"
                  >
                    {{ $t('common.detail') }}
                  </el-button>
                  <el-button
                    id="distributeBtn"
                    @click="distribute(scope.row)"
                    type="text"
                    size="small"
                  >
                    {{ $t('app.packageList.distribute') }}
                  </el-button>
                  <el-button
                    id="deployBtn"
                    @click="checkDetail(scope.row)"
                    type="text"
                    size="small"
                  >
                    {{ $t('app.distriList.deploy') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="pageBar">
          <Pagination
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
        <el-dialog
          :title="$t('app.packageList.slectEdgeNodes')"
          :visible.sync="dialogVisible"
          v-loading="loading"
        >
          <el-row class="el-row-search">
            <el-col
              :span="16"
              class="el-col-selected-text"
            >
              <label style="margin-right:10px;font-size:14px;font-weight:bold;">{{ $t('app.packageList.pacVersion') }}:</label>
              <el-select
                v-model="version"
                @change="versionChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.version"
                  :value="item.csarId"
                />
              </el-select>
            </el-col>
            <el-col
              :span="8"
              :offset="0"
            >
              <el-input
                id="nodesearch"
                class="el-input-search"
                v-model="edgeNodeSearchInput"
              >
                <em
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                />
              </el-input>
            </el-col>
          </el-row>
          <el-row class="el-row-table">
            <el-col :span="24">
              <el-table
                ref="multipleEdgeNodeTable"
                :data="currPageEdgeNodeTableData"
                border
                @selection-change="handleEdgeNodeSelectionChange"
              >
                <el-table-column
                  type="selection"
                />
                <el-table-column
                  prop="mechostName"
                  sortable
                  :label="$t('app.packageList.name')"
                />
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
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-pagination
              background
              class="pageBar"
              @size-change="handleEdgeNodePageSizeChange"
              @current-change="handleEdgeNodeCurrentPageChange"
              :current-page="edgeNodeCurrentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="edgeNodePageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="edgeNodeTotalNum"
            />
          </el-row>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              id="cancelBtn"
              @click="cancel()"
            >
              {{ $t('common.cancel') }}
            </el-button>
            <el-button
              id="confirmBtn"
              type="primary"
              @click="confirm()"
              :loading="loading"
            >
              {{ $t('common.confirm') }}
            </el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { app, edge } from '../tools/request.js'
import Search from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'
import Breadcrumb from '../components/BreadCrumb'
export default {
  name: 'ApacList',
  components: {
    Search, Pagination, Breadcrumb
  },
  data () {
    return {
      dataLoading: true,
      tableData: [],
      paginationData: [],
      currPageTableData: [],
      edgeNodesData: [],
      dialogVisible: false,
      packageSearchInput: '',
      edgeNodeSearchInput: '',
      edgeNodeCurrentPage: 1,
      edgeNodePageSize: 5,
      rowSelection: [],
      selectedNum: 0,
      nodeSelection: [],
      selectedNodeNum: 0,
      currentRowData: '',
      appType: '',
      loading: false,
      version: '',
      options: [],
      dialogLoading: false,
      appId: ''
    }
  },
  mounted () {
    this.appType = this.$route.query.type ? this.$route.query.type : ''
    this.getAppListFromAppStore()
  },
  computed: {
    edgeNodeTotalNum: function () {
      return this.edgeNodesData.length
    },
    totalNum: function () {
      return this.tableData.length
    },
    currPageEdgeNodeTableData: function () {
      return this.edgeNodesData.filter(data => !this.edgeNodeSearchInput || data.mechostName.toLowerCase().includes(this.edgeNodeSearchInput.toLowerCase()))
    }
  },
  methods: {
    // 对app表格进行筛选 val：需要查询的值  key: 数据对应的字段
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        if (item[key] !== null) {
          let itemType = item[key].toLowerCase()
          return itemType.indexOf(val) > -1
        }
      })
    },
    // 根据搜索组件进行筛选
    getSearchData (data) {
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            this.filterTableData(data[key].toLowerCase(), key)
          }
        }
        if (!reset) this.paginationData = this.tableData
      }
    },
    // 根据分页组件显示数据
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    checkDetail (row) {
      sessionStorage.setItem('appId', row.appId)
      this.$nextTick(
        this.$router.push('/mecm/apac/detail')
      )
    },
    distribute (row) {
      this.currentRowData = row
      this.dialogVisible = true
      this.getNodeList(row)
    },
    handleSelectionChange (val) {
      this.rowSelection = val
      this.selectedNum = val.length
    },
    handleEdgeNodeSelectionChange (val) {
      this.nodeSelection = val
      this.selectedNodeNum = val.length
    },
    async getAppListFromAppStore () {
      app.getAppListFromAppStore().then(response => {
        this.tableData = response.data
        this.paginationData = this.tableData
        if (this.appType) this.filterTableData(this.appType, 'type')
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('tip.failedToGetAppList'))
      })
    },
    async getNodeList (row) {
      sessionStorage.setItem('appId', row.appId)
      app.getPackageList(row.appId).then(res => {
        this.options = res.data
        this.currentRowData.appId = row.appId
        this.currentRowData.version = this.version = res.data[0].version
        this.currentRowData.csarId = res.data[0].csarId
      })
      this.appId = row.appId
      await edge.getNodeList().then(response => {
        this.edgeNodesData = response.data
      }).catch((error) => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.edgeNodesData = []
        }
      })
    },
    versionChange (val) {
      this.options.forEach(item => {
        if (item.version === val) {
          this.currentRowData.version = item.version
          this.currentRowData.csarId = item.csarId
          this.currentRowData.size = item.size
        }
      })
    },
    handleEdgeNodePageSizeChange (edgeNodePageSize) {
      this.edgeNodePageSize = edgeNodePageSize
    },
    handleEdgeNodeCurrentPageChange (edgeNodeCurrentPage) {
      this.edgeNodeCurrentPage = edgeNodeCurrentPage
    },
    cancel () {
      this.dialogVisible = false
      this.$refs.multipleEdgeNodeTable.clearSelection()
    },
    async confirm () {
      this.loading = true
      let selectedMecHost = []
      this.nodeSelection.forEach(data => {
        let obj = {}
        obj.hostIp = data.mechostIp
        selectedMecHost.push(obj)
      })
      this.$refs.multipleEdgeNodeTable.clearSelection()
      this.isSecureBackend = sessionStorage.getItem('isSecureBackend')
      let address = 'http'
      if (this.isSecureBackend === 'true') {
        address = 'https'
      }
      let params = {
        appPkgId: this.currentRowData.csarId,
        appId: this.currentRowData.appId,
        appPkgName: this.currentRowData.name,
        appPkgVersion: this.currentRowData.version,
        appPkgDesc: this.currentRowData.shortDesc ? this.currentRowData.shortDesc : 'none',
        appPkgAffinity: this.currentRowData.affinity,
        appPkgPath: address + '://appstore-be-svc:8099' + '/mec/appstore/v1/apps/' + this.currentRowData.appId + '/packages/' + this.currentRowData.csarId + '/action/download',
        appIconUrl: address + '://appstore-be-svc:8099' + '/mec/appstore/v1/apps/' + this.currentRowData.appId + '/icon',
        appProvider: this.currentRowData.provider,
        mecHostInfo: selectedMecHost,
        createdTime: new Date().toString(),
        modifiedTime: new Date().toString()
      }
      if (params.appPkgVersion && params.mecHostInfo.length > 0) {
        app.confirmToDistribute(params).then(response => {
          this.$message.success(this.$t('tip.sucToDownload'))
          sessionStorage.setItem('appId', params.appId)
          this.$nextTick(
            this.$router.push('/mecm/apac/detail')
          )
        }).catch(() => {
          this.loading = false
          this.$message.error(this.$t('tip.failedToDownload'))
        })
      } else {
        this.loading = false
        if (params.mecHostInfo.length === 0) {
          this.$message.warning(this.$t('tip.mecHost'))
        } else {
          this.$message.warning(this.$t('tip.version'))
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
.apacList {
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
  .tableDiv {
    width: 100%;
  }
  .el-row-button-input {
    margin-top: 10px;
  }
  .table {
    margin-top: 15px;
  }
  .el-row-table {
    margin-top: 10px;
  }
  .shortdesc{
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
}
</style>
