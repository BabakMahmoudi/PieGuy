
var Canvas = require('canvas');
var fs = require('fs');
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
    var buff = fs.readFileSync(__dirname + "/template1.png");
    img.src = buff;
    var x = img.width;
    var canvas = new Canvas(img.width, img.height);
    
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    ctx.font = 'normal 80px "AR CARTER"';
    ctx.strokeText(username, 67, 150);
    
    var fileName = username + ".png";
    fs.writeFileSync(fileName, canvas.toBuffer());
    return fileName;
};
exports.creatUsernameImage = creatUsernameImage;
exports.creatUsernameImage2 = creatUsernameImage2;
