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
  <div class="manage-dialog">
    <el-dialog
      :title="$t('overview.manage')"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <label class="dialogLabel">{{ $t('overview.services') }}</label>
        <el-table
          :data="searvicesData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            :label="$t('overview.serviceName')"
          />
          <el-table-column
            prop="version"
            :label="$t('app.packageList.version')"
          />
          <el-table-column
            prop="status"
            :label="$t('app.distriList.status')"
          />
        </el-table>
      </div>
      <el-row
        :gutter="40"
        class="mt20"
      >
        <el-col :span="24">
          <label class="dialogLabel">{{ $t('overview.containers') }}</label>
          <el-radio-group
            v-model="radio"
            @change="containerChange"
          >
            <el-radio
              v-for="(item,index) in containerData"
              :key="index"
              :label="index"
            >
              {{ item.name }}
            </el-radio>
          </el-radio-group>
        </el-col>
        <el-col
          :span="24"
          class="mt20"
        >
          <label class="dialogLabel">{{ $t('overview.containerUsage') }}</label>
          <el-row
            :gutter="40"
            class="mt20 containers-usage"
          >
            <el-col :span="8">
              <el-progress
                type="dashboard"
                :percentage="cpuUsage"
                :width="100"
              />
              <p>CPU</p>
            </el-col>
            <el-col :span="8">
              <el-progress
                type="dashboard"
                :percentage="memUsage"
                :width="100"
              />
              <p>MEM</p>
            </el-col>
            <el-col :span="8">
              <el-progress
                type="dashboard"
                :percentage="diskUsage"
                :width="100"
              />
              <p>DISK</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: function () {
        return []
      }
    },
    serviceInfo: {
      type: Object,
      default: function () {
        return []
      }
    }
  },
  components: {
  },
  data () {
    return {
      dialogVisible: this.value,
      searvicesData: [],
      containerData: [],
      radio: 0,
      cpuUsage: 0,
      memUsage: 0,
      diskUsage: 0
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
    },
    handleCurrentChange (row) {
    },
    containerChange (val) {
      let cpu = this.serviceInfo.services[0].containers[val].cpuUsage
      let mem = this.serviceInfo.services[0].containers[val].memUsage
      let disk = this.serviceInfo.services[0].containers[val].diskUsage
      this.cpuUsage = parseFloat((cpu.split('/')[0] / cpu.split('/')[1] * 100).toFixed(2))
      this.memUsage = parseFloat((mem.split('/')[0] / mem.split('/')[1] * 100).toFixed(2))
      this.diskUsage = parseFloat((disk.split('/')[0] / disk.split('/')[1] * 100).toFixed(2))
    }
  },
  mounted () {
    if (this.serviceInfo) {
      this.serviceInfo.services.forEach(item => {
        let serviceobj = {}
        if (item.mepService) {
          serviceobj.name = item.mepService.serName
          serviceobj.status = item.mepService.state
          serviceobj.version = item.mepService.version
          this.searvicesData.push(serviceobj)
        }
        if (item.containers) {
          item.containers.forEach(val => {
            let containerobj = {}
            containerobj.name = val.name.split(':')[1]
            this.containerData.push(containerobj)
          })
          let cpu = this.serviceInfo.services[0].containers[0].cpuUsage
          let mem = this.serviceInfo.services[0].containers[0].memUsage
          let disk = this.serviceInfo.services[0].containers[0].diskUsage
          this.cpuUsage = parseFloat((cpu.split('/')[0] / cpu.split('/')[1] * 100).toFixed(2))
          this.memUsage = parseFloat((mem.split('/')[0] / mem.split('/')[1] * 100).toFixed(2))
          this.diskUsage = parseFloat((disk.split('/')[0] / disk.split('/')[1] * 100).toFixed(2))
        }
      })
    }
  }
}
</script>
<style lang='less'>
.manage-dialog {
  .headerClassName {
    th {
      background: white !important;
      color: black !important;
    }
  }
  .el-radio{
    font-family: Roboto-Regular,sans-serif;
    font-size: 18px;
    color: #212121;
    line-height: 16px;
  }
  .containers-usage{
    text-align: center;
  }
  .nameLable{
      font-family: HelveticaNeue;
      font-size: 18px;
      color: #999999;
      letter-spacing: 0;
      text-align: left;
      margin-right:5px;
  }
  label.dialogLabel{
    font-family: Roboto-Regular,sans-serif;
    font-size: 15px;
    color: #212121;
    letter-spacing: 0;
    text-align: left;
    display: block;
    margin-bottom: 15px;
  }
}
</style>
