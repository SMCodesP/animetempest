import axios from 'axios'

const api = axios.create({
  baseURL: 'https://appanimeplus.tk',
  headers: {
    'Content-type': 'application/json',
    "proxy-type": "brazil"
  },
  proxy: { protocol: "http", host: "185.86.150.41", port: 800 },
})

export default api
