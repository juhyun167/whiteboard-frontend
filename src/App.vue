<template>
    <div class="navbar sticky top-0">
        <Navbar></Navbar>
    </div>
    <div class="content">
        <router-view></router-view>
    </div>
    <div class="footer">
        <Footer></Footer>
    </div>
</template>

<script>
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
    components: {
        Navbar,
        Footer,
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

#app {
    height: 100%;
    display: flex;
    flex-flow: column;
    font-family: "Noto Sans KR", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.content {
    flex: auto;
}

</style>
