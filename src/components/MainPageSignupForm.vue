<template>
    <Toast />

    <div class="form-wrapper">
        <Card class="shadow-7">
            <template #content>
                <div class="input-wrapper">
                    <label for="displayname">이름</label>
                    <div v-if="data.check.displayName === false" class="form-check-message form-check-error">
                        이름 형식을 다시 한번 확인해주세요.
                    </div>
                    <InputText
                        id="displayname"
                        type="text"
                        v-model="data.displayName"
                        placeholder="이름을 입력해주세요"
                        v-tooltip.bottom.focus="'이름은 2~16자이고, 특수문자를 사용할 수 없습니다'"
                    />
                    
                    <label for="username">아이디</label>
                    <div v-if="data.check.username === false" class="form-check-message form-check-error">
                        아이디 형식을 다시 한번 확인해주세요.
                    </div>
                    <InputText 
                        id="username"
                        type="text"
                        v-model="data.username"
                        placeholder="아이디를 입력해주세요"
                        v-tooltip.bottom.focus="'아이디는 6~20자의 영문과 숫자, _만 가능합니다'"
                    />
                    
                    <label for="password">비밀번호</label>
                    <div v-if="data.check.password === false" class="form-check-message form-check-error">
                        비밀번호 형식을 다시 한번 확인해주세요.
                    </div>
                    <Password 
                        id="password" 
                        :feedback="false" 
                        v-model="data.password" 
                        placeholder="비밀번호를 입력해주세요"
                        v-tooltip.bottom.focus="'비밀번호는 6~20자입니다'"
                    />
                    
                    <label for="password-confirm">비밀번호 확인</label>
                    <div v-if="data.check.passwordConfirm === true" class="form-check-message form-check-success">
                        비밀번호가 일치합니다.
                    </div>
                    <div v-else-if="data.check.passwordConfirm === false" class="form-check-message form-check-error">
                        비밀번호가 일치하지 않습니다.
                    </div>
                    <Password 
                        id="password-confirm" 
                        :feedback="false" 
                        v-model="data.passwordConfirm" 
                        placeholder="비밀번호를 한번 더 입력해주세요" 
                    />
                    
                    <a class="button-submit" @click.prevent="register">
                        회원가입
                    </a>
                </div>
            </template>
        </Card>
    </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import _ from 'lodash'

export default {
    components: {
        Card,
        InputText,
        Password,
        Toast,
    },
    setup() {
        const data = reactive({
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

        const store = useStore()
        const router = useRouter()
        const toast = useToast()

        const register = async () => {
            const response = await store.dispatch('register', {
                'displayName': data.displayName,
                'username': data.username,
                'password': data.password
            })
            if (response.success) {
                toast.add({ 
                    severity: 'success',
                    summary: '회원가입이 완료되었습니다.',
                    detail: '로그인하여 화이트보드를 둘러보세요!',
                    life: 2000
                })
                router.push({ name: 'main' })
            } else {
                toast.add({ 
                    severity: 'error',
                    summary: '회원가입에 실패했습니다.',
                    detail: '이용에 불편을 드려 죄송합니다.',
                    life: 2000
                })
            }
        }

        const checkDisplayName = () => {
            data.check.displayName = (
                (data.displayName === '') ||
                (2 <= data.displayName.length) && (data.displayName.length <= 16)
                    && !(/<|>/).test(data.displayName)
            )
        }
        const checkUsername = () => {
            data.check.username = (
                (data.username === '') ||
                (6 <= data.username.length) && (data.username.length <= 20)
                    && /^[a-zA-Z0-9_]+$/.test(data.username)
            )
        }
        const checkPassword = () => {
            data.check.password = 
                (data.password === '') ||
                (6 <= data.password.length) && (data.password.length <= 20)
        }
        const checkPasswordConfirm = () => {
            data.check.passwordConfirm = data.password === data.passwordConfirm
        }

        const debouncedCheckDisplayName = _.debounce(checkDisplayName, 500)
        const debouncedCheckUsername = _.debounce(checkUsername, 500)
        const debouncedCheckPassword = _.debounce(checkPassword, 500)
        const debouncedCheckPasswordConfirm = _.debounce(checkPasswordConfirm, 500)

        watch(
            () => data.displayName,
            (displayName, prevDisplayName) => {
                debouncedCheckDisplayName()
            }
        )
        watch(
            () => data.username,
            (username, prevUsername) => {
                debouncedCheckUsername()
            }
        )
        watch(
            () => data.password,
            (password, prevPassword) => {
                debouncedCheckPassword()
                debouncedCheckPasswordConfirm()
            }
        )
        watch(
            () => data.passwordConfirm,
            (passwordConfirm, prevPasswordConfirm) => {
                debouncedCheckPasswordConfirm()
            }
        )

        return {
            data,
            register
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