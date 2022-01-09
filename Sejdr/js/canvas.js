// - add toggleable greyscale (just apply the function or not in draw)
// - more settings
// - more shader functions (smoothstep, colormix, idk, blah, ...)
//
var canvasHeight = 800;
var canvasWidth = 800;
var resScale = 3; // higher = more pixelated , changes trough slider
var zoomScale = 3;
var xScale = 0;
var yScale = 0;
// ONLOAD
function load() {
    console.log('%c My bad shader', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // configure slider : resolution
    var resSlider = document.getElementById("resSlider");
    resSlider.oninput = function () {
        //why cant I use this.value i do not know, I know you haave to specify that its a slider (or input in general)
        resScale = parseFloat(resSlider.value);
        var resNum = document.getElementById("resNum");
        resNum.innerHTML = "  " + resSlider.value;
        draw();
    };
    // configure slider : zoom
    var zoomSlider = document.getElementById("zoomSlider");
    zoomSlider.oninput = function () {
        //why cant I use this.value i do not know, I know you haave to specify that its a slider (or input in general)
        zoomScale = parseFloat(zoomSlider.value);
        var zoomNum = document.getElementById("zoomNum");
        zoomNum.innerHTML = "  " + zoomSlider.value;
        draw();
    };
    // configure slider : x
    var xSlider = document.getElementById("xSlider");
    xSlider.oninput = function () {
        xScale = parseFloat(xSlider.value);
        var xNum = document.getElementById("xNum");
        xNum.innerHTML = "  " + xSlider.value;
        draw();
    };
    // configure slider : y
    var ySlider = document.getElementById("ySlider");
    ySlider.oninput = function () {
        yScale = parseFloat(ySlider.value);
        var yNum = document.getElementById("yNum");
        yNum.innerHTML = "  " + ySlider.value;
        draw();
    };
    var codeInput = document.getElementById("code");
    codeInput.innerHTML = shaderMain.toString();
    draw();
    //SecURitY RiSk HAHAHahHahaHa I hate you
    // let base_image = new Image();
    // base_image.crossOrigin = "anonymous";
    // base_image.src = "js/img/hr.png";
    // base_image.onload = function(){
    //     ctx.drawImage(base_image, 0, 0,800,800);
    // }
}
//
// DRAW FUNCTIONS
//
function draw() {
    clearCanvas();
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var screenW = canvas.width / resScale;
        var screenH = canvas.height / resScale;
        var timeAtStart = Date.now();
        for (var x = 0; x < screenH; x++) {
            for (var y = 0; y < screenW; y++) {
                //shader colour
                var sc = shaderMain(x, y, screenW, screenH, timeAtStart);
                ctx.fillStyle = canvasRgba([sc[0], sc[1], sc[2]], sc[3]);
                ctx.fillRect(x * resScale, y * resScale, resScale, resScale);
            }
        }
    }
}
//the asciifromcanvas func is better NOT GOOD OR TESTED/WORKING
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
function asciiFromCanvas() {
    var asciiSymbols = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
    var drawing = "";
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var screenW = canvas.width;
    var screenH = canvas.height;
    var blockSize = 20;
    for (var y = 0; y < screenH / blockSize; y++) {
        for (var x = 0; x < screenW / blockSize; x++) {
            //ctx.getImageData(x,y,blockSize,blockSize).data
            drawing += convertColorToSymbol(averageColour(ctx.getImageData(x * blockSize, y * blockSize, blockSize, blockSize).data)) + " ";
        }
        drawing += "\n";
    }
    return drawing;
    function convertColorToSymbol(colour) {
        return asciiSymbols[Math.round((asciiSymbols.length - 1) * colour)];
    }
    function averageColour(data) {
        var averages = [];
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2] + data[i + 3]) / 4;
            averages.push(avg);
        }
        var finalAverage = 0;
        for (var index = 0; index < averages.length; index++) {
            finalAverage += averages[index];
        }
        return Math.round(finalAverage / averages.length) / 255;
    }
}
//
// SHADER
//
function rectangle(uv, w, h) {
    console.log("IDK");
}
function circle(uv, pos, radius) {
    //let st: [number,number] = [uv[0]-pos[0],uv[1]-pos[1]]
    return smoothstep(distance(uv, pos), radius - 0.008, radius);
}
function squareImaginary(number) {
    return [
        Math.pow(number[0], 2) - Math.pow(number[1], 2),
        2 * number[0] * number[1]
    ];
}
function iterateMandelbrot(coord) {
    var z = [0, 0];
    var maxIterations = 25;
    for (var i = 0; i < maxIterations; i++) {
        z = [squareImaginary(z)[0] + coord[0], squareImaginary(z)[1] + coord[1]];
        if (lengthVec2(z) > 2)
            return i / maxIterations;
    }
    return maxIterations;
}
function zoom(uv, num) {
    return [uv[0] * num, uv[1] * num];
}
function move(uv, pos) {
    return [uv[0] + pos[0], uv[1] + pos[1]];
}
// THE shader
function shaderMain(x, y, w, h, time) {
    var fragColor = [1, 1, 1, 1];
    var uv = [x / w, y / h];
    uv = [uv[0] - 0.5, uv[1] - 0.5];
    uv = zoom(uv, zoomScale);
    uv = [uv[0] + 0.5, uv[1] + 0.5];
    uv = move(uv, [xScale, yScale]);
    fragColor[0] = (1 - iterateMandelbrot(uv));
    fragColor[1] = fragColor[0];
    fragColor[2] = circle(uv, [0.5, 0.5], 0.01);
    return fragColor;
}
function plot(st, pct) {
    return smoothstep(pct - 0.02, pct, st[1]) -
        smoothstep(pct, pct + 0.02, st[1]);
}
function runCustomShader() {
    var headID = document.getElementsByTagName("head")[0];
    // let newScript = <HTMLScriptElement>document.getElementById("customShader");
    // if (newScript === null) {
    //     newScript = document.createElement("script")
    // }
    var newScript = document.createElement("script");
    newScript.id = "customShader";
    newScript.type = "text/javascript";
    newScript.innerHTML = document.getElementById("code").value;
    headID.appendChild(newScript);
}
//
// SHADER FUNCTIONS
//
function stepVec2(xy, edge) {
    if (xy[0] > edge && xy[1] > edge)
        return 1;
    else
        return 0;
}
function step(x, edge) {
    if (x > edge)
        return 1;
    else
        return 0;
}
function smoothstep(x, edge0, edge1) {
    var t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}
