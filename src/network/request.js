import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://mock.apifox.cn/m1/1709801-0-default',
    headers: { 'apifoxToken': "K5FOccF9Y4NtkbKZK0ib2WnWnm4bVdQO" },
    timeout: 5000
  })

  instance.interceptors.request.use(data => {
    return data
  }, err => {
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}
