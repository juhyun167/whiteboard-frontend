import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'

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
    history: createWebHashHistory(),
    routes
})

export default router
