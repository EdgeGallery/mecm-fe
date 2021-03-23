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
      :first="$t('nav.overview')"
      :second="$t('nav.system')"
      :third="$t('nav.appstore')"
      :path="{ path: '/mecm/systems/external/applcm' }"
    />
    <div class="appstore">
      <Search
        :affinity-item="false"
        :ip-item="true"
        :status-item="false"
        @getSearchData="getSearchData"
      />
      <p
        class="btn-p"
        v-if="rlp=='418'"
      >
        <el-button
          id="newregBtn"
          type="primary"
          :disabled="false"
          @click="register"
          class="rt"
        >
          {{ $t('system.appLcm.newReg') }}
        </el-button>
      </p>
      <div class="">
        <div class="appstoreList">
          <el-table
            :data="currPageTableData"
            style="width: 100%"
          >
            <el-table-column
              sortable
              prop="appstoreName"
              :label="$t('system.appstore.appstoreName')"
            />
            <el-table-column
              prop="appstoreIp"
              :label="$t('system.appstore.ipAddress')"
            />
            <el-table-column
              prop="appstorePort"
              :label="$t('system.appLcm.port')"
            />
            <el-table-column
              prop="appstoreRepo"
              :label="$t('system.appstore.appstoreRepo')"
            />
            <el-table-column
              prop="appstoreRepoName"
              :label="$t('system.appstore.appstoreRepoName')"
            />
            <el-table-column
              prop="appstoreRepoUserName"
              :label="$t('system.appstore.appstoreRepoUserName')"
            />
            <el-table-column
              prop="producer"
              :label="$t('system.appstore.vendor')"
            />
            <el-table-column
              header-align="center"
              align="center"
              v-if="rlp=='418'"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  class="button"
                  id="deleteBtn"
                  @click.native.prevent="handleDelete(scope.row)"
                >
                  {{ $t('common.delete') }}
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  class="button"
                  id="modifyBtn"
                  @click="handleEdit(scope.row)"
                >
                  {{ $t('common.modify') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="25%"
      >
        <el-row>
          <el-col>
            <el-form
              label-width="auto"
              :model="form"
              ref="form"
              :rules="rules"
            >
              <el-form-item
                :label="$t('system.appstore.appstoreName')"
                prop="appstoreName"
              >
                <el-input
                  id="appstorename"
                  maxlength="20"
                  v-model="form.appstoreName"
                />
              </el-form-item>
              <el-form-item
                label="IP"
                prop="appstoreIp"
              >
                <el-input
                  id="ip"
                  maxlength="80"
                  v-model="form.appstoreIp"
                  :disabled="urlDisable"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appLcm.port')"
                prop="appstorePort"
              >
                <el-input
                  id="port"
                  maxlength="80"
                  v-model="form.appstorePort"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appstore.appstoreRepo')"
                prop="appstoreRepo"
              >
                <el-input
                  id="appstoreRepo"
                  maxlength="20"
                  v-model="form.appstoreRepo"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appstore.appstoreRepoName')"
                prop="appstoreRepoName"
              >
                <el-input
                  id="appstoreRepoName"
                  maxlength="20"
                  v-model="form.appstoreRepoName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appstore.appstoreRepoUserName')"
                prop="appstoreRepoUserName"
              >
                <el-input
                  id="appstoreRepoUserName"
                  maxlength="20"
                  v-model="form.appstoreRepoUserName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appstore.appstoreRepoPassword')"
                prop="appstoreRepoPassword"
                v-if="rlp=='418'"
              >
                <el-input
                  id="appstoreRepoPassword"
                  maxlength="80"
                  v-model="form.appstoreRepoPassword"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appstore.vendor')"
                prop="producer"
              >
                <el-input
                  id="producer"
                  maxlength="20"
                  v-model="form.producer"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            id="cancelBtn"
            size="small"
            @click="dialogVisible = false"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            id="confirmBtn"
            type="primary"
            size="small"
            @click="confirmToRegister('form')"
          >{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { inventory } from '../tools/request.js'
import Search from '../components/Search.vue'
import pagination from '../components/Pagination.vue'
import Breadcrumb from '../components/BreadCrumb'
export default {
  name: 'Appstore',
  components: {
    Search, pagination, Breadcrumb
  },
  data () {
    return {
      dialogVisible: false,
      urlDisable: 'false',
      dialogTitle: this.$t('system.appstore.appStoreReg'),
      form: {
        appstoreIp: '',
        appstoreName: '',
        appstorePort: '',
        appstoreRepo: '',
        appstoreRepoName: '',
        appstoreRepoPassword: '',
        appstoreRepoUserName: '',
        producer: ''
      },
      currPageTableData: [],
      paginationData: [],
      tableData: [],
      dataLoading: true,
      rlp: sessionStorage.getItem('rlp')
    }
  },
  mounted () {
    this.initList()
  },
  computed: {
    rules () {
      return {
        appstoreName: [
          { required: true, message: this.$t('verify.appstorenameTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ],
        appstoreIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appstorePort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appstoreRepo: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        appstoreRepoName: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        appstoreRepoUserName: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        appstoreRepoPassword: [
          { required: true, message: this.$t('verify.mustOptions'), trigger: 'blur' }
        ],
        producer: [
          { required: true, message: this.$t('verify.vendorTip'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
        ]
      }
    }
  },
  methods: {
    filterTableData (val, key) {
      this.paginationData = this.paginationData.filter(item => {
        let itemVal = item[key].toLowerCase()
        return itemVal.indexOf(val) > -1
      })
    },
    getSearchData (data) {
      this.paginationData = this.tableData
      if (this.paginationData && this.paginationData.length > 0) {
        let reset = false
        for (let key in data) {
          if (data[key]) {
            reset = true
            let dataKey = key
            if (key === 'ip') {
              dataKey = 'appstoreIp'
            } else if (key === 'name') {
              dataKey = 'appstoreName'
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
    resetForm () {
      this.form = {
        appstoreIp: '',
        appstoreName: '',
        appstorePort: '',
        appstoreRepo: '',
        appstoreRepoName: '',
        appstoreRepoPassword: '',
        appstoreRepoUserName: '',
        producer: ''
      }
    },
    register () {
      this.editType = 1
      this.dialogVisible = true
      this.urlDisable = false
      this.dialogTitle = this.$t('system.appstore.appStoreReg')
      this.resetForm()
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    confirmToRegister (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          console.log(this.form)
          if (this.editType === 1) {
            inventory.create(3, this.form).then(res => {
              this.showSuccessTip()
            }, error => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else if (error.response.status === 403) {
                this.$message.error(this.$t('tip.loginOperation'))
              } else {
                this.$message.error(error.response.data)
              }
            })
          } else {
            inventory.modify(3, this.form, this.form.appstoreIp).then(res => {
              this.showSuccessTip()
            }, error => {
              this.$message.error(error.response.data)
            })
          }
        }
      })
    },
    handleEdit (row) {
      this.dialogTitle = this.$t('system.appstore.appStoreModify')
      this.dialogVisible = true
      this.urlDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.form = middleData
      this.editType = 2
    },
    handleDelete (row) {
      this.$confirm(this.$t('tip.beforeDeleteAppstore'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        inventory.delete(3, row.appstoreIp).then(res => {
          this.initList()
          this.showMessage('success', this.$t('tip.deleteAppStoreSuc'), 1500)
        }).catch(error => {
          this.$message.error(error.response.data)
        })
      })
    },
    showSuccessTip () {
      this.showMessage('success', this.$t('tip.regAppStoreSuc'), 1500)
      this.initList()
      this.dialogVisible = false
    },
    initList () {
      inventory.getList(3).then(res => {
        this.tableData = this.paginationData = res.data
        this.dataLoading = false
      }, error => {
        this.dataLoading = false
        if (error.response.status === 404 && error.response.data.details[0] === 'Record not found') {
          this.tableData = this.paginationData = []
        } else {
          this.$message.error(this.$t('tip.getCommonListFailed'))
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.appstore{
  margin: 0 5%;
  height: 100%;
  background: #fff;
  padding: 30px 60px;
  .btn-group{
    margin:15px 0;
  }
}
</style>
