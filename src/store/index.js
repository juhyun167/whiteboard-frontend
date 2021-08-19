import { createStore } from 'vuex'
import { service } from '@/service/service'

export default createStore({
    state: {
        authenticated: false,
    },
    mutations: {
        LOG_IN(state) {
            state.authenticated = true
        },
        LOG_OUT(state) {
            state.authenticated = false
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
        register({ commit }, { displayName, username, password }) {
            service.register(displayName, username, password)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    modules: {
    }
})
