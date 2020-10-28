<template>
<div>
    <topbar />
    <div class="main">
        <nuxt />
    </div>
</div>
</template>

<script>
import topbar from '@/components/topbar'
export default {
    components: {
        topbar
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Prompt', sans-serif;
}

.main{
    padding:100px;
    min-height: 100vh;
    background-image: url(~@/assets/img/background.jpg);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

@media screen and (max-width: 1023px){
    .main{
        padding: 100px 50px;
    }
}

@media screen and (max-width: 767px){
    .main{
        padding: 100px 25px;
    }
}
</style>
