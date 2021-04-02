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
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.overview')"
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
      <p
        class="btn-p"
        v-if="rlp=='418'"
      >
        <el-button
          id="newregBtn"
          type="primary"
          @click="register()"
        >
          {{ $t('system.appLcm.newReg') }}
        </el-button>
      </p>
      <div class="tableDiv">
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
            >
              <template slot-scope="scope">
                <em
                  class="el-icon-success"
                  :style="{color: '#67C23A'}"
                />
                <span style="margin-left: 10px">{{ scope.row.mechostName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mechostIp"
              :label="$t('app.packageList.ip')"
            />
            <el-table-column
              prop="city"
              :label="$t('system.edgeNodes.location')"
            />
            <el-table-column
              prop="vim"
              :label="$t('system.edgeNodes.vim')"
            />
            <el-table-column
              prop="affinity"
              :label="$t('app.packageList.affinity')"
            />
            <el-table-column
              prop="applcmIp"
              :label="$t('system.edgeNodes.applcmIp')"
            />
            <el-table-column
              prop="appRuleIp"
              label="App Rule MGR IP"
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
              prop="configUploadStatus"
              :label="$t('system.edgeNodes.ifUploaded')"
            >
              <template slot-scope="scope">
                <span
                  class="success"
                  v-if="scope.row.configUploadStatus"
                >
                  {{ scope.row.configUploadStatus }}
                </span>
                <span v-else>/</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('common.operation')"
              align="center"
              width="350"
              v-if="rlp=='418'"
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
                  id="monitorBtn"
                  type="text"
                  size="small"
                  @click="handleMonitor(scope.row)"
                >
                  {{ $t('edgeNode.monitor') }}
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
                  type="text"
                  size="small"
                  id="syncBtn"
                  @click="syncFromEdge(scope.row)"
                >
                  {{ $t('app.packageList.sync') }}
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
            :page-sizes="[10,15,20,25]"
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
        width="30%"
      >
        <div class="k8s">
          <el-row>
            <el-form
              label-width="auto"
              :model="currForm"
              ref="currForm"
              :rules="rules"
            >
              <el-form-item
                :label="$t('system.edgeNodes.systemPlatform')"
              >
                <el-radio-group
                  v-model="currForm.vim"
                  @change="changeType"
                >
                  <el-radio
                    label="K8S"
                  >
                    K8S
                  </el-radio>
                  <el-radio
                    label="OpenStack"
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
                :label="$t('system.edgeNodes.location')"
                prop="city"
              >
                <el-cascader
                  :options="options"
                  :placeholder="$t('system.edgeNodes.chooseLocation')"
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
            </el-form>
          </el-row>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            id="cancelBtn"
            size="small"
            @click="cancel()"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            id="confirmBtn"
            type="primary"
            size="small"
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
import { appo, apm, inventory } from '../tools/request1.js'
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
      area: false,
      selectedArea: [],
      currForm: {
        address: '',
        affinity: '',
        applcmIp: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        appRuleIp: '',
        coordinate: '',
        vim: 'K8S'
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
          label: this.$t('area.beijing'),
          children: [{
            value: '1.1',
            label: this.$t('area.haidian'),
            children: [{
              value: '116.35,39.979508',
              label: this.$t('area.caict')
            }, {
              value: '116.185087,40.054096',
              label: this.$t('area.huaweiBeijing')
            }]
          }]
        },
        {
          value: '1',
          label: this.$t('area.shanxi'),
          children: [{
            value: '1.1',
            label: this.$t('area.xian'),
            children: [{
              value: '108.839257,34.197356',
              label: this.$t('area.huaweiXian')
            }, {
              value: '108.916787,34.230834',
              label: this.$t('area.xidian')
            }]
          }]
        }, {
          value: '2',
          label: this.$t('area.jiangsu'),
          children: [{
            value: '2.1',
            label: this.$t('area.nanjing'),
            children: [{
              label: this.$t('area.zijinshan'),
              value: '118.822617,31.871027'
            }]
          }]
        }, {
          value: '3',
          label: this.$t('area.shanghai'),
          children: [{
            value: '3.1',
            label: this.$t('area.pudong'),
            children: [
              {
                label: this.$t('area.huaweiShanghai'),
                value: '121.633202,31.26335'
              }
            ]
          }]
        }, {
          value: '4',
          label: this.$t('area.guangdong'),
          children: [{
            value: '4.1',
            label: this.$t('area.shenzhen'),
            children: [
              {
                label: this.$t('area.huaweiBantian'),
                value: '114.054927,22.658795'
              },
              {
                label: this.$t('area.tiananyungu'),
                value: '114.064276,22.661791'
              },
              {
                label: this.$t('area.clab'),
                value: '114.05283,22.656889'
              },
              {
                label: this.$t('area.SUSTech'),
                value: '113.996625,22.603375'
              }
            ]
          }]
        }, {
          value: '5',
          label: this.$t('area.shandong'),
          children: [{
            value: '5.1',
            label: this.$t('area.qingdao'),
            children: [{
              value: '120.4154467,36.1322617',
              label: this.$t('area.haier')
            }]
          }]
        }
      ],
      rlp: sessionStorage.getItem('rlp')
    }
  },
  mounted () {
    this.getNodeListInPage()
  },
  computed: {
    rules () {
      return {
        mechostIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        mechostName: [
          { required: true, message: this.$t('verify.hostnameTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ],
        city: [
          { required: true, message: this.$t('tip.typeCity'), trigger: 'change' }
        ],
        coordinates: [
          { required: true, message: this.$t('verify.coordinates'), trigger: 'blur' }
        ],
        appRuleIp: [
          { required: true, message: this.$t('verify.appRuleManaVerify'), trigger: 'change' }
        ],
        applcmIp: [
          { required: true, message: this.$t('verify.appLcmIpTip'), trigger: 'change' }
        ],
        affinity: [
          { required: true, message: this.$t('verify.affinityTip'), trigger: 'change' }
        ]
      }
    }
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
    handleMonitor (row) {
      this.src = 'https://' + row.mechostIp + ':30000/dashboards'
      window.open(this.src)
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
    async syncFromEdge (row) {
      let result = 0
      await apm.syncFromApm()
      await appo.syncFromAppo()
      await inventory.syncMechost(row.mechostIp)
      await inventory.syncApprule(row.mechostIp).then(res => {
        result = 1
      })
      if (result === 1) {
        this.$message.success(this.$t('app.packageList.syncSuccess'))
      }
    },
    handleModify (row) {
      this.getList()
      this.editType = 2
      this.title = this.$t('system.edgeNodes.nodeModify')
      this.isDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.currForm = middleData
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
        address: '',
        affinity: '',
        applcmIp: '',
        city: '',
        mechostIp: '',
        mechostName: '',
        userName: '',
        zipCode: '',
        hwcapabilities: [],
        appRuleIp: '',
        coordinate: '',
        vim: 'K8S'
      }
      this.selectedArea = []
      this.capabilities = []
    },
    beforeDelete (row) {
      appo.getInstanceList().then(res => {
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
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        this.handleDelete(row)
      })
    },
    handleDelete (row) {
      inventory.delete(2, row.mechostIp).then(response => {
        this.showMessage('success', this.$t('tip.sucToDeleteNodes'), 1500)
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
      inventory.getList(1).then(res => {
        this.applcmList = res.data
      }, error => {
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.applcmList = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
      inventory.getList(4).then(res => {
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
        inventory.uploadConfig(this.currForm.mechostIp, params).then(response => {
          this.showMessage('success', this.$t('tip.uploadSuc'), 1500)
          this.dialogVisibleUpload = false
          this.getNodeListInPage()
        }).catch((error) => {
          console.log(error)
          this.$message.error(error)
          this.fileList = []
        })
      } else {
        this.$message.error(this.$t('tip.typeApp'))
        this.fileList = []
      }
    },
    getNodeListInPage () {
      inventory.getList(2).then(response => {
        this.tableData = this.paginationData = response.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        this.tableData = this.paginationData = []
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.failedToGetList'))
        }
      })
    },
    confirm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.currForm.hwcapabilities = []
          if (this.capabilities.length > 0) {
            this.capabilityJudgement()
          }
          this.currForm.address = this.selectedArea.join('/')
          if (this.editType === 1) {
            inventory.create(2, this.currForm).then(response => {
              this.showMessage('success', this.$t('tip.sucToRegNode'), 1500)
              this.getNodeListInPage()
              this.dialogVisible = false
              this.area = false
              this.isDisable = false
            }).catch((error) => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else if (error.response.status === 403) {
                this.$message.error(this.$t('tip.loginOperation'))
              } else {
                this.$message.error(error.response.data)
              }
            })
          } else {
            inventory.modify(2, this.currForm, this.currForm.mechostIp).then(response => {
              this.showMessage('success', this.$t('tip.sucToModNode'), 1500)
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
    },
    capabilityJudgement () {
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
