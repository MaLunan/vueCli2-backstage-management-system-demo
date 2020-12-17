<template>
  <div>
    <div>
      <div>
        <div style='width:100%;'>
          <div style='padding-top:10%;text-align:center;'>
            <!-- <img src="../../assets/images/timg.gif" width="auto" height="428" > -->
            <Icon style='font-size:300px;' custom="icon iconfont icon-landingpagein"></Icon>
            <h2 class="error-subtitle">未登录，暂时无法查看哦^_^</h2>
            <p class='automatic'>{{count}}秒中自动跳转...</p>
            <p @click='go' class='go'>去登陆 >></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      count:'',
      timer:null,
    }
  },
  mounted() {
    this.startDivi();
  },
  methods: {
    go(){
      window.location.href='https://iservice.citics.com/'
    },
    startDivi(){
        const TIME_COUNT = 5;
        if(!this.timer){
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(()=>{
            if(this.count > 0 && this.count <= TIME_COUNT){
                this.count--;
            }else{
                this.show = true;
                clearInterval(this.timer);
                this.timer = null;
                //跳转的页面写在此处
                window.location.href='https://iservice.citics.com/';
            }
          },1000)
        }
    },
  },
}
</script>
<style lang="">
    .go{
        color:rgb(74, 74, 247);
        font-size: 18px;
        margin-left: 24%;
        cursor: pointer;
        text-decoration:underline;
    }
    .go:hover{
        color:rgb(9, 9, 245);
    }
    .error-subtitle{
        padding: 2% 0;
    }
    .automatic{
      text-align: center;
      color:rgb(74, 74, 247);
      font-size: 18px;
    }
</style>