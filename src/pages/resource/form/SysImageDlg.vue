<!--
  - Copyright 2022 Huawei Technologies Co., Ltd.
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
  <div class="sysImage-content">
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('resourceMgr.importSysImage') }}
      </div>
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
        </el-row>
      </div>
      <div class="sysImage-table">
        <el-table
          :data="currentPageData"
          class="tableStyle"
          ref="sysImageTable"
          v-loading="dataLoading"
          @sort-change="sortMethod"
          @selection-change="selectionLineChangeHandle"
          height="300"
        >
          <el-table-column
            type="selection"
            width="60"
          />
          <el-table-column
            prop="imageName"
            :label="$t('resourceMgr.imageName')"
            width="160"
            sortable="custom"
          />
          <el-table-column
            prop="imageFormat"
            :label="$t('resourceMgr.imageFormat')"
            width="110"
          />
          <el-table-column
            prop="slimStatus"
            :label="$t('resourceMgr.slimStatus')"
            width="130"
          />
          <el-table-column
            prop="imageSize"
            :label="$t('resourceMgr.imageSize')"
            width="125"
          />
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
          <pagination
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          size="medium"
          @click="handleClose"
          class="bgBtn"
        >
          {{ $t('resourceMgr.cancel') }}
        </el-button>
        <el-button
          type="primary"
          size="medium"
          @click="confirmAction"
          :disabled="confirmBtnUnable"
          class="bgBtn"
        >
          {{ $t('resourceMgr.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '../../../components/common/Pagination.vue'
import { appo } from '../../../tools/request.js'
import { IMAGESTATUS } from '../../../tools/constant.js'
export default {
  components: {
    Pagination
  },
  props: {
  },
  data () {
    return {
      dialogVisible: true,
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [],
      isShowForm: false,
      dataLoading: true,
      language: localStorage.getItem('language'),
      confirmBtnUnable: true,
      selectDataList: []
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    confirmAction () {
      let _hostIp = sessionStorage.getItem('hostIp')
      let _params = {
        name: 'image' + new Date().getTime(),
        containerFormat: 'bare',
        diskFormat: this.selectDataList[0].imageFormat,
        minRam: 1,
        minDisk: 10,
        properties: {}
      }
      appo.createImage(_hostIp, _params).then(res => {
        let _imageId = res.data.data.imageId
        this.importImage(_hostIp, _imageId)
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.createImageFailed'))
      })
    },
    importImage (hostIp, Id) {
      let _curIp = window.location.href.split(':')[1].substring(2)
      let _params = {
        imageId: Id,
        resourceUri: 'http://' + _curIp + ':30090/image-management/v1/images/' + this.selectDataList[0].imageId + '/action/download'
      }
      appo.importImage(hostIp, Id, _params).then(res => {
        this.$message.success(this.$t('resourceMgr.importImageSuccess'))
        this.$emit('reloadTableData')
        this.handleClose()
      }).catch((error) => {
        console.log(error)
        this.$message.error(this.$t('resourceMgr.importImageFailed'))
        this.handleClose()
      })
    },
    selectionLineChangeHandle (val) {
      this.selectDataList = val
      if (this.selectDataList.length === 1) {
        this.confirmBtnUnable = false
      } else {
        this.confirmBtnUnable = true
      }
    },
    filterTableData (val, key) {
      this.dataLoading = true
      appo.querySysImages().then(res => {
        this.paginationData = []
        res.data.forEach(item => {
          let _tempItem = {
            imageId: item.imageId,
            imageName: item.fileName.split('.')[0],
            imageFormat: item.fileName.split('.')[1],
            slimStatus: this.getSlimStatusDesc(item.slimStatus),
            imageSize: ((item.checkStatusResponse.checkInfo.imageInfo.disk_size) / 1024 / 1024).toFixed(2)
          }
          this.paginationData.push(_tempItem)
        })
        this.paginationData = this.paginationData.filter(item => {
          let _itemVal = item[key].toLowerCase()
          return _itemVal.indexOf(val) > -1
        })
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
        this.$message.error(this.$t('resourceMgr.querySysImageFailed'))
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
      this.dataLoading = true
      appo.querySysImages().then(res => {
        let _resultList = JSON.parse(res.data.data.body)
        _resultList.forEach(item => {
          let _tempItem = {
            imageId: item.imageId,
            imageName: item.fileName.split('.')[0],
            imageFormat: item.fileName.split('.')[1],
            slimStatus: this.getSlimStatusDesc(item.slimStatus),
            imageSize: ((item.checkStatusResponse.checkInfo.imageInfo.disk_size) / 1024 / 1024).toFixed(2)
          }
          this.paginationData.push(_tempItem)
          this.dataLoading = false
        })
      }).catch(() => {
        this.dataLoading = false
        this.$message.error(this.$t('resourceMgr.queryImagesFailed'))
        this.handleClose()
      })
    },
    getSlimStatusDesc (status) {
      let _dec = ''
      IMAGESTATUS.forEach(item => {
        if (status === item.value) {
          _dec = this.language === 'cn' ? item.labelcn : item.labelen
          return _dec
        }
      })
      return _dec
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
.sysImage-content{
  .search-createBtn{
    .create-col{
      padding-right: 38px !important;
      padding-right: 38px !important;
      text-align: center;
    }
  }
  .sysImage-table{
    width: 600px;
    margin: 10px auto;
    .tableStyle /deep/ .el-table__fixed-right-patch{
      background-color: #edeef8 !important;
    }
  }
}
</style>
