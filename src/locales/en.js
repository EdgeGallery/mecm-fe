/*
 *  Copyright 2020-2021 Huawei Technologies Co ., Ltd .
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
    userAccountCenter: 'My Account',
    hsInvalidHintForTimeout: 'You have not operated for a long time, ',
    hsInvalidHintForLogout: 'You have logged in or logged out through other pages, ',
    hsInvalidHintForServerStopped: 'The server has been upgraded, ',
    hsInvalidHint: 'the current session has expired. Please choose to refresh the page or log in again.',
    refresh: 'Refresh',
    reLogin: 'Login',
    mecm: 'Manager',
    overview: 'Overview',
    appMana: 'App Management',
    packageMana: 'Package List',
    packageDist: 'Package Distribution',
    appInstance: 'App Instance List',
    edgeNodes: 'Edge Nodes',
    nodeList: 'Edge Node List',
    mepList: 'MEP List',
    system: 'System',
    externalSysMan: 'External System Manager',
    mepm: 'MEPM',
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
    k8sResc: 'Resource',
    distributionDisplay: 'Node Distribution Display',
    cpu: 'CPU',
    mem: 'MEM', // memory
    disk: 'DISK',
    mepCapa: 'Harware Capabilities',
    mepInfo: 'MEP Information',
    capaInfo: 'Capabilities',
    softwareCapa: 'Software Capabilities',
    capa: 'Capabilities',
    vendor: 'Vendor',
    model: 'Model',
    desc: 'Description',
    app: 'App',
    manage: 'Manage',
    maintenance: 'Operation',
    serviceName: 'Service Name',
    services: 'Services',
    containers: 'Containers',
    containerUsage: 'Container Usage',
    name: 'Name: ',
    register: 'Register',
    nodeinfo: 'Node Info',
    statistics: 'Statistics',
    nodeIp: 'Node IP: ',
    nodeName: 'Node Name: ',
    nodeAddress: 'Node Address: ',
    nodeInfo: 'Node Information',
    overview: 'Node Statistics',
    edgeNodes: 'Total Edge Nodes',
    onlineNodes: 'No. Online Nodes',
    offlineNodes: 'No. Offline Nodes',
    returnOverview: 'Back to main view',
    nodeKPI: 'Node KPI',
    monitor: 'Status Monitoring'
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
      status: 'Status',
      sync: 'Sync',
      syncTip: 'Select at lease one application for synchronization!',
      syncSuccess: 'Sync succeeded！',
      industry: 'Industry',
      syncTime: 'Sync Time',
      distriAndDeploy: 'Distribution&Instantiate',
      vmConfig: 'VM',
      vmNetCongig: 'VM Network Configuration',
      netWork: 'NetWork',
      netWorkConfig: 'Advanced Network Configuration',
      netConfig: 'Network',
      otherConfig: 'Other Configuration'
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
      addFilter: 'Add Traffic Filter',
      batchDelete: 'Batch delete instances',
      appKPI: 'Application KPI',
      newRules: 'Add new rules'
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
    k8sUrl: 'K8S URL',
    monitor: 'Monitor',
    vim: 'VIM'
  },
  system: {
    mepm: {
      ip: 'Ip',
      port: 'Port',
      manageMecHost: 'Managed MEC Host',
      userNmae: 'Username',
      password: 'Password',
      newReg: 'New Registration',
      mepmReg: 'App LCM Registration',
      mepmModify: 'App LCM Modify',
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
      mepmIp: 'App LCM IP',
      k8sUrl: 'K8S URL',
      newReg: 'New Registration',
      hostName: 'Host Name',
      ipAddress: 'Ip Address',
      location: 'Location',
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
      coordinates: 'Coordinates',
      chooseLocation: 'Please select location',
      vim: 'VIM',
      ifUploaded: 'Upload Status',
      coordPlaceholder: 'Please enter longitude and latitude, eg: 116,39',
      referCoord: 'For coordinate acquisition, please refer to:',
      getCoord: 'Click to get coord',
      long: 'Long:',
      lat: 'Lat:'
    },
    appstore: {
      appstoreName: 'App Store Name',
      vendor: 'Vendor',
      username: 'Username',
      ipAddress: 'Ip Address',
      createTime: 'Created Time',
      url: 'URL',
      appStoreReg: 'App Store Registration',
      appStoreModify: 'App Store Modify',
      appstoreRepo: 'Appstore Repo',
      appstoreRepoName: 'Repo Name',
      appstoreRepoUserName: 'Repo Username',
      appstoreRepoPassword: 'Repo Password',
      port: 'Port'
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
    copy: 'Copy',
    online: 'Online',
    offline: 'Offline'
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
    mepmIpTip: ' App LCM ip should not be empty',
    k8sURLTip: 'k8sURL should not be empty',
    portTip: 'Port should not be empty',
    managedMecHostTip: 'Managed Mec Host should not be empty',
    appstorenameTip: 'App store name should not be empty',
    vendorTip: 'Vendor should not be empty',
    uriTip: 'URI should not be empty',
    affinityTip: 'Architecture should not be empty',
    areaTip: 'Area should not be empty',
    mepmNameTip: 'App LCM should not be empty',
    normalVerify: 'Style is not right',
    hostNameVerify: '4 to 16 digits (letters, numbers)',
    noSymbol: '1-16 characters and not contain special symbols',
    coordinates: 'Coordinates can not be empty.',
    uriVerify: 'Try to type right Uri.',
    descVerify: 'Describtion can not be empty.',
    appNameVerify: 'App name can not be empty',
    mustOptions: 'This input box can not be empty',
    appRuleManaVerify: 'App rule manager can not be empty',
    passVerify: '6-18digit conbination of letters, digits and special characters.'
  },
  tip: {
    getCommonListFailed: 'Get list failed.',
    deletePacFrmoHost: 'You have deleted the package from the host successfully!',
    networkError: 'Error, please check your internet!',
    failedReg: 'Failed to register user. ',
    wrongCaptcha: 'Invalid captcha, please recheck the Captcha.',
    failedAuth: 'Authentication Failure, please recheck the User Name or Password.',
    deploySuc: 'Deploy successfully!',
    deleteSuc: 'Delete successfully!',
    sucToDownload: 'Succeed to download package from app store!',
    registerServSuc: 'You have register this service successed!',
    unregisterServSuc: 'You have unregister this service successed!',
    regMepmSuc: 'Register MEPM success!',
    modMepmSuc: 'Modify MEPM success!',
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
    sessionExp: 'Session Expired.',
    version: 'Please choose the package version first.',
    noPackage: 'There is no package.',
    warning: 'Warning',
    browserAdvise: 'For sure some functions work well, please use Chrome.',
    confirm: 'Confirm',
    mecHost: 'Please choose the host.',
    failedToDownload: 'Failed to download package from app store!',
    failedToGetList: 'Failed to get node list!',
    failedToGetAppList: 'Failed to get app list from app store!',
    deployFailed: 'Deploy failed!',
    getListFailed: 'Failed to get distribution list!',
    getNodeListFailed: 'Failed to get node list!',
    getPackageInfoFailed: 'Failed to get package info!',
    getAppInfoFailed: 'Failed to get app info!',
    getCapaFailed: 'Failed to get the capabilities!',
    getKpiFailed: 'Failed to get the node kpi.',
    getServiceFailed: 'Failed to get service info!',
    failedToGetCaptcha: 'Failed to get captcha.',
    nameAlSinged: 'The username number has been already registered, please change another one.',
    telAlSigned: 'The telephone number has been already registered, please change another one.',
    modifyPwd: 'You have successfully reset your password.',
    failedModifyPwd: 'Failed to reset your password.',
    failedToGetAppStoreList: 'Failed to get app store list!',
    faileToGetInstanceList: 'Failed to get instance list!',
    faileToDeleteNode: 'Failed to delete edge node!',
    faileToUpload: 'Failed to upload config file.',
    failToRegNode: 'Failed to register the node.',
    failToModifyNode: 'Failed to modify.',
    typeApp: 'Please type MEC host ip first!',
    uploadConf: 'Please upload config file first.',
    typeCity: 'Please select deployment area.',
    typeAddress: 'Please type address details. ',
    confirmToDeleteNode: 'Are you sure to delete this node?',
    deleteAppBeforeDeleteNode: 'You need to delete the application installed on the node first.',
    beforeDeleteMepm: 'Are you sure to delete this MEPM?',
    beforeDeleteAppstore: 'Are you sure to delete this App Store?',
    beforeDeleteFromMechost: 'Are you sure to delete this package from the MEC host?',
    getStatusDelay: 'There is a delay in query details, please wait 30-40S after the deployment is completed!',
    pleaseSelect: 'Please select.',
    successToAddRules: 'You have created one rule successfully.',
    regAppManSuc: 'You have created one app rule manager successfully.',
    modAppRuleSuc: 'You have modified one app rule manager successfully.',
    ifContinue: 'This operation will permanently delete the diversion rule, continue?',
    oneAtLeast: 'Please select one rule at least.',
    onePackageAtLeast: 'Please select one piece pf data at least!',
    loginStatusFailed: 'The login status has expired, please refresh the page and log in again.',
    loginOperation: 'User is not authorized to perform this operation, please login.',
    operationInfo: 'Operation Info',
    ttl: 'Please type right ttl.',
    macMust: 'Please type right mac address.',
    idMust: 'Please type right rule ID.',
    domainMust: 'Please type right domain name.',
    beforeDeleteAppMgr: 'Are you sure to delete this data?',
    noPermession: 'No permission to operate, please login！',
    recordExist: 'Record already exist!',
    getTemplateListFail: 'Failed to get parameters',
    fuzzyQuery: 'Enter content to search'
  },
  area: {
    beijing: 'Beijing',
    haidian: 'Haidian',
    caict: 'CAICT',
    huaweiBeijing: 'Huawei Beijing',
    shanxi: "Shan'xi",
    xian: "Xi'an",
    huaweiXian: "Huawei Xi'an",
    xidian: 'Xidian Univercity',
    jiangsu: 'Jiangsu',
    nanjing: 'Nanjing',
    zijinshan: 'Zijinshan Lab',
    shanghai: 'Shanghai',
    pudong: 'Pudong',
    huaweiShanghai: 'Huawei Shanghai',
    guangdong: 'Guangdong',
    shenzhen: 'Shenzhen',
    huaweiBantian: 'Huawei Bantian',
    tiananyungu: 'Huawei Tiananyungu',
    clab: 'Clab',
    SUSTech: 'SUSTech',
    shandong: 'Shandong',
    qingdao: 'Qingdao',
    haier: 'Haier Qingdao'
  },
  resourceMgr: {
    resManager: 'Resource Manager',
    resourceOverview: 'Overview',
    vm: 'VM',
    image: 'Image',
    network: 'Network',
    flavor: 'Flavor',
    securityGroup: 'Security Group',
    createVMInstance: 'Create Instance',
    createImage: 'Create Image',
    edit: 'edit',
    delete: 'delete',
    noData: 'No data',
    searchPlaceholder: 'Please enter a name to search',
    name: 'Name',
    type: 'type',
    status: 'status',
    visibility: 'visibility',
    protect: 'Protected',
    diskFormat: 'Disk Format',
    size: 'Size(MB)',
    operator: 'Operator',
    createNetwork: 'Create Network',
    createFlavor: 'Create Flavor',
    createSecurityGroup: 'Create SecurityGroup',
    managerSecurityGroup: 'Rule Management',
    networkName: 'Network Name',
    networkAddr: 'Network Address',
    ipVersion: 'IP Version',
    gatewayIP: 'Gateway IP',
    cancel: 'cancel',
    confirm: 'confirm',
    minPercentage: 'Less than 50%',
    middlePercentage: '50%~80%',
    maxPercentage: 'More than 80%',
    flavorVCPU: 'VCPU Num',
    ram: 'RAM(MB)',
    rootDisk: 'Root Disk',
    tempDisk: 'Temporary Disk',
    swapDisk: 'Swap Disk',
    addSecurityGroupFlavor: 'Add Rule',
    protocol: 'Protocol',
    direct: 'Direct',
    description: 'Description',
    openPort: 'Open Port',
    port: 'Port',
    remote: 'Remote',
    detail: 'Detail',
    imageSelect: 'Image selection',
    instanceType: 'Instance type',
    preStep: 'previous',
    nextStep: 'next step',
    instanceName: 'Instance Name',
    useDomain: 'Available Zone',
    number: 'Number',
    hasUpdate: 'Updated',
    virtualCore: 'Virtual Core',
    totalDisk: 'Total Disk',
    public: 'Public',
    connectSubnet: 'Connected subnet',
    shared: 'shared',
    adminStatus: 'Administrator status',
    userParam: 'User parameters',
    enableUserParam: 'Whether to enable user input',
    resourceStatus: 'Resource status',
    selectEdgeNode: 'select node',
    editSecurityGroup: 'Edit Security Group',
    more: 'more',
    createSnapshot: 'create snapshot',
    control: 'control',
    pauseInstance: 'pause instance',
    hangInstance: 'hang instance',
    deleteVMTitle: 'Confirm to delete the VM',
    deleteImageTitle: 'Confirm to delete the image',
    deleteNetworkTitle: 'Confirm to delete the network',
    deleteFlavor: 'Confirm to delete the flavor',
    deleteSecurityGroupTitle: 'Confirm to delete the security group',
    deleteSecurityGroupFlavorTitle: 'Confirm to delete the security group flavor',
    deleteVMMessage: 'The deleted VM cannot be recovered. Do you want to delete the VM?',
    deleteImageMessage: 'The deleted image cannot be recovered. Do you want to delete the image?',
    deleteNetworkMessage: 'The deleted network cannot be recovered. Do you want to delete the network?',
    deleteFlavorMessage: 'The deleted flavor cannot be recovered. Do you want to delete the flavor?',
    deleteSecurityGroupMessage: 'The deleted security group cannot be recovered. Do you want to delete the security group?',
    deleteSecurityGroupFlavorMessage: 'The deleted security group flavor cannot be recovered. Do you want to delete the security group flavor?',
    editSecurityGroupFlavor: 'Edit Rule',
    returnSecurityGroup: 'return security group',
    deleteFlavorTitle: 'delete flavor',
    containerFormat: 'Container Format',
    minRam: 'Min Ram',
    minDisk: 'Min Disk',
    properties: 'Properties',
    resourceUri: 'Resource Uri',
    imageName: 'Image Name',
    flavorConfig: 'Flavor Config',
    check: 'check',
    canonicalInfo: 'Please fill in the canonical information',
    subnetName: 'Subnet Name',
    vmAmount: 'VM amount:',
    total: 'Total:',
    createFlavorSuccess: 'Flavor created successfully',
    createSecurityGroupSuccess: 'Security group created successfully',
    createSecurityGroupFlavorSuccess: 'Security group rule created successfully',
    createImageSuccess: 'Image created successfully',
    createNetworkSuccess: 'Network created successfully',
    createVMSuccess: 'VM created successfully',
    ethertype: 'Ethernet type',
    portRangeMin: 'start port',
    portRangeMax: 'end port',
    deleteSuccess: 'successfully deleted',
    vcpuAmount: 'vCPU Amount:',
    ramAmount: 'Ram Amount:',
    volumeAmount: 'Volume Amount:',
    volumeSnapshotAmount: 'Volume snapshot Amount:',
    volumeStorageAmount: 'Volume storage Amount:',
    securityGroupAmount: 'SecurityGroup',
    securityGroupRuleAmount: 'Security group rule:',
    floatIpAmount: 'Float Ip Amount:',
    serverGroupAmount: 'ServerGroup:',
    portAmount: 'Port Amount:',
    networkAmount: 'Network Amount:',
    subnetAmount: 'Subnet Amount:',
    noLimit: 'no limit',
    fixedIp: 'Fixed Ip',
    rangePort: 'Port Range',
    allPort: 'All Ports',
    nameRule: 'name is required',
    availabilityZoneRule: 'availabilityZone cannot be empty',
    minRamRule: 'The minimum memory cannot be empty',
    diskRule: 'The smallest disk cannot be empty',
    networkAddrRule: 'The network address cannot be empty',
    ipVersionRule: 'IP version cannot be empty',
    subnetNameRule: 'The subnet name cannot be empty',
    vCPURule: 'vCPU cannot be empty',
    ramRule: 'Memory cannot be empty',
    rootDiskRule: 'The root disk cannot be empty',
    tempDiskRule: 'Temporary disk cannot be empty',
    swapDiskRule: 'Swap disk cannot be empty',
    directRule: 'Direction cannot be empty',
    openPortRule: 'Port type cannot be empty',
    remoteRule: 'Please select the rule source',
    cidrRule: 'IP address block cannot be empty',
    currentHost: 'current host:',
    enterIp: 'Please enter the IP address',
    enterRightIp: 'Please enter the correct IP address',
    isShared: 'shared',
    deleteNetworkFailed: 'Failed to delete network!',
    createFlavorFailed: 'Failed to create flavor!',
    createImageFailed: 'Failed to create image!',
    createNetworkFailed: 'Failed to create network!',
    createSecurityGroupRuleFailed: 'Failed to create security group rule!',
    querySecurityGroupsFailed: 'Failed to query security group',
    createSecurityGroupFailed: 'Failed to create security group!',
    deleteFlavorFailed: 'Failed to delete flavor!',
    queryFlavorsFailed: 'Failed to query flavor',
    deleteImageFailed: 'Failed to delete image!',
    queryImagesFailed: 'Failed to query image',
    queryNetworksFailed: 'Failed to query security group',
    getKpiFailed: 'Failed to query node statistic',
    deleteSecurityGroupRuleFailed: 'Failed to delete security group rule!',
    querySecurityGroupRulesFailed: 'Failed to query security group rule',
    deleteSecurityGroupFailed: 'Failed to delete security group!',
    deleteVMFailed: 'Failed to delete vm!',
    queryVMsFailed: 'Failed to query vm',
    createVMFailed: 'Failed to create vm!',
    createVMSnapshotSuccess: 'Snapshot created successfully',
    createVMSnapshotFail: 'Failed to create snapshot',
    rebootSuccess: 'The instance reboot successfully',
    rebootFail: 'Failed to reboot the instance',
    pauseSuccess: 'The instance was suspended successfully',
    pauseFail: 'Instance suspend failed',
    operatorSuccess: 'Successful operation',
    operatorFail: 'operation failed',
    hardRebootVM: 'Hard reboot the instance',
    softRebootVM: 'Soft reboot instance',
    suspendInstance: 'suspend instance',
    resumeInstance: 'restore instance',
    stopInstance: 'close the instance',
    startInstance: 'Rebuild the instance',
    hardRebootVMMessage: 'You have selected"{0}".Please confirm your selection. After restarting the instance will lose all data stored on the persistent storage device.',
    hardRebootVMTitle: 'Confirm Hard reboot the instance',
    softRebootVMTitle: 'Confirm Soft reboot the instance',
    task: 'Task',
    rebootTask: 'restarting...',
    noTask: 'None'
  },
  ...enLocale
}

export default en
