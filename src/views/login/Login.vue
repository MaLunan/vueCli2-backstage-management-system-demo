<template>
  <div class="login">
    <img src="../../assets/images/login.jpg" width='100%' height="100%" alt="">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
	import LoginForm from '@/components/login-from'
	export default {
	    data(){
	      return{
	      }
	    },
		  components: {
			  LoginForm
	    },
		  methods:{
        handleSubmit({username, password}){
            // this.$axios.post('/dataexpress/login',{
            //   username:username,
            //   password:password
            // }).then((res)=>{
              // if(res.code==200){
                // // 跳转到首页
                // sessionStorage.setItem('user',res.msg);
                // sessionStorage.setItem('role',res.content);
                this.$router.push('/home')
              // }
              // else{
              //   this.$Message.error("请检查用户名或密码");
              // }
            // })
          }
		  }
	}
</script>
<style>
 .login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    
}
.login-con{
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    
}
.login-in{
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
}
.form-con{
    padding: 10px 0 0;
}
.login-tip{
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
}
</style>