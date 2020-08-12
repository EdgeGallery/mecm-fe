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
  <div class="app-detail">
    <div class="app-info">
      <div class="information">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            :label="$t('app.packageList.name')"
          />
          <el-table-column
            prop="version"
            :label="$t('app.packageList.version')"
          />
          <el-table-column
            prop="size"
            :label="$t('app.packageList.size')"
          />
          <el-table-column
            prop="provider"
            :label="$t('app.packageList.vendor')"
          />
          <el-table-column
            prop="type"
            :label="$t('app.packageList.type')"
          />
          <el-table-column
            prop="createTime"
            :label="$t('app.packageList.createTime')"
          />
          <el-table-column :label="$t('common.operation')">
            <template slot-scope="scope">
              <el-button
                id="downloadBtn"
                @click="download(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('app.packageList.download') }}
              </el-button>
              <el-button
                id="detailBtn"
                @click="getDetail(scope.row)"
                type="text"
                size="small"
              >
                {{ $t('common.detail') }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-row :gutter="24">
      <el-col
        :span="17"
        style="position: relative;margin:15px 0 0 30px;"
      >
        <div id="appDetailMd">
          <mavon-editor
            v-model="source"
            :toolbars-flag="false"
            :editable="false"
            :subfield="false"
            default-open="preview"
          />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right">
          <div
            class="provider"
            style="background: white;"
          >
            <h4>
              <span>{{ $t('app.packageList.vendor') }}</span>
              <span class="name">{{ details.provider }}</span>
            </h4>
            <p>
              <el-button type="text">
                Application Home Page
              </el-button>
            </p>
            <p>
              <el-button type="text">
                Submit Bugs
              </el-button>
            </p>
          </div>
          <div class="box">
            <h4>Try it!</h4>
            <p>
              <el-button type="text">
                Huawei EdgeGallery Platform
              </el-button>
            </p>
          </div>
          <div
            class="box"
            style="background: white;"
          >
            <h4>Dependency</h4>
            <p>
              <el-button type="text">
                MySQl
              </el-button>
            </p>
          </div>
          <div class="box appDetailFileList">
            <el-tree
              :data="appDetailFileList"
              default-expand-all
              node-key="id"
              ref="tree"
              highlight-current
              :props="defaultProps"
              @node-click="handleNodeClick"
              style="overflow-x: auto;"
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { app } from '../tools/request.js'
export default {
  components: {
  },
  data () {
    return {
      userName: '',
      details: '',
      appId: '',
      packageId: '',
      tableData: [],
      appDetailFileList: [],
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      editDetails: '',
      source: '',
      filePath: []
    }
  },
  methods: {
    getTableData () {
      app.getPackageList(this.appId).then(res => {
        let data = res.data
        data.forEach(item => {
          this.tableData.push(item)
        })
        this.editDetails = this.source = data[0].details
        this.appDetailFileList = [JSON.parse(data[0].format)]
        this.packageId = data[0].csarId
      })
    },
    getParent (nodes) {
      let name = nodes.data.name
      if (!Array.isArray(nodes.parent)) {
        if (name) {
          this.filePath.push(name)
          this.getParent(nodes.parent)
        }
      }
    },
    handleNodeClick (nodeObj, node) {
      this.filePath = []
      if (!nodeObj.childs.length) {
        this.getParent(node)
      }
      if (this.filePath.length) {
        this.filePath.reverse().splice(0, 1)
        let truePath = this.filePath.join(':')
        let fd = new FormData()
        fd.append('filepath', truePath)
        app.readFile(this.appId, this.packageId, fd).then(res => {
          let data = res.data
          var TestWin = window.open('')
          TestWin.document.write(data)
        }).catch(() => {
          this.$message({
            type: 'warning',
            message: this.$t('promptMessage.fileNotSupport')
          })
        })
      }
    },
    distribute () {
      this.$router.push('/mecm/apac/list')
    },
    download (row) {
      app.downloadPackage(this.appId, row.csarId)
    },
    getDetail (row) {
      this.editDetails = this.source = row.details
      this.appDetailFileList = [JSON.parse(row.format)]
      this.packageId = row.csarId
    }
  },
  mounted () {
    this.appId = window.location.href.split('=')[1]
    this.getTableData()
  }
}
</script>
<style lang='less' >
.app-detail {
  padding: 0 56px 50px;
  .app-info {
    padding: 32px;
    background: white;
    p {
      font-size: 20px;
      color: #282b33;
      line-height: 24px;
      font-weight: 700;
    }
    .information {
      margin-top: 15px;
      .description {
        .el-textarea__inner {
          color: black !important;
          cursor: auto !important;
          font-family: "Microsoft Yahei", "simsun", "arial", sans-serif;
        }
      }
    }
  }
  .title-margin {
    margin: 15px 0;
  }
  .edit {
    margin-top: -40px;
    margin-right: 55px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
  }

  .editon-icon {
    float: right;
    position: relative;
    top: 20px;
    right: 130px;
    z-index: 10005;
    span{
      padding: 5px 35px;
      border: 1px solid #ddd;
    }
  }
  .right {
    margin-top: 15px;
    // border: 1px solid #ddd;
    // padding: 15px;
    .box {
      margin-top: 15px;
    }
    .provider,
    .box {
      // border: 1px solid #ddd;
      padding: 10px;
      .name {
        margin-left: 10px;
      }
    }
    .comments {
      p {
        margin-top: 10px;
        padding-left: 10px;
      }
      .commnet-list {
        padding-top: 10px;
        padding-left: 10px;
        .commnet-list-content {
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
      }
    }
    .appDetailFileList {
      font-size: 18px;
      line-height: 24px;
      p {
        line-height: 24px;
      }
      .child {
        p {
          font-size: 16px;
          text-indent: 2rem;
        }
      }
      .subChild {
        p {
          font-size: 14px;
          text-indent: 2rem;
        }
      }
    }
  }
}
</style>
