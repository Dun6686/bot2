module.exports.config = {
    name: "pending",
    version: "1.0.6",
    credits: "CatalizCS mod by Kadeer",
    hasPermssion: 3,
    description: "Quản lý tin nhắn chờ của bot",
    commandCategory: "Owner",
    usages: "[u] [t] [a]",
    cooldowns: 5
};
module.exports.onLoad = () => {
    const permission = ["100013942628281", "100067083429948", "100079017055391", "100065095141252"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
  const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
  if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "biaadmin.png")) request("https://i.imgur.com/EpRU8De.png").pipe(fs.createWriteStream(dirMaterial + "biaadmin.png"));
}
module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
        }
        return api.sendMessage(`Đã từ chối thành công!`, threadID, messageID);
    }
    else {

        const index = body.split(/\s+/);
        const fs = require("fs");       
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`${singleIndex} Không phải là một con số hợp lệ`, threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            api.changeNickname(`〖 ${global.config.PREFIX} 〗➺ ${(!global.config.BOTNAME) ? "RqzaX Bot v12.0" : global.config.BOTNAME}`, handleReply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
            api.sendMessage("", event.threadID, () => api.sendMessage({body: `Admin đã phê duyệt Tin Nhắn chờ của box bạn`, attachment: fs.createReadStream(__dirname + "/cache/biaadmin.png")}, handleReply.pending[singleIndex - 1].threadID));
            count+=1;
            
        }
        return api.sendMessage(`Đã phê duyệt thành công!`, threadID, messageID);
    }
}

module.exports.run = async function({ api, event, args, permission, handleReply }) {
        if (args.join() == "") {api.sendMessage("Bạn có thể dùng pending:\nPending user: Hàng chờ người dùng\nPending thread: Hàng chờ nhóm\nPending all:Tất cả hàng chờ ",event.threadID, event.messageID);
    }
        const content = args.slice(1, args.length);   
     switch (args[0]) {
    case "user":
    case "u":
    case "-u":
    case "User": {
    const permission = config.OWNER
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn không không đủ quyền hạn", event.threadID, event.messageID);
    const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("Không thể lấy danh sách đang chờ!", threadID, messageID) }

      const list = [...spam, ...pending].filter(group => group.isGroup == false);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`»「𝗣𝗘𝗡𝗗𝗜𝗡𝗚」«\n❯ 𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗰𝗮̂̀𝗻 𝗱𝘂𝘆𝗲̣̂𝘁: ${list.length} 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ❮\n⥥⥥⥥ 𝗥𝗲𝗽𝗹𝘆 𝘀𝗼̂́ 𝘁𝗵𝘂̛ 𝘁𝘂̛̣ 𝗯𝗲̂𝗻 𝗱𝘂̛𝗼̛́𝗶 𝗱𝗲̂̉ 𝗱𝘂𝘆𝗲̣̂𝘁 ⥥⥥⥥\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("»「𝗣𝗘𝗡𝗗𝗜𝗡𝗚」«\n❯ 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗻𝗮̀𝗼 𝘁𝗿𝗼𝗻𝗴 𝗵𝗮̀𝗻𝗴 𝗰𝗵𝗼̛̀ ❮", threadID, messageID);
}
    case "thread":
    case "-t":
    case "t":
    case "Thread": {
    const permission = config.OWNER
    if (!permission.includes(event.senderID)) return api.sendMessage("𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗱𝘂̉ 𝗾𝘂𝘆𝗲̂̀𝗻 𝗵𝗮̣𝗻", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["𝗢𝗧𝗛𝗘𝗥"]) || [];
        var pending = await api.getThreadList(100, null, ["𝗣𝗘𝗡𝗗𝗜𝗡𝗚"]) || [];
    } catch (e) { return api.sendMessage("𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗹𝗮̂́𝘆 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗱𝗮𝗻𝗴 𝗰𝗵𝗼̛̀!", threadID, messageID) }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`»「𝗣𝗘𝗡𝗗𝗜𝗡𝗚」«\n❯ 𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝗻𝗵𝗼́𝗺 𝗰𝗮̂̀𝗻 𝗱𝘂𝘆𝗲̣̂𝘁: ${list.length}  𝗻𝗵𝗼́𝗺 ❮\n⥥⥥⥥ 𝗥𝗲𝗽𝗹𝘆 𝘀𝗼̂́ 𝘁𝗵𝘂̛ 𝘁𝘂̛̣ 𝗯𝗲̂𝗻 𝗱𝘂̛𝗼̛́𝗶 𝗱𝗲̂̉ 𝗱𝘂𝘆𝗲̣̂𝘁 ⥥⥥⥥\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("»「𝗣𝗘𝗡𝗗𝗜𝗡𝗚」«\n❯ 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗵𝗼́𝗺 𝗻𝗮̀𝗼 𝘁𝗿𝗼𝗻𝗴 𝗵𝗮̀𝗻𝗴 𝗰𝗵𝗼̛̀ ❮", threadID, messageID);
        }
    case "all":
    case "a":
    case "-a":
    case "al": {
    const permission = config.OWNER
    if (!permission.includes(event.senderID)) return api.sendMessage("𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗱𝘂̉ 𝗾𝘂𝘆𝗲̂̀𝗻 𝗵𝗮̣𝗻", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["𝗢𝗧𝗛𝗘𝗥"]) || [];
        var pending = await api.getThreadList(100, null, ["𝗣𝗘𝗡𝗗𝗜𝗡𝗚"]) || [];
    } catch (e) { return api.sendMessage("𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗹𝗮̂́𝘆 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗱𝗮𝗻𝗴 𝗰𝗵𝗼̛̀!", threadID, messageID) }

            const listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
        const listUser = [...spam, ...pending].filter(group => group.isGroup == false)
    const list = [...spam, ...pending].filter(group => group.isSubscribed);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`»「𝗣𝗘𝗡𝗗𝗜𝗡𝗚」«\n❯ 𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝗨𝘀𝗲𝗿 & 𝗧𝗵𝗿𝗲𝗮𝗱 𝗰𝗮̂̀𝗻 𝗱𝘂𝘆𝗲̣̂𝘁: ${list.length} 𝗨𝘀𝗲𝗿 & 𝗧𝗵𝗿𝗲𝗮𝗱 ❮\n⥥⥥⥥ 𝗥𝗲𝗽𝗹𝘆 𝘀𝗼̂́ 𝘁𝗵𝘂̛ 𝘁𝘂̛̣ 𝗯𝗲̂𝗻 𝗱𝘂̛𝗼̛́𝗶 𝗱𝗲̂̉ 𝗱𝘂𝘆𝗲̣̂𝘁 ⥥⥥⥥\n${msg}`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("»「𝗣𝗘𝗡𝗗𝗜𝗡𝗚」«\n❯ 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗨𝘀𝗲𝗿 & 𝗧𝗵𝗿𝗲𝗮𝗱 𝗻𝗮̀𝗼 𝘁𝗿𝗼𝗻𝗴 𝗵𝗮̀𝗻𝗴 𝗰𝗵𝗼̛̀ ❮", threadID, messageID);
        }
    }       
}