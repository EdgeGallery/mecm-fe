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
  <div class="edgeList">
    <Search
      :type-item="false"
      :name-item="false"
      :affinity-item="false"
      :ip-item="true"
      :status-item="true"
      :status="distributionStatus"
      @getSearchData="getSearchData"
    />
    <div class="tableDiv">
      <div class="btn-group rt">
        <el-button type="primary">
          批量部署
        </el-button>
      </div>
      <el-table
        :data="currPageTableData"
        v-loading="dataLoading"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%;"
      >
        <el-table-column
          type="selection"
          revers-selection
          width="50"
        />
        <el-table-column
          prop="appPackageName"
          :label="$t('app.packageList.name')"
          width="180"
        >
          <template>
            <div>
              {{ this.appPackageName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="appVersion"
          :label="$t('app.packageList.version')"
          width="130"
        >
          <template>
            <div>
              {{ this.appVersion }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="provider"
          :label="$t('app.packageList.vendor')"
          width="160"
        >
          <template>
            <div>
              {{ this.provider }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="appAffinity"
          :label="$t('app.packageList.affinity')"
          width="120"
        >
          <template>
            <div>
              {{ this.appAffinity }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="hostIp"
          :label=" $t('app.distriList.hostIp')"
        />
        <el-table-column
          prop="status"
          :label=" $t('app.distriList.status')"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.status === 'Distributed'"
              class="success"
            ><em class="el-icon-success" />{{ scope.row.status }}</span>
            <span
              v-else-if="scope.row.status === 'Processing'"
              class="primary"
            ><em class="el-icon-loading" />{{ scope.row.status }}</span>
            <span
              v-else
              class="error"
            ><em class="el-icon-error" />{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('common.operation')"
        >
          <template slot-scope="scope">
            <el-button
              id="deleteBtn"
              @click.native.prevent="beforeDelete(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('common.delete') }}
            </el-button>
            <el-button
              id="distributeBtn"
              @click="deploy(scope.row)"
              :disabled="scope.row.status !=='Distributed'"
              type="text"
              size="small"
            >
              {{ $t('app.distriList.deploy') }}
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
      :title="$t('app.distriList.deploymentConf')"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        label-width="130px"
        class="configForm"
        :model="configForm"
        ref="configForm"
        :rules="rules"
      >
        <p>MEPM Information</p>
        <el-form-item :label="$t('app.distriList.status')">
          <span
            v-if="configForm.status === 'Distributed'"
            class="success"
          ><em class="el-icon-success" />{{ configForm.status }}</span>
          <span
            v-else-if="configForm.status === 'Processing'"
            class="primary"
          ><em class="el-icon-loading" />{{ configForm.status }}</span>
          <span
            v-else
            class="error"
          ><em class="el-icon-error" />{{ configForm.status }}</span>
        </el-form-item>
        <p>MEC Host</p>
        <el-form-item :label="$t('app.packageList.ip')">
          <span class="primary">{{ configForm.mecHost }}</span>
        </el-form-item>
        <p>APP Information</p>
        <el-form-item
          :label="$t('app.distriList.appName')"
          prop="appName"
        >
          <el-input
            id="appname"
            v-model="configForm.appName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('app.distriList.appDesc')"
          prop="appInstanceDescription"
        >
          <el-input
            id="appdesc"
            v-model="configForm.appInstanceDescription"
          />
        </el-form-item>
        <p>POD Information</p>
        <el-form-item :label="$t('app.distriList.podName')">
          <el-input
            id="podname"
            v-model="configForm.podName"
          />
        </el-form-item>
        <el-form-item :label="$t('app.distriList.podKind')">
          <el-input
            id="podkind"
            v-model="configForm.podKind"
          />
        </el-form-item>
        <el-form-item :label="$t('app.distriList.podNameEspace')">
          <el-input
            id="podnameespace"
            v-model="configForm.podNameEspace"
          />
        </el-form-item>
        <el-form-item :label="$t('app.distriList.podSel')">
          <el-input
            id="podsel"
            v-model="configForm.podSelector"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          id="cancelBtn"
          @click="dialogVisible = false"
        >{{ $t('common.cancel') }}</el-button>
        <el-button
          id="confirmBtn"
          type="primary"
          @click="confirmToDeploy('configForm')"
          :loading="loading"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Search from '../components/Search.vue'
import Pagination from '../components/Pagination.vue'
import { app } from '../tools/request.js'
export default {
  name: 'EdgeList',
  components: {
    Search, Pagination
  },
  data () {
    return {
      loading: false,
      currPageTableData: [],
      paginationData: [],
      searchVal: '',
      selectedNum: 0,
      selectedData: [],
      appPackageId: '',
      appVersion: '',
      appPackageName: '',
      appAffinity: '',
      provider: '',
      dialogVisible: false,
      appId: sessionStorage.getItem('appId'),
      configForm: {
        podName: 'pod1',
        podKind: 'dployment',
        podNameEspace: 'default',
        podSelector: 'martchlabel',
        status: '',
        appPackageId: '',
        appName: '',
        appInstanceDescription: '',
        mecHost: '',
        appId: sessionStorage.getItem('appId')
      },
      rules: {
        appName: [
          { required: true, message: 'App name can not be empty', trigger: 'blur' }
        ],
        appInstanceDescription: [
          { required: true, message: 'App instance description can not be empty', trigger: 'blur' }
        ]
      },
      dataLoading: true,
      tableData: [],
      packageData: [],
      interval: null,
      instanceId: '',
      timer: null,
      distributionStatus: ['Distributed', 'Error'],
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
      clearTimeout(this.timer)
      this.timer = null
    },
    // 对app表格进行筛选 val：需要查询的值  key: 数据对应的字段
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key].toLowerCase()
        return itemVal.indexOf(val) > -1
      })
    },
    // 根据搜索组件进行筛选
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
              dataKey = 'status'
            } else if (key === 'ip') {
              dataKey = 'hostIp'
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
      this.$confirm(this.$t('tip.beforeDeleteFromMechost'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let hostIp = rows.hostIp
        let type = 1
        app.deletDistributionApp(type, hostIp, this.appPackageId).then(res => {
          this.$message.success(this.$t('tip.deletePacFrmoHost'))
          this.initList()
        })
      }).catch(() => {
      })
    },
    initList () {
      app.getDistributionList().then(res => {
        this.paginationData = []
        res.data.forEach(item => {
          if (item.appId === this.appId) {
            this.appPackageId = item.appPkgId
            this.appPackageName = item.appPkgName
            this.appVersion = item.appPkgVersion
            this.appAffinity = item.appPkgAffinity
            this.provider = item.appProvider
            this.paginationData = item.mecHostInfo
          }
        })
        this.tableData = this.paginationData
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
    deploy (row) {
      this.configForm.status = row.status
      this.configForm.appPackageId = this.appPackageId
      this.configForm.mecHost = row.hostIp
      this.configForm.appId = this.appId
      this.dialogVisible = true
    },
    confirmToDeploy (configForm) {
      this.loading = true
      this.$refs[configForm].validate((valid) => {
        if (valid) {
          let params = {
            appId: this.configForm.appId,
            appPackageId: this.configForm.appPackageId,
            appName: this.configForm.appName,
            appInstanceDescription: this.configForm.appInstanceDescription,
            mecHost: this.configForm.mecHost
          }
          app.confirmToDeploy(params).then(res => {
            this.instanceId = res.data.response.app_instance_id
            this.timer = setTimeout(() => { this.queryInstanceStatus(this.instanceId) }, 1000)
          }).catch(() => {
            this.$message.error(this.$t('tip.deployFailed'))
            this.dialogVisible = false
          })
        }
      })
    },
    queryInstanceStatus () {
      app.getInstanceInfo(this.instanceId).then(res1 => {
        let status = res1.data.response.operationalStatus
        if (status === 'Created') {
          this.instaniateApp(res1)
        } else if (status === 'Create failed') {
          this.$message.error('create instance error!')
          this.dialogVisible = false
          this.loading = false
        } else {
          this.queryInstanceStatus()
        }
      })
    },
    instaniateApp (res1) {
      app.instantiateApp(this.instanceId).then(response => {
        this.loading = false
        this.dialogVisible = false
        this.$nextTick(() => {
          this.$router.push('/mecm/ains/list')
        })
      }).catch(() => {
        this.$message.error(this.$t('tip.deployFailed'))
        this.dialogVisible = false
        this.loading = false
      })
    },
    handleSelectionChange (selection) {
      this.selectedNum = selection.length
    }
  }
}
</script>

<style lang='less' scoped>
.edgeList{
  .btn-group{
    margin-bottom: 15px;
  }
  .appStore{
    width:30%;
    height:185px;
    border:1px solid #ddd;
    border-radius: 8px;
    padding:15px;
    .lt{
      width: 30%;
      padding:15px;
      text-align: center;
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
      position: relative;
      top:15px;
      .rt{
        margin-bottom:15px;
      }
    }
  }
}
.createBtn{
  position: relative;
  top: 3px;
}
.tableStatus{
  i{
    margin-right:5px;
  }
}
.configForm{
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
    margin-bottom: 20px!important;
  }
}
.listItem{
  border-bottom: 1px solid #ddd;
  padding-top:10px;
  .el-button{
    position: relative;
    top:-6px;
  }
}
</style>
