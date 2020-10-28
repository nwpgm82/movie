<template>
<div class="container">
    <div class="nowPlaying">
        <div class="box">
            <div class="header">
                <h2>ภาพยนตร์ที่กำลังฉายวันนี้</h2>
            </div>
            <hr />
            <div v-if="this.movielist == ''">
                ไม่มีหนังฉาย!
            </div>
            <div class="grid" v-if="this.movielist != '' ">
                <div class="card" v-for="(i,index) in movielist.detail" :key="i.t_num">
                    <img :id="`poster${index}`" alt="">
                    <div class="btn-box">
                        <a href="/showTime">
                            <button>
                                <p>ซื้อตั๋ว</p>
                                <img src="~/assets/img/ticket.png" alt="">
                            </button>
                        </a>
                    </div>
                    <div class="text">
                        <h3>{{i.title_en}}</h3>
                        <h4>{{i.title_th}}</h4>
                        <p>วันที่เข้าฉาย {{i.date_input}}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import firebase from "firebase";
import {
    db
} from '@/plugins/firebaseConfig.js'
export default {
    layout: 'main',
    data() {
        return {
            movielist: '',
            date: ''
        }
    },
    methods: {
        get_movie() {
            var d = new Date();
            this.date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
            console.log(this.date)
            var docRef = db.collection("showTime").doc("2020-10-25");
            docRef.get().then((doc) => {
                if (doc.exists) {
                    // console.log("Document data:", doc.data());
                    this.movielist = doc.data()
                    console.log(this.movielist)
                    // console.log(this.movielist.detail[0].img_url)
                    var storageRef = firebase.storage().ref();
                    for (let i = 0; i < this.movielist.detail.length; i++) {
                        var poster = storageRef.child(`images/2020-10-25/${this.movielist.detail[i].img_url}`);
                        // Get the download URL
                        poster.getDownloadURL().then((url) => {
                            // Insert url into an <img> tag to "download"
                            var poster_show = document.getElementById(`poster${i}`);
                            console.log("x", i)
                            poster_show.src = url;
                        }).catch((error) => {
                            console.log(error)
                        });
                    }
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },
    },
    mounted() {
        this.get_movie()
    }
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
    min-height: 700px;
    border-radius: 4px;
    background-color: #fff;
    padding: 0 16px 16px 16px;
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
    grid-template-columns: 25% 25% 25% 25%;

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

.container .nowPlaying .box .grid .btn-box {
    margin-bottom: 8px;
    position: relative;
}

.container .nowPlaying .box .grid .btn-box img {
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

.container .nowPlaying .box .grid .btn-box button:hover {
    background-color: #f3b90c;
}

.container .nowPlaying .box .grid .text {
    line-height: 30px;
}

.container .nowPlaying .box .grid .card h4 {
    font-weight: 500;
}

@media screen and (max-width: 1200px) {
    .container {
        width: 100%;
    }
}

@media screen and (max-width: 1023px) {
    .container .nowPlaying .box .grid {
        width: 100%;
    }
    .container .nowPlaying .box .grid .card {
        width: 150px;
        height: 250px;
        margin: 0 auto;
    }

    .container .nowPlaying .box .grid .card img {
        width: 150px;
        height: 250px;
    }

    .container .nowPlaying .box .grid .btn-box img {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 40px;
    }
    .container .nowPlaying .box .grid .btn-box button {
        width: 100%;
    }
}

@media screen and (max-width: 767px) {
     .container .nowPlaying .box .grid {
         grid-template-columns: auto auto;
     }
    .container .nowPlaying .box .grid .card {
        width: 160px;
        height: 250px;
        margin: 0 auto;
    }

    .container .nowPlaying .box .grid .card img {
        width: 160px;
        height: 250px;
    }

    .container .nowPlaying .box .grid .btn-box img {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 40px;
    }

    
}

@media screen and (max-width: 500px) {
    .container .nowPlaying .box .grid .card {
        width: 140px;
        height: 240px;
        margin: 0 auto;
    }

    .container .nowPlaying .box .grid .card img {
        width: 140px;
        height: 240px;
    }

    .container .nowPlaying .box .grid .btn-box img {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 30px;
    }
}

@media screen and (max-width: 361px) {
    .container .nowPlaying .box .grid .card {
        width: 120px;
        height: 220px;
        margin: 0 auto;
    }

    .container .nowPlaying .box .grid .card img {
        width: 120px;
        height: 220px;
    }

    .container .nowPlaying .box .grid .btn-box img {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 20px;
    }
}

@media screen and (max-width: 321px) {
    .container .nowPlaying .box .grid .card {
        width: 110px;
        height: 200px;
        margin: 0 auto;
    }

    .container .nowPlaying .box .grid .card img {
        width: 110px;
        height: 200px;
    }

    .container .nowPlaying .box .grid .btn-box img {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0;
        right: 20px;
    }
}
</style>
