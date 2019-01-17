<template>
	<div class="plan-body">
    <h1>当月计划</h1>
    <div class="plan-body-item" v-for="item in plans" :key="item.id">
      <div class="plan-item-left">
        <div class="tag" :class="stateClazz(item.state)">{{getPlanState(item.state)}}</div>
      </div>
      <div class="plan-item-middle">
        <a class="plan-item-title">{{item.planTitle}}</a>
        <div class="plan-item-prop">培训时长：{{item.planHour}}<span>（共{{item.totalTime}}分钟，已学习{{item.studyTime}}分钟）</span></div>
        <div class="plan-item-prop">所属企业：{{item.company}}</div>
        <div class="plan-item-prop">有效时间: {{item.activeTime}}</div>
      </div>
      <div class="plan-item-right">
        <a class="btn btn-plan plan-item-btn" href="/user/home?userTrainId=1641809">去学习</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentPlan',
  data () {
    return {
      plans: [
        {
          id: 1,
          planTitle: '12月份培训计划一',
          planHour: '1学时',
          totalTime: '45',
          studyTime: '2',
          company: '新欣安全企业-本部',
          activeTime: '2018年12月03日 - 2018年12月31日',
          state: 1
        },
        {
          id: 2,
          planTitle: '12月份培训计划二',
          planHour: '2学时',
          totalTime: '90',
          studyTime: '45',
          company: '新欣安全企业-分校',
          activeTime: '2018年12月15日 - 2018年12月31日',
          state: 2
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    getPlanState: function (state) {
      let str = ''
      if (state === 2) {
        str = '待付款'
      }
      if (state === 1) {
        str = '学习中'
      }
      return str
    },
    stateClazz: function (state) {
      let clazz = 'state-study'
      if (state === 2) {
        clazz = 'state-pay'
      }
      return clazz
    }
  }
}
</script>

<style lang="scss">
  $plan-item-left-bg:#0b9ae0;
.plan-body {
  position: relative;
  width: 1000px;
  margin: 0 auto;
  h1{
    color: #00abd8;
    text-align: center;
    font-weight: 500;
    font-size: 2.4em;
    padding-bottom: 40px;
  }
  .plan-body-item {
    position: relative;
    background-color: white;
    border: 1px solid #dddddd;
    padding: 30px;
    .plan-item-left {
      position: absolute;
      width: 50px;
      top: 30px;
      bottom: 0;
      left: 30px;
      .tag {
        display: inline-block;
        position: relative;
        width: 32px;
        min-height: 60px;
        color: #fff;
        text-align: center;
        font-size: 16px;
        padding: 5px 1px;
        box-sizing: border-box;
        margin-bottom: 20px;
      }
      .state-pay{
        $plan-item-left-bg: #E0B453;
        background-color: #E0B453;
      }
      .state-study{
        $plan-item-left-bg:#0b9ae0;
        background-color: #0b9ae0;
      }
      /*选择器在被选元素的内容前面插入内容。*/
      .tag:before {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        border-top: 16px solid;
        border-right: 16px solid transparent;
        border-top-color: #81e059;
      }
      /*选择器在被选元素的内容后面插入内容。*/
      .tag:after {
        content: '';
        position: absolute;
        top: 100%;
        right: 0;
        border-top: 16px solid;
        border-left: 16px solid transparent;
        border-top-color: #81e059;
      }
    }
    .plan-item-middle {
      position: relative;
      width: 100%;
      padding-left: 50px;
      padding-right: 120px;
      box-sizing: border-box;
      .plan-item-title{
        font-weight: bolder;
        font-size: 1.2em;
        display: block;
      }
      .plan-item-prop{
        color: #666666;
        margin-top: 12px;
        span{
          color: #00abd8;
        }
      }
    }
    .plan-item-right{
      position: absolute;
      width: 120px;
      height: 35px;
      right: 30px;
      bottom: 30px;
      text-align: center;
      a{
        display: inline-block;
        width: 100%;
        background-color: #00abd8;
        border-radius: 5px;
        color: white;
        text-decoration: none;
        vertical-align: middle;
        line-height: 35px;
      }
      a:hover{
        background-color: darkcyan;
      }
    }
  }
}
</style>
