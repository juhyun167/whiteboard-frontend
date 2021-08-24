<template>
    <div class="sidebar-wrapper">
        <div class="sidebar-title">
            수강 목록
        </div>
        <Tree :value="data.studies">
            <template #default="slotProps">
                <b>{{ slotProps.node.label }}</b>
            </template>
            <template #url="slotProps">
                <a :href="slotProps.node.data">{{ slotProps.node.label }}</a>
            </template>
        </Tree>
    </div>
</template>

<script>
import { reactive } from 'vue'
import Tree from 'primevue/tree'

export default {
    components: {
        Tree,
    },
    setup() {
        const data = reactive({
            studies: [
                {
                    key: '0',
                    label: '기계학습',
                    children: [
                        { key: '0-0', label: '공지사항', data: '#', type: 'url' },
                        { key: '0-1', label: '자유게시판', data: '#', type: 'url' },
                    ]
                },
                {
                    key: '1',
                    label: '독일의대안문화',
                    children: [
                        { key: '1-0', label: '공지사항', data: '#', type: 'url' },
                        { key: '1-1', label: '자유게시판', data: '#', type: 'url' },
                    ]
                },
            ]
        })

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

</style>