function distance(xy1, xy2) {
    return Math.sqrt((xy1[0] - xy2[0]) * (xy1[0] - xy2[0]) + (xy1[1] - xy2[1]) * (xy1[1] - xy2[1]));
}
function clamp(x, minVal, maxVal) {
    return Math.min(Math.max(x, minVal), maxVal);
}
function clampVec2(xy, minVal, maxVal) {
    return [Math.min(Math.max(xy[0], minVal[0]), maxVal[0]), Math.min(Math.max(xy[1], minVal[1]), maxVal[1])];
}
function lengthVec2(xy) {
    return Math.sqrt(xy[0] * xy[0] + xy[1] * xy[1]);
}
//
// COLOUR CONVERTING
//
//converts to the weird rgba format for css/canvas/idkwhat styling, uses 0.0-1.0 like in shaders
function canvasRgba(rgb, a) {
    if (a === void 0) { a = 1.0; }
    return "rgba(" + rgb[0] * 255 + "," + rgb[1] * 255 + "," + rgb[2] * 255 + "," + a + ")";
}
function rgb2grey(rgb, a) {
    if (a === void 0) { a = 1.0; }
    var greyScale = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.144;
    return [greyScale, greyScale, greyScale];
}
//
// CANVAS FUNCTIONS
//
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
//
// buttons
//
function asciiDrawButton() {
    var ascii = asciiFromCanvas();
    console.log(ascii);
    var out = document.getElementById("asciiOut");
    out.innerHTML = ascii;
}
