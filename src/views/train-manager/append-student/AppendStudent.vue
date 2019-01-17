<template>
	<div>
    <el-dialog :visible.sync="dialogVisible" @close="cancleDone" title="追加学员">
      <el-container>
        <el-aside style="width: 50%">
          <div class="left">
            <el-form label-width="70px" :inline="true">
              <el-form-item label="所属组织">
                <el-select v-model="defaultOrg">
                </el-select>
              </el-form-item>
              <el-form-item label="综合查询">
                <el-input placeholder="请输入姓名/身份证号" clearable class="query"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table stripe
                      tooltip-effect="dark"
                      ref="orgTable"
                      :data="orgInfos"
                      @select-all="handleSelectAll"
                      @select="handleCurrentChange"
            >
              <el-table-column
                type="selection"
                width="55"
              >
              </el-table-column>
              <el-table-column
                label="组织名称"
                prop="orgName"
              ></el-table-column>
              <el-table-column
                label="姓名"
                prop="userName"
              ></el-table-column>
              <el-table-column
                label="身份证号码"
                prop="idCard"
              ></el-table-column>
              <el-table-column
                label="状态"
                prop="orgState"
              ></el-table-column>
              <el-table-column
                label="当前岗位"
                prop="orgPost"
              ></el-table-column>
            </el-table>
            <el-pagination
              background
              prev-text="上一页"
              next-text="下一页"
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :current-page="currentPage"
              :total="getOrgSize"
              @current-change="current_change"
            ></el-pagination>
          </div>
        </el-aside>
        <el-main style="width: 50%">
          <el-card shadow="never">
            <h4>已选中的学员统计</h4>
            <div v-for="item in getDataCount" :key="item.orgName" style="display: inline-block">
              <div style="margin-right: 20px">
              <span>{{item.orgName}}: {{item.count}}</span>
              </div>
            </div>
          </el-card>
          <el-card shadow="never">
            <el-row>
              <span>已选择学员：{{selectData.length}}</span>
              <el-button type="text" @click="clearSelect">全部清除</el-button>
            </el-row>
            <div v-for="item in selectData" :key="item.id" style="display: inline-block">
              <el-button type="info" size="mini" style="margin: 5px" @click="cancleSelect(item)">{{item.userName}}<i class="el-icon-close"></i></el-button>
            </div>
          </el-card>
        </el-main>
      </el-container>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveDone">保存</el-button>
        <el-button  @click="cancleDone">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppendStudent',
  props: {
    dialogVisible: {
      type: Boolean
    },
    orgInfos: {
      type: Array
    }
  },
  data () {
    return {
      visible: this.dialogVisible, // 当前页面弹框的状态
      pageSize: 11, // 每页显示条数
      currentPage: 1, // 当前页面
      selectData: [], // 选中的table 数据
      dataCoun: [], // 数据统计
      slelectOrgs: {
        orgs: []
      },
      defaultOrg: ''
    }
  },
  methods: {
    // 保存
    saveDone () {
      this.$emit('sure-done', {state: this.visible, type: 1})
    },
    // 关闭
    cancleDone () {
      this.$emit('sure-done', {state: this.visible, type: 0})
    },
    // 监听页数改变，而内容也发生改变
    current_change (currentPage) {
      this.currentPage = currentPage
    },
    // 全选/反选
    handleSelectAll (selections) {
      console.log(selections)
      this.selectData = selections
    },
    // 单列选择
    handleCurrentChange (selections, row) {
      console.log(selections, row)
      this.selectData = selections
    },
    // 全部清除 选中的学员
    clearSelect () {
      this.$refs.orgTable.clearSelection()
      this.selectData = []
    },
    // 删除选中的某个学员
    cancleSelect (row) {
      if (this.selectData.length > 0) {
        for (let i = 0; i < this.selectData.length; i++) {
          if (this.selectData[i].id === row.id) {
            // 删除数据
            this.selectData.splice(i, 1)
            this.$refs.orgTable.toggleRowSelection(row, false)
            break
          }
        }
      }
    },
    // 查询
    onSubmit () {
    },
    getOrgs () {
      for (let i = 0; i < this.selectData.length; i++) {
        if (this.slelectOrgs.length === 0 && i === 0) {
          this.slelectOrgs.push(this.selectData[0].orgName)
        } else {
          if (JSON.stringify(this.slelectOrgs).indexOf(this.selectData[i].orgName) === -1) {
            this.slelectOrgs.push(this.selectData[i].orgName)
          } else {
            return
          }
        }
      }
    }
  },
  computed: {
    getOrgSize: function () {
      return this.orgInfos ? this.orgInfos.length : 0
    },
    getDataCount: function () {
      let dataCounts = []
      for (let i = 0; i < this.selectData.length; i++) {
        let data = this.selectData[i]
        let dataIndex = -1
        let dataCount = null
        for (let j = 0; j < dataCounts.length; j++) {
          dataCount = dataCounts[j]
          if (data.orgName === dataCount.orgName) {
            let posts = dataCount.posts
            let postIndex = -1
            let post = null
            for (let k = 0; k < posts.length; k++) {
              post = posts[k]
              if (post.postName === data.postName) {
                post.count += 1
                dataCount.count += 1
                postIndex = k
                break
              }
            }
            if (postIndex === -1) {
              dataCount.count += 1
              posts.push({postName: data.orgPost, count: 1})
            }
            dataIndex = j
            break
          }
        }
        if (dataIndex === -1) {
          dataCounts.push({orgName: data.orgName, count: 1, posts: [{postName: data.orgPost, count: 1}]})
        } else {
          this.$set(dataCounts, dataIndex, dataCount)
        }
      }
      return dataCounts
    }
  }
}
</script>

<style lang="scss">
.el-dialog{
  width: 98%;
  .el-dialog__header{
    padding: 10px 20px;
  }
  .el-dialog__body{
    padding-top: 0px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-top: 1px solid #F2F3F7;
  }
  .el-container{
    margin-top: 10px;
    .left {
      .el-select, .query {
        width: 200px;
      }
      .el-table{
        border-top: 1px solid #F2F3F7;
      }
      .el-pagination{
        margin-top: 50px;
      }
    }
    .el-main{
      margin: 0;
      padding: 0;
      .el-card{
        height: 50%;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 30px;
      }
    }
  }
  .dialog-footer{
    text-align: center;
  }
}
</style>
