<!-- 全部客户 -->
<template lang="html">
  <div class="userCus">
    <p class="cusTitle">客户列表</p>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="5"><div class="cusCTitle">微信名</div></el-col>
        <el-col :span="3"><div class="cusCTitle">真实姓名</div></el-col>
        <el-col :span="2"><div class="cusCTitle">性别</div></el-col>
        <el-col :span="4"><div class="cusCTitle">手机</div></el-col>
        <el-col :span="6"><div class="cusCTitle">所在区域</div></el-col>
        <el-col :span="4"><div class="cusCTitle">注册时间</div></el-col>
      </el-row>
      <div class="" v-loading="cusLoading" style="minHeight:650px;">
        <el-row class="cusList" v-for="(cusMes,indexCus) in cusList" :key="indexCus">
          <el-col :span="5"><div class="cusCCon">{{cusMes.nickname}}</div></el-col>
          <el-col :span="3"><div class="cusCCon">
            <span v-if="cusMes.realname!=''&&cusMes.realname!=null">{{cusMes.realname}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="2"><div class="cusCCon">
            <span v-if="cusMes.sex==1">男</span>
            <span v-else>女</span>
          </div></el-col>
          <el-col :span="4"><div class="cusCCon">
            <span v-if="cusMes.mobile!=''&&cusMes.mobile!=null">{{cusMes.mobile}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="6"><div class="cusCCon">
            <span v-if="cusMes.address!=null&&cusMes.address!='  '">{{cusMes.address}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="4"><div class="cusCCon">{{cusMes.create_time}}</div></el-col>
        </el-row>
      </div>
    </div>
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="cusPage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cusList:[],
      currentPage3:1,//分页器默认页码
      cusLoading:false,
      cusPage:10,
    }
  },
  created(){
    this.getCusList()
  },
  methods:{
    handleCurrentChange(val) {
      this.getCusList()
    },
    getCusList(){
      this.cusLoading=true;
      this.$http.getListAPI('mp/account/all?page='+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.cusLoading=false;
          this.cusList=res.data.data.list;
          this.cusPage=this.data.data.pagination.total*5;
        }
      }).catch(err=>{
        this.cusLoading=false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.userCus{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .cusTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
  }
  .cusCTitle{
    text-align: center;
    line-height: 40px;
    background: $tabColor;
    color:white;
    font-size: 15px;
    font-weight: bold;
  }
  .cusList:nth-of-type(odd){
    background: #eee;
  }
  .cusCCon{
    line-height: 40px;
    font-size: 14px;
    text-align: center;
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
}
</style>
