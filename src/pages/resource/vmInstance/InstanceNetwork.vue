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
  <div>
    <div>
      <el-table
        :data="currentPageData"
        class="tableStyle"
        @selection-change="selectionLineChangeHandle"
        ref="multipleTable"
        @sort-change="sortMethod"
        height="260"
      >
        <el-table-column
          type="selection"
          width="50"
        />
        <el-table-column
          prop="name"
          :label="$t('resourceMgr.network')"
          width="150px"
          sortable="custom"
        />
        <el-table-column
          :label="$t('resourceMgr.fixedIp')"
          width="180px"
        >
          <template slot-scope="scope">
            <el-form
              :model="scope.row"
              :rules="rules"
              ref="scope.row"
              class="fixedIp"
            >
              <el-form-item prop="fixedIp">
                <el-input
                  size="small"
                  v-model="scope.row.fixedIp"
                  type="text"
                  placeholder="enter fixedIp"
                />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="shared"
          :label="$t('resourceMgr.shared')"
          width="90px"
          :formatter="formatBoolean"
        />
        <el-table-column
          prop="adminStatus"
          :label="$t('resourceMgr.adminStatus')"
          width="200px"
          :formatter="formatBoolean"
        />
        <el-table-column
          prop="status"
          :label="$t('resourceMgr.status')"
        />
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
  </div>
</template>
<script>
import Pagination from '../../../components/common/Pagination.vue'
import { appo } from '../../../tools/request.js'
export default {
  components: {
    Pagination
  },
  props: {
  },
  data () {
    const validateMechost = (rule, value, callback) => {
      let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (!value) {
        callback(new Error(this.$t('resourceMgr.enterIp')))
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('resourceMgr.enterRightIp')))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: true,
      currentPageData: [],
      paginationData: [],
      selectNetwork: {
        step: 'stepNetwork',
        networks: [],
        availabilityZone: ''
      },
      rules: {
        fixedIp: [
          { required: true, validator: validateMechost, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    formatBoolean (row, column, cellValue) {
      var ret = ''
      if (cellValue) {
        ret = 'true'
      } else {
        ret = 'false'
      }
      return ret
    },
    selectionLineChangeHandle (val) {
      val.forEach(item => {
        let _tempNetwork = {
          network: item.id,
          fixedIp: item.fixedIp
        }
        this.selectNetwork.networks.push(_tempNetwork)
        this.selectNetwork.availabilityZone = item.availabilityZones[0]
      })
    },
    // receive msg from parent component
    parentMsg: function (active) {
      this.$emit('getStepData', this.selectNetwork)
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryNetworksByMechost(_hostIp).then(res => {
        this.paginationData = res.data.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
        this.$message.error(this.$t('resourceMgr.queryNetworksFailed'))
      })
    },
    sortMethod (column) {
      if (column.order === 'ascending') {
        this.paginationData.sort((a, b) => {
          if (a.name.toLowerCase().substring(0, 1) > b.name.toLowerCase().substring(0, 1)) {
            return 1
          }
          return -1
        })
      } else if (column.order === 'descending') {
        this.paginationData.sort((a, b) => {
          if (a.name.toLowerCase().substring(0, 1) > b.name.toLowerCase().substring(0, 1)) {
            return -1
          }
          return 1
        })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.getTableData()
    }, 900)
  }
}
</script>
<style lang="less" scoped>
.fixedIp{
  margin-top: 15px;
  padding: 0 1px !important;
  height: 50px;
}
.fixedIp /deep/ .el-form-item__error {
  color: #F56C6C;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top:30px
}
</style>
