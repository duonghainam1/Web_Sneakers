import axios from 'axios'

const instance = axios.create({
    // baseURL: import.meta.env.VITE_BASE_URL
    baseURL: "https://be-sneaker-web.vercel.app/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
})
export default instance
