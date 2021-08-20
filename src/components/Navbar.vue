<template>
    <Toast />

    <Toolbar flex align-items-center>
        <template #left>
            <router-link :to="{ name: 'main' }">
                <img id="logo" src="../assets/images/logo.png">
            </router-link>
        </template>

        <template #right>
            <template v-if="!authenticated">
                <router-link class="navbar-button" :to="{ name: 'main' }">
                    로그인
                </router-link>
                <router-link class="navbar-button" :to="{ name: 'signup' }">
                    회원가입
                </router-link>
            </template>
            <template v-else>
                <a class="navbar-button" @click.prevent="logout">
                    로그아웃
                </a>
            </template>
        </template>
    </Toolbar>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Toolbar from 'primevue/toolbar'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

export default {
    components: {
        Toolbar,
        Toast,
    },
    setup() {
        const router = useRouter()
        const store = useStore()
        const toast = useToast()

        const authenticated = computed(() => store.state.authenticated)

        const logout = async () => {
            const result = await store.dispatch('logout')

            if (result.success) {
                toast.add({ 
                    severity: 'success',
                    summary: '로그아웃이 완료되었습니다.',
                    detail: '화이트보드를 이용해주셔서 감사합니다!',
                    life: 2000,
                    closable: false
                })
                router.push({ name: 'main' })
            } else {
                let errorMessage = ''

                if (result.status) {
                    if (result.status < 500) {
                        errorMessage = '잘못된 사용자 정보입니다. 화이트보드에 다시 접속해주세요.'
                    }
                    else {
                        errorMessage = '화이트보드 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
                    }
                } else {
                    errorMessage = '로그아웃 요청이 전송되지 못했습니다. 인터넷 상태를 확인해주세요.'
                }
                toast.add({ 
                    severity: 'error',
                    summary: '로그아웃에 실패했습니다.',
                    detail: errorMessage,
                    life: 2000,
                    closable: false
                })
            }
        }

        return {
            authenticated,
            logout,
        }
    }
}
</script>

<style scoped lang="stylus">
.p-toolbar
    height 4.5em
    flex-wrap nowrap !important

    .navbar-button
        width 5.5em
        height 3em
        border-radius .8rem
        display flex
        align-items  center
        justify-content center
        color black
        text-decoration none

        &:hover
            background-color #d0d2d966

        &:hover, &:visited
            color black
            text-decoration none

#logo
    width 12em
    height auto
</style>