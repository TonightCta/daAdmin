<!-- 策略管理 -->
<template lang="html">
  <div class="strategyList">
    <p class="listTitle">策略列表<el-button icon="el-icon-plus" type="primary" size="small" @click="addStr=true;">添加策略</el-button></p>
    <div class="listCon">
      <el-row>
        <el-col :span="6"><div class="conTitle">策略名称</div></el-col>
        <el-col :span="2"><div class="conTitle">主理人</div></el-col>
        <el-col :span="6"><div class="conTitle">预期收益</div></el-col>
        <el-col :span="5"><div class="conTitle">标签</div></el-col>
        <el-col :span="5"><div class="conTitle">操作</div></el-col>
      </el-row>
      <div class="" v-loading="loadStar" style="minHeight:650px;">
        <el-row class="stList" v-for="(strMes,indexStr) in stList" :key="indexStr">
          <el-col :span="6"><div class="conMes">{{strMes.name}}</div></el-col>
          <el-col :span="2"><div class="conMes">{{strMes.author}}</div></el-col>
          <el-col :span="6"><div class="conMes">{{strMes.expect}}%</div></el-col>
          <el-col :span="5"><div class="conMes">
            <span class="tags" v-for="(tags,indexTag) in strMes.tag" :key="indexTag">{{tags}}</span>
          </div></el-col>
          <el-col :span="5"><div class="conMes">
            <span class="operLast" @click="openBug(indexStr)">客户详情&nbsp;|&nbsp;</span>
            <span class="operLast" @click="upLogStr(indexStr)">上传历史净值&nbsp;|&nbsp;</span>
            <span class="operLast" @click="editStrOpen(indexStr)">修改</span>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 购买详情 -->
    <div class="">
      <el-dialog
        title="购买详情"
        :visible.sync="openBuy"
        width="60%">
        <div class="">
          <el-row>
            <el-col :span="4"><div class="buyTitle">用户名称</div></el-col>
            <el-col :span="4"><div class="buyTitle">联系手机</div></el-col>
            <el-col :span="4"><div class="buyTitle">券商名称</div></el-col>
            <el-col :span="4"><div class="buyTitle">券商账号</div></el-col>
            <el-col :span="4"><div class="buyTitle">券商密码</div></el-col>
            <el-col :span="4"><div class="buyTitle">投资金额</div></el-col>
          </el-row>
          <el-row v-for="(buyMes,indexBuy) in buyBackList" :key="indexBuy">
            <el-col :span="4"><div class="buyMes">{{buyMes.nickname}}</div></el-col>
            <el-col :span="4"><div class="buyMes">{{buyMes.mobile}}</div></el-col>
            <el-col :span="4"><div class="buyMes">
              <span v-if="buyMes.name!=null&&buyMes.name!=''">{{buyMes.name}}</span>
              <span v-else>未绑定</span>
            </div></el-col>
            <el-col :span="4"><div class="buyMes">
              <span v-if="buyMes.account!=null&&buyMes.account!=''">{{buyMes.account}}</span>
              <span v-else>未绑定</span>
            </div></el-col>
            <el-col :span="4"><div class="buyMes">
              <span v-if="buyMes.pwd!=null&&buyMes.pwd!=''">{{buyMes.pwd}}</span>
              <span v-else>未绑定</span>
            </div></el-col>
            <el-col :span="4"><div class="buyMes">{{buyMes.investment_amount}}</div></el-col>
          </el-row>
          <p class="noData" v-if="isHasData">暂无数据</p>
          <p class="paperBox" v-else>
            <el-pagination
             @current-change="handleCurrentChange"
             :current-page.sync="currentPage3"
             :page-size="100"
             layout="prev, pager, next, jumper"
             :total="100">
           </el-pagination>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="openBuy = false">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 策略历史净值上传 -->
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
          action="/dev/mp/upload/strategy"
          :headers="{'Authorization':token,'SessionId':sessionID,'v':'v2'}"
          :data="{strategy_id	:strID}"
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
          <el-col :span="12"><div class="finbanckTitle">日期</div></el-col>
          <el-col :span="12"><div class="finbanckTitle">收益</div></el-col>
        </el-row>
        <p class="backNoData" v-if="backNoData">暂无数据</p>
        <el-row v-else v-for="(backSucc,indexBackT) in upSuccBack" :key="indexBackT">
          <el-col :span="12"><div class="finbanckCon">{{backSucc.create_time}}</div></el-col>
          <el-col :span="12"><div class="finbanckCon">{{backSucc.profit_rate}}</div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="strUpBox = false;upSuccBack=[]">关&nbsp;闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 编辑策略 -->
    <div class="">
      <el-dialog
        title="编辑策略"
        :visible.sync="editStr"
        width="40%">
        <div class="editStrBox">
          <ul>
            <li><span style="color:red;">*</span>策略名称:</li>
            <li><span style="color:red;">*</span>主理人:</li>
            <li><span style="color:red;">*</span>策略风格:</li>
            <li><span style="color:red;">*</span>风险类型:</li>
            <li><span style="color:red;">*</span>标签:</li>
            <li><span style="color:red;">*</span>预期收益:</li>
            <li><span style="color:red;">*</span>对标指数:</li>
            <li><span style="color:red;">*</span>策略状态:</li>
            <li><span style="color:red;">*</span>策略描述:</li>
          </ul>
          <ul>
            <li>
              <el-input type="primary" placeholder="请输入策略名称" v-model="editMes.name"></el-input>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入主理人姓名" v-model="editMes.author"></el-input>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入策略风格" v-model="editMes.style"></el-input>
            </li>
            <li>
              <el-radio v-model="editMes.risk" :label="1">低风险</el-radio>
              <el-radio v-model="editMes.risk" :label="2">中风险</el-radio>
              <el-radio v-model="editMes.risk" :label="3">高风险</el-radio>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入标签名称" style="width:240px;" v-model="editMes.tag"></el-input>
              <span style="marginLeft:10px">多个标签使用,隔开(<font style="color:red">*英文符下</font>)</span>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入预期收益" style="width:200px;" v-model="editMes.expect">
                <template slot="append">%</template>
              </el-input>
            </li>
            <li>
              <el-select v-model="editMes.zhishu" @change="chanceCode" placeholder="对标指数" style="width:200px;">
                 <el-option
                   v-for="item in options"
                   :key="item.label"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
            </li>
            <li>
              <el-radio v-model="editMes.is_lock" :label="0">正常</el-radio>
              <el-radio v-model="editMes.is_lock" :label="1">锁定</el-radio>
            </li>
            <li>
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入策略描述"
                resize="none"
                v-model="editMes.brief"
                >
              </el-input>
            </li>
          </ul>
        </div>
        <p style="width:100%;textAlign:center;marginTop:20px;">
          <el-button type="primary"
            v-loading="btnLoading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :disable="btnLoading"
           @click="subEdit()">提交</el-button>
        </p>
      </el-dialog>
    </div>
    <!-- 添加策略 -->
    <div class="">
      <el-dialog
        title="添加策略"
        :visible.sync="addStr"
        width="40%">
        <div class="editStrBox">
          <ul>
            <li><span style="color:red;">*</span>策略名称:</li>
            <li><span style="color:red;">*</span>主理人:</li>
            <li><span style="color:red;">*</span>策略风格:</li>
            <li><span style="color:red;">*</span>风险类型:</li>
            <li><span style="color:red;">*</span>标签:</li>
            <li><span style="color:red;">*</span>预期收益:</li>
            <li><span style="color:red;">*</span>对标指数:</li>
            <li><span style="color:red;">*</span>策略状态:</li>
            <li><span style="color:red;">*</span>策略描述:</li>
          </ul>
          <ul>
            <li>
              <el-input type="primary" placeholder="请输入策略名称" v-model="addMes.name"></el-input>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入主理人姓名" v-model="addMes.cusName"></el-input>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入策略风格" v-model="addMes.style"></el-input>
            </li>
            <li>
              <el-radio v-model="addMes.type" label="1">低风险</el-radio>
              <el-radio v-model="addMes.type" label="2">中风险</el-radio>
              <el-radio v-model="addMes.type" label="3">高风险</el-radio>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入标签名称" style="width:240px;" v-model="addMes.tag"></el-input>
              <span style="marginLeft:10px">多个标签使用,隔开(<font style="color:red">*英文符下</font>)</span>
            </li>
            <li>
              <el-input type="primary" placeholder="请输入预期收益" style="width:200px;" v-model="addMes.get">
                <template slot="append">%</template>
              </el-input>
            </li>
            <li>
              <el-select v-model="addMes.sIndex" placeholder="对标指数" style="width:200px;">
                 <el-option
                   v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
            </li>
            <li>
              <el-radio v-model="addMes.state" label="1">正常</el-radio>
              <el-radio v-model="addMes.state" label="2">锁定</el-radio>
            </li>
            <li>
              <el-input
                type="textarea"
                :rows="8"
                placeholder="请输入策略描述"
                resize="none"
                v-model="addMes.remark"
                >
              </el-input>
            </li>
          </ul>
        </div>
        <p style="width:100%;textAlign:center;marginTop:20px;">
          <el-button type="primary"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :disable="btnLoading"
          @click="subAdd()">提交</el-button>
        </p>
      </el-dialog>
    </div>
    <!-- 分页器 -->
    <p class="paperBox">
      <el-pagination
       @current-change="handleCurrentChange"
       :current-page.sync="currentPage3"
       :page-size="100"
       layout="prev, pager, next, jumper"
       :total="allPage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      radio:'1',
      options: [{
                value: '000016.SH',
                label: '上证50'
              }, {
                value: '000300.SH',
                label: '沪深300'
              }, {
                value: '399673.SZ',
                label: '创业板50'
              }, {
                value: '399330.SZ',
                label: '深证100'
              }],
      stList:[],
      allPage:10,//总页数
      loadStar:false,//加载
      buyBackList:[],//购买详情回显列表
      currentPage3: 1,//分页器默认页码
      openBuy:false,//购买详情盒子
      isHasData:false,//是否有数据
      strUpBox:false,//上传历史净值
      editStr:false,//编辑策略
      editMes:{//编辑策略数据
        name:null,
        author:null,
        style:null,
        risk:null,
        sIndex:null,
        remark:null,
        tag:[],
        expect:null,
        is_lock:null,
        state:null,
      },
      addStr:false,//添加策略
      addMes:{//添加策略数据
        name:'',
        cusName:'',
        style:'',
        type:'',
        sIndex:'',
        remark:'',
        tag:'',
        get:'',
        state:'',
      },
      token:window.sessionStorage.getItem('token'),
      sessionID:window.sessionStorage.getItem('sessionID'),
      backNoData:true,
      upSuccBack:[],
      strID:null,//策略🆔
      btnLoading:false,
    }
  },
  watch:{
    buyBackList(val,oldVal){
      if(val.length<1){
        this.isHasData=true;
      }else{
        this.isHasData=false;
      }
    },
    upSuccBack(val,oldVal){
      if(val.length>0){
        this.backNoData=false;
      }else{
        this.backNoData=true;
      }
    },
    openBuy(val,oldVal){
      if(!val){
        this.buyBackList=[]
      }
    }
  },
  created(){
    this.getStarList()
  },
  methods:{
    handleCurrentChange(val) {
        this.getStarList()
    },
    openBug(index){//客户详情
      // this.buyBackList=this.stList[index].buyList;
      this.$http.getListAPI('mp/account/'+this.stList[index].id).then(res=>{
        if(res.data.state==1){
          this.buyBackList.push(res.data.data)
          this.openBuy=true;
        }
      })
    },
    editStrOpen(index){//编辑策略
      this.$http.getListAPI('mp/strategy/'+this.stList[index].id).then(res=>{
        if(res.data.state==1){
          this.editMes=res.data.data;
          this.editStr=true;
        }
      })
    },
    subEdit(){//提交编辑
      this.btnLoading=true;
      if(this.editMes.name==''||this.editMes.name==null){
        this.$message.error('请输入策略名称')
      }else if(this.editMes.author==''||this.editMes.author==null){
        this.$message.error('请输入主理人')
      }else if(this.editMes.style==''||this.editMes.style==null){
        this.$message.error('请输入策略风格')
      }else if(this.editMes.risk==''||this.editMes.risk==null){
        this.$message.error('请选择风险类型')
      }else if(this.editMes.tag==''||this.editMes.tag==null){
        this.$message.error('请输入策略标签')
      }else if(this.editMes.expect==''||this.editMes.expect==null){
        this.$message.error('请输入预期收益')
      }else if(this.editMes.zhishu==''||this.editMes.zhishu==null){
        this.$message.error('请选择对标指数')
      }else if(this.editMes.brief==''||this.editMes.brief==null){
        this.$message.error('请输入策略描述')
      }else{
        this.$http.putSomeAPI('mp/strategy',{
          name:this.editMes.name,
          author:this.editMes.author,
          style:this.editMes.style,
          risk:this.editMes.risk,
          tag:this.editMes.tag,
          expect:this.editMes.expect,
          code:this.editMes.code,
          is_lock:this.editMes.is_lock,
          brief:this.editMes.brief,
          id:this.editMes.id
        }).then(res=>{
          if(res.data.state==1){
            this.btnLoading=false;
            this.editStr=false;
            this.$message.success('修改成功');
            this.getStarList()
          }else{
            this.btnLoading=false;
          }
        }).catch(err=>{
          this.btnLoading=false;
        })
      }
    },
    subAdd(){//提交新增策略
      if(this.addMes.name==''||this.addMes.name==null){
        this.$message.error('请输入策略名称')
      }else if(this.addMes.cusName==''||this.addMes.cusName==null){
        this.$message.error('请输入主理人')
      }else if(this.addMes.style==''||this.addMes.style==null){
        this.$message.error('请输入策略风格')
      }else if(this.addMes.type==''||this.addMes.type==null){
        this.$message.error('请选择风险类型')
      }else if(this.addMes.tag==''||this.addMes.tag==null){
        this.$message.error('请输入策略标签')
      }else if(this.addMes.get==''||this.addMes.get==null){
        this.$message.error('请输入预期收益')
      }else if(this.addMes.sIndex==''||this.addMes.sIndex==null){
        this.$message.error('请选择对标指数')
      }else if(this.addMes.state==''||this.addMes.state==null){
        this.$message.error('请选择策略状态')
      }else if(this.addMes.remark==''||this.addMes.remark==null){
        this.$message.error('请输入策略描述')
      }else{
        this.btnLoading=true;
        this.$http.postFormAPI('mp/strategy',{
          name:this.addMes.name,
          author:this.addMes.cusName,
          style:this.addMes.style,
          risk:Number(this.addMes.type),
          tag:this.addMes.tag,
          expect:this.addMes.get,
          code:this.addMes.sIndex,
          is_lock:Number(this.addMes.state),
          brief:this.addMes.remark
        }).then(res=>{
          this.btnLoading=true;
          if(res.data.state==1){
            this.btnLoading=false;
            this.addStr=false;
            this.$message.success('添加成功');
            this.getStarList()
          }else{
            this.btnLoading=false;
          }
        }).catch(res=>{
          this.btnLoading=false;
        })
      }
    },
    upLogStr(index){//上传历史净值
      this.strID=this.stList[index].id
      this.strUpBox=true;
    },
    getStarList(){//获取策略列表
      this.loadStar=true;
      this.$http.getListAPI('mp/strategy?page='+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.loadStar=false;
          this.allPage=res.data.data.pagination.total*5;
          this.stList=res.data.data.list;
          this.stList.forEach((e)=>{
            let tags=e.tag.split(',');
            e.tag=tags;
          });
        }
      })
    },
    upSuc(res){//上传成功
      if(res.state==1){
        this.$message.success('上传成功');
        this.upSuccBack=res.data;
        this.getStarList()
      }else{
        this.$message.error(res.msg)
      }
    },
    upFail(err){//上传失败
      this.$message.error('您上传的文件内容有误')
    },
    chanceCode(value){
      this.editMes.code=value;
    }
  }
}
</script>

