<template>
  <div id="rule">
    <el-form label-width="120px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="Traffic Rule Id">
            <span class="blue">TRA20201108</span>
          </el-form-item>
          <el-form-item label="Priority">
            <el-input-number
              v-model="rule.priority"
              :min="1"
              :max="255"
              label="描述文字"
            />
          </el-form-item>
          <el-form-item
            label="Action"
          >
            <el-select
              v-model="rule.action"
              placeholder="请选择"
            >
              <el-option
                v-for="item in action"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="Filter Type"
            v-model="rule.filterType"
          >
            <el-select
              v-model="rule.filterType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in filterType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item><el-form-item
            label="IP Address Type"
          >
            <el-select
              v-model="rule.trafficFilter.ipAddressType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in ipAddressType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Src Address">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.srcAddress"
              placeholder="多个IP请用','分割"
            />
          </el-form-item>
          <el-form-item label="Src Port">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.srcPort"
              placeholder="多个端口请用','分割"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="DST Address">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.dtsAddress"
              placeholder="多个IP请用','分割"
            />
          </el-form-item>
          <el-form-item label="DST Port">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.dtsAddress"
              placeholder="多个端口请用','分割"
            />
          </el-form-item>
          <el-form-item label="Protocol">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.protocol"
            />
          </el-form-item>
          <el-form-item label="QCI">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.qci"
            />
          </el-form-item>
          <el-form-item label="DSCP">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.dscp"
            />
          </el-form-item>
          <el-form-item label="TC">
            <el-input
              id="podkind"
              maxlength="30"
              v-model="rule.trafficFilter.tc"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Rule',
  components: {

  },
  data () {
    return {
      dialog: false,
      activeName: 'dns',
      ipAddressType: [
        {
          value: 'IP_V4',
          label: 'IP_V4'
        },
        {
          value: 'IP_V6',
          label: 'IP_V6'
        }
      ],
      filterType: [
        {
          value: 'FLOW',
          label: 'FLOW'
        }
      ],
      action: [
        {
          value: 'DROP',
          label: 'DROP'
        },
        {
          value: 'ALLOW',
          label: 'ALLOW'
        }

      ],
      rule: {
        action: '',
        filterType: '',
        priority: 125,
        trafficFilter: {
          ipAddressType: '',
          srcAddress: '',
          srcPort: '',
          dstAddress: '',
          dstPort: '',
          protocol: 'ANY',
          qci: '1',
          dscp: '0',
          tc: '1'
        },
        dnsRule: {
          dnsRuleRedirectRuleId: '',
          domainName: '24',
          ipAddressType: '',
          dnsServerIp: ''
        }
      }
    }
  },
  methods: {},
  mounted () {
    this.dialog = true
  }
}
</script>
<style lang='less' scoped>

</style>
