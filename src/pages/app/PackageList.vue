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
    <div class="topLabel">
      {{ $t('nav.packageMana') }}
      <div class="block" />
    </div>
    <div class="btnMain">
      <el-button
        id="syncBtn"
        class="rt"
        type="primary"
        @click="showSyncBox()"
      >
        <span class="iconcont sync" />
        <span>{{ $t('app.packageList.synchronize') }}</span>
      </el-button>
    </div>
    <div class="contentList">
      <Search
        @getSearchData="getSearchData"
        :placeholder="$t('tip.fuzzyQuery')"
      />
      <div class="tableDiv">
        <el-row>
          <el-col
            :span="24"
            class="table"
          >
            <el-table
              v-loading="dataLoading"
              :data="currPageTableData"
              size="small"
            >
              <el-table-column
                prop="name"
                sortable
                :label="$t('app.packageList.name')"
              />
              <el-table-column
                prop="version"
                :label="$t('app.packageList.version')"
              />
              <el-table-column
                prop="provider"
                :label="$t('app.packageList.vendor')"
              />
              <el-table-column
                prop="industry"
                :label="$t('app.packageList.industry')"
              />
              <el-table-column
                prop="type"
                :label="$t('app.packageList.type')"
              />
              <el-table-column
                prop="affinity"
                :label="$t('app.packageList.affinity')"
              />
              <el-table-column
                prop="appstoreName"
                :label="$t('system.appstore.appstoreName')"
              />
              <el-table-column
                prop="createTime"
                :label="$t('app.packageList.syncTime')"
              />
              <el-table-column
                :label="$t('common.operation')"
                align="center"
                width="230"
              >
                <template slot-scope="scope">
                  <el-button
                    id="deployBtn"
                    @click="checkDetail(scope.row)"
                    type="text"
                    size="small"
                  >
                    {{ $t('app.packageList.distriAndDeploy') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="pageBar">
          <Pagination
            :page-sizes="[10,15,20,25]"
            :table-data="paginationData"
            @getCurrentPageData="getCurrentPageData"
          />
        </div>
      </div>
    </div>
    <!-- 同步 -->
    <el-dialog
      :show-close="false"
      :visible.sync="syncDialogVisible"
      width="width"
    >
      <div>
        <div class="secondLabel">
          {{ $t('app.packageList.synchronize') }}
        </div>
        <div>
          <el-select
            v-model="appstoreIp"
            :placeholder="$t('tip.pleaseSelect')"
            @change="chooseAppstore()"
          >
            <el-option
              v-for="item in appstoreOptions"
              :key="item.appstoreIp"
              :label="item.appstoreName"
              :value="item.appstoreIp"
            />
          </el-select>
        </div>
        <div>
          <el-table
            ref="syncPackageTable"
            :data="syncPackageTableData"
            class="mt20"
            size="small"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="name"
              sortable
              :label="$t('app.packageList.name')"
            />
            <el-table-column
              prop="version"
              :label="$t('app.packageList.version')"
            />
            <el-table-column
              prop="provider"
              :label="$t('app.packageList.vendor')"
            />
            <el-table-column
              prop="industry"
              :label="$t('app.packageList.industry')"
            />
            <el-table-column
              prop="type"
              :label="$t('app.packageList.type')"
            />
            <el-table-column
              prop="affinity"
              :label="$t('app.packageList.affinity')"
            />
          </el-table>
        </div>
        <Pagination
          :page-sizes="[10,15,20,25]"
          :table-data="paginationPackageData"
          @getCurrentPageData="getCurrentPagePackageData"
        />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="confirmToSync()"
            size="small"
            id="confirmBtn"
          >
            {{ $t('common.confirm') }}
          </el-button>
          <el-button
            @click="cancelToSync"
            size="small"
            id="cancelBtn"
          >
            {{ $t('common.cancel') }}
          </el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apm, inventory } from '../../tools/request.js'
import { TYPESFORAPP, INDUSTRY } from '../../tools/constant.js'
import Search from '../../components/common/Search.vue'
import Pagination from '../../components/common/Pagination.vue'
export default {
  name: 'ApacList',
  components: {
    Search, Pagination
  },
  data () {
    return {
      dataLoading: false,
      tableData: [],
      paginationData: [],
      currPageTableData: [],
      appType: '',
      loading: false,
      appId: '',
      language: localStorage.getItem('language'),
      selectData: [],
      syncDialogVisible: false,
      appstoreOptions: [],
      appstoreIp: '',
      syncPackageTableData: [],
      paginationPackageData: []
    }
  },
  mounted () {
    this.appType = this.$route.query.type ? this.$route.query.type : ''
    this.getPackageList()
    this.getAppstoreList()
  },
  watch: {
    '$i18n.locale': function () {
      let language = localStorage.getItem('language')
      this.language = language
      this.getPackageList()
    }
  },
  methods: {
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
      this.paginationData = this.tableData
      if (data) {
        this.filterTableData(data.toLowerCase())
      } else {
        this.initList()
      }
    },
    // 列表根据分页组件显示数据
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    getCurrentPagePackageData (data) {
      this.syncPackageTableData = data
    },
    handleSelectionChange (val) {
      if (val.length > 0) {
        val.forEach(item => {
          this.selectData.push(
            {
              appId: item.appId,
              appstoreIp: this.appstoreIp,
              packageId: item.packageId
            }
          )
        })
      }
    },
    chooseAppstore (val) {
      this.showSyncBox()
      this.$refs.syncPackageTable.clearSelection()
    },
    checkDetail (row) {
      sessionStorage.setItem('appRow', JSON.stringify(row))
      sessionStorage.setItem('appId', row.appId)
      this.$nextTick(
        this.$router.push('/mecm/app/distribution?appId=' + row.appId)
      )
    },
    async getAppstoreList () {
      this.dataLoading = true
      inventory.getList(3).then(res => {
        if (res.data && res.data.length > 0) {
          this.appstoreOptions = res.data
          this.appstoreIp = res.data[0].appstoreIp
        }
      })
    },
    showSyncBox () {
      this.syncDialogVisible = true
      apm.getAppPackageList(this.appstoreIp).then(response => {
        this.paginationPackageData = response.data
        this.selectData = []
      }).catch(error => {
        console.log(error)
        this.paginationPackageData = []
        this.selectData = []
      })
    },
    cancelToSync () {
      this.syncDialogVisible = false
      this.$refs.syncPackageTable.clearSelection()
    },
    confirmToSync () {
      if (this.selectData.length === 0) {
        this.$message.warning(this.$t('app.packageList.syncTip'))
      } else {
        this.syncAppFromStore()
      }
    },
    syncAppFromStore () {
      apm.syncAppFromStore(this.selectData).then(res => {
        if (res) {
          let num = 0
          this.selectData.forEach(item => {
            num++
            apm.getOneSyncStatus(item.appId, item.packageId).then(response => {
              if (num === this.selectData.length) {
                this.$message.success(this.$t('app.packageList.syncSuccess'))
                this.$refs.syncPackageTable.clearSelection()
              }
            }).catch(error => {
              console.log(error)
              this.syncDialogVisible = false
            })
          })
          if (num === this.selectData.length) {
            this.getPackageList()
          }
          this.syncDialogVisible = false
        }
      }).catch(error => {
        if (error.response.status === 403) {
          this.$message.error(this.$t('tip.loginOperation'))
        }
      })
    },
    handlePackagePageSizeChange (packagePageSize) {
      this.packagePageSize = packagePageSize
    },
    handlePackageCurrentPageChange (packageCurrentPage) {
      this.packageCurrentPage = packageCurrentPage
    },
    getPackageList () {
      apm.initApmPackages().then(response => {
        this.tableData = response.data
        this.tableData.forEach(item => {
          item.createTime = item.createTime.split('T')[0]
        })
        this.paginationData = this.tableData
        this.checkProjectData()
        if (this.appType) this.filterTableData(this.appType, 'type')
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
      })
    },
    checkProjectData () {
      this.tableData.forEach(itemBe => {
        INDUSTRY.forEach(itemFe => {
          if (itemBe.industry.match(itemFe.label[0]) && this.language === 'cn') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.industry.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.industry = itemBe.industry.replace(itemFe.label[0], itemFe.label[1])
          }
        })
        TYPESFORAPP.forEach(itemFe => {
          if (itemBe.type.match(itemFe.label[0]) && this.language === 'cn') {
            itemBe.type = itemBe.type.replace(itemFe.label[1], itemFe.label[0])
          } else if (itemBe.type.match(itemFe.label[1]) && this.language === 'en') {
            itemBe.type = itemBe.type.replace(itemFe.label[0], itemFe.label[1])
          }
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.shortdesc{
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
</style>
