import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import HomePage from '../views/HomePage.vue'
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
    },
    {
        path: '/home',
        name: 'home',
        component: HomePage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

router.beforeEach((to, from, next) => {
    const publicPaths = [
        /* pages such as terms and privacy policies */
    ]
    const guestPaths = [
        '/',
    ]
    const authRequired = !publicPaths.concat(guestPaths).includes(to.path)
    const guestRequired = guestPaths.includes(to.path)
    const authenticated = store.state.authenticated

    if (guestRequired && authenticated) {
        // route authenticated users in guest paths to home page
        next({ name: 'home' })
    } else if (authRequired && !authenticated) {
        // route not authenticated users to main page
        next({ name: 'main' })
    } else {
        next()
    }
})
