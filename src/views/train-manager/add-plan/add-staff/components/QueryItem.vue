<template>
	<div>
    <el-form inline >
      <el-form-item label="岗位" label-width="50px">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="综合查询" label-width="80px" v-if="activeName">
        <el-input placeholder="请输入姓名/身份证号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'QueryItem',
  props: {
    activeName: Boolean
  }
}
</script>

<style scoped>

</style>
