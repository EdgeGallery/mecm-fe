<!--
  - Copyright 2021 Huawei Technologies Co., Ltd.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
  <div
    class="security-group-content"
    v-if="isSecurityGroupMainDlg"
  >
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="querySecurityGroup"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput lt"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="querySecurityGroup"
            />
          </el-input>
        </el-col>
        <el-col
          :span="12"
          class="create-col"
        >
          <el-button
            :class="language==='cn'? 'create-btn': 'create-btn-en'"
            id="createSecurityGroupBtn"
            @click="createSecurityGroup()"
          >
            {{ $t('resourceMgr.createSecurityGroup') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="security-group-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        ref="multipleTable"
        v-loading="dataLoading"
        height="400"
      >
        <el-table-column
          prop="name"
          label="Name"
          sortable
        />
        <el-table-column
          prop="id"
          label="Security Group ID"
        />
        <el-table-column
          prop="description"
          label="Description"
          width="150"
        />
        <el-table-column
          label="Actions"
          :width="language==='cn'?'260': '330'"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="secrityGroupEditBtn"
              @click.native.prevent="managerSecurityGroup(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.managerSecurityGroup') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="securityGroupEditBtn"
              @click.native.prevent="editSecurityGroup(scope.row)"
              type="text"
              size="small"
              :disabled="true"
            >
              {{ $t('resourceMgr.edit') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="securityGroupDeleteBtn"
              @click.native.prevent="deleteSecurityGroup(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.delete') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div>
            <img
              src="../../../assets/images/empty.png"
              alt=""
              style="padding: 10px;"
            >
            <p>{{ $t('resourceMgr.noData') }}</p>
          </div>
        </template>
      </el-table>
      <div class="pageBar">
        <Pagination
          :page-sizes="[10,15,20,25]"
          :table-data="paginationData"
          @getCurrentPageData="getCurrentPageData"
        />
      </div>
    </div>
    <div v-if="isShowFormDlg">
      <SecurityGroupForm
        v-model="isShowFormDlg"
        :dlg-type="dlgType"
        @reloadTableData="reloadTableData"
      />
    </div>
  </div>
  <div
    class="security-group-content"
    v-else
  >
    <SecurityGroupFlavorManager
      @returnBack="returnBack"
      :security-group-id="editSecurityGroupId"
    />
  </div>
</template>
<script>
import Pagination from '../../../components/common/Pagination.vue'
import SecurityGroupFlavorManager from './SecurityGroupFlavorManager.vue'
import SecurityGroupForm from '../form/SecurityGroupForm.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    Pagination,
    SecurityGroupFlavorManager,
    SecurityGroupForm
  },
  props: {
  },
  data () {
    return {
      isSecurityGroupMainDlg: true,
      isShowFormDlg: false,
      dlgType: 'createDlg',
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [],
      dataLoading: true,
      language: localStorage.getItem('language'),
      editSecurityGroupId: ''
    }
  },
  methods: {
    managerSecurityGroup (row) {
      this.editSecurityGroupId = row.id
      this.isSecurityGroupMainDlg = false
    },
    deleteSecurityGroup (row) {
      this.$confirm(this.$t('resourceMgr.deleteSecurityGroupMessage'),
        this.$t('resourceMgr.deleteSecurityGroupTitle'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
        let _hostIp = sessionStorage.getItem('hostIp')
        appo.deleteSecurityGroupBySecurityGroupId(_hostIp, row.id).then(res => {
          this.$message.success(this.$t('resourceMgr.deleteSuccess'))
          this.getTableData()
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    editSecurityGroup () {
      this.isShowFormDlg = true
      this.dlgType = 'editDlg'
    },
    createSecurityGroup () {
      this.isShowFormDlg = true
      this.dlgType = 'createDlg'
    },
    filterTableData (val, key) {
      this.dataLoading = true
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.querySecurityGroupsByMechost(_hostIp).then(res => {
        this.paginationData = res.data.data
        this.paginationData = this.paginationData.filter(item => {
          let _itemVal = item[key].toLowerCase()
          return _itemVal.indexOf(val) > -1
        })
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
      })
    },
    querySecurityGroup () {
      if (this.nameQueryVal && this.nameQueryVal.length > 0) {
        this.filterTableData(this.nameQueryVal, 'name')
      } else {
        this.reloadTableData()
      }
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    returnBack () {
      this.isSecurityGroupMainDlg = true
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.querySecurityGroupsByMechost(_hostIp).then(res => {
        this.paginationData = res.data.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
      })
    },
    reloadTableData () {
      this.getTableData()
    }
  },
  mounted () {
    this.getTableData()
  },
  watch: {
    '$i18n.locale': function () {
      this.language = localStorage.getItem('language')
    }
  }
}
</script>
<style lang="less" scoped>
.security-group-content{
  width: 1053px;
  height: 613px;
  padding-top: 1px;
  border-radius: 16px;
  box-shadow: 0px 3px 62px 6px rgba(226, 220, 247, 0.6) inset;
  .search-createBtn{
    .search-col{
      margin-top: 30px;
      margin-left: 30px;
    }
    .create-col{
      text-align: center;
      .create-btn{
        margin-left: 465px;
        margin-top: 30px;
        height: 40px;
        color: #fff;
        font-size: 20px !important;
        border-radius: 10px;
        padding: 0 35px;
        background-image: linear-gradient(127deg, #4444d0, #6724cb);
        border: none;
      }
      .create-btn-en{
        margin-left: 374px;
        margin-top: 30px;
        height: 40px;
        color: #fff;
        font-size: 20px !important;
        border-radius: 10px;
        padding: 0 35px;
        background-image: linear-gradient(127deg, #4444d0, #6724cb);
        border: none;
      }
    }
  }
  .security-group-table{
    width: 1000px;
    margin: 30px auto;
  }
}
</style>