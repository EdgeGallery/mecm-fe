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
      :third="$t('nav.appRule')"
      :path="{ path: '/mecm/systems/external/applcm' }"
    />
    <div class="sysLcm">
      <div class="applcmContainer">
        <Search
          :affinity-item="false"
          :ip-item="true"
          :name-item="false"
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
            @click="register"
            class="rt"
          >
            {{ $t('system.appLcm.newReg') }}
          </el-button>
        </p>
        <div class="applcmList">
          <div
            v-for="(item,index) in currPageTableData"
            :key="index"
            class="content"
          >
            <div
              class="list"
            >
              <el-form
                label-width="auto"
              >
                <el-form-item :label="$t('app.packageList.name')">
                  {{ item.appRuleName }}
                </el-form-item>
                <el-form-item :label="$t('app.packageList.ip')">
                  {{ item.appRuleIp }}
                </el-form-item>
                <el-form-item :label="$t('system.appLcm.port')">
                  {{ item.appRulePort }}
                </el-form-item>
                <el-form-item
                  class="rt btn-group"
                  v-if="rlp=='418'"
                >
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
            :page-sizes="[8,12,16,20]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="title"
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
              :label="$t('system.appLcm.name')"
              prop="appRuleName"
            >
              <el-input
                id="name"
                maxlength="20"
                v-model="form.appRuleName"
              />
            </el-form-item>
            <el-form-item
              :label="$t('app.packageList.ip')"
              prop="appRuleIp"
            >
              <el-input
                id="ip"
                v-model="form.appRuleIp"
                :disabled="ipDisable"
              />
            </el-form-item>
            <el-form-item
              :label="$t('system.appLcm.port')"
              prop="appRulePort"
            >
              <el-input
                id="port"
                v-model="form.appRulePort"
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
</template>

<script>
import { inventory } from '../tools/request.js'
import Search from '../components/Search.vue'
import pagination from '../components/Pagination.vue'
import Breadcrumb from '../components/BreadCrumb'

export default {
  name: 'SysLcm',
  components: {
    pagination,
    Breadcrumb,
    Search
  },
  data () {
    return {
      dataLoading: true,
      tableData: [],
      currPageTableData: [],
      paginationData: [],
      dialogVisible: false,
      ipDisable: false,
      title: this.$t('app.ruleConfig.appRuleManReg'),
      form: {
        appRuleIp: '',
        appRulePort: 30206,
        userName: '',
        appRuleName: ''
      },
      editType: 1,
      rlp: sessionStorage.getItem('rlp')
    }
  },
  computed: {
    rules () {
      return {
        appRuleIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appRulePort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        appRuleName: [
          { required: true, message: this.$t('app.ruleConfig.appRuleMgrMust'), trigger: 'blur' },
          { pattern: /^[\da-zA-Z_\u4e00-\u9f5a]{1,16}$/, message: this.$t('verify.noSymbol') }
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
              dataKey = 'appRuleIp'
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
    handleEdit (row) {
      this.editType = 2
      this.title = this.$t('app.ruleConfig.appRuleManEdit')
      this.dialogVisible = true
      this.ipDisable = true
      let middleData = JSON.parse(JSON.stringify(row))
      this.form = middleData
    },
    handleDelete (row) {
      this.$confirm(this.$t('tip.beforeDeleteAppMgr'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        inventory.delete(4, row.appRuleIp).then(res => {
          this.showMessage('success', this.$t('tip.deleteSuc'), 1500)
          this.initList()
        }, error => {
          this.$message.error(error.response.data)
        })
      })
    },
    register () {
      this.editType = 1
      this.title = this.$t('app.ruleConfig.appRuleManReg')
      this.form = {
        appRuleIp: '',
        appRulePort: 30206,
        userName: '',
        appRuleName: ''
      }
      this.dialogVisible = true
      this.ipDisable = false
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
    confirmToRegister (form) {
      console.log(this.form)
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.editType === 1) {
            inventory.create(4, this.form).then(res => {
              this.showMessage('success', this.$t('tip.regAppManSuc'), 1500)
              this.initList()
              this.dialogVisible = false
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
            inventory.modify(4, this.form, this.form.appRuleIp).then(res => {
              this.showMessage('success', this.$t('tip.modAppRuleSuc'), 1500)
              this.initList()
              this.dialogVisible = false
            }, error => {
              this.$message.error(error.response.data)
            })
          }
        }
      })
    },
    initList () {
      inventory.getList(4).then(res => {
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
.sysLcm{
  margin: 0 5%;
  height: 100%;
  background: #fff;
  padding: 30px 60px;
  .btn-group{
    margin:15px 0;
  }
}
</style>
