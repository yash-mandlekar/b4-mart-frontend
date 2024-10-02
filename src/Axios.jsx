import axios from "axios";

const Axios = axios.create({
  // baseURL: `http://localhost:4000/api`,
  baseURL: `https://whale-app-5b958.ondigitalocean.app/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default Axios;
// import axios from "axios";

// const Axios = axios.create({
//   baseURL: process.env.NODE_ENV === "production" 
//     ? `https://whale-app-5b958.ondigitalocean.app/api` 
//     : `http://localhost:4000/api`,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// export default Axios;
