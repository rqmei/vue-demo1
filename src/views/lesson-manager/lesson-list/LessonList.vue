<template>
	<div class="lessonList">
    <h1>课件列表</h1>
    <el-form class="top-search" :model="param" ref="searchValue" label-width="100px">
      <el-form-item label="课件库" >
        <el-select placeholder="请选择课件库" v-model="param.lessonLibraryId" filterable clearable>
          <el-option v-for=" item in lessonLibrary" :key="item.id" :label="item.name" :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属组织">
        <el-input placeholder="" v-model="param.orgId"></el-input>
      </el-form-item>
      <el-form-item label="岗位">
        <el-select placeholder="请选择上级行业" v-model="param.dutyId" filterable clearable>
          <el-option v-for="item in dutyArray" :key="item.code" :value="item.code" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课件类型">
        <el-select v-model="param.lessonTypeId" placeholder="请选择上级行业" filterable clearable>
          <el-option
            v-for="item in lessonTypes"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课件标题">
        <el-input placeholder="" v-model="param.title"></el-input>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input placeholder="" v-model="param.likeCode"></el-input>
      </el-form-item>
      <el-form-item label="课件状态">
        <el-radio-group v-model="param.state">
          <el-radio v-for="item in stateArray" :key="item.id"  :label="item.id">
            {{item.name}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="btn-wrap">
        <el-button type="primary" @click="pageByCondition()">查询</el-button>
        <el-button @click="resetCondition('searchValue')">重置</el-button>
      </div>
    </el-form>
    <ul class="count-list">
      <li>课件总数：521512个</li>
      <li>课件总使用数：51545次</li>
      <li>最新课件数：5155次</li>
      <li>本月更新课件数：5151545次</li>
    </ul>
    <el-button>新增课件</el-button>
    <el-button>新增目录</el-button>
    <el-row>
      <el-col :span="4">
        <el-tree
        ref="treeParam"
        show-checkbox="true"
        :data="paramTree"
        :props="paramTreeProps"
        highlight-current
        check-strictly
        ></el-tree>
      </el-col>
      <el-col :span="20">
        <ul>
          <li v-for="item in listDate" :key="item.cover"  style="height: 300px">
            <ul >
              <li>
                <img :src="item.cover">
                <div class="date">{{item.signDate}}</div>
              </li>
            </ul>
          </li>
        </ul>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="param.currentPage"
          :page-sizes="[2,5,15,30,40,50]"
          :page-size="param.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog title="课件置顶" :visible.sync="lessonTopVisible">
      <el-form :model="formTop">
        <el-form-item label="课件名称">
           {{formTop.title}}
        </el-form-item>
        <el-form-item label="">
          <el-checkbox v-model="formTop.checked">限制置顶时间</el-checkbox>
        </el-form-item>
        <el-form-item label="置顶时间范围" v-if="formTop.checked==true">
          <el-date-picker
          v-model="formTop.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="btn-wrap">
          <el-button @click="lessonTopVisible = false">取 消</el-button>
          <el-button type="primary" @click="lessonTop">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="课件移动" :visible.sync="lessonMoveVisible" >
      <el-form :model="formMove"  >
        <el-form-item label="课件名称"  >
          {{formMove.title}}
        </el-form-item>
        <el-form-item label="课件目录"  >
          <el-input placeholder="" v-model="formMove.catalog"></el-input>
          <el-tree :data="paramTree" :props="paramTreeProps" @node-click="handleNodeClick" ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div class="btn-wrap">
          <el-button @click="lessonMoveVisible = false">取 消</el-button>
          <el-button type="primary" @click="lessonMove">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./LessonList.js">
</script>
<style lang="scss">
.el-input {
  width: 215px;
}
.count-list {
  margin: 38px auto;
  padding: 8px 8px 8px 0px;
  width: 1000px;
  background: #fbfbfd;
  display: flex;
  li {
    text-align: center;
    min-width: 250px;
  }
  }
</style>
