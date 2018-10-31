import axios from 'axios'

const api = axios.create({
    baseURL: 'http://futnano.ddns.net:5000'
})

export default api;
