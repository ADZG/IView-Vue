import axios from "axios";
var axiosTool = axios.create({
  baseURL: "http://localhost:8888/api/private/v1/"
  //设置基准路径
});

// 设置拦截器
axiosTool.interceptors.request.use(
  function(config) {
    var token = localStorage.getItem("Superman");
    // 检查本地存储里面是否有token值，如果有，则将他设置在请求头中
    if (token) {
      // 这里必须设置该字段的请求头
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
export default axiosTool;
