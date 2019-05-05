import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'vue-cookies'
import jwt from 'jsonwebtoken'

import UserService from '../services/UserService'

const store = () => {
  return new Vuex.Store({
    state: {
      user: null,
      session: null
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      },
      setSession (state, payload) {
        state.session = payload
      }
    },
    actions: {
      async onSignIn ({commit}, payload) {
        const response = await UserService.login(payload)
        if (response.status === 200) {
          commit('setUser', response.data.user)
          Cookies.set('user', response.data.user)
          this.$router.push('/')
        }
      },
      async onSignUp({commit, dispatch}, payload) {
        const response = await UserService.signup({
          email: payload.email,
          password: payload.password,
          name: payload.name,
          surname: payload.surname
        })
      },
      async getUser ({commit, getters, dispatch}) {
        if (!Cookies.get('user') || getters.user) {
          return
        }
        const response = await UserService.getUser({
          id: Cookies.get('user')._id
        })
        commit('setUser', response.data.user)
      },
      logout ({commit}) {
        commit('setUser', null)
        commit('setSession', null)
        Cookies.remove('user')
        Cookies.remove('session')
        this.$router.push("/")
      },
    },
    getters: {
      user: state => state.user,
      session: state => state.session
    }
  })
}

export default store
