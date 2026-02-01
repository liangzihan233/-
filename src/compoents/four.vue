<template>
    <div class="container box">
      <header class="header">
        <h1 class="logo">
          一起看过的影视剧
          <div class="period"></div>
        </h1>
      </header>

      <div class="stack">
        <VueCardStack
          :cards="cards"
          :cardWidth="286"
          :cardHeight="458"
          stackWidth="100%"
          @move="onMove"
          @update="onUpdate"
        >
          <template v-slot:card="{ card }">
            <div class="card">
              <img
                onmousedown="event.preventDefault()"
                draggable="false"
                :src="card.cover"
                :style="{
                  ...getStyles(card),
                  transition: card.isDragging ? 'none' : 'all 0.2s'
                }"
              />
            </div>
          </template>
        </VueCardStack>
      </div>

      <footer class="footer">
        <div
          class="info"
          v-for="(card, index) in cards"
          :key="index"
          :style="getInfoStyles[index]"
        >
          <h2 class="title">{{ card.title }}</h2>
          <h3 class="date">
            <span>{{ card.release }}</span>
          </h3>
        </div>
        <div class="rating">
          <div
            v-for="x in 5"
            :key="x"
            class="star"
            v-bind:class="{ active: x <= activeCard.rating }"
          />
        </div>
      </footer>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueCardStack from "../js/movie.js";

const stack = ref([])
const isDragging = ref(false)
const activeCard = ref({
  rating: 0
})
const direction = ref('')

const cards = ref([
  {
    id: 1,
    title: "浪浪山的小妖怪",
    release: "误闯天家，劝余放下手中砂",
    cover: "/2025Report/movie/p2923770138.webp",
    rating: 2,
  },
  {
    id: 2,
    title: "疯狂动物城2",
    release: "挺热闹",
    cover: "/2025Report/movie/384.webp",
    rating: 3},
  {
    id: 3,
    title: "鬼灭之刃无限城篇",
    release: "猗窝座想起了应该守护之物",
    cover: "/2025Report/movie/3841.webp",
    rating: 3,},
  {
    id: 4,
    title: "哪吒之魔童闹海",
    release: "一切为我阐教霸业永存",
    cover: "/2025Report/movie/3842.webp",
    rating: 4,},
  {
    id: 5,
    title: "疯狂的麦克斯狂暴之路",
    release: "油罐车，摩托车，三轮车，越野车",
    cover: "/2025Report/movie/3843.webp",
    rating: 4},
  {
    id: 6,
    title: "春宵苦短，前进吧少女",
    release: "伪电气布兰，拉达达达姆，苹果女孩，润肺露",
    cover: "/2025Report/movie/3844.webp",
    rating: 5},
  {
    id: 7,
    title: "破地狱",
    release: "活人亦有地狱要破",
    cover: "/2025Report/movie/3845.webp",
    rating: 5},
  {
    id: 8,
    title: "环太平洋",
    release: "危险流浪者号",
    cover: "/2025Report/movie/3846.webp",
    rating: 4},
  {
    id: 9,  
    title: "超人钢铁之躯",
    release: "富人靠科技，穷人靠变异，超人又富又变异",
    cover: "/2025Report/movie/3847.webp",
    rating: 3},
  {
    id: 10,
    title: "致命女人",
    release: "还没看完嗷",
    cover: "/2025Report/movie/3848.webp",
    rating: 5},
  {
    id: 11,
    title: "法律至上",
    release: "李狗嗨",
    cover: "/2025Report/movie/256.webp",
    rating: 4}
])

const convertRange = (value, r1, r2) => {
  return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
}

const getStyles = (card) => {
  const MIN_POS_X = 0;
  const MAX_POS_X = 69;
  const MIN_SCALE_FACTOR = 1;
  const MAX_SCALE_FACTOR = 2.5;

  const opacity = convertRange(
    card.xPos > 0 ? card.xPos : 0,
    [MIN_POS_X, MAX_POS_X],
    [0, 1]
  );

  const scale = convertRange(
    card.xPos > 0 ? card.xPos : 0,
    [MIN_POS_X, MAX_POS_X],
    [MAX_SCALE_FACTOR, 1]
  );

  const normalizedScale =
    scale >= MIN_SCALE_FACTOR
      ? scale <= MAX_SCALE_FACTOR
        ? scale
        : MAX_SCALE_FACTOR
      : MIN_SCALE_FACTOR;

  const normalizedOpacity = opacity >= 0 ? (opacity <= 1 ? opacity : 1) : 0;

  return {
    transform: `scale(${card.$index !== 0 ? normalizedScale : 1}, ${
      card.$index !== 0 ? normalizedScale : MIN_SCALE_FACTOR
    })`,
    opacity: `${card.$index !== 0 ? normalizedOpacity : 1}`
  };
}

