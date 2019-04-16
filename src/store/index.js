import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  questionSet: [],
  status: '',
  token: localStorage.getItem('token') || '',
  user: {}
  },
  mutations: {
    authRequest (state) {

      state.status = 'loading'

    },
    authSuccess (state, token, user) {

      state.status = 'success'
      state.token = token
      state.user = user

    },
    authError (state) {

      state.status = 'error'

    },
    logout (state) {

      state.status = ''
      state.token = ''

    }
  },
  actions: {
    login ({ commit }, user) {

      return new Promise((resolve, reject) => {

        commit('auth_request')
        axios({
          url: 'http://localhost:8000/login',
          data: user,
          method: 'POST'
        }).then((resp) => {

          const { response } = resp

          localStorage.setItem('token', token)
          axios.defaults.headers.common.Authorization = token
          commit('auth_success', response.data.token, response.data.user)
          resolve(resp)

        }).
        catch((err) => {

          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)

        })

      })

    },
    register ({ commit }, user) {

      return new Promise((resolve, reject) => {

        commit('auth_request')
        axios({
          url: 'http://localhost:8000/register',
          data: user,
          method: 'POST'
        }).then((resp) => {

          const { response } = resp

          localStorage.setItem('token', token)
          axios.defaults.headers.common.Authorization = token
          commit('auth_success', response.data.token, response.data.user)
          resolve(resp)

        }).
        catch((err) => {

          commit('auth_error', err)
          localStorage.removeItem('token')
          reject(err)

        })

      })

    },
    logout ({ commit }) {

      return new Promise((resolve, reject) => {

        commit('logout')
        localStorage.removeItem('token')
        Reflect.deleteProperty(axios.defaults.headers.common.Authorization)
        resolve()

      })

    }
  },
  getters: {
    // !!state.token ??
    isLoggedIn: (state) => Boolean(state.token),
    authStatus: (state) => state.status
  }
})
