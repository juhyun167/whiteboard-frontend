import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'main',
        component: MainPage,
        props: { currentForm: 'MainPageLoginForm' }
    },
    {
        path: '/',
        name: 'signup',
        component: MainPage,
        props: { currentForm: 'MainPageSignupForm' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

router.beforeEach((to, from, next) => {
    const publicPaths = [
        '/',
    ]
    const authRequired = !publicPaths.includes(to.path)
    const authenticated = store.state.authenticated

    if (authRequired && !authenticated) {
        next({ name: 'main' })
    } else {
        next()
    }
})
