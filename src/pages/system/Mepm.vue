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
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.overview')"
      :second="$t('nav.system')"
      :third="$t('nav.mepm')"
      :path="{ path: '/mecm/system/mepm' }"
    />
    <div class="cardContent">
      <div class="applcmContainer">
        <Search
          :affinity-item="false"
          :ip-item="true"
          :name-item="false"
          :status-item="false"
          @getSearchData="getSearchData"
        />
        <p
          class="btn-p lt"
          v-if="rlp=='418'"
        >
          <el-button
            id="newregBtn"
            type="primary"
            @click="showEditDialog('')"
            class="rt"
          >
            {{ $t('system.mepm.newReg') }}
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
              :class="Math.round(Math.random())===0? 'bgImgone': 'bgImgtwo'"
            >
              <el-form
                label-width="auto"
              >
                <el-form-item :label="$t('app.packageList.name')">
                  {{ item.mepmName }}
                </el-form-item>
                <el-form-item :label="$t('app.packageList.ip')">
                  {{ item.mepmIp }}
                </el-form-item>
                <el-form-item :label="$t('system.mepm.port')">
                  {{ item.mepmPort }}
                </el-form-item>
                <p
                  class="btn-group flex"
                  v-if="rlp=='418'"
                >
                  <el-button
                    size="mini"
                    class="button"
                    id="deleteBtn"
                    @click.native.prevent="handleDelete(item)"
                  >
                    {{ $t('common.delete') }}
                  </el-button>
                  <el-button
                    size="mini"
                    class="button"
                    id="modifyBtn"
                    @click="showEditDialog(item)"
                  >
                    {{ $t('common.modify') }}
                  </el-button>
                </p>
              </el-form>
            </div>
          </div>
        </div>
        <div class="pageBar">
          <pagination
            :table-data="paginationData"
            :page-sizes="[8,12,16,20]"
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
      <ApplcmDialog
        :rowdata="formdata"
        :type="type"
        @close="closeEditDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import { inventory } from '../../tools/request1.js'
import Search from '../../components/common/Search.vue'
import pagination from '../../components/common/Pagination.vue'
import Breadcrumb from '../../components/common/BreadCrumb.vue'
import ApplcmDialog from './MepmDialog.vue'

export default {
  name: 'CardContent',
  components: {
    pagination,
    Breadcrumb,
    Search,
    ApplcmDialog
  },
  data () {
    return {
      dataLoading: true,
      tableData: [],
      currPageTableData: [],
      paginationData: [],
      dialogVisible: false,
      type: 0,
      formdata: {},
      title: this.$t('system.mepm.mepmReg'),
      rlp: sessionStorage.getItem('rlp')
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
              dataKey = 'mepmIp'
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
    handleDelete (row) {
      this.$confirm(this.$t('tip.beforeDeleteMepm'), this.$t('common.warning'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        inventory.delete(5, row.mepmIp).then(res => {
          this.initList()
        }, error => {
          this.$message.error(error.response.data)
        })
      })
    },
    initList () {
      inventory.getList(5).then(res => {
        this.tableData = this.paginationData = res.data
        this.dataLoading = false
      }, error => {
        this.dataLoading = false
        this.tableData = this.paginationData = []
        console.log(error)
      })
    },
    showEditDialog (data) {
      if (data) {
        this.formdata = data
        this.type = 2
        this.title = this.$t('system.mepm.mepmModify')
      } else {
        this.type = 1
        this.title = this.$t('system.mepm.mepmReg')
      }
      this.dialogVisible = true
    },
    closeEditDialog () {
      this.dialogVisible = false
      this.initList()
    }
  }
}
</script>

<style lang='less'>
.cardContent{
  margin: 0 10%;
  height: 100%;
  padding-top: 50px;
  .btn-group{
    margin: 0px 15px 0px 0px;
    justify-content: center;
    .el-button{
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-sizing: border-box;
      border-radius: 4px;
      font-size: 14px;
      line-height: 16px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .applcmList{
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    .content {
      width: 25%;
      padding: 0 6px;
      box-sizing: border-box;
      margin-bottom: 20px;
      .list {
        padding:15px 0 15px 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        transition: transform 0.3s ease-in;
        .el-form{
          width:100%;
          .el-form-item{
            margin-bottom: 8px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            .el-form-item__label{
              line-height:24px ;
            }
            .el-form-item__content{
              height: 24px;
              line-height: 24px;
            }
          }
        }
      }
      .bgImgone{
        background-image: url('../../assets/images/cardBgone.png');
        background-size:100% 100%;
      }
      .bgImgtwo{
        background-image: url('../../assets/images/cardBgtwo.png');
        background-size:100% 100%;
      }
      .bgImgone:hover{
        transform: translate3d(0,-10px,0);
        border-radius: 10px;
        box-shadow: 0px 4px 14px rgba(255, 255, 255, 0.2);
        background-image: url('../../assets/images/cardBgoneHover.png');
      }
      .bgImgtwo:hover{
        transform: translate3d(0,-10px,0);
        border-radius: 10px;
        box-shadow: 0px 4px 14px rgba(255, 255, 255, 0.2);
        background-image: url('../../assets/images/cardBgtwoHover.png');
      }
    }
  }
}
</style>
