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
  <div>
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.overview')"
      :second="$t('nav.appMana')"
      :third="$t('nav.packageMana')"
      :path="{ path: '/mecm/app/package' }"
    />
    <div class="contentList">
      <Search
        @getSearchData="getSearchData"
        :status-item="false"
        :type-item="false"
      />
      <div class="btn-p">
        <el-button
          id="syncBtn"
          style="float:right;"
          type="primary"
          @click="showSyncBox()"
        >
          {{ $t('app.packageList.synchronize') }}
        </el-button>
      </div>
      <div class="tableDiv">
        <el-row>
          <el-col
            :span="24"
            class="table"
          >
            <el-table
              v-loading="dataLoading"
              :data="currPageTableData"
              border
              size="small"
              style="width: 100%;"
            >
              <el-table-column
                prop="name"
                sortable
                :label="$t('app.packageList.name')"
              />
              <el-table-column
                prop="version"
                :label="$t('app.packageList.version')"
              />
              <el-table-column
                prop="provider"
                :label="$t('app.packageList.vendor')"
              />
              <el-table-column
                prop="industry"
                :label="$t('app.packageList.industry')"
              />
              <el-table-column
                prop="type"
                :label="$t('app.packageList.type')"
              />
              <el-table-column
                prop="affinity"
                :label="$t('app.packageList.affinity')"
              />
              <el-table-column
                prop="shortDesc"
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
                align="center"
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
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
    </div>
    <!-- 同步 -->
    <el-dialog
      :title="$t('app.packageList.synchronize')"
      :visible.sync="syncDialogVisible"
      width="width"
    >
      <div>
        <div>
          <el-select
            v-model="appstoreIp"
            :placeholder="$t('tip.pleaseSelect')"
            @change="chooseAppstore()"
          >
            <el-option
              v-for="item in appstoreOptions"
              :key="item.appstoreIp"
              :label="item.appstoreName"
              :value="item.appstoreIp"
            />
          </el-select>
        </div>
        <div>
          <el-table
            ref="syncPackageTable"
            :data="syncPackageTableData"
            class="mt20"
            border
            size="small"
            style="width: 100%;"
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
              prop="version"
              :label="$t('app.packageList.version')"
            />
            <el-table-column
              prop="provider"
              :label="$t('app.packageList.vendor')"
            />
            <el-table-column
              prop="industry"
              :label="$t('app.packageList.industry')"
            />
            <el-table-column
              prop="type"
              :label="$t('app.packageList.type')"
            />
            <el-table-column
              prop="affinity"
              :label="$t('app.packageList.affinity')"
            />
          </el-table>
        </div>
        <Pagination
          :page-sizes="[10,15,20,25]"
          :table-data="paginationPackageData"
          @getCurrentPageData="getCurrentPagePackageData"
        />
        <span
          slot="footer"
          class="dialog-footer"
          style="text-align:right;padding-bottom:15px"
        >
          <el-button
            type="primary"
            @click="confirmToSync()"
            size="small"
            style="margin-right:15px;"
            class="rt"
          >
            {{ $t('common.confirm') }}
          </el-button>
          <el-button
            @click="cancelToSync"
            size="small"
            class="rt"
          >
            {{ $t('common.cancel') }}
          </el-button>
        </span>
      </div>
    </el-dialog>
    <!-- 分发 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('app.packageList.slectEdgeNodes')"
      :visible.sync="dialogVisible"
      v-loading="loading"
    >
      <el-row class="el-row-search">
        <el-col
          :span="8"
          :offset="16"
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
            class="mt20"
            border
            size="small"
            style="width: 100%;"
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
              :label="$t('app.packageList.ip')"
            />
            <el-table-column
              prop="city"
              :label="$t('app.packageList.city')"
            />
            <el-table-column
              prop="affinity"
              :label="$t('app.packageList.affinity')"
            />
            <el-table-column
              prop="applcmIp"
              :label="$t('system.edgeNodes.applcmIp')"
            />
            <el-table-column
              :label="$t('system.edgeNodes.hwCapability')"
              width="200"
            >
              <template slot-scope="scope">
                <span
                  v-for="(item,index) in scope.row.hwcapabilities"
                  :key="index"
                >
                  {{ item.hwType }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination
          background
          class="pagination rt"
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
          id="confirmBtn"
          type="primary"
          size="small"
          @click="confirm()"
          :loading="loading"
        >
          {{ $t('common.confirm') }}
        </el-button>
        <el-button
          id="cancelBtn"
          size="small"
          @click="cancel()"
        >
          {{ $t('common.cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apm, inventory } from '../../tools/request.js'
import { TYPESFORAPP, INDUSTRY } from '../../tools/constant.js'
import Search from '../../components/common/Search.vue'
import Pagination from '../../components/common/Pagination.vue'
import Breadcrumb from '../../components/common/BreadCrumb.vue'
export default {
  name: 'ApacList',
  components: {
    Search, Pagination, Breadcrumb
  },
  data () {
    return {
      dataLoading: false,
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
      dialogLoading: false,
      appId: '',
      language: localStorage.getItem('language'),
      selectData: [],
      syncDialogVisible: false,
      appstoreOptions: [],
      appstoreIp: '',
      syncPackageTableData: [],
      paginationPackageData: []
    }
  },
  mounted () {
    this.appType = this.$route.query.type ? this.$route.query.type : ''
    this.getPackageList()
    this.getAppstoreList()
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
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getPackageList()
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
    // 列表根据分页组件显示数据
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    getCurrentPagePackageData (data) {
      this.syncPackageTableData = data
    },
    handleSelectionChange (val) {
      if (val.length > 0) {
        val.forEach(item => {
          this.selectData.push(
            {
              appId: item.appId,
              appstoreIp: this.appstoreIp,
              packageId: item.packageId
            }
          )
        })
      }
    },
    chooseAppstore (val) {
      this.showSyncBox()
      this.$refs.syncPackageTable.clearSelection()
    },
    checkDetail (row) {
      sessionStorage.setItem('appId', row.appId)
      this.$nextTick(
        this.$router.push('/mecm/app/distribution?appId=' + row.appId)
      )
    },
    distribute (row) {
      this.currentRowData = row
      this.dialogVisible = true
      this.getNodeList(row)
    },
    handleEdgeNodeSelectionChange (val) {
      this.nodeSelection = val
      this.selectedNodeNum = val.length
    },
    async getAppstoreList () {
      this.dataLoading = true
      inventory.getList(3).then(res => {
        if (res.data && res.data.length > 0) {
          this.appstoreOptions = res.data
          this.appstoreIp = res.data[0].appstoreIp
        }
      })
    },
    showSyncBox () {
      this.syncDialogVisible = true
      apm.getAppPackageList(this.appstoreIp).then(response => {
        this.paginationPackageData = response.data
      }).catch(error => {
        console.log(error)
        this.paginationPackageData = []
        this.selectData = []
      })
    },
    cancelToSync () {
      this.syncDialogVisible = false
      this.$refs.syncPackageTable.clearSelection()
    },
    confirmToSync () {
      let params
      if (this.selectData.length === 0) {
        this.$message.warning(this.$t('app.packageList.syncTip'))
      } else {
        params = this.selectData
        apm.syncAppFromStore(params).then(res => {
          if (res) {
            let num = 0
            params.forEach(item => {
              num++
              apm.getOneSyncStatus(item.appId, item.packageId).then(response => {
                if (num === params.length) {
                  this.$message.success(this.$t('app.packageList.syncSuccess'))
                  this.$refs.syncPackageTable.clearSelection()
                }
              }).catch(error => {
                console.log(error)
                this.syncDialogVisible = false
              })
            })
            if (num === params.length) {
              this.getPackageList()
            }
            this.syncDialogVisible = false
          }
        }).catch(error => {
          if (error.response.status === 403) {
            this.$message.error(this.$t('tip.loginOperation'))
          }
        })
      }
    },
    handlePackagePageSizeChange (packagePageSize) {
      this.packagePageSize = packagePageSize
    },
    handlePackageCurrentPageChange (packageCurrentPage) {
      this.packageCurrentPage = packageCurrentPage
    },
    getPackageList () {
      apm.initApmPackages().then(response => {
        this.tableData = response.data
        this.paginationData = this.tableData
        this.checkProjectData()
        if (this.appType) this.filterTableData(this.appType, 'type')
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.failedToGetAppList'))
        }
      })
    },
    checkProjectData () {
      this.tableData.forEach(itemBe => {
        INDUSTRY.forEach(itemFe => {
          if (itemBe.industry.match(itemFe.label[0]) && this.language === 'cn') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.industry.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[0], itemFe.label[1])
          }
        })
        TYPESFORAPP.forEach(itemFe => {
          if (itemBe.type.match(itemFe.label[0]) && this.language === 'cn') {
            itemBe.type = itemBe.type.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.type.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.type = itemBe.type.replace(itemFe.label[0], itemFe.label[1])
          }
        })
      })
    },
    async getNodeList (row) {
      sessionStorage.setItem('appId', row.appId)
      await inventory.getList(2).then(response => {
        this.edgeNodesData = response.data
      }).catch((error) => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.edgeNodesData = []
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
      let address = 'http://'
      if (this.isSecureBackend === 'true') {
        address = 'https://'
      }
      let params = {
        appPkgId: this.currentRowData.packageId,
        appId: this.currentRowData.appId,
        appPkgName: this.currentRowData.name,
        appPkgVersion: this.currentRowData.version,
        appPkgDesc: this.currentRowData.shortDesc ? this.currentRowData.shortDesc : 'none',
        appPkgAffinity: this.currentRowData.affinity,
        appPkgPath: address + this.currentRowData.appstoreEndpoint + '/mec/appstore/v1/apps/' + this.currentRowData.appId + '/packages/' + this.currentRowData.packageId + '/action/download',
        appProvider: this.currentRowData.provider,
        mecHostInfo: selectedMecHost,
        createdTime: new Date().toString(),
        modifiedTime: new Date().toString()
      }
      if (params.appPkgVersion && params.mecHostInfo.length > 0) {
        apm.confirmToDistribute(params).then(response => {
          sessionStorage.setItem('appId', params.appId)
          this.$nextTick(
            this.$router.push('/mecm/app/distribution?appId=' + params.appId)
          )
        }).catch(() => {
          this.loading = false
          this.$message.error(this.$t('tip.failedToDownload'), 3000)
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
.shortdesc{
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
</style>
