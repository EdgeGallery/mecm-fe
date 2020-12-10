<template>
  <div id="rule">
    <el-form
      label-width="130px"
      class="configForm"
    >
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item :label="$t('app.ruleConfig.dnsRuleId')">
            <el-input
              id=""
              maxlength="30"
              v-model="dnsrule.dnsRuleId"
            />
          </el-form-item>
          <el-form-item :label="$t('app.ruleConfig.domainName')">
            <el-input
              id=""
              maxlength="30"
              v-model="dnsrule.domainName"
            />
          </el-form-item>
          <el-form-item
            :label="$t('app.ruleConfig.ipAddressType')"
          >
            <el-select
              v-model="dnsrule.ipAddressType"
              :placeholder="$t('tip.pleaseSelect')"
            >
              <el-option
                v-for="item in ipAddressType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('app.ruleConfig.ipAddress')">
            <el-input
              id=""
              maxlength="30"
              v-model="dnsrule.dnsServerIp"
            />
          </el-form-item>
          <el-form-item :label="$t('app.ruleConfig.priority')">
            <el-input
              id=""
              maxlength="30"
              v-model="dnsrule.ttl"
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
  components: {},
  props: {
    dnsrule: {
      required: true,
      type: Object
    }
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
        appSupportMp1: false,
        appName: 'abc',
        appTrafficRule: [
          {
            action: '',
            filterType: '',
            priority: 125,
            trafficRuleId: '',
            trafficFilter: [
              {
                srcAddress: [],
                srcPort: [],
                dstAddress: [],
                dstPort: [],
                protocol: [],
                qci: '1',
                dscp: '0',
                tc: '1',
                srcTunnelAddress: '',
                srcTunnelPort: '',
                dstTunnelAddress: '',
                dstTunnelPort: ''
              }
            ],
            dstInterface: [{
              interfaceType: '',
              tunnelInfo: {
                tunnelType: '',
                tunnelDstAddress: '',
                tunnelsrcAddress: '',
                tunnelSpecificData: ''
              },
              srcMACAddress: '',
              dstMACAddress: '',
              dstIPAddress: ''
            }],
            appDNSRule: [
            ]
          }
        ]
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
