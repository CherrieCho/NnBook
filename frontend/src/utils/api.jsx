import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

//console.log("Aladin API Key:", API_KEY);
//console.log("Aladin Base URL:", BASE_URL);

const api = axios.create({
  baseURL: "https://nnbook-production-863f.up.railway.app/api/aladin",
  // baseURL: "/ttb/api",
  timeout: 5000,
  params: {
    ttbkey: API_KEY,
    Output: "JS",
    Version: "20131101",
  },
});


// 요청 인터셉터
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;

// // 요청 인터셉터 추가하기
// axios.interceptors.request.use(
//   function (config) {
//     // 요청이 전달되기 전에 작업 수행
//     return config;
//   },
//   function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 추가하기
// axios.interceptors.response.use(
//   function (response) {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 데이터가 있는 작업 수행
//     return response;
//   },
//   function (error) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 오류가 있는 작업 수행
//     return Promise.reject(error);
//   }
// );

// export default api;
