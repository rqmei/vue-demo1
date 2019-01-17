import AppendStudent from '@/views/train-manager/append-student/AppendStudent'
import PayPlan from './pay-plan/PayPlan'
import RepairStudy from '@/views/train-manager/repair-study/RepairStudy'

export default {
  name: 'PlanManager',
  data () {
    return {
      restaurants: [],
      state1: '',
      isShow: true,
      params: {
        orgId: '',
        planTypeId: 1,
        planTemplateId: 3,
        planState: 1,
        planLevel: 1,
        planShow: 1
      },
      // 计划类型
      planType: [
        {
          id: 1,
          name: '所有'
        },
        {
          id: 2,
          name: '安全培训'
        },
        {
          id: 3,
          name: '安全例会'
        }
      ],
      // 计划模板
      planTemplate: [
        {
          id: 1,
          name: '网络学习'
        },
        {
          id: 2,
          name: '网络考试'
        },
        {
          id: 3,
          name: '现场学习'
        },
        {
          id: 4,
          name: '现场考试'
        }
      ],
      dialogVerify: false, // 审核弹框
      verifyState: 2, // 审核状态 1：通过 2：驳回
      dialogTitle: '审核',
      dialogType: 1, // 1：审核弹框 2：删除计划弹框
      dialogAppendStu: false, // 追加弹框
      orgInfos: [],
      dialogPay: false, // 支付计划弹框状态
      plans: [],
      checkPlan: {}, // 当前选择操作的计划
      dialogRepairStudy: false
    }
  },
  components: {
    AppendStudent,
    PayPlan,
    RepairStudy
  },
  computed: {
    totalPage: function () {
      return this.plans.length
    }
  },
  methods: {
    querySearch (queryString, cb) {
      let restaurants = this.loadAll()
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0)
      }
    },
    changeShow () {
      this.isShow = !this.isShow
    },
    // 删除计划
    onDelete () {
      this.dialogVerify = true
      this.dialogType = 2
      this.dialogTitle = '删除计划'
    },
    // 新增计划
    addPlan () {
      this.$router.push('/train/plan/add')
    },
    // 切换计划显示方式（列表、表格）
    changeShowMode (mode) {
      this.params.planShow = mode
    },
    // 点击审核打开相关弹框
    openVerify () {
      this.dialogVerify = true
      this.dialogType = 1
      this.dialogTitle = '审核'
    },
    // 审核弹框
    onDialogVerify (type) {
      this.dialogVerify = false
      if (type === 0) {
        // 取消
      } else if (type === 1) {
        // 确认
        if (this.dialogType === 1) {
          // 审核
        } else if (this.dialogType === 2) {
          // 删除计划
        }
      }
    },
    // 追加学员
    appendStu () {
      this.dialogAppendStu = true
    },
    // 追加学员弹框关闭的回调方法
    sureAppendStuBack (data) {
      this.dialogAppendStu = data.state
      let type = data.type
      if (type === 0) {
        // 关闭
      } else if (type === 1) {
        // 保存
      }
    },
    // 支付计划
    onPayPlan (plan) {
      this.checkPlan = plan
      this.dialogPay = true
    },
    // 支付回调
    surePayBack (data) {
      this.dialogPay = data.state
      let type = data.type
      if (type === 0) {
        // 关闭
      } else if (type === 1) {
        // 保存
      }
    },
    // 补学
    onRepairStudy () {
      this.dialogRepairStudy = true
    },
    // 补学回调
    sureRepairStudyBack (data) {
      this.dialogRepairStudy = data.state
    },
    // 复制计划
    copyPlan (plan) {
      this.$router.push({path: '/train/plan/copy', query: {plan: plan}})
    },
    // 一下是模拟数据
    loadAll () {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角全茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝全兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十三泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨全奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱记', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
        { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    loadOrg () {
      return [
        {
          id: 1,
          orgName: '重庆运管一',
          userName: '张三',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '客运驾驶'
        },
        {
          id: 2,
          orgName: '重庆运管二',
          userName: '李四',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '货运驾驶'
        },
        {
          id: 3,
          orgName: '重庆运管三',
          userName: '王五',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '危运驾驶'
        },
        {
          id: 4,
          orgName: '重庆运管四',
          userName: '赵六',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '危运驾驶'
        },
        {
          id: 5,
          orgName: '重庆运管五',
          userName: '田七',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '客运驾驶'
        },
        {
          id: 6,
          orgName: '重庆运管六',
          userName: '王八',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '货运驾驶'
        },
        {
          id: 7,
          orgName: '重庆运管七',
          userName: '李玖',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '客运驾驶'
        },
        {
          id: 8,
          orgName: '重庆运管八',
          userName: '丽丽',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '客运驾驶'
        },
        {
          id: 9,
          orgName: '重庆运管九',
          userName: '美美',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '客运驾驶'
        },
        {
          id: 10,
          orgName: '重庆运管一',
          userName: '双双',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '客运驾驶'
        },
        {
          id: 11,
          orgName: '重庆运管一',
          userName: '乐乐',
          idCard: '102553748869514335113216',
          orgState: '在职',
          orgPost: '客运驾驶'
        }
      ]
    },
    loadPlans () {
      return [
        {
          id: 1,
          planName: '2019年1月计划',
          planLevel: '监管级',
          effectiveTime: '2019-01-01至2019-02-28',
          planState: '待审核',
          planModel: '现场培训,现场考试',
          totalNum: '100',
          planType: '安全培训',
          tainTime: '180分钟',
          trainNum: '80',
          examNum: '20',
          deleteNum: '2',
          orgName: '重庆替比网络科技有限公司',
          passScore: '90分',
          completedNum: '80',
          passNum: '20',
          quitNum: '2',
          trainRate: '80%',
          examRate: '20%',
          appendNum: '0',
          addStuMode: 1,
          applyPost: '客运。货运、危运',
          completedRate: '80%',
          passRate: '20%'
        },
        {
          id: 2,
          planName: '2019年2月计划',
          planLevel: '企业级',
          effectiveTime: '2019-02-01至2019-05-28',
          planState: '待审核',
          planModel: '现场培训,现场考试',
          totalNum: '100',
          planType: '安全培训',
          tainTime: '100分钟',
          trainNum: '100',
          examNum: '100',
          deleteNum: '0',
          orgName: '重庆替比网络科技有限公司',
          passScore: '90分',
          completedNum: '90',
          passNum: '90',
          quitNum: '0',
          trainRate: '100%',
          examRate: '100%',
          appendNum: '0',
          addStuMode: 2,
          applyPost: '客运。货运、危运',
          completedRate: '90%',
          passRate: '90%'
        }
      ]
    }
  },
  mounted () {
    this.orgInfos = this.loadOrg()
    this.plans = this.loadPlans()
  }
}
