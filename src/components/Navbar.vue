<template>
    <Toolbar flex align-items-center>
        <template #left>
            <router-link :to="{ name: 'main' }">
                <img id="logo" src="../assets/images/logo.png">
            </router-link>
        </template>

        <template #right>
            <router-link class="navbar-button" :to="{ name: 'main' }">
                로그인
            </router-link>
            <router-link class="navbar-button" :to="{ name: 'signup' }">
                회원가입
            </router-link>
        </template>
    </Toolbar>
</template>

<script>
import Toolbar from 'primevue/toolbar'

export default {
    components: {
        Toolbar,
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