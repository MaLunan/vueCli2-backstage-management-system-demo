// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axiosPlugins from './axios/axios.js'; //封装接口
Vue.prototype.$eventBus = new Vue();
Vue.config.productionTip = false

Vue.use(ViewUI);
Vue.use(axiosPlugins);

// 日期格式转换插件(时间戳转为 年-月-日 时：分：秒)
Vue.prototype.$dateParser = (timestamp) => {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      
    var Y = date.getFullYear() + '-';  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';  
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());  
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';  
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';  
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());  
    return Y + M + D + ' ' + h + m + s; //以根据自己的需求加上
}

// 获取日期区间
Vue.prototype.$getDays = (day) => {
    var today = new Date();　　
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;　
    today.setTime(targetday_milliseconds);
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}

function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) { m = "0" + month; }
    return m;
}
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})


