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
  <div class="vm-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="queryVM"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput lt"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="queryVM"
            />
          </el-input>
        </el-col>
        <el-col
          :span="12"
          class="create-col"
        >
          <el-button
            :class="language==='cn'? 'create-btn':'create-btn-en'"
            id="createVMBtn"
            @click="createVMInstance()"
          >
            {{ $t('resourceMgr.createVMInstance') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="vm-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        ref="multipleTable"
        v-loading="dataLoading"
        @sort-change="sortMethod"
        height="400"
      >
        <el-table-column
          prop="instanceName"
          label="Instance Name"
          width="190"
          sortable="custom"
        />
        <el-table-column
          prop="imageId"
          label="Image ID"
          width="160"
        />
        <el-table-column
          prop="ip"
          label="IP Address"
          width="250"
        />
        <el-table-column
          prop="flavor"
          label="Flavor"
        />
        <el-table-column
          prop="status"
          label="Status"
          sortable="custom"
        />
        <el-table-column
          label="Actions"
          width="180"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="vmDeleteBtn"
              @click.native.prevent="deleteInstance(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.delete') }}
            </el-button>
            <el-dropdown>
              <el-button
                class="operations_btn"
                type="text"
                size="small"
              >
                {{ $t('resourceMgr.more') }}
              </el-button>
              <el-dropdown-menu
                slot="dropdown"
                class="drop-menu"
                size="mini"
              >
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="createSnapshot(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.createSnapshot') }}
                </el-dropdown-item>
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="openControl(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.control') }}
                </el-dropdown-item>
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="pauseInstance(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.pauseInstance') }}
                </el-dropdown-item>
                <el-dropdown-item
                  class="operations_btn"
                  @click.native="hangInstance(scope.row)"
                  type="text"
                  :disabled="true"
                >
                  {{ $t('resourceMgr.hangInstance') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      <VMInstanceDlg
        v-model="isShowForm"
        @reloadTableData="reloadTableData"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '../../../components/common/Pagination.vue'
import VMInstanceDlg from '../vmInstance/VMInstanceDlg.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    Pagination,
    VMInstanceDlg
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
    editInstance () {
      // This is intentional
    },
    deleteInstance (row) {
      this.$confirm(this.$t('resourceMgr.deleteVMMessage'), this.$t('resourceMgr.deleteVMTitle'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let _hostIp = sessionStorage.getItem('hostIp')
        appo.deleteVMByVMId(_hostIp, row.id).then(res => {
          this.$message.success(this.$t('resourceMgr.deleteSuccess'))
          setTimeout(() => {
            this.getTableData()
          }, 3000)
        }).catch((error) => {
          console.log(error)
          this.$message.error(this.$t('resourceMgr.deleteVMFailed'))
        })
      }).catch(() => {
        // This is intentional
      })
    },
    createVMInstance () {
      this.isShowForm = true
    },
    createSnapshot (row) {
      // This is intentional
    },
    openControl (row) {
      // This is intentional
    },
    pauseInstance (row) {
      // This is intentional
    },
    hangInstance (row) {
      // This is intentional
    },
    filterTableData (val, key) {
      let _hostIp = sessionStorage.getItem('hostIp')
      this.dataLoading = true
      appo.queryVMsByMechost(_hostIp).then(res => {
        this.paginationData = this.transferData(res.data.data)
        this.paginationData = this.paginationData.filter(item => {
          let _itemVal = item[key].toLowerCase()
          return _itemVal.indexOf(val) > -1
        })
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('resourceMgr.queryVMsFailed'))
      })
    },
    queryVM () {
      if (this.nameQueryVal && this.nameQueryVal.length > 0) {
        this.filterTableData(this.nameQueryVal, 'instanceName')
      } else {
        this.reloadTableData()
      }
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    getIpAddr (obj) {
      let _results = ''
      for (let key in obj) {
        let _item = key + ' ' + obj[key][0].addr + '\n\r'
        _results += _item
      }
      return _results
    },
    transferData (dataList) {
      let _tempArr = []
      dataList.forEach(item => {
        let _tempItem = {
          id: item.id,
          instanceName: item.name,
          imageId: item.image.id,
          ip: this.getIpAddr(item.addresses),
          flavor: '',
          status: item.status
        }
        _tempArr.push(_tempItem)
      })
      return _tempArr
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryVMsByMechost(_hostIp).then(res => {
        this.paginationData = this.transferData(res.data.data)
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('resourceMgr.queryVMsFailed'))
      })
    },
    reloadTableData () {
      this.getTableData()
    },
    sortMethod (column) {
      this.paginationData.sort((a, b) => {
        let _tempA = column.prop === 'instanceName' ? a['instanceName'] : a['status']
        let _tempB = column.prop === 'instanceName' ? b['instanceName'] : b['status']
        if (column.order === 'ascending') {
          return _tempA.toLowerCase().substring(0, 1) - _tempB.toLowerCase().substring(0, 1)
        } else if (column.order === 'descending') {
          return _tempB.toLowerCase().substring(0, 1) - _tempA.toLowerCase().substring(0, 1)
        }
      })
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
.vm-content{
  width: 1053px;
  height: 602px;
  padding-top: 1px;
  border-radius: 16px;
  background: #2E147C;
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
  .vm-table{
    width: 1000px;
    margin: 30px auto;
  }
}
</style>
