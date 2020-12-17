<template>
  <div class="piquery" @click.stop="closeN">
    <div @click='closeMask' v-if="maskModal" class="mask"></div>
    <div class="header">
        <div class="logo_img">
          <img class='logo' @click='goHome' src="../assets/images/logo.png" alt="">
        </div>
        <div class='header_title' @click="homeActive">demo</div>
        <div class='header_right'><div class='userImgBox'><span>{{user}}</span></div>
        <!-- <span class='hoverRed' @click='exit'>退出</span> -->
        </div>
    </div>
    <div class="main_container">
      <!-- 左侧导航 -->
      <div :class="foldFlag?'nav':'nav1'">
        <div class="fold"><Icon class='shousuo' @click="fold" :custom="foldFlag?'icon iconfont icon-shousuocaidan':'icon iconfont icon-shousuocaidan-copy'" size='16'/></div>
        <Menu ref='side_menu' :open-names="openName" :active-name='menuActive' v-show="foldFlag" @on-select='relationTag' theme="dark" width='180px' accordion>
          <MenuItem name='{"path":"p1","name":"页面1"}' :to="{path:'/p1'}">
              <Icon custom="icon iconfont icon-icon_xinyong_xianxing_jijin-" size='18' style='margin-left:0.14em;margin-right:0.45em;'/>
            页面1
          </MenuItem>
          <Submenu name="bbck">
            <template slot="title">
              <Icon custom="icon iconfont icon-yunliankeji_gongyinglianfuben" size='22' style='margin-left:0.04em;margin-right:0.27em;'/>
              页面
            </template>
            <MenuItem name='{"path":"p2","name":"页面二"}' :to="{path:'/p2'}">
              <Icon custom="icon iconfont icon-__right" size='18'/>
              页面二
            </MenuItem>
            <MenuItem name='{"path":"p3","name":"页面三"}' :to="{path:'/p3'}">
              <Icon custom="icon iconfont icon-__yx_classroom" size='18'/>
              页面三
            </MenuItem>
            <MenuItem name='{"path":"p4","name":"页面四"}' :to="{path:'/p4'}">
              <Icon custom="icon iconfont icon-__dy_boot" size='18'/>
              页面四
            </MenuItem>
          </Submenu>
          <MenuItem name='{"path":"p5","name":"页面五"}' :to="{path:'/p5'}">
            <Icon custom="icon iconfont icon-shengchengmulu" size='20' style='margin-left:0.12em;'/>
            页面五
          </MenuItem>
           <MenuItem name='{"path":"p6","name":"页面六"}' :to="{path:'/p6'}">
              <Icon custom="icon iconfont icon-xiaoxi1" size='20' style='margin-left:0.12em;'/>
              页面六
            </MenuItem>
        </Menu>
      </div>
      <div class="container">
        <!-- 页签 -->
        <div class="nav_child">
          <span @click="homeActive" class='home'>首页</span>
          <Tabs @on-tab-remove='tabsRemove' @on-click='tabsRouter' :animated='false' style='display:inline-block;margin-top:8px;margin-left:70px' type="card" closable v-model="tabActive">
            <Tab-pane v-for="tagItem in newTagData" :name='tagItem.path' :key='tagItem.path' :label="tagItem.name"></Tab-pane>
          </Tabs>
        </div>
        <router-view></router-view>
        <!-- 页脚 -->
        <Footer class="layout-footer-center footer_box">京ICP证 030779-1号 京公网安备11010502020433号 &copy; 中信控股有限责任公司版权所有 Copyright © CITIC Holdings All rights reserved </Footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      openName:[],//导航展开
      menuActive:'',//导航高亮
      carouselModal:false,// 跑马灯公告详情弹框控制
      detailsData:'',// 跑马灯详情数据
      detailsTitle:'',// 跑马灯详情标题
      foldFlag:true, // 折叠导航控制
      search:'',
      tagData:[],
      newTagData:[],
      tabActive:'', //tabs标签高亮
      newItems:[],//跑马灯数据
      user:'', //登录用户
      role:'' ,// 登录身份
      maskModal:false,//遮罩层
      msgData:[],
      timer:null,
    }
  },
  watch:{
  // 切换页面清空通知
    $route(to,from){
      this.$eventBus.$emit('handleChange',this.maskModal);
      if(to.path!=='/home'){
        this.msgData.map((item)=>{

        })
      }
      this.$Notice.destroy()
    },
    openName(){
      this.$nextTick(()=>{
        this.$refs.side_menu.updateOpened();
      })
    }
  },
  created() {
    window.addEventListener('beforeunload',e=>{
      let user=sessionStorage.getItem('user');
      let role=sessionStorage.getItem('role');
      sessionStorage.clear();
      sessionStorage.setItem('user',user);
      sessionStorage.setItem('role',role);
    })
  },
  beforeMount() {
  },
  mounted() {
    // if(sessionStorage.getItem('user')!=null){
    //     this.user=sessionStorage.getItem('user');
    //     this.role=sessionStorage.getItem('role');
    // }else{
        this.getUser();
    // }
  },
  beforeDestroy:function(){
      if(this.timer){
          clearInterval(this.timer);  //在Vue实例销毁前，清除我们的定时器
      }
      this.$Notice.destroy()
  },
  methods:{
    //判断是否是开发环境
    env() {
        if (window.location.href.includes('localhost')) return true;        
        return false                                         
    },
    getUser(){
      //获取用户信息
      // this.$axios.get("/dataexpress/curUser")
      // .then(res => {
      //   if(res.code==502){
      //     this.$router.push('/error-502');
      //     sessionStorage.clear();
      //   }else{
      //     console.log(res)
      //     sessionStorage.setItem('user',res.msg);
      //     sessionStorage.setItem('role',res.content);
      //     this.user=res.msg;
      //     this.role=res.content;
      //   }
      // });
    },
    goHome(){
      this.$router.push('/home');
      this.tabActive='';
    },
    // 关联tag标签页
    relationTag(key){
      let flag = this.tagData.includes(key);
      if (flag) {
      //直接跳转  已存在直接跳轉
        this.tabActive = eval("(" + key + ")").path;
      } else {
        // 不存在 
        if (this.tagData.length < 10) {
          // 长度小于10添加
          this.tagData.push(key);
          let tagArr = Array.from(new Set(this.tagData));
          let arr = tagArr.map(item => {
            return eval("(" + item + ")");
          });
          this.newTagData = [...arr];

          this.tabActive = eval("(" + key + ")").path;
        } else {
          // 长度大于10提示用户
          let pathUrl='/'+this.newTagData[9].path;
          this.$router.push({path:pathUrl});
          this.$Modal.info({
            title: "提示",
            content: "标签页导航不能超过10个"
          });
        }
      }
      this.newTagData.map(item=>{
        if(JSON.stringify(item)==key){
          this.menuActive=key;
        }
      })
    },
    // 点击标签页跳转
    tabsRouter(key){
      if(key=='p2'||key=='p3'||key=='p4'){
        this.openName=['bbck'];
      }else {
        this.openName=[]
      }
      this.newTagData.map(item=>{
        if(item.path==key){
          this.menuActive=JSON.stringify(item);
        }
      })
      this.$router.push({path:'/'+key});
    },
    // 关闭标签页
    tabsRemove(key){
      // 关闭页签清空缓存
      var sessionKeys = Object.keys(sessionStorage)
      for (var i=0;i<sessionKeys.length;i++) {
        if(sessionKeys[i].indexOf(key)!=-1){
          sessionStorage.removeItem(sessionKeys[i])
        }
      }
      this.tabsRouter(this.tabActive)
      if(this.tabActive==-1){
        this.$router.push({path:'/home'})
        this.menuActive=key;
      }
      this.newTagData.map((item,index)=>{
        if(item.path==key){
          this.newTagData.splice(index,1)
        }
      })
      this.tagData.map((item,index)=>{
        if(item.indexOf(key)!=-1){
          this.tagData.splice(index,1)
        }
      })
      sessionStorage.removeItem(key);
    },
    homeActive(){
      this.$router.push('/home')
      this.tabActive='';
      this.menuActive='';
    },
    // 点击退出登陆
    // exit(){
    //   this.$Modal.confirm({
    //       title:'确定要退出登陆吗？',
    //       onOk:()=>{
    //         this.$router.push('/login');
    //         sessionStorage.clear();
    //       }
    //   });
    // },
    // 点击折叠导航
    fold(){
      if(this.foldFlag){
        this.foldFlag=false;
      }else{
        this.foldFlag=true;
      }
    },
    // 关闭遮罩层
    closeMask(){
      this.maskModal=false;
      this.$eventBus.$emit('handleChange',this.maskModal);
    },
    closeN(){
      this.$Notice.destroy()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.piquery{
  width: 100%;
  height: 100%;
}
.header{
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: #393939;
    color:#fff;
    position: fixed;
    top:0;
    left: 0;
    z-index: 16;
    display: flex;
}
.header_title{
  font-size: 26px;
  margin-left: 50px;
  font-weight: bold;
  color:#FA3;
  cursor: pointer;
}
.header_right{
  color:#5cadff;
  position: absolute;
  right: 80px;
  display: flex;
  align-items: center;
}
.header_right span{
  margin-left: 10px;
}
.logo{
  width: 40px;
  height: 40px;
    vertical-align: middle;
    margin-left: 1em;
    cursor: pointer;
}
.main_container{
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 70px;
}
.nav{
  width: 180px;
  height: 100%;
  overflow-y: auto;
  background: #393939;
  z-index: 100000;
  transition: .4s;
}
.nav1{
  width: 40px;
  height: 100%;
  overflow-y: auto;
  background: #393939;
  z-index: 100000;
  transition: .4s;
}
.nav::-webkit-scrollbar {
  display: none;
}
.container{
  flex:1;
  background: #fff;
  overflow-y: auto;
  position: relative;
  min-width: 824px;
}
.ivu-menu-dark{
  background: #393939;
}
.ivu-menu{
  color:#fff;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
  background: #393939;
}
.nav_child{
  width: 100%;
  height:40px;
  line-height: 40px;
  background: #f8f8f9;
  position: relative;
}
.nav_child .home{
  color:#2d8cf0;
  font-size: 14px;
  font-weight: 600;
  margin: 0 20px;
  position: absolute;
  margin-top:4px;
  cursor: pointer;
}
.nav_child .home:hover{
  color:red;
}
.footer_box{
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
}
.userImgBox{
  height: 100%;
  display: flex;
  align-items: center;
}
.userImg{
  width:14px;
}
.fold{
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.iconfont {
  color: #fff;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu){
  color:#fff;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover{
  background: #2d8cf0;
}
.detail_title{
  text-align: center;
  margin-bottom: 10px;
}
.demo-carousel{
  line-height: 40px;
  text-align: center;
}
.demo-carousel:hover,.shousuo:hover{
  cursor: pointer;
  color: #2d8cf0;
}
.demo-carousel:hover .icon{
  color: #2d8cf0;
}
.imgItem{
  width: 12px;
  height: 12px;
}
.icon-gonggao_huaban{
  color: #393939;
}
.mask{
    position: fixed;
    z-index: 11;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
}
.help{
    position: absolute;
    right: 10px;
    color: #5cadff;
    cursor: pointer;
    transition: all 0.5s;
}
.help:hover{
    /* color: #2d8cf0; */
    font-size: 16px;
    
}
</style>