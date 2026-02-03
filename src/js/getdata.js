import { ref } from 'vue';
import * as echarts from 'echarts';
import messageData from './message.json';
export const chatMainData = ref({
    totalwords: messageData.messages.reduce((sum, item) => sum + (item.content || '').length, 0),
    totalvoice: messageData.messages.filter(item => item.type === "语音消息"),
    totalimages: messageData.messages.filter(item => item.type === "图片消息"),
    totalemojis: messageData.messages.filter(item => item.type === "动画表情"),
    totalviseos: messageData.messages.filter(item => item.type === "视频消息"),
    totalothers: messageData.messages.filter(item => item.type === "其他消息"),
})
export const getFirstChatData = ref(messageData.messages
  .filter(item => item.content !== '[动画表情]' && item.content !== '[图片]')
  .slice(0, 7)
);

export var key = '';

export const myavatar = ref('./header/header13.webp');
export const hisavatar = ref('./header/header45.webp');
export const mynickname = ref('小白');
export const hisnickname = ref('小鸡毛');

export const CardData = ref({
    myavatarSrc: './header/header13.webp',
    hisavatarSrc: './header/header45.webp',
    mynickname: '小白',
    hisnickname: '小鸡毛',
    summaryText: '真挚浪漫的熬夜冠军',
    firstChatDate: '2020-07-11',
    mostChatYear: '2025',
    mostChatMonth: '04',
    mostChatCount: 2740,
    leftTags: [
        {
            "label": "吵架次数",
            "value": 10,
            "unit": "次"
        },
        {
            "label": "去电影院",
            "value": 4,
            "unit": "次"
        },
        {
            "label": "旅游过的城市",
            "value": 7,
            "unit": "座"
        },
        {
            "label": "聊天字数",
            "value": chatMainData.value.totalwords,
            "unit": "字"
        }],
    rightTags: [
        {
            "label": "年度关键词",
            "value": "挣钱"
        },
        {
            "label": "年度评语",
            "value": "紧张的玩"
        },
        {
            "label": "年度目标",
            "value": "结束异地"
        }
    ],
});

export const daysSinceFirstChat = ref(1345);
export const cardName = ref('2025年度报告');


