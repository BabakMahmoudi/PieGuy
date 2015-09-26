
var Canvas = require('canvas');
var fs = require('fs');

function creatUsernameImage(userName) {
    var height = 300;
    var width = 1200;
    var canvas = new Canvas(width,height);
    var ctx = canvas.getContext('2d');
    var text = userName;
    ctx.globalAlpha = .2;
    
    //ctx.fillRect(0, height / 2 - 4, width, height / 2 + 4);

    //ctx.lineTo(0, 100);
    //ctx.lineTo(200, 100);
    //ctx.stroke();
    
    //ctx.beginPath();
    //ctx.lineTo(100, 0);
    //ctx.lineTo(100, 200);
    //ctx.stroke();
    //var font = new Font("myFont", __dirame + "/ARCARTER.TTF");
    //ctx.addFont(font);
    ctx.globalAlpha = 1;
    ctx.font = 'normal 80px "AR CARTER"';
    
    ctx.rotate(0);
    ctx.translate(20, -40);
    
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';
    ctx.strokeText(text, 50, height-100);
    
    ctx.fillStyle = '#8AC007';
    ctx.fillText(text, 49, height - 99);

    
  //  var m = ctx.measureText(text);
    
  //  ctx.strokeStyle = '#f00';
    
  //  ctx.strokeRect(49 + m.actualBoundingBoxLeft,
  //99 - m.actualBoundingBoxAscent,
  //m.actualBoundingBoxRight - m.actualBoundingBoxLeft,
  //m.actualBoundingBoxAscent + m.actualBoundingBoxDescent);
    var fileName = userName+".png";
    
    var out = fs.createWriteStream(__dirname + '/' + fileName)
  , stream = canvas.createPNGStream();
    
    stream.on('data', function (chunk) {
        out.write(chunk);
    });
    return fileName;
}

exports.creatUsernameImage = creatUsernameImage;