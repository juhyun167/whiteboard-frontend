<template>
    <div class="form-wrapper">
        <Card class="shadow-7">
            <template #content>
                <div class="input-wrapper">
                    <label for="displayname">이름</label>
                    <div v-if="state.check.displayName === false" class="form-check-message form-check-error">
                        이름 형식을 다시 한번 확인해주세요.
                    </div>
                    <InputText
                        id="displayname"
                        type="text"
                        v-model="state.displayName"
                        placeholder="이름을 입력해주세요"
                        v-tooltip.bottom.focus="'이름은 2~16자이고, 특수문자를 사용할 수 없습니다'"
                    />
                    
                    <label for="username">아이디</label>
                    <div v-if="state.check.username === false" class="form-check-message form-check-error">
                        아이디 형식을 다시 한번 확인해주세요.
                    </div>
                    <InputText 
                        id="username"
                        type="text"
                        v-model="state.username"
                        placeholder="아이디를 입력해주세요"
                        v-tooltip.bottom.focus="'아이디는 6~20자의 영문과 숫자, _만 가능합니다'"
                    />
                    
                    <label for="password">비밀번호</label>
                    <div v-if="state.check.password === false" class="form-check-message form-check-error">
                        비밀번호 형식을 다시 한번 확인해주세요.
                    </div>
                    <Password 
                        id="password" 
                        :feedback="false" 
                        v-model="state.password" 
                        placeholder="비밀번호를 입력해주세요"
                        v-tooltip.bottom.focus="'비밀번호는 6~20자입니다'"
                    />
                    
                    <label for="password-confirm">비밀번호 확인</label>
                    <div v-if="state.check.passwordConfirm === true" class="form-check-message form-check-success">
                        비밀번호가 일치합니다.
                    </div>
                    <div v-else-if="state.check.passwordConfirm === false" class="form-check-message form-check-error">
                        비밀번호가 일치하지 않습니다.
                    </div>
                    <Password 
                        id="password-confirm" 
                        :feedback="false" 
                        v-model="state.passwordConfirm" 
                        placeholder="비밀번호를 한번 더 입력해주세요" 
                    />
                    
                    <router-link class="button-submit" :to="{ name: this.$route.name }">
                        회원가입
                    </router-link>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { reactive, watch } from 'vue'
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
    setup() {
        const state = reactive({
            displayName: '',
            username: '',
            password: '',
            passwordConfirm: '',

            // for form check
            check: {
                displayName: 'undefined',
                username: 'undefined',
                password: 'undefined',
                passwordConfirm: 'undefined'
            }
        })

        const checkDisplayName = () => {
            state.check.displayName = (
                (state.displayName === '') ||
                (2 <= state.displayName.length) && (state.displayName.length <= 16)
                    && !(/<|>/).test(state.displayName)
            )
        }
        const checkUsername = () => {
            state.check.username = (
                (state.username === '') ||
                (6 <= state.username.length) && (state.username.length <= 20)
                    && /^[a-zA-Z0-9_]+$/.test(state.username)
            )
        }
        const checkPassword = () => {
            state.check.password = 
                (state.password === '') ||
                (6 <= state.password.length) && (state.password.length <= 20)
        }
        const checkPasswordConfirm = () => {
            state.check.passwordConfirm = state.password === state.passwordConfirm
        }

        const debouncedCheckDisplayName = _.debounce(checkDisplayName, 500)
        const debouncedCheckUsername = _.debounce(checkUsername, 500)
        const debouncedCheckPassword = _.debounce(checkPassword, 500)
        const debouncedCheckPasswordConfirm = _.debounce(checkPasswordConfirm, 500)

        watch(
            () => state.displayName,
            (displayName, prevDisplayName) => {
                debouncedCheckDisplayName()
            }
        )
        watch(
            () => state.username,
            (username, prevUsername) => {
                debouncedCheckUsername()
            }
        )
        watch(
            () => state.password,
            (password, prevPassword) => {
                debouncedCheckPassword()
                debouncedCheckPasswordConfirm()
            }
        )
        watch(
            () => state.passwordConfirm,
            (passwordConfirm, prevPasswordConfirm) => {
                debouncedCheckPasswordConfirm()
            }
        )

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

.form-check-message
    margin-top .25em
    font-size .9rem

.form-check-success
    color #506852

.form-check-error
    color #b52038

</style>