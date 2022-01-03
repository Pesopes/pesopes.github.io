var canvasWidth = 100;
var canvasHeight = 100;
function draw() {
    clearCanvas();
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var screenW = canvas.width / 2;
        var screenH = canvas.height / 2;
        var timeAtStart = Date.now();
        for (var x = 0; x < screenH; x++) {
            for (var y = 0; y < screenW; y++) {
                //shader colour
                var sc = shaderMain(x, y, screenW, screenH, timeAtStart);
                ctx.fillStyle = canvasRgba([sc[0] * 0.3 + sc[1] * 0.3 + sc[2] * 0.3, sc[0] * 0.3 + sc[1] * 0.3 + sc[2] * 0.3, sc[0] * 0.3 + sc[1] * 0.3 + sc[2] * 0.3]);
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}
function shaderMain(x, y, w, h, time) {
    var fragColor = [0, 0, 0];
    var uv = [x / w, y / h];
    fragColor[0] = distance(uv, [0.5, 0.5]) * Math.sin(time);
    fragColor[1] = distance(uv, [0.8, 0.5]);
    fragColor[2] = distance(uv, [0.8, 0.9]);
    return fragColor;
}
function step(xy, edge) {
    if (xy[0] > edge && xy[1] > edge)
        return 1;
    else
        return 0;
}
function distance(xy1, xy2) {
    return Math.sqrt((xy1[0] - xy2[0]) * (xy1[0] - xy2[0]) + (xy1[1] - xy2[1]) * (xy1[1] - xy2[1]));
}
function asciiDraw() {
    var asciiSymbols = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
    var screenW = 50;
    var screenH = 50;
    var timeAtStart = Date.now();
    var drawing = "";
    for (var y = 0; y < screenH; y++) {
        for (var x = 0; x < screenW; x++) {
            //shader colour
            var sc = shaderMain(x, y, screenW, screenH, timeAtStart);
            drawing += convertColorToSymbol(sc[0] * 0.3 + sc[1] * 0.3 + sc[2] * 0.3) + " ";
        }
        drawing += "\n";
    }
    return drawing;
    function convertColorToSymbol(colour) {
        return asciiSymbols[Math.round((asciiSymbols.length - 1) * colour)];
    }
}
// just copied somehitng not working really TODO
function saveCanvasImg() {
    var canvas = document.getElementById("canvas");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
    window.location.href = image; // it will save locally
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
function canvasRgba(rgb, a) {
    if (a === void 0) { a = 1.0; }
    return "rgba(" + rgb[0] * 255 + "," + rgb[1] * 255 + "," + rgb[2] * 255 + "," + a + ")";
}
function load() {
    var canvas = document.getElementById("canvas");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    setInterval(draw, 10000);
    console.log(asciiDraw());
}
