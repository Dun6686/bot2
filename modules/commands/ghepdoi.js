module.exports.config = {
  name: "ghepdoi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hungcho",
  description: "Ghep doi ngau nhien cรณ ฤแปi tรชn",
  commandCategory: "roleplay",
  usages: "ghepdoi",
  cooldowns: 0,
  dependencies: {}
};

module.exports.run = async function({ api, event, Users, Currencies }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        var data = await Currencies.getData(event.senderID);
        var money = data.money
        if( money < 10000) api.sendMessage("๐ ๐๐ฎ๐จฬฬ๐ง ๐ ๐ก๐ฬ๐ฉ ๐๐จฬ๐ข ๐ฉ๐ก๐ฬ๐ข ๐๐จฬ 10000 ๐๐ก๐ขฬ ๐๐จ๐ญ ๐ฆ๐จฬฬ๐ข ๐ ๐ก๐ฬ๐ฉ ๐๐ก๐จ ๐ง๐ก๐!", event.threadID, event.messageID) //thay sแป tiแปn cแบงn trแปซ vร o 0, xรณa money = 0
        else {
        var tile = Math.floor(Math.random() * 101);
        

        //let loz = await api.getThreadInfo(event.threadID);
        var emoji = event.participantIDs;
        var id = emoji[Math.floor(Math.random() * emoji.length)];

        var namee = (await Users.getData(event.senderID)).name;
        var name = (await Users.getData(id)).name;

        var arraytag = [];
        arraytag.push({id: event.senderID, tag: namee});
        arraytag.push({id: id, tag: name});
                
        api.changeNickname(`${namee} ๐๐ข๐ญ๐ก ${name}`, event.threadID, event.senderID);
        api.changeNickname(`${name} ๐๐ข๐ญ๐ก ${namee}`, event.threadID, id);
        Currencies.setData(event.senderID, options = {money: money - 50})
  
        let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `โก๏ธGhรฉp ฤรดi thร nh cรดng!\nโก๏ธTแป lแป hแปฃp ฤรดi: ${tile}%\n`+namee+" "+"๐"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
        //fs.unlinkSync(__dirname + '/cache/1.png');
        //fs.unlinkSync(__dirname + '/cache/2.png');
      }
}
