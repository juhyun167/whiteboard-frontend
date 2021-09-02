<template>
    <Toast />

    <div class="component-wrapper">
        <div class="title">
            스터디
        </div>
        <div class="helper-text-wrapper">
            <div class="helper-text">
                {{ data.studyList.length }}개의 개설된 <strong>스터디</strong>가 있습니다.
            </div>
            <div class="paginator-button-wrapper">
                <a v-if="!paginator.isFirstPage"
                    class="paginator-button shadow-3"
                    @click.prevent="paginator.toPrevPage()">
                    <i class="pi pi-chevron-left"></i>
                </a>
                <a v-if="!paginator.isLastPage"
                    class="paginator-button shadow-3"
                    @click.prevent="paginator.toNextPage()">
                    <i class="pi pi-chevron-right"></i>
                </a>
            </div>
        </div>
        <div class="list-wrapper">
            <div v-for="i in paginator.thisPageRowCount" :key="i" class="grid">
                <div
                    v-for="study in data.studyList.slice(
                        paginator.offset + (i - 1) * paginator.itemsPerRow,
                        paginator.offset + i * paginator.itemsPerRow
                    )"
                    :key="study.id"
                    class="col-4">
                    <Card class="shadow-3">
                        <template #header>
                            <img
                                class="card-header"
                                src="@/assets/images/mock-study-card.jpeg"
                                alt="study-card-image">
                        </template>
                        <template #title>
                            <span class="study-name">{{ study.name }}</span>
                            <Tag v-if="study.isTeacher" class="status status-teacher">교육중</Tag>
                            <Tag v-if="study.isStudent" class="status status-student">수강중</Tag>
                        </template>
                        <template #content>
                            <Button v-if="!study.isStudent" label="수강 신청" @click.prevent="enrollStudy(study.id)" icon="pi pi-check" class="p-button-enroll" />
                            <Button v-else label="수강 취소" @click.prevent="unrollStudy(study.id)" icon="pi pi-times" class="p-button-enroll" />
                        </template>
                    </Card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import Card from 'primevue/card'
import { service } from '@/service/service'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

