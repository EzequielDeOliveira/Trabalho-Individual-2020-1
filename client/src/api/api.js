import axios from 'axios'

const base = 'http://174.138.46.62:3000/api/v1'

const API = axios.create({
  baseURL: base
})

export default API
