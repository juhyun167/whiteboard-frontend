<template>
    <div class="grid">
        <div class="col">
            <div class="text-wrapper">
                <div class="title">
                    그룹 스터디가 <br>
                    더욱 재밌어집니다
                </div>
                <div class="subtitle">
                    팀과 함께 몰입하는 경험 <br>
                    지금 바로 시작하세요
                </div>
            </div>
        </div>
        <div class="col">
            <img src="../assets/images/scrum-board.svg">
        </div>
        <div class="col">
            <keep-alive>
                <component :is="currentForm"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import MainPageLoginForm from '@/components/MainPageLoginForm.vue'
import MainPageSignupForm from '@/components/MainPageSignupForm.vue'

export default {
    props: {
        currentForm: String  
    },
    components: {
        MainPageLoginForm,
        MainPageSignupForm
    },
}
</script>

<style scoped lang="stylus">
.grid
    height 100%
    margin 0
    padding-top 4em
    padding-bottom 5em

    .col
        display flex
        align-items center
        justify-content center
        padding 0 !important
    
    .col:first-of-type
        .text-wrapper
            width 80%

            .title
                font-size 3.2rem
                font-weight 700

            .subtitle
                margin-top .5em
                font-size 2rem
                font-color #62636b

    .col:nth-of-type(2)
        img
            width 90%
</style>