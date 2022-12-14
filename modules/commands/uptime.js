module.exports.config = {
  name: "uptime",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "DuyVuong",
  description: "Random แบฃnh theo api - uptime",
  commandCategory: "Hแป Thแปng",
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
  if (thu == 'Sunday') thu = '๐๐ต๐ฬ ๐ป๐ต๐ฎฬฃฬ๐'
  if (thu == 'Monday') thu = '๐ง๐ต๐ฬฬ ๐ฎ'
  if (thu == 'Tuesday') thu = '๐ง๐ต๐ฬฬ ๐ฏ'
  if (thu == 'Wednesday') thu = '๐ง๐ต๐ฬฬ ๐ฐ'
  if (thu == "Thursday") thu = '๐ง๐ต๐ฬฬ ๐ฑ'
  if (thu == 'Friday') thu = '๐ง๐ต๐ฬฬ ๐ฒ'
  if (thu == 'Saturday') thu = '๐ง๐ต๐ฬฬ ๐ณ'
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
        body: `๐๐ถ๐ฒฬฃฬ๐ป ๐๐ฎฬฃ๐ถ ๐น๐ฎฬ: ${thu} ${gio}\n\n=== ๐จ๐ฃ๐ง๐๐ ๐ ๐ฅ๐ข๐๐ข๐ง ====\nโ ๐๐ผ๐ ๐ฑ๐ฎฬ ๐ต๐ผ๐ฎฬฃ๐ ๐ฑ๐ผฬฃฬ๐ป๐ด ๐ฑ๐ฬ๐ผฬฬฃ๐ฐ ${hours} ๐ด๐ถ๐ผฬฬ ${minutes} ๐ฝ๐ต๐ฬ๐ ${seconds} ๐ด๐ถ๐ฎฬ๐`,
        attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
      }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
    };
    request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
  })
} //.co/vsbg.php
  //https://apituandz1407.herokuapp.com/api/gaivuto.php
  //https://apiquyenkaneki.herokuapp.com/gai.php

