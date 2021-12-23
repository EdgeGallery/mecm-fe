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
  <div class="flavor-config">
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      class="other_setting default_dialog"
    >
      <div
        slot="title"
        class="el-dialog__title"
      >
        <em class="title_icon" />{{ $t('resourceMgr.flavorConfig') }}
        <em
          class="el-icon-circle-plus-outline rt editBtn"
          @click="addListData"
        />
      </div>
      <div class="innerVisible_div">
        <p
          v-for="(item,index) in keyValueDatas"
          :key="index"
          class="container clear"
        >
          <el-input
            type="text"
            size="small"
            v-model="item.name"
          />
          <span class="equal">=</span>
          <el-input
            type="text"
            size="small"
            v-model="item.value"
          />
          <em
            class="el-icon-delete editBtn"
            @click="deleteListData(index)"
          />
        </p>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="confirmAction"
          size="small"
        >{{ $t('resourceMgr.confirm') }}</el-button>
        <el-button
          @click="cancelAction"
          size="small"
        >{{ $t('resourceMgr.cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    keyValueDatas: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('input', false)
      this.dialogVisible = false
    },
    confirmAction () {
      this.confirmData()
      this.handleClose()
    },
    cancelAction () {
      this.handleClose()
    },
    addListData () {
      let _obj = {
        name: '',
        value: ''
      }
      this.keyValueDatas.unshift(_obj)
    },
    deleteListData (index) {
      this.keyValueDatas.splice(index, 1)
    },
    confirmData () {
      let _nullMum = 0
      this.keyValueDatas.forEach(item => {
        if (item.name === '' || item.value === '') {
          _nullMum++
        }
      })
      if (_nullMum === 0) {
        let _str = ''
        this.keyValueDatas.forEach(item => {
          _str += item.name + '=' + item.value + ';'
        })
        this.$emit('configData', _str.substr(0, _str.length - 1))
        this.dialogVisible = false
      } else {
        this.$message.warning(this.$t('resourceMgr.canonicalInfo'))
      }
    }
  }
}
</script>
<style lang="less" scoped>
.flavor-config{
  .other_setting{
    .el-dialog{
      width: 600px;
      .editBtn:before{
        font-size: 20px;
        color: #a9a2c3;
        cursor: pointer;
      }
    }
    .el-dialog__body{
      max-height: 525px;
      overflow: auto;
      padding-right: 40px !important;
    }
    .dialog-footer{
      padding-right: 50px !important;
    }
  }
}
.innerVisible_div{
  margin-bottom: 20px;
  .container{
    padding-top: 10px;
    .el-input{
      float: left;
      width: calc((100% - 65px)/2) !important;
    }
    .equal{
      float: left;
      width: 15px;
      height: 32px;
      line-height: 32px;
      margin: 0 10px;
    }
    .el-icon-delete{
      color: #ccc;
      width: 30px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      text-align: right;
    }
    .el-icon-delete:hover{
      cursor: pointer;
      color: #5b7ede;
    }
  }
}
</style>
