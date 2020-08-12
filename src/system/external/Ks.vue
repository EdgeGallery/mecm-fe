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
  <div class="sysk8s">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mecm/overview' }">
          {{ $t('nav.mecm') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item><strong>{{ $t('nav.system') }}</strong></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mecm/systems/external/applcm' }">
          {{ $t('nav.externalSysMan') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ $t('nav.edgeNode') }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <Search
      :status-item="false"
      :ip-item="true"
      @getSearchData="getSearchData"
    />
    <div class="tableDiv">
      <el-row>
        <el-col
          :span="2"
          :offset="22"
        >
          <div class="el-row-button">
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
            prop="hostname"
            sortable
            :label="$t('app.packageList.name')"
            width="120"
          />
          <el-table-column
            prop="ip"
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
            prop="edgeNexusIp"
            sortable
            label="Edge Nexus Ip"
          />
          <el-table-column
            prop="edgeNexusPort"
            sortable
            label="Edge Nexus Port"
          />
          <el-table-column
            prop="appLcmIp"
            sortable
            label="App Lcm Ip"
          />
          <el-table-column
            prop="k8sURL"
            sortable
            label="K8S URL"
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
                id="deleteBtn"
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
      width="80%"
    >
      <div class="k8s">
        <el-row>
          <el-form
            label-width="165px"
            :model="currForm"
            ref="currForm"
            :rules="rules"
          >
            <el-col :span="10">
              <el-form-item
                :label="$t('app.packageList.name')"
                prop="hostname"
              >
                <el-input
                  id="hostname"
                  v-model="currForm.hostname"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.ip')"
                prop="ip"
              >
                <el-input
                  id="ip"
                  v-model="currForm.ip"
                  :disabled="isDisable"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.deployArea')"
                prop="selectedOptions"
              >
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleCityChange"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.address')"
                prop="address"
              >
                <el-input
                  id="address"
                  v-model="currForm.address"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.edgeNodes.zipcode')"
                prop="zipcode"
              >
                <el-input
                  id="zipcode"
                  v-model="currForm.zipcode"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appLcm.userNmae')"
                prop="username"
              >
                <el-input
                  id="username"
                  v-model="currForm.username"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appLcm.password')"
                prop="password"
              >
                <el-input
                  id="password"
                  v-model="currForm.password"
                  type="password"
                />
              </el-form-item>
            </el-col>
            <el-col
              :span="10"
              :offset="1"
            >
              <el-form-item
                label="APP LCM IP"
                prop="appLcmIp"
              >
                <el-select
                  id="aaplcmip"
                  v-model="currForm.appLcmIp"
                  :placeholder="$t('system.edgeNodes.applcmIp')"
                >
                  <el-option
                    v-for="(item,index) in applcmList"
                    :key="index"
                    :label="item.ip"
                    :value="item.ip"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="Kubernetes URL"
                prop="k8sURL"
              >
                <el-input
                  id="ksurl"
                  v-model="currForm.k8sURL"
                />
              </el-form-item>
              <el-form-item
                label="Edge Nexus Ip"
                prop="edgeNexusIp"
              >
                <el-input
                  id="edgeip"
                  v-model="currForm.edgeNexusIp"
                />
              </el-form-item>
              <el-form-item
                label="Edge Nexus Port"
                prop="edgeNexusPort"
              >
                <el-input
                  id="edgeport"
                  v-model="currForm.edgeNexusPort"
                />
              </el-form-item>
              <el-form-item
                label="Edge Nexus Name"
                prop="edgeNexusUsername"
              >
                <el-input
                  id="edgename"
                  v-model="currForm.edgeNexusUsername"
                />
              </el-form-item>
              <el-form-item
                label="Edge Nexus Password"
                prop="edgeNexusPassword"
              >
                <el-input
                  id="edgepass"
                  v-model="currForm.edgeNexusPassword"
                  type="password"
                />
              </el-form-item>

              <el-form-item
                :label="$t('app.packageList.affinity')"
              >
                <el-checkbox-group
                  v-model="affinity"
                  id="affinity"
                >
                  <el-checkbox
                    v-for="(item,index) in affinityList"
                    :key="index"
                    :label="item"
                  />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
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
          Drag the file here，or<em> Click to upload</em>
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
</template>

<script>
import { system, app } from '../../tools/request.js'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import pagination from '../../components/Pagination.vue'
import Search from '../../components/Search.vue'
export default {
  name: 'Sysk8s',
  components: {
    Search, pagination
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
      currForm: {
        ip: '',
        hostname: '',
        zipcode: '',
        city: '',
        address: '',
        username: '',
        password: '',
        edgeNexusIp: '159.138.11.6',
        edgeNexusPort: '8089',
        edgeNexusUsername: 'admin',
        edgeNexusPassword: '',
        appLcmIp: '',
        k8sURL: '',
        affinity: []
      },
      rules: {
        ip: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' }
        ],
        hostname: [
          { required: true, message: this.$t('verify.hostnameTip'), trigger: 'blur' }
        ],
        zipcode: [
          { required: true, message: this.$t('verify.zipcodeTip'), trigger: 'blur' }
        ],
        address: [
          { required: true, message: this.$t('verify.addressTip'), trigger: 'blur' }
        ],
        username: [
          { required: true, message: this.$t('verify.usernameTip'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('verify.passwordTip'), trigger: 'blur' }
        ],
        edgeNexusIp: [
          { required: true, message: this.$t('verify.edgeNexusIpTip'), trigger: 'blur' }
        ],
        edgeNexusPort: [
          { required: true, message: this.$t('verify.edgeNexusPortTip'), trigger: 'blur' }
        ],
        edgeNexusUsername: [
          { required: true, message: this.$t('verify.edgeNexusUsernameTip'), trigger: 'blur' }
        ],
        edgeNexusPassword: [
          { required: true, message: this.$t('verify.edgeNexusPasswordTip'), trigger: 'blur' }
        ],
        appLcmIp: [
          { required: true, message: this.$t('verify.appLcmIpTip'), trigger: 'blur' }
        ],
        k8sURL: [
          { required: true, message: this.$t('verify.k8sURLTip'), trigger: 'blur' }
        ]
      },
      affinity: [],
      title: '',
      editType: 1,
      options: regionData,
      isDisable: false,
      selectedOptions: '',
      affinityList: ['X86', 'ARM64', 'ARM32', 'GPU', 'NPU']
    }
  },
  mounted () {
    this.getNodeListInPage()
  },
  methods: {
    // 对app表格进行筛选 val：需要查询的值  key: 数据对应的字段
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key]
        if (itemVal) return itemVal.toLowerCase().indexOf(val) > -1
      })
    },
    // 根据搜索组件进行筛选
    getSearchData (data) {
      this.paginationData = this.tableData
      // name  host  status  后端对应的字段
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = key
            if (key === 'name') {
              dataKey = 'hostname'
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
    handleCityChange (val) {
      this.currForm.city = CodeToText[val[0]] + '/' + CodeToText[val[1]] + '/' + CodeToText[val[2]]
    },
    uploadFile (row) {
      this.dialogVisibleUpload = true
      this.currForm = row
    },
    handleModify (row) {
      this.editType = 2
      this.title = this.$t('system.edgeNodes.nodeModify')
      this.isDisable = true
      this.currForm = row
      let array = row.city.split('/')
      this.selectedOptions = TextToCode[array[0]][array[1]][array[2]].code
      if (row.affinity.indexOf(',') > -1) {
        this.affinity = row.affinity.split(',')
      } else {
        this.affinity.push(row.affinity)
      }
      this.dialogVisible = true
      this.clearValidate('currForm')
    },
    beforeDelete (row) {
      app.getInstanceList().then(res => {
        if (res.data && res.data.length > 0) {
          res.data.forEach(item => {
            if (item.mecHost === row.ip) {
              this.$message.error(this.$t('tip.deleteAppBeforeDeleteNode'))
            } else {
              this.showWarningBox(row)
            }
          })
        } else {
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
      system.delete(2, row.ip).then(response => {
        this.$message.success(this.$t('tip.sucToDeleteNodes'))
        this.getNodeListInPage()
      }).catch(() => {
        this.$message.error(this.$t('tip.faileToDeleteNode'))
      })
    },
    register () {
      this.editType = 1
      this.title = this.$t('system.edgeNodes.nodeReg')
      this.isDisable = false
      this.selectedOptions = ''
      this.dialogVisible = true
      this.$nextTick(() => {
        this.reset('currForm')
      })
      system.getList(1).then(res => {
        this.applcmList = res.data
      // eslint-disable-next-line handle-callback-err
      }, error => {
        this.$message.error('Error!')
      })
    },
    reset (formName) {
      this.$refs['currForm'].resetFields()
      this.fileList = []
      this.applcmList = []
    },
    async submitUpload (content) {
      let params = new FormData()
      params.append('file', content.file)
      if (this.currForm.appLcmIp && this.currForm.ip) {
        system.uploadConfig(this.currForm.ip, params).then(response => {
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
      }).catch(() => {
        this.$message.error(this.$t('tip.failedToGetList'))
      })
    },
    confirm (form) {
      this.$refs[form].validate((valid) => {
        if (valid && this.currForm.city) {
          this.currForm.affinity = this.affinity.join(',')
          if (this.editType === 1) {
            system.create(2, this.currForm).then(response => {
              this.$message.success(this.$t('tip.sucToRegNode'))
              this.getNodeListInPage()
              this.dialogVisible = false
              this.isDisable = false
              this.$alert(this.$t('tip.uploadConf'), this.$t('common.warning'), {
                confirmButtonText: this.$t('common.confirm'),
                callback: action => {
                  this.dialogVisibleUpload = true
                }
              })
            }).catch((error) => {
              this.$message.error(error.message)
            })
          } else {
            system.modify(2, this.currForm).then(response => {
              this.$message.success(this.$t('tip.sucToModNode'))
              this.getNodeListInPage()
              this.dialogVisible = false
              this.isDisable = false
              this.reset('currForm')
            }).catch(() => {
              this.$message.error(this.$t('tip.failToModifyNode'))
            })
          }
        } else {
          if (!this.currForm.city) {
            this.$message.error(this.$t('tip.typeCity'))
          }
        }
      })
    },
    cancel () {
      this.dialogVisible = false
      this.isDisable = false
    },
    clearValidate (formName) {
      this.$refs[formName].clearValidate()
    }
  }
}
</script>

<style lang='less' scoped>
  .table {
    margin-top: 10px;
  }
  .tableDiv {
    margin-top: 10px;
  }
  .el-row-button {
    float: right;
  }
</style>
<style>
.el-upload{
    width:100%;
  }
  .el-upload-dragger{
    width:100%;
  }
</style>
