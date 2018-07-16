/**
 * Created by Administrator on 2017/12/21.
 */

let baseURL

console.log("++++++++++",process.env.NODE_ENV)
// 配置开发环境和线上生产环境的切换
if (process.env.NODE_ENV === 'development') {
    baseURL = '/api/'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = '/api/'
}

baseURL = '/public/api/'
export {baseURL}