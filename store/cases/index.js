import axios from 'axios'
const URL = `${process.env.BASE_URL}`

export const state = () => ({
  cases: [],
  loading: false,
  errors: false,
})

export const actions = {
  async getAllCases({ commit, dispatch }, context, state) {
    try {
      commit('SET_LOADING')
      commit('CLEAR_ERRORS')
      const response = await axios.get(`${URL}/api/cases`)
      const data = response.data.cases
      commit('SET_CASES', data)
    } catch (error) {
      commit('SET_ERRORS', error)
      this.$swal('Error', error, 'error')
    }
  },
}

export const mutations = {
  CLEAR_ERRORS(state, error) {
    state.errors = []
  },

  SET_ERRORS(state, error) {
    state.errors.push(error)
    state.loading = false
  },

  SET_LOADING(state) {
    state.loading = true
  },

  SET_CASES(state, data) {
    state.cases = data
    state.loading = false
  },
}

export const getters = {}
