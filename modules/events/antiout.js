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
        const name = await Users.getNameUser(id) || "Ngฦฐแปi dรนng Facebook";
        if (antiout.hasOwnProperty(threadID) && antiout[threadID] == true) {
            try {
                await api.addUserToGroup(id, threadID);
                return api.sendMessage(`๐๐ฎฬ ๐๐ต๐ฒฬ๐บ ${name} ๐๐ฎฬ๐ผ ๐น๐ฎฬฃ๐ถ ๐ป๐ต๐ผฬ๐บ .`);
            }
            catch (e) {
                return api.sendMessage(`๐๐ต๐ผฬ๐ป๐ด ๐๐ต๐ฒฬฬ ๐๐ต๐ฒฬ๐บ ${name} ๐๐ฬฬ๐ฎ ๐ผ๐๐ ๐๐ฎฬ๐ผ ๐น๐ฎฬฃ๐ถ ๐ป๐ต๐ผฬ๐บ.`, threadID);
            }
        }
    }
    return;
      }
