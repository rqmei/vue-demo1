<template>
  <div>
	<div class="tabs">
    <div class="tab" :class="{'active': currentTab==='tab1'}" @click="toggleTab('tab1')">Tab1</div>
    <div class="tab" :class="{'active': currentTab==='tab2'}" @click="toggleTab('tab2')">Tab2</div>
    <div class="tab" :class="{'active': currentTab==='tab3'}" @click="toggleTab('tab3')">Tab3</div>
  </div>
    <keep-alive>
      <component :is="currentTab"></component>
    </keep-alive>
  </div>
</template>

<script>
var tab1 = {template: '<div>我是主页tab1</div>'}
var tab2 = {template: '<div>我是提交页tab2</div>'}
var tab3 = {template: '<div>我是存档页tab3</div>'}
export default {
  name: 'AllPlan',
  data () {
    return {
      currentTab: 'tab2'
    }
  },
  components: {
    tab1,
    tab2,
    tab3
  },
  methods: {
    toggleTab: function (tabs) {
      this.currentTab = tabs
    }
  }
}
</script>

<style scoped>
  .tabs{
    display: flex;
  }
  .tab{
    flex: 1;
    text-align: center;
    font-size: 28px;
    height: 80px;
    line-height: 80px;
  }
 .active{
    color: #ff4611;
    border-bottom: 2px solid #ff4611;
  }
</style>
