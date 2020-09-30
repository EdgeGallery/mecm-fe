<!--
  -  Copyright 2020 Huawei Technologies Co., Ltd.
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
      :first="$t('nav.mecm')"
      :second="$t('nav.appMana')"
      :third="$t('nav.appInstance')"
    />
    <div class="ainsList">
      <Search
        :affinity-item="false"
        :status-item="true"
        :status="status"
        @getSearchData="getSearchData"
      />
      <div class="tableDiv">
        <el-table
          :data="currPageTableData"
          v-loading="dataLoading"
          border
          style="width: 100%;"
        >
          <el-table-column
            prop="appName"
            sortable
            :label="$t('app.packageList.name')"
          />
          <el-table-column
            prop="appDescriptor"
            :label="$t('app.packageList.desc')"
          />
          <el-table-column
            prop="mecHost"
            :label="$t('app.distriList.mecHost')"
          />
          <el-table-column
            prop="applcmHost"
            :label="$t('system.edgeNodes.applcmIp')"
          />
          <el-table-column
            :label="$t('app.distriList.status')"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.operationalStatus === 'Instantiated'"
                class="success"
              ><em class="el-icon-success" />{{ scope.row.operationalStatus }}</span>
              <span
                v-else-if="scope.row.operationalStatus === 'Created'"
                class="primary"
              ><em class="el-icon-loading" />{{ scope.row.operationalStatus }}</span>
              <span
                v-else
                class="error"
              ><em class="el-icon-error" />{{ scope.row.operationalStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('common.operation')"
          >
            <template slot-scope="scope">
              <el-button
                id="deleteBtn"
                @click="beforeDelete(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.delete') }}
              </el-button>
              <el-button
                id="detailBtn"
                @click="checkDetail(scope.row)"
                :disabled="scope.row.operationalStatus !== 'Instantiated'"
                type="text"
                size="small"
              >
                {{ $t('common.detail') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBar">
          <Pagination
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :title="$t('app.instanceList.instanceDetail')"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <el-form
          label-width="130px"
          class="detailForm"
          v-for="(item,index) in detailData"
          :key="index"
        >
          <el-form-item label="Pod Name:">
            <span>{{ item.podname }}</span>
          </el-form-item>
          <el-form-item label="Pod Status:">
            <span
              v-if="item.podstatus === 'Running'"
              class="success"
            ><em class="el-icon-success" />{{ item.podstatus }}</span>
            <span
              v-else
              class="failed"
            ><em class="el-icon-error" />{{ item.podstatus }}</span>
          </el-form-item>
          <el-form-item
            label="Container Name:"
          >
            <span>{{ item.containers[0].containername }}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Search from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'
import Breadcrumb from '../components/BreadCrumb'
import { app } from '../tools/request.js'

export default {
  name: 'AinsList',
  components: {
    Search, Pagination, Breadcrumb
  },
  data () {
    return {
      status: ['Instantiated', 'Created', 'Instantiation Failed'],
      currPageTableData: [],
      paginationData: [],
      dataLoading: true,
      tableData: [],
      dialogVisible: false,
      interval: '',
      detailForm: {
        podName: ''
      },
      detailData: [],
      serchData: null
    }
  },
  mounted () {
    this.initList()
    this.interval = setInterval(() => {
      this.initList()
    }, 10000)
  },
  beforeDestroy () {
    this.clearInterval()
  },
  methods: {
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
    },
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key].toLowerCase()
        return itemVal.indexOf(val) > -1
      })
    },
    getSearchData (data) {
      this.serchData = data
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = ''
            if (key === 'status') {
              dataKey = 'operationalStatus'
            } else if (key === 'name') {
              dataKey = 'appName'
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
    beforeDelete (rows) {
      this.$confirm(this.$t('app.instanceList.beforeDelete'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.confirmDetlete(rows.appInstanceId)
      }).catch(() => {
      })
    },
    initList () {
      app.getInstanceList().then(res => {
        this.tableData = this.paginationData = res.data.response
        if (this.serchData) {
          this.getSearchData(this.serchData)
        }
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    confirmDetlete (appInstanceId) {
      app.deleteInstanceApp(appInstanceId).then(response => {
        this.initList()
        this.$message.success(this.$t('tip.deleteSuc'))
      }).catch((error) => {
        this.$message.error(error.message)
      })
    },
    checkDetail (rows) {
      app.getInstanceDetail(rows.appInstanceId).then(response => {
        let data = JSON.parse(response.data.response)
        this.detailData = data.pods
        this.dialogVisible = true
      }).catch((error) => {
        if (error.response.status === 404) {
          this.$message.warning(this.$t('tip.getStatusDelay'))
        } else {
          this.$message.error('Network Error')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.ainsList{
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
  .appStore{
    width:30%;
    height:185px;
    border:1px solid #ddd;
    border-radius: 8px;
    padding:15px;
    .lt{
      width: 30%;
      padding:15px;
      img{
        position: relative;
        left:15px;
      }
      p{
        padding-top:20px;
        text-align: center;
      }
    }
    .rt{
      width:60%;
      div{
        float:left;
        width:46%;
        height:80px;
        border:1px solid #ddd;
        border-radius: 4px;
        margin:0 5px 20px 0;
        text-align: center;
        line-height:30px;
        font-size: 15px;
        font-weight: bold;
        p:first-child{
          margin-top:15px;
        }
        p:nth-child(2){
          color:green;
        }
      }
    }
  }
  .tableDiv{
    padding-top:25px;
    p{
      padding-bottom:5px;
      .rt{
        margin-bottom:15px;
      }
    }
  }
  i{
    margin-right: 5px;
  }
  .detailForm{
    p{
      margin-bottom: 12px;
    }
    p::before{
      content:'';
      display:inline-block;
      width:3px;
      height:15px;
      margin-right:3px;
      background: #409EFF;
      position: relative;
      top:3px;
    }
    .el-form-item{
      margin-bottom: 12px!important;
    }
  }
}
</style>
