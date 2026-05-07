import axios from 'axios'
const customFetch = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    withCredentials: false,
})

customFetch.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    console.log('Token being sent:', token)
    if(token) {
        config.headers = config.headers || {}
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

export default customFetch;
