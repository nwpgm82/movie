<template>
<div class="container">
    <div class="nowPlaying">
        <div class="box">
            <div class="header">
                <h2>ภาพยนตร์ที่กำลังฉาย</h2>
            </div>
            <hr />
            <div class="grid">
                <div class="card">
                    <img src="https://i.pinimg.com/originals/f6/60/44/f66044702dd17fb73291784586d316ac.png" alt="">
                    <div class="btn-box">
                        <button>
                          <p>ซื้อตั๋ว</p>
                          <img src="~/assets/img/ticket.png" alt="">
                        </button>
                    </div>
                    <div class="text">
                        <h3>Movie Title</h3>
                        <h4>ชีวิต</h4>
                        <p>วันที่เข้าฉาย 18/10/20</p>
                    </div>

                </div>
                <div class="card">
                    <img src="" alt="">
                </div>
                <div class="card">
                    <img src="" alt="">
                </div>
                <div class="card">
                    <img src="" alt="">
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'main'
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    width: 1000px;
    margin: auto;
}

.container .nowPlaying {
    padding: 32px 0;

}

.container .nowPlaying .box {
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    padding: 0 16px;
}

.container .nowPlaying .box .header {
    padding: 16px 0;
}

.container .nowPlaying .box .header h2 {
    color: #d39e00;
}

.container .nowPlaying .box hr {
    width: 100%;
    margin-bottom: 32px;
    border: 1px solid gainsboro;
}

.container .nowPlaying .box .grid {
    display: grid;
    grid-template-columns: auto auto auto auto;

}

.container .nowPlaying .box .grid .card {
    width: 185px;
    height: 420px;
    margin: auto;
}

.container .nowPlaying .box .grid .card img {
    width: 185px;
    height: 275px;
    border-radius: 4px;
    object-fit: cover;
}

.container .nowPlaying .box .grid .btn-box{
  margin-bottom:8px;
  position: relative;
}

.container .nowPlaying .box .grid .btn-box img{
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 50px;
}

.container .nowPlaying .box .grid .btn-box button {
    width: 185px;
    height: 30px;
    background-color: #FFC40E;
    border: none;
    border-radius: 4px;
    padding-right: 20px;
    cursor: pointer;
    transition: 0.3s;
}

.container .nowPlaying .box .grid .btn-box button:hover{
  background-color: #f3b90c;
}

.container .nowPlaying .box .grid .text {
    line-height: 30px;
}

.container .nowPlaying .box .grid .card h4 {
    font-weight: 500;
}
</style>
