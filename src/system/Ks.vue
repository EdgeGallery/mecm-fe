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
            class="mt20"
            border
            size="small"
            style="width: 100%;"
          >
            <el-table-column
              prop="mechostName"
              sortable
              :label="$t('app.packageList.name')"
            />
            <el-table-column
              prop="mechostIp"
              sortable
              :label="$t('app.packageList.ip')"
            />
            <el-table-column
              prop="city"
              sortable
              :label="$t('app.packageList.address')"
            />
            <el-table-column
              prop="affinity"
              sortable
              :label="$t('app.packageList.affinity')"
            />
            <el-table-column
              prop="applcmIp"
              sortable
              label="App LCM IP"
            />
            <el-table-column
              prop="appRuleIp"
              sortable
              label="App Rule MGR"
            />
            <el-table-column
              prop="edgerepoIp"
              sortable
              label="Edge Repo IP"
            />
            <el-table-column
              prop="edgerepoPort"
              sortable
              label="Edge Repo Port"
            />
            <el-table-column
              :label="$t('system.edgeNodes.hwCapability')"
            >
              <template slot-scope="scope">
                <span
                  v-for="(item,index) in scope.row.hwcapabilities"
                  :key="index"
                >
                  {{ item.hwType }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operation')"
              align="center"
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
        :close-on-click-modal="false"
        :title="title"
        :visible.sync="dialogVisible"
        style="padding-right:30px;"
        width="40%"
      >
        <div class="k8s">
          <el-row>
            <el-form
              label-width="120px"
              status-icon
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
                <el-cascader
                  :options="options"
                  v-model="selectedArea"
                  @change="onChanged"
                  ref="myCascader"
                >
                  <template slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                  </template>
                </el-cascader>
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
                :label="$t('system.edgeNodes.hwCapability')"
              >
                <el-checkbox-group
                  v-model="capabilities"
                >
                  <el-checkbox
                    v-for="(item,index) in capability"
                    :key="index"
                    :label="item"
                  />
                </el-checkbox-group>
              </el-form-item>
              <el-form-item
                label="GPU Info"
                v-if="capabilities.includes('GPU')"
              >
                <el-row :gutter="24">
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="gpuModel"
                      placeholder="Model"
                    />
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="gpuVendor"
                      placeholder="Vendor"
                    />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item
                label="NPU Info"
                v-if="capabilities.includes('NPU')"
              >
                <el-row :gutter="24">
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="npuModel"
                      placeholder="Model"
                    />
                  </el-col>
                  <el-col :span="5">
                    <el-input
                      type="text"
                      v-model="npuVendor"
                      placeholder="Vendor"
                    />
                  </el-col>
                </el-row>
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
                label="App Rule MGR"
                prop="appRuleIp"
              >
                <el-select
                  id="apprulemgrip"
                  v-model="currForm.appRuleIp"
                  placeholder="App Rule MGR IP"
                >
                  <el-option
                    v-for="(item,index) in appRuleIpList"
                    :key="index"
                    :label="item.appRuleIp"
                    :value="item.appRuleIp"
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
        :close-on-click-modal="false"
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
          :before-upload="beforeUpload"
          :file-list="fileList"
          :multiple="false"
          accept=""
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
import { system, app } from '../tools/request.js'
import pagination from '../components/Pagination.vue'
import Search from '../components/Search.vue'
import Breadcrumb from '../components/BreadCrumb'
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
      appRuleIpList: [],
      op: false,
      radio: '1',
      area: false,
      selectedArea: [],
      currForm: {
        'address': '',
        'affinity': '',
        'applcmIp': '',
        'city': '',
        'edgeName': '',
        'edgerepoIp': '',
        'edgerepoPort': '',
        'edgerepoUsername': '',
        'mechostIp': '',
        'mechostName': '',
        'userName': '',
        'zipCode': '',
        'hwcapabilities': [],
        'appRuleIp': '',
        'coordinates': ''
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
          { required: true, message: this.$t('tip.typeCity'), trigger: 'change' }
        ],
        coordinates: [
          { required: true, message: this.$t('verify.coordinates'), trigger: 'blur' }
        ],
        edgerepoIp: [
          { required: true, message: this.$t('verify.edgeNexusIpTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        edgerepoPort: [
          { required: true, message: this.$t('verify.edgeNexusPortTip'), trigger: 'blur' },
          { pattern: /^[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        appRuleIp: [
          { required: true, message: '应用规则管理IP为必选项', trigger: 'change' }
        ],
        applcmIp: [
          { required: true, message: this.$t('verify.appLcmIpTip'), trigger: 'change' }
        ],
        affinity: [
          { required: true, message: this.$t('verify.affinityTip'), trigger: 'change' }
        ]
      },
      capabilities: [],
      gpuModel: '',
      gpuVendor: '',
      npuModel: '',
      npuVendor: '',
      title: '',
      editType: 1,
      isDisable: false,
      affinityList: ['X86', 'ARM64', 'ARM32'],
      capability: ['GPU', 'NPU'],
      fileConfirm: true,
      options: [
        {
          value: '1',
          label: '北京',
          children: [{
            value: '1.1',
            label: '海淀区',
            children: [{
              value: '116.355989,39.980199',
              label: '中国信通院'
            }, {
              value: '116.185087,40.054096',
              label: '华为北京研究所'
            }]
          }]
        }, {
          value: '2',
          label: '江苏省',
          children: [{
            value: '2.1',
            label: '南京市',
            children: [{
              label: '紫金山实验室',
              value: '118.822617,31.871027'
            }]
          }]
        }, {
          value: '3',
          label: '上海市',
          children: [{
            value: '3.1',
            label: '浦东新区',
            children: [
              {
                label: '华为上海研究所',
                value: '121.633202,31.26335'
              }
            ]
          }]
        }, {
          value: '4',
          label: '广东省',
          children: [{
            value: '4.1',
            label: '深圳市',
            children: [
              {
                label: '华为坂田基地',
                value: '114.059803,22.650574'
              },
              {
                label: '华为天安云谷',
                value: '114.067714,22.658933'
              },
              {
                label: 'Clab实验室',
                value: '114.059448,22.653555'
              },
              {
                label: '南方科技大学',
                value: '113.999634,22.598776'
              }
            ]
          }]
        }
      ]
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
    onChanged (val) {
      this.currForm.coordinates = this.$refs.myCascader.getCheckedNodes()[0].value
      this.currForm.city = this.$refs.myCascader.getCheckedNodes()[0].pathLabels.join('/')
      this.currForm.address = val.join(',')
    },
    changeType () {
      this.op = !this.op
    },
    uploadFile (row) {
      this.fileList = []
      this.dialogVisibleUpload = true
      this.currForm = row
    },
    handleModify (row) {
      this.getList()
      this.editType = 2
      this.title = this.$t('system.edgeNodes.nodeModify')
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.currForm = middleData
      console.log(row.address)
      this.selectedArea = row.address.split('/')
      this.dialogVisible = true
      this.area = true
      row.hwcapabilities.forEach(item => {
        this.capabilities.push(item.hwType)
      })
      this.checkCapabilityInfo(row)
    },
    checkCapabilityInfo (row) {
      row.hwcapabilities.forEach(item => {
        if (item.hwType === 'GPU') {
          this.gpuVendor = item.hwVendor
          this.gpuModel = item.hwModel
        } else {
          this.npuVendor = item.hwVendor
          this.npuModel = item.hwModel
        }
      })
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
        'city': '',
        'edgeName': '',
        'edgerepoIp': '',
        'edgerepoPort': '',
        'edgerepoUsername': '',
        'mechostIp': '',
        'mechostName': '',
        'userName': '',
        'zipCode': '',
        'hwcapabilities': [],
        'appRuleIp': '',
        'coordinates': ''
      }
      this.selectedArea = []
      this.capabilities = []
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
      this.$nextTick(() => {
        this.$refs.currForm.resetFields()
      })
      this.getList()
    },
    getList () {
      system.getList(1).then(res => {
        this.applcmList = res.data
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.applcmList = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
      system.getList(4).then(res => {
        this.appRuleIpList = res.data
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.appRuleIpList = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    },
    beforeUpload (file) {
      console.log(file)
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
          this.$message.error("File shouldn't contain any extension or filename is larger than max size")
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
          this.currForm.hwcapabilities = []
          if (this.capabilities.length > 0) {
            if (this.capabilities.includes('GPU')) {
              let obj = {}
              obj.hwType = 'GPU'
              obj.hwVendor = this.gpuVendor
              obj.hwModel = this.gpuModel
              this.currForm.hwcapabilities.push(obj)
            }
            if (this.capabilities.includes('NPU')) {
              let obj = {}
              obj.hwType = 'NPU'
              obj.hwVendor = this.npuVendor
              obj.hwModel = this.npuModel
              this.currForm.hwcapabilities.push(obj)
            }
          }
          this.currForm.address = this.selectedArea.join('/')
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
              } else if (error.response.status === 403) {
                this.$message.error(this.$t('tip.loginStatusFailed'))
              } else {
                this.$message.error(error.response.data)
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
.el-col{
  padding-left:0 !important;
}
</style>
