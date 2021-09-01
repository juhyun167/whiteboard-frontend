<template>
    <Toast />

    <div class="component-wrapper">
        <div class="title">
            보드
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { service } from '@/service/service'

export default {
    components: {
        Toast,
    },
    emits: ['reload-sidebar'],
    setup(props, { emit }) {
        const data = reactive({
        })

        const toast = useToast()

        const getAllBoardList = () => {}

        // getAllBoardList()

        return {
            data,
        }
    }
}
</script>

<style scoped lang="stylus">
.component-wrapper
    width 100%
    height 100%

    .title
        font-size 2em
        font-weight bolder
</style>