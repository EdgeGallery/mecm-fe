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
  <div class="image-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="8"
          class="search-col"
        >
          <el-input
            v-model="nameQueryVal"
            @change="queryImage"
            :placeholder="$t('resourceMgr.searchPlaceholder')"
            class="enterinput"
          >
            <em
              slot="suffix"
              class="search_icon"
              @click="queryImage"
            />
          </el-input>
        </el-col>
        <el-col
          :span="16"
          class="create-col"
        >
          <el-button
            class="create-btn"
            id="importImageBtn"
            @click="openSysImage()"
          >
            {{ $t('resourceMgr.importSysImage') }}
          </el-button>
          <el-button
            class="create-btn"
            id="createImageBtn"
            @click="createImage()"
          >
            {{ $t('resourceMgr.createImage') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="image-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        ref="multipleTable"
        v-loading="dataLoading"
        @sort-change="sortMethod"
        height="400"
      >
        <el-table-column
          prop="imageName"
          :label="$t('resourceMgr.name')"
          sortable="custom"
        />
        <el-table-column
          prop="imageId"
          label="ID"
        />
        <el-table-column
          prop="type"
          :label="$t('resourceMgr.type')"
        />
        <el-table-column
          prop="status"
          :label="$t('resourceMgr.status')"
        />
        <el-table-column
          prop="visibility"
          :label="$t('resourceMgr.visibility')"
          width="100"
        />
        <el-table-column
          prop="protected"
          :label="$t('resourceMgr.protect')"
          width="115"
          :formatter="formatBoolean"
        />
        <el-table-column
          prop="size"
          :label="$t('resourceMgr.size')"
        />
        <el-table-column
          :label="$t('resourceMgr.operator')"
          width="170"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="imageEditBtn"
              @click.native.prevent="editImage(scope.row)"
              type="text"
              size="small"
              :disabled="true"
            >
              {{ $t('resourceMgr.edit') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="imageDeleteBtn"
              @click.native.prevent="deleteImage(scope.row)"
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
      <ImageForm
        v-model="isShowForm"
        @reloadTableData="reloadTableData"
      />
    </div>
    <div v-if="isShowSysImageDlg">
      <SysImageDlg
        v-model="isShowSysImageDlg"
        @reloadTableData="reloadTableData"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '../../../components/common/Pagination.vue'
import ImageForm from '../form/ImageForm.vue'
import SysImageDlg from '../form/SysImageDlg.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    Pagination,
    ImageForm,
    SysImageDlg
  },
  data () {
    return {
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [],
      isShowForm: false,
      dataLoading: true,
      isShowSysImageDlg: false,
      language: localStorage.getItem('language')
    }
  },
  methods: {
    editImage () {
      // This is intentional
    },
    deleteImage (row) {
      this.$confirm(this.$t('resourceMgr.deleteImageMessage'), this.$t('resourceMgr.deleteImageTitle'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let _hostIp = sessionStorage.getItem('hostIp')
        appo.deleteImageByImageId(_hostIp, row.imageId).then(res => {
          this.$message.success(this.$t('resourceMgr.deleteSuccess'))
          this.getTableData()
        }).catch((error) => {
          console.log(error)
          this.$message.error(this.$t('resourceMgr.deleteImageFailed'))
        })
      }).catch(() => {
        // This is intentional
      })
    },
    createImage () {
      this.isShowForm = true
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
    filterTableData (val, key) {
      this.dataLoading = true
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryImagesByMechost(_hostIp).then(res => {
        this.paginationData = res.data.data
        this.paginationData = this.paginationData.filter(item => {
          let _itemVal = item[key].toLowerCase()
          return _itemVal.indexOf(val) > -1
        })
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('resourceMgr.queryImagesFailed'))
      })
    },
    queryImage () {
      if (this.nameQueryVal && this.nameQueryVal.length > 0) {
        this.filterTableData(this.nameQueryVal, 'imageName')
      } else {
        this.reloadTableData()
      }
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryImagesByMechost(_hostIp).then(res => {
        this.paginationData = []
        res.data.data.forEach(item => {
          let _tempItem = item
          _tempItem.size = (item.size / 1024 / 1024).toFixed(2)
          this.paginationData.push(_tempItem)
        })
        this.dataLoading = false
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('resourceMgr.queryImagesFailed'))
      })
    },
    reloadTableData () {
      this.getTableData()
    },
    sortMethod (column) {
      if (column.order === 'ascending') {
        this.paginationData.sort((a, b) => {
          if (a.imageName.toLowerCase().substring(0, 1) > b.imageName.toLowerCase().substring(0, 1)) {
            return 1
          }
          return -1
        })
      } else if (column.order === 'descending') {
        this.paginationData.sort((a, b) => {
          if (a.imageName.toLowerCase().substring(0, 1) > b.imageName.toLowerCase().substring(0, 1)) {
            return -1
          }
          return 1
        })
      }
    },
    openSysImage () {
      this.isShowSysImageDlg = true
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
.image-content{
  width: 100%;
  height: 100%;
  padding-top: 1px;
  border-radius: 16px;
  background: #2E147C;
  .search-createBtn{
    .search-col{
      margin-top: 30px;
      padding-left: 38px !important;
    }
    .create-col{
      padding-right: 38px !important;
      text-align: right;
      .create-btn{
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
  .image-table{
    margin: 15px 25px;
  }
}
</style>
