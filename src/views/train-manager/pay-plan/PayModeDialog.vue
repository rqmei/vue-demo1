<template>
	<div>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="30%"
               @close="cancelDone"
    >
      <div style="height: 200px;" v-if="title === '变更付费方式'">
        <el-row style="text-align: center;line-height: 200px; vertical-align: middle">您是否立即将选中的<span style="color: red">{{stuNum}}个学员</span>变更为<span style="color:red;">{{payMode}}</span></el-row>
      </div>
      <div v-else class="pay">
        <span>当前准备支付的学员{{stuNum}}个</span>
        <br>
        <br>
        <el-radio-group v-model="payWay">
          <el-radio :label="1">付费名额</el-radio>
          <el-radio :label="2">付费人次</el-radio>
        </el-radio-group>
        <br>
        <br>
        <span>
          总共需要110个学时当前拥有200个学时
        </span>
      </div>
      <div slot="footer" class="mode-dialog-footer">
          <el-button @click="cancelDone">取 消</el-button>
          <el-button type="primary" @click="sureDone">立即变更</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PayModeDialog',
  data () {
    return {
      visible: this.dialogVisible,
      payWay: 2
    }
  },
  props: {
    payMode: String,
    stuNum: Number,
    dialogVisible: Boolean,
    title: '',
    dialogType: 1 // 1:支付 2：变更付费方式
  },
  methods: {
    sureDone () {
      this.$emit('sure-done', {state: this.visible})
    },
    cancelDone () {
      this.$emit('sure-done', {state: this.visible})
    }
  }
}
</script>

<style lang="scss">
  .pay{
    margin: 50px 30px;
  }
.mode-dialog-footer{
  text-align: right;
  margin-right: 50px;
}
</style>
