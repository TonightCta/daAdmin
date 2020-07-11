<!-- 首页 -->
<template lang="html">
  <div class="homePage">
    <div class="">

    </div>
    <el-container>
      <div class="nav" ref="nav">
        <img src="../../assets/favicon.png" alt="" ref="logo">
        <p v-if="isCollapse" @click="openMeu()">
          <i class="el-icon-right"></i>
        </p>
        <p v-else @click="closeMeu()">
          <i class="el-icon-back"></i>
        </p>
        <el-aside>
          <el-menu default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened='true'
          >
            <el-submenu :index="meuMes.index" v-for="(meuMes,indexMeu) in route" :key="indexMeu">
              <template slot="title">
                <i :class="meuMes.icon"></i>
                <span slot="title">{{meuMes.titleOne}}</span>
              </template>
              <el-menu-item-group>
                <span slot="title">{{meuMes.titleTwo}}</span>
                <el-menu-item :index="rouMes.index" v-for="(rouMes,indexRou) in meuMes.rou" :key="indexRou">
                  <router-link :to="rouMes.url" tag="span" style="display:inline-block;width:100%;height:100%;" @click.native="upRoute(indexMeu,indexRou)">{{rouMes.title}}</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </div>
      <el-container>
        <el-header>
          <div class="header">
            <p>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="titleOne!=null">{{titleOne}}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="titleTwo!=null">{{titleTwo}}</el-breadcrumb-item>
              </el-breadcrumb>
            </p>
            <p>
              当前账户:&nbsp;&nbsp;<span>{{userName}}</span>
              <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
                <i class="el-icon-switch-button" @click="loginOut"></i>
              </el-tooltip>
            </p>
          </div>
        </el-header>
        <el-main>
          <div class="content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isCollapse:false,
      route:[
        {
          titleOne:'策略管理',
          titleTwo:'策略',
          index:'1',
          icon:'el-icon-s-shop',
          rou:[
            {
              index:'1-1',
              url:'/strategyList',
              title:'策略列表'
            }
          ]
        },
        {
          titleOne:'净值管理',
          titleTwo:'净值',
          index:'2',
          icon:'el-icon-s-help',
          rou:[
            {
              index:'2-1',
              url:'/worchDetails',
              title:'净值记录'
            },
            {
              index:'2-2',
              url:'/worchUpLog',
              title:'发布记录'
            },
          ]
        },
        {
          titleOne:'客户/代理管理',
          titleTwo:'客户/代理',
          index:'3',
          icon:'el-icon-s-platform',
          rou:[
            {
              index:'3-1',
              url:'/allUser',
              title:'全部用户'
            },
            {
              index:'3-2',
              url:'/userCus',
              title:'客户清单'
            },
            {
              index:'3-3',
              url:'/agentList',
              title:'代理列表'
            },
          ]
        },
        {
          titleOne:'订单管理',
          titleTwo:'订单',
          index:'4',
          icon:'el-icon-s-promotion',
          rou:[
            {
              index:'4-1',
              url:'/order',
              title:'订单列表'
            }
          ]
        },
        {
          titleOne:'券商管理',
          titleTwo:'券商',
          index:'5',
          icon:'el-icon-s-flag',
          rou:[
            {
              index:'5-1',
              url:'/borker',
              title:'券商列表'
            }
          ]
        },
        {
          titleOne:'登录账号管理',
          titleTwo:'账号',
          index:'6',
          icon:'el-icon-user-solid',
          rou:[
            {
              index:'6-1',
              url:'/mange',
              title:'账号列表'
            }
          ]
        },
      ],
      titleOne:null,
      titleTwo:null,
      userName:null,//账号名称
    }
  },
  created(){
    this.getUserMes();
    let date=new Date();
    let year=date.getFullYear();
    let mon=date.getMonth()+1;
    if(mon<10){
      mon='0'+mon
    }
    let day=date.getDate();
    if(day<10){
      day='0'+day
    };
    let hour=date.getHours();
    let dayUP='';
    if(hour>12){
      hour='下午'+hour;
      dayUP='下午'
    }else{
      hour='上午'+hour;
      dayUP='上午'
    }
    let min=date.getMinutes();
    let alMess='欢迎登录大虎鲸AI智能管理系统，现在是北京时间 '+year+' 年 '+mon+' 月 '+day+' 日 '+hour+' 时 '+min+' 分。';
    if(this.$route.query.isLogin==1){
      this.$notify({
        title: dayUP+'好！',
        message: alMess,
        type: 'success',
        duration:6500
      });
    };
  },
  mounted(){

  },
  methods:{
    closeMeu(){//闭合菜单
      this.$refs.nav.style.width='64px'
      this.$refs.logo.style.width='30px'
      this.$refs.logo.style.height='30px'
      this.isCollapse=true
    },
    openMeu(){//打开菜单
      this.$refs.nav.style.width='200px'
      this.$refs.logo.style.width='70px'
      this.$refs.logo.style.height='70px'
      this.isCollapse=false
    },
    upRoute(index,indexTwo){
      this.titleOne=this.route[index].titleOne;
      this.titleTwo=this.route[index].rou[indexTwo].title;
    },
    getUserMes(){
      this.$http.getListAPI('mp/self').then(res=>{
        if(res.data.state==1){
          window.sessionStorage.setItem('userMes',JSON.stringify(res.data.data));
          this.userName=res.data.data.account;
        }
      })
    },
    loginOut(){//退出登录
      const loading = this.$loading({
        lock: true,
        text: '注销中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(()=>{
        loading.close()
        this.$router.push('/')
      },1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 89.5vh;
  border:0!important;
}
.header{
  height: 100%;
  border-bottom: 1px solid #eee;
  position: relative;
  p:first-child{
    box-sizing: border-box;
    padding-left: 10px;
  }
  p:nth-child(2){
    position: absolute;
    top:15px;
    right:40px;
    line-height: 30px;
    padding-right: 50px;
    font-size: 14px;
    color:#545c64;
    span{
      color:#0588ff;
    }
    i{
      font-size: 26px;
      color:red;
      cursor:pointer;
      position: absolute;
      right:0;
      top:50%;
      margin-top: -15px;
    }
  }
}
.nav{
  width: 200px;
  background: #545c64;
  position: relative;
  transition: .6s all;
  height: 100vh;
  img{
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin:0 auto;
    transition: .6s all;
    margin-top:15px;
    margin-bottom:15px;
  }
  p{
    position: absolute;
    width: 100%;
    height: 40px;
    background: #434648;
    z-index: 100;
    bottom: 0;
    line-height: 50px;
    text-align: center;
    i{
      font-size: 30px;
      color:white;
    }
  }
}
.content{
  width: 100%;
  height:93vh;
  overflow: auto;
}
</style>
