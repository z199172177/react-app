import axios from "axios";
import {getBaseHost} from "../components/env";


const instance = axios.create({
    timeout: 50000,
    headers: {'Content-Type': 'application/json', changeOrigin: true},  // 请求头 token 可以放里面
    responseType: 'json' //返回类型 不写默认 json
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// get请求
function httpGet(api: string, params: {}) {
    return new Promise((reslove, reject) => {
        instance.get(getBaseHost() + api, {
            params: params
        }).then(res => {
            reslove(res)
        }).catch((err) => {
            reject(err)
        });
    })
}

// post请求
function httpPost(api: string, data: {}) {
    return new Promise((reslove, reject) => {
        instance.post(getBaseHost() + api, data).then(res => {
            reslove(res);
        }).catch((err) => {
            reject(err);
        });
    })
}

//put请求
function httpPut(api: string, data: {}) {
    return new Promise((reslove, reject) => {
        instance.put(getBaseHost() + api, data).then(res => {
            reslove(res)
        }).catch((err) => {
            reject(err)
        });
    })
}

//delete请求
function httpDelete(api: string, data: {}) {
    return new Promise((reslove, reject) => {
        instance.delete(getBaseHost() + api, data).then(res => {
            reslove(res)
        }).catch((err) => {
            reject(err)
        });
    })
}

//导出方法
export default {httpGet, httpPost, httpPut, httpDelete}