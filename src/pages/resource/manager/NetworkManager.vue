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
  <div class="network-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="queryNetwork"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput lt"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="queryNetwork"
            />
          </el-input>
        </el-col>
        <el-col
          :span="12"
          class="create-col"
        >
          <el-button
            :class="language==='cn'? 'create-btn':'create-btn-en'"
            id="createNetworkBtn"
            @click="createNetwork()"
          >
            {{ $t('resourceMgr.createNetwork') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="network-table">
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
          width="150"
          sortable
        />
        <el-table-column
          prop="subnetsAssociated"
          label="Subnets Associated"
          width="200"
        />
        <el-table-column
          prop="shared"
          label="Shared"
          width="110"
          :formatter="formatBoolean"
        />
        <el-table-column
          prop="external"
          label="External"
          :formatter="formatBoolean"
          width="130"
        />
        <el-table-column
          prop="status"
          label="Status"
          width="110"
        />
        <el-table-column
          prop="adminState"
          label="Admin State"
          width="140"
          :formatter="formatBoolean"
        />
        <el-table-column
          prop="availability"
          label="Availability Zones"
          width="200"
        />
        <el-table-column
          label="Actions"
          width="170"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="networkEditBtn"
              @click.native.prevent="editNetwork(scope.row)"
              type="text"
              size="small"
              :disabled="true"
            >
              {{ $t('resourceMgr.edit') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="networkDeleteBtn"
              @click.native.prevent="deleteNetwork(scope.row)"
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
    <div v-if="isShowForm">
      <NetworkForm
        v-model="isShowForm"
        @reloadTableData="reloadTableData"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '../../../components/common/Pagination.vue'
import NetworkForm from '../form/NetworkForm.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    Pagination,
    NetworkForm
  },
  props: {
  },
  data () {
    return {
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [],
      isShowForm: false,
      dataLoading: true,
      language: localStorage.getItem('language')
    }
  },
  methods: {
    editNetwork () {

    },
    formatBoolean (row, column, cellValue) {
      var ret = ''
      if (cellValue) {
        ret = 'true'
      } else {
        ret = 'false'
      }
      return ret
    },
    deleteNetwork (row) {
      this.$confirm(this.$t('resourceMgr.deleteNetworkMessage'), this.$t('resourceMgr.deleteNetworkTitle'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let _hostIp = sessionStorage.getItem('hostIp')
        appo.deleteNetworkByNetworkId(_hostIp, row.id).then(res => {
          this.$message.success(this.$t('resourceMgr.deleteSuccess'))
          this.getTableData()
        }).catch((error) => {
          console.log(error)
          this.$message.error(this.$t('resourceMgr.deleteNetworkFailed'))
        })
      }).catch(() => {
      })
    },
    createNetwork () {
      this.isShowForm = true
    },
    filterTableData (val, key) {
      this.dataLoading = true
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryNetworksByMechost(_hostIp).then(res => {
        let _tempTableData = []
        res.data.data.forEach(item => {
          let _temp = {
            id: item.id,
            name: item.name,
            shared: item.shared,
            external: item.external,
            adminState: item.adminState,
            status: item.status,
            subnetsAssociated: '',
            availability: item.availabilityZones[0]
          }
          _tempTableData.push(_temp)
        })
        this.paginationData = _tempTableData
        this.paginationData = this.paginationData.filter(item => {
          let _itemVal = item[key].toLowerCase()
          return _itemVal.indexOf(val) > -1
        })
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
        this.$message.error(this.$t('resourceMgr.queryNetworksFailed'))
      })
    },
    queryNetwork () {
      if (this.nameQueryVal && this.nameQueryVal.length > 0) {
        this.filterTableData(this.nameQueryVal, 'name')
      } else {
        this.reloadTableData()
      }
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryNetworksByMechost(_hostIp).then(res => {
        let _tempTableData = []
        res.data.data.forEach(item => {
          let _temp = {
            id: item.id,
            name: item.name,
            shared: item.shared,
            external: item.external,
            adminState: item.adminState,
            status: item.status,
            subnetsAssociated: '',
            availability: item.availabilityZones[0]
          }
          _tempTableData.push(_temp)
        })
        this.paginationData = _tempTableData
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
        this.$message.error(this.$t('resourceMgr.queryNetworksFailed'))
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
.network-content{
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
        margin-left: 486px;
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
        margin-left: 425px;
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
  .network-table{
    width: 1000px;
    margin: 30px auto;
    .tableStyle /deep/ .el-table__fixed-right-patch{
      background-color: #edeef8 !important;
    }
  }
}
</style>
