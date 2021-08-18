<template>
    <div class="form-wrapper">
        <Card class="shadow-7">
            <template #content>
                <div class="input-wrapper">
                    <label for="username">아이디</label>
                    <InputText id="username" type="text" v-model="state.username" placeholder="user@whiteboard.com" />
                    
                    <label for="password">비밀번호</label>
                    <Password id="password" :feedback="false" v-model="state.password" placeholder="비밀번호를 입력해주세요" />
                    
                    <router-link class="button-submit" :to="{ name: this.$route.name }">
                        로그인
                    </router-link>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { reactive } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

export default {
    components: {
        Button,
        Card,
        InputText,
        Password,
    },
    setup() {
        const state = reactive({
            username: '',
            password: ''
        })

        return {
            state,
        }
    },
}
</script>

<style scoped lang="stylus">
.form-wrapper
    width 80%

.p-card
    border-radius 1.5em

.input-wrapper
    padding 1em
    display flex
    flex-direction column
    justify-content center

    input,
    :deep(.p-inputtext)
        width 100%
        margin-bottom 1em
        padding-left .3em
        padding-bottom .5em
        border none
        border-bottom 1px solid #d0d2d9
        border-radius 0
        font-family "Noto Sans KR", sans-serif
        
        ::placeholder
            color #d0d2d9

        &:focus
            box-shadow none
            border-color black

    .button-submit
        height 3em
        display flex
        align-items center
        justify-content center
        margin-top 1em
        border-radius 2rem
        background-color black
        color white
        font-size 1.15em
        text-decoration none

        &:hover, &:enabled:focus
            text-decoration none
            background-color #62636b

</style>