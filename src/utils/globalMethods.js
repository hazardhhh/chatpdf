import { Loading } from 'element-ui'
let loading // 定义loading变量

export function startLoading() {
    // 使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '拼命加载中……',
        background: 'rgba(255, 255, 255, 0.7)'
    })
}
export function endLoading() {
    // 使用Element loading-close 方法
    loading.close()
}