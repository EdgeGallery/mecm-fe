<template>
  <div id="rule">
    <el-form
      label-width="130px"
      class="configForm"
    >
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="DNS Rule Id">
            <el-input
              id=""
              maxlength="30"
              v-model="rule.dnsRule.dnsRuleId"
            />
          </el-form-item>
          <el-form-item label="Domain Name">
            <el-input
              id=""
              maxlength="30"
              v-model="rule.dnsRule.domainName"
            />
          </el-form-item>
          <el-form-item
            label="IP Address Type"
          >
            <el-select
              v-model="rule.dnsRule.ipAddressType"
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
          <el-form-item label="DNS Server IP">
            <el-input
              id=""
              maxlength="30"
              v-model="rule.dnsRule.dnsServerIp"
            />
          </el-form-item>
          <el-form-item label="TTL">
            <el-input
              id=""
              maxlength="30"
              v-model="rule.dnsRule.ttl"
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
