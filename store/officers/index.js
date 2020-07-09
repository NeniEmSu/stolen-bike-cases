import axios from 'axios'
const URL = `${process.env.BASE_URL}`

export const state = () => ({
  officers: [],
  officer: {},
  loading: false,
  errors: false,
})

export const actions = {
  async getAllOfficers({ commit, dispatch }, context, state) {
    try {
      commit('SET_LOADING')
      commit('CLEAR_ERRORS')
      const response = await axios.get(`${URL}/api/officers`)
      const data = response.data.officers
      commit('SET_OFFICERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
      this.$swal('Error', error, 'error')
    }
  },

  async getOfficer({ commit }, id) {
    try {
      const response = await axios.get(`${URL}/api/officrs/${id}`)
      const data = await response.data.officer
      commit('SET_OFFICER', data)
    } catch (error) {
      commit('SET_ERRORS', error)
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

  SET_OFFICERS(state, data) {
    state.officers = data
    state.loading = false
  },

  SET_OFFICER(state, data) {
    state.officer = data
    state.loading = false
  },
}

export const getters = {
  getOfficerById: (state) => (id) => {
    return state.officers.find((officer) => officer.id === id)
  },
}
