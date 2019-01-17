<template>
    <el-container style="position: fixed; height: 100%;width: 100%">
      <el-header class="nav-header">
        <el-row class="nav-blue" type="flex">
          <el-col class="user-welcome">
            <span>欢迎访问&nbsp;安全教育</span>
          </el-col>
          <el-col class="user-info">
            <span>
              <a>{{this.$route.params.username}},您好</a>
              <a>
              <i style="margin: 0px 10px">
               <img src="http://static.safe.jsyxx.cn/img/user/head-user-icon.png" width="20" height="21">
                个人中心
              </i>
              </a>
              |
              <a>
                <i style="margin: 0px 10px">
                  <img src="http://static.safe.jsyxx.cn/img/user/mailer.png" width="20" height="21" style="margin-right: 10px">
                  消息公告
                </i>
              </a>
              <a style="text-decoration: underline">退出</a>
            </span>
          </el-col>
        </el-row>
        <el-row class="nav-bar" type="flex">
          <el-col class="nav-bar-logo-img">
            <img src="http://static.safe.jsyxx.cn/img/user/user-logo.png" width="162" height="50" alt="首页" title="首页">
          </el-col>
          <el-col class="nav-bar-nav">
            <span>全部计划（<a href="/#/plan/all" @click="change(1)" :class="flag==1?'active':''">全部</a>&nbsp;|&nbsp;<a href="/#/plan/current" @click="change(2)" :class="flag==2?'active':''">当月</a>）</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main >
        <ul class="contact-wrap">
          <li class="show-button">
            <img src="http://static.safe.jsyxx.cn/img/online/server-icon.png">
            <p>智能客服</p>
          </li>
          <li class="line"></li>
          <li class="show-button" @mouseenter="enter()" @mouseleave="leave()">
            <img src="http://static.safe.jsyxx.cn/img/online/server-icon.png">
            <p>在线咨询</p>
            <ul class="hide-content" v-if="showOnline">
              <li>
                <a href="tencent://Message/?Uin=3064296508&amp;websiteName=3064296508=&amp;Menu=yes">
                  <img src="http://static.safe.jsyxx.cn/img/online/qq-icon-02.png" alt="">
                  <p>客服一</p>
                </a>
              </li>
              <li>
                <a href="tencent://Message/?Uin=3383668812&amp;websiteName=3383668812=&amp;Menu=yes">
                  <img src="http://static.safe.jsyxx.cn/img/online/qq-icon-02.png" alt="">
                  <p>客服二</p>
                </a>
              </li>
              <li>
                <a href="tencent://Message/?Uin=2731722676&amp;websiteName=2731722676=&amp;Menu=yes">
                  <img src="http://static.safe.jsyxx.cn/img/online/qq-icon-02.png" alt="">
                  <p>客服三</p>
                </a>
              </li>
            </ul>
          </li>
          <li class="line"></li>
          <el-popover
            placement="left-start"
            visible-arrow
            width="200"
            trigger="hover"
           >
            <p style="margin-left: 16px">咨询电话：400-88-4020<br/><br/>8:00-21:00(周一至周五)<br/><br/>9:00-17:30(周六至周天)</p>
            <li class="show-button" slot="reference">
              <img src="http://static.safe.jsyxx.cn/img/online/phone-icon.png">
              <p>客服电话</p>
            </li>
          </el-popover>
          <li class="line"></li>
          <el-popover
            placement="left-start"
            visible-arrow
            width="100"
            trigger="hover"
          >
            <img src="http://static.safe.jsyxx.cn/img/online/qrcode-img.png" alt="" style="margin-left: 10px">
            <li class="show-button" slot="reference">
              <img src="http://static.safe.jsyxx.cn/img/online/qrcode-icon.png">
              <p>扫一扫</p>
            </li>
          </el-popover>
          <li class="line"></li>
          <li class="show-button" >
            <img src="http://static.safe.jsyxx.cn/img/online/guide-icon.png">
            <p>操作指南</p>
          </li>
        </ul>
        <Main></Main>
      </el-main>
      <el-footer>
        <p>
          渝ICP备12005602号 <br> Copyright @2017 safe.jsyxx.cn All Rights Reserved
        </p>
      </el-footer>
    </el-container>
</template>
<script src="./User.js">
</script>

<style lang="scss" src="./User.scss">

</style>
