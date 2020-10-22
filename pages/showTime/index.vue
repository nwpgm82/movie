<template>
<div class="container">
    <div class="showTime">
        <div class="box">
            <div id="main">
                <div class="header">
                    <h2>รอบฉาย</h2>
                </div>
                <hr />
                <div class="grid" v-for="(i,index) in movielist.detail" :key="index">
                    <div style="border-right:1px solid gainsboro;border-bottom:1px solid gainsboro;padding-top:6px;">
                        <h2>Theater {{i.t_num}}</h2>
                    </div>
                    <div class="sub-grid">
                        <div class="img-box">
                            <img :src="i.img_url" alt="">
                        </div>
                        <div style="padding-top:6px">
                            <h3>{{i.title_en}}</h3>
                            <h4>{{i.title_th}} | วันที่เข้าฉาย {{formatDate(i.date_input)}} | {{i.time}} นาที</h4>
                            <div style="padding-top:16px">
                                <button @click="get_movieDetail(index,i,i.seat_time1,1)" v-if="i.seat_time1">{{i.seat_time1}}</button>
                                <button @click="get_movieDetail(index,i,i.seat_time2,2)" v-if="i.seat_time2">{{i.seat_time2}}</button>
                                <button @click="get_movieDetail(index,i,i.seat_time3,3)" v-if="i.seat_time3">{{i.seat_time3}}</button>
                            </div>
                            <div style="padding-top:16px">
                                <h4>ราคาตั๋ว : {{i.price}} บาท / คน</h4>
                            </div>

                        </div>
                    </div>
                </div>
                <div style="padding-top:32px;" v-if="time_select != ''" id="selecting_movie">
                    <h2>หนังที่เลือก</h2>
                    <div class="select_grid">
                        <img :src="cart.img_url" alt="">
                        <div style="line-height:30px;">
                            <h3>{{cart.title_en}}</h3>
                            <h4>{{cart.title_th}} | วันที่เข้าฉาย {{formatDate(cart.date_input)}} | {{cart.time}} นาที</h4>
                            <h4>เวลาที่เลือก <button>{{time_select}}</button></h4>
                            <h4>ที่นั่ง : <label v-for="(seat,index) in seat_select" :key="index">{{seat}}</label></h4>
                            <h4>ราคารวม {{count_format}} บาท</h4>
                        </div>
                    </div>
                    <hr />
                    <h2>กรุณาเลือกที่นั่ง</h2>
                    <div style="padding-top:32px">
                        <div class="screen">Screen</div>
                        <div style="position:relative;width:400px;margin:auto">
                            <div class="key" style="left:0">
                                <div class="key-box">
                                    <p>F</p>
                                </div>
                                <div class="key-box">
                                    <p>E</p>
                                </div>
                                <div class="key-box">
                                    <p>D</p>
                                </div>
                                <div class="key-box">
                                    <p>C</p>
                                </div>
                                <div class="key-box">
                                    <p>B</p>
                                </div>
                                <div class="key-box">
                                    <p>A</p>
                                </div>
                            </div>
                            <div class="chair-grid">
                                <button v-for="chair in seat_theater" :key="chair.num" @click="set_seat(chair.num)" :id="`chair${chair.num}`" :disabled="chair.status==false">{{chair.num}}</button>
                            </div>
                            <div class="key" style="right:0">
                                <div class="key-box">
                                    <p>F</p>
                                </div>
                                <div class="key-box">
                                    <p>E</p>
                                </div>
                                <div class="key-box">
                                    <p>D</p>
                                </div>
                                <div class="key-box">
                                    <p>C</p>
                                </div>
                                <div class="key-box">
                                    <p>B</p>
                                </div>
                                <div class="key-box">
                                    <p>A</p>
                                </div>
                            </div>
                            <div style="padding-top:48px">
                                <button class="accept-btn" :disabled="seat_select.length==0" @click="accept()">จองตั๋ว</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="result" style="padding-top:32px;display:none;">
                <h2 style="color:#d39e00;">ผลการจอง</h2>
                <div class="result">
                    <div v-for="(result,index) in seat_select" :key="index" class="ticket">
                        <div class="header_ticket">
                            <img src="~/assets/img/logo.png" alt="">
                            <h2>{{result}}</h2>
                        </div>

                        <h3>{{cart.title_en}}</h3>
                        <h4>{{cart.title_th}}</h4>
                        <h4>{{formatDate(cart.date_input)}}</h4>
                        <h4>เวลา {{time_select}}</h4>
                    </div>
                </div>
                <div style="display:flex;justify-content:flex-end;padding-top:32px;">
                    <h4>ราคารวม : {{count_format}} บาท</h4>
                </div>
                <div>
                    <a href="/showTime"><button>กลับไปหน้าแรก</button></a>
                </div>
            </div>
            <!-- ***ห้ามแตะต้องเด็ดขาด***
            <button @click="add_seat()">add</button>
            ********************* -->
        </div>
    </div>
