<template>
    <Toast />

    <div class="all-study-list-wrapper">
        <div class="title">
            스터디
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { service } from '@/service/service'

export default {
    components: {
        Toast,
    },
    setup() {
        const data = reactive({

        })

        const toast = useToast()

        const getAllStudy = async () => {
            const result = await service.getAllStudy()
            if (result.success) {
                
            } else {
                let errorMessage = ''

                if (result.status) {
                    if (result.status < 500) {
                        errorMessage = '세션이 만료되었습니다. 화이트보드에 다시 접속해주세요.'
                    }
                    else {
                        errorMessage = '화이트보드 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
                    }
                } else {
                    errorMessage = '스터디 목록을 가져오지 못했습니다. 인터넷 상태를 확인해주세요.'
                }
                toast.add({ 
                    severity: 'error',
                    summary: '요청이 실패했습니다.',
                    detail: errorMessage,
                    life: 2000,
                    closable: false
                })
            }
        }

        getAllStudy()

        return {
            data,
        }
    }
}
</script>

<style scoped lang="stylus">
.all-study-list-wrapper
    width 100%
    height 100%

    .title
        font-size 2em
        font-weight bolder
</style>