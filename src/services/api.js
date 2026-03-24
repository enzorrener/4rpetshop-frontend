import axios from 'axios'

const api = axios.create({
  baseURL: 'https://4rpetshop.srv1211850.hstgr.cloud/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default api