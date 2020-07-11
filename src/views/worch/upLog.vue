<!-- 上传记录 -->
<template lang="html">
  <div class="upLog">
    <p class="logTitle">净值上传记录
      <el-button type="primary" icon="el-icon-plus" size="small" @click="strUpBox=true">上传净值</el-button>
    </p>
    <div style="padding:10px;">
      <el-row>
        <el-col :span="10"><div class="logCTitle">文件名</div></el-col>
        <el-col :span="10"><div class="logCTitle">上传时间</div></el-col>
        <el-col :span="4"><div class="logCTitle">操作</div></el-col>
      </el-row>
      <div class="" v-loading="logLoading" style="minHeight:650px;">
        <el-row class="logList" v-for="(logCon,indexLo) in logList" :key="indexLo">
          <el-col :span="10"><div class="logCon">{{logCon.origin_name}}</div></el-col>
          <el-col :span="10"><div class="logCon">{{logCon.create_time}}</div></el-col>
          <el-col :span="4"><div class="logCon">
            <span @click="downFile(indexLo)">下载</span>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="logPage">
     </el-pagination>
    </p>
    <!-- 上传净值 -->
    <div class="">
      <el-dialog
        title="策略历史净值上传"
        :visible.sync="strUpBox"
        width="60%">
        <el-upload
          class="upload-demo"
          accept=".xls,.xlsx"
          :show-file-list="false"
          drag
          name="file"
          action="/dev/mp/upload/profit"
          :headers="{'Authorization':token,'SessionId':sessionID,'v':'v2'}"
          :on-success="upSuc"
          :on-error="upFail"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传.xls、.xlsx的excel</div>
        </el-upload>
        <p class="strDown">净值模版下载</p>
        <p class="upFinTitle">上传结果预览</p>
        <el-row>
          <el-col :span="6"><div class="finbanckTitle">日期</div></el-col>
          <el-col :span="6"><div class="finbanckTitle">券商账号</div></el-col>
          <el-col :span="6"><div class="finbanckTitle">策略名称</div></el-col>
          <el-col :span="6"><div class="finbanckTitle">当日总资产</div></el-col>
        </el-row>
        <p class="backNoData" v-if="backNoData">暂无数据</p>
        <el-row v-for="(backFile,backID) in upSuccBack" :key="backID" v-else>
          <el-col :span="6"><div class="finbanckCon">{{backFile.create_time}}</div></el-col>
          <el-col :span="6"><div class="finbanckCon">{{backFile.account}}</div></el-col>
          <el-col :span="6"><div class="finbanckCon">{{backFile.strategy}}</div></el-col>
          <el-col :span="6"><div class="finbanckCon">{{backFile.profit}}</div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="strUpBox = false;upSuccBack=[]">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      logList:[],
      currentPage3:1,//分页器默认页码
      strUpBox:false,
      logPage:10,
      logLoading:false,
      token:window.sessionStorage.getItem('token'),
      sessionID:window.sessionStorage.getItem('sessionID'),
      upSuccBack:[],
      backNoData:true,
    }
  },
  watch:{
    upSuccBack(val,oldVal){
      if(val.length>0){
        this.backNoData=false;
      }else{
        this.backNoData=true;
      }
    }
  },
  created(){
    this.getLogList()
  },
  methods:{
    handleCurrentChange(val) {
      this.getLogList();
    },
    getLogList(){//获取记录列表
      this.logLoading=true;
      this.$http.getListAPI('mp/upload/log?page='+this.currentPage3+'&limit=15').then((res)=>{
        if(res.data.state==1){
          this.logLoading=false;
          this.logPage=res.data.data.pagination.total*10;
          this.logList=res.data.data.list;
        }
      })
    },
    upSuc(res){//上传成功
      if(res.state==1){
        this.$message.success('上传成功');
        this.upSuccBack=res.data;
        this.getLogList()
      }else{
        this.$message.error(res.msg)
      }
    },
    upFail(err){//上传失败
      this.$message.error('您上传的文件内容有误')
    },
    downFile(index){//下载模版
      console.log(this.logList[index])
      window.open(this.logList[index].save_name)
    },
  }
}
</script>

<style lang="scss" scoped>
.upLog{
  width: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .logTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    button{
      position: absolute;
      right:0;
      top:50%;
      margin-top: -15px;
    }
  }
  .logCTitle{
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    background: $tabColor;
    color:white;
    font-size: 15px;
  }
  .logCon{
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    span{
      font-size: 14px;
      color:$tabColor;
      cursor:pointer;
    }
  }
  .logList:nth-of-type(odd){
    background: #eee;
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
  .upload-demo{
    text-align: center;
  }
  .strDown{
    width: 100%;
    line-height: 40px;
    color:rgba(0,228,255,1);
    text-align: center;
    cursor:pointer;
  }
  .upFinTitle{
    width: 100%;
    color:black;
    font-size: 15px;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
  }
  .finbanckTitle{
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
    color:black;
    border-bottom:1px solid #ccc;
  }
  .finbanckCon{
    line-height: 40px;
    text-align: center;
    color:black;
  }
  .backNoData{
    width: 100%;
    margin-top: 30px;
    font-size: 15px;
    text-align: center;
  }
}
</style>
