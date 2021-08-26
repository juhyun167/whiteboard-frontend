<template>
    <Toast />

    <div class="sidebar-wrapper">
        <div class="sidebar-title">
            수강 목록
        </div>
        <Tree v-if="data.myStudyList.length" :value="data.myStudyList">
            <template #default="slotProps">
                <b>{{ slotProps.node.label }}</b>
            </template>
            <template #url="slotProps">
                <div v-if="slotProps.node.key.includes('no-boards')" class="no-boards">
                    {{ slotProps.node.label }}
                </div>
                <a v-else :href="slotProps.node.data">{{ slotProps.node.label }}</a>
            </template>
        </Tree>
        <div v-else class="my-study-list-absent">
            수강 중인 스터디가 없습니다.
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Tree from 'primevue/tree'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { service } from '@/service/service'

export default {
    components: {
        Tree,
        Toast,
    },
    setup() {
        const data = reactive({
            myStudyList: [],
        })

        const router = useRouter()
        const store = useStore()
        const toast = useToast()

        const getMyStudyList = async () => {
            const result = await service.getMyStudyList(store.state.user.uid)
            console.log(result)
            if (result.success) {
                for (let study of result.data) {
                    let studyObject = {
                        key: study.id,
                        label: study.name,
                        children: [],
                    }
                    if (study.boards.length) {
                        for (let board of study.boards) {
                            studyObject.children.push({
                                key: `${study.id}-${board.id}`,
                                label: board.name,
                                data: `/home/board/${board.id}`,
                                type: 'url',
                            })
                        }
                    } else {
                        studyObject.children.push({
                            key: `${study.id}-no-boards`,
                            label: '게시판이 없습니다',
                            data: '',
                            type: 'url',
                        })
                    }
                    data.myStudyList.push(studyObject)
                }
                router.push({ name: 'home' })
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
                    errorMessage = '수강 중인 스터디 목록을 가져오지 못했습니다. 인터넷 상태를 확인해주세요.'
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

        getMyStudyList()

        return {
            data,
        }
    },
}
</script>

<style scoped lang="stylus">
.sidebar-wrapper
    width 100%
    height 100%
    margin-left 1.4em
    margin-right 1.4em

.sidebar-title
    font-size 1.4rem
    font-weight bold
    margin-bottom .5em

.p-tree
    padding 0
    border none

.p-treenode-label
    a
        text-decoration none
        color #2b2b33

        :&hover, :&visited
            text-decoration none
            color #2b2b33

/* Tree component style override */

:deep(.p-treenode)
    padding 0 !important

    span
        b
            font-size 1.15em

:deep(.p-treenode-content)
    padding 0 !important

:deep(.p-treenode-label)
    width 100% !important

:deep(.p-treenode-children)
    li:last-of-type
        margin-bottom .8em

:deep(.p-tree-toggler)
    width 2rem !important
    height 2rem !important
    margin-right 0 !important

:deep(.p-tree-toggler-icon)
    font-size .9rem !important

:deep(.p-treenode-leaf)
    button
        width 1rem !important

.my-study-list-absent
    margin-top .5em

.no-boards
    color #464653c0

</style>