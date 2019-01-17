<template>
	<div class="plan-add">
    <el-form :model="ruleForm" :rules="rules" label-width="100px">
      <h4>计划基本信息</h4>
      <div class="plan-info">
        <el-form-item label="计划名称" prop="name">
          <el-row type="flex">
          <el-input v-model="ruleForm.name" placeholder="请输入计划名称" class="plan-name"></el-input>
          <span>温馨提示：计划名称以日期+计划类型</span>
          </el-row>
        </el-form-item>
        <el-form-item label="所属组织" prop="org">
          <el-row type="flex">
          <span>{{ruleForm.orgName}}</span>
            <el-button type="text" class="btn-org">选择组织</el-button>
          </el-row>
        </el-form-item>
        <el-form-item label="计划周期" prop="cycle">
          <el-date-picker
            type="daterange"
            align="center"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="planCycle"
            v-model="ruleForm.planCycle"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="计划模式" prop="mode" class="plan-mode">
          <el-row type="flex">
            <el-checkbox-group v-model="ruleForm.planCheckbox">
              <el-checkbox label="现场培训"></el-checkbox>
              <el-checkbox label="网络培训"></el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-model="ruleForm.planRadio" >
              <el-radio :label="1">网络考试</el-radio>
              <el-radio :label="2">现场考试</el-radio>
            </el-radio-group>
          </el-row>
        </el-form-item>
        <el-form-item label="计划类型" prop="type">
          <el-radio-group v-model="ruleForm.planType">
            <el-radio :label="1">安全培训</el-radio>
            <el-radio :label="2">上岗培训</el-radio>
            <el-radio :label="3">安全例会</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <h4> 参加人员</h4>
      <div>
        <el-form-item>
          <el-radio-group v-model="ruleForm.addStuMode" >
            <el-radio :label="1">任意添加学员</el-radio>
            <el-radio :label="2">按岗位添加学员</el-radio>
          </el-radio-group>
          <span class="tips">任意添加学员, 可以添加任意学员, 由学员决定岗位; 按岗位添加, 仅可以添加相应岗位的学员</span>
        </el-form-item>
        <el-form-item label="适用岗位" prop="name">
          <el-row type="flex">
            <span>{{ruleForm.applyPost}}</span>
            <el-button type="text" class="btn-org">选择参加岗位</el-button>
            <span class="tips">当主动选择了添加岗位之后, 不能添加其它岗位学员</span>
          </el-row>
        </el-form-item>
        <el-form-item label="参加学员" prop="name">
          <el-row type="flex">
            <span>张三, 李四, 王麻子,张三, 李四, 王麻子,张三, 李四等27人</span>
            <el-button type="text" class="btn-org" @click="addStaff">选择参加人员</el-button>
          </el-row>
        </el-form-item>
      </div>
      <h4 v-if="ruleForm.planLevel === '监管级'">参训组织</h4>
      <div v-if="ruleForm.planLevel === '监管级'">
        <el-form-item label="培训类别" prop="type">
          <el-radio-group v-model="ruleForm.trainType">
            <el-radio :label="1">初陪</el-radio>
            <el-radio :label="2">复训</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组织类型" prop="type">
          <el-radio-group v-model="ruleForm.orgType">
            <el-radio :label="1">企业</el-radio>
            <el-radio :label="2">机构</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="培训行业" prop="type">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="适用岗位" prop="type">
          <el-checkbox-group v-model="ruleForm.applyPostCheckbox">
            <el-checkbox :label="1">安全管理人员</el-checkbox>
            <el-checkbox :label="2">企业负责人</el-checkbox>
            <el-checkbox :label="3">客运驾驶员</el-checkbox>
            <el-checkbox :label="4">货运驾驶员</el-checkbox>
            <el-checkbox :label="5">危运驾驶员</el-checkbox>
            <el-checkbox :label="6">出租车驾驶员</el-checkbox>
            <el-checkbox :label="7">客运驾驶员</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="参加机构" prop="type">
          <el-row type="flex">
            <span>重庆替比运输公司 等8家企业</span>
            <el-button type="text" class="btn-org">选择参加组织</el-button>
          </el-row>
        </el-form-item>
      </div>
      <h4>监督人信息</h4>
      <div>
        <el-form-item label="安全管理员" prop="name">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="监考人员" prop="name">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="授课人" >
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="考核人员" >
          <el-select></el-select>
        </el-form-item>
      </div>
      <h4>培训信息</h4>
      <div>
        <el-form-item label="其他设置">
          <el-row type="flex">
            <el-checkbox v-model="ruleForm.trainAll">现场和网络培训都必须学习</el-checkbox>
            <span class="tips">即现场培训和网络培训, 都按学时参加培训, 否则无效</span>
          </el-row>
          <el-radio-group v-model="ruleForm.isOrder" v-if="ruleForm.trainAll">
            <el-radio :label="1">不按顺序学习</el-radio>
            <el-radio :label="2">按顺序学习</el-radio>
          </el-radio-group>
          <el-row type="flex" class="change-order" v-if="ruleForm.isOrder === 2 && ruleForm.trainAll">
            <el-button type="text" @click="updateTrainOrder">切换顺序</el-button>
            <span class="tips">当前顺序: 现场培训, 网络培训</span>
          </el-row>
        </el-form-item>
      </div>
      <h4>现场培训</h4>
      <div>
        <el-form-item label="学时个数" prop="name">
          <el-input-number :min="0" :step="0.5" v-model="ruleForm.hourNum"></el-input-number>
          <span class="tips">您选择了{{ruleForm.hourNum}}个学时，共{{ruleForm.hourNum*60}}分钟</span>
          <span class="tips">当前每个学时60分钟</span>
        </el-form-item>
        <el-form-item label="培训课程" prop="name">
          <el-row type="flex" >
            <div style="height: 130px">
              <span>课件时长：50分钟</span>
              <span class="tips">课件格式：音频、视频</span>
              <el-button type="text" style="margin-left: 80px">选择课件</el-button>
              <br>
              <div style="width: 300px">
                <span >第一章等25个课程;水电费卡时间段浩丰科技阿萨德的说法是的发送到是打发士大夫是的罚款水电费健康时间都很好看手机电话费</span>
              </div>
            </div>
            <span style="margin-left: 60px;line-height: 130px;vertical-align: middle">课件只能选择音频或视频格式的进行培训</span>
          </el-row>
        </el-form-item>
        <el-form-item label="培训教室">
          <el-select></el-select>
        </el-form-item>
      </div>
      <h4>网络培训</h4>
      <div>
        <el-form-item label="学时个数" prop="name">
          <el-input-number :min="0" :step="0.5" v-model="ruleForm.hourNum"></el-input-number>
          <span class="tips">您选择了{{ruleForm.hourNum}}个学时，共{{ruleForm.hourNum*60}}分钟</span>
          <span class="tips">当前每个学时60分钟</span>
        </el-form-item>
        <el-form-item label="培训课程" prop="name">
          <el-row type="flex" >
            <div style="height: 130px">
              <span>课件时长：50分钟</span>
              <span class="tips">课件格式：音频、视频</span>
              <el-button type="text" style="margin-left: 80px">选择课件</el-button>
              <br>
              <div style="width: 300px">
                <span >第一章等25个课程;水电费卡时间段浩丰科技阿萨德的说法是的发送到是打发士大夫是的罚款水电费健康时间都很好看手机电话费</span>
              </div>
            </div>
            <span style="margin-left: 60px;line-height: 130px;vertical-align: middle">课件只能选择音频或视频格式的进行培训</span>
          </el-row>
        </el-form-item>
      </div>
      <h4>考试信息</h4>
      <div>
        <el-form-item label="考试条件">
          <span>学时完成</span>
        </el-form-item>
        <el-form-item label="考试试卷">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="考试信息">
          <el-row type="flex">
            <span>试卷名称： XXXX</span>
            <span style="margin-left: 100px">满分分数： 100分</span>
          </el-row>
          <el-row type="flex">
            <span>考试时长： XXXX</span>
            <span style="margin-left: 100px">合格分数： {{ruleForm.passSocre}}</span>
          </el-row>
          <el-row type="flex">
            <span>题目数量： 100题</span>
          </el-row>
        </el-form-item>
        <el-form-item label="考试规则">
          <span>考试次数限制：无限制</span>
          <br>
          <span>是否随时补考：否 </span>
          <br>
          <span>当场补考次数：1次</span>
          <br>
          <span style="margin-left: 28px">补考间隔：12小时</span>
        </el-form-item>
        <el-form-item label="考试教室">
          <el-select></el-select>
        </el-form-item>
      </div>
    </el-form>
    <div class="btns">
      <el-button>保存</el-button>
      <el-button>重置</el-button>
      <el-button>关闭</el-button>
    </div>
    <AddStaff :dialogVisible="dialogAddStaff"></AddStaff>
  </div>
</template>

<script src="./AddPlan.js">

</script>

<style lang="scss" src="./AddPlan.scss">

</style>
