import axios from 'axios'

//servico de ponte entre o backend e frontend
const token = localStorage.getItem('userInfo')

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default api