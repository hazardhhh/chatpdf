import axios from "axios";

let timeStamp = new Date().getTime()
//请求拦截器
// axios.interceptors.request.use(
//     (config) => {
//         //如果存在token,请求携带这个token
//         if (window.sessionStorage.getItem('tokenStr')) {
//             config.headers['token'] = window.sessionStorage.getItem('tokenStr')
//         }
//         config.params = { tid: timeStamp }
//         return config
//     },
//     (error) => {
//         console.log(error)
//     }
// )

// //响应拦截器
// axios.interceptors.response.use(
//     (success) => {
//         //业务逻辑错误
//         if (success.data?.code) {
//             if (success.data?.code && success.data?.code !== 'S_OK') {
//                 // 如果接口返回200 并且code不为s_ok时 需要返回统一封装的错误码提示
//                 console.log('success.data.code --- ', success.data.code);
//                 returnErrorCode(success.data.code)
//             }
//         }
//         return success.data
//     },
//     (error) => {
//         if (error.data?.code) returnErrorCode(error.data.code)
//         return
//     }
// )


let base = ''

//传送json格式的post请求
export const postRequest = (url, params, headParams) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: headParams // 可设置请求头
    })
}

//导出excel格式的post请求
export const postExport = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
    })
}

//传送json的put请求
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
    })
}

//传送json的get请求
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params,
    })
}

//传送json的delete请求
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params,
    })
}