import AddStaff from '@/views/train-manager/add-plan/add-staff/AddStaff'

export default {
  name: 'AddPlan',
  components: {
    AddStaff
  },
  data () {
    return {
      ruleForm: {
        name: '',
        orgName: '重庆运管',
        planCycle: [],
        planCheckbox: [],
        planRadio: 0,
        planType: 3,
        addStuMode: 0, // 添加学员模式；1：任意添加学员；2：按岗位添加学员
        applyPost: '', // 适用岗位
        passSocre: '80', // 合格分数
        isOrder: 2, // 是否按顺序学习
        hourNum: 1, // 学时个数
        trainType: 2, // 培训类型
        orgType: 2, // 组织机构类型
        applyPostCheckbox: [], // 适用岗位
        planLevel: '企业级', // 监管级 或 企业级
        trainAll: false // true 现场和网络培训都必须学习
      },
      dialogAddStaff: false, // 参训员工弹框
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        org: [
          { required: true, message: '请选计划组织', trigger: 'change' }
        ],
        cycle: [
          {required: true, message: '请选计划周期', trigger: 'change'}
        ],
        mode: [
          {required: true}
        ],
        type: [
          {required: true}
        ]
      },
      planCycle: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created: function () {
    let plan = this.$route.query.plan
    if (plan) {
      this.ruleForm.name = '【复制】' + plan.planName
      this.ruleForm.orgName = plan.orgName
      let cycle = plan.effectiveTime.split('至')
      if (cycle.length === 2) {
        this.ruleForm.planCycle = [new Date(cycle[0]), new Date(cycle[1])]
      }
      this.ruleForm.planCheckbox = plan.planModel.split(',')
      this.ruleForm.planRadio = plan.planModel.indexOf('网络考试') !== -1 ? 1 : 2
      let type = plan.planType
      if (type === '安全培训') {
        this.ruleForm.planType = 1
      } else if (type === '上岗培训') {
        this.ruleForm.planType = 2
      } else if (type === '安全例会') {
        this.ruleForm.planType = 3
      }
      this.ruleForm.addStuMode = plan.addStuMode
      this.ruleForm.applyPost = plan.applyPost
      this.ruleForm.passSocre = plan.passScore
      this.ruleForm.planLevel = plan.planLevel
    }
  },
  methods: {
    // 切换学习顺序
    updateTrainOrder () {

    },
    // 选择参加人员
    addStaff () {
      this.dialogAddStaff = true
    }
  }
}
