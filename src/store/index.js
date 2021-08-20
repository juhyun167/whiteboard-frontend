import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { service } from '@/service/service'

export default createStore({
    state: {
        authenticated: false,
        displayName: '',
    },
    mutations: {
        LOG_IN(state, payload) {
            state.authenticated = true
            state.displayName = payload.displayName
        },
        LOG_OUT(state) {
            state.authenticated = false
            state.displayName = ''
        }
    },
    actions: {
        async login({ commit }, { username, password }) {
            const result = await service.login(username, password)
            if (result.success) {
                commit('LOG_IN', { displayName: result.body.displayName })
            }
            return result
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
    },
    plugins: [
        createPersistedState(),
    ]
})
