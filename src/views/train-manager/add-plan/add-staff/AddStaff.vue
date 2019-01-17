<template>
	<div class="add-staff">
    <el-dialog title="参训学员" :visible.sync="dialogVisible" show-close="false">
      <el-container>
        <el-aside width="60%">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="按组织添加" name="first">
              <QueryItem :activeName="false"></QueryItem>
            </el-tab-pane>
            <el-tab-pane label="精确查找学员添加" name="second">
              <QueryItem :activeName="true"></QueryItem>
            </el-tab-pane>
          </el-tabs>
          <el-table :data="tables">
            <el-table-column label="姓名"
            prop="name"
            > </el-table-column>
            <el-table-column label="身份证号" prop="idCard"> </el-table-column>
            <el-table-column label="所属组织" prop="orgName"> </el-table-column>
            <el-table-column label="参加岗位" prop="postName"> </el-table-column>
            <el-table-column label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="selectRow(scope.$index, tables)"
                  size="small"
                  type="text"
                >
                  {{scope.row.operation}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            prev-text="上一页"
            next-text="下一页"
            layout="prev, pager, next, jumper"
            :total="tables.length"
          ></el-pagination>
        </el-aside>
        <el-main width="40%">
          <div class="data-count">
            <el-row type="flex">
              <span>学员总数：{{staffCount}}人</span>
              <span style="margin-left: 50px">公司总数：{{orgCount}}个</span>
              <el-button type="text" class="data-clear">全部清空</el-button>
            </el-row>
            <div style="display: inline-block; margin-top: 20px; margin-bottom: 20px" v-for="post in posts" :key="post.postName">
               <span style="margin-right: 20px; margin-top: 20px">{{post.postName}}：{{post.count}}人</span>
            </div>
          </div>
          <div class="data-detail" v-for="item in dataDetail" :key="item.orgName">
            <el-row>
              <span>{{item.orgName}},共{{item.data.length}}人</span>
              <el-button type="text" @click="clearSelect">全部清除</el-button>
            </el-row>
            <div v-for=" stu in item.data" :key="stu.id" style="display: inline-block">
              <el-button type="info" size="mini" style="margin: 5px" @click="cancleSelect(stu)">{{stu.name}}<i class="el-icon-close"></i></el-button>
            </div>
          </div>
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

import QueryItem from '@/views/train-manager/add-plan/add-staff/components/QueryItem'
let map = {}
export default {
  name: 'AddStaff',
  components: {
    QueryItem
  },
  data () {
    return {
      activeName: 'second',
      staffCount: 0, // 学员总数
      orgCount: 0, // 公司总数
      posts: [], // 岗位统计
      dataDetail: [],
      tables: [
        {
          id: 1,
          name: '张三',
          idCard: '522156422155548963',
          orgName: '重庆运管1',
          postName: '客运驾驶员',
          operation: '选择'
        },
        {
          id: 2,
          name: '李四',
          idCard: '522156422155548963',
          orgName: '重庆运管',
          postName: '客运驾驶员',
          operation: '选择'
        },
        {
          id: 3,
          name: '王五',
          idCard: '522156422155548963',
          orgName: '重庆运管2',
          postName: '客运驾驶员',
          operation: '选择'
        },
        {
          id: 4,
          name: '赵六',
          idCard: '522156422155548963',
          orgName: '重庆运管',
          postName: '货运驾驶员',
          operation: '选择'
        }
      ]
    }
  },
  props: {
    dialogVisible: Boolean
  },
  methods: {
    // 选择
    selectRow (index, rows) {
      let row = rows[index]
      if (row.operation === '选择') {
        row.operation = '取消选择'
        let postIndex = -1
        let post = null
        // 岗位
        for (let k = 0; k < this.posts.length; k++) {
          post = this.posts[k]
          if (post.postName === row.postName) {
            post.count += 1
            postIndex = k
            break
          }
        }
        if (postIndex === -1) {
          // 不存在 新增
          this.posts.push({postName: row.postName, count: 1})
        } else {
          // 存在 修改
          this.$set(this.posts, postIndex, post)
        }
        // 公司学员
        this.staffCount += 1
        console.log(map[row.orgName])
        if (!map[row.orgName]) {
          this.dataDetail.push({orgName: row.orgName, data: [row]})
          this.orgCount += 1
          console.log('dataDetail=' + this.dataDetail.length)
          map[row.orgName] = row.orgName
        } else {
          console.log('存在。。。。')
          // 学员
          for (let j = 0; j < this.dataDetail.length; j++) {
            let dj = this.dataDetail[j]
            console.log(dj.orgName + ',' + row.orgName)
            if (dj.orgName === row.orgName) {
              dj.data.push(row)
              this.$set(this.dataDetail, j, dj)
              console.log(this.dataDetail[j].data.length)
              break
            }
          }
        }
      } else {
        row.operation = '选择'
        // 岗位
        for (let k = 0; k < this.posts.length; k++) {
          let post = this.posts[k]
          if (post.postName === row.postName) {
            post.count -= 1
            if (post.count === 0) {
              this.posts.splice(k, 1)
            } else {
              this.$set(this.posts, k, post)
            }
            break
          }
        }
        // 公司学员
        this.staffCount -= 1
        for (let i = 0; i < this.dataDetail.length; i++) {
          let dj = this.dataDetail[i]
          if (dj.orgName === row.orgName) {
            let data = dj.data
            for (let j = 0; j < data.length; j++) {
              if (data[j].id === row.id) {
                data.splice(j, 1)
                if (data.length === 0) {
                  // 该公司下面已经没有人
                  this.orgCount -= 1
                  this.dataDetail.splice(i, 1)
                  delete map[row.orgName]
                } else {
                  this.$set(this.dataDetail, i, dj)
                }
                break
              }
            }
          }
        }
      }
      this.$set(rows, index, row)
    },
    // 取消选择
    unselectRow (index, rows) {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
.add-staff{
  .el-dialog {
    width: 98%;
    .el-dialog__header {
      padding: 10px;
    }
    .el-dialog__body {
      padding: 0px 0px 30px 0px;
      border-top: 2px solid #e3e3e3;
    }
    .el-dialog__headerbtn {
      display: none;
      visible: hidden
    }
    .el-container {
      border-bottom: 1px solid #e3e3e3;
      .el-aside {
        border-right: 1px solid #e3e3e3;
        .el-tabs {
          padding-left: 30px;
          padding-right: 30px;
        }
        .el-table {
          padding: 0px 10px;
        }
        .el-pagination {
          margin-top: 30px;
          text-align: center;
          margin-bottom: 30px;
        }
      }
      .el-main {
        padding: 0px;
        .data-count {
          padding-top: 10px;
          padding-left: 10px;
          border-bottom: 1px solid #e3e3e3;
          .data-clear {
            position: absolute;
            right: 30px;
            top: 0px;
            padding-top: 0px;
          }
        }
        .data-detail {
          padding-top: 10px;
          padding-left: 10px;
        }
      }
    }
    .dialog-footer{
      text-align: center;
    }
  }
}
</style>
