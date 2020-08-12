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
  <div class="sysMepm">
    <div class="tableDiv">
      <p>
        <!-- <span class="title">MEPM List</span> -->
        <span class="rt">
          <el-button
            type="primary"
            @click="register()"
          >{{ $t('system.appLcm.newReg') }}</el-button>
        </span>
      </p>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
      >
        <el-table-column
          prop="systemsName"
          label="systems Name"
          width="180"
        />
        <el-table-column
          prop="systemsType"
          label="systems Type"
          width="160"
        />
        <el-table-column
          prop="vendor"
          label="Vendor"
          width="180"
        />
        <el-table-column
          prop="type"
          :label="$t('app.packageList.type')"
          width="120"
        />
        <el-table-column
          prop="version"
          :label="$t('app.packageList.version')"
          width="100"
        />
        <el-table-column
          prop="url"
          label="Service url"
        />
        <el-table-column
          prop="username"
          :label="$t('system.appLcm.userNmae')"
          width="120"
        />
        <el-table-column
          prop="password"
          :label="$t('system.appLcm.password')"
          width="120"
        />
        <el-table-column
          prop="host"
          label="Host"
        />
        <el-table-column
          :label="$t('common.operation')"
          width="140"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
            >
              {{ $t('common.modify') }}
            </el-button>
            <el-button
              @click.native.prevent="handleDelete(scope.$index, tableData)"
              type="text"
              size="small"
            >
              {{ $t('common.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageBar"
        background
        layout="prev, pager, next"
        :total="10"
      />
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <mepmReg />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mepmReg from '../register/mepm.vue'
export default {
  name: 'SysMepm',
  components: {
    mepmReg
  },
  data () {
    return {
      tableData: [
        {
          id: '1e915311-1474-4ffb-8408-1183ddfcd1a8',
          systemsName: 'OCOMP hwvnfmdriver',
          type: 'hwvnfmdriver',
          vendor: 'ocompvtpvendor',
          version: 'v1.0',
          url: 'http://159.138.8.8:30280',
          username: 'admin',
          password: '******',
          systemsType: 'vnfm',
          host: 'mec1,mec2,mec3'
        },
        {
          id: '1e915311-1474-4ffb-8408-1183ddfcd1a8',
          systemsName: 'OCOMP hwvnfmdriver',
          type: 'hwvnfmdriver',
          vendor: 'ocompvtpvendor',
          version: 'v1.0',
          url: 'http://159.138.8.8:30280',
          username: 'admin',
          password: '******',
          systemsType: 'vnfm',
          host: 'mec1,mec2,mec3'
        },
        {
          id: '1e915311-1474-4ffb-8408-1183ddfcd1a8',
          systemsName: 'OCOMP hwvnfmdriver',
          type: 'hwvnfmdriver',
          vendor: 'ocompvtpvendor',
          version: 'v1.0',
          url: 'http://159.138.8.8:30280',
          username: 'admin',
          password: '******',
          systemsType: 'vnfm',
          host: 'mec1,mec2,mec3'
        },
        {
          id: '1e915311-1474-4ffb-8408-1183ddfcd1a8',
          systemsName: 'OCOMP hwvnfmdriver',
          type: 'hwvnfmdriver',
          vendor: 'ocompvtpvendor',
          version: 'v1.0',
          url: 'http://159.138.8.8:30280',
          username: 'admin',
          password: '******',
          systemsType: 'vnfm',
          host: 'mec1,mec2,mec3'
        },
        {
          id: '1e915311-1474-4ffb-8408-1183ddfcd1a8',
          systemsName: 'OCOMP hwvnfmdriver',
          type: 'hwvnfmdriver',
          vendor: 'ocompvtpvendor',
          version: 'v1.0',
          url: 'http://159.138.8.8:30280',
          username: 'admin',
          password: '******',
          systemsType: 'vnfm',
          host: 'mec1,mec2,mec3'
        },
        {
          id: '1e915311-1474-4ffb-8408-1183ddfcd1a8',
          systemsName: 'OCOMP hwvnfmdriver',
          type: 'hwvnfmdriver',
          vendor: 'ocompvtpvendor',
          version: 'v1.0',
          url: 'http://159.138.8.8:30280',
          username: 'admin',
          password: '******',
          systemsType: 'vnfm',
          host: 'mec1,mec2,mec3'
        },
        {
          id: '1e915311-1474-4ffb-8408-1183ddfcd1a8',
          systemsName: 'OCOMP hwvnfmdriver',
          type: 'hwvnfmdriver',
          vendor: 'ocompvtpvendor',
          version: 'v1.0',
          url: 'http://159.138.8.8:30280',
          username: 'admin',
          password: '******',
          systemsType: 'vnfm',
          host: 'mec1,mec2,mec3'
        }
      ],
      dialogVisible: false,
      title: 'MEPM Registration'
    }
  },
  mounted () {},
  methods: {
    handleEdit () {
      this.title = 'MEPM Edit'
      this.dialogVisible = true
    },
    handleDelete (index, rows) {
      rows.splice(index, 1)
    },
    register () {
      this.title = 'MEPM Registration'
      this.dialogVisible = true
    }
  }
}
</script>

<style lang='less' scoped>
.sysMepm{
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
}
</style>
