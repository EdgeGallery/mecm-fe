/*
 *  Copyright 2020 Huawei Technologies Co., Ltd.
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
  login: {
    userName: '用户名',
    password: '密码',
    login: '登录',
    register: '注册',
    logout: '注销',
    wrongCaptcha: '验证码错误，请重新输入验证码。',
    confirmPass: '密码确认',
    contact: '联系方式',
    company: '工作单位',
    gender: '性别',
    male: '男',
    female: '女',
    namePla: '用户名/手机号',
    pwdPla: '密码',
    pwdConfPla: '密码确认',
    compPla: '公司信息',
    telPla: '电话号码',
    getCap: '获取验证码',
    capPla: '验证码',
    newPwd: '新密码',
    confirmNewPwd: '确认新密码',
    forgotPwd: '忘记密码？',
    modifyPwd: '修改密码',
    loginWithUser: '账户登录',
    welcome: '欢迎注册EdgeGallery平台',
    freeSign: '免费注册',
    getPwd: '找回密码',
    verify: '点击按钮进行验证',
    changeOne: '换一张'
  },
  nav: {
    mecm: '管理平台',
    overview: '概述',
    appMana: '应用管理',
    packageMana: '应用包列表',
    packageDist: '应用包分发',
    appInstance: '应用实例',
    edgeNodes: '边缘节点',
    nodeList: '边缘节点列表',
    mepList: 'MEP列表',
    system: '系统',
    externalSysMan: '外部系统管理',
    applcm: 'APPLCM注册系统',
    edgeNode: '边缘节点注册系统',
    appstore: '应用市场注册系统',
    appDetail: '应用详情',
    logoutTip: '确认要离开吗？'
  },
  overview: {
    regionEdge: '边缘节点',
    k8sResc: 'K8S 资源',
    cpu: 'CPU',
    mem: 'MEM', // memory
    disk: 'DISK',
    mepCapa: 'MEP 能力',
    capa: '能力',
    numOfApp: '已安装App',
    available: '状态',
    desc: '描述',
    app: '应用',
    manage: '管理',
    maintenance: '运维', // 运维
    serviceName: '服务名称',
    services: '服务',
    containers: '容器',
    containerUsage: '容器占用率',
    name: '名称：',
    register: '注册',
    alarms: '警报',
    nodeinfo: '节点信息',
    statistics: '统计表'
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
      address: '详细地址',
      createTime: '创建时间',
      download: '下载',
      fileNotSupport: '不支持的文件格式',
      auth: '作者',
      pacVersion: '应用版本'
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
      deploymentConf: '部署配置'
    },
    instanceList: {
      operationStatus: '运行状态',
      terminate: '中断',
      instanceDetail: '应用实例详情',
      beforeDelete: '确定从host删除此应用吗？'

    }
  },
  edgeNode: {
    ip: 'IP地址',
    city: '城市',
    address: '详细地址',
    affinity: '架构',
    edgeNexusIp: 'Edge Repo IP地址',
    edgeNexusPort: 'Edge Repo 端口',
    applcmIp: 'APPLCM地址',
    k8sUrl: 'K8S URL',
    monitor: '监控'
  },
  system: {
    appLcm: {
      ip: 'IP地址',
      port: '端口',
      manageMecHost: 'MEC主机管理',
      userNmae: '用户名',
      password: '密码',
      newReg: '新增注册',
      applcmReg: 'App LCM 注册',
      applcmModify: 'App LCM 编辑'
    },
    edgeNodes: {
      systemPlatform: '系统',
      ip: 'IP地址',
      city: '城市',
      affinity: '架构',
      address: '地址',
      edgeNexusIp: '边缘仓库地址',
      edgeNexusPort: '边缘仓库端口',
      applcmIp: 'APPLCM地址',
      k8sUrl: 'K8S URL',
      newReg: '新增注册',
      hostName: '主机名称',
      ipAddress: 'IP地址',
      deployArea: '部署区域',
      zipcode: '邮政编码',
      username: '用户名',
      password: '密码',
      kubernetesUrl: 'K8S Url',
      edgeNexusName: '边缘仓库名称',
      edgeNexusPass: '边缘仓库密码',
      upload: '* 上传',
      uploadTip: '仅支持不超过500KB的配置文件。',
      nodeReg: 'Edge Node注册',
      nodeModify: 'Edge Node编辑',
      uploadFile: '上传配置文件',
      howToUpload: '拖拽文件到上传区域内，或者点击上传'
    },
    appstore: {
      appstoerName: '应用市场名称',
      vendor: '厂商',
      username: '用户名',
      ipAddress: 'IP地址',
      modifyTime: '修改时间',
      url: 'URL',
      appStoreReg: 'App Store 注册',
      appStoreModify: 'App Store 编辑'
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
    warning: '提示'
  },
  verify: {
    ipTip: 'IP地址不能为空。',
    hostnameTip: '主机名称不能为空。',
    zipcodeTip: '邮政编码不能为空。',
    cityTip: '城市名称不能为空。',
    addressTip: '详细地址不能为空。',
    usernameTip: '用户名不能为空。',
    passwordTip: '密码不能为空。',
    edgeNexusIpTip: 'Edge Repo IP不能为空。',
    edgeNexusPortTip: 'Edge Repo port不能为空。',
    edgeNexusUsernameTip: 'Edge Repo user name不能为空。',
    edgeNexusPasswordTip: 'Edge Repo password不能为空。',
    appLcmIpTip: 'AppLcm IP不能为空。',
    k8sURLTip: 'K8S URL不能为空。',
    portTip: '端口不能为空。',
    managedMecHostTip: '管理的MEC Host不能为空。',
    appstorenameTip: '应用市场名称不能为空。',
    vendorTip: '生产商不能为空。',
    urlTip: 'Url不能为空。',
    affinityTip: '架构不能为空。',
    areaTip: '请选择地域'
  },
  tip: {
    deletePacFrmoHost: '你已经成功从host节点删除应用！',
    networkError: '错误，请检查你的网络！',
    failedReg: '注册用户失败, ',
    wrongCaptcha: '不正确的验证码，请重新输入！',
    failedAuth: '认证失败，请检查你用户名和密码！',
    deploySuc: '部署成功！',
    deleteSuc: '删除成功！',
    sucToDownload: '成功从App Store下载应用！',
    registerServSuc: '你已经成功注册该服务！',
    unregisterServSuc: '你已经取消该服务注册！',
    regAppLcmSuc: '你已成功注册App LCM！',
    modAppLcmSuc: '你已成功编辑App LCM！',
    regAppStoreSuc: '你已成功注册App Store！',
    modAppStoreSuc: '你已成功编辑App Store',
    deleteAppStoreSuc: '你已经成功删除App Store！',
    sucToDeleteNodes: '你已成功删除改node节点！',
    uploadSuc: '你已成功上传配置文件！',
    sucToRegNode: '你已成功注册Node节点！',
    sucToModNode: '你已成功编辑Node节点！',
    regUserSuc: '你已成功注册该用户！',
    fileFormatError: '文件格式不支持或者内容为空！',
    sessionOut: '你的登录信息过期，请重新登录！',
    sessionExp: 'Session过期',
    version: '请选择要下发的应用包版本！',
    noPackage: '没有可以管理的应用！',
    warning: '警告',
    browserAdvise: '为了部分功能正常使用，我们建议使用Chrom浏览器！',
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
    nameAlSinged: '用户名已被注册，请重新输入或前往登陆',
    telAlSigned: '电话号码已被注册，请重新输入或前往登陆',
    modifyPwd: '重置密码成功，请登录',
    failedModifyPwd: '重置密码失败',
    failedToGetAppStoreList: '获取应用商店列表失败',
    faileToGetInstanceList: '获取应用实例列表失败',
    faileToDeleteNode: '删除node失败!',
    faileToUpload: '上传config文件失败',
    failToRegNode: '注册新的node节点失败',
    failToModifyNode: '修改节点失败',
    typeApp: '请先选择APPLCM地址!',
    uploadConf: '请上传config文件',
    typeCity: '请选择部署区域',
    confirmToDeleteNode: '确认要删除该节点吗？',
    deleteAppBeforeDeleteNode: '你需要先删除安装在该节点上的应用',
    beforeDeleteApplcm: '确认要删除APPLCM？',
    beforeDeleteAppstore: '确认要删除App Store？',
    beforeDeleteFromMechost: '确认要从该节点删除应用应用包？'
  },
  ...zhLocale
}

export default cn
