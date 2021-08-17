<template>
    <div class="form-wrapper">
        <Card class="shadow-7">
            <template #content>
                <div class="input-wrapper">
                    <label for="displayname">이름</label>
                    <InputText id="displayname" type="text" v-model="displayName" placeholder="이름을 입력해주세요" />
                    
                    <label for="username">아이디</label>
                    <InputText id="username" type="text" v-model="username" placeholder="user@whiteboard.com" />
                    
                    <label for="password">비밀번호</label>
                    <Password id="password" :feedback="false" v-model="password" placeholder="비밀번호를 입력해주세요" />
                    
                    <label for="password-confirm">비밀번호 확인</label>
                    <div v-if="passwordConfirmChecked === true" class="form-check-message form-check-success">
                        비밀번호가 일치합니다.
                    </div>
                    <div v-else-if="passwordConfirmChecked === false" class="form-check-message form-check-error">
                        비밀번호가 일치하지 않습니다.
                    </div>
                    <Password id="password-confirm" :feedback="false" v-model="passwordConfirm" placeholder="비밀번호를 한번 더 입력해주세요" />
                    
                    <router-link class="button-submit" :to="{ name: this.$route.name }">
                        회원가입
                    </router-link>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'

import _ from 'lodash'

export default {
    components: {
        Button,
        Card,
        InputText,
        Password,
    },
    data() {
        return {
            displayName: '',
            username: '',
            password: '',
            passwordConfirm: '',

            // for form check
            displayNameChecked: undefined,
            usernameChecked: undefined,
            passwordChecked: undefined,
            passwordConfirmChecked: undefined,
        }
    },
    watch: {
        password: function (newVal) {
            this.debouncedCheckPasswordConfirm()
        },
        passwordConfirm: function (newVal) {
            this.debouncedCheckPasswordConfirm()
        }
    },
    created() {
        this.debouncedCheckPasswordConfirm = _.debounce(this.checkPasswordConfirm, 500)
    },
    methods: {
        checkPasswordConfirm() {
            this.passwordConfirmChecked = (this.password === this.passwordConfirm)
            console.log(this.passwordConfirmChecked)
        }
    }
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
        height 2.7em
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

.form-check-message
    margin-top .25em
    font-size .9rem

.form-check-success
    color #506852

.form-check-error
    color #b52038

</style>