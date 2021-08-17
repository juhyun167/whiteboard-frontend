<template>
    <div class="footer-wrapper">
        <div class="text-wrapper">
            <div class="text-1">
                <router-link to="/">개인정보처리방침</router-link>
                &nbsp;&nbsp;&nbsp;
                <router-link to="/">이용약관</router-link>
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