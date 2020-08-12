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
  <div class="apacList">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mecm/overview' }">
          {{ $t('nav.mecm') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mecm/apac/overview' }">
          {{ $t('nav.appMana') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.packageMana') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <Search
      @getSearchData="getSearchData"
      :status-item="false"
      :type-item="true"
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
              width="150"
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
              clearable
              v-model="edgeNodeSearchInput"
            >
              <i
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
                prop="hostname"
                sortable
                :label="$t('app.packageList.name')"
              />
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
</template>

<script>
import { app, edge } from '../tools/request.js'
import Search from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'
export default {
  name: 'ApacList',
  components: {
    Search, Pagination
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
      multipleSelection: [],
      selectedNum: 0,
      multipleEdgeNodeSelection: [],
      selectedEdgeNodeNum: 0,
      currentRowData: '',
      alreadyDistributedPackageData: [],
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
      return this.edgeNodesData.filter(data => !this.edgeNodeSearchInput || data.ip.toLowerCase().includes(this.edgeNodeSearchInput.toLowerCase())).slice((this.edgeNodeCurrentPage - 1) * this.edgeNodePageSize, this.edgeNodeCurrentPage * this.edgeNodePageSize)
    }
  },
  methods: {
    // 对app表格进行筛选 val：需要查询的值  key: 数据对应的字段
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemType = item[key].toLowerCase()
        return itemType.indexOf(val) > -1
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
      this.$router.push('/mecm/apac/detail?appId=' + row.appId)
    },
    distribute (row) {
      this.currentRowData = row
      this.dialogVisible = true
      this.getNodeList(row)
    },
    handleSelectionChange (multipleSelection) {
      this.multipleSelection = multipleSelection
      this.selectedNum = multipleSelection.length
    },
    handleEdgeNodeSelectionChange (multipleEdgeNodeSelection) {
      this.multipleEdgeNodeSelection = multipleEdgeNodeSelection
      this.selectedEdgeNodeNum = multipleEdgeNodeSelection.length
    },
    async getAppListFromAppStore () {
      this.dataLoading = true
      app.getAppListFromAppStore().then(response => {
        this.tableData = response.data
        this.paginationData = this.tableData
        if (this.appType) this.filterTableData(this.appType, 'type')
        this.dataLoading = false
      }).catch(() => {
        this.$message.error(this.$t('tip.failedToGetAppList'))
      })
    },
    async getNodeList (row) {
      app.getPackageList(row.appId).then(res => {
        this.options = res.data
        this.currentRowData.appId = row.appId
        this.currentRowData.version = this.version = res.data[0].version
        this.currentRowData.csarId = res.data[0].csarId
      })
      this.appId = row.appId
      await edge.getNodeList().then(response => {
        this.edgeNodesData = response.data
      }).catch(() => {
        this.$message.error(this.$t('tip.failedToGetList'))
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
      this.multipleEdgeNodeSelection.forEach(data => selectedMecHost.push(data.ip))
      this.$refs.multipleEdgeNodeTable.clearSelection()
      this.isSecureBackend = sessionStorage.getItem('isSecureBackend')
      let address = 'http'
      if (this.isSecureBackend === 'true') {
        address = 'https'
      }
      let params = {
        appPackageId: this.currentRowData.csarId,
        appId: this.currentRowData.appId,
        appPackageName: this.currentRowData.name,
        version: this.currentRowData.version,
        appPackageDescription: this.currentRowData.shortDesc ? this.currentRowData.shortDesc : 'none',
        appAffinity: this.currentRowData.affinity,
        appDownloadUrl: address + '://appstore-be-svc:8099' + '/mec/appstore/v1/apps/' + this.currentRowData.appId + '/packages/' + this.currentRowData.csarId + '/action/download',
        appIconUrl: address + '://appstore-be-svc:8099' + '/mec/appstore/v1/apps/' + this.currentRowData.appId + '/icon',
        provider: this.currentRowData.provider,
        mecHost: selectedMecHost
      }
      if (params.version && params.mecHost.length > 0) {
        app.confirmToDistribute(this.currentRowData.csarId, params).then(response => {
          this.$message.success(this.$t('tip.sucToDownload'))
          this.$router.push('/mecm/edge/list')
        }).catch(() => {
          this.$message.error(this.$t('tip.failedToDownload'))
          this.loading = true
        })
      } else {
        this.loading = false
        if (params.mecHost.length === 0) {
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
  .appStore {
    width: 100%;
    height: 175px;
    border: 1px solid #ddd;
    border-radius: 8px;

    .lt {
      width: 30%;
      padding: 15px;
      text-align: center;
      p {
        padding-top: 20px;
        text-align: center;
      }
    }
    .rt {
      width: 60%;
      padding: 15px;
      div {
        float: left;
        width: 46%;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin: 0 5px 10px 0;
        text-align: center;
        line-height: 30px;
        font-size: 15px;
        font-weight: bold;
        p:first-child {
          margin-top: 5px;
        }
        p:nth-child(2) {
          color: green;
        }
      }
    }
  }
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
