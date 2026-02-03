<template>
  <div class="container box">
    <div class="page" id="frontPage">
      <div class="cover">
        <img src="../../public/header/top.jpg" alt="Diary Cover">
      </div>
      <h1><i class="fas fa-book-open"></i> My Letter</h1>
      <p class="date-time"><i class="far fa-clock"></i> Today's Date: <span id="currentDateTime"></span></p>
      <p class="date-time"><i class="far fa-clock"></i> Write Date: <span>2026-2-1 15:43:13</span></p>
      <div class="flip-button" @click="flipPage">Flip</div>
    </div>
    <div class="page" id="backPage">
      <div class="entry">
        
      </div>
        <div class="entry">
    <p contenteditable="true">作为即将中年的两个人，总觉的倾诉心声这件事，渐渐变得有些令人不齿，没什么好说</p>
    <p contenteditable="true">这两年来，我们经历过各种各样的难过，一开始的爱而不得，到后来的异地，每周一次在高铁站的离别，家人离世和病痛。责任在今年越是具现化在肩头，时间好像不再属于自己。</p>
<p contenteditable="true">要在不同的场合保持能量充盈，在不同的人面前扮演好自己的角色，情绪也交给了别人，慢慢的我们把最疲惫的一面留给了对方。</p>
    </div>

    <div class="entry">
    <p contenteditable="true">但是我觉得 人生最大的难过应该是说不出的难过</p>
    <p contenteditable="true">
每个人都像被海洋隔开的孤岛，想大声向对方呼喊，却不知道风声把言语吹成了什么模样。</p>
<p contenteditable="true">
我总是在很多场合想让你和我多说说，一般你都会像小猫憋💩一样，用尽全身力气拉出来干巴巴的几个字。其实我能明白你的心思。不过也不妨丢人的诉苦两句，即使能隔海相望，我们就还在彼此的身旁。</p>
<p contenteditable="true">
去年我们在一起的时间，远超前年，也不可避免的给对方带来了伤害和遗憾。在这我想对 亲爱的你说一句抱歉，也感谢你始终对我保持信任。有你在是我此生最大的自信。我一直会记得你说的：我坚定，你就坚定。</p>
<p contenteditable="true">
新的一年，想来也不会轻松，但我们手里紧握的那颗，名为未来的宝石，闪耀依旧。我的朋友，无论何时如果你觉得身陷泥潭，我都会朝你伸出手，把你拉上我的摩托后座。名为生活的大风车，我要向你大战三百回合！</p>
<p contenteditable="true">
上上签：保持坚韧，勿宁现状，终会在荆棘中开出自己的花，品出自己的香。
</p>
    </div>

      <div class="flip-button" @click="flipPage">Flip</div>
      <img style="width: 60px;position: absolute;bottom: 20px;right: 50px;" src="../../public/dog/1.png" alt="Dog" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

function flipPage() {
  document.querySelector(".container").classList.toggle("flipped");
}

function getCurrentDateTime() {
  var today = new Date();
  var date = today.toLocaleDateString();
  var time = today.toLocaleTimeString();
  document.getElementById("currentDateTime").innerText = date + " " + time;
}

onMounted(() => {
  getCurrentDateTime();
  setInterval(getCurrentDateTime, 1000);
});
</script>

<style scoped>
body {
  background-color: #f9f9f9;
}
p{
    line-height: 1.2;
    font-size: 13px;
    margin: 0 0 8px 0;
    text-indent: 2em;
}
.container {
  width: 360px;
  height: 580px;
  perspective: 800px;
  margin: 20px;
  position: relative;
  overflow: visible;
}

.page {
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.5s;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
}

#frontPage {
  transform: rotateY(0deg);
  z-index: 2;
  background-image: url("../../public/header/rose.png");
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
}

#backPage {
  transform: rotateY(-180deg);
}

.flipped #frontPage {
  transform: rotateY(180deg);
}

.flipped #backPage {
  transform: rotateY(0deg);
  z-index: 2;
}

h1 {
  color: #333;
  text-align: center;
  font-family: 'Pacifico', cursive;
  font-size: 28px;
  margin-top: 20px;
}

.date-time {
  color: #000;
  text-align: center;
  margin-bottom: 20px;
}

.thought {
  position: relative;
  margin-bottom: 20px;
}

.ribbon {
  position: absolute;
  top: 0;
  left: -20px;
  width: 0;
  height: 0;
  border-top: 40px solid transparent;
  border-right: 40px solid #333;
  border-bottom: 40px solid transparent;
}

.date {
  color: #000;
  font-size: 14px;
  margin: 0;
  margin-left: 30px;
}

.content {
  font-family: 'Shadows Into Light', cursive;
  font-size: 16px;
  padding: 10px;
  line-height: 1.5;
}

.flip-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

.flip-button:hover {
  background-color: #555;
}

.cover {
  text-align: center;
  margin-bottom: 20px;
}

.cover img {
  max-width: 100%;
  height: auto;
  max-height: 300px;
  border-radius: 10px;
}

.page:before {
  left: -3px;
  border-width: 0 0 20px 20px;
  border-color: transparent transparent #555 transparent;
}

.page:after {
  right: -3px;
  border-width: 0 20px 20px 0;
  border-color: transparent #555 #555 transparent;
}

</style>
