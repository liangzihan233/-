<template>
    <div class="chart-container">
        <div class="desc">
            <div class="sum-up">
                2025年我们闹矛盾10次
            </div>
            <div class="left">
                <div>较去年的<span class="time-period">5次</span></div>
                <div>上涨了50%，其中小白哭过<span class="time-period">4次</span></div>
                <div>小白伤心的原因是，觉得老公<span class="time-period">不爱了</span></div>
                <div>小鸡毛哭过<span class="time-period">6次</span></div>
                <div>小鸡毛伤心的原因是，觉得小白<span class="time-period">太凶了</span></div>
                <br></br>
              </div>
            <div class="right">
                <div>{{ chatdescription.quote[0] }}</div>
                <div>{{ chatdescription.quote[1] }}</div>
            </div>
            <div class="dog-image">
                <img src="../../public/dog/2.png" alt="Dog" />
            </div>
        </div>
    </div>
</template>

<script setup name="one">
import { ref, onMounted, onUnmounted } from 'vue';
import { chatdescription } from '../js/getdata.js';

const timePeriodData = ref([]);



</script>

<style scoped>
@font-face {
    font-family: "Pacifico-Regular";
    src: url("../../public/font/Pacifico-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
}

.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    height: 100vh;
    width: 100vw;
    padding: 20px 0 0 0;
    box-sizing: border-box;
    animation: fadeIn 1s;
}

.chart {
    width: 45%;
    height: 250px;
    margin: 18px 0;
}

.desc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 14px;
    color: #333;
    width: 35%;
    position: relative;
}

.sum-up {
    font-size: 40px;
    /* font-weight: bold; */
    text-align: left;
    color: white;
    width: 100%;
    animation: slideInFromLeft 2s ease-out forwards;
}

.left {
    text-align: left;
    width: 100%;
    font-size: 20px;
    font-family: 'Microsoft YaHei';
    color: #000;
    animation: slideInFromRight 1.5s ease-out forwards;
    animation-delay: 2s;
    opacity: 0;
}

.time-period {
    font-family: Pacifico-Regular;
    font-size: 24px;
    color: #fff;
}

.right {
    text-align: right;
    width: 100%;
    font-size: 20px;
    font-family: 'Microsoft YaHei';
    color: #000;
    animation: fadeIn 1.5s ease-out forwards;
    animation-delay: 3.5s;
    opacity: 0;
}

@media screen and (max-width: 768px) {
    .chart {
        width: 90%;
    }

    .desc {
        width: 80%;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideInFromLeft {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInFromRight {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
.dog-image {
    position: fixed;
    bottom: 20px;
    left: 20px;
}

.dog-image img {
    width: 250px;
    height: auto;
}

@media screen and (max-width: 768px) {
    .chart {
        width: 90%;
        height: 200px;
        margin: 10px 0;
    }

   .desc {
        width: 80%;
        height: 10vh;
    }
    .left{
        font-size: 16px;
    }
    .sum-up{
        font-size: 30px;
    }
    .dog-image img {
        width: 200px;
        height: auto;
    }
}
</style>
