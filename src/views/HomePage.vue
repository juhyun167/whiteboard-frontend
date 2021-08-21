<template>
    <div class="grid">
        <div class="sidebar col-fixed">
            <Sidebar />
        </div>
        <div class="homepage-content col">
            <AllStudyList />
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import AllStudyList from '@/components/AllStudyList.vue'

export default {
    components: {
        Sidebar,
        AllStudyList,
    }
}
</script>

<style scoped lang="stylus">
.grid
    height 100%
    margin 0

    .col, .col-fixed
        display flex
        align-items center
        justify-content center
        margin 0
        padding 0
        padding-top 1.5em

.sidebar
    width 250px
    background-color orange
    
.homepage-content
    background-color #dce0e380
    padding-top 2.5em !important
    padding-left 3em !important
    padding-rght 3em !important
</style>