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
      {{ $t('nav.mepm') }}
    </div>
    <p
      class="btnMain"
      v-if="rlp=='418'"
    >
      <el-button
        id="newregBtn"
        type="primary"
        @click="showEditDialog('')"
        class="rt"
      >
        <span>{{ $t('system.mepm.newReg') }}</span>
      </el-button>
    </p>
    <div class="contentList">
      <div class="applcmContainer">
        <Search
          :placeholder="$t('tip.fuzzyQuery')"
          @getSearchData="getSearchData"
        />
        <div class="mepmList">
          <div
            v-for="(item,index) in currPageTableData"
            :key="index"
            class="content"
          >
            <div
              class="list"
              :class="rlp==='418'?'bgImgone':'bgImgtwo'"
            >
              <el-form
                label-width="auto"
              >
                <el-form-item :label="$t('system.mepm.name')">
                  {{ item.mepmName }}
                </el-form-item>
                <el-form-item :label="$t('system.mepm.ip')">
                  {{ item.mepmIp }}
                </el-form-item>
                <el-form-item :label="$t('system.mepm.port')">
                  {{ item.mepmPort }}
                </el-form-item>
                <p
                  class="btn-group flex"
                  v-if="rlp==='418'"
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
      :show-close="false"
      :visible.sync="dialogVisible"
      top="15%"
      width="40%"
    >
      <div class="secondLabel">
        {{ title }}
      </div>
      <ApplcmDialog
        :rowdata="formdata"
        :type="type"
        @close="closeEditDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import { inventory } from '../../tools/request.js'
import Search from '../../components/common/Search.vue'
import pagination from '../../components/common/Pagination.vue'
import ApplcmDialog from './MepmDialog.vue'

export default {
  name: 'ContentList',
  components: {
    pagination,
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
    filterTableData (val) {
      this.paginationData = this.paginationData.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key]).toLowerCase().indexOf(val) > -1
        })
      })
    },
    getSearchData (data) {
      this.paginationData = this.tableData
      if (data) {
        this.filterTableData(data.toLowerCase())
      } else {
        this.initList()
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
.btn-group{
  margin: 0px 10% 0px 0px;
  justify-content: flex-end;
  position: relative;
  top: 3px;
  .el-button{
    height: 30px;
    background: #5844be;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 15px;
  }
}
.mepmList{
  width: 100%;
  display:flex;
  flex-wrap: wrap;
  margin-top: 10px;
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
      padding-left: 15%;
      .el-form{
        width:100%;
        .el-form-item{
          margin-bottom: 8px;
          font-size: 14px;
          color: #ffffff;
          .el-form-item__label{
            line-height:24px ;
            color: #ffffff;
          }
          .el-form-item__content{
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
    .bgImgone{
      background-image: url('../../assets/images/mepm_bg.png');
      background-size:100% 105%;
    }
    .bgImgtwo{
      background-image: url('../../assets/images/mepm_bg1.png');
      background-size:100% 100%;
    }
    .bgImgone:hover,.bgImgtwo:hover{
      transform: translate3d(0,-10px,0);
      border-radius: 10px;
      box-shadow: 0px 4px 14px rgba(255, 255, 255, 0.2);
      background-image: url('../../assets/images/cardBgoneHover.png');
    }
  }
}
</style>
