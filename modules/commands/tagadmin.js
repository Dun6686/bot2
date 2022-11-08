module.exports.config = {
name: "tagadmin",
version: "1.0.0",
hasPermssion: 3,
credits: "ZyrosGenZ, ManhG Fix", //đụ thêm vào by hanaku -_-
description: "Bot sẽ rep ng tag admin hoặc rep ng tagbot ", // và chuyển về cho admin hoặc người được tag -_-
commandCategory: "hệ thống",
usages: "[on/off]",
cooldowns: 3
}
module.exports.handleEvent = async function({
api,
Users,
event
}) {
try {
const {
senderID,
threadID,
messageID,
mentions,
body
} = event;
const thread = global.data.threadData.get(threadID) || {};
const moment = require('moment-timezone');
const gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
if (typeof thread["tagadmin"] !== "undefined" && thread["tagadmin"] == false) return;
let threadInfo = await api.getThreadInfo(event.threadID);
const z = (await api.getUserInfoV2(senderID)).name || "không thể lấy tên"
const listAdmin = global.config.ADMINBOT;
const mention = Object.keys(mentions);
if (listAdmin.includes(`${mention}`)) {
var msg = [
"Đọc hentai",
"Bận không lí do"
]; // khúc này tự điền text vào ai rãnh đâu làm chi tiết
api.sendMessage({
body: `𝙏𝙖𝙜 𝙡𝙖̀𝙢 𝙜𝙞̀ 𝘼𝙙𝙢𝙞𝙣 𝙗𝙖̣̂𝙣 𝙧𝙤̂̀𝙞 !\n𝘽𝙖̣̂𝙣 𝙫𝙤̛́𝙞 𝙡𝙞́ 𝙙𝙤 : ${msg[Math.floor(Math.random() * msg.length)]}\n𝙏𝙞𝙢𝙚 : ${gio}`
}, threadID, messageID);
api.sendMessage(`𝘽𝙤𝙭 : ${threadInfo.threadName}\n𝙏𝙞𝙙 : ${threadID}\n𝙐𝙨𝙚𝙧 : ${z}\n𝙐𝙞𝙙 : ${senderID}\n𝙏𝙖𝙜 : ${body}\n𝙏𝙞𝙢𝙚 : ${gio}`, mention) //dòng này để gửi inb về admin muốn đụ thêm cái gì thì chỉnh ở trong ``
}
} catch (e) {}
};

module.exports.languages = {
"vi": {
"on": "Bật",
"off": "Tắt",
"successText": "tagadmin thành công",
},
"en": {
"on": "on",
"off": "off",
"successText": "success!",
}
}

module.exports.run = async function({
api,
event,
Threads,
getText
}) {
const {
threadID,
messageID
} = event;
let data = (await Threads.getData(threadID)).data;
if (typeof data["tagadmin"] == "undefined" || data["tagadmin"] == false) data["tagadmin"] = true;
else data["tagadmin"] = false;
await Threads.setData(threadID, {
data
});
global.data.threadData.set(threadID, data);
return api.sendMessage(`${(data["tagadmin"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
}

