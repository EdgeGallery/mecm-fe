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
      :third="$t('nav.applcm')"
    />
    <Search
      :ip-item="true"
      @getSearchData="getSearchData"
    />
    <div class="sysLcm">
      <div class="tableDiv">
        <p class="btn-p">
          <span class="rt">
            <el-button
              id="newregBtn"
              type="primary"
              @click="register"
            >{{ $t('system.appLcm.newReg') }}</el-button>
          </span>
        </p>
        <el-row>
          <el-col
            :span="4"
            :offset="1"
            v-for="(item,index) in currPageTableData"
            :key="index"
          >
            <el-card :body-style="{ padding: '0px' }">
              <div class="info-card">
                <p class="name">
                  APPLCM
                </p>
                <p class="info">
                  <span>{{ item.applcmIp }}</span><span>&nbsp;/&nbsp;{{ item.applcmPort }}</span>
                </p>
                <div class="bottom clearfix rt">
                  <el-button
                    type="text"
                    class="button"
                    id="modifyBtn"
                    @click="handleEdit(item)"
                  >
                    {{ $t('common.modify') }}
                  </el-button>
                  <el-button
                    type="text"
                    class="button"
                    id="deleteBtn"
                    @click.native.prevent="handleDelete(item)"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                </div>
              </div>
            </el-card>
          </el-col>
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
        width="40%"
      >
        <el-row>
          <el-col
            :span="16"
          >
            <el-form
              label-width="150px"
              :model="form"
              ref="form"
              :rules="rules"
            >
              <el-form-item
                label="APPLCM 名称"
                prop="applcmName"
              >
                <el-input
                  id="name"
                  maxlength="20"
                  v-model="form.applcmName"
                />
              </el-form-item>
              <el-form-item
                :label="$t('app.packageList.ip')"
                prop="applcmIp"
              >
                <el-input
                  id="ip"
                  v-model="form.applcmIp"
                  :disabled="ipDisable"
                />
              </el-form-item>
              <el-form-item
                :label="$t('system.appLcm.port')"
                prop="applcmPort"
              >
                <el-input
                  id="port"
                  v-model="form.applcmPort"
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
import { system } from '../../tools/request.js'
import pagination from '../../components/Pagination.vue'
import Breadcrumb from '../../components/BreadCrumb'

export default {
  name: 'SysLcm',
  components: {
    pagination,
    Breadcrumb
  },
  data () {
    return {
      dataLoading: true,
      tableData: [],
      currPageTableData: [],
      paginationData: [],
      dialogVisible: false,
      ipDisable: false,
      title: this.$t('system.appLcm.applcmReg'),
      form: {
        applcmIp: '',
        applcmPort: '',
        userName: ''
      },
      editType: 1,
      rules: {
        applcmIp: [
          { required: true, message: this.$t('verify.ipTip'), trigger: 'blur' },
          { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: this.$t('verify.normalVerify') }
        ],
        applcmPort: [
          { required: true, message: this.$t('verify.portTip'), trigger: 'blur' },
          { pattern: /^[1-9]\d{0,4}$/, message: this.$t('verify.normalVerify') }
        ],
        applcmName: [
          { required: true, message: this.$t('verify.applcmNameTip'), trigger: 'blur' }
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
            this.filterTableData(data[key].toLowerCase(), key)
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
      this.title = this.$t('system.appLcm.applcmModify')
      this.dialogVisible = true
      this.ipDisable = true
      this.form = row
    },
    handleDelete (row) {
      this.$confirm(this.$t('tip.beforeDeleteApplcm'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        system.delete(1, row.applcmIp).then(res => {
          this.initList()
        }, error => {
          this.$message.error(error.message)
        })
      }).catch(() => {
      })
    },
    register () {
      this.editType = 1
      this.title = this.$t('system.appLcm.applcmReg')
      this.dialogVisible = true
      this.ipDisable = false
    },
    confirmToRegister (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.editType === 1) {
            system.create(1, this.form).then(res => {
              this.$message.success(this.$t('tip.regAppLcmSuc'))
              this.initList()
              this.dialogVisible = false
            }, error => {
              this.$message.error(error.message)
            })
          } else {
            system.modify(1, this.form, this.form.applcmIp).then(res => {
              this.$message.success(this.$t('tip.modAppLcmSuc'))
              this.initList()
              this.dialogVisible = false
            }, error => {
              this.$message.error(error.message)
            })
          }
        }
      })
    },
    initList () {
      system.getList(1).then(res => {
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
  .tableDiv{
    padding-top:25px;
    p{
      padding-bottom:5px;
      .title{
        position:relative;
        top:15px;
      }
      span.title::before{
        content:'';
        display: inline-block;
        height:15px;
        width:4px;
        background: #409EFF;
        position: relative;
        top:3px;
        margin-right:3px;
      }
      .rt{
        margin-bottom:15px;
      }
    }
  }
  .el-form{
    margin-top:36px;
  }
  .info-card{
    line-height: 28px;
    padding:15px;
    .name{
      text-align: center;
      font-size:15px;
      font-weight: bold;
    }
    .info{
      text-align: center;
    }
  }
  .btn-p{
    height:50px;
  }
}
</style>
