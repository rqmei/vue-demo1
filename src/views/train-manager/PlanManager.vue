<template>
  <div class="plan-list">
    <el-form :model="params" ref="from" label-width="100px">
      <div style="display: flex">
        <el-form-item label="计划名称">
          <el-autocomplete    v-model="state1" :fetch-suggestions="querySearch"   :trigger-on-focus="false" placeholder="请输入计划名称"></el-autocomplete>
        </el-form-item>
        <el-form-item label="所属组织">
          <el-select v-model="params.orgId" filterable placeholder="请选择当前组织">
          </el-select>
        </el-form-item>
        <el-form-item label="计划类型">
          <el-select v-model="params.planTypeId" filterable placeholder="请选择计划类型">
            <el-option v-for="item in planType" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div style="display: flex">
        <el-form-item label="参加岗位">
          <el-select filterable placeholder="请选择岗位"></el-select>
        </el-form-item>
        <el-form-item label="计划模块">
          <el-select filterable placeholder="请选择计划模块" v-model="params.planTemplateId">
            <el-option v-for="item in planTemplate" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间">
          <el-date-picker
            type="daterange"
            align="center"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </div>
      <transition name="plan-query">
        <div v-if="isShow" class="plan-query">
          <el-form-item label="计划状态" >
            <el-radio-group v-model="params.planState">
              <el-radio :label="1">所有</el-radio>
              <el-radio :label="2">草稿</el-radio>
              <el-radio :label="3">进行中</el-radio>
              <el-radio :label="4">审核驳回</el-radio>
              <el-radio :label="5">审核通过</el-radio>
              <el-radio :label="6">完成</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="计划级别">
            <el-radio-group v-model="params.planLevel">
              <el-radio :label="1">所有</el-radio>
              <el-radio :label="2">企业级</el-radio>
              <el-radio :label="3">监管级</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </transition>
      <el-form-item class="change-query-state">
        <div class="query-state">
          <el-button  type="primary" plain>详细</el-button>
          <el-button  type="primary" >查询</el-button>
          <el-button  type="primary" plain>重置</el-button>
          <span @click="changeShow" class="show-change-query" style="color: #409EFF">{{isShow? '隐藏查询' : '展开查询'}}<i :class="isShow?'el-icon-arrow-up':'el-icon-arrow-down'"></i></span>
        </div>
      </el-form-item>
    </el-form>
      <el-button style="margin-left: 32px" @click="addPlan">新增</el-button>
    <div class="show-style">
      <el-button-group >
        <el-button  plain @click="changeShowMode(2)">列表展示</el-button>
        <el-button  plain autofocus  @click="changeShowMode(1)">表格展示</el-button>
      </el-button-group>
    </div>
    <el-table  :data="plans" stripe style="width: 100%" v-if="params.planShow === 1">
      <el-table-column label="计划名称" prop="planName"></el-table-column>
      <el-table-column label="所属组织" prop="orgName"></el-table-column>
      <el-table-column label="计划类型" prop="planType"></el-table-column>
      <el-table-column label="计划模式" prop="planModel"></el-table-column>
      <el-table-column label="参加岗位" prop="applyPost"></el-table-column>
      <el-table-column label="计划状态" prop="planState"></el-table-column>
      <el-table-column label="计划周期" prop="effectiveTime"></el-table-column>
      <el-table-column label="操作" style="height: 200px">
        <el-row slot-scope="scope" type="flex">
          <el-button type="text">详情</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text" @click="appendStu">追加</el-button>
          <el-col class="el-dropdown-more">
            <el-dropdown placement="bottom-start">
            <span >
                更多<i class="el-icon-caret-bottom"></i>
             </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="openVerify">审核</el-dropdown-item>
              <el-dropdown-item @click.native="onPayPlan(plans[scope.$index])">支付</el-dropdown-item>
              <el-dropdown-item @click.native="onRepairStudy">补学</el-dropdown-item>
              <el-dropdown-item @click.native="copyPlan(plans[scope.$index])">复制</el-dropdown-item>
              <el-dropdown-item >现场培训记录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </el-col>
        </el-row>
      </el-table-column>
    </el-table>
    <el-card shadow="never" v-else-if="params.planShow === 2" v-for="item in plans" :key="item.id">
      <el-row type="felx">
        <el-col :span="1">
        <span >序号：{{item.id}}</span>
        </el-col>
        <el-col :span="21" style="text-align: right;margin-right: 50px;color: #b3b3b3">
           <span>起止时间：{{item.effectiveTime}}</span>
        </el-col>
        <el-col :span="1" style="text-align: right">
          <span style="background-color: #00abd8;color: white;padding-left: 5px;padding-right: 5px">{{item.planState}}</span>
        </el-col>
      </el-row>
      <el-row>
        <div class="first">
          <span>计划名称：{{item.planName}}</span>
          <span class="card-level">{{item.planLevel}}</span>
        </div>
        <span class="two">{{item.planModel}}</span>
        <span class="three">总学员数：{{item.totalNum}}</span>
      </el-row>
      <el-row>
        <span class="first">计划类型：{{item.planType}}</span>
        <span class="two">培训时长：{{item.tainTime}}</span>
        <span class="three">参训人数：{{item.trainNum}}</span>
        <span class="three">参考人数：{{item.examNum}}</span>
        <span class="three">移除人数：{{item.deleteNum}}</span>
      </el-row>
      <el-row>
        <span class="first">发布组织：{{item.orgName}}</span>
        <span class="two">合格分数：{{item.passScore}}</span>
        <span class="three">培训完成人数：{{item.completedNum}}</span>
        <span class="three">考试通过人数：{{passNum}}</span>
        <span class="three">离职人数：{{item.quitNum}}</span>
      </el-row>
      <el-row>
        <span class="first">实用岗位：{{item.applyPost}}</span>
        <span class="two"></span>
        <span class="three">参训率：{{item.trainRate}}</span>
        <span class="three">参考率：{{item.examRate}}</span>
        <span class="three">追加人数：{{item.appendNum}}</span>
      </el-row>
      <el-row class="last-row">
        <span class="first"></span>
        <span class="two"></span>
        <span class="three">培训完成率：{{item.completedRate}}</span>
        <span class="three">考试通过率：{{item.passRate}}</span>
      </el-row>
      <div class="card-btns">
        <el-button>详情</el-button>
        <el-button>编辑</el-button>
        <el-button @click="openVerify">审核</el-button>
        <el-button @click="onPayPlan(item)">支付</el-button>
        <el-button @click="appendStu">追加</el-button>
        <el-button @click="copyPlan(item)">复制</el-button>
        <el-button @click="onRepairStudy">补学</el-button>
        <el-button @click="onDelete">删除</el-button>
      </div>
    </el-card>
    <el-pagination
      :total="totalPage"
      :page-sizes="[5,10,20,40,50,100]"
      layout="total, sizes, prev, pager, next, jumper"
      background
      class="center-pagination"
    ></el-pagination>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVerify"
      width="30%"
    >
      <div class="dialog-verify">
        <el-row type="flex" class="verify-state" v-if="dialogType === 1">
          <el-col :span="2">
            <span>状态</span>
          </el-col>
          <el-col>
            <el-radio-group v-model="verifyState">
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">驳回</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="verify-state" v-if="dialogType === 2"><span>删除计划后，该计划将无效，是否确认？</span></el-row>
        <el-row type="flex" class="verify-content">
          <el-col :span="3">
          <span>* 备注</span>
          </el-col>
          <el-col>
          <el-input type="textarea" placeholder="备注"  :rows="5"></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onDialogVerify(0)">取 消</el-button>
        <el-button type="primary" @click="onDialogVerify(1)">确 定</el-button>
      </div>
    </el-dialog>
    <AppendStudent :dialogVisible="dialogAppendStu" :orgInfos="orgInfos" @sure-done="sureAppendStuBack"></AppendStudent>
    <PayPlan :dialogVisible="dialogPay" :plan="checkPlan" @sure-done="surePayBack"></PayPlan>
    <RepairStudy :dialogVisible="dialogRepairStudy" @sure-done="sureRepairStudyBack"></RepairStudy>
  </div>
</template>

<script src="./PlanManager.js">
</script>

<style lang="scss" src="./PlanManager.scss">

</style>
