// - add toggleable greyscale (just apply the function or not in draw)
// - more settings
// - more shader functions (smoothstep, colormix, idk, blah, ...)
//

let canvasHeight = 800;
let canvasWidth = 800;
let resScale = 3; // higher = more pixelated , changes trough slider

// ONLOAD
function load(){

    console.log('%c My bad shader', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');

    let canvas = <HTMLCanvasElement> document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // configure slider : resolution
    let resSlider = <HTMLInputElement> document.getElementById("resSlider");
    resSlider.oninput = function(){
        //why cant I use this.value i do not know, I know you haave to specify that its a slider (or input in general)
        resScale = parseFloat(resSlider.value);
        let resNum = <HTMLInputElement> document.getElementById("resNum");
        resNum.innerHTML = "  " + resSlider.value;
        draw()
    }

    var codeInput = document.getElementById("code");
    codeInput.innerHTML = shaderMain.toString()

    draw()

    //SecURitY RiSk HAHAHahHahaHa
    // let base_image = new Image();
    // base_image.crossOrigin = "anonymous";
    // base_image.src = "js/img/hr.png";
    // base_image.onload = function(){
    //     ctx.drawImage(base_image, 0, 0,800,800);
    // }
}

// DRAW FUNCTIONS
function draw(){
    clearCanvas()
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    if(canvas.getContext){
        let ctx = canvas.getContext("2d");
        const screenW = canvas.width/resScale;
        const screenH = canvas.height/resScale
        const timeAtStart = Date.now()
        for (let x = 0; x < screenH; x++) {
            for (let y = 0; y < screenW; y++) {
                //shader colour
                let sc = shaderMain(x,y,screenW,screenH,timeAtStart);
                ctx.fillStyle = canvasRgba(sc);
                ctx.fillRect(x*resScale,y*resScale,resScale,resScale);
            }
        }
    }
}

//the asciifromcanvas func is better
function asciiDraw(){
    const asciiSymbols = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. "
    const screenW = 50;
    const screenH = 50;
    const timeAtStart = Date.now()
    let drawing = "";
    for (let y = 0; y < screenH; y++) {
        for (let x = 0; x < screenW; x++) {
            //shader colour
            let sc = shaderMain(x,y,screenW,screenH,timeAtStart);
            drawing += convertColorToSymbol(sc[0]*0.3+sc[1]*0.3+sc[2]*0.3) + " "
        }
        drawing += "\n"
    }
    return drawing
    function convertColorToSymbol(colour:number){
        return asciiSymbols[Math.round((asciiSymbols.length-1) * colour)]
    }
}

function asciiFromCanvas(){
    const asciiSymbols = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. "
    let drawing = "";

    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    let ctx : CanvasRenderingContext2D = canvas.getContext("2d");

    const screenW = canvas.width;
    const screenH = canvas.height;
    let blockSize = 20

    for (let y = 0; y < screenH/blockSize ; y++) {
        for (let x = 0; x < screenW/blockSize ; x++) {
            //ctx.getImageData(x,y,blockSize,blockSize).data
            drawing += convertColorToSymbol(averageColour(ctx.getImageData(x*blockSize,y*blockSize,blockSize,blockSize).data)) + " "
        }
        drawing += "\n"
    }
    return drawing
    function convertColorToSymbol(colour:number){
        return asciiSymbols[Math.round((asciiSymbols.length-1) * colour)]
    }

    function averageColour(data){
        let averages = []
        for (let i = 0; i < data.length; i+=4) {
            let avg = (data[i] + data[i+1] + data[i+2] + data[i+3])/4
            averages.push(avg)
        }
        let finalAverage= 0;
        for (let index = 0; index < averages.length; index++) {
            finalAverage += averages[index]
        }
        return Math.round(finalAverage / averages.length) /255
    }
}

//
// SHADER
//

function shaderMain(x:number,y:number,w:number,h:number,time:number):[number,number,number]{
    let fragColor: [number,number,number] = [0,0,0];
    let uv: [number,number] = [x/w,y/h]
    fragColor[1] = stepVec1(distance(uv,[0.5,0.5]),0.5)
    fragColor[2] = stepVec1(distance(uv,[0.5,0.5]),0.5)

    return fragColor;
}

function runCustomShader() {
    let headID = document.getElementsByTagName("head")[0];
    // let newScript = <HTMLScriptElement>document.getElementById("customShader");
    // if (newScript === null) {
    //     newScript = document.createElement("script")
    // }
    let newScript = document.createElement("script")

    newScript.id = "customShader"
    newScript.type = "text/javascript";
    newScript.innerHTML = (<HTMLTextAreaElement> document.getElementById("code")).value;
    headID.appendChild(newScript);
}

//
// SHADER FUNCTIONS
//

function stepVec2(xy:[number,number],edge:number){

    if(xy[0] > edge && xy[1]>edge)
        return 1
    else return 0
}

function stepVec1(x,edge:number){

    if(x > edge)
        return 1
    else return 0
}

function distance(xy1:[number,number],xy2:[number,number]){
    return Math.sqrt((xy1[0]-xy2[0])*(xy1[0]-xy2[0])+(xy1[1]-xy2[1])*(xy1[1]-xy2[1]))
}
//
// COLOUR CONVERTING
//

//converts to the weird rgba format for css/canvas/idkwhat styling, uses 0.0-1.0 like in shaders
function canvasRgba(rgb:[number,number,number],a=1.0){
    return "rgba("+rgb[0]*255+","+rgb[1]*255+","+rgb[2]*255+","+a+")";

}

function rgb2grey(rgb:[number,number,number],a=1.0) : [number,number,number]{
    let greyScale = rgb[0]*0.299+rgb[1]*0.587+rgb[2]*0.144
    return [greyScale,greyScale,greyScale]
}

//
// CANVAS FUNCTIONS
//

// just copied somehitng not working really TODO
function saveCanvasImg():void{
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");

    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.


    window.location.href=image; // it will save locally

}

//clears canvas 
function clearCanvas(){
    let canvas = <HTMLCanvasElement> document.getElementById("canvas");
    if(canvas.getContext){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}




