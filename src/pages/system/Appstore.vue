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
      {{ $t('nav.appstore') }}
      <div class="block" />
    </div>
    <p
      class="btnMain"
      v-if="rlp=='418'"
    >
      <el-button
        id="newregBtn"
        type="primary"
        :disabled="false"
        @click="showEditDialog(0)"
        class="rt"
      >
        <span class="iconcont add" />
        <span>{{ $t('system.mepm.newReg') }}</span>
      </el-button>
    </p>
    <div class="contentList">
      <Search
        :placeholder="$t('tip.fuzzyQuery')"
        @getSearchData="getSearchData"
      />
      <div class="tableDiv">
        <el-table
          :data="currPageTableData"
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
            :label="$t('system.mepm.port')"
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
            :label="$t('common.operation')"
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
        :show-close="false"
        :visible.sync="dialogVisible"
        :before-close="closeEditDialog"
        width="40%"
      >
        <div class="secondLabel">
          {{ dialogTitle }}
        </div>
        <AppstoreDialog
          :appstore-data="appstoreData"
          :type="type"
          @close="closeEditDialog"
          v-if="ifshow"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { inventory } from '../../tools/request.js'
import Search from '../../components/common/Search.vue'
import pagination from '../../components/common/Pagination.vue'
import AppstoreDialog from './AppstoreDialog.vue'
export default {
  name: 'Appstore',
  components: {
    Search, pagination, AppstoreDialog
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
      rlp: sessionStorage.getItem('rlp'),
      ifshow: false
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
        this.tableData = this.paginationData = []
        this.dataLoading = false
        console.log(error)
      })
    },
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().indexOf(val) > -1
        })
      })
    },
    getSearchData (data) {
      this.paginationData = this.tableData
      if (data) {
        this.filterTableData(data.toLowerCase())
      } else {
        this.initList()
      }
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
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
        this.dialogTitle = this.$t('system.appstore.appStoreModify')
      } else {
        this.appstoreData = {}
        this.type = 1
        this.dialogTitle = this.$t('system.appstore.appStoreReg')
      }
      this.dialogVisible = true
      this.ifshow = true
    },
    closeEditDialog () {
      this.dialogVisible = false
      this.ifshow = false
      this.initList()
    }
  }
}
</script>
