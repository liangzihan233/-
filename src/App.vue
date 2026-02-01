<template>
	<starry-sky :stars-count="1000" :distance="1000" />
	<div class="report-title">2025年年度报告</div>
	<div v-if="currentPage === 1">
		<Welcome @load-complete="handleLoadComplete"/>
	</div>
	<div v-if="currentPage === 2">
		<FirstData @load-complete="handleFirstComplete" @loading="handleFirstLoading" />
	</div>
	<div v-if="currentPage === 3">
		<ChatData />
	</div>
	<div v-if="currentPage === 4">
		<ChatData2 />
	</div>
	<div v-if="currentPage === 5">
		<KeyWord />
	</div>
	<div v-if="currentPage === 6">
		<TimePeriod />
	</div>
	<div v-if="currentPage === 7">
		<one />
	</div>
	<div v-if="currentPage === 8">
		<four />
	</div>
	<div v-if="currentPage === 9">
		<Calendar />
	</div>
	<div v-if="currentPage === 10">
		<two />
	</div>
		<div v-if="currentPage === 11">
		<Three />
	</div>
	<div v-if="currentPage === 12">
		<Emotion />
	</div>
	<div v-if="currentPage === 13">	
		<Card />
	</div>
	<div v-if="currentPage === 14">
		<diary />
	</div>



	<button @click="WelcomeButton" class="welcome-button" v-show="showButton">
		进入报告
		<div class="hoverEffect">
			<div></div>
		</div>
	</button>

	<!-- <div class="leftbutton" v-show="showLeftButton">
		<img src="../public/左边.svg" alt="" @click="prevPage">
	</div> -->
	<div class="nextButton" v-show="shownextButton">
		<img src="../public/下.svg" alt="" @click="nextPage">
	</div>

</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import StarrySky from './compoents/Starry-sky.vue';
import Welcome from './compoents/Welcome.vue';
import FirstData from './compoents/FirstData.vue';
import ChatData from './compoents/ChatData.vue';
import ChatData2 from './compoents/ChatData2.vue';
import TimePeriod from './compoents/TimePeriod.vue';
import Calendar from './compoents/Calendar.vue';
import KeyWord from './compoents/KeyWord.vue';
import diary from './compoents/diary.vue';

import one from './compoents/one.vue';
import two from './compoents/two.vue';
import Three from './compoents/three.vue';
import four from './compoents/four.vue';
import Card from './compoents/Card.vue';
import Emotion from './compoents/Emotion.vue';



let currentPage = ref(1);
let showButton = ref(true);
let showLeftButton = ref(true);
let shownextButton = ref(false);
let isReady = ref(false);
let FirstData_isReady = ref(true);


const pageComponents = [Welcome, FirstData, ChatData,ChatData2, KeyWord,TimePeriod, one,four,Calendar ,two, Three, Emotion,Card,diary];

const WelcomeButton = () => {
    nextPage();
    console.log('WelcomeButton');
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const nextPage = () => {
	console.log('next',currentPage.value)
    if (currentPage.value < pageComponents.length && isReady.value) {
        currentPage.value++;
	console.log('next',currentPage.value)
    }
};

const computedShownextButton = computed(() => {
    return currentPage.value !== 1 && currentPage.value !== pageComponents.length;
});
const computedShowwelcomeButton = computed(() => {
	return currentPage.value === 1 && isReady.value;
});

const handleLoadComplete = () => {
	console.log('加载完成1');
	isReady.value = true;
	FirstData_isReady.value = true;
};

const handleFirstLoading = () => {
	console.log('加载完成2');
	FirstData_isReady.value = false;
};

const handleFirstComplete = () => {
	console.log('加载完成2');
	FirstData_isReady.value = true;
};

shownextButton = computedShownextButton;
showButton = computedShowwelcomeButton;

onMounted(() => {
    // 禁用下拉刷新，但保留点击事件
    let startY = 0;

    const touchStartHandler = (e) => {
        startY = e.touches[0].pageY;
        document.body.style.overflow = 'hidden'; // 禁用页面滚动
    };

    const touchMoveHandler = (e) => {
        
    };

     const touchEndHandler = (e) => {
		console.log(e)
         const currentY = e.changedTouches[0].pageY;
        const diffY = startY - currentY; // 计算垂直滑动距离
		console.log(diffY,123)
        if (diffY < 50) {  // 滑动距离大于50像素时，切换到上一页
            prevPage();
        }
		if (diffY > -50) {  // 滑动距离大于50像素时，切换到上一页
			nextPage();
		}
     };

    document.addEventListener('touchstart', touchStartHandler);
    document.addEventListener('touchmove', touchMoveHandler);
     document.addEventListener('touchend', touchEndHandler);

    // 只禁用触摸事件导致的默认行为（下拉刷新），不禁用点击事件
    const preventDefaultTouch = (e) => {
        // 只对触摸事件调用 preventDefault，确保不影响其他按键或鼠标事件
        if (e.type === 'touchstart' || e.type === 'touchmove') {
            // e.preventDefault(); // 禁用触摸事件导致的默认行为
        }
    };

    document.body.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    document.body.addEventListener('touchmove', preventDefaultTouch, { passive: false });

    // 鼠标滚轮事件，向上滚动时切换到上一页
    const wheelHandler = (e) => {
        if (e.deltaY > 0) {
            prevPage();  // 滚轮向上滚动时，切换到上一页
        }
		if (e.deltaY < 0) {
            nextPage();  // 滚轮向上滚动时，切换到下一页
        }
    };
    document.addEventListener('wheel', wheelHandler);
});
</script>
<style>
body,html{
    /* height: 100vh;
    width:100vw; */
    margin:0 0 0 0;
    /* overflow:hidden hidden; */
}
.leftbutton {
	position: absolute;
	left: 10%;
	top: 50%;
	transform: translateY(-50%);
	z-index: 5;
}

.nextButton {
	position: absolute;
	left: 50%;
	top: 93%;
	transform: translatex(-50%) ;
	z-index: 5;
}

.leftbutton img,
.nextButton img {
	width: 25px;
	height: 25px;
}


/* From Uiverse.io by Wendell47 */
.welcome-button {
	display: inline-flex;
	padding: 15px 30px;
	position: absolute;
	border: 0;
	overflow: hidden;
	border-radius: 10rem;
	font-weight: bold;
	cursor: pointer;
	color: rgb(37, 37, 37);
	z-index: 1;
	box-shadow: 0 0px 7px -5px rgba(0, 0, 0, 0.5);
	bottom: 5%;
	left: 50%;
	transform: translateX(-50%);
}

.welcome-button:hover {
	background: rgb(193, 228, 248);
	color: rgb(33, 0, 85);
}

.hoverEffect {
	position: absolute;
	bottom: 0;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
}

.hoverEffect div {
	background: rgb(222, 0, 75);
	background: linear-gradient(90deg,
			rgba(222, 0, 75, 1) 0%,
			rgba(191, 70, 255, 1) 49%,
			rgba(0, 212, 255, 1) 100%);
	border-radius: 40rem;
	width: 10rem;
	height: 10rem;
	transition: 0.4s;
	filter: blur(20px);
	animation: effect infinite 3s linear;
	opacity: 0.5;
}

.welcome-button:hover .hoverEffect div {
	width: 8rem;
	height: 8rem;
}

@keyframes effect {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.wrapper {
	display: flex;
	flex-grow: 1;
	overflow: hidden;
}

::-webkit-scrollbar {
	display: none;
}

.report-title {
	position: absolute;
	top: 10px;
	left: 20px;
	font-size: 14px;
	color: black;
	z-index: 10;
	font-weight: bold;
}
</style>