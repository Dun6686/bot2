module.exports.config = {
	name: "admin",
	version: "1.0.7",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Bật tắt chế độ chỉ qtv dùng lệnh",
	commandCategory: "Hệ thống Admin-bot",
	usages: "Bật tắt chế độ chỉ admin và qtv dùng lệnh",
    cooldowns: 0,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": `A༙D༙M༙I༙N༙\n\n%1`,
        "listNDH": `• 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 •\n\n%1`,
        "notHavePermssion": '卍 Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '卍 Đã thêm %1 người dùng trở thành admin-bot:\n\n%2',
        "removedAdmin": '卍 Đã gỡ bỏ %1 người điều hành bot:\n\n%2',
        "adminsupport": '卍 Đã thêm %1 người dùng trở thành 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁:\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin] You have no permission to use "%1"',
        "addedNewAdmin": '[Admin] Added %1 Admin :\n\n%2',
        "removedAdmin": '[Admin] Remove %1 Admin:\n\n%2'
    }
}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    if (args.length == 0) return api.sendMessage(`「    𝗔𝗗𝗠𝗜𝗡 𝗖𝗢𝗡𝗙𝗜𝗚     」\n◆━━━━━━━━━━━◆\n\n𝗠𝗢𝗗𝗘 - 𝗮𝗱𝗺𝗶𝗻 𝗮𝗱𝗱 => 𝗧𝗵𝗲̂𝗺 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗹𝗮̀𝗺 𝗦𝘂𝗽𝗲𝗿 𝗔𝗱𝗺𝗶𝗻\n𝗠𝗢𝗗𝗘 - 𝗮𝗱𝗺𝗶𝗻 𝗿𝗺 => 𝗚𝗼̛̃ 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗔𝗱𝗺𝗶𝗻\n𝗠𝗢𝗗𝗘  𝗮𝗱𝗺𝗶𝗻 𝘀𝗽  => 𝗧𝗵𝗲̂𝗺 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗹𝗮̀𝗺 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁\n𝗠𝗢𝗗𝗘 - 𝗮𝗱𝗺𝗶𝗻 𝗿𝗲𝘀𝗽 => 𝗚𝗼̛̃ 𝘃𝗮𝗶 𝘁𝗿𝗼̀ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁\n𝗠𝗢𝗗𝗘 - 𝗮𝗱𝗺𝗶𝗻 𝗹𝗶𝘀𝘁 => 𝗫𝗲𝗺 𝗱𝗮𝗻𝗵 𝘀𝗮́𝗰𝗵 𝗔𝗱𝗺𝗶𝗻 𝘃𝗮̀ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁\n𝗠𝗢𝗗𝗘 - 𝗮𝗱𝗺𝗶𝗻 𝗯𝗼𝘅𝗼𝗻𝗹𝘆 => 𝗕𝗮̣̂𝘁 𝘁𝗮̆́𝘁 𝗰𝗵𝗲̂́ 𝗱𝗼̣̂ 𝗤𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻\n𝗠𝗢𝗗𝗘 - 𝗮𝗱𝗺𝗶𝗻 𝗽𝗮 => 𝗕𝗮̣̂𝘁 𝘁𝗮̆́𝘁 𝗰𝗵𝗲̂́ 𝗱𝗼̣̂ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁\n𝗠𝗢𝗗𝗘 - 𝗮𝗱𝗺𝗶𝗻 𝗼𝗻𝗹𝘆 => 𝗕𝗮̣̂𝘁 𝘁𝗮̆́𝘁 𝗰𝗵𝗲̂́ 𝗱𝗼̣̂ 𝘃𝗼̂ 𝗰𝘂̛̣𝗰\n𝗛𝗗𝗦𝗗 => ${global.config.PREFIX}𝗮𝗱𝗺𝗶𝗻 𝗹𝗲̣̂𝗻𝗵 𝗰𝗮̂̀𝗻 𝗱𝘂̀𝗻𝗴 😋`, event.threadID, event.messageID);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { NDH } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    switch (args[0]) {
        case "list": {
          listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`卍 ${name}\n卍 Link: fb.me/${idAdmin}`);
                }
            }
          listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`卍 ${name1}\n卍 Link: fb.me/${idNDH}`);
                }
            }
