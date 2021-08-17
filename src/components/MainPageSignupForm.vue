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
                    <label for="password-check">비밀번호 확인</label>
                    <Password id="password-check" :feedback="false" v-model="passwordCheck" placeholder="비밀번호를 한번 더 입력해주세요" />
                    <Button label="회원가입" />
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
            passwordCheck: '',
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

    button
        margin-top 1em
        border-radius 2rem
        background-color black
        font-size 1.15em

        &:hover, &:enabled:focus
            background-color #62636b

</style>