<template>
  <div class="scroll-wrap clearfix">
    <div class="arrow-left fl" @click="toLeft">
      <span class="el-icon-d-arrow-left"></span>
    </div>
    <div class="arrow-right fr" @click="toRight">
      <span class="el-icon-d-arrow-right"></span>
    </div>
    <div class="scroll-container fl" ref="scrollContainer" @wheel.prevent="handleScroll">
      <div class="tab-lists" ref="listWrap" :style="{left: left +'px'}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
const padding = 15 // tag's padding
export default {
  name: 'scrollPane',
  data () {
    return {
      left: 0,
      listWidth: 0,
      containerWidth: 0
    }
  },
  updated () {
    const $container = this.$refs.scrollContainer
    const $list = this.$refs.listWrap
    const $containerWidth = $container.offsetWidth
    const $listWidth = $list.offsetWidth
    this.listWidth = $listWidth
    this.containerWidth = $containerWidth
  },
  methods: {
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $list = this.$refs.listWrap
      const $containerWidth = $container.offsetWidth
      const $listWidth = $list.offsetWidth
      if (eventDelta > 0) {
        this.left = Math.min(0, this.left + eventDelta)
      } else {
        if ($containerWidth < $listWidth) {
          if (this.left < -($listWidth - $containerWidth)) {
            this.left = this.left
          } else {
            this.left = Math.max(this.left + eventDelta, $containerWidth - $listWidth)
          }
        } else {
          this.left = 0
        }
      }
    },
    moveToTarget ($target) {
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      // console.log('targetLeft: '+$targetLeft)
      // console.log('targetWidth: '+$targetWidth)
      if ($targetLeft < -this.left) {
        // tag in the left
        this.left = -$targetLeft + padding
      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + this.containerWidth - padding) {
        // tag in the current view
      } else {
        // tag in the right
        this.left = -($targetLeft - (this.containerWidth - $targetWidth))
      }
    },
    toLeft () {
      this.left = 0
    },
    toRight () {
      this.left = -this.listWidth + this.containerWidth
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .active{
    border-bottom:#000 solid 2px;
  }
  .scroll-wrap{
    position: relative;
    width:100%;
    border:1px solid #f6f6f6;
    box-sizing: border-box;
    padding: 0 40px;
    .arrow-left,.arrow-right{
      position: absolute;
      width: 38px;
      height: 36px;
      line-height: 36px;
      text-align: center;
    }
    .arrow-left{
      left: 0;
    }
    .arrow-right{
      right:0;
    }
  }
  .scroll-container{
    position:relative;
    width:100%;
    height:38px;
    line-height: 38px;
    font-size:14px;
    overflow: hidden;
    .tab-lists{
      position: absolute;
      white-space:nowrap;
    }
    a{
      &:hover{
        border-bottom:#000 solid 2px;
      }
      text-decoration:none;
      box-sizing:border-box;
      display: inline-block;
      height: 38px;
      padding: 0 6px;
      color: #666;
      border-right:1px solid #f6f6f6;
    }
  }
</style>
