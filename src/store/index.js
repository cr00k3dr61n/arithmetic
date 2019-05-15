import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.use(Vuex);

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'HTTP_X_CSRFTOKEN'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default new Vuex.Store({
  state: {
  question: {},
  status: '',
  token: Cookies.get('token') || '',
  csrftoken: Cookies.get('csrftoken') || '',
  user: {},
  answer: {
    coefficient: '',
    numerator: '',
    denominator: ''
  },
  answerFormat: 'fraction',
  numberTerms: 2,
  operatorTypes: [
  '-',
  '+'
  ],
// Number of operators should match number of terms, first operator must be either '+' or '-'
  hasFraction: true,
  hasCoefficient: true,
  hasCoExponent: false,
  terms: [],
  attempts: []
  },
  mutations: {
    addQuestion (state, question, attempts) {

      state.question = question
      state.attempts = attempts

    },
    saveRequest (state) {

      state.status = 'loading'

    },
    saveSuccess (state) {

      state.status = 'success'
      state.question = {}
      state.attempts = []

    },
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
    addQuestion ({ commit }, question) {

      return new Promise((resolve, reject) => {

        commit('saveRequest')
        axios({
          url: 'http://localhost:8000/api/question/',
          data: question,
          method: 'POST'
        }).then((resp) => {

          const { response } = resp

          commit('saveSuccess')
          resolve(resp)

        }).
        catch((err) => {

          commit('authError')
          reject(err)

        })

      })

    },
    login ({ commit }, user) {

      return new Promise((resolve, reject) => {

        commit('authRequest')
        axios({
          url: 'http://localhost:8000/auth/login/',
          data: user,
          method: 'POST'
        }).then((resp) => {

          const { response } = resp

          axios.defaults.headers.common.Authorization = response.data.token
          commit('authSuccess', response.data.token, response.data.user)
          resolve(resp)

        }).
        catch((err) => {

          commit('authError')
          localStorage.removeItem('token')
          reject(err)

        })

      })

    },
    register ({ commit }, user) {

      return new Promise((resolve, reject) => {

        commit('authRequest')
        axios({
          url: 'http://localhost:8000/auth/register/',
          data: user,
          method: 'POST'
        }).then((resp) => {

          const { response } = resp

          axios.defaults.headers.common.Authorization = response.data.token
          commit('authSuccess', response.data.token, response.data.user)
          resolve(resp)

        }).
        catch((err) => {

          commit('authError', err)
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
