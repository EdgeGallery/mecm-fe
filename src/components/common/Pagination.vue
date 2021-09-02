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
  <div class="pagination">
    <el-pagination
      background
      class="rt"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      v-if="totalNum!=0"
    />
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      required: true,
      type: Array
    },
    pageSizes: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      pageSize: this.pageSizes[0],
      totalNum: 0,
      currentPage: 1,
      data: []
    }
  },
  watch: {
    tableData (val) {
      this.data = val
      this.totalNum = val.length
      this.returnTableData(1)
    }
  },

  methods: {
    handlePageSizeChange (val) {
      this.pageSize = val
      this.returnTableData(0)
    },
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.returnTableData(0)
    },
    returnTableData (type) {
      if (type) {
        this.currentPage = 1
      }
      let start = (this.currentPage - 1) * this.pageSize
      let end = this.currentPage * this.pageSize
      let currentPageData = this.data.slice(start, end)
      this.$emit('getCurrentPageData', currentPageData)
    }
  }
}

</script>
<style  lang='less'>
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #6e35f7 !important;
    color: #fff !important;
    border-radius: 10px!important;
}
  .el-pagination.is-background .el-pager li {
    background-color: #0d0d0d;
    color: #fff;
    border-radius: 10px!important;
    width: 20px!important;
    min-width: 20px;
    height: 20px!important;
    line-height: 20px!important;
    padding: 0 !important;
    position: relative;
    top: 3px;
  }
  .el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next{
    color: #717185  !important;
    background: none !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #FFF;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
</style>
