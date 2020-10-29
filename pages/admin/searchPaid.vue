<template>
<div class="box">
    <h3>ค้นหารายการจอง</h3>
    <hr>
    <div class="sub-box">
        <div style="padding:0 16px;">
            <label>ค้นหา Code</label>
            <input type="text" v-model="code">
        </div>
        <div style="padding:0 16px;">
            <label>วันที่</label>
            <input type="date" v-model="date">
        </div>
        <div style="padding:0 16px;">
            <button @click="search_data()">ค้นหา</button>
        </div>
    </div>
    <div v-if="this.cost_current.length != 0">
        <table>
            <tr>
                <th>ลำดับ</th>
                <th>รายการจองที่นั่ง</th>
                <th>โรงหนัง</th>
                <th>ชื่อหนัง</th>
                <th>เวลาฉาย</th>
                <th>ราคา</th>
                <th>CODE</th>
            </tr>
            <tr v-for="(i,index) in cost_current" :key="index">
                <td>{{index+1}}</td>
                <td><label v-for="(j,index2) in i.seat" :key="index2">{{j}}</label></td>
                <td>Theater {{i.theater}}</td>
                <td>{{i.title_en}}</td>
                <td>{{i.showTime}}</td>
                <td>{{i.price}} บาท</td>
                <td>{{i.code}}</td>
            </tr>
        </table>
        <div style="display:flex;justify-content:center;align-items:center;">
            <button @click="confirm_paid()">ยืนยันการชำระเงิน</button>
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
    layout: 'admin',
    data() {
        return {
            code: '',
            date: '',
            cost_list: [],
            cost_current: []
        }
    },
    methods: {
        async search_data() {
            if (this.code != "" || this.date != "") {
                var docRef = await db.collection("cost").doc(this.date);

                await docRef.get().then((doc) => {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        this.cost_list = doc.data().detail
                        this.cost_current = this.cost_list.filter(el => el.code === this.code)
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        alert("ไม่พบข้อมูล")
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
                alert("กรอกข้อมูลให้ครบ")
            }

        },
        async confirm_paid() {
            if (confirm("คุณต้องการยืนยันการชำระเงินใช่หรือไม่?")) {
                await this.cost_list.splice(this.cost_list.findIndex(el => el.code === this.code), 1, {
                    code: this.code,
                    price: this.cost_current[0].price,
                    seat: this.cost_current[0].seat,
                    showTime: this.cost_current[0].showTime,
                    theater: this.cost_current[0].theater,
                    title_en: this.cost_current[0].title_en,
                    status: 'ชำระเงินแล้ว'
                })
                await console.log(this.cost_list)
                db.collection("cost").doc(this.date).set({
                        detail: this.cost_list
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        alert("ยืนยันการชำระเงินเรียบร้อยแล้ว")
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }
        }
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

hr {
    margin: 16px 0;
    border: 1px solid gainsboro;
}

.sub-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
}

.sub-box label {
    padding-right: 16px;
}

.sub-box input {
    width: 160px;
    height: 40px;
    border: 1px solid #d39e00;
    border-radius: 4px;
    padding: 0 12px;
}

.box table {
    margin: 32px 0;
    width: 100%;
    border-collapse: collapse;
}

.box table tr th {
    height: 60px;
    background-color: #ecb100;
    border: 1px solid #000;
}

.box table tr th:first-child {
    width: 60px;
}

.box table tr td:first-child {
    text-align: center;
}

.box table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.box table tr td {
    height: 60px;
    padding: 0 12px;
    border: 1px solid rgb(190, 190, 190);
}

.box input[type="date"] {
    width: 160px;
    height: 40px;
    border: 1px solid #d39e00;
    border-radius: 4px;
    padding: 0 12px;
}

.box table tr td label {
    padding: 0 4px;
}

.box .sub-box button {
    margin: 8px 0;
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 4px;
    background-color: #ecb100;
    cursor: pointer;
    transition: 0.3s;
}

.box .sub-box button:hover {
    background-color: #e0a800;
}

.box button {
    margin: 8px 0;
    width: 160px;
    height: 40px;
    border: none;
    border-radius: 4px;
    background-color: #ecb100;
    cursor: pointer;
    transition: 0.3s;
}

.box button:hover {
    background-color: #e0a800;
}
</style>
