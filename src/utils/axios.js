import axios from 'axios' // 导入node_modules里的axios
import qs from 'qs'

axios.defaults.baseURL = "http://localhost/dataexpress"; // 后端接口 ip:port

axios.interceptors.request.use((request) => {
    //在发送请求之前做某件事
    var token = JSON.parse(localStorage.getItem('TOKEN'));
    if (token) {
        token = "TOKEN " + token;
        request.headers.common['Authorization'] = token;
    }
    if (request.method === 'post') {
        request.data = qs.stringify(request.data);
    }
    return request;
}, (error) => {
    console.log('错误的传参');
    return Promise.reject(error);
});

export default axios // 导出axios