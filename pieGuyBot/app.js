var telegramBot = require('node-telegram-bot-api')
, fs = require("fs")
, pi = fs.readFileSync("pi.txt", "ascii")
, token = ('101950127:AAGU_prhyZSSKwhQQb1eesAdNfANcSaxp4s')
, bot = new telegramBot(token, { polling: true })
, txt = require('./text.js')
bot.getMe().then(function (me) {
    console.log('hi my name is %s!', me.username);
});
bot.on('text', function (msg) {
    console.log(msg.from.first_name + " " + msg.from.last_name + msg.text);
    
    var cmd = msg.text;
    var arg = "";
    if (cmd.indexOf(" ") > 1) {
        
        cmd = msg.text.substr(0, msg.text.indexOf(" "));
        arg = msg.text.substr(msg.text.indexOf(" ") + 1, msg.text.length - msg.text.indexOf(" "));
        
        
        console.log("cmd='" + cmd + "'" + " arg='" + arg + "'");
        
    }
    var chatId = msg.chat.id;
    switch (cmd) {
        case "/pi":
            bot.sendMessage(chatId, x);
            break;
        case "/p":
            bot.sendPhoto(chatId, "piPic.png");
            break;
        case "/search":
            
            if (pi.indexOf(arg) > 0) {
                bot.sendMessage(chatId, "found: " + pi.indexOf(arg));
                var from = pi.indexOf(arg) - 5;
                if (from < 0) {
                    from = 0;
                }
                var slice = pi.substr(from , 15);
                bot.sendMessage(chatId, slice + "\r\n______x");
                console.log(slice);
            }
            else {
                bot.sendMessage(chatId, "not found!");
            }
            break;
        case "/logo":
            var fullName = msg.from.first_name + "  " + msg.from.last_name;
            var fName = txt.creatUserImage2(arg)
          
                bot.sendPhoto(chatId, __dirname + "/"+fName);
            break;
        case "/fonts":
            var fontsFileName = txt.displayFonts();
            bot.sendPhoto(chatId, __dirname + "/" + fontsFileName);
            break;
        case "/font":
            var idx = parseInt(arg);
            console.log(idx);
            if (idx > 0 && idx < txt.availableFonts.length) {
                txt.selectedFontIndex = idx;
                bot.sendMessage(chatId, txt.availableFonts[txt.selectedFontIndex] + " selected");
            }
            else {
                bot.sendMessage(chatId, "Please choose a number between 0 and 5. Example: /font 1");
            }
            break;
        default :
            bot.sendMessage(chatId, "hi " + msg.from.first_name + " " + msg.from.last_name);
            break;
        

    }    ;
});

