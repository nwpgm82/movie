<template>
<div class="box">
    <h3>เพิ่มรอบหนัง</h3>
    <div style="padding-top:32px;">
        <h4>เลือกโรงหนัง</h4>
        <div style="padding-top:16px">
            <button @click="select_theater('theater1')">Theater1</button>
            <button @click="select_theater('theater2')">Theater2</button>
            <button @click="select_theater('theater3')">Theater3</button>
        </div>
        <div class="form">
            <div style="display:flex">
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
                        <input type="text" id="time_show1">
                    </div>
                    <div style="width:auto;padding-left:8px;">
                        <p>รอบที่ 2</p>
                        <input type="text" id="time_show2">
                    </div>
                    <div style="width:auto;padding-left:8px;">
                        <p>รอบที่ 3</p>
                        <input type="text" id="time_show3">
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
                        <input type="file" accept="image/*" @change="preview_image()">
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
            img: ''
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
            document.getElementById("t").value = ""
        },
        preview_image() {
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('output_image');
                output.style.display = "block"
                this.img = output.value
                output.src = reader.result;
            }
            reader.readAsDataURL(event.target.files[0]);
            console.log(this.img)
        },
        accept() {
            if (this.en == "" || this.th == "" || this.date_input == "" || this.time == "" || document.getElementById("price").value == "") {
                alert("กรอกข้อมูลให้ครบ")
            }else{
              // อัพข้อมูล
              // อัพรูป
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
.box .form input[type="date"] {
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
