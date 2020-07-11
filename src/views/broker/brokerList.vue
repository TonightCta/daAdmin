<!-- 券商管理 -->
<template lang="html">
  <div class="brokerList">
    <p class="borTitle">券商列表<el-button icon="el-icon-plus" type="primary" size="small" @click="addBro=true">添加券商</el-button></p>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="10"><div class="broCTitle">券商名称</div></el-col>
        <el-col :span="8"><div class="broCTitle">添加时间</div></el-col>
        <el-col :span="6"><div class="broCTitle">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:650px;" v-loading="broLoading">
        <el-row class="broList" v-for="(broMes,indexBro) in broList" :key="indexBro">
          <el-col :span="10"><div class="broCCon">{{broMes.name}}</div></el-col>
          <el-col :span="8"><div class="broCCon">{{broMes.create_time}}</div></el-col>
          <el-col :span="6"><div class="broCCon">
            <span @click="editBroDom(indexBro)">修改｜</span>
            <span @click="delBro(indexBro)">删除</span>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 编辑券商 -->
    <div class="">
      <el-dialog
        title="编辑券商"
        :visible.sync="editBro"
        width="30%">
        <div class="editBro">
          <ul>
            <li><span style="color:red;">*</span>券商名称:</li>
          </ul>
          <ul>
            <li>
              <el-input type="primary" v-model="editBroMes.name" placeholder="请输入券商名称"></el-input>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editBro = false">关&nbsp;闭</el-button>
          <el-button type="primary" @click="editBroSub()"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 添加券商 -->
    <div class="">
      <el-dialog
        title="添加券商"
        :visible.sync="addBro"
        width="30%">
        <div class="editBro">
          <ul>
            <li><span style="color:red;">*</span>券商名称:</li>
          </ul>
          <ul>
            <li>
              <el-input type="primary" v-model="addBroMes.name" placeholder="请输入券商名称"></el-input>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addBro = false">关&nbsp;闭</el-button>
          <el-button type="primary" @click="subBro()"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          >提&nbsp;交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 分页器 -->
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="broPage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      broList:[],
      editBro:false,//编辑券商
      editBroMes:{
        name:null,
        id:null,
      },
      addBro:false,//添加券商
      addBroMes:{
        name:null,
      },
      currentPage3:1,//分页器默认页码
      broPage:10,
      broLoading:false,
      btnLoading:false,//上传loading
    }
  },
  created(){
    this.getBroList()
  },
  methods:{
    handleCurrentChange(val) {
      this.getBroList()
    },
    editBroDom(_this){//编辑券商
      this.editBroMes.name=this.broList[_this].name;
      this.editBroMes.id=this.broList[_this].id;
      console.log(this.editBroMes)
      this.editBro=true;
    },
    delBro(_html){//删除券商
      this.$confirm('此操作将删除当前券商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.deleteListAPI('mp/securities',{
            ids:[this.broList[_html].id]
          }).then(res=>{
            if(res.data.state==1){
              this.getBroList();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
    },
    getBroList(){
      this.broLoading=true;
      this.$http.getListAPI('mp/securities?page='+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.broLoading=false;
          this.broList=res.data.data.list;
          this.broPage=res.data.data.pagination.total*5;
        }
      }).catch(err=>{
        this.broLoading=false;
      })
    },
    subBro(){//添加券商
      if(this.addBroMes.name==null||this.addBroMes==''){
        this.$message.error('请输入券商名称')
      }else{
        this.btnLoading=true;
        this.$http.postFormAPI('mp/securities',{
          name:this.addBroMes.name
        }).then(res=>{
          if(res.data.state==1){
            this.btnLoading=false;
            this.$message.success('添加成功')
            this.addBro=false;
            this.getBroList()
          }
        }).catch(err=>{
          this.btnLoading=false;
        })
      }
    },
    editBroSub(){//修改证券
      if(this.editBroMes.name==''||this.editBroMes==null){
        this.$message.error('请输入券商名称')
      }else{
        this.btnLoading=true;
        this.$http.putSomeAPI('mp/securities',{
          id:this.editBroMes.id,
          name:this.editBroMes.name
        }).then(res=>{
          if(res.data.state==1){
            this.btnLoading=false;
            this.getBroList();
            this.editBro=false;
            this.$message.success('修改成功')
          }
        }).catch(err=>{
          this.btnLoading=false;
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.brokerList{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .borTitle{
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
  .broCTitle{
    text-align: center;
    line-height: 40px;
    background: $tabColor;
    color:white;
    font-size: 15px;
    font-weight: bold;
  }
  .broCCon{
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    span{
      color:$tabColor;
      cursor:pointer;
    }
  }
  .broList:nth-of-type(odd){
    background: #eee;
  }
  .editBro{
    width: 80%;
    margin:0 auto;
    display: flex;
    ul{
      width: 35%;
      li{
        line-height: 50px;
        text-align: right;
      }
    }
    ul:last-child{
      width: 50%;
      box-sizing: border-box;
      padding-left: 10px;
    }
  }
  .el-pagination{
    text-align: right;
  }
}
</style>
