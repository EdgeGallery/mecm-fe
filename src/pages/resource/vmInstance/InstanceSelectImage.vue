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
          width="70"
        />
        <el-table-column
          prop="imageName"
          :label="$t('resourceMgr.name')"
          sortable="custom"
        />
        <el-table-column
          prop="hasUpdate"
          :label="$t('resourceMgr.hasUpdate')"
        />
        <el-table-column
          prop="size"
          :label="$t('resourceMgr.size')"
        />
        <el-table-column
          prop="type"
          :label="$t('resourceMgr.type')"
        />
        <el-table-column
          prop="visibility"
          :label="$t('resourceMgr.visibility')"
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
      selectImage: {
        step: 'stepImage',
        imageId: ''
      }
    }
  },
  methods: {
    getCurrentPageData (data) {
      this.currentPageData = data
    },
    selectionLineChangeHandle (val) {
      this.selectImage.imageId = val[0].imageId
    },
    // receive msg from parent component
    parentMsg: function (active) {
      this.$emit('getStepData', this.selectImage)
    },
    getTableData () {
      let _hostIp = sessionStorage.getItem('hostIp')
      appo.queryImagesByMechost(_hostIp).then(res => {
        this.paginationData = res.data.data
        this.dataLoading = false
      }).catch((error) => {
        this.dataLoading = false
        console.log(error)
        this.$message.error(this.$t('resourceMgr.queryImagesFailed'))
      })
    },
    sortMethod (column) {
      if (column.order === 'ascending') {
        this.paginationData.sort((a, b) => {
          if (a.imageName.toLowerCase().substring(0, 1) > b.imageName.toLowerCase().substring(0, 1)) {
            return 1
          }
          return -1
        })
      } else if (column.order === 'descending') {
        this.paginationData.sort((a, b) => {
          if (a.imageName.toLowerCase().substring(0, 1) > b.imageName.toLowerCase().substring(0, 1)) {
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
    }, 300)
  }
}
</script>
