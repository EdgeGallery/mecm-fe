<!--
  - Copyright 2021 Huawei Technologies Co., Ltd.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->
<template>
  <div class="security-group-content">
    <div class="search-createBtn">
      <el-row :gutter="24">
        <el-col
          :span="24"
          class="create-col"
        >
          <el-button
            class="return-btn"
            id="addSecurityGroupFlavorBtn"
            @click="returnSecurityGroup()"
          >
            {{ $t('resourceMgr.returnSecurityGroup') }}
          </el-button>
          <el-button
            class="create-btn"
            id="addSecurityGroupFlavorBtn"
            @click="addSecurityGroupFlavor()"
          >
            {{ $t('resourceMgr.addSecurityGroupFlavor') }}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="security-group-table">
      <el-table
        :data="currentPageData"
        class="tableStyle"
        ref="multipleTable"
        v-loading="dataLoading"
        height="400"
      >
        <el-table-column
          prop="direction"
          :label="$t('resourceMgr.direct')"
          sortable
          width="150"
        />
        <el-table-column
          prop="ethertype"
          :label="$t('resourceMgr.ethertype')"
          width="130"
        />
        <el-table-column
          prop="ipProtocol"
          :label="$t('resourceMgr.ipProtocol')"
          width="130"
        />
        <el-table-column
          prop="portRange"
          :label="$t('resourceMgr.portRange')"
          width="130"
        />
        <el-table-column
          prop="remoteIpPrefix"
          :label="$t('resourceMgr.remoteIpPrefix')"
          width="180"
        />
        <el-table-column
          prop="remoteSecurityGroup"
          :label="$t('resourceMgr.remoteSecurityGroup')"
          width="230"
        />
        <el-table-column
          :label="$t('resourceMgr.operator')"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              class="operations_btn"
              id="secrityGroupEditBtn"
              @click.native.prevent="editSecurityGroupFlavor(scope.row)"
              type="text"
              size="small"
              :disabled="true"
            >
              {{ $t('resourceMgr.edit') }}
            </el-button>
            <el-button
              class="operations_btn"
              id="securityGroupDeleteBtn"
              @click.native.prevent="deleteSecurityGroupFlavor(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('resourceMgr.delete') }}
            </el-button>
          </template>
        </el-table-column>
        <template slot="empty">
          <div>
            <img
              src="../../../assets/images/empty.png"
              alt=""
              style="padding: 10px;"
            >
            <p>{{ $t('resourceMgr.noData') }}</p>
          </div>
        </template>
      </el-table>
      <div class="pageBar">
        <Pagination
          :page-sizes="[10,15,20,25]"
          :table-data="paginationData"
          @getCurrentPageData="getCurrentPageData"
        />
      </div>
    </div>
    <div v-if="isShowForm">
      <SecurityGroupFlavorForm
        v-model="isShowForm"
        :dlg-type="dlgType"
        :security-group-id="securityGroupId"
        @reloadTableData="reloadTableData"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '../../../components/common/Pagination.vue'
import SecurityGroupFlavorForm from '../form/SecurityGroupFlavorForm.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    Pagination,
    SecurityGroupFlavorForm
  },
  props: {
    securityGroupId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      nameQueryVal: '',
      paginationData: [],
      currentPageData: [],
      isShowForm: false,
      dlgType: 'createDlg',
      dataLoading: true
    }
  },
  methods: {
    addSecurityGroupFlavor () {
      this.isShowForm = true
      this.dlgType = 'createDlg'
    },
    editSecurityGroupFlavor () {
      this.isShowForm = true
      this.dlgType = 'editDlg'
    },
    deleteSecurityGroupFlavor (row) {
      this.$confirm(this.$t('resourceMgr.deleteSecurityGroupFlavorMessage'),
        this.$t('resourceMgr.deleteSecurityGroupFlavorTitle'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
        let _hostIp = sessionStorage.getItem('hostIp')
        appo.deleteSecurityGroupRuleBySecurityGroupRuleId(_hostIp, this.securityGroupId, row.id).then(res => {
          this.getTableData()
        }).catch((error) => {
          console.log(error)
          this.$message.error(this.$t('resourceMgr.deleteSecurityGroupRuleFailed'))
        })
      }).catch(() => {
        // This is intentional
      })
    },
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    getPort (item) {
      if (item.portRangeMin === null && item.portRangeMax === null) {
        return 'ALL'
      }
      return (item.portRangeMin === item.portRangeMax)
        ? item.portRangeMin : (item.portRangeMin + '-' + item.portRangeMax)
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.querySecurityGroupRulesByMechost(_hostIp, this.securityGroupId).then(res => {
        this.paginationData = res.data.data.securityGroupRules
        let _tempArr = []
        res.data.data.securityGroupRules.forEach(item => {
          let _tempItem = {
            id: item.id,
            direction: item.direction,
            ethertype: item.ethertype,
            ipProtocol: item.ipProtocol,
            portRange: this.getPort(item),
            remoteIpPrefix: item.remoteIpPrefix,
            remoteSecurityGroup: item.remoteGroupId
          }
          _tempArr.push(_tempItem)
        })
        this.paginationData = _tempArr
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
        this.$message.error(this.$t('resourceMgr.querySecurityGroupRulesFailed'))
      })
    },
    reloadTableData () {
      this.getTableData()
    },
    returnSecurityGroup () {
      this.$emit('returnBack')
    }
  },
  mounted () {
    this.getTableData()
  }
}
</script>
<style lang="less" scoped>
.security-group-content{
  width: 100%;
  height: 100%;
  padding-top: 1px;
  border-radius: 16px;
  background: #2E147C;
  .search-createBtn{
    .create-col{
      padding-right: 38px !important;
      text-align: right;
      display: inline-block;
      .return-btn{
        margin-top: 30px;
        height: 40px;
        color: #5E40C8;
        font-size: 20px !important;
        border-radius: 10px;
        border: 1px solid #5E40C8;
        padding: 0 35px;
        background-color: #FFFFFF;
      }
      .create-btn{
        margin-top: 30px;
        margin-right: 25px;
        height: 40px;
        color: #fff;
        font-size: 20px !important;
        border-radius: 10px;
        padding: 0 35px;
        background-image: linear-gradient(127deg, #4444d0, #6724cb);
        border: none;
      }
    }
  }
  .security-group-table{
    margin: 15px 25px;
  }
}
</style>
