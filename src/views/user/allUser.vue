<!-- 全部用户 -->
<template lang="html">
  <div class="userAll">
    <p class="userTitle">用户列表</p>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="6"><div class="userCTitle">用户名称</div></el-col>
        <el-col :span="4"><div class="userCTitle">充值会员</div></el-col>
        <el-col :span="4"><div class="userCTitle">代理商</div></el-col>
        <el-col :span="4"><div class="userCTitle">手机绑定</div></el-col>
        <el-col :span="6"><div class="userCTitle">注册时间</div></el-col>
      </el-row>
      <div class="" v-loading="allLoading" style="minHeight:650px;">
        <el-row class="userList" v-for="(allMes,indexAll) in allList" :key="indexAll">
          <el-col :span="6"><div class="userCCon">{{allMes.nickname}}</div></el-col>
          <el-col :span="4"><div class="userCCon">
            <span v-if="allMes.vip==1">是</span>
            <span v-else>否</span>
          </div></el-col>
          <el-col :span="4"><div class="userCCon">
            <span v-if="allMes.is_agent==1">是</span>
            <span v-else>否</span>
          </div></el-col>
          <el-col :span="4"><div class="userCCon">
            <span v-if="allMes.mobile!=''&&allMes.mobile!=null">{{allMes.mobile}}</span>
            <span v-else>未绑定</span>
          </div></el-col>
          <el-col :span="6"><div class="userCCon">{{allMes.create_time}}</div></el-col>
        </el-row>
      </div>
    </div>
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="allUserPage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      allList:[],
      currentPage3:1,//分页器默认页码
      allUserPage:10,//总页数
      allLoading:false,//加载动画
    }
  },
  created(){
    this.getAllUser()
  },
  methods:{
    handleCurrentChange(val) {
      this.getAllUser()
    },
    getAllUser(){
      this.allLoading=true;
      this.$http.getListAPI('/mp/user?page='+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.allLoading=false;
          this.allList=res.data.data.list;
          this.allUserPage=res.data.data.pagination.total*5;
        }
      }).catch(err=>{
        this.allLoading=false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userAll{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .userTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
  }
  .userCTitle{
    line-height: 40px;
    text-align: center;
    background: $tabColor;
    color:white;
    font-size: 15px;
    font-weight: bold;
  }
  .userCCon{
    line-height: 40px;
    font-size: 14px;
    text-align: center;
  }
  .userList:nth-of-type(odd){
    background: #eee;
  }
  .el-pagination{
    text-align: right;
    padding-right: 30px;
  }
}
</style>
