/*
 *  Copyright 2020-2021 Huawei Technologies Co., Ltd.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const cn = {
  nav: {
    login: '登录',
    logout: '注销',
    userAccountCenter: '我的帐号',
    hsInvalidHintForTimeout: '您长时间未操作，',
    hsInvalidHintForLogout: '您通过其它页面执行了登录或注销操作，',
    hsInvalidHintForServerStopped: '后台服务升级，',
    hsInvalidHint: '当前会话已失效。请选择刷新页面或重新登录。',
    refresh: '刷新',
    reLogin: '重新登录',
    mecm: '管理平台',
    overview: '概览',
    appMana: '应用管理',
    packageMana: '应用包管理',
    packageDist: '应用包分发',
    appInstance: '应用实例管理',
    edgeNodes: '边缘节点',
    nodeList: '边缘节点列表',
    mepList: 'MEP列表',
    system: '系统',
    externalSysMan: '外部系统管理',
    mepm: 'MEPM 注册系统',
    edgeNode: '边缘节点注册系统',
    appstore: '应用市场注册系统',
    appRule: 'App Rule MGR 注册系统',
    appDetail: '应用详情',
    logoutTip: '确认要离开吗？',
    ruleConfiguration: '规则配置'
  },
  overview: {
    regionEdge: '边缘节点',
    distributionDisplay: '节点分布展示',
    k8sResc: '资源详情',
    cpu: 'CPU',
    mem: 'MEM', // memory
    disk: 'DISK',
    mepCapa: '硬件能力',
    mepInfo: '能力信息',
    capaInfo: '能力信息',
    softwareCapa: '软件能力',
    capa: '能力',
    vendor: '提供商',
    model: '品牌',
    desc: '描述',
    app: '应用',
    manage: '管理',
    maintenance: '运维',
    serviceName: '服务名称',
    services: '服务',
    containers: '容器',
    containerUsage: '容器占用率',
    name: '名称：',
    register: '注册',
    statistics: '统计表',
    nodeIp: '节点IP：',
    nodeName: '节点名称：',
    nodeAddress: '节点地址：',
    nodeInfo: '节点信息',
    overview: '节点统计信息',
    edgeNodes: '节点总数',
    onlineNodes: '在线节点数',
    offlineNodes: '离线节点数',
    returnOverview: '返回主视图',
    nodeKPI: '节点KPI',
    monitor: '运行状态监控'
  },
  app: {
    packageList: {
      name: '名称',
      size: '大小',
      version: '版本',
      vendor: '厂商',
      type: '类型',
      affinity: '架构',
      modifyTime: '修改时间',
      desc: '描述',
      distribute: '分发',
      synchronize: '从应用市场同步',
      slectEdgeNodes: '选择边缘节点',
      selected: '已选择',
      ip: 'IP地址',
      city: '城市',
      address: '地址',
      createTime: '创建时间',
      download: '下载',
      fileNotSupport: '不支持的文件格式',
      auth: '作者',
      pacVersion: '应用版本',
      status: '状态',
      sync: '同步',
      syncTip: '请至少选择一个应用进行同步！',
      syncSuccess: '同步成功！',
      industry: '行业',
      syncTime: '同步时间',
      distriAndDeploy: '分发&部署'
    },
    distriList: {
      mecHost: 'MEC 主机',
      hostIp: '主机IP地址',
      status: '状态',
      deploy: '部署',
      appName: '应用名称',
      appDesc: '应用描述',
      podName: 'Pod名称',
      podKind: 'Pod类型',
      podNameEspace: 'Pod命名空间',
      podSel: 'Pod选择器',
      deploymentConf: '部署配置',
      multipleDeploy: '批量部署',
      deleteError: '请先删除分发状态为“Error”的应用'
    },
    instanceList: {
      operationStatus: '运行状态',
      terminate: '中断',
      instanceDetail: '应用实例详情',
      beforeDelete: '确定从节点删除此应用吗？',
      addRule: '添加规则',
      batchDeleteDnsRules: '批量删除DNS规则',
      batchDeleteTrafficRules: '批量删除分流规则',
      addDnsRules: '增加DNS规则',
      addTrafficRules: '增加分流规则',
      addFilter: '新增流过滤规则',
      batchDelete: '批量删除应用',
      appKPI: '应用KPI',
      newRules: '新增规则'
    },
    ruleConfig: {
      srcAddress: '源IP地址',
      srcPort: '源端口号',
      dstAddress: '目的IP地址',
      dstPort: '目的端口号',
      trafficRuleId: '流规则标识',
      filterType: '过滤类型',
      priority: '优先级',
      protocol: '协议类型',
      action: '规则动作',
      dnsRuleId: 'DNS规则标识',
      ipAddress: 'IP地址',
      ipAddressType: 'IP地址类型',
      domainName: 'FQDN域名',
      ttl: '有效时长',
      checkRules: '查看详情',
      dnsRule: 'DNS规则',
      trafficRule: '分流规则',
      trafficFilter: '流过滤规则',
      appRuleManReg: 'App Rule MGR 注册',
      appRuleManEdit: 'App Rule MGR 编辑',
      appRuleMgrMust: 'App Rule MGR 为必填项',
      srcTunnelPort: '隧道源端口',
      srcTunnelAddress: '隧道源地址',
      dstTunnelPort: '隧道目的端口',
      dstTunnelAddress: '隧道目的地址',
      tag: '标签',
      mutiplePort: '多个端口请用","分割',
      mutipleIp: '多个IP请用","分割',
      srcMacAddress: '源MAC地址',
      dstMacAddress: '目的MAC地址',
      tunnelSpecificData: '隧道指定参数',
      tunnelType: '隧道类型',
      interfaceType: '接口类型',
      addNewInterfaceInfo: '新增接口信息',
      interfaceDescriptor: '转发接口信息',
      ipInfo: 'IP信息',
      macInfo: 'MAC信息',
      tunnelInfo: '隧道信息',
      interfaceInfo: '接口信息',
      mutipleProtocol: '多个协议请用","分割',
      mutipleTag: '多个标签请用","分割',
      mepError: '调用MEP接口错误，请检查后重试。',
      addRuleSuc: '添加规则成功',
      editRuleSuc: '编辑规则成功',
      delRuleSuc: '删除规则成功'
    }
  },
  edgeNode: {
    ip: 'IP地址',
    city: '城市',
    address: '详细地址',
    affinity: '架构',
    edgeNexusIp: '边缘仓库地址地址',
    edgeNexusPort: '边缘仓库端口',
    k8sUrl: 'K8S URL',
    monitor: '监控'
  },
  system: {
    mepm: {
      ip: 'IP地址：',
      port: '端 口：',
      manageMecHost: 'MEC主机管理',
      userNmae: '用户名',
      password: '密码',
      newReg: '新增注册',
      mepmReg: 'MEPM 注册',
      mepmModify: 'MEPM 编辑',
      name: '名 称：'
    },
    edgeNodes: {
      systemPlatform: 'systemPlatform',
      ip: 'IP地址',
      city: '城市',
      affinity: '架构',
      address: '详细地址',
      edgeNexusIp: '边缘仓库地址',
      edgeNexusPort: '边缘仓库端口',
      mepmIp: 'MEPM地址',
      k8sUrl: 'K8S URL',
      newReg: '新增注册',
      hostName: '主机名称',
      ipAddress: 'IP地址',
      location: '部署位置',
      zipcode: '邮政编码',
      username: '用户名',
      repoUsername: '边缘仓库用户名',
      password: '密码',
      kubernetesUrl: 'K8S Url',
      edgeNexusName: '边缘仓库名称',
      edgeNexusPass: '边缘仓库密码',
      upload: '* 上传',
      uploadTip: '仅支持不超过500KB的配置文件。',
      nodeReg: '边缘节点注册',
      nodeModify: '边缘节点编辑',
      uploadFile: '上传配置文件',
      howToUpload: '拖拽文件到上传区域内，或者点击上传',
      hwCapability: '硬件能力',
      coordinates: '坐标',
      chooseLocation: '选择部署位置',
      vim: '虚拟机',
      ifUploaded: '上传状态',
      coordPlaceholder: '经,纬度，例如：116,39',
      referCoord: '坐标获取请参考：',
      getCoord: '点击获取坐标',
      long: '经度：',
      lat: '纬度：'
    },
    appstore: {
      appstoreName: '应用市场',
      vendor: '厂商',
      username: '用户名',
      ipAddress: 'IP地址',
      createTime: '创建时间',
      url: 'URL',
      appStoreReg: '应用市场注册',
      appStoreModify: '应用市场编辑',
      appstoreRepo: '应用仓库',
      appstoreRepoName: '仓库名称',
      appstoreRepoUserName: '仓库用户名',
      appstoreRepoPassword: '仓库密码',
      port: '端口'
    }
  },
  common: {
    reset: '重置',
    search: '搜索',
    operation: '操作',
    cancel: '取消',
    submit: '提交',
    confirm: '确认',
    delete: '删除',
    detail: '详情',
    modify: '编辑',
    warning: '提示',
    copy: '复制'
  },
  verify: {
    ipTip: 'IP地址不能为空。',
    hostnameTip: '主机名称不能为空。',
    zipcodeTip: '邮政编码不能为空。',
    cityTip: '城市名称不能为空。',
    addressTip: '地址不能为空。',
    usernameTip: '用户名不能为空。',
    passwordTip: '密码不能为空。',
    edgeNexusIpTip: '边缘仓库地址不能为空。',
    edgeNexusPortTip: '边缘仓库端口不能为空。',
    edgeNexusUsernameTip: '边缘仓库 user name不能为空。',
    edgeNexusPasswordTip: '边缘仓库 password不能为空。',
    mepmIpTip: 'MEPM IP不能为空。',
    k8sURLTip: 'K8S URL不能为空。',
    portTip: '端口不能为空。',
    managedMecHostTip: '管理的边缘节点不能为空。',
    appstorenameTip: '应用市场名称不能为空。',
    vendorTip: '生产商不能为空。',
    uriTip: 'URI不能为空。',
    affinityTip: '架构不能为空。',
    areaTip: '请选择地域',
    mepmNameTip: 'MEPM名称不能为空',
    normalVerify: '输入的内容格式不正确',
    hostNameVerify: '4到16位（字母，数字）',
    noSymbol: '长度为1-16位且不能包含特殊符号',
    coordinates: '请获取节点坐标',
    uriVerify: '请填写正确的Uri',
    descVerify: '描述信息不能为空',
    appNameVerify: '应用名称不能为空',
    mustOptions: '必填项',
    appRuleManaVerify: '应用规则管理IP为必选项',
    passVerify: '密码应该为6-18位的字母数字加特殊符号组合'
  },
  tip: {
    getCommonListFailed: '获取列表失败',
    deletePacFrmoHost: '你已经成功从节点删除应用！',
    networkError: '错误，请检查你的网络！',
    failedReg: '注册用户失败, ',
    wrongCaptcha: '不正确的验证码，请重新输入！',
    failedAuth: '认证失败，请检查你用户名和密码！',
    deploySuc: '部署成功！',
    deleteSuc: '删除成功！',
    sucToDownload: '成功从应用市场下载应用！',
    registerServSuc: '你已经成功注册该服务！',
    unregisterServSuc: '你已经取消该服务注册！',
    regMepmSuc: '你已成功注册MEPM！',
    modMepmSuc: '你已成功编辑MEPM！',
    regAppStoreSuc: '你已成功注册应用市场！',
    modAppStoreSuc: '你已成功编辑应用市场',
    deleteAppStoreSuc: '你已经成功删除应用市场！',
    sucToDeleteNodes: '你已成功删除节点！',
    uploadSuc: '你已成功上传配置文件！',
    sucToRegNode: '你已成功注册节点！',
    sucToModNode: '你已成功编辑节点！',
    regUserSuc: '你已成功注册该用户！',
    fileFormatError: '文件格式不支持或者内容为空！',
    sessionOut: '你的登录信息过期，请重新登录！',
    sessionExp: 'Session过期',
    version: '请选择要下发的应用包版本！',
    noPackage: '没有可以管理的应用！',
    warning: '警告',
    browserAdvise: '为了部分功能正常使用，我们建议使用Chrome浏览器！',
    confirm: '确认',
    mecHost: '请选择要下发的host节点！',
    failedToDownload: '从应用商店下载应用失败！',
    failedToGetList: '获取节点列表失败！',
    failedToGetAppList: '获取应用列表失败！',
    deployFailed: '部署失败，请检查！',
    getListFailed: '获取分发列表失败！',
    getNodeListFailed: '获取节点列表失败！',
    getPackageInfoFailed: '获取应用应用包信息失败！',
    getAppInfoFailed: '获取应用信息失败！',
    getCapaFailed: '获取能力列表失败！',
    getKpiFailed: '获取KPI信息失败！',
    getServiceFailed: '获取应用服务信息失败！',
    failedToGetCaptcha: '获取手机验证码失败',
    nameAlSinged: '用户名已被注册，请重新输入或前往登录',
    telAlSigned: '电话号码已被注册，请重新输入或前往登录',
    modifyPwd: '重置密码成功，请登录',
    failedModifyPwd: '重置密码失败',
    failedToGetAppStoreList: '获取应用商店列表失败',
    faileToGetInstanceList: '获取应用实例列表失败',
    faileToDeleteNode: '删除节点失败!',
    faileToUpload: '上传config文件失败',
    failToRegNode: '注册新的节点失败',
    failToModifyNode: '修改节点失败',
    typeApp: '请先输入节点IP!',
    uploadConf: '请上传config文件',
    typeCity: '请选择部署位置',
    typeAddress: '请输入详细地址',
    confirmToDeleteNode: '确认要删除该节点吗？',
    deleteAppBeforeDeleteNode: '你需要先删除安装在该节点上的应用',
    beforeDeleteMepm: '确认要删除MEPM？',
    beforeDeleteAppstore: '确认要删除应用市场？',
    beforeDeleteFromMechost: '确认要从该节点删除应用应用包？',
    getStatusDelay: '查询详情存在延迟，请等待部署完成30-40S后查询！',
    pleaseSelect: '请选择',
    successToAddRules: '你已经成功创建一条规则。',
    ifContinue: '此操作将永久删除该分流规则, 是否继续?',
    oneAtLeast: '请至少选择一条规则',
    loginStatusFailed: '登录状态已失效，请刷新界面并重新登录。',
    loginOperation: '您当前没有登录，请登录后操作。',
    operationInfo: '操作信息',
    onePackageAtLeast: '请至少选择一条数据进行操作！',
    ttl: '请输入正确的ttl',
    macMust: '请填写正确的MAC地址',
    idMust: '请填写正确的规则标识',
    domainMust: '请填写正确的域名',
    beforeDeleteAppMgr: '确认要删除本条数据吗？',
    noPermession: '当前用户无权操作！',
    recordExist: '记录已存在',
    getTemplateListFail: '获取参数失败',
    fuzzyQuery: '输入内容进行搜索'
  },
  area: {
    beijing: '北京市',
    haidian: '海淀区',
    caict: '中国信通院',
    huaweiBeijing: '华为北京研究所',
    shanxi: '陕西省',
    xian: '西安市',
    huaweiXian: '华为西安研究所',
    xidian: '西安电子科技大学',
    jiangsu: '江苏省',
    nanjing: '南京市',
    zijinshan: '紫金山实验室',
    shanghai: '上海市',
    pudong: '浦东新区',
    huaweiShanghai: '华为上海研究所',
    guangdong: '广东省',
    shenzhen: '深圳市',
    huaweiBantian: '华为坂田基地',
    tiananyungu: '华为天安云谷',
    clab: 'Clab实验室',
    SUSTech: '南方科技大学',
    shandong: '山东省',
    qingdao: '青岛市',
    haier: '海尔青岛工厂'
  },
  resourceMgr: {
    resManager: '资源管理',
    resourceOverview: '概览',
    vm: '虚机',
    image: '镜像',
    network: '网络',
    flavor: '规格',
    securityGroup: '安全组',
    createVMInstance: '创建实例',
    createImage: '创建镜像',
    edit: '编辑',
    delete: '删除',
    noData: '暂无数据',
    searchPlaceholder: '请输入名称进行搜索',
    name: '名称',
    type: '类型',
    status: '状态',
    visibility: '可见性',
    protect: '受保护的',
    diskFormat: '磁盘格式',
    size: '大小(MB)',
    operator: '操作',
    createNetwork: '创建网络',
    createFlavor: '创建规格',
    createSecurityGroup: '创建安全组',
    managerSecurityGroup: '规则管理',
    networkName: '网络名称',
    networkAddr: '网络地址',
    ipVersion: 'IP版本',
    gatewayIP: '网关IP',
    cancel: '取消',
    confirm: '确认',
    minPercentage: '占比50%以下',
    middlePercentage: '占比50%~80%',
    maxPercentage: '占比80%以上',
    flavorVCPU: 'VCPU数量',
    ram: '内存(MB)',
    rootDisk: '根磁盘',
    tempDisk: '临时磁盘',
    swapDisk: 'Swap磁盘',
    addSecurityGroupFlavor: '添加规则',
    protocol: '协议',
    direct: '方向',
    description: '描述',
    openPort: '打开端口',
    port: '端口',
    remote: '远程',
    detail: '详情',
    imageSelect: '镜像选择',
    instanceType: '实例类型',
    preStep: '上一步',
    nextStep: '下一步',
    instanceName: '实例名称',
    useDomain: '可用域',
    number: '数量',
    hasUpdate: '已更新',
    virtualCore: '虚拟内核',
    totalDisk: '磁盘总计',
    public: '公有',
    connectSubnet: '已连接的子网',
    shared: '共享的',
    adminStatus: '管理员状态',
    userParam: '用户参数',
    enableUserParam: '是否启用用户入参',
    resourceStatus: '资源状态',
    selectEdgeNode: '选择节点',
    editSecurityGroup: '编辑安全组',
    more: '更多',
    createSnapshot: '创建快照',
    control: '控制台',
    pauseInstance: '暂停实例',
    hangInstance: '挂起实例',
    deleteVMTitle: '确认删除虚机',
    deleteImageTitle: '确认删除镜像',
    deleteNetworkTitle: '确认删除网络',
    deleteFlavor: '确认删除规格',
    deleteSecurityGroupTitle: '确认删除安全组',
    deleteSecurityGroupFlavorTitle: '确认删除安全组规格',
    deleteVMMessage: '删除的虚机均无法恢复，是否要删除该虚机？',
    deleteImageMessage: '删除的镜像均无法恢复，是否要删除该镜像？',
    deleteNetworkMessage: '删除的网络均无法恢复，是否要删除该网络？',
    deleteFlavorMessage: '删除的规格均无法恢复，是否要删除该规格？',
    deleteSecurityGroupMessage: '删除的安全组均无法恢复，是否要删除该安全组？',
    deleteSecurityGroupFlavorMessage: '删除的安全组规格均无法恢复，是否要删除该安全组规格？',
    editSecurityGroupFlavor: '编辑规则',
    returnSecurityGroup: '返回安全组',
    deleteFlavorTitle: '删除规格',
    containerFormat: '容器格式',
    minRam: '最小内存',
    minDisk: '最小磁盘',
    properties: '特性',
    resourceUri: '镜像源',
    imageName: '镜像名称',
    flavorConfig: '规格配置',
    check: '查看',
    canonicalInfo: '请填写完整的信息',
    subnetName: '子网名称',
    vmAmount: '虚机数量',
    total: '总量',
    createFlavorSuccess: '创建规格成功',
    createSecurityGroupSuccess: '创建安全组成功',
    createSecurityGroupFlavorSuccess: '创建安全组规格成功',
    createImageSuccess: '创建镜像成功',
    createNetworkSuccess: '创建网络成功',
    createVMSuccess: '创建虚机成功',
    ethertype: '以太网类型',
    portRangeMin: '起始端口号',
    portRangeMax: '终止端口号',
    deleteSuccess: '删除成功',
    vcpuAmount: 'vCPU数量',
    ramAmount: '内存数量',
    volumeAmount: '卷',
    volumeSnapshotAmount: '卷快照',
    volumeStorageAmount: '卷储存',
    securityGroupAmount: '安全组用量',
    securityGroupRuleAmount: '安全组规则',
    floatIpAmount: '浮动ip数量',
    serverGroupAmount: '服务组数量',
    portAmount: '端口数量',
    networkAmount: '网络数量',
    subnetAmount: '子网数量',
    noLimit: '无限制',
    fixedIp: '固定Ip',
    rangePort: '端口范围',
    allPort: '所有端口',
    nameRule: '名称不能为空',
    availabilityZoneRule: '可用域不能为空',
    minRamRule: '最小内存不能为空',
    diskRule: '最小磁盘不能为空',
    networkAddrRule: '网络地址不能为空',
    ipVersionRule: 'IP版本不能为空',
    subnetNameRule: '子网名称不能为空',
    vCPURule: 'VCPU不能为空',
    ramRule: '内存不能为空',
    rootDiskRule: '根磁盘不能为空',
    tempDiskRule: '临时磁盘不能为空',
    swapDiskRule: 'Swap磁盘不能为空',
    directRule: '方向不能为空',
    openPortRule: '端口类型不能为空',
    remoteRule: '请选择规则来源',
    cidrRule: 'IP地址块不能为空',
    currentHost: '当前节点:',
    enterIp: '请输入Ip地址',
    enterRightIp: '请输入正确的Ip地址',
    isShared: '是否共享',
    deleteNetworkFailed: '删除网络失败!',
    createFlavorFailed: '创建规格失败!',
    createImageFailed: '创建镜像失败!',
    createNetworkFailed: '创建网络失败!',
    createSecurityGroupRuleFailed: '创建安全组规则失败!',
    querySecurityGroupsFailed: '查询安全组失败!',
    createSecurityGroupFailed: '创建安全组失败!',
    deleteFlavorFailed: '删除规格失败!',
    queryFlavorsFailed: '查询规格失败!',
    deleteImageFailed: '删除镜像失败!',
    queryImagesFailed: '查询镜像失败!',
    queryNetworksFailed: '查询网络失败!',
    getKpiFailed: '查询节点统计信息失败!',
    deleteSecurityGroupRuleFailed: '删除安全组规则失败!',
    querySecurityGroupRulesFailed: '查询安全组规则失败!',
    deleteSecurityGroupFailed: '删除安全组失败!',
    deleteVMFailed: '删除虚机失败!',
    queryVMsFailed: '查询虚机失败!',
    createVMFailed: '创建虚机失败!'
  },
  ...zhLocale
}

export default cn
