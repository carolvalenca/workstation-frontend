import axios from 'axios'

//servico de ponte entre o backend e frontend
const token = localStorage.getItem('userInfo')

const api = axios.create({
    baseURL: "http://localhost:3030"
})

export default api