const getInfoStyles = computed(() => {
  const SPEED = 0.25;

  if (stack.value.length) {
    const styles = cards.value.map((card, index) => {
      const cardInStack = stack.value.find((x) => x.id === card.id);
      const cardIndexInStack = stack.value.findIndex(
        (x) => x.id === card.id
      );

      const yPosFactor = convertRange(
        cardInStack.xPos,
        [0, 69],
        [1, 0]
      );

      if (direction.value === "left") {
        const o = (i) => {
          if (isDragging.value) {
            if (i === 0) {
              return convertRange(cardInStack.xPos, [380, 69], [0, 1]);
            } else if (i === 1) {
              return convertRange(cardInStack.xPos, [69, 65], [1, 0]);
            } else {
              return 0;
            }
          } else {
            return i === 1 ? 1 : 0;
          }
        };

        return {
          transform: `translate(0, ${
            cardIndexInStack === 0
              ? 5 * yPosFactor
              : (cardIndexInStack + 1) * (100 * yPosFactor)
          }px)`,
          transition: `transform ${
            isDragging.value && !(cardIndexInStack > 1) ? 0 : SPEED
          }s ease 0s, opacity ${isDragging.value ? 0 : SPEED}s ease 0s`,
          opacity: o(cardIndexInStack)
        };
      } else {
        const o = (i) => {
          if (isDragging.value) {
            if (i === 1) {
              return convertRange(cardInStack.xPos, [69, 200], [1, 0]);
            } else if (i === 2) {
              return convertRange(cardInStack.xPos, [55, 69], [0, 1]);
            } else {
              return 0;
            }
          } else {
            return i === 1 ? 1 : 0;
          }
        };

        return {
          transform: `translate(0, ${
            cardIndexInStack === 1
              ? 5 * yPosFactor
              : (cardIndexInStack - 1) * (100 * yPosFactor)
          }px)`,
          transition: `transform ${
            isDragging.value && !(cardIndexInStack > 2) ? 0 : SPEED
          }s ease 0s, opacity ${isDragging.value ? 0 : SPEED}s ease 0s`,
          opacity: o(cardIndexInStack)
        };
      }
    });

    return styles;
  }

  return cards.value.map((card, index) => {
    return {
      transform: 'translate(0, 0px)',
      transition: 'none',
      opacity: index === 1 ? 1 : 0
    };
  });
})

const onUpdate = ({ active }) => {
  activeCard.value = active;
}

const onMove = ({ stack: newStack, dir, isDragging: dragging }) => {
  stack.value = newStack;
  direction.value = dir;
  isDragging.value = dragging;
}
</script>

<style lang="scss">
.vue-card-stack__wrapper {
  position: relative;
}

.vue-card-stack__stack {
  position: relative;
  overflow: hidden;
}

.vue-card-stack__card {
  position: absolute;
  transform-origin: 0 50%;
  cursor: grab;
}

@font-face {
  font-family: "Eina";
  src: url("https://assets.codepen.io/152347/eina-03-semibold.woff2")
      format("woff2"),
    url("https://assets.codepen.io/152347/eina-03-semibold.woff") format("woff");
}

body {
  font-family: "Eina", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #9796f0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #fbc7d4,
    #9796f0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #fbc7d4,
    #9796f0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#app {
  color: #1c1c1c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  grid-gap: 60px;
}

.attribution {
  text-decoration: none;
  width: auto;
  border-radius: 999em;
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 12px 25px 12px 60px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1c1c1c;
  background: #fff;
  background: rgba(255, 255, 255, 0.25);
  position: relative;
  font-family: "Montserrat", sans-serif;

  > img {
    color: green;
    width: 40px;
    height: 40px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translate(0, -50%);
  }

  .inner {
    display: flex;
    flex-direction: column;
    grid-gap: 2px;
  }

  h3 {
    font-size: 11px;
  }

  h5 {
    font-size: 16px;
    font-weight: 600;
  }
}

.container {
  z-index: 2;
  position: relative;
  border-radius: 12px;
  width: 375px;
  height: 667px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

//////////////////////////////////////////
// HEADER
//////////////////////////////////////////
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;

  .logo {
    align-items: baseline;
    display: flex;
    font-size: 29px;
    margin: 0;
  }

  .period {
    width: 5px;
    height: 5px;
    margin-left: 4px;
    background: #ff3366;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 20px;
    background: #ffe259;
    overflow: hidden;
  }

  .avatar > img {
    width: 100%;
    height: auto;
  }
}

//////////////////////////////////////////
// FOOTER
//////////////////////////////////////////
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  flex-direction: row-reverse;
  position: relative;
}

//////////////////////////////////////////
// RATING
//////////////////////////////////////////
.rating {
  display: flex;
  justify-content: space-between;
  justify-self: flex-end;

  .star {
    background: url("https://assets.codepen.io/152347/star.svg");
    background-size: 100%;
    width: 15px;
    height: 15px;
    transform: scale(0.5, 0.5);
    margin: 2px;
    transition: all 0.2s ease;
    opacity: 0.5;

    &.active {
      transform: scale(1, 1);
      opacity: 1;
    }
  }
}

//////////////////////////////////////////
// INFO
//////////////////////////////////////////
.info {
  position: absolute;
  left: 24px;

  .title {
    font-size: 16px;
    line-height: 22px;
  }

  .date {
    font-size: 11px;
    line-height: 15px;
    color: #9ba7c6;
  }
}

.stack {
  width: 100%;
}

.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  transform: rotate(0);
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;

  > img {
    width: 286px;
    height: 458px;
    object-fit: cover;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
}

.try-me {
  display: flex;
  grid-gap: 8px;
  align-items: center;
  font-size: 14px;
  margin-top: -24px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: #fff;
}
</style>
