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
  <div>
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.mecm')"
      :second="$t('nav.mepList')"
      :third="$t('common.detail')"
      :path="{ path: '/mecm/node/list' }"
    />
    <div class="mep">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="">
            <el-collapse accordion>
              <el-form label-width="80px">
                <el-form-item label="service1">
                  <el-button
                    id="regBtn"
                    type="primary"
                    size="small"
                    @click="register(1)"
                  >
                    Register
                  </el-button>
                </el-form-item>
                <el-form-item label="service2">
                  <el-button
                    id="unregBtn"
                    type="primary"
                    size="small"
                    @click="register(2)"
                  >
                    Unregister
                  </el-button>
                </el-form-item>
                <el-form-item label="service3">
                  <el-button
                    id="registerBtn"
                    type="primary"
                    size="small"
                    @click="register(1)"
                  >
                    Register
                  </el-button>
                </el-form-item>
              </el-form>
            </el-collapse>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          prop="id"
          width="100"
        />
        <el-table-column
          :label="$t('app.packageList.name')"
          prop="name"
          width="150"
        />
        <el-table-column
          label="Area"
          prop="area"
          width="180"
        />
        <el-table-column
          label="App Number"
          prop="appNum"
          width="150"
        />
        <el-table-column
          label="App Description"
          prop="desc"
        />
      </el-table>
      <div class="pageBar">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/BreadCrumb'
export default {
  name: 'Mep',
  components: {
    Breadcrumb
  },
  data () {
    return {
      tableData: [{
        id: '12987122',
        name: 'App1',
        area: 'Guang Zhou,China',
        appNum: '3',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '1'
      }, {
        id: '12987123',
        name: 'App2',
        area: 'Gemerny,Europe',
        appNum: '6',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '2'
      }, {
        id: '12987125',
        name: 'App3',
        area: 'ShenZhen,China',
        appNum: '5',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '3'
      }, {
        id: '12987126',
        name: 'App4',
        area: 'Italy,Europe',
        appNum: '3',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '1'
      }, {
        id: '12987126',
        name: 'App4',
        area: 'Italy,Europe',
        appNum: '3',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '1'
      }, {
        id: '12987126',
        name: 'App4',
        area: 'Italy,Europe',
        appNum: '3',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '1'
      }, {
        id: '12987126',
        name: 'App4',
        area: 'Italy,Europe',
        appNum: '3',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '1'
      }, {
        id: '12987126',
        name: 'App4',
        area: 'Italy,Europe',
        appNum: '3',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '1'
      }, {
        id: '12987126',
        name: 'App4',
        area: 'Italy,Europe',
        appNum: '3',
        desc: 'Mobile Edge management platform in GuangZhou China',
        status: '1'
      }],
      currentPage: 1
    }
  },
  mounted () {

  },
  methods: {
    jumpTo (path) {
      this.$router.push(path)
    },
    handleSizeChange () {

    },
    handleCurrentChange () {

    },
    register (type) {
      if (type === 1) {
        this.$message.success(this.$t('tip.registerServSuc'))
      } else {
        this.$message.success(this.$t('tip.unregisterServSuc'))
      }
    }
  }
}
</script>
