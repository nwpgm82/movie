<template>
<div class="box">
    <!-- {{list}} -->
    <h3>เพิ่มรอบหนัง</h3>
    <div style="padding-top:32px;">
        <h4>เลือกโรงหนัง</h4>
        <div style="padding-top:16px">
            <button @click="select_theater('1')">Theater1</button>
            <button @click="select_theater('2')">Theater2</button>
            <button @click="select_theater('3')">Theater3</button>
        </div>
        <div class="form">
            <h3>Theater select : Theater{{theater}}</h3>
            <div style="display:flex;padding-top:32px;">
                <div style="width:auto;">
                    <p>ชื่อหนัง (ภาษาอังกฤษ)</p>
                    <input type="text" id="en" v-model="en">
                </div>
                <div style="width:auto;padding-left:8px;">
                    <p>ชื่อหนัง (ภาษาไทย)</p>
                    <input type="text" id="th" v-model="th">
                </div>
                <div style="width:auto;padding-left:8px;">
                    <p>เวลาที่ลง</p>
                    <input type="date" id="date_input" v-model="date_input">
                </div>
                <div style="width:auto;padding-left:8px;">
                    <p>ระยะเวลาหนัง</p>
                    <input type="text" id="time" v-model="time">
                </div>
                <div style="width:auto;padding-left:8px;">
                    <p>ราคาตั๋ว</p>
                    <input type="number" id="price" v-model="price">
                </div>
            </div>
            <div style="padding-top:32px;">
                <h4>กรอกรอบเวลา</h4>
                <div style="display:flex;padding-top:16px;">
                    <div style="width:auto;">
                        <p>รอบที่ 1</p>
                        <input type="text" id="time_show1" v-model="time_show1">
                    </div>
                    <div style="width:auto;padding-left:8px;">
                        <p>รอบที่ 2</p>
                        <input type="text" id="time_show2" v-model="time_show2">
                    </div>
                    <div style="width:auto;padding-left:8px;">
                        <p>รอบที่ 3</p>
                        <input type="text" id="time_show3" v-model="time_show3">
                    </div>
                </div>
            </div>
            <div style="padding-top:32px;">
                <h4>รูปโปสเตอร์</h4>
                <div style="padding-top:16px">
                    <div style="width: 110px;height: 150px;border:1px solid #d39e00;">
                        <img id="output_image" class="preview_img" style="display:none" />
                    </div>
                    <div style="padding-top:16px">
                        <input type="file" accept="image/*" id="poster" @change="preview_image()">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display:flex;justify-content:center;align-items:center;padding-top:32px">
        <button class="accept-btn" @click="accept()">ยืนยัน</button>
    </div>
</div>
</template>

<script>
import firebase from "firebase";
import {
    db
} from '@/plugins/firebaseConfig.js'
export default {
    layout: 'admin',
    data() {
        return {
            theater: '',
            en: '',
            th: '',
            date_input: '',
            time: '',
            price: Number,
            img: '',
            list: [],
            time_show1: '',
            time_show2: '',
            time_show3: '',
            detail: []
        }

    },
    methods: {
        select_theater(t) {
            this.theater = t
            console.log(this.theater)
            document.getElementById("en").value = ""
            document.getElementById("th").value = ""
            document.getElementById("date_input").value = ""
            document.getElementById("time").value = ""
            document.getElementById("price").value = ""
            document.getElementById("time_show1").value = ""
            document.getElementById("time_show2").value = ""
            document.getElementById("time_show3").value = ""
        },
        preview_image() {
            var reader = new FileReader();
            reader.onload = () => {
                var output = document.getElementById('output_image');
                this.img_url = document.getElementById("poster").files[0].name
                output.style.display = "block"
                output.src = reader.result;
                console.log(this.img_url)
            }
            reader.readAsDataURL(event.target.files[0]);

        },
        async accept() {
            if (this.theater == "" || this.en == "" || this.th == "" || this.date_input == "" || this.time == "" || this.time_show1 == "" || this.time_show2 == "" || this.time_show3 == "" || document.getElementById("price").value == "") {
                alert("กรอกข้อมูลให้ครบ")
            } else {
                var docRef = await db.collection("showTime").doc(this.date_input);

                await docRef.get().then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        this.list = doc.data().detail
                        this.list.push({
                            date_input: this.date_input,
                            id: 'time1',
                            id2: 'time2',
                            id3: 'time3',
                            seat_time1: this.time_show1,
                            seat_time2: this.time_show2,
                            seat_time3: this.time_show3,
                            img_url: this.img_url,
                            price: this.price,
                            t_num: this.theater,
                            time: this.time,
                            title_en: this.en,
                            title_th: this.th
                        })
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
                db.collection("showTime").doc(this.date_input).set({
                        detail: this.list
                    })
                    .then(() => {

                        for (var f = 1; f <= 5; f++) {
                            this.detail.push({
                                num: `F${f}`,
                                status: true,
                            })
                        }
                        for (var e = 1; e <= 5; e++) {
                            this.detail.push({
                                num: `E${e}`,
                                status: true,
                            })
                        }
                        for (var d = 1; d <= 5; d++) {
                            this.detail.push({
                                num: `D${d}`,
                                status: true,
                            })
                        }
                        for (var c = 1; c <= 5; c++) {
                            this.detail.push({
                                num: `C${c}`,
                                status: true,
                            })
                        }
                        for (var b = 1; b <= 5; b++) {
                            this.detail.push({
                                num: `B${b}`,
                                status: true,
                            })
                        }
                        for (var a = 1; a <= 5; a++) {
                            this.detail.push({
                                num: `A${a}`,
                                status: true
                            })
                        }

                        console.log(this.detail)
                        for (var i = 1; i <= 3; i++) {
                            db.collection(`theater${this.theater}-${i}`).doc(this.date_input).set({
                                    detail: this.detail
                                })
                                .then(() => {
                                    console.log("Document successfully written!");
                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                                });
                        }

                        // Created a Storage Reference with root dir
                        var storageRef = firebase.storage().ref();
                        // Get the file from DOM
                        var file = document.getElementById("poster").files[0];
                        console.log(file);
                        //dynamically set reference to the file name
                        var thisRef = storageRef.child(`images/${this.date_input}/${this.img_url}`);

                        //put request upload file to firebase storage
                        thisRef.put(file).then((snapshot) => {
                            alert("เพิ่มหนังเรียบร้อยแล้ว")
                            console.log("Document successfully written!");
                            location.href = "/admin/addMovie"
                        });
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
                console.log(this.list)
            }
        }
    },
    mounted() {
        // this.get_movie()
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

.box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 4px;
    padding: 32px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
}

.box button {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 4px;
    background-color: rgb(228, 228, 228);
    cursor: pointer;
    transition: 0.3s;
}

.box button:hover {
    background-color: rgb(220, 220, 220);
}

.box .form {
    padding-top: 32px;
}

.box .form input[type="text"],
.box .form input[type="date"],
.box .form input[type="number"] {
    margin-top: 8px;
    padding: 0 12px;
    width: 100%;
    height: 40px;
    border: 1px solid #d39e00;
    border-radius: 4px;
    font-size: 16px;
}

.box .accept-btn {
    width: 80px;
    height: 40px;
    background-color: #ecb100;
    transition: 0.3s;
}

.box .accept-btn:hover {
    background-color: #e0a800;
}

.box .preview_img {
    width: 110px;
    height: 150px;
    object-fit: cover;
}
</style>
