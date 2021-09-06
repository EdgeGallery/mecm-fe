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
      {{ $t('nav.appInstance') }}
      <div class="block" />
    </div>
    <div class="contentList">
      <Search
        :placeholder="$t('tip.fuzzyQuery')"
        @getSearchData="getSearchData"
      />
      <span class="btnSearch">
        <el-button
          type="primary"
          @click="beforeDelete(selectData,1)"
        >
          <span>{{ $t('app.instanceList.batchDelete') }}</span>
        </el-button>
      </span>
      <div class="tableDiv">
        <el-table
          size="small"
          :data="currPageTableData"
          v-loading="dataLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            revers-selection
            width="50"
          />
          <el-table-column
            sortable
            :label="$t('app.packageList.name')"
          >
            <template slot-scope="scope">
              <div
                class="name"
                @click="handleRowSelection(scope.row)"
                :disabled="scope.row.operationalStatus !== 'Instantiated'"
              >
                {{ scope.row.appName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="mecHost"
            :label="$t('app.distriList.mecHost')"
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
              ><em class="el-icon-error" />
                {{ scope.row.operationalStatus }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('app.distriList.appDesc')"
            prop="appDescriptor"
          />
          <el-table-column
            :label="$t('common.operation')"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                id="deleteBtn"
                @click="beforeDelete(scope.row,2)"
                type="button"
                size="small"
              >
                {{ $t('common.delete') }}
              </el-button>
              <el-button
                type="button"
                size="small"
                @click="showReason(scope.row)"
                :disabled="scope.row.operationalStatus === 'Instantiated'"
              >
                {{ $t('tip.operationInfo') }}
              </el-button>
              <el-button
                type="button"
                size="small"
                @click="jump(scope.row)"
                :disabled="scope.row.operationalStatus !== 'Instantiated'"
              >
                {{ $t('nav.ruleConfiguration') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageBar">
          <Pagination
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :show-close="false"
        :visible.sync="instanceListVisible"
        width="width"
      >
        <div class="secondLabel">
          {{ $t('app.instanceList.appKPI') }}
        </div>
        <div>
          <div style="min-height:280px;">
            <el-row :gutter="10">
              <el-col
                :span="5"
                style="height:200px;"
              >
                <InstanceUsage :kpi-info="kpiInfo" />
              </el-col>
              <el-col
                :span="19"
                style="margin-top:15px;"
              >
                <el-table
                  ref="podTable"
                  :data="podTable"
                  class="mt20 detailTab"
                  size="small"
                >
                  <el-table-column
                    prop="podname"
                    :label="$t('app.distriList.podName')"
                  />
                  <el-table-column
                    prop="podstatus"
                    :label="$t('app.distriList.status')"
                  />
                  <el-table-column
                    :label="$t('overview.mem')"
                  >
                    <template slot-scope="scope">
                      {{ getMemValue(scope.row) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('overview.cpu')"
                  >
                    <template slot-scope="scope">
                      {{ getCpuValue(scope.row) }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        :show-close="false"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <div class="secondLabel">
          {{ $t('app.instanceList.instanceDetail') }}
        </div>
        <el-form
          label-width="auto"
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
import Search from '../../components/common/Search.vue'
import Pagination from '../../components/common/Pagination.vue'
import { appo } from '../../tools/request.js'
import InstanceUsage from '../overview/InstanceUsage.vue'
export default {
  name: 'AinsList',
  components: {
    Search,
    Pagination,
    InstanceUsage
  },
  data () {
    return {
      loading: false,
      status: ['Instantiated', 'Create failed', 'Instantiation failed'],
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
      searchData: null,
      selectData: [],
      podTable: [],
      instanceListVisible: false,
      kpiInfo: {},
      appKPIInfo: {}
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
    getMemValue (rowVal) {
      let val = rowVal.containers[0].metricsusage.memusage.split('/')
      return ((val[0] / val[1]) * 100).toFixed(2) + '%'
    },
    getCpuValue (rowVal) {
      let val = rowVal.containers[0].metricsusage.cpuusage.split('/')
      return ((val[0] / val[1]) * 100).toFixed(2) + '%'
    },
    cancelToSync () {
      this.instanceListVisible = false
    },
    jump (row) {
      sessionStorage.setItem('instanceId', row.appInstanceId)
      sessionStorage.setItem('instanceName', row.appName)
      this.$router.push('/mecm/app/ruleconfig')
    },
    showReason (row) {
      this.$alert(row.operationInfo, this.$t('tip.operationInfo'))
    },
    clearInterval () {
      clearTimeout(this.interval)
      this.interval = null
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
        this.initList()
      }
    },
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    handleSelectionChange (selection) {
      this.selectData = selection
    },
    handleRowSelection (row) {
      appo.getServiceInfo(row.appInstanceId).then(res => {
        this.appKPIInfo = JSON.parse(res.data.response)
        this.podTable = this.appKPIInfo.pods
        if (this.podTable) {
          this.instanceListVisible = true
          this.getUsageData()
        } else {
          this.instanceListVisible = false
          this.$notify.warning({
            title: 'Info',
            offset: 50,
            message: 'There is no data exist.',
            showClose: false,
            duration: 2000
          })
        }
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          this.$message.warning(this.$t('tip.getStatusDelay'))
        }
        this.loginStatus(error)
      })
    },
    getUsageData () {
      let matrics = this.appKPIInfo
      if (matrics) {
        this.kpiInfo = {
          'cpuusage': matrics.cpupercent,
          'memusage': matrics.mempercent
        }
      } else {
        this.kpiInfo = {}
      }
    },
    beforeDelete (rows, type) {
      if (type === 1) {
        if (rows.length > 0) {
          this.$confirm(this.$t('app.instanceList.beforeDelete'), this.$t('common.warning'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            closeOnClickModal: false,
            type: 'warning'
          }).then(() => {
            this.multipleDelete(rows)
          })
        } else {
          this.$message.warning(this.$t('tip.onePackageAtLeast'))
        }
      } else {
        this.$confirm(this.$t('app.instanceList.beforeDelete'), this.$t('common.warning'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          this.confirmDetlete(rows.appInstanceId)
        })
      }
    },
    initList () {
      appo.getInstanceList().then(res => {
        this.tableData = this.paginationData = res.data.response
        if (this.searchData) {
          this.getSearchData(this.searchData)
        }
        this.dataLoading = false
      }).catch((error) => {
        this.tableData = this.paginationData = []
        this.dataLoading = false
        console.log(error)
      })
    },
    multipleDelete (rows) {
      let obj = {
        appInstanceIds: []
      }
      rows.forEach(item => {
        obj.appInstanceIds.push(item.appInstanceId)
      })
      this.dataLoading = true
      appo.batchDeleteInstanceApp(obj).then(response => {
        this.timeout()
      }).catch((error) => {
        this.loginStatus(error)
      })
    },
    loginStatus (error) {
      if (error.response && error.response.status === 403) {
        this.$message.error(this.$t('tip.loginOperation'))
      }
    },
    confirmDetlete (appInstanceId) {
      this.dataLoading = true
      appo.deleteInstanceApp(appInstanceId).then(response => {
        this.timeout()
      }).catch((error) => {
        this.loginStatus(error)
      })
    },
    // checkDetail (rows) {
    //   appo.getInstanceDetail(rows.appInstanceId).then(response => {
    //     let data = JSON.parse(response.data.response)
    //     this.detailData = data.pods
    //     this.dialogVisible = true
    //   }).catch((error) => {
    //     if (error.response.status === 404) {
    //       this.$message.warning(this.$t('tip.getStatusDelay'))
    //     }
    //     this.loginStatus(error)
    //   })
    // },
    timeout () {
      setTimeout(() => {
        this.initList()
      }, 1500)
      this.showMessage('success', this.$t('tip.deleteSuc'), 1500)
    }
  }
}
</script>

<style lang='less' scoped>
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
  .detailTab {
    margin-top: -10px
  }
  #deleteInsBtn{
    background: #5E40C8;
  }
</style>
