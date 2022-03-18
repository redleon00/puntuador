import a from "axios";
const baseURL = process.env.VUE_APP_API_URL || 'https://localhost:3000'
const axios = a.create({
    baseURL: `${baseURL}/api/`,
})

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.authorization = `${token}`;
    return config;
});

export default axios;