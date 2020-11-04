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
      :second="$t('nav.system')"
      :third="$t('nav.edgeNode')"
      :path="{ path: '/mecm/systems/external/applcm' }"
    />
    <div class="sysk8s">
      <Search
        :status-item="false"
        :affinity-item="false"
        :ip-item="true"
        @getSearchData="getSearchData"
      />
      <div class="tableDiv">
        <el-row>
          <el-col
            :span="2"
            :offset="22"
          >
            <div class="el-row-button rt">
              <el-button
                id="newregBtn"
                type="primary"
                @click="register()"
              >
                {{ $t('system.appLcm.newReg') }}
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row class="table">
          <el-table
            :data="currPageTableData"
            v-loading="dataLoading"
            border
          >
            <el-table-column
              prop="mechostName"
              sortable
              :label="$t('app.packageList.name')"
              width="120"
            />
            <el-table-column
              prop="mechostIp"
              sortable
              :label="$t('app.packageList.ip')"
              width="120"
            />
            <el-table-column
              prop="city"
              sortable
              :label="$t('app.packageList.city')"
            />
            <el-table-column
              prop="address"
              sortable
              :label="$t('app.packageList.address')"
              width="120"
            />
            <el-table-column
              prop="affinity"
              sortable
              :label="$t('app.packageList.affinity')"
            />
            <el-table-column
              prop="capability"
              label="HM Capability"
            />
            <el-table-column
              prop="edgerepoIp"
              sortable
              label="Edge RepoIP"
            />
            <el-table-column
              prop="edgerepoPort"
              sortable
              label="Edge Repo Port"
            />
            <el-table-column
              prop="applcmIp"
              sortable
              label="App LCM IP"
            />
            <el-table-column
              :label="$t('common.operation')"
              width="200"
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
                  id="uploadBtn"
                  @click.native.prevent="uploadFile(scope.row)"
                  type="text"
                  size="small"
                >
                  {{ $t('system.edgeNodes.uploadFile') }}
                </el-button>
                <el-button
                  id="modifyBtn"
                  @click="handleModify(scope.row)"
                  type="text"
                  size="small"
                >
                  {{ $t('common.modify') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pageBar">
          <pagination
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        style="padding-right:30px;"
        width="40%"
      >
        <div class="k8s">
          <el-row>
            <el-form
              label-width="120px"
              :model="currForm"
              ref="currForm"
              :rules="rules"
            >
              <el-form-item
                :label="$t('system.edgeNodes.systemPlatform')"
              >
                <el-radio-group
                  v-model="radio"
                  @change="changeType"
                >
                  <el-radio
                    label="1"
                  >
                    K8S
                  </el-radio>
                  <el-radio
                    label="2"
                    :disabled="true"
                  >
                    OpenStack
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.name')"
                prop="mechostName"
              >
                <el-input
                  id="hostname"
                  maxlength="20"
                  v-model="currForm.mechostName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.ip')"
                prop="mechostIp"
              >
                <el-input
                  id="ip"
                  v-model="currForm.mechostIp"
                  :disabled="isDisable"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.deployArea')"
                prop="city"
              >
                <area-select
                  v-if="area"
                  v-model="selectedArea"
                  :data="$pcaa"
                  :level="3"
                  type="text"
                  @change="handleCityChange"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.address')"
                prop="address"
              >
                <el-input
                  id="address"
                  maxlength="80"
                  v-model="currForm.address"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.affinity')"
                prop="affinity"
              >
                <el-radio-group v-model="currForm.affinity">
                  <el-radio
                    v-for="(item,index) in affinityList"
                    :key="index"
                    :label="item"
                  >
                    {{ item }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                label="HM Capability"
                prop="capability"
              >
                <el-checkbox-group v-model="capability">
                  <el-checkbox label="CPU" />
                  <el-checkbox label="GPU" />
                  <el-checkbox label="NPU" />
                </el-checkbox-group>
              </el-form-item>

              <el-form-item
                label="Vendor & Model"
              >
                <el-input
                  id="vendor"
                  maxlength="20"
                  v-model="vendor"
                  width="50%"
                />
              </el-form-item>

              <el-form-item
                label="App LCM"
                prop="applcmIp"
              >
                <el-select
                  id="applcmip"
                  v-model="currForm.applcmIp"
                  :placeholder="$t('system.edgeNodes.applcmIp')"
                >
                  <el-option
                    v-for="(item,index) in applcmList"
                    :key="index"
                    :label="item.applcmIp"
                    :value="item.applcmIp"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('system.appLcm.userNmae')"
                prop="username"
                v-if="op"
              >
                <el-input
                  id="username"
                  maxlength="20"
                  v-model="currForm.username"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appLcm.password')"
                prop="password"
                v-if="op"
              >
                <el-input
                  id="password"
                  maxlength="30"
                  v-model="currForm.password"
                  type="password"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.edgeNexusIp')"
                prop="edgerepoIp"
              >
                <el-input
                  id="edgeip"
                  v-model="currForm.edgerepoIp"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.edgeNexusPort')"
                prop="edgerepoPort"
              >
                <el-input
                  id="edgeport"
                  v-model="currForm.edgerepoPort"
                />
              </el-form-item>
            </el-form>
          </el-row>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            id="cancelBtn"
            @click="cancel()"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            id="confirmBtn"
            type="primary"
            @click="confirm('currForm')"
          >{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :title="$t('system.edgeNodes.uploadFile')"
        :visible.sync="dialogVisibleUpload"
        width="30%"
      >
        <el-upload
          id="upload"
          class="upload-demo"
          drag
          action=""
          :http-request="submitUpload"
          :file-list="fileList"
          multiple
          :limit="1"
        >
          <em class="el-icon-upload" />
          <div class="el-upload__text">
            {{ $t('system.edgeNodes.howToUpload') }}
          </div>
          <div
            class="el-upload__tip"
            slot="tip"
          >
            {{ $t('system.edgeNodes.uploadTip') }}
          </div>
        </el-upload>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { system, app } from '../../tools/request.js'
import pagination from '../../components/Pagination.vue'
import Search from '../../components/Search.vue'
import Breadcrumb from '../../components/BreadCrumb'
export default {
  name: 'Sysk8s',
  components: {
    Search, pagination, Breadcrumb
  },
  data () {
    return {
      paginationData: [],
      currPageTableData: [],
      dataLoading: true,
      tableData: [],
      dialogVisible: false,
      dialogVisibleUpload: false,
      fileList: [],
      applcmList: [],
      op: false,
      radio: '1',
      area: false,
      selectedArea: ['北京市', '北京市', '东城区', '东华门街道'],
      currForm: {
        'address': '',
        'affinity': '',
        'applcmIp': '',
        'city': '北京市/北京市/东城区/东华门街道',
        'edgeName': '',
        'edgerepoIp': '',
        'edgerepoPort': '',
        'edgerepoUsername': '',
        'mechostIp': '',
        'mechostName': '',
        'userName': '',
        'zipCode': ''
      },
      rules: {
        mechostIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        mechostName: [
          { required: true, message: this.$t('verify.hostnameTip'), trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: this.$t('verify.hostNameVerify') }
        ],
        city: [
          { required: true, message: this.$t('tip.typeCity'), trigger: 'blur' }
        ],
        address: [
          { required: true, message: this.$t('verify.addressTip'), trigger: 'blur' }
        ],
        edgerepoIp: [
          { required: true, message: this.$t('verify.edgeNexusIpTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        edgerepoPort: [
          { required: true, message: this.$t('verify.edgeNexusPortTip'), trigger: 'blur' },
          { pattern: /^[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        applcmIp: [
          { required: true, message: this.$t('verify.appLcmIpTip'), trigger: 'blur' }
        ],
        affinity: [
          { required: true, message: this.$t('verify.affinityTip'), trigger: 'blur' }
        ]
      },
      title: '',
      editType: 1,
      isDisable: false,
      affinityList: ['X86', 'ARM64', 'ARM32'],
      capability: [],
      vendor: ''
    }
  },
  mounted () {
    this.getNodeListInPage()
  },
  methods: {
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key]
        if (itemVal) return itemVal.toLowerCase().indexOf(val) > -1
      })
    },
    // 根据搜索组件进行筛选
    getSearchData (data) {
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = key
            if (key === 'ip') {
              dataKey = 'mechostIp'
            } else if (key === 'name') {
              dataKey = 'mechostName'
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
    changeType () {
      this.op = !this.op
    },
    handleCityChange (val) {
      this.currForm.city = val.join('/')
    },
    uploadFile (row) {
      this.fileList = []
      this.dialogVisibleUpload = true
      this.currForm = row
    },
    handleModify (row) {
      this.editType = 2
      this.title = this.$t('system.edgeNodes.nodeModify')
      this.isDisable = true
      this.currForm = row
      this.selectedArea = row.city.split('/')
      this.dialogVisible = true
      this.area = true
    },
    cancel (row) {
      this.dialogVisible = false
      this.area = false
      this.area = false
      this.isDisable = false
      this.resetForm()
    },
    resetForm () {
      this.currForm = {
        'address': '',
        'affinity': '',
        'applcmIp': '',
        'city': '北京市/北京市/东城区/东华门街道',
        'edgeName': '',
        'edgerepoIp': '',
        'edgerepoPort': '',
        'edgerepoUsername': '',
        'mechostIp': '',
        'mechostName': '',
        'userName': '',
        'zipCode': ''
      }
      this.selectedArea = ['北京市', '北京市', '东城区', '东华门街道']
    },
    beforeDelete (row) {
      app.getInstanceList().then(res => {
        if (res.data && res.data.response.length > 0) {
          res.data.response.forEach(item => {
            if (item.mecHost === row.mechostIp) {
              this.$message.error(this.$t('tip.deleteAppBeforeDeleteNode'))
            } else {
              this.showWarningBox(row)
            }
          })
        } else {
          this.showWarningBox(row)
        }
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.showWarningBox(row)
        }
      })
    },
    showWarningBox (row) {
      this.$confirm(this.$t('tip.confirmToDeleteNode'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.handleDelete(row)
      })
    },
    handleDelete (row) {
      system.delete(2, row.mechostIp).then(response => {
        this.$message.success(this.$t('tip.sucToDeleteNodes'))
        this.getNodeListInPage()
      }).catch(() => {
        this.$message.error(this.$t('tip.faileToDeleteNode'))
      })
    },
    register () {
      this.editType = 1
      this.title = this.$t('system.edgeNodes.nodeReg')
      this.resetForm()
      this.isDisable = false
      this.dialogVisible = true
      this.area = true
      system.getList(1).then(res => {
        this.applcmList = res.data
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    async submitUpload (content) {
      let params = new FormData()
      params.append('file', content.file)
      if (this.currForm.mechostIp) {
        system.uploadConfig(this.currForm.mechostIp, params).then(response => {
          this.$message.success(this.$t('tip.uploadSuc'))
          this.dialogVisibleUpload = false
        }).catch((error) => {
          console.log(error)
          this.$message.error(this.$t('tip.faileToUpload'))
          this.fileList = []
        })
      } else {
        this.$message.error(this.$t('tip.typeApp'))
        this.fileList = []
      }
    },
    getNodeListInPage () {
      system.getList(2).then(response => {
        this.tableData = this.paginationData = response.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.failedToGetList'))
        }
      })
    },
    confirm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.currForm.city = this.selectedArea.join('/')
          if (this.editType === 1) {
            system.create(2, this.currForm).then(response => {
              this.$message.success(this.$t('tip.sucToRegNode'))
              this.getNodeListInPage()
              this.dialogVisible = false
              this.area = false
              this.isDisable = false
            }).catch((error) => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else {
                this.$message.error(error.message)
              }
            })
          } else {
            system.modify(2, this.currForm, this.currForm.mechostIp).then(response => {
              this.$message.success(this.$t('tip.sucToModNode'))
              this.getNodeListInPage()
              this.dialogVisible = false
              this.area = false
              this.isDisable = false
              this.resetForm()
            }).catch(() => {
              this.$message.error(this.$t('tip.failToModifyNode'))
            })
          }
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.sysk8s{
  margin: 0 5%;
  height: 100%;
  background: #fff;
  padding: 30px 60px;
  .table {
    margin-top: 10px;
  }
  .tableDiv {
    margin-top: 10px;
  }
}

</style>
