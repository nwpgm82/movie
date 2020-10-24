<template>
<div class="side">
    <div class="header-icon">
        <img src="~/assets/img/logo.png" alt="">
    </div>
    <ul>
        <nuxt-link to="/admin/addMovie">
            <li id="add">เพิ่มรอบหนัง</li>
        </nuxt-link>
        <nuxt-link to="/admin/cost">
            <li id="cost">รายได้ในแต่ละวัน</li>
        </nuxt-link>
        <nuxt-link to="#">
            <li>ออกจากระบบ</li>
        </nuxt-link>
    </ul>
</div>
</template>

<script>
export default {
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.side {
    width: 250px;
    min-height: 100vh;
    background-color: #fff;
    -webkit-box-shadow: 4px 0px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 4px 0px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 0px 5px 0px rgba(0, 0, 0, 0.2);
    position: fixed;
}

.side .header-icon {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.side .header-icon img {
    width: 40px;
    height: 40px;
}

.side ul a {
    text-decoration: none;
    color: #000;
}

.side ul a li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    height: 60px;
    cursor: pointer;
    transition: 0.3s;
}

.side ul a:hover li {
    background-color: rgb(225, 225, 225);
}

.side ul a:focus li {
    background-color: rgb(190, 190, 190);
}

.side ul a:last-child:hover li {
    background-color: rgb(252, 127, 127);
}
</style>
