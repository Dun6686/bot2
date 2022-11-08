export const config = {
	name: "\n",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "JRT",
	description: "Chỉ là prefix thôi~~",
	commandCategory: "Công cụ",
	usages: "prefix",
	cooldowns: 0
};

export async function run({ api, event }) {
const axios = require('axios');
    const request = require('request');
    const fs = require("fs");
    axios.get('http://13.124.68.247:53307').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function() {
					api.sendMessage({body: ``,
						attachment: fs.createReadStream(__dirname + `/cache/anh.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/anh.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/anh.${ext}`)).on("close", callback);
			})
}