return api.sendMessage(`[ 𝗔𝗗𝗠𝗜𝗡𝗕𝗢𝗧 ]\n»===================«\n\n${msg.join("\n")}\n\n————————🔱————————\n\n[ 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 ]\n»===================«\n\n${msg1.join("\n\n")}`, event.threadID, event.messageID)
        }
        case "add":
        case "a": { 
            const permission = ["100013942628281", "100067083429948", "100065095141252", "100079017055391"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[ ${id} ] → ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[ 𝗔𝗗𝗠𝗜𝗡 → ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
case "sp": {
            const permission = ["100013942628281", "100067083429948", "100065095141252", "100079017055391"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    NDH.push(id);
                    config.NDH.push(id);
                    listAdd.push(`[ ${id} ] → ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("adminsupport", 1, `[ 𝗡𝗚𝗨̛𝗢̛̀𝗜 𝗧𝗛𝗨𝗘̂ 𝗕𝗢𝗧 ]→ ${name}`), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                NDH.push(content[0]);
                config.NDH.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("adminsupport", 1, `[ 𝗡𝗚𝗨̛𝗢̛̀𝗜 𝗧𝗛𝗨𝗘̂ 𝗕𝗢𝗧 ] → ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        case "remove":
        case "rm":
        case "delete": {
            const permission = ["100013942628281", "100067083429948", "100065095141252", "100079017055391"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] → ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
        case "resp": {
            const permission = ["100013942628281", "100067083429948", "100065095141252", "100079017055391"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.NDH.findIndex(item => item == id);
                    NDH.splice(index, 1);
                    config.NDH.splice(index, 1);
                    listAdd.push(`[ ${id} ] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.NDH.findIndex(item => item.toString() == content[0]);
                NDH.splice(index, 1);
                config.NDH.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[ ${content[0]} ] → ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
                              }
        case 'boxonly': {
          const { threadID, messageID, mentions } = event;
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("𝗧𝗮̆́𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗰𝗵𝗲̂́ 𝗱𝗼̣̂ 𝗤𝗧𝗩 𝗢𝗻𝗹𝘆", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("𝗕𝗮̣̂𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗰𝗵𝗲̂́ 𝗱𝗼̣̂ 𝗤𝗧𝗩 𝗢𝗻𝗹𝘆", threadID, messageID);
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
    }
    case 'only':
        case '-o': {
            //---> CODE ADMIN ONLY<---//
            const permission = ["100013942628281", "100067083429948", "100065095141252", "100079017055391"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
            if (config.adminOnly == false) {
                config.adminOnly = true;
                api.sendMessage(`𝗕𝗮̣̂𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗰𝗵𝗶̉ 𝗔𝗱𝗺𝗶𝗻 𝗺𝗼̛́𝗶 𝗱𝘂̀𝗻𝗴 𝗱𝘂̛𝗼̛̣𝗰 𝗯𝗼𝘁`, threadID, messageID);
            } else {
                config.adminOnly = false;
                api.sendMessage(`𝗧𝗮̆́𝘁 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗰𝗵𝗶̉ 𝗔𝗱𝗺𝗶𝗻 𝗺𝗼̛́𝗶 𝗱𝘂̀𝗻𝗴 𝗱𝘂̛𝗼̛̣𝗰 𝗯𝗼𝘁`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
				case 'pa':
        case '-p': {
            const permission = ["100013942628281", "100067083429948", "100065095141252", "100079017055391"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
            if (config.adminPaseOnly == false) {
                config.adminPaseOnly = true;
                api.sendMessage(`Bật thành công chỉ 𝗔𝗱𝗺𝗶𝗻 or 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 mới nhắn riêng với bot được`, threadID, messageID);
            } else {
                config.adminPaseOnly = false;
                api.sendMessage(`Tắt thành công chỉ 𝗔𝗱𝗺𝗶𝗻 or 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 mới nhắn riêng với bot được`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
							}
        case 'sponly':
        case '-s': {
            const permission = ["100013942628281", "100067083429948", "100065095141252", "100079017055391"];
	if (!permission.includes(event.senderID)) return api.sendMessage("Quyền lực của bạn không đủ mạnh để sử dụng lệnh này !!!", event.threadID, event.messageID);
            if (config.ndhOnly == false) {
                config.ndhOnly = true;
                api.sendMessage(`Bật thành công chỉ 𝗔𝗱𝗺𝗶𝗻 or 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 mới dùng được bot`, threadID, messageID);
            } else {
                config.ndhOnly = false;
                api.sendMessage(`Tắt thành công chỉ 𝗔𝗱𝗺𝗶𝗻 or 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁 mới dùng được bot`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
							}
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}
//               卍