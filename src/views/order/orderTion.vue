<!-- 订单管理 -->
<template lang="html">
  <div class="orderTion">
    <p class="ordTitle">订单管理
      <span>订单筛选:
        <el-select v-model="orderState" placeholder="订单状态" @change="filOrder" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
    </p>
    <div class="" style="padding:10px;">
      <el-row>
        <el-col :span="4"><div class="ordCTitle">订单号</div></el-col>
        <el-col :span="4"><div class="ordCTitle">策略名称</div></el-col>
        <el-col :span="2"><div class="ordCTitle">微信名</div></el-col>
        <el-col :span="3"><div class="ordCTitle">订单金额</div></el-col>
        <el-col :span="3"><div class="ordCTitle">支付金额</div></el-col>
        <el-col :span="2"><div class="ordCTitle">订单状态</div></el-col>
        <el-col :span="2"><div class="ordCTitle">交易账号</div></el-col>
        <el-col :span="3"><div class="ordCTitle">下单时间</div></el-col>
        <el-col :span="1"><div class="ordCTitle">操作</div></el-col>
      </el-row>
      <div class="" style="minHeight:650px;" v-loading="orderLoading">
        <el-row class="ordList" v-for="(ordMes,indexOrd) in ordList" :key="indexOrd">
          <el-col :span="4"><div class="ordCCon">{{ordMes.order_sn}}</div></el-col>
          <el-col :span="4"><div class="ordCCon">{{ordMes.content.name}}</div></el-col>
          <el-col :span="2"><div class="ordCCon">{{ordMes.nickname}}</div></el-col>
          <el-col :span="3"><div class="ordCCon">{{ordMes.order_amount}}.00</div></el-col>
          <el-col :span="3"><div class="ordCCon">{{ordMes.payed_amount}}.00</div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.status==2" style="color:green;">已支付</span>
            <span v-else style="color:red;">未支付</span>
          </div></el-col>
          <el-col :span="2"><div class="ordCCon">
            <span v-if="ordMes.account_info">{{ordMes.account_info.name}}</span>
            <span v-else>未关联</span>
            <!-- - -->
          </div></el-col>
          <el-col :span="3"><div class="ordCCon">{{ordMes.create_time}}</div></el-col>
          <el-col :span="1"><div class="ordCCon" @click="texOpen(indexOrd)">
            <span style="color:#545c64;cursor:pointer;">审核</span>
          </div></el-col>
        </el-row>
      </div>
    </div>
    <!-- 审核订单 -->
    <div class="">
      <el-dialog
        title="订单审核"
        :visible.sync="ordExa"
        width="30%">
        <div class="ordExaV">
          <ul>
            <li>订单金额:</li>
            <li>实付金额:</li>
            <li>开户券商:</li>
            <li>交易账号:</li>
            <li>交易密码:</li>
          </ul>
          <ul>
            <li>{{ordMesD.order_amount}}</li>
            <li>{{ordMesD.payed_amount}}</li>
            <li>
              <span v-if="ordMesD.account_info.name!=null&&ordMesD.account_info.name!=''">{{ordMesD.account_info.name}}</span>
              <span v-else>未选择交易券商</span>
            </li>
            <li>
              <span v-if="ordMesD.account_info.account!=null&&ordMesD.account_info.account!=''">{{ordMesD.account_info.account}}</span>
              <span v-else>未输入交易账号</span>
            </li>
            <li>
              <span v-if="ordMesD.account_info.pwd!=null&&ordMesD.account_info.pwd!=''">{{ordMesD.account_info.pwd}}</span>
              <span v-else>未输入交易密码</span>
            </li>
          </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ordExa = false">关&nbsp;闭</el-button>
          <el-button type="primary"
          v-loading="btnLoading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          :disable="btnLoading"
          @click="exaAdo()">审核通过</el-button>
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
       :total="ordPage">
     </el-pagination>
    </p>
  </div>
</template>

<script>
export default {
  data(){
    return{
      orderState:null,//订单状态
      options: [{
          value: 0,
          label: '全部订单'
        }, {
          value: 2,
          label: '支付完成'
        }, {
          value: 1,
          label: '未支付'
        }, {
          value: -1,
          label: '异常订单'
      }],
      ordList:[],
      currentPage3:1,//分页器默认页码
      ordExa:false,//订单审核
      ordState:0,
      ordMesD:{
        order_amount:null,
        payed_amount:null,
        account_info:{
          name:null,
          account:null,
          pwd:null
        }
      },
      orderLoading:false,
      ordPage:10,
      btnLoading:false,
    }
  },
  created(){
    this.getOrderlist()
  },
  methods:{
    handleCurrentChange(val) {
        this.getOrderlist()
    },
    texOpen(_this){//审核订单
      if(this.ordList[_this].account_info){
        this.ordMesD=this.ordList[_this];
        this.ordExa=true;
      }else{
        this.$message.error('当前订单未绑定交易账号,暂不支持审核')
      }
    },
    getOrderlist(){
      this.orderLoading=true;
      this.$http.getListAPI('mp/order?page='+this.currentPage3+'&limit=15').then(res=>{
        if(res.data.state==1){
          this.ordList=res.data.data.list;
          this.ordPage=res.data.data.pagination.total*5;
          this.orderLoading=false;
        }
      }).catch(err=>{
        this.orderLoading=false;
      })
    },
    filGetOrder(){
      this.orderLoading=true;
      this.$http.getListAPI('mp/order?page='+this.currentPage3+'&limit=15&status='+this.ordState).then(res=>{
        if(res.data.state==1){
          this.ordList=res.data.data.list;
          this.ordPage=res.data.data.pagination.total*5;
          this.orderLoading=false;
        }
      }).catch(err=>{
        this.orderLoading=false;
      })
    },
    filOrder(status){
      if(status==0){
        this.getOrderlist()
      }else{
        this.ordState=status;
        this.filGetOrder()
      }
    },
    exaAdo(){//审核通过
      this.btnLoading=true;
      this.$http.putSomeAPI('mp/order/verify',{
        id:this.ordMesD.id,
        is_verify:1
      }).then(res=>{
        if(res.data.state==1){
          this.$message.success('已通过');
          this.ordExa=false;
          this.btnLoading=false;
        }else{
          this.btnLoading=false;
        }
      }).catch(err=>{
        this.btnLoading=false;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.orderTion{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  .ordTitle{
    width: 100%;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    position: relative;
    span{
      position: absolute;
      display: inline-block;
      font-weight: normal;
      font-size: 14px;
      right:0;
    }
  }
  .ordCTitle{
    text-align: center;
    background: $tabColor;
    color:white;
    font-size: 15px;
    font-weight: bold;
    line-height: 40px;
  }
  .ordCCon{
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .ordList:nth-of-type(odd){
    background: #eee;
  }
  .el-pagination{
    text-align: right;
    box-sizing: border-box;
    padding-right: 30px;
  }
  .ordExaV{
    width: 80%;
    margin:0 auto;
    display: flex;
    ul{
      li{
        line-height: 50px;
      }
    }
    ul:last-child{
      box-sizing: border-box;
      padding-left: 10px;
    }
  }
}
</style>
