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
      :third="$t('nav.appstore')"
      :path="{ path: '/mecm/system/applcm' }"
    />
    <div class="contentList">
      <Search
        :affinity-item="false"
        :ip-item="true"
        :status-item="false"
        @getSearchData="getSearchData"
      />
      <p
        class="btn-p"
        v-if="rlp=='418'"
      >
        <el-button
          id="newregBtn"
          type="primary"
          :disabled="false"
          @click="showEditDialog('')"
          class="rt"
        >
          {{ $t('system.appLcm.newReg') }}
        </el-button>
      </p>
      <div class="tableDiv">
        <el-table
          :data="currPageTableData"
          style="width: 100%"
        >
          <el-table-column
            sortable
            prop="appstoreName"
            :label="$t('system.appstore.appstoreName')"
          />
          <el-table-column
            prop="appstoreIp"
            :label="$t('system.appstore.ipAddress')"
          />
          <el-table-column
            prop="appstorePort"
            :label="$t('system.appLcm.port')"
          />
          <el-table-column
            prop="appstoreRepo"
            :label="$t('system.appstore.appstoreRepo')"
          />
          <el-table-column
            prop="appstoreRepoName"
            :label="$t('system.appstore.appstoreRepoName')"
          />
          <el-table-column
            prop="appstoreRepoUserName"
            :label="$t('system.appstore.appstoreRepoUserName')"
          />
          <el-table-column
            prop="producer"
            :label="$t('system.appstore.vendor')"
          />
          <el-table-column
            header-align="center"
            align="center"
            v-if="rlp=='418'"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                class="button"
                id="deleteBtn"
                @click.native.prevent="handleDelete(scope.row)"
              >
                {{ $t('common.delete') }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                class="button"
                id="modifyBtn"
                @click="showEditDialog(scope.row)"
              >
                {{ $t('common.modify') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBar">
          <pagination
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :close-on-click-modal="false"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="25%"
      >
        <AppstoreDialog
          :appstore-data="appstoreData"
          :type="type"
          @close="closeEditDialog"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { inventory } from '../../tools/request.js'
import Search from '../../components/common/Search.vue'
import pagination from '../../components/common/Pagination.vue'
import Breadcrumb from '../../components/common/BreadCrumb.vue'
import AppstoreDialog from './AppstoreDialog.vue'
export default {
  name: 'Appstore',
  components: {
    Search, pagination, Breadcrumb, AppstoreDialog
  },
  data () {
    return {
      dialogVisible: false,
      dialogTitle: this.$t('system.appstore.appStoreReg'),
      currPageTableData: [],
      paginationData: [],
      tableData: [],
      dataLoading: true,
      appstoreData: {},
      type: 0,
      rlp: sessionStorage.getItem('rlp')
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      inventory.getList(3).then(res => {
        this.tableData = this.paginationData = res.data
        this.dataLoading = false
      }, error => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key].toLowerCase()
        return itemVal.indexOf(val) > -1
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
              dataKey = 'appstoreIp'
            } else if (key === 'name') {
              dataKey = 'appstoreName'
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
    resetForm () {
      this.form = {
        appstoreIp: '',
        appstoreName: '',
        appstorePort: '',
        appstoreRepo: '',
        appstoreRepoName: '',
        appstoreRepoPassword: '',
        appstoreRepoUserName: '',
        producer: ''
      }
    },
    handleDelete (row) {
      this.$confirm(this.$t('tip.beforeDeleteAppstore'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        inventory.delete(3, row.appstoreIp).then(res => {
          this.initList()
          this.showMessage('success', this.$t('tip.deleteAppStoreSuc'), 1500)
        }).catch(error => {
          this.$message.error(error.response.data)
        })
      })
    },
    showEditDialog (data) {
      if (data) {
        this.appstoreData = data
        this.type = 2
        this.title = this.$t('system.appLcm.applcmModify')
      } else {
        this.type = 1
        this.title = this.$t('system.appLcm.applcmReg')
      }
      this.dialogVisible = true
    },
    closeEditDialog () {
      this.dialogVisible = false
      this.initList()
    }
  }
}
</script>

<style lang='less' scoped>
</style>