</div>
</template>

<script>
import firebase from "firebase";
import {
    db
} from '@/plugins/firebaseConfig.js'
import moment from 'moment'
export default {
    layout: 'main',
    data() {
        return {
            movielist: {},
            cart: {},
            theater: '',
            time_select: '',
            seat_theater: {},
            seat_select: [],
            count: 0,
            list: {},
            theater_room: '',
            sub_theater_room: ''
        }
    },
    methods: {
        get_movie() {
            db.collection("showTime").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    this.movielist = doc.data()
                    console.log(this.movielist)
                });
            });
        },

        get_movieDetail(index, movie, seat_time, num) {
            this.theater = index
            this.time_select = seat_time
            this.cart = movie
            if (this.seat_select.length != 0) {
                for (var i = 1; i <= this.seat_select.length; i++) {
                    document.getElementById(`chair${this.seat_select[i-1]}`).style.backgroundColor = ""
                    document.getElementById(`chair${this.seat_select[i-1]}`).style.color = ""
                }
                this.seat_select = []
            }
            if (this.theater == 0) {
                if (num == 1) {
                    this.theater_room = "1"
                    this.sub_theater_room = "1"
                } else if (num == 2) {
                    this.theater_room = "1"
                    this.sub_theater_room = "2"
                } else if (num == 3) {
                    this.theater_room = "1"
                    this.sub_theater_room = "3"
                }
            } else if (this.theater == 1) {
                if (num == 1) {
                    this.theater_room = "2"
                    this.sub_theater_room = "1"
                } else if (num == 2) {
                    this.theater_room = "2"
                    this.sub_theater_room = "2"
                } else if (num == 3) {
                    this.theater_room = "2"
                    this.sub_theater_room = "3"
                }
            } else if (this.theater == 2) {
                if (num == 1) {
                    this.theater_room = "3"
                    this.sub_theater_room = "1"
                } else if (num == 2) {
                    this.theater_room = "3"
                    this.sub_theater_room = "2"
                } else if (num == 3) {
                    this.theater_room = "3"
                    this.sub_theater_room = "3"
                }
            }
            var docRef = db.collection(`theater${this.theater_room}-${this.sub_theater_room}`).doc("2020-10-21");
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log(`Document data${this.theater_room}-${this.sub_theater_room}:`, doc.data());
                    this.seat_theater = doc.data().detail

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },

        set_seat(select) {
            var chair = document.getElementById(`chair${select}`)
            if (chair.style.backgroundColor == "") {
                chair.style.backgroundColor = "rgb(150, 0, 0)"
                chair.style.color = "yellow"
                this.seat_select.push(select)
                this.count = this.count + this.cart.price
            } else {
                chair.style.backgroundColor = ""
                chair.style.color = ""
                this.seat_select.splice(this.seat_select.findIndex(el => el === select), 1)
                this.count = this.count - this.cart.price
            }
            console.log(this.seat_select)
        },

        accept() {
            if (confirm("คุณต้องการจองตั๋วใช่หรือไม่ ?")) {
                for (var j = 0; j < this.seat_select.length; j++) {
                    console.log("x", this.seat_select[j])
                    var change = this.seat_theater.filter(el => el.num === this.seat_select[j])
                    this.seat_theater.splice(this.seat_theater.findIndex(el => el.num === this.seat_select[j]), 1, {
                        num: this.seat_select[j],
                        status: false
                    })
                }
                db.collection(`theater${this.theater_room}-${this.sub_theater_room}`).doc("2020-10-21").update({
                        detail: this.seat_theater
                    })
                    .then(() => {
                        console.log("Document successfully updated!");
                    });
                var main = document.getElementById("main")
                var selecting_movie = document.getElementById("selecting_movie")
                var result = document.getElementById("result")
                selecting_movie.style.display = "none"
                result.style.display = "block"
                main.style.display = "none"
                

            }
        },

        formatDate(date) {
            return moment(date).format('DD MMMM YYYY')
        },
    },
    mounted() {
        this.get_movie()
        // this.add_theater()
    },
    computed: {
        count_format() {
            return this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
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

.container .showTime {
    padding: 32px 0;

}

.container .showTime .box {
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    padding: 0 16px 32px 16px;
}

.container .showTime .box .header {
    padding: 16px 0;
}

.container .showTime .box .header h2 {
    color: #d39e00;
}

.container .showTime .box hr {
    width: 100%;
    margin-bottom: 32px;
    border: 1px solid gainsboro;
}

.container .showTime .box .grid {
    display: grid;
    grid-template-columns: 20% auto;
}

.container .showTime .box .grid .sub-grid {
    display: grid;
    grid-template-columns: 130px auto;
    border-bottom: 1px solid gainsboro;
}

.container .showTime .box .grid .sub-grid .img-box {
    width: 130px;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .showTime .box img {
    width: 110px;
    height: 150px;
    border-radius: 4px;
    object-fit: cover;
}

.container .showTime .box .grid .sub-grid button {
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #ecb100;
    cursor: pointer;
    transition: 0.3s;
}

.container .showTime .box .grid .sub-grid button:hover {
    background-color: #e0a800;
}

.container .showTime .box .chair-grid {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    align-items: center;
    grid-gap: 8px;
    width: 300px;
    margin: 60px auto 0 auto;
    position: relative;
}

.container .showTime .box .key {
    position: absolute;
    top: 0;
}

.container .showTime .box .key .key-box {
    height: 40px;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .showTime .box .select_grid {
    display: grid;
    grid-template-columns: 124px auto;
    margin: 32px 0;
}

.container .showTime .box .select_grid label {
    padding: 0 4px;
}

.container .showTime .box .select_grid button {
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #ecb100;
}

.container .showTime .box .screen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 30px;
    margin: auto;
    background-color: gray;
    color: #fff;
    border-radius: 4px;
}

.container .showTime .box .chair-grid button {
    width: 40px;
    height: 40px;
    margin: auto;
    background-color: rgb(200, 0, 0);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
}

.container .showTime .box .chair-grid button:disabled {
    background-color: grey;
    cursor: default;
}

.container .showTime .box .accept-btn {
    width: 70px;
    height: 40px;
    background-color: #ecb100;
    border: none;
    border-radius: 4px;
    display: block;
    margin: auto;
    cursor: pointer;
    transition: 0.3s;
}

.container .showTime .box .accept-btn:disabled {
    cursor: default;
}

.container .showTime .box .accept-btn:hover:enabled {
    background-color: #e0a800;
}

.container .showTime .box .result {
    overflow: auto;
    white-space: nowrap;
    width: 90%;
    margin: auto;
    padding-top: 32px;
}

.container .showTime .box .result .ticket {
    width: 200px;
    height: 200px;
    border: 1px solid;
    display: inline-block;
    margin: 32px 16px;
    padding: 16px;
    background-color: #ecb100;
}

.container .showTime .box .result .ticket .header_ticket {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container .showTime .box .result .ticket img {
    width: 40px;
    height: 40px;
}

.container .showTime .box #result a {
    text-decoration: none;
}

.container .showTime .box #result button {
    width: 120px;
    height: 40px;
    background-color: #ecb100;
    border: none;
    border-radius: 4px;
    display: block;
    margin: auto;
    cursor: pointer;
    transition: 0.3s;
}
</style>
