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
@font-face {
    font-family: 'Noto Sans KR';
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
    font-style: normal;
}

/* We use Inter for numbers and english fonts */
@font-face {
    font-family: 'Noto Sans KR';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    unicode-range: U+0020-007E;
    font-style: normal;
}

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