function getVirtualData(year) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([
            echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data;
}

export const Calendardata = ref({
    daysChatted: 206,
    mostActiveYear: "2025",
    mostActiveMonth: "04",
    averageChats: 91,
    peakChatYear: "2025",
    peakChatMonth: "05",
    peakChatDay: "18",
    peakChats: 265,
    data: getVirtualData('2025'),
    max_day_count: 10000,
    min_day_count: 0
});

export const chatData = ref({
    mynickname: "小白",
    hisnickname: "小鸡毛",
    totalmessages: messageData.messages.length,
    totalwords: chatMainData.value.totalwords,
    totalvoice: chatMainData.value.totalvoice.length,
    totalimages: chatMainData.value.totalimages.length,
    totalemojis: chatMainData.value.totalemojis.length,
    totalviseos: chatMainData.value.totalviseos.length,
    emoji: "./header/useful.png",
    send_msg_num:messageData.messages.filter(item => item.senderDisplayName === "来财").length,
    receive_msg_num:messageData.messages.filter(item => item.senderDisplayName === "盒子丶").length,
    total_message_size:2345, // 聊天数据大小，单位：MB
});
console.log("chatData:", chatData.value);
export const chartData = ref({
    mynickname: "小白",
    hisnickname: "小鸡毛", 
    mynum: chatData.value.send_msg_num,
    tanum: chatData.value.receive_msg_num,
    my_type_count:[ 
    ['文本',chatData.value.send_msg_num],
    ['图片',chatMainData.value.totalimages.filter(item => item.senderDisplayName === "来财").length],
    ['视频',chatMainData.value.totalviseos.filter(item => item.senderDisplayName === "来财").length],
    ['表情包',chatMainData.value.totalemojis.filter(item => item.senderDisplayName === "来财").length],
    ['其他',chatMainData.value.totalothers.filter(item => item.senderDisplayName === "来财").length],
],
    ta_type_count:[
    ['文本',chatData.value.receive_msg_num],
    ['图片',chatMainData.value.totalimages.filter(item => item.senderDisplayName === "盒子丶").length],
    ['视频',chatMainData.value.totalviseos.filter(item => item.senderDisplayName === "盒子丶").length],
    ['表情包',chatMainData.value.totalemojis.filter(item => item.senderDisplayName === "盒子丶").length],
    ['其他',chatMainData.value.totalothers.filter(item => item.senderDisplayName === "盒子丶").length],
    ],
});

console.log("chartData:", chartData.value);
export const quarterData = ref([
    {
        'season': '食物',
        'title': '搀扶而出螺狮粉',
        'text': '仙本那的苏眉鱼，吉隆坡的椰子汁，外滩的油炸拼盘，新疆的串，内蒙的羊，浦口的寿司，丈母娘的粉蒸肉，奶皮子糖葫芦'
    },
    {
        'season': '旅游',
        'title': '雅马哈神山速降',
        'text': '诗仙圣境，西湖和创园，上海外滩，朝天宫，仙本那，独库公路，巢湖郁金香高地'
    },
    {
        'season': '音乐',
        'title': '那么骄傲',
        'text': '七里香-霓虹甜心-那么骄傲'
    },
    {
        'season': '视频',
        'title': '当宇宙会真空衰变，文明将如何发展',
        'text': '他们不知道前人的付出，而文明又会成长，战争，变革，一如既往。 晚安，牧孤星。'
    }
]);

export const FirstData_isReady = ref(true);
export const firstChatData = ref({
    "initiator": getFirstChatData.value[0].senderDisplayName,
    "conversation": getFirstChatData.value.map(item => ({
        "side": item.senderDisplayName==="来财" ? "right" : "left",
        "avatarSrc": item.senderDisplayName==="来财"?"/header/header13.webp":"/header/header45.webp",
        ...item
    }))
})

export const keyWordsData = ref({
    "mykeyWord": {
        "keyWord": "哈哈哈",
        "keyWordCount": 82
    },
    "takeyWord": {
        "keyWord": "哈哈",
        "keyWordCount": 111
    },
    "messages": [
        {
            "side": "right",
            "content": "哈哈哈哈哈我真的找到了",
        },
        {
            "side": "left",
            "content": "哈哈没事",
        },
        {
            "side": "right",
            "content": "啊哈哈哈",
        },
        {
            "side": "left",
            "content": "确实挺不错哈哈哈",
        },
        {
            "side": "right",
            "content": "小心心，哈哈哈哈",
        },
        {
            "side": "left",
            "content": "是的哈哈",
        }
    ]
});

export const mykeyWord = ref({
    "keyWord": "哈哈哈",
    "keyWordCount": 82
});

export const takeyWord = ref({
    "keyWord": "哈哈",
    "keyWordCount": 111
});

export const isReady = ref(false);
export const visibleText = ref([]);
export const currentIndex = ref(0);

export const Welcome_data = {
    descriptionText: {
        hello: "Hello Xu",
        text1: "时光荏苒，转眼间我们又走过了一年。",
        text2: "在过去的365天里，从深夜的长谈到清晨的祝福，从仙本那的海到帕米尔高原的山……",
        text4: "我们在夕阳里起舞，也在酒桌下跌撞",
        text7: "愿这些记忆，在新的一年里，给你我以守护彼此的力量"
    }
}

export const allText = ref([
    Welcome_data.descriptionText.hello,
    Welcome_data.descriptionText.text1,
    Welcome_data.descriptionText.text2,
    Welcome_data.descriptionText.text4,
    Welcome_data.descriptionText.text7
])

export const chatdescription = ref({
    "timedes": "深夜的",
    "summary": "我们最爱在深夜聊天",
    "timePeriod": "21:00-01:00",
    "quote": [
        "亲爱的你",
        "住在脑海里，不曾离去"
    ],
    "data": [
        668,
        412,
        7,
        0,
        0,
        4,
        0,
        63,
        14,
        195,
        576,
        564,
        627,
        554,
        561,
        589,
        736,
        539,
        743,
        754,
        656,
        791,
        1187,
        875
    ],
    "remarks": [
        "最晚的一次聊天，聊到凌晨三点",
        "你在电话里哭鼻子，你说我想你了"
    ],
    "favoriteChatDate": {
        "is_exist": 1,
        "year": "2025",
        "month": "09",
        "day": "8"
    }
});

export const summaryText = ref('热恋到守护神脉之约');

export const wxid = 'wxid_1234567890';

// 头像链接
export const reportName = '2025年终总结';
// 网站链接
export const websiteUrl = 'https://memotrace.cn';
// 网站链接文本显示内容
export const websiteUrlText = 'memotrace.cn';
// 底部文本
export const bottomText = '扫一扫制作专属你的微信聊天报告';

export const UPLOAD_URL = ''