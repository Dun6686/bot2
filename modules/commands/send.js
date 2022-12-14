const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "send",
    version: "1.0.0",
    hasPermssion: 3,
    credits: "TruongMini, mod by NHHB",
    description: "",
    commandCategory: "Tiแปn รญch",
    usages: "[msg]",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `[ ๐ฃ๐ต๐ฎฬ๐ป ๐ต๐ผฬฬ๐ถ ๐๐ฬฬ ๐จ๐๐ฒ๐ฟ ]\n๐ง๐ถ๐บ๐ฒ: ${gio}\n\n๐๐จฬฃฬ๐ข ๐๐ฎ๐ง๐ : ${body}\n\n๐ง๐ฬฬ ๐ป๐ด๐ฬ๐ผฬฬ๐ถ ๐ฑ๐ฬ๐ป๐ด ${name} ๐ง๐ฟ๐ผ๐ป๐ด ๐ป๐ต๐ผฬ๐บ ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `[ ๐ฃ๐ต๐ฎฬ๐ป ๐ต๐ผฬฬ๐ถ ๐๐ฬฬ ๐จ๐๐ฒ๐ฟ ]\n๐ง๐ถ๐บ๐ฒ: ${gio}\n\n๐ก๐ผฬฃฬ๐ถ ๐๐๐ป๐ด: ${body}\n\n๐ง๐ฬฬ ๐ป๐ด๐ฬ๐ผฬฬ๐ถ ๐ฑ๐ฬ๐ป๐ด ${name} ๐ง๐ฟ๐ผ๐ป๐ด ๐ป๐ต๐ผฬ๐บ ${(await Threads.getInfo(threadID)).threadName || "Unknow"}`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `[ ๐ฃ๐ต๐ฎฬ๐ป ๐๐ผฬฬ๐ถ ๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ]\n๐ง๐ถ๐บ๐ฒ: ${gio}\n\n๐ก๐ผฬฃฬ๐ถ ๐๐๐ป๐ด: ${body}\n\n๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ${name} \n๐ฅ๐ฒ๐ฝ๐น๐ ๐ง๐ถ๐ป ๐ก๐ต๐ฎฬฬ๐ป ๐ก๐ฎฬ๐ ฤ๐ฒฬฬ ๐๐ฬฬ๐ถ ๐ฉ๐ฒฬฬ ๐๐ฑ๐บ๐ถ๐ป`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}[ ๐ฃ๐ต๐ฎฬ๐ป ๐๐ผฬฬ๐ถ ๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ]\nโฐ๐งime:${gio}\n\n๐ค๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ${name}\n๐ฅ๐ฒ๐ฝ๐น๐ ๐ง๐ถ๐ป ๐ก๐ต๐ฎฬฬ๐ป ๐ก๐ฎฬ๐ ฤ๐ฒฬฬ ๐๐ฬฬ๐ถ ๐ฉ๐ฒฬฬ ๐๐ฑ๐บ๐ถ๐ป`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async function ({ api, event, args, Users }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `[ ๐ง๐ต๐ผฬ๐ป๐ด ๐๐ฎฬ๐ผ ๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ]\nโฐ๐ง๐ถ๐บ๐ฒ: ${gio}\n\n๐ฌ๐ก๐ผฬฃฬ๐ถ ๐๐๐ป๐ด: ${args.join(" ")}\n\n๐ค๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ${await Users.getNameUser(senderID)} \n๐ฅ๐ฒ๐ฝ๐น๐ ๐ง๐ถ๐ป ๐ก๐ต๐ฎฬฬ๐ป ๐ก๐ฎฬ๐ ฤ๐ฒฬฬ ๐๐ฬฬ๐ถ ๐ฉ๐ฒฬฬ ๐๐ฑ๐บ๐ถ๐ป`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `[ ๐ง๐ต๐ผฬ๐ป๐ด ๐๐ฎฬ๐ผ ๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ]\nโฐ๐ง๐ถ๐บ๐ฒ: ${gio}\n\n๐ฌ๐ก๐ผฬฃฬ๐ถ ๐๐๐ป๐ด: ${args.join(" ")}\n\n๐ค๐ง๐ฬฬ ๐๐ฑ๐บ๐ถ๐ป ${await Users.getNameUser(senderID)} \n๐ฅ๐ฒ๐ฝ๐น๐ ๐ง๐ถ๐ป ๐ก๐ต๐ฎฬฬ๐ป ๐ก๐ฎฬ๐ ฤ๐ฒฬฬ ๐๐ฬฬ๐ถ ๐ฉ๐ฒฬฬ ๐๐ฑ๐บ๐ถ๐ป`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`๐๐ฎฬ ๐ด๐ฬฬ๐ถ ๐๐ผฬฬ๐ถ ${can} ๐ป๐ต๐ผฬ๐บ, ๐๐ต๐ผฬ๐ป๐ด ๐๐ต๐ฒฬฬ ๐ด๐ฬฬ๐ถ ๐๐ผฬฬ๐ถ ${canNot} ๐ป๐ต๐ผฬ๐บ`,threadID);
}