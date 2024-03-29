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
    <div class="topLabel">
      {{ $t('nav.edgeNodes') }}
    </div>
    <p
      class="btnMain"
      v-if="rlp=='418'"
    >
      <el-button
        id="newregBtn"
        type="primary"
        @click="showEditDialog()"
      >
        <span>{{ $t('system.mepm.newReg') }}</span>
      </el-button>
    </p>
    <div class="contentList">
      <Search
        :placeholder="$t('tip.fuzzyQuery')"
        @getSearchData="getSearchData"
      />
      <div class="tableDiv">
        <el-row class="table">
          <el-table
            :data="currPageTableData"
            v-loading="dataLoading"
            :highlight-current-row="highlight"
            size="small"
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
                <span class="hostName">{{ scope.row.mechostName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mechostIp"
              :label="$t('app.packageList.ip')"
            />
            <el-table-column
              prop="city"
              :label="$t('system.edgeNodes.location')"
              width="200"
            />
            <el-table-column
              prop="vim"
              label="VIM"
            />
            <el-table-column
              prop="mepmIp"
              :label="$t('system.edgeNodes.mepmIp')"
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
                  <em
                    class="el-icon-success"
                    :style="{color: '#67C23A'}"
                  />
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
                  type="button"
                  size="small"
                >
                  {{ $t('common.delete') }}
                </el-button>
                <el-button
                  id="uploadBtn"
                  @click.native.prevent="uploadFile(scope.row)"
                  type="button"
                  size="small"
                >
                  {{ $t('system.edgeNodes.uploadFile') }}
                </el-button>
                <el-button
                  type="button"
                  size="small"
                  id="syncBtn"
                  @click="syncFromEdge(scope.row)"
                >
                  {{ $t('app.packageList.sync') }}
                </el-button>
                <el-button
                  id="modifyBtn"
                  @click="showEditDialog(scope.row)"
                  type="button"
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
      <div v-if="dialogVisible">
        <el-dialog
          :show-close="false"
          :visible.sync="dialogVisible"
          width="40%"
        >
          <div class="secondLabel">
            {{ title }}
          </div>
          <FormContent
            :rowdata="formdata"
            :type="type"
            @close="closeEditDialog"
          />
        </el-dialog>
      </div>

      <!-- 上传文件 -->
      <el-dialog
        :show-close="false"
        :visible.sync="dialogVisibleUpload"
        width="30%"
      >
        <div class="secondLabel">
          {{ $t('system.edgeNodes.uploadFile') }}
        </div>
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
import FormContent from './HostDialog.vue'
import UploadFile from './UploadDialog.vue'
export default {
  name: 'Sysk8s',
  components: {
    Search, pagination, FormContent, UploadFile
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
      rlp: sessionStorage.getItem('rlp'),
      highlight: false
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
        console.log(error)
      })
    },
    filterTableData (val) {
      this.paginationData = this.paginationData.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().indexOf(val) > -1
        })
      })
    },
    getSearchData (data) {
      this.searchData = data
      this.paginationData = this.tableData
      if (data) {
        this.filterTableData(data.toLowerCase())
      } else {
        this.getNodeListInPage()
      }
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    handleMonitor (row) {
      let address = window.location.protocol === 'https:' ? 'https://' : 'http://'
      this.src = address + row.mechostIp + ':30000/dashboards'
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
      this.type = 0
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
      this.dialogVisibleUpload = true
      this.hostIp = row.mechostIp
    }
  }
}
</script>

<style lang='less' scoped>
.hostName{
  margin-left: 10px;
}
</style>
