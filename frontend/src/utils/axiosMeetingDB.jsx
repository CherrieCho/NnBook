import axios from "axios";

const axiosMeetingDB = axios.create({
  // baseURL: "https://nnbook-production-863f.up.railway.app/api/meeting",
  baseURL: "http://localhost:5050/api/meeting",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosMeetingDB;
