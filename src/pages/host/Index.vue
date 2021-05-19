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
      :second="$t('nav.system')"
      :third="$t('nav.edgeNode')"
      :path="{ path: '/mecm/system/applcm' }"
    />
    <div class="contentList">
      <Search
        :status-item="false"
        :affinity-item="false"
        :ip-item="true"
        @getSearchData="getSearchData"
      />
      <p
        class="btn-p"
        v-if="rlp=='418'"
      >
        <el-button
          id="newregBtn"
          type="primary"
          @click="showEditDialog()"
        >
          {{ $t('system.appLcm.newReg') }}
        </el-button>
      </p>
      <div class="tableDiv">
        <el-row class="table">
          <el-table
            :data="currPageTableData"
            v-loading="dataLoading"
            class="mt20"
            border
            size="small"
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
              :label="$t('app.packageList.ip')"
            />
            <el-table-column
              prop="city"
              :label="$t('system.edgeNodes.location')"
            />
            <el-table-column
              prop="vim"
              :label="$t('system.edgeNodes.vim')"
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
              prop="appRuleIp"
              label="App Rule MGR IP"
            />
            <el-table-column
              :label="$t('system.edgeNodes.hwCapability')"
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
            <el-table-column
              prop="configUploadStatus"
              :label="$t('system.edgeNodes.ifUploaded')"
            >
              <template slot-scope="scope">
                <span
                  class="success"
                  v-if="scope.row.configUploadStatus"
                >
                  {{ scope.row.configUploadStatus }}
                </span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operation')"
              align="center"
              width="350"
              v-if="rlp=='418'"
            >
              <template slot-scope="scope">
                <el-button
                  id="deleteBtn"
                  @click.native.prevent="beforeDelete(scope.row)"
                  type="text"
                  size="small"
                >
                  {{ $t('common.delete') }}
                </el-button>
                <el-button
                  id="monitorBtn"
                  type="text"
                  size="small"
                  @click="handleMonitor(scope.row)"
                >
                  {{ $t('edgeNode.monitor') }}
                </el-button>
                <el-button
                  id="uploadBtn"
                  @click.native.prevent="uploadFile(scope.row)"
                  type="text"
                  size="small"
                >
                  {{ $t('system.edgeNodes.uploadFile') }}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  id="syncBtn"
                  @click="syncFromEdge(scope.row)"
                >
                  {{ $t('app.packageList.sync') }}
                </el-button>
                <el-button
                  id="modifyBtn"
                  @click="showEditDialog(scope.row)"
                  type="text"
                  size="small"
                >
                  {{ $t('common.modify') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pageBar">
          <pagination
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <!-- 新增/编辑节点 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="title"
        :visible.sync="dialogVisible"
        style="padding-right:30px;"
        width="30%"
      >
        <FormContent
          :rowdata="formdata"
          :type="type"
          @close="closeEditDialog"
        />
      </el-dialog>
      <!-- 上传文件 -->
      <el-dialog
        :close-on-click-modal="false"
        :title="$t('system.edgeNodes.uploadFile')"
        :visible.sync="dialogVisibleUpload"
        width="30%"
      >
        <UploadFile
          :mechostip="hostIp"
          @close="closeUploadDialog"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { appo, apm, inventory } from '../../tools/request.js'
import pagination from '../../components/common/Pagination.vue'
import Search from '../../components/common/Search.vue'
import Breadcrumb from '../../components/common/BreadCrumb.vue'
import FormContent from './HostDialog.vue'
import UploadFile from './UploadDialog.vue'
export default {
  name: 'Sysk8s',
  components: {
    Search, pagination, Breadcrumb, FormContent, UploadFile
  },
  data () {
    return {
      paginationData: [],
      currPageTableData: [],
      dataLoading: true,
      tableData: [],
      type: 0,
      title: '',
      dialogVisible: false,
      dialogVisibleUpload: false,
      formdata: {},
      hostIp: '',
      rlp: sessionStorage.getItem('rlp')
    }
  },
  mounted () {
    this.getNodeListInPage()
  },
  methods: {
    getNodeListInPage () {
      inventory.getList(2).then(response => {
        this.tableData = this.paginationData = response.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        this.tableData = this.paginationData = []
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.failedToGetList'))
        }
      })
    },
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key]
        if (itemVal) return itemVal.toLowerCase().indexOf(val) > -1
      })
    },
    getSearchData (data) {
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = key
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
    handleMonitor (row) {
      this.src = 'https://' + row.mechostIp + ':30000/dashboards'
      window.open(this.src)
    },
    async syncFromEdge (row) {
      let result = 0
      await apm.syncFromApm()
      await appo.syncFromAppo()
      await inventory.syncMechost(row.mechostIp)
      await inventory.syncApprule(row.mechostIp).then(res => {
        result = 1
      })
      if (result === 1) {
        this.$message.success(this.$t('app.packageList.syncSuccess'))
      }
    },
    beforeDelete (row) {
      appo.getInstanceList().then(res => {
        if (res.data && res.data.response.length > 0) {
          res.data.response.forEach(item => {
            if (item.mecHost === row.mechostIp) {
              this.$message.error(this.$t('tip.deleteAppBeforeDeleteNode'))
            } else {
              this.showWarningBox(row)
            }
          })
        } else {
          this.showWarningBox(row)
        }
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.showWarningBox(row)
        }
      })
    },
    handleDelete (row) {
      inventory.delete(2, row.mechostIp).then(response => {
        this.showMessage('success', this.$t('tip.sucToDeleteNodes'), 1500)
        this.getNodeListInPage()
      }).catch(() => {
        this.$message.error(this.$t('tip.faileToDeleteNode'))
      })
    },

    showEditDialog (data) {
      this.dialogVisible = true
      if (data) {
        this.formdata = data
        this.type = 2
        this.title = this.$t('system.edgeNodes.nodeModify')
      } else {
        this.type = 1
        this.title = this.$t('system.edgeNodes.nodeReg')
      }
    },
    closeEditDialog () {
      this.dialogVisible = false
      this.getNodeListInPage()
    },
    closeUploadDialog () {
      this.dialogVisibleUpload = false
      this.getNodeListInPage()
    },
    showWarningBox (row) {
      this.$confirm(this.$t('tip.confirmToDeleteNode'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.handleDelete(row)
      })
    },
    uploadFile (row) {
      this.fileList = []
      this.dialogVisibleUpload = true
      this.hostIp = row.mechostIp
    }
  }
}
</script>

<style lang='less' scoped>
</style>