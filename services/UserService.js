import Api from '@/services/Api'

export default {
  signup (params) {
    return Api().post('users', params)
  },

  login (params) {
    return Api().post('users/login', params)
  },

  getUser (params) {
    return Api().get('users/' + params.id, params)
  }
}
