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
      :second="$t('nav.appMana')"
      :third="$t('nav.appDetail')"
    />
    <div class="app-detail">
      <div>
        <Edge :appid="appId" />
      </div>
    </div>
  </div>
</template>
<script>
import { app } from '../tools/request.js'
import Breadcrumb from '../components/BreadCrumb'
import Edge from './EdgeList'
export default {
  components: {
    Edge,
    Breadcrumb
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
    this.appId = sessionStorage.getItem('appId')
    this.getTableData()
  }
}
</script>
<style lang='less' >
.app-detail {
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
}
</style>