export default {
    components: {
        Toast,
        Card,
        Tag,
        Button,
    },
    emits: ['reload-sidebar'],
    setup(props, { emit }) {
        const data = reactive({
            studyList: [],
        })

        const paginator = reactive({
            itemsPerPage: 6,
            itemsPerRow: 3,
            thisPage: 1,
            offset: computed(() => (paginator.thisPage - 1) * paginator.itemsPerPage),
            prevPage: computed(() => paginator.thisPage - 1),
            nextPage: computed(() => paginator.thisPage + 1),
            thisPageItemCount: computed(
                () => ((paginator.itemsPerPage * paginator.thisPage) < data.studyList.length) ?
                            paginator.itemsPerPage :
                            data.studyList.length - (paginator.itemsPerPage * (paginator.thisPage - 1))
            ),
            thisPageRowCount: computed(
                () => Math.ceil(paginator.thisPageItemCount / paginator.itemsPerRow)
            ),
            totalPageCount: computed(
                () => Math.ceil(data.studyList.length / paginator.itemsPerPage)
            ),
            isFirstPage: computed(() => paginator.thisPage === 1),
            isLastPage: computed(() => paginator.thisPage === paginator.totalPageCount),
            toPrevPage: () => { paginator.thisPage = paginator.prevPage },
            toNextPage: () => { paginator.thisPage = paginator.nextPage },
        })

        const store = useStore()
        const toast = useToast()

        const getAllStudyList = async () => {
            const result = await service.getAllStudyList()
            if (result.success) {
                data.studyList = result.data
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

        const enrollStudy = async (studyId) => {
            const result = await service.enrollStudy(studyId)
            if (result.success) {
                toast.add({ 
                    severity: 'success',
                    summary: '수강신청이 완료되었습니다.',
                    detail: '화면 왼쪽의 메뉴를 통해 스터디 페이지를 방문해보세요!',
                    life: 2000,
                    closable: false
                })
            } else {
                let severity = 'error'
                let errorMessage = ''

                if (result.status) {
                    if (result.status < 500) {
                        if (result.status === 400) {
                            errorMessage = '존재하지 않는 스터디입니다. 버튼을 통해 올바르게 신청해주세요.'
                        } else if (result.status === 409) {
                            severity = 'warn'
                            errorMessage = '이미 수강신청한 스터디입니다.'
                        } else {
                            errorMessage = '세션이 만료되었습니다. 화이트보드에 다시 접속해주세요.'
                        }
                    }
                    else {
                        errorMessage = '화이트보드 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
                    }
                } else {
                    errorMessage = '수강신청 요청이 실패했습니다. 인터넷 상태를 확인해주세요.'
                }
                toast.add({ 
                    severity,
                    summary: '수강신청에 실패했습니다.',
                    detail: errorMessage,
                    life: 2000,
                    closable: false
                })
            }
            emit('reload-sidebar')
            getAllStudyList()
        }

        const unrollStudy = async (studyId) => {
            const result = await service.unrollStudy(studyId, store.state.user.uid)
            if (result.success) {
                toast.add({ 
                    severity: 'success',
                    summary: '수강취소가 완료되었습니다.',
                    detail: '해당 스터디가 수강 목록에서 정상적으로 삭제되었습니다!',
                    life: 2000,
                    closable: false
                })
            } else {
                let severity = 'error'
                let errorMessage = ''

                if (result.status) {
                    if (result.status < 500) {
                        if (result.status === 400) {
                            errorMessage = '존재하지 않는 스터디이거나 존재하지 않는 사용자입니다.'
                        } else if (result.status === 409) {
                            severity = 'warn'
                            errorMessage = '이미 수강취소한 스터디입니다.'
                        } else {
                            errorMessage = '세션이 만료되었습니다. 화이트보드에 다시 접속해주세요.'
                        }
                    }
                    else {
                        errorMessage = '화이트보드 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
                    }
                } else {
                    errorMessage = '수강취소 요청이 실패했습니다. 인터넷 상태를 확인해주세요.'
                }
                toast.add({ 
                    severity,
                    summary: '수강취소에 실패했습니다.',
                    detail: errorMessage,
                    life: 2000,
                    closable: false
                })
            }
            emit('reload-sidebar')
            getAllStudyList()
        }

        getAllStudyList()

        return {
            data,
            paginator,
            enrollStudy,
            unrollStudy,
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

    .helper-text-wrapper
        display flex
        align-items center
        justify-content space-between
        margin-top .7em
        font-size 1.2em

    .col-4
        margin 0
        padding 0

    .col-4:first-of-type
        padding-right .8em

    .col-4:nth-of-type(3)
        padding-left .8em
    
    .col-4:not(first-of-type):not(last-of-type)
        padding-left .4em
        padding-right .4em

    .col-4:first-of-type:last-of-type
        padding-left .4em
        padding-right .8em

    .list-wrapper
        margin-top 2.5em

        .grid
            margin-bottom 2.5em

        .grid:last-of-type
            margin-bottom 0

.p-card
    border-radius .8em
    
    .card-header
        height 12em
        border-radius .8em .8em 0 0
        object-fit cover
        -o-object-fit cover
        
        &:hover
            cursor pointer
    
    .p-card-content
        .p-button
            width 100%
            background-color #78a6a4

.status
    margin 0 0.3em
    font-size .6em
    font-weight 600
.status-teacher
    background-color #333365
.status-student
    background-color #ff993b

.paginator-button-wrapper
    display flex
    flex-direction row
    align-items center
    justify-content center

    .paginator-button
        padding .8rem
        display flex
        align-items center
        justify-content center
        border-radius 50%
        background-color white
        font-size 1.1rem

        &:hover
            cursor pointer

    .paginator-button:last-of-type
        margin-left 1em
</style>