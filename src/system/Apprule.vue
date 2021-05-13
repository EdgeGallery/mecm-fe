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
      :third="$t('nav.appRule')"
      :path="{ path: '/mecm/system/applcm' }"
    />
    <div class="sysLcm">
      <div class="applcmContainer">
        <Search
          :affinity-item="false"
          :ip-item="true"
          :name-item="false"
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
            @click="showEditDialog('')"
            class="rt"
          >
            {{ $t('system.appLcm.newReg') }}
          </el-button>
        </p>
        <div class="applcmList">
          <div
            v-for="(item,index) in currPageTableData"
            :key="index"
            class="content"
          >
            <div
              class="list"
            >
              <el-form
                label-width="auto"
              >
                <el-form-item :label="$t('app.packageList.name')">
                  {{ item.appRuleName }}
                </el-form-item>
                <el-form-item :label="$t('app.packageList.ip')">
                  {{ item.appRuleIp }}
                </el-form-item>
                <el-form-item :label="$t('system.appLcm.port')">
                  {{ item.appRulePort }}
                </el-form-item>
                <el-form-item
                  class="rt btn-group"
                  v-if="rlp=='418'"
                >
                  <el-button
                    type="warning"
                    size="mini"
                    class="button"
                    id="deleteBtn"
                    @click.native.prevent="handleDelete(item)"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    class="button"
                    id="modifyBtn"
                    @click="showEditDialog(item)"
                  >
                    {{ $t('common.modify') }}
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="pageBar">
          <pagination
            :page-sizes="[8,12,16,20]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="dialogVisible"
      width="25%"
    >
      <AppruleDialog
        :rowdata="formdata"
        :type="type"
        @close="closeEditDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import { inventory } from '../tools/request.js'
import Search from '../components/common/Search.vue'
import pagination from '../components/common/Pagination.vue'
import Breadcrumb from '../components/common/BreadCrumb.vue'
import AppruleDialog from './AppruleDialog.vue'

export default {
  name: 'SysLcm',
  components: {
    pagination,
    Breadcrumb,
    Search,
    AppruleDialog
  },
  data () {
    return {
      dataLoading: true,
      tableData: [],
      currPageTableData: [],
      paginationData: [],
      formdata: {},
      type: 0,
      dialogVisible: false,
      title: this.$t('app.ruleConfig.appRuleManReg'),
      rlp: sessionStorage.getItem('rlp')
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      inventory.getList(4).then(res => {
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
              dataKey = 'appRuleIp'
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
    handleDelete (row) {
      this.$confirm(this.$t('tip.beforeDeleteAppMgr'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        inventory.delete(4, row.appRuleIp).then(res => {
          this.showMessage('success', this.$t('tip.deleteSuc'), 1500)
          this.initList()
        }, error => {
          this.$message.error(error.response.data)
        })
      })
    },
    showEditDialog (data) {
      if (data) {
        this.formdata = data
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
.sysLcm{
  margin: 0 5%;
  height: 100%;
  background: #fff;
  padding: 30px 60px;
  .btn-group{
    margin:15px 0;
  }
}
</style>
