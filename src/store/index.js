import { createStore } from 'vuex'
import { service } from '@/service/service'

export default createStore({
    state: {
        authenticated: false,
        displayName: ''
    },
    mutations: {
        LOG_IN(state, payload) {
            state.authenticated = true
            state.displayName = payload.displayName
        },
        LOG_OUT(state, payload) {
            state.authenticated = false
            state.displayName = ''
        }
    },
    actions: {
        login({ commit }, { username, password }) {
            // service.login(username, password)
        },
        logout({ commit }) {
            // service.logout()
            commit('LOG_OUT')
        },
        async register({ commit }, { displayName, username, password }) {
            return await service.register(displayName, username, password)
        }
    },
    modules: {
    }
})
