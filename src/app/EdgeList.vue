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
        <el-button
          type="primary"
          @click="multipleDeploy"
        >
          {{ $t('app.distriList.multipleDeploy') }}
        </el-button>
      </div>
      <el-table
        class="mt20"
        border
        size="small"
        style="width: 100%;"
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
          align="center"
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
              id="deployBtn"
              @click="deploy(scope.row,1)"
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
      :close-on-click-modal="false"
      :title="$t('app.distriList.deploymentConf')"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form
        label-width="130px"
        class="configForm"
        :model="configForm"
        status-icon
        ref="configForm"
        :rules="rules"
      >
        <p>MEC Host</p>
        <el-form-item :label="$t('app.packageList.ip')">
          <div
            v-for="(item,index) in hostList"
            :key="index"
          >
            <span
              class="hostip"
            >{{ item.hostIp }}</span>
            <span
              v-if="item.status === 'Distributed'"
              class="success"
            ><em class="el-icon-success" />{{ item.status }}</span>
            <span
              v-else-if="item.status === 'Processing'"
              class="primary"
            ><em class="el-icon-loading" />{{ item.status }}</span>
            <span
              v-else
              class="error"
            ><em class="el-icon-error" />{{ item.status }}</span>
          </div>
        </el-form-item>
        <p>APP Information</p>
        <el-form-item
          :label="$t('app.distriList.appName')"
          prop="appName"
        >
          <el-input
            id="appname"
            maxlength="20"
            v-model="configForm.appName"
          />
        </el-form-item>
        <el-form-item
          :label="$t('app.distriList.appDesc')"
          prop="appInstanceDescription"
        >
          <el-input
            id="appdesc"
            maxlength="120"
            v-model="configForm.appInstanceDescription"
          />
        </el-form-item>
        <el-form-item
          label="硬件能力"
          prop="hwCapabilities"
        >
          <el-checkbox-group
            v-model="configForm.hwCapabilities"
          >
            <el-checkbox
              v-for="item in capabilities"
              :label="item"
              :key="item"
            >
              {{ item }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <p>POD Information</p>
        <el-form-item :label="$t('app.distriList.podName')">
          <el-input
            id="podname"
            maxlength="20"
            v-model="configForm.podName"
          />
        </el-form-item>
        <el-form-item :label="$t('app.distriList.podKind')">
          <el-input
            id="podkind"
            maxlength="30"
            v-model="configForm.podKind"
          />
        </el-form-item>
        <el-form-item :label="$t('app.distriList.podNameEspace')">
          <el-input
            id="podnameespace"
            maxlength="30"
            v-model="configForm.podNameEspace"
          />
        </el-form-item>
        <el-form-item :label="$t('app.distriList.podSel')">
          <el-input
            id="podsel"
            maxlength="30"
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
          @click="dialogVisible = false,loading=false"
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
  props: {
    appid: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      loading: false,
      currPageTableData: [],
      paginationData: [],
      searchVal: '',
      selectedNum: 0,
      selectData: null,
      selectedData: [],
      appPackageId: '',
      appVersion: '',
      appPackageName: '',
      appAffinity: '',
      provider: '',
      dialogVisible: false,
      configForm: {
        podName: 'pod1',
        podKind: 'dployment',
        podNameEspace: 'default',
        podSelector: 'martchlabel',
        status: '',
        appPackageId: '',
        appName: '',
        appInstanceDescription: '',
        appId: this.appid,
        hwCapabilities: []
      },
      rules: {
        appName: [
          { required: true, message: 'App name can not be empty', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{4,16}$/, message: this.$t('verify.hostNameVerify') }
        ],
        appInstanceDescription: [
          { required: true, message: this.$t('verify.descVerify'), trigger: 'blur' }
        ]
      },
      dataLoading: true,
      tableData: [],
      packageData: [],
      interval: null,
      instanceId: '',
      timer: null,
      distributionStatus: ['Distributed', 'Error'],
      serchData: null,
      hostList: [],
      capabilities: ['GPU', 'NPU']
    }
  },
  mounted () {
    this.initList()
    this.interval = setInterval(() => {
      this.initList()
    }, 15000)
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
    multipleDeploy () {
      this.configForm = {
        podName: 'pod1',
        podKind: 'dployment',
        podNameEspace: 'default',
        podSelector: 'martchlabel',
        status: '',
        appPackageId: '',
        appName: '',
        appInstanceDescription: '',
        appId: this.appid,
        hwCapabilities: []
      }
      if (this.selectData !== null && this.selectData.length > 0) {
        let allStatus = []
        this.selectData.forEach(item => {
          allStatus.push(item.status)
        })
        if (!allStatus.includes('Error')) {
          this.deploy(this.selectData, 2)
        } else {
          this.$message.error(this.$t('app.disriList.deleteError'))
        }
      } else {
        this.$message.warning('Please select one package at least!')
      }
    },
    beforeDelete (rows) {
      this.$confirm(this.$t('tip.beforeDeleteFromMechost'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        let hostIp = rows.hostIp
        let type = 1
        app.deleteDistributionApp(type, hostIp, this.appPackageId).then(res => {
          this.showMessage('success', this.$t('tip.deletePacFrmoHost'), 1500)
          this.initList()
        })
      }).catch(() => {
      })
    },
    initList () {
      app.getDistributionList().then(res => {
        this.paginationData = []
        res.data.forEach(item => {
          if (item.appId === this.appid) {
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
    deploy (row, type) {
      this.configForm = {
        podName: 'pod1',
        podKind: 'dployment',
        podNameEspace: 'default',
        podSelector: 'martchlabel',
        status: '',
        appPackageId: '',
        appName: '',
        appInstanceDescription: '',
        appId: this.appid,
        hwCapabilities: []
      }
      this.hostList = []
      this.configForm.appPackageId = this.appPackageId
      this.configForm.appId = this.appid
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.configForm.resetFields()
      })
      if (type === 2) {
        let array = []
        row.forEach(item => {
          array.push(item.hostIp)
        })
        this.configForm.mecHost = array
        this.hostList = row
      } else {
        this.configForm.mecHost = row.hostIp
        this.hostList.push(row)
      }
    },
    confirmToDeploy (configForm) {
      this.$refs[configForm].validate((valid) => {
        if (valid) {
          let params = {
            appId: this.configForm.appId,
            appPackageId: this.configForm.appPackageId,
            appName: this.configForm.appName,
            appInstanceDescription: this.configForm.appInstanceDescription,
            mecHost: this.configForm.mecHost,
            hwCapabilities: this.configForm.hwCapabilities
          }
          this.loading = true
          if (typeof (params.mecHost) === 'string') {
            app.confirmToDeploy(params).then(res => {
              let instanceId = res.data.response.app_instance_id
              this.timer = setTimeout(() => { this.queryInstanceStatus(instanceId) }, 1000)
            }).catch(() => {
              this.$message.error(this.$t('tip.deployFailed'))
              this.dialogVisible = false
            })
          } else {
            app.confirmToBatchDeploy(params).then(res => {
              let instanceIds = res.data.response
              this.timer = setTimeout(() => { this.batchInstaniateApp(instanceIds) }, 1000)
            }).catch(() => {
              this.$message.error(this.$t('tip.deployFailed'))
              this.dialogVisible = false
            })
          }
        }
      })
    },
    queryInstanceStatus (instanceids) {
      app.getInstanceInfo(instanceids).then(res1 => {
        let status = res1.data.response.operationalStatus
        if (status === 'Created') {
          this.instaniateApp(instanceids)
        } else if (status === 'Create failed') {
          this.$message.error(res1.data.response.operationInfo)
          this.dialogVisible = false
          this.loading = false
        } else {
          this.queryInstanceStatus()
        }
      }).catch(err => {
        if (err.name === 'Error' && err.message === 'Request failed with status code 404') {
          setTimeout(() => { this.queryInstanceStatus() }, 1000)
        } else {
          throw err
        }
      })
    },
    instaniateApp (instanceId) {
      app.instantiateApp(instanceId).then(response => {
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
    batchInstaniateApp (instanceId) {
      let obj = {
        appInstanceIds: []
      }
      instanceId.forEach(item => {
        obj.appInstanceIds.push(item.appInstanceId)
      })
      app.batchInstantiateApp(obj).then(response => {
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
      this.selectData = selection
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
  .hostip{
    margin-right:10px;
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
