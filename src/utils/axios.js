import axios from "axios"
import cookie from './cookie.js'
import { Loading } from 'element-ui';
axios.defaults.crossDomain = true;
let loading        //定义loading变量
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        body: true,
       
        text: '拼命加载中……',
        background: 'rgba(255, 255,255, 0.2)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}

let environment = process.env.NODE_ENV
if (environment == 'production') {
    axios.defaults.baseURL = 'http://daoyinjiaoyu.com';
}
axios.defaults.withCredentials = true;
axios.defaults.timeout=10000;
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}];
axios.interceptors.request.use(
    config => {
        startLoading()
        config.headers['Content-Type'] = "application/x-www-form-urlencoded";
        return config;
    },
    error => {
        return Promise.reject(error.response);
    });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
    response => {
       endLoading()
        if (response.data.data && response.data.data.includes('m_token')) {
            cookie.setCookie("m_token", decodeURIComponent(response.data.data.replace('m_token=', '')))
        }
        return response;
    },
    error => {
        endLoading()
        return Promise.reject(error.response)   // 返回接口返回的错误信息
    });
export default axios;