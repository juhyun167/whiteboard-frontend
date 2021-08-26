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
@import url('./assets/styles/pretendard.css');
@import url('./assets/styles/pretendard-subset.css');

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
}

#app {
    height: 100%;
    display: flex;
    flex-flow: column;
    font-family: "Pretendard", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.navbar {
    z-index: 100;
}

.content {
    flex: auto;
}

.p-component {
    font-family: "Pretendard", sans-serif !important;
}

</style>