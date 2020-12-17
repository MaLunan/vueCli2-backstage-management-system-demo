import axios from 'axios';
import Vue from 'vue';
import Router from '@/router/index'
const instance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': "application/json;charset=utf-8"
    },
    // baseURL: '/dataexpress_api/api' //生产环境
        baseURL: '/api' // 本地开发
});
// 添加响应拦截器
instance.interceptors.response.use(function(response) {
    if (response.status === 200) {
        return response.data;
    } else {
        return response;
    }
}, function(error) {
    if (error && error.response) {
        switch (error.response.status) {
            case 404:
                Router.push({ name: 'error-404' });
                // error.message = '请求出错(404)'
                break;

            case 500:
                Router.push({ name: 'error-500' });
                 error.message = '服务器错误(500)';
                break;

            default:
                error.message = `连接出错(${error.response.status})!`;
        }
    }
    return Promise.reject(error);
})

// 定义Vue的插件
let AxiosPlugin = {
    install() {
        Object.defineProperty(Vue.prototype, '$axios', {
            value: instance
        })
    }
}
export {
    instance
}
export default AxiosPlugin;

// 示例
// this.$axios
// .post("接口" {
//     参数
// })
// .then(res => {
//    console.log(res)
// });