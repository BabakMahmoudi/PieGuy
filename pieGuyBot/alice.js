var telegramBot = require('node-telegram-bot-api');
var fs = require("fs");
var pi = fs.readFileSync("pi.txt", "ascii");
var token = ('101950127:AAGU_prhyZSSKwhQQb1eesAdNfANcSaxp4s');
var bot = new telegramBot(token, { polling: true });
var txt = require('./text.js');
var aiml = require('aiml');

bot.getMe().then(function (me) {
    console.log('hi my name is %s!', me.username);
});
var files = [
    "aiml\\pi.aiml"
       //"aiml\\default.aiml"
] 
    aiml.parseFiles(files, function (err, topics) {
        var engine = new aiml.AiEngine('Default', topics, { name: "pieGuy" });
        bot.on("text", function (msg) {
       
        console.log(msg.from.first_name + " " + msg.from.last_name + " " + msg.text);
        //bot.sendMessage(msg.chat.id, "what");
        //return;
            
            var responce = engine.reply({ name:msg.from.first_name }, msg.text , function (err, responce) {
            console.log(responce);

            if (typeof (responce) != 'undefined' && responce != '') {

                if (responce == "sendPiImage") {
                    bot.sendPhoto(msg.chat.id, "piPic.png");
                }

                else {
                    bot.sendMessage(msg.chat.id, responce);
                }
            }
            else {
                bot.sendMessage(msg.chat.id,"what");
            }
            });
        });
    });