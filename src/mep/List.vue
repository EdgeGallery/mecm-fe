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
  <div class="meplist">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mecm/overview' }">
          {{ $t('nav.mecm') }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mecm/node/list' }">
          Edge Nodes
        </el-breadcrumb-item>
        <el-breadcrumb-item>MEP List</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <searchForm
      :affinity-item="false"
      :ip-item="true"
      :status-item="true"
      :status="status"
      @getSearchData="getSearchData"
    />
    <div class="tableDiv">
      <el-table
        :data="currPageTableData"
        v-loading="dataLoading"
        border
        style="width: 100%;"
      >
        <el-table-column
          prop="name"
          sortable
          :label="$t('app.packageList.name')"
        />
        <el-table-column
          prop="host"
          sortable
          :label="$t('app.packageList.ip')"
        />
        <el-table-column
          prop="version"
          sortable
          :label="$t('app.packageList.version')"
        />
        <el-table-column
          prop="provider"
          sortable
          :label="$t('app.packageList.vendor')"
        />
        <el-table-column
          prop="status"
          sortable
          :label="$t('app.distriList.status')"
        />
      </el-table>
      <div class="pageBar">
        <pagination
          :table-data="paginationData"
          @getCurrentPageData="getCurrentPageData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import searchForm from '../components/Search.vue'
import pagination from '../components/Pagination.vue'
export default {
  name: 'Meplist',
  components: {
    searchForm, pagination
  },
  data () {
    return {
      status: ['Instantiated', 'Created', 'Instantiation Failed'],
      style: {
        textAlign: 'center'
      },
      tableData: [],
      paginationData: [],
      dataLoading: false,
      currPageTableData: []
    }
  },
  mounted () {
    // this.getMepList()
  },
  methods: {
    getCurrentPageData (data) {
      this.currPageTableData = data
    },
    checkDetail () {
      this.$router.push('/mecm/mep/detail')
    }
  }
}
</script>

<style lang='less' scoped>
.tableDiv {
  margin-top: 20px;
}
.el-table .cell i:before{
  margin-right: 5px;
}
</style>
