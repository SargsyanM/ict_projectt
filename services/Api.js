import axios from 'axios'
import Cookies from 'vue-cookies'

export default() => {
  return axios.create({
    baseURL: `http://localhost:8080`,
    headers: {
      Authorization: 'Bearer ' + Cookies.get('session')
    }
  })
}
