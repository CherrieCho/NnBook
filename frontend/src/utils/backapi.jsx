import axios from "axios";

export default axios.create({
  baseURL: `https://nnbook-production-863f.up.railway.app/api`, 
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

// import axios from "axios";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// export default axios.create({
//   baseURL: `${BACKEND_URL}/api`, 
//   headers: { "Content-Type": "application/json" },
//   timeout: 5000,
// });