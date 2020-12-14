<template>
  <div class="ruleconfig">
    <Breadcrumb
      class="breadcrumb"
      :first="$t('nav.mecm')"
      :second="$t('nav.appMana')"
      :third="$t('nav.ruleConfiguration')"
      :path="{ path: '/mecm/ains/list' }"
    />
    <div class="ruleconfigcontent">
      <el-tabs
        v-model="activeName"
      >
        <el-tab-pane
          :label="$t('app.ruleConfig.dnsRule')"
          name="dns"
        >
          <Dnspannel />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('app.ruleConfig.trafficRule')"
          name="traffic"
        >
          <trafficpannel />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../components/BreadCrumb'
import Dnspannel from './Dns.vue'
import Trafficpannel from './Traffic.vue'
export default {
  components: {
    Breadcrumb,
    Dnspannel,
    Trafficpannel
  },
  data () {
    return {
      activeName: 'dns'
    }
  },
  methods: {},
  mounted () {}
}

</script>
<style lang='less' scoped>
.ruleconfigcontent {
    margin: 0 5%;
    height: 100%;
    background: #fff;
    padding: 30px 60px;
}
</style>
