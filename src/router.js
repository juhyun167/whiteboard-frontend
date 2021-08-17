import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/MainPage.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
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
})