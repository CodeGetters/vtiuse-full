import axios from "axios";
import type { AxiosInstance } from "axios";
import { start, done } from "@/utils/nprogress";

const service: AxiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    start();
    return config;
  },
  function (error) {
    done();
    return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    done();
    return response;
  },
  function (error) {
    done();
    return Promise.reject(error);
  },
);

export default service;
