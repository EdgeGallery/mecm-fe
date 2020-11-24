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
      <p class="btn-p">
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
          <div
            v-for="(item,index) in currPageTableData"
            :key="index"
            class="content"
          >
            <div
              class="list"
            >
              <el-form
                label-width="90px"
              >
                <el-form-item :label="$t('system.appstore.appstoreName')">
                  {{ item.appstoreName }}
                </el-form-item>
                <el-form-item label="厂商">
                  {{ item.producer }}
                </el-form-item>
                <el-form-item label="用户名">
                  {{ item.userName }}
                </el-form-item>
                <el-form-item label="IP">
                  {{ item.appstoreIp }}
                </el-form-item>
                <el-form-item label="端口">
                  {{ item.appstorePort }}
                </el-form-item>
                <el-form-item class="rt btn-group">
                  <el-button
                    type="warning"
                    size="mini"
                    class="button"
                    id="deleteBtn"
                    @click.native.prevent="handleDelete(item)"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    class="button"
                    id="modifyBtn"
                    @click="handleEdit(item)"
                  >
                    {{ $t('common.modify') }}
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="pageBar">
          <pagination
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="25%"
      >
        <el-row>
          <el-col>
            <el-form
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
                :label="$t('system.appstore.vendor')"
                prop="producer"
              >
                <el-input
                  id="producer"
                  maxlength="20"
                  v-model="form.producer"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appLcm.userNmae')"
                prop="userName"
              >
                <el-input
                  id="username"
                  maxlength="20"
                  v-model="form.userName"
                  auto-complete="new-username"
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
                label="端口"
                prop="appstorePort"
              >
                <el-input
                  id="port"
                  maxlength="80"
                  v-model="form.appstorePort"
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
            @click="dialogVisible = false"
          >{{ $t('common.cancel') }}</el-button>
          <el-button
            id="confirmBtn"
            type="primary"
            @click="confirmToRegister('form')"
          >{{ $t('common.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { system } from '../tools/request.js'
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
        producer: '',
        userName: ''
      },
      currPageTableData: [],
      paginationData: [],
      tableData: [],
      dataLoading: true,
      rules: {
        appstoreName: [
          { required: true, message: this.$t('verify.appstorenameTip'), trigger: 'blur' }
        ],
        producer: [
          { required: true, message: this.$t('verify.vendorTip'), trigger: 'blur' }
        ],
        userName: [
          { required: true, message: this.$t('verify.usernameTip'), trigger: 'blur' }
        ],
        appstoreIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' }
        ],
        appstorePort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initList()
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
              dataKey = 'url'
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
        producer: '',
        uri: '',
        userName: ''
      }
    },
    register () {
      this.editType = 1
      this.dialogVisible = true
      this.urlDisable = false
      this.dialogTitle = this.$t('system.appstore.appStoreReg')
      this.resetForm()
    },
    confirmToRegister (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.editType === 1) {
            system.create(3, this.form).then(res => {
              this.$message.success(this.$t('tip.regAppStoreSuc'))
              this.initList()
              this.dialogVisible = false
            }, error => {
              if (error.response.status === 400 && error.response.data.details[0] === 'Record already exist') {
                this.$message.error(error.response.data.details[0])
              } else {
                this.$message.error(error.message)
              }
            })
          } else {
            system.modify(3, this.form, this.form.appstoreIp).then(res => {
              this.$message.success(this.$t('tip.regAppStoreSuc'))
              this.initList()
              this.dialogVisible = false
            }, error => {
              this.$message.error(error.message)
            })
          }
        }
      })
    },
    handleEdit (row) {
      this.dialogTitle = this.$t('system.appstore.appStoreModify')
      this.dialogVisible = true
      this.urlDisable = true
      this.form = row
      this.editType = 2
    },
    handleDelete (row) {
      this.$confirm(this.$t('tip.beforeDeleteAppstore'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        let data = {
          url: row.appstoreIp
        }
        system.delete(3, data).then(res => {
          this.initList()
          this.$message.success(this.$t('tip.deleteAppStoreSuc'))
        }).catch(error => {
          this.$message.error(error.message)
        })
      })
    },
    initList () {
      system.getList(3).then(res => {
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
  .btn-p{
    height: 40px;
    padding:15px 0;
    .rt{
        margin-bottom:15px;
      }
  }
  .btn-group{
    margin:15px 0;
  }
}
</style>
