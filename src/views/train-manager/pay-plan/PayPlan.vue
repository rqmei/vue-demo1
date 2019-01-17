<template>
	<div class="pay-plan">
    <el-dialog :visible.sync="dialogVisible" @close="cancleDone" title="支付">
      <el-form label-width="100px" ref="form" style="margin-top: 10px">
        <el-row type="flex">
          <el-form-item label="学员">
            <el-input clearable placeholder="请输入姓名/身份证号"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit" style="height: 33px;margin-left: 20px">查询</el-button>
        </el-row>
        <el-form-item>
          <el-form label-width="200px" class="plan-infos">
            <el-form-item :label="plan.planName" class="plan-info"></el-form-item>
            <el-form-item label="学员总数：" class="plan-info"><span>{{plan.totalNum}}人</span></el-form-item>
            <el-row type="flex">
              <el-form-item label="企业付费总人数：" class="plan-info"><span>50人</span></el-form-item>
              <el-form-item label="剩余学时：" class="plan-info"><span>99学时</span></el-form-item>
              <el-form-item label="个人付费总人数：" class="plan-info"><span>50人</span></el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="企业付费已付人数：" class="plan-info"><span>50人</span></el-form-item>
              <el-form-item label="剩余人次：" class="plan-info"><span>99学时</span></el-form-item>
              <el-form-item label="个人付费已付人数：" class="plan-info"><span>50人</span></el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="企业付费未付人数：" class="plan-info"><span>50人</span></el-form-item>
              <el-form-item  style="width: 245px"></el-form-item>
              <el-form-item label="个人付费未付人数：" class="plan-info"><span>50人</span></el-form-item>
            </el-row>
          </el-form>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button class="pay-mode" @click="onPay(1)">全部支付</el-button>
            <el-button class="pay-mode" @click="onPay(2)">支付</el-button>
            <el-button class="pay-mode" @click="onPay(3)">全部变更</el-button>
            <el-button class="pay-mode" @click="onPay(4)">变更</el-button>
            <el-button class="pay-mode" @click="onRefreshData">刷新数据</el-button>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="payDetail">
            <el-radio-button label="1">企业未付(10)</el-radio-button>
            <el-radio-button label="2">企业已付(10)</el-radio-button>
            <el-radio-button label="3">个人未付(10)</el-radio-button>
            <el-radio-button label="4">个人已付(10)</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-table :data="tabls">
        <el-table-column
          v-if="isPay"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          label="学员姓名"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="身份证号"
          prop="idCard"
        ></el-table-column>
        <el-table-column
          label="付费模式"
          prop="payMode"
        ></el-table-column>
        <el-table-column
          label="变更时间"
          prop="updateTime"
        ></el-table-column>
        <el-table-column
          label="操作"
        >
          <template slot-scope="scope" v-if="isPay">
            <el-button
              @click.native.prevent="payRow(scope.$index, tabls)"
              type="text"
              size="small">
              支付
            </el-button>
            <el-button
              @click.native.prevent="changeModeRow(scope.$index, tabls)"
              type="text"
              size="small">
              变更付费模式
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        prev-text="上一页"
        next-text="下一页"
        layout="total, sizes,prev, pager, next, jumper"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="tabls.length"
        @current-change="current_change"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancleDone">取消</el-button>
        <el-button  @click="sureDone">确定</el-button>
      </div>
    </el-dialog>
    <PayModeDialog :title="title" :dialogVisible="dialogPayMode" :stuNum="stuNum" :payMode="payMode" @sure-done="sureChangeModeBack"></PayModeDialog>
  </div>
</template>

<script>
import PayModeDialog from './PayModeDialog'

export default {
  name: 'PayPlan',
  components: {
    PayModeDialog
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    plan: {}
  },
  data () {
    return {
      visible: this.dialogVisible,
      payDetail: '1',
      pageSize: 11, // 每页显示条数
      currentPage: 1, // 当前页面
      dialogPayMode: false, // 变更付费方式
      title: '变更付费方式',
      payMode: '企业付费',
      stuNum: 55,
      tabls: [
        {
          name: '张三',
          idCard: '52201233665444578659',
          payMode: '个人付费',
          updateTime: '2018-12-48'
        }
      ]
    }
  },
  computed: {
    isPay () {
      let pay = false
      if (this.payDetail === '1' || this.payDetail === '3') {
        pay = true
      }
      return pay
    }
  },
  methods: {
    // 支付相关操作
    onPay (type) {
      if (type === 1) {
        // 全部支付
        this.title = '支付-' + this.payMode
        this.dialogPayMode = true
      } else if (type === 2) {
        // 支付
        this.title = '支付-' + this.payMode
        this.dialogPayMode = true
      } else if (type === 3) {
        // 全部变更
        this.dialogPayMode = true
        this.title = '变更付费方式'
      } else if (type === 4) {
        // 变更
        this.dialogPayMode = true
        this.title = '变更付费方式'
      }
    },
    sureChangeModeBack (data) {
      this.dialogPayMode = data.state
    },
    onRefreshData () {
      // 刷新数据
    },
    /**
     * 表格中操作 支付
     * @param index 表格中所在的下标
     * @param rows 表格绑定的数据
      */
    payRow (index, rows) {
      this.payMode = rows[index].payMode
      this.title = '支付-' + this.payMode
      this.dialogPayMode = true
      this.stuNum = 1
    },
    // 操作模式==》变更支付模式
    changeModeRow (index, rows) {
      this.payMode = rows[index].payMode
      this.dialogPayMode = true
      this.title = '变更付费方式'
      this.stuNum = 1
    },
    cancleDone () {
      // 取消
      this.$emit('sure-done', {state: this.visible, type: 0})
    },
    sureDone () {
      // 确定
      this.$emit('sure-done', {state: this.visible, type: 1})
    }
  }
}
</script>

<style lang="scss">
  .pay-plan {
      .el-form {
        .plan-infos {
          background-color: #b3b3b3;
          width: 800px;
          .plan-info {
            margin-bottom: 0px;
            font-size: 16px;
            .el-form-item__label, .el-form-item__content {
              line-height: 16px;
            }
            span {
              width: 150px;
            }
          }
        }
        .pay-mode{
          width: 88px;
        }
        .el-radio-button__orig-radio:checked+.el-radio-button__inner{
          background-color: #b3b3b3;
          border-color: #b3b3b3;
          color: #585858;
          -webkit-box-shadow:-1px 0 0 0 #585858;
          box-shadow: -1px 0 0 0 #585858;
        }
      }
    .dialog-footer{
      text-align: right;
      margin-right: 200px;
    }
  }
</style>
