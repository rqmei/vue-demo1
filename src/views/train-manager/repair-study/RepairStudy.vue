<template>
	<div>
    <el-dialog title="补学" :visible.sync="dialogVisible" @close="cancleDone">
      <div>
        <h4>延长补学时间</h4>
        <el-row type="flex" class="title-row">
          <span>快速选择</span>
          <div v-for="item in quickChoiceTime" :key="item">
            <span class="quick-choice-btn">{{item}}</span>
          </div>
        </el-row>
        <el-row type="flex" class="title-row">
          <span class="title">补学周期</span>
          <el-date-picker
            v-model="repairStudyCycle"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-row>
        <h4>补学名单</h4>
        <el-table :data="repairStus" stripe>
          <el-table-column
          label="学员姓名"
          ></el-table-column>
          <el-table-column
            label="身份证号"
          ></el-table-column>
          <el-table-column
            label="付费模式"
          ></el-table-column>
          <el-table-column
            label="补学周期"
          ></el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="total,prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="repairStus.length"
        @current-change="current_change"
      ></el-pagination>
      <div slot="footer" class="repair-dialog-footer">
        <el-button  @click="cancleDone">取消</el-button>
        <el-button type="primary" @click="sureDone">确定</el-button>
        <el-button type="primary" @click="onUseNewPlan">使用新计划补学</el-button>
        <el-button type="primary" icon="el-icon-question" circle></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RepairStudy',
  data () {
    return {
      visible: this.dialogVisible,
      pageSize: 11, // 每页显示条数
      currentPage: 1, // 当前页面
      quickChoiceTime: ['10天', '20天', '1个月', '2个月', '3个月'],
      repairStudyCycle: '', // 补学周期
      repairStus: [] // 补学名单 数据集合
    }
  },
  props: {
    dialogVisible: Boolean
  },
  methods: {
    cancleDone () {
      this.$emit('sure-done', {state: this.visible})
    },
    sureDone () {
      this.$emit('sure-done', {state: this.visible})
    },
    // 使用新计划补学
    onUseNewPlan () {
      this.$router.push('/train/plan/add')
    }
  }
}
</script>

<style lang="scss">
  .title-row{
    margin-top: 20px;
    .title{
      margin-right: 10px;
    }
  }
.quick-choice-btn{
  background-color: #d6d6d6;
  margin-left: 10px;
  border-radius: 2px;
  padding: 1px 5px;
}
</style>
