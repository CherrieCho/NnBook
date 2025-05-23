import axios from "axios";

const axiosMeetingDB = axios.create({
  // baseURL: "https://nnbook-production-863f.up.railway.app/api/meeting",
  baseURL: "http://localhost:5050/api/meeting",
  headers: {
    "Content-Type": "application/json",
  },
    validateStatus: function (status) {
    return status >= 200 && status < 300; // ✅ 2xx는 모두 성공으로 간주
  }
});

export default axiosMeetingDB;
