module.exports.config = {
  name: "uptime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DuyVuong",
  description: "Random ảnh theo api - uptime",
  commandCategory: "Hệ Thống",
  cooldowns: 3
};
function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const fetch = global.nodemodule["node-fetch"];
  const request = require('request');
  const res = await axios.get(`https://apituandz1407.herokuapp.com/api/hearing.php`);
  //https://apituandz1407.herokuapp.com/api/hearing.php
  var poem = res.data.data;
  const fs = require("fs");
  const moment = require("moment-timezone");
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝗖𝗵𝘂̉ 𝗻𝗵𝗮̣̂𝘁'
  if (thu == 'Monday') thu = '𝗧𝗵𝘂̛́ 𝟮'
  if (thu == 'Tuesday') thu = '𝗧𝗵𝘂̛́ 𝟯'
  if (thu == 'Wednesday') thu = '𝗧𝗵𝘂̛́ 𝟰'
  if (thu == "Thursday") thu = '𝗧𝗵𝘂̛́ 𝟱'
  if (thu == 'Friday') thu = '𝗧𝗵𝘂̛́ 𝟲'
  if (thu == 'Saturday') thu = '𝗧𝗵𝘂̛́ 𝟳'
  const time = process.uptime() + global.config.UPTIME;
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
  const pidusage = await global.nodemodule["pidusage"](process.pid);
  const timeStart = Date.now();
  axios.get('https://apituandz1407.herokuapp.com/api/cosplay.php').then(res => {
    let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
    let callback = function () {
      api.sendMessage({
        body: `𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗹𝗮̀: ${thu} ${gio}\n\n=== 𝗨𝗣𝗧𝗜𝗠𝗘 𝗥𝗢𝗕𝗢𝗧 ====\n→ 𝗕𝗼𝘁 𝗱𝗮̃ 𝗵𝗼𝗮̣𝘁 𝗱𝗼̣̂𝗻𝗴 𝗱𝘂̛𝗼̛̣𝗰 ${hours} 𝗴𝗶𝗼̛̀ ${minutes} 𝗽𝗵𝘂́𝘁 ${seconds} 𝗴𝗶𝗮̂𝘆`,
        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
    };
    request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
} //.co/vsbg.php
  //https://apituandz1407.herokuapp.com/api/gaivuto.php
  //https://apiquyenkaneki.herokuapp.com/gai.php

