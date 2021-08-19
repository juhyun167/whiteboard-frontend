<template>
    <Toast />

    <div class="footer-wrapper">
        <div class="text-wrapper">
            <div class="text-1">
                <router-link :to="{ name: this.$route.name }" @click.prevent="showNotImplemented()" >개인정보처리방침</router-link>
                &nbsp;&nbsp;&nbsp;
                <router-link :to="{ name: this.$route.name }" @click.prevent="showNotImplemented()" >이용약관</router-link>
            </div>
            <div class="text-2">
                이메일: whiteboard@gmail.com
            </div>
            <div class="text-3">
                Copyright © 2021 Whiteboard. All rights reserved. 
            </div>
        </div>
    </div>
</template>

<script>
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

export default {
    components: {
        Toast,
    },
    setup() {
        const toast = useToast()

        const showNotImplemented = () => {
            toast.add({ 
                severity: 'info',
                summary: '준비중입니다',
                detail: '이용에 불편을 드려 죄송합니다.',
                life: 1500
            })
        }
        
        return {
            showNotImplemented,
        }
    },
}
</script>

<style scoped lang="stylus">
.footer-wrapper
    height 6em
    display flex
    flex-direction column
    justify-content center
    background-color #e6e9eb
    color #464653

.text-wrapper
    margin-left 3em
    margin-right 3em


.text-1
    margin-bottom .4em
    font-size .9rem

    a
        text-decoration none

        &:link, &:visited
            color #464653
        &:hover
            text-decoration underline

.text-2
    float left
    font-size .8rem

.text-3
    display inline-block
    float right
    font-size .8rem

</style>