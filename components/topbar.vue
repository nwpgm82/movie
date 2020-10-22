<template>
<div class="topbar-main">
    <div class="topbar">
        <img src="~/assets/img/logo.png" alt="">
    </div>
    <div class="menu">
        <ul>
            <a href="/"><li>หนังที่กำลังฉาย</li></a>
            <a href="/showTime"><li>รอบหนัง</li></a>
            <a href="/contact"><li>ติดต่อเรา</li></a>
        </ul>
    </div>
</div>
</template>

<script>
export default {

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

.topbar-main {
    position: fixed;
    top: 0;
    width: 100%;
}

.topbar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #FFC40E;
    -webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
    z-index: 15;
    position: relative;
}

.topbar img {
    width: 40px;
    height: 40px;
}

.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: rgb(60, 60, 60);
    z-index: 10;
    position: relative;
    overflow: hidden;
    -webkit-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.2);
}

.menu a{
    text-decoration: none;
    color: #fff;
}

.menu li{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    color: #fff;
    transition: 0.3s;
}

.menu li:hover{
    color: rgb(200, 200, 200);
}
</style>
