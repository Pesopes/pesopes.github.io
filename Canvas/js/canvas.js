var bezierX = 0;
var bezierY = 0;
var bezier2X = 0;
var bezier2Y = 0;
function draw() {
    clearCanvas();
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        //ctx.strokeStyle = canvasRgba(Math.sin(event.clientY/100), Math.sin(event.clientX/100), 0.1)
        ctx.fillRect(bezierX, bezierY, 5, 5);
        ctx.fillRect(bezier2X, bezier2Y, 5, 5);
        ctx.lineCap = "round";
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.moveTo(500, 500);
        ctx.bezierCurveTo(bezierX, bezierY, bezier2X, bezier2Y, 100, 100);
        ctx.stroke();
    }
}
function click(e) {
    if (e.button == 0) {
        bezierX = e.clientX;
        bezierY = e.clientY;
    }
    else if (e.button == 1) {
        bezierX = e.clientX;
        bezierY = e.clientY;
    }
    else if (e.button == 2) {
        bezier2X = e.clientX;
        bezier2Y = e.clientY;
    }
}
function key(e) {
    console.log("WHY NOT WORKY");
}
function triangleStroke(ctx, p1x, p1y, p2x, p2y, p3x, p3y) {
    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.lineTo(p3x, p3y);
    ctx.closePath();
    ctx.stroke();
}
//clears canvas 
function clearCanvas() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
//converts to the weird rgba format for css styling, uses 0.0-1.0 like in shaders
function canvasRgba(r, g, b, a) {
    if (a === void 0) { a = 1.0; }
    return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
}
function load() {
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("keypress", key, true);
    canvas.addEventListener("mousedown", click, true);
    setInterval(draw, 100);
}
