
var Canvas = require('canvas');
var fs = require('fs');
var availableFonts = ['"AR CARTER"', '"Impact"', '"Comic Sans MS"', '"Segoe Print"'];
var selectedFontIndex = 0;

function creatUsernameImage(userName) {
    var height = 300;
    var width = 1200;
    var canvas = new Canvas(width,height);
    var ctx = canvas.getContext('2d');
    var text = userName;
    ctx.globalAlpha = .2;
    ctx.globalAlpha = 1;
    ctx.font = 'normal 80px "AR CARTER"';
    
    ctx.rotate(0);
    ctx.translate(20, -40);
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';
    ctx.strokeText(text, 50, height - 100);
    
    ctx.fillStyle = '#8AC007';
    ctx.fillText(text, 49, height - 99);

    
    var m = ctx.measureText(text);
    var l = m.actualBoundingBoxRight - m.actualBoundingBoxLeft;
    var k = m.actualBoundingBoxBottom - m.actualBoundingBoxTop;
    var fileName = userName+".png";
    
    var out = fs.createWriteStream(__dirname + '/' + fileName)
  , stream = canvas.createPNGStream();
    
    stream.on('data', function (chunk) {
        out.write(chunk);
    });
    return fileName;
}

function creatUsernameImage2(username)
{
    var Image = Canvas.Image;
    img = new Image;
    var buff = fs.readFileSync(__dirname + "/template2.png");
    img.src = buff;
    var x = img.width;
    var canvas = new Canvas(img.width, img.height);
    
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var fontName = availableFonts[selectedFontIndex];
    console.log('normal 80px ' + fontName);
    ctx.font = 'normal 80px ' + fontName;
    ctx.fillText(username, 67, 800);
   
    var fileName = username + ".png";
    fs.writeFileSync(fileName, canvas.toBuffer());
    return fileName;
};

    function displayFonts() {
     var canvas = new Canvas(800, 600);
     var ctx = canvas.getContext('2d');
    // ctx.font = 'normal 80px "AR CARTER"';
    // ctx.fillText("1. AR CARTER", 10, 100);

    // ctx.font = 'normal 80px "Impact"';
    // ctx.fillText("2. Impact", 10, 200);

    //ctx.font = 'normal 80px "Comic Sans MS"';
    //ctx.fillText("3. Comic Sans MS", 10, 300);
    
    //ctx.font = 'normal 80px "Segoe Print"';
    //ctx.fillText("4. Segoe Print", 10, 400);
    for (var i = 0; i < availableFonts.length; i++) {
        ctx.font = 'normal 120px ' + availableFonts[i];
        ctx.fillText(i+" " + availableFonts[i] , 10, 90 + i * 100);
    }
    
    var fileName = "fonts.png";
     fs.writeFileSync(fileName, canvas.toBuffer());
    return fileName;

    };
function selectFont(idx) {
    selectedFontIndex = idx;
};
exports.selectFont = selectFont;
exports.creatUsernameImage = creatUsernameImage;
exports.creatUsernameImage2 = creatUsernameImage2;
exports.displayFonts = displayFonts;
exports.selectedFontIndex = selectedFontIndex
exports.availableFonts = availableFonts