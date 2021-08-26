<template>
    <div class="grid">
        <div class="sidebar col-fixed">
            <Sidebar />
        </div>
        <div class="homepage-content col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
    components: {
        Sidebar,
    },
    setup() {
        const componentKey = ref(0)

        const forceReloadSidebar = () => {
            componentKey.value++
        }

        return {
            componentKey,
            forceReloadSidebar,
        }
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
        padding-bottom 4em

.sidebar
    width 250px
    
.homepage-content
    background-color #dce0e380
    padding-top 2.5em !important
    padding-left 3em !important
    padding-right 3em !important
</style>