<style lang="scss" scoped>
.strategyList{
  width: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .listTitle{
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
  .listCon{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    .conTitle{
      line-height: 40px;
      background:$tabColor;
      color:white;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
    }
    .conMes{
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      .tags{
        height: 26px;
        line-height: 26px;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 5px;
        background: #eee;
        border:1px solid #ccc;
        margin-right: 5px;
        display: inline-block;
      }
      .operLast{
        color:$tabColor;
        cursor:pointer;

      }
    }
    .stList:nth-of-type(odd){
      background: #eee;
    }
  }
  .buyTitle{
    line-height: 40px;
    text-align: center;
    background: $tabColor;
    color:white;
    font-size: 14px;
    font-weight: bold;
  }
  .buyMes{
    line-height: 40px;
    text-align: center;
    color:black;
  }
  .paperBox{
    width: 100%;
    box-sizing: border-box;
    padding-right: 30px;
    .el-pagination{
      text-align: right;
    }
  }
  .noData{
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }
  .upload-demo{
    text-align: center;
  }
  .strDown{
    width: 100%;
    line-height: 40px;
    color:$tabColor;
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
  }
  .backNoData{
    width: 100%;
    margin-top: 30px;
    font-size: 15px;
    text-align: center;
  }
  .editStrBox{
    width: 100%;
    display: flex;
    ul{
      li{
        line-height: 50px;
      }
    }
    ul:first-child{
      width: 20%;
      text-align: right;
    }
    ul:last-child{
      width: 70%;
      box-sizing: border-box;
      padding-left: 10px;
    }
  }
}
</style>
