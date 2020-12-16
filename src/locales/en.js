/*
 *  Copyright 2020 Huawei Technologies Co ., Ltd .
 *
 *  Licensed under the Apache License, Version 2 .0 (the "License");
 *  you may not use this file except in compliance with the License .
 *  You may obtain a copy of the License at
 *
 *      http://www .apache .org/licenses/LICENSE-2 .0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied .
 *  See the License for the specific language governing permissions and
 *  limitations under the License .
 */

import enLocale from 'element-ui/lib/locale/lang/en'
const en = {
  nav: {
    login: 'Log In',
    logout: 'Log Out',
    mecm: 'Manager',
    overview: 'Overview',
    appMana: 'App Management',
    packageMana: 'Package List',
    packageDist: 'Package Distribution',
    appInstance: 'App Instance List',
    edgeNodes: 'Edge Nodes',
    nodeList: 'Edege Node List',
    mepList: 'MEP List',
    system: 'System',
    externalSysMan: 'External System Manager',
    applcm: 'App LCM',
    edgeNode: 'Edge Node',
    appstore: 'App Store',
    appDetail: 'App Detail',
    appRule: 'App Rules',
    fileNotSupport: 'File not support to read.',
    logoutTip: 'Are you sure to log out?',
    ruleConfiguration: 'Rule Configuration'
  },
  overview: {
    regionEdge: 'Edge Nodes',
    k8sResc: 'K8S Resource',
    cpu: 'CPU',
    mem: 'MEM', // memory
    disk: 'DISK',
    mepCapa: 'MEP Hardware Capabilities',
    softwareCapa: 'Software Capabilities',
    capa: 'Capabilities',
    vendor: 'Vendor',
    model: 'Model',
    desc: 'Description',
    app: 'App',
    manage: 'Manage',
    maintenance: 'Operation&Maintenance', // 运维
    serviceName: 'Service Name',
    services: 'Services',
    containers: 'Containers',
    containerUsage: 'Container Usage',
    name: 'Name: ',
    register: 'Register',
    alarms: 'Alarms',
    nodeinfo: 'Node Info',
    statistics: 'Statistics',
    nodeIp: 'Node IP: ',
    nodeName: 'Node Name: ',
    nodeAddress: 'Node Address: ',
    nodeInfo: 'Node Information',
    overview: 'Overview',
    edgeNodes: 'Edge Nodes',
    onlineNodes: 'Online Nodes',
    offlineNodes: 'Offline Nodes'
  },
  app: {
    packageList: {
      name: 'Name',
      size: 'Size',
      version: 'Version',
      vendor: 'Vendor',
      type: 'Type',
      affinity: 'Architecture',
      modifyTime: 'Modified Time',
      desc: 'Description',
      distribute: 'Distribute',
      synchronize: 'Sychronize From App Store',
      slectEdgeNodes: 'Select Edge Nodes',
      selected: 'Selected',
      ip: 'Ip',
      city: 'City',
      address: 'Address',
      createTime: 'Create Time',
      download: 'Download',
      auth: 'Author',
      pacVersion: 'Package Version',
      status: 'Status'
    },
    distriList: {
      mecHost: 'MEC Hosts',
      hostIp: 'Host IP',
      status: 'Status',
      deploy: 'Deploy',
      appName: 'App Name',
      appDesc: 'App Description',
      podName: 'Pod Name',
      podKind: 'Pod Kind',
      podNameEspace: 'Pod Name Espace',
      podSel: 'Pod Selector',
      deploymentConf: 'Deployment Configuration',
      multipleDeploy: 'Batch Deployment',
      deleteError: 'Please delete the error status applications'
    },
    instanceList: {
      operationStatus: 'Operational Status',
      terminate: 'Terminate',
      instanceDetail: 'Instance Detail',
      beforeDelete: 'Are you sure to delete this instance from the MEC host?',
      addRule: 'Add Rules',
      batchDeleteDnsRules: 'Batch delete DNS ruls',
      batchDeleteTrafficRules: 'Batch delete traffic ruls',
      addDnsRules: 'Add DNS rules',
      addTrafficRules: 'Add Traffic rules',
      addFilter: 'Add Traffic Filter'
    },
    ruleConfig: {
      srcAddress: 'Src IP Address',
      srcPort: 'Src Port',
      dstAddress: 'Dst IP Address',
      dstPort: 'Dst Port',
      trafficRuleId: 'Traffic Rule Id',
      filterType: 'Filter Type',
      priority: 'Priority',
      protocol: 'Protocol',
      action: 'Action',
      dnsRuleId: 'DNS Rule Id',
      ipAddress: 'IP Address',
      ipAddressType: 'IP Address Type',
      domainName: 'Domain Name',
      ttl: 'TTL',
      checkRules: 'Check Rules',
      dnsRule: 'DNS Rules',
      trafficRule: 'Traffic Rules',
      trafficFilter: 'Traffic Filter',
      appRuleManReg: 'App Rule MGR Registration',
      appRuleManEdit: 'App Rule MGR Editor',
      appRuleMgrMust: 'App Rule MGR is must',
      srcTunnelPort: 'Src Tunnel Port',
      srcTunnelAddress: 'Src Tunnel Address',
      dstTunnelPort: 'Dst Tunnel Port',
      dstTunnelAddress: 'Dst Tunnel Address',
      tag: 'Tag',
      mutiplePort: 'Use "," to separate multiple ports',
      mutipleIp: 'Use "," to separate multiple IPs',
      srcMacAddress: 'Src MAC Address',
      dstMacAddress: 'Dst MAC Address',
      tunnelSpecificData: 'Tunnel Specific Data',
      tunnelType: 'Tunnel Type',
      interfaceType: 'Interface Type',
      addNewInterfaceInfo: 'Add New Interface Info',
      interfaceDescriptor: 'Interface Descriptor',
      ipInfo: 'IP Information',
      macInfo: 'MAC Information',
      tunnelInfo: 'Tunnel Information',
      interfaceInfo: 'Interface Information',
      mutipleProtocol: 'Use "," to separate multiple protocols',
      mutipleTag: 'Use "," to separate multiple tags',
      mepError: 'MEP error, please try again later.',
      addRuleSuc: 'You have added rule successfully',
      editRuleSuc: 'You have modified the rule successfully',
      delRuleSuc: 'You have deleted the rule successfully'
    }
  },
  edgeNode: {
    ip: 'Ip',
    city: 'City',
    address: 'Address',
    affinity: 'Architecture',
    edgeNexusIp: 'Edge Repo IP',
    edgeNexusPort: 'Edge Repo Port',
    applcmIp: 'App LCM IP',
    k8sUrl: 'K8S URL',
    monitor: 'Monitor'
  },
  system: {
    appLcm: {
      ip: 'Ip',
      port: 'Port',
      manageMecHost: 'Managed MEC Host',
      userNmae: 'Username',
      password: 'Password',
      newReg: 'New Registration',
      applcmReg: 'App LCM Registration',
      applcmModify: 'App LCM Modify',
      name: 'Name'
    },
    edgeNodes: {
      systemPlatform: 'System',
      ip: 'Ip',
      city: 'City',
      affinity: 'Architecture',
      address: 'Address',
      edgeNexusIp: 'Edge Repo IP',
      edgeNexusPort: 'Edge Repo Port',
      applcmIp: 'App LCM IP',
      k8sUrl: 'K8S URL',
      newReg: 'New Registration',
      hostName: 'Host Name',
      ipAddress: 'Ip Address',
      deployArea: 'Deploy Area',
      zipcode: 'Zipcode',
      username: 'Username',
      repoUsername: 'Edge Repo Username',
      password: 'Password',
      kubernetesUrl: 'Kubernetes Url',
      edgeNexusName: 'Edge Repo Name',
      edgeNexusPass: 'Edge Repo Password',
      upload: 'Upload',
      uploadTip: 'only support config file, no more than 500kb',
      nodeReg: 'Edge Node Registration',
      nodeModify: 'Edge Node Modify',
      uploadFile: 'Upload Config File',
      howToUpload: 'Drag the file here，or click to upload',
      hwCapability: 'Capabilities',
      coordinates: 'Coordinates'
    },
    appstore: {
      appstoreName: 'App Store Name',
      vendor: 'Vendor',
      username: 'Username',
      ipAddress: 'Ip Address',
      createTime: 'Created Time',
      url: 'URL',
      appStoreReg: 'App Store Registration',
      appStoreModify: 'App Store Modify'
    }
  },
  common: {
    reset: 'Reset',
    search: 'Search',
    operation: 'Operation',
    cancel: 'Cancel',
    submit: 'Submit',
    confirm: 'Confirm',
    delete: 'Delete',
    detail: 'Detail',
    modify: 'Modify',
    warning: 'Promt',
    copy: 'Copy'
  },
  verify: {
    ipTip: 'Ip should not be empty',
    hostnameTip: 'Host name should not be empty',
    zipcodeTip: 'Zipcode should not be empty',
    cityTip: 'City should not be empty',
    addressTip: 'Address Mec Host should not be empty',
    usernameTip: 'User name should not be empty',
    passwordTip: 'Password should not be empty',
    edgeNexusIpTip: 'Edge Repo ip should not be empty',
    edgeNexusPortTip: 'Edge Repo port should not be empty',
    edgeNexusUsernameTip: 'Edge Repo user name should not be empty',
    edgeNexusPasswordTip: 'Edge Repo password should not be empty',
    appLcmIpTip: ' App LCM ip should not be empty',
    k8sURLTip: 'k8sURL should not be empty',
    portTip: 'Port should not be empty',
    managedMecHostTip: 'Managed Mec Host should not be empty',
    appstorenameTip: 'App store name should not be empty',
    vendorTip: 'Vendor should not be empty',
    uriTip: 'URI should not be empty',
    affinityTip: 'Architecture should not be empty',
    areaTip: 'Area should not be empty',
    applcmNameTip: 'App LCM should not be empty',
    normalVerify: 'Style is not right',
    hostNameVerify: '4 to 16 digits (letters, numbers, underscores, minus signs)',
    coordinates: 'Coordinates should not be empty'
  },
  tip: {
    getCommonListFailed: 'Get list failed',
    deletePacFrmoHost: 'You have deleted the package from the host successfully!',
    networkError: 'Error, please check your internet!',
    failedReg: 'Failed to register user, ',
    wrongCaptcha: 'Invalid captcha, please recheck the Captcha.',
    failedAuth: 'Authentication Failure, please recheck the User Name or Password.',
    deploySuc: 'Deploy successfully!',
    deleteSuc: 'Delete successfully!',
    sucToDownload: 'Succeed to download package from app store!',
    registerServSuc: 'You have register this service successed!',
    unregisterServSuc: 'You have unregister this service successed!',
    regAppLcmSuc: 'Register App LCM success!',
    modAppLcmSuc: 'Modify App LCM success!',
    regAppStoreSuc: 'Register App Store success!',
    modAppStoreSuc: 'Modify App Store success!',
    deleteAppStoreSuc: 'You have deleted the app store successfully!',
    sucToDeleteNodes: 'Succeed to delete edge node!',
    uploadSuc: 'Succeed to upload config file!',
    sucToRegNode: 'Succeed to register edge node!',
    sucToModNode: 'Succeed to modify edge node!',
    regUserSuc: 'User is registered successfully!',
    fileFormatError: 'The file format does not support read or empty content!',
    sessionOut: 'Your session is expired.',
    sessionExp: 'Session Expired',
    version: 'Please choose the package version first.',
    noPackage: 'There is no package',
    warning: 'Warning',
    browserAdvise: 'For sure some functions work well, please use Chrome',
    confirm: 'Confirm',
    mecHost: 'Please choose the host',
    failedToDownload: 'Failed to download package from app store!',
    failedToGetList: 'Failed to get node list!',
    failedToGetAppList: 'Failed to get app list from app store!',
    deployFailed: 'Deploy failed!',
    getListFailed: 'Failed to get distribution list!',
    getNodeListFailed: 'Failed to get node list!',
    getPackageInfoFailed: 'Failed to get package info!',
    getAppInfoFailed: 'Failed to get app info!',
    getCapaFailed: 'Failed to get the capabilities!',
    getKpiFailed: 'Failed to get the node kpi',
    getServiceFailed: 'Failed to get service info!',
    failedToGetCaptcha: 'Failed to get captcha',
    nameAlSinged: 'The username number has been already registered, please change another one',
    telAlSigned: 'The telephone number has been already registered, please change another one',
    modifyPwd: 'You have successfully reset your password',
    failedModifyPwd: 'Failed to reset your password',
    failedToGetAppStoreList: 'Failed to get app store list!',
    faileToGetInstanceList: 'Failed to get instance list!',
    faileToDeleteNode: 'Failed to delete edge node!',
    faileToUpload: 'Failed to upload config file',
    failToRegNode: 'Failed to register the node',
    failToModifyNode: 'Failed to modify',
    typeApp: 'Please type MEC host ip first!',
    uploadConf: 'Please upload config file first',
    typeCity: 'Please select deployment area',
    confirmToDeleteNode: 'Are you sure to delete this node?',
    deleteAppBeforeDeleteNode: 'You need to delete the application installed on the node first',
    beforeDeleteApplcm: 'Are you sure to delete this App LCM?',
    beforeDeleteAppstore: 'Are you sure to delete this App Store?',
    beforeDeleteFromMechost: 'Are you sure to delete this package from the MEC host?',
    getStatusDelay: 'There is a delay in query details, please wait 30-40S after the deployment is completed!',
    pleaseSelect: 'Please selece',
    successToAddRules: 'You have created one rule successfully.',
    regAppManSuc: 'You have created one app rule manager successfully.',
    ifContinue: 'This operation will permanently delete the diversion rule, continue?'
  },
  ...enLocale
}

export default en
