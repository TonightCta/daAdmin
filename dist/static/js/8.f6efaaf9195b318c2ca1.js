webpackJsonp([8],{"7xDk":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={data:function(){return{broList:[],editBro:!1,editBroMes:{name:null,id:null},addBro:!1,addBroMes:{name:null},currentPage3:1,broPage:10,broLoading:!1,btnLoading:!1}},created:function(){this.getBroList()},methods:{handleCurrentChange:function(t){this.getBroList()},editBroDom:function(t){this.editBroMes.name=this.broList[t].name,this.editBroMes.id=this.broList[t].id,console.log(this.editBroMes),this.editBro=!0},delBro:function(t){var e=this;this.$confirm("此操作将删除当前券商, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http.deleteListAPI("mp/securities",{ids:[e.broList[t].id]}).then(function(t){1==t.data.state&&(e.getBroList(),e.$message({type:"success",message:"删除成功!"}))})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},getBroList:function(){var t=this;this.broLoading=!0,this.$http.getListAPI("mp/securities?page="+this.currentPage3+"&limit=15").then(function(e){1==e.data.state&&(t.broLoading=!1,t.broList=e.data.data.list,t.broPage=5*e.data.data.pagination.total)}).catch(function(e){t.broLoading=!1})},subBro:function(){var t=this;null==this.addBroMes.name||""==this.addBroMes?this.$message.error("请输入券商名称"):(this.btnLoading=!0,this.$http.postFormAPI("mp/securities",{name:this.addBroMes.name}).then(function(e){1==e.data.state&&(t.btnLoading=!1,t.$message.success("添加成功"),t.addBro=!1,t.getBroList())}).catch(function(e){t.btnLoading=!1}))},editBroSub:function(){var t=this;""==this.editBroMes.name||null==this.editBroMes?this.$message.error("请输入券商名称"):(this.btnLoading=!0,this.$http.putSomeAPI("mp/securities",{id:this.editBroMes.id,name:this.editBroMes.name}).then(function(e){1==e.data.state&&(t.btnLoading=!1,t.getBroList(),t.editBro=!1,t.$message.success("修改成功"))}).catch(function(e){t.btnLoading=!1}))}}},n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"brokerList"},[i("p",{staticClass:"borTitle"},[t._v("券商列表"),i("el-button",{attrs:{icon:"el-icon-plus",type:"primary",size:"small"},on:{click:function(e){t.addBro=!0}}},[t._v("添加券商")])],1),t._v(" "),i("div",{staticStyle:{padding:"10px"}},[i("el-row",[i("el-col",{attrs:{span:10}},[i("div",{staticClass:"broCTitle"},[t._v("券商名称")])]),t._v(" "),i("el-col",{attrs:{span:8}},[i("div",{staticClass:"broCTitle"},[t._v("添加时间")])]),t._v(" "),i("el-col",{attrs:{span:6}},[i("div",{staticClass:"broCTitle"},[t._v("操作")])])],1),t._v(" "),i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.broLoading,expression:"broLoading"}],staticStyle:{minHeight:"650px"}},t._l(t.broList,function(e,a){return i("el-row",{key:a,staticClass:"broList"},[i("el-col",{attrs:{span:10}},[i("div",{staticClass:"broCCon"},[t._v(t._s(e.name))])]),t._v(" "),i("el-col",{attrs:{span:8}},[i("div",{staticClass:"broCCon"},[t._v(t._s(e.create_time))])]),t._v(" "),i("el-col",{attrs:{span:6}},[i("div",{staticClass:"broCCon"},[i("span",{on:{click:function(e){return t.editBroDom(a)}}},[t._v("修改｜")]),t._v(" "),i("span",{on:{click:function(e){return t.delBro(a)}}},[t._v("删除")])])])],1)}),1)],1),t._v(" "),i("div",{},[i("el-dialog",{attrs:{title:"编辑券商",visible:t.editBro,width:"30%"},on:{"update:visible":function(e){t.editBro=e}}},[i("div",{staticClass:"editBro"},[i("ul",[i("li",[i("span",{staticStyle:{color:"red"}},[t._v("*")]),t._v("券商名称:")])]),t._v(" "),i("ul",[i("li",[i("el-input",{attrs:{type:"primary",placeholder:"请输入券商名称"},model:{value:t.editBroMes.name,callback:function(e){t.$set(t.editBroMes,"name",e)},expression:"editBroMes.name"}})],1)])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.editBro=!1}}},[t._v("关 闭")]),t._v(" "),i("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.btnLoading,expression:"btnLoading"}],attrs:{type:"primary","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"},on:{click:function(e){return t.editBroSub()}}},[t._v("提 交")])],1)])],1),t._v(" "),i("div",{},[i("el-dialog",{attrs:{title:"添加券商",visible:t.addBro,width:"30%"},on:{"update:visible":function(e){t.addBro=e}}},[i("div",{staticClass:"editBro"},[i("ul",[i("li",[i("span",{staticStyle:{color:"red"}},[t._v("*")]),t._v("券商名称:")])]),t._v(" "),i("ul",[i("li",[i("el-input",{attrs:{type:"primary",placeholder:"请输入券商名称"},model:{value:t.addBroMes.name,callback:function(e){t.$set(t.addBroMes,"name",e)},expression:"addBroMes.name"}})],1)])]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.addBro=!1}}},[t._v("关 闭")]),t._v(" "),i("el-button",{directives:[{name:"loading",rawName:"v-loading",value:t.btnLoading,expression:"btnLoading"}],attrs:{type:"primary","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"},on:{click:function(e){return t.subBro()}}},[t._v("提 交")])],1)])],1),t._v(" "),i("p",{staticClass:"paperBox"},[i("el-pagination",{attrs:{"current-page":t.currentPage3,"page-size":100,layout:"prev, pager, next, jumper",total:t.broPage},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage3=e},"update:current-page":function(e){t.currentPage3=e}}})],1)])},staticRenderFns:[]};var o=i("VU/8")(a,n,!1,function(t){i("95Bd")},"data-v-1202b410",null);e.default=o.exports},"95Bd":function(t,e){}});
//# sourceMappingURL=8.f6efaaf9195b318c2ca1.js.map