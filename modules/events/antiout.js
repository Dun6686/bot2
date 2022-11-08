module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "1.0.7",
    credits: "ProCoderMew",
    description: "Listen events",
    dependencies: {
        "path": ""
    }
};

module.exports.run = async function ({ api, event, Users }) {
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'meewmeew.json');
    const { antiout } = require(path);
    const { logMessageData, author, threadID } = event;
    const id = logMessageData.leftParticipantFbId;
    if (author == id && id != api.getCurrentUserID()) {
        const name = await Users.getNameUser(id) || "Người dùng Facebook";
        if (antiout.hasOwnProperty(threadID) && antiout[threadID] == true) {
            try {
                await api.addUserToGroup(id, threadID);
                return api.sendMessage(`𝗗𝗮̃ 𝘁𝗵𝗲̂𝗺 ${name} 𝘃𝗮̀𝗼 𝗹𝗮̣𝗶 𝗻𝗵𝗼́𝗺 .`);
            }
            catch (e) {
                return api.sendMessage(`𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝘁𝗵𝗲̂𝗺 ${name} 𝘃𝘂̛̀𝗮 𝗼𝘂𝘁 𝘃𝗮̀𝗼 𝗹𝗮̣𝗶 𝗻𝗵𝗼́𝗺.`, threadID);
            }
        }
    }
    return;
      }
