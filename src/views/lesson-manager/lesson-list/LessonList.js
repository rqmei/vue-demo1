export default {
  name: 'LessonList',
  data () {
    return {
      param: {
        currentPage: 1,
        pageSize: 5,
        lessonLibraryId: '0',
        lessonTypeId: '0',
        orgId: '',
        dutyId: '',
        title: '',
        likeCode: '', // 关键词
        state: '1'
      },
      lessonLibrary: [{id: '0', name: '所有'}, {id: '1', name: '公共库'}, {id: '2', name: '私有库'}],
      dutyArray: [{id: '1', name: '公家车', 'code': '1'}, {id: '2', name: '货车', 'code': '2'}, {id: '2', name: '客车', 'code': '3'}], // 岗位
      lessonTypes: [{id: '0', name: '所有'}, {id: '1', name: '通用'}, {id: '2', name: '国家法律法规'}, {id: '3', name: '单位文件'}], // 课件分类
      stateArray: [{id: '0', name: '所有'}, {id: '1', name: '置顶'}, {id: '2', name: '最新'}], // 课件状态
      paramTree: [], // todo 暂定为同步
      paramTreeProps: {
        children: 'children',
        label: 'name',
        key: 'id'
      },
      listDate: null,
      total: 10,
      // 课件置顶
      lessonTopVisible: false, // 课件置顶  弹窗
      formTop: {
        lessonTopId: '',
        title: '',
        time: '',
        checked: false
      },
      // 课件移动
      lessonMoveVisible: false, // 课件移动  弹窗
      formMove: {
        lessonMoveId: '',
        title: '',
        catalog: ''
      }
    }
  },
  methods: {
    // 外层列表分页
    pageByCondition () {
    },
    // 重置
    resetCondition (formName) {}
  }
}
