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
    <div class="btnMain">
      <el-button
        type="primary"
        @click="distribute"
      >
        <span
          class="iconcont"
          style="top:0;"
        >√</span>
        <span>{{ $t('app.packageList.distribute') }}</span>
      </el-button>
    </div>
    <div class="contentList">
      <Search
        :placeholder="$t('tip.fuzzyQuery')"
        @getSearchData="getSearchData"
      />
      <span class="btnSearch">
        <el-button
          type="primary"
          @click="multipleDeploy"
        >
          <span>{{ $t('app.distriList.multipleDeploy') }}</span>
        </el-button>
      </span>
      <div class="tableDiv">
        <el-table
          class="mt20"
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
                v-if="scope.row.status === 'Distributed'||scope.row.status === 'uploaded'"
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
                :disabled="scope.row.status !=='Distributed' && scope.row.status !=='uploaded'"
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
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :show-close="false"
        :visible.sync="dialogVisible"
        width="55%"
        class="deploy-dialog"
      >
        <div class="secondLabel">
          {{ $t('app.distriList.deploymentConf') }}
        </div>
        <el-form
          label-width="auto"
          class="configForm"
          :model="configForm"
          ref="configForm"
          :rules="rules"
        >
          <p class="title">
            MEC Host
          </p>
          <el-form-item
            :label="$t('app.packageList.ip')"
            label-width="140px"
          >
            <div
              v-for="(item,index) in hostList"
              :key="index"
            >
              <span
                class="hostip"
              >{{ item.hostIp }}</span>
              <span
                v-if="item.status === 'Distributed'||item.status === 'uploaded'"
                class="success"
              ><em class="el-icon-success" />{{ item.status }}</span>
            </div>
          </el-form-item>
          <el-form-item
            :label="$t('app.distriList.appName')"
            prop="appName"
            label-width="140px"
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
            label-width="140px"
          >
            <el-input
              id="appdesc"
              maxlength="120"
              v-model="configForm.appInstanceDescription"
            />
          </el-form-item>
          <el-form-item
            :label="$t('system.edgeNodes.hwCapability')"
            prop="hwCapabilities"
            label-width="140px"
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
          <div
            v-if="templateInputs.length>0"
            class="apptemplate"
          >
            <p
              class="title"
            >
              Apptemplate Information
            </p>
            <el-collapse
              v-model="activeNames"
              accordion
            >
              <el-collapse-item
                :title="$t('app.packageList.vmConfig')"
                name="1"
              >
                <div
                  v-for="(item,index) in this.VmDataGroup"
                  :key="index"
                >
                  <p class="first-title">
                    {{ $t('app.packageList.vmConfig') }}{{ index+1 }}
                  </p>
                  <div
                    v-for="(vmSourceItem) in item.VmResourceData"
                    :key="vmSourceItem.label"
                  >
                    <el-col
                      :span="8"
                    >
                      <el-form-item
                        :label="vmSourceItem.label.substring(5)"
                        class="apptemplate-form"
                        size="small"
                      >
                        <el-input
                          class="apptemplate-input"
                          id="podsel"
                          maxlength="30"
                          v-model="vmSourceItem.value"
                          size="small"
                        />
                      </el-form-item>
                    </el-col>
                  </div>
                  <div
                    v-for="(netItem,netIndex) in item.data"
                    :key="netIndex"
                  >
                    <p class="second-title">
                      {{ $t('app.packageList.netWork') }}{{ netIndex+1 }}
                    </p>
                    <el-col
                      :span="8"
                      v-for="(netLabel,netIndexLabel) in netItem.data"
                      :key="netIndexLabel"
                    >
                      <el-form-item
                        :label="netLabel.label.substring(17)"
                        class="apptemplate-form"
                        size="small"
                      >
                        <el-input
                          id="podsel"
                          maxlength="30"
                          v-model="netLabel.value"
                          size="small"
                        />
                      </el-form-item>
                    </el-col>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                :title="$t('app.packageList.netWorkConfig')"
                name="2"
              >
                <div>
                  <div
                    v-for="(item,index) in this.netWorkSetData"
                    :key="index"
                  >
                    <p class="second-title">
                      {{ $t('app.packageList.netConfig') }}{{ index+1 }}
                    </p>
                    <el-col
                      :span="8"
                      v-for="(netWork,netIndex) in item.data"
                      :key="netIndex"
                    >
                      <el-form-item
                        class="apptemplate-form"
                        :label="handleNetName(netWork.label)"
                        size="small"
                      >
                        <el-input
                          id="podsel"
                          maxlength="30"
                          v-model="netWork.value"
                          size="small"
                        />
                      </el-form-item>
                    </el-col>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item
                :title="$t('app.packageList.otherConfig')"
                name="3"
              >
                <div>
                  <el-row>
                    <el-col
                      :span="8"
                      v-for="(item,index) in otherData"
                      :key="index"
                    >
                      <el-form-item
                        class="apptemplate-form"
                        :label="item.label"
                        size="small"
                      >
                        <el-input
                          id="podsel"
                          maxlength="30"
                          v-model="item.value"
                          size="small"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-form>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            id="confirmBtn"
            type="primary"
            size="small"
            @click="confirmToDeploy('configForm')"
            :loading="loading"
          >{{ $t('common.confirm') }}</el-button>
          <el-button
            id="cancelBtn"
            size="small"
            @click="dialogVisible = false,loading=false"
          >{{ $t('common.cancel') }}</el-button>
        </span>
      </el-dialog>

      <!-- 分发 -->
      <el-dialog
        :show-close="false"
        :visible.sync="distributionDialogVisible"
      >
        <div class="secondLabel">
          {{ $t('app.packageList.slectEdgeNodes') }}
        </div>
        <el-row class="el-row-search">
          <el-col
            :span="8"
            :offset="16"
          >
            <el-input
              id="nodesearch"
              class="el-input-search"
              v-model="edgeNodeSearchInput"
            >
              <em
                slot="suffix"
                class="el-input__icon el-icon-search"
              />
            </el-input>
          </el-col>
        </el-row>
        <el-row class="el-row-table">
          <el-col :span="24">
            <el-table
              ref="multipleEdgeNodeTable"
              :data="currPageEdgeNodeTableData"
              class="mt20"
              size="small"
              @selection-change="handleEdgeNodeSelectionChange"
            >
              <el-table-column
                type="selection"
              />
              <el-table-column
                prop="mechostName"
                sortable
                :label="$t('app.packageList.name')"
              />
              <el-table-column
                prop="mechostIp"
                :label="$t('app.packageList.ip')"
              />
              <el-table-column
                prop="city"
                :label="$t('app.packageList.city')"
              />
              <el-table-column
                prop="affinity"
                :label="$t('app.packageList.affinity')"
              />
              <el-table-column
                prop="mepmIp"
                :label="$t('system.edgeNodes.mepmIp')"
              />
              <el-table-column
                :label="$t('system.edgeNodes.hwCapability')"
                width="200"
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
            </el-table>
          </el-col>
        </el-row>
        <el-row>
          <el-pagination
            background
            class="pagination rt"
            @size-change="handleEdgeNodePageSizeChange"
            @current-change="handleEdgeNodeCurrentPageChange"
            :current-page="edgeNodeCurrentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="edgeNodePageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="edgeNodeTotalNum"
          />
        </el-row>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            id="confirmBtn"
            type="primary"
            size="small"
            @click="confirm()"
            :loading="loading"
          >
            {{ $t('common.confirm') }}
          </el-button>
          <el-button
            id="cancelBtn"
            size="small"
            @click="cancel()"
          >
            {{ $t('common.cancel') }}
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Search from '../../components/common/Search.vue'
import Pagination from '../../components/common/Pagination.vue'
import { appo, apm, inventory } from '../../tools/request.js'
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
      selectData: null,
      selectedData: [],
      appPackageId: '',
      appVersion: '',
      appPackageName: '',
      appAffinity: '',
      provider: '',
      dialogVisible: false,
      configForm: {
        status: '',
        appPackageId: '',
        appName: '',
        appInstanceDescription: '',
        appId: this.appId,
        hwCapabilities: []
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
      templateInputs: [],
      capabilities: ['GPU', 'NPU'],
      VmDataGroup: [],
      netWorkSetData: [],
      activeNames: '1',
      otherData: [],
      language: localStorage.getItem('language'),
      // 分发
      appId: window.location.href.split('=')[1] || sessionStorage.getItem('appId'),
      edgeNodesData: [],
      distributionDialogVisible: false,
      packageSearchInput: '',
      edgeNodeSearchInput: '',
      edgeNodeCurrentPage: 1,
      edgeNodePageSize: 5,
      rowSelection: [],
      nodeSelection: [],
      selectedNodeNum: 0,
      currentRowData: '',
      dialogLoading: false
    }
  },
  computed: {
    edgeNodeTotalNum: function () {
      return this.edgeNodesData.length
    },
    totalNum: function () {
      return this.tableData.length
    },
    currPageEdgeNodeTableData: function () {
      return this.edgeNodesData.filter(data => !this.edgeNodeSearchInput || data.mechostName.toLowerCase().includes(this.edgeNodeSearchInput.toLowerCase()))
    },
    rules () {
      return {
        appName: [
          { required: true, message: this.$t('verify.appNameVerify'), trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{4,16}$/, message: this.$t('verify.hostNameVerify') }
        ],
        appInstanceDescription: [
          { required: true, message: this.$t('verify.descVerify'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initList()
    this.interval = setInterval(() => {
      this.initList()
    }, 15000)
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
    }
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
    filterTableData (val) {
      this.paginationData = this.paginationData.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().indexOf(val) > -1
        })
      })
    },
    // 根据搜索组件进行筛选
    getSearchData (data) {
      this.serchData = data
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
    multipleDeploy () {
      this.configForm = {
        status: '',
        appPackageId: '',
        appName: '',
        appInstanceDescription: '',
        appId: this.appId,
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
          this.$message.error(this.$t('app.distriList.deleteError'))
        }
      } else {
        this.$message.warning(this.$t('tip.onePackageAtLeast'))
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
        apm.deleteDistributionApp(type, hostIp, this.appPackageId).then(res => {
          this.showMessage('success', this.$t('tip.deletePacFrmoHost'), 1500)
          this.initList()
        })
      })
    },
    initList () {
      apm.getDistributionList().then(res => {
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
        console.log(error)
        this.dataLoading = false
        this.tableData = this.paginationData = []
      })
    },
    deploy (row, type) {
      apm.getApptemplateApi(this.appPackageId).then(res => {
        this.templateInputs = []
        if (res.data.deployType !== 'container') {
          let inputs = res.data.inputs
          inputs.forEach(ele => {
            let obj = {
              label: '',
              value: ''
            }
            obj.label = ele.name
            obj.value = ele.defaultValue
            this.templateInputs.push(obj)
          })
        }
        this.handleInputsData()
        this.configForm = {
          status: '',
          appPackageId: '',
          appName: '',
          appInstanceDescription: '',
          appId: this.appId,
          hwCapabilities: []
        }
        this.hostList = []
        this.configForm.appPackageId = this.appPackageId
        this.configForm.appId = this.appId
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
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('tip.getTemplateListFail'),
          duration: 2000
        })
      })
    },
    handleInputsData () {
      let VmData = []
      let NetData = []
      this.otherData = []
      this.templateInputs.forEach(item => {
        if (item.label.indexOf('VDU') === 0) {
          VmData.push(item)
        } else if (item.label.indexOf('APP') === 0) {
          NetData.push(item)
        } else {
          this.otherData.push(item)
        }
      })
      this.handleVmData(VmData)
      this.handleNetData(NetData)
    },
    handleVmData (VmData) {
      let map = {}
      this.VmDataGroup = []
      VmData.forEach(item => {
        let name = item.label.substring(0, 4)
        if (!map[name]) {
          this.VmDataGroup.push({
            label: item.label.substring(0, 4),
            VmResourceData: [],
            data: [item]
          })
          map[name] = item
        } else {
          for (let j = 0; j < this.VmDataGroup.length; j++) {
            let dj = this.VmDataGroup[j]
            if (dj.label.substring(0, 4) === item.label.substring(0, 4)) {
              dj.data.push(item)
              break
            }
          }
        }
      })
      this.VmDataGroup.forEach(item => {
        let NetDataGroup = []
        item.data.forEach(netItem => {
          if (netItem.label.length > 16) {
            let name = netItem.label.substring(0, 16)
            if (!map[name]) {
              NetDataGroup.push({
                label: netItem.label.substring(5, 16),
                data: [netItem]
              })
              map[name] = netItem
            } else {
              for (let j = 0; j < NetDataGroup.length; j++) {
                let dj = NetDataGroup[j]
                if (dj.label === netItem.label.substring(5, 16)) {
                  dj.data.push(netItem)
                  break
                }
              }
            }
          } else {
            item.VmResourceData.push(netItem)
          }
        })
        item.data = NetDataGroup
      })
    },
    handleNetData (NetData) {
      let map = {}
      this.netWorkSetData = []
      NetData.forEach(item => {
        let name = item.label.substring(0, 11)
        if (!map[name]) {
          this.netWorkSetData.push({
            label: item.label.substring(0, 11),
            data: [item]
          })
          map[name] = item
        } else {
          for (let j = 0; j < this.netWorkSetData.length; j++) {
            let dj = this.netWorkSetData[j]
            if (dj.label.substring(0, 11) === item.label.substring(0, 11)) {
              dj.data.push(item)
              break
            }
          }
        }
      })
    },
    handleNetName (label) {
      let labelListEn = ['Network', 'Physnet']
      let labelListCn = ['网络名称', '物理网络名称']
      if (labelListEn.includes(label.substring(12))) {
        let index = labelListEn.indexOf(label.substring(12))
        return this.language === 'cn' ? labelListCn[index] : labelListEn[index]
      } else {
        return label.substring(12)
      }
    },
    confirmToDeploy (configForm) {
      this.$refs[configForm].validate(valid => {
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
            appo.confirmToDeploy(params).then(res => {
              let instanceId = res.data.response.app_instance_id
              this.timer = setTimeout(() => { this.queryInstanceStatus(instanceId) }, 1000)
            }).catch(() => {
              this.$message.error(this.$t('tip.deployFailed'))
              this.dialogVisible = false
            })
          } else {
            appo.confirmToBatchDeploy(params).then(res => {
              let instanceIds = res.data.response
              let len = instanceIds.length
              this.timer = setTimeout(() => { this.batchInstaniateApp(instanceIds) }, 6000 * len)
            }).catch(() => {
              this.$message.error(this.$t('tip.deployFailed'))
              this.dialogVisible = false
            })
          }
        }
      })
    },
    queryInstanceStatus (instanceids) {
      appo.getInstanceInfo(instanceids).then(res1 => {
        let status = res1.data.response.operationalStatus
        if (status === 'Created') {
          this.instaniateApp(instanceids)
        } else if (status === 'Create failed') {
          this.$message.error(res1.data.response.operationInfo)
          this.dialogVisible = false
          this.loading = false
        } else {
          this.timer = setTimeout(() => { this.queryInstanceStatus(instanceids) }, 1000)
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
      if (this.templateInputs.length > 0) {
        let params = {
          parameters: {}
        }
        this.VmDataGroup.forEach(item => {
          item.VmResourceData.forEach(resourceItem => {
            let key = resourceItem.label
            params.parameters[key] = resourceItem.value
          })
          item.data.forEach(data => {
            data.data.forEach(netData => {
              let key = netData.label
              params.parameters[key] = netData.value
            })
          })
        })
        this.netWorkSetData.forEach(item => {
          item.data.forEach(data => {
            let key = data.label
            params.parameters[key] = data.value
          })
        })
        this.otherData.forEach(item => {
          let key = item.label
          params.parameters[key] = item.value
        })
        appo.instantiateApp(instanceId, params).then(response => {
          this.afterInstantiateApp(instanceId)
        }).catch(() => {
          this.catchInstantiateApp()
        })
      } else {
        appo.instantiateApp(instanceId).then(response => {
          this.afterInstantiateApp()
        }).catch(() => {
          this.catchInstantiateApp()
        })
      }
    },
    afterInstantiateApp (instanceId) {
      this.loading = false
      this.dialogVisible = false
      setTimeout(() => {
        appo.setProfile(instanceId).then(res => {
          this.$nextTick(() => {
            this.$router.push('/mecm/app/instance')
          })
        })
      }, 30000)
    },
    catchInstantiateApp () {
      this.$message.error(this.$t('tip.deployFailed'))
      this.dialogVisible = false
      this.loading = false
    },
    batchInstaniateApp (instanceId) {
      let obj = {
        instantiationParameters: []
      }
      instanceId.forEach(item => {
        let paramObj = {
          parameters: {}
        }
        paramObj.appInstanceId = item.appInstanceId
        this.templateInputs.forEach(val => {
          let key = val.label
          paramObj.parameters[key] = val.value
        })
        obj.instantiationParameters.push(paramObj)
      })
      appo.batchInstantiateApp(obj).then(response => {
        this.afterInstantiateApp()
      }).catch(() => {
        this.catchInstantiateApp()
      })
    },
    handleSelectionChange (selection) {
      this.selectData = selection
    },

    // 分发
    distribute () {
      let row = JSON.parse(sessionStorage.getItem('appRow'))
      console.log(row)
      this.currentRowData = row
      this.distributionDialogVisible = true
      this.getNodeList(row)
    },
    handleEdgeNodeSelectionChange (val) {
      this.nodeSelection = val
      this.selectedNodeNum = val.length
    },
    async getNodeList (row) {
      sessionStorage.setItem('appId', row.appId)
      await inventory.getList(2).then(response => {
        this.edgeNodesData = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    handleEdgeNodePageSizeChange (edgeNodePageSize) {
      this.edgeNodePageSize = edgeNodePageSize
    },
    handleEdgeNodeCurrentPageChange (edgeNodeCurrentPage) {
      this.edgeNodeCurrentPage = edgeNodeCurrentPage
    },
    cancel () {
      this.distributionDialogVisible = false
      this.$refs.multipleEdgeNodeTable.clearSelection()
    },
    async confirm () {
      this.disLoading = true
      let selectedMecHost = []
      this.nodeSelection.forEach(data => {
        let obj = {}
        obj.hostIp = data.mechostIp
        selectedMecHost.push(obj)
      })
      this.$refs.multipleEdgeNodeTable.clearSelection()
      this.isSecureBackend = sessionStorage.getItem('isSecureBackend')
      let address = 'http://'
      if (this.isSecureBackend === 'true') {
        address = 'https://'
      }
      let params = {
        appPkgId: this.currentRowData.packageId,
        appId: this.currentRowData.appId,
        appPkgName: this.currentRowData.name,
        appPkgVersion: this.currentRowData.version,
        appPkgDesc: this.currentRowData.shortDesc ? this.currentRowData.shortDesc : 'none',
        appPkgAffinity: this.currentRowData.affinity,
        appPkgPath: address + this.currentRowData.appstoreEndpoint + '/mec/appstore/v1/apps/' + this.currentRowData.appId + '/packages/' + this.currentRowData.packageId + '/action/download',
        appProvider: this.currentRowData.provider,
        mecHostInfo: selectedMecHost,
        createdTime: new Date().toString(),
        modifiedTime: new Date().toString()
      }
      if (params.appPkgVersion && params.mecHostInfo.length > 0) {
        apm.confirmToDistribute(params).then(response => {
          sessionStorage.setItem('appId', params.appId)
          this.distributionDialogVisible = false
          this.$nextTick(
            this.initList()
          )
        }).catch(() => {
          this.disLoading = false
          this.$message.error(this.$t('tip.failedToDownload'), 3000)
        })
      } else {
        this.disLoading = false
        if (params.mecHostInfo.length === 0) {
          this.$message.warning(this.$t('tip.mecHost'))
        } else {
          this.$message.warning(this.$t('tip.version'))
        }
      }
    }
  }
}
</script>

<style lang='less'>
.configForm{
  padding: 0 30px;
  .title{
    margin-bottom: 12px;
  }
  .title::before{
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
    margin-bottom: 20px !important;
  }
  .hostip{
    margin-right:10px;
  }
  .apptemplate{
    .el-collapse{
      padding: 0 15px;
      .el-collapse-item__header{
        background-color: transparent;
        font-size: 18px;
        padding: 5px 0;
        color: #606266;
        font-weight: normal;
      }
      .el-collapse-item__wrap{
        background-color: transparent;
      }
      .el-collapse-item__header:hover {
        background-color: #d0cae0;
        border-radius: 10px;
      }
    }
    .first-title{
      font-size: 18px;
      padding: 8px 10px;
      color: #606266;
    }
    .second-title{
      font-size: 16px;
      padding: 0 20px;
      color: #606266;
    }
    .apptemplate-form.el-form-item{
      margin-bottom: 5px !important;
      .el-form-item__label{
        font-size: 14px !important;
      }
    }
  }
}
</style>
