<template>
<div class="box">
    <h3>ข้อมูลการจอง</h3>
    <hr />
    <h4>ค้นหาตามวันที่</h4>
    <input type="date" name="" id="" v-model="date" @change="get_cost()">
    <div style="padding-top: 32px" v-if="this.cost_list == ''">
        <p>ไม่มีข้อมูล</p>
    </div>
    <table v-if="this.cost_list != ''">
        <tr>
            <th>ลำดับ</th>
            <th>รายการจองที่นั่ง</th>
            <th>โรงหนัง</th>
            <th>ชื่อหนัง</th>
            <th>เวลาฉาย</th>
            <th>ราคา</th>
            <th>CODE</th>
            <th>สถานะการชำระเงิน</th>
        </tr>
        <tr v-for="(i,index) in cost_list" :key="index">
            <td>{{index+1}}</td>
            <td><label v-for="(j,index2) in i.seat" :key="index2">{{j}}</label></td>
            <td>Theater {{i.theater}}</td>
            <td>{{i.title_en}}</td>
            <td>{{i.showTime}}</td>
            <td>{{i.price}} บาท</td>
            <td>{{i.code}}</td>
            <td>{{i.status}}</td>
        </tr>
    </table>
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
            cost_list: '',
            date: ''
        }
    },
    methods: {
        get_cost() {
            if (this.date == '') {
                var d = new Date();
                this.date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
                console.log(this.date)
            }
            var docRef = db.collection("cost").doc(this.date);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    this.cost_list = doc.data().detail
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    },
    mounted() {
        this.get_cost()
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

hr {
    margin: 16px 0;
    border: 1px solid gainsboro;
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

.box table tr td label{
  padding: 0 4px;
}
</style>
