<!-- 代理列表 -->
<template lang="html">
  <div class="agentList">
    <p class="ageTitle">代理列表</p>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="3"><div class="agCTitle">微信昵称</div></el-col>
        <el-col :span="3"><div class="agCTitle">真实姓名</div></el-col>
        <el-col :span="3"><div class="agCTitle">性别</div></el-col>
        <el-col :span="3"><div class="agCTitle">代理星级</div></el-col>
        <el-col :span="3"><div class="agCTitle">手机</div></el-col>
        <el-col :span="3"><div class="agCTitle">下级用户</div></el-col>
        <el-col :span="3"><div class="agCTitle">分享码</div></el-col>
        <el-col :span="3"><div class="agCTitle">到期时间</div></el-col>
      </el-row>
      <div class="" style="minHeight:650px;" v-loading="ageLoading">
        <el-row class="ageList" v-for="(ageMes,indexAge) in ageList" :key="indexAge">
          <el-col :span="3"><div class="agCCon">{{ageMes.nickname}}</div></el-col>
          <el-col :span="3"><div class="agCCon">
            <span v-if="ageMes.real_name!=''&&ageMes.real_name!=null">{{ageMes.real_name}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="3"><div class="agCCon">
            <span v-if="ageMes.sex!=''&&ageMes.sex!=null">{{ageMes.sex}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="3"><div class="agCCon">{{ageMes.identity}}</div></el-col>
          <el-col :span="3"><div class="agCCon">
            <span v-if="ageMes.mobile!=''&&ageMes.mobile!=null">{{ageMes.mobile}}</span>
            <span v-else>未填写</span>
          </div></el-col>
          <el-col :span="3"><div class="agCCon">{{ageMes.child}}&nbsp;个</div></el-col>
          <el-col :span="3"><div class="agCCon">{{ageMes.share_code}}</div></el-col>
          <el-col :span="3"><div class="agCCon">{{ageMes.expired_date}}</div></el-col>
        </el-row>
      </div>
    </div>
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="agePage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ageList:[],
      currentPage3:1,//分页器默认页码
      agePage:10,
      ageLoading:false,
    }
  },
  created(){
    this.getAgeList()
  },
  methods:{
    handleCurrentChange(val) {
      this.getAgeList()
    },
    getAgeList(){
      this.ageLoading=true;
      this.$http.getListAPI('mp/agent?page'+this.currentPage3+'&limit=15').then(res=>{
        console.log(res);
        if(res.data.state==1){
          this.ageList=res.data.data.list;
          this.agePage=res.data.data.pagination.total*5;
          this.ageLoading=false;
        }
      }).catch(err=>{
        this.ageLoading=false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.agentList{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .ageTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
  }
  .agCTitle{
    line-height: 40px;
    text-align: center;
    background: $tabColor;
    color:white;
    font-size: 15px;
    font-weight: bold;
  }
  .agCCon{
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .ageList:nth-of-type(odd){
    background: #eee;
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
}
</style>
