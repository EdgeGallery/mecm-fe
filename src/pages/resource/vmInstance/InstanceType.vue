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
          :label="$t('resourceMgr.name')"
          sortable="custom"
        />
        <el-table-column
          prop="vcpus"
          :label="$t('resourceMgr.vcpu')"
          width="130px"
        />
        <el-table-column
          prop="ram"
          :label="$t('resourceMgr.ram')"
          width="110px"
        />
        <el-table-column
          prop="disk"
          :label="$t('resourceMgr.totalDisk')"
          width="110px"
        />
        <el-table-column
          prop="ephemeralDisk"
          :label="$t('resourceMgr.tempDisk')"
          width="120px"
        />
        <el-table-column
          prop="isPublic"
          :label="$t('resourceMgr.public')"
          width="90px"
          :formatter="formatBoolean"
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
    return {
      dialogVisible: true,
      currentPageData: [],
      paginationData: [],
      selectFlavor: {
        step: 'stepFlavor',
        flavor: ''
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
      this.selectFlavor.flavor = val[0].id
    },
    // receive msg from parent component
    parentMsg: function (active) {
      this.$emit('getStepData', this.selectFlavor)
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryFlavorsByMechost(_hostIp).then(res => {
        this.paginationData = res.data.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
        this.$message.error(this.$t('resourceMgr.queryFlavorsFailed'))
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
    }, 600)
  }
}
</script>
