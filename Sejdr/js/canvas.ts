//
// - more settings (and better - instead of togglebuttons just soe toggles)
// - more shader functions (smoothstep, colormix, idk, blah, ...)
// - presets (mandelbrot, circle, something using time)
// - continous updating (maybe only at lower resolutions) -> better time variable(resets to 0 when refreshing script)

let canvasHeight = 800;
let canvasWidth  = 800;
let resScale = 3; // higher = more pixelated , changes trough slider

let grey = false
let invert = false

let zoomScale = 3;
let xScale = 0
let yScale = 0


// ONLOAD
function load(){
    //displays styled "My bad shader" in console
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
    // configure slider : zoom
    let zoomSlider = <HTMLInputElement> document.getElementById("zoomSlider");
    zoomSlider.oninput = function(){
        //why cant I use this.value i do not know, I know you haave to specify that its a slider (or input in general)
        zoomScale = parseFloat(zoomSlider.value);
        let zoomNum = <HTMLInputElement> document.getElementById("zoomNum");
        zoomNum.innerHTML = "  " + zoomSlider.value;
        draw()
    }

    // configure slider : x
    let xSlider = <HTMLInputElement> document.getElementById("xSlider");
    xSlider.oninput = function(){
        xScale = parseFloat(xSlider.value);
        let xNum = <HTMLInputElement> document.getElementById("xNum");
        xNum.innerHTML = "  " + (Math.round(parseFloat(xSlider.value) * 100) / 100).toFixed(2);
        draw()
    }

    // configure slider : y
    let ySlider = <HTMLInputElement> document.getElementById("ySlider");
    ySlider.oninput = function(){
        yScale = parseFloat(ySlider.value);
        let yNum = <HTMLInputElement> document.getElementById("yNum");
        yNum.innerHTML = "  " + (Math.round(parseFloat(ySlider.value) * 100) / 100).toFixed(2);
        draw()
    }

    //pastes current shaderMain func into text field
    var codeInput = document.getElementById("code");
    codeInput.innerHTML = shaderMain.toString()

    
    draw()
   
    

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
function draw(){
    //used to calculate execution time
    console.time('draw time')
    clearCanvas()

    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    if(canvas.getContext){
        let ctx = canvas.getContext("2d");
        const screenW = canvas.width/resScale;
        const screenH = canvas.height/resScale;
        const timeAtStart = Date.now()
        for (let x = 0; x < screenH; x++) {
            for (let y = 0; y < screenW; y++) {
                //shader colour
                let sc = shaderMain(x,y,screenW,screenH,timeAtStart);
                //if options ...
                if (invert) {
                    sc = [1-sc[0],1-sc[1],1-sc[2],sc[3]]
                }
                if (grey) {
                    let sg = rgb2grey([sc[0],sc[1],sc[2]])
                    sc = [sg[0],sg[1],sg[2],sc[3]]
                }
                ctx.fillStyle = canvasRgba([sc[0],sc[1],sc[2]],sc[3]);
                ctx.fillRect(x*resScale,y*resScale,resScale,resScale);
            }
        }
    }
    console.timeEnd('draw time') 
}

//the asciifromcanvas func is better, NOT GOOD NOR TESTED/WORKING
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

//returns an ascii representation of the canvas TODO: more options (resolution, size, types of characters,...)
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

    //calculates average rgb (0.0-1.0) from context.getImageData func
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

//does not work (obviously)
function rectangle(uv:[number,number],w:number,h:number){

    console.log("IDK")
}

//smooth circle TODO: add how much SMOOTH hmmmm
function circle(uv:[number,number], pos:[number,number],radius:number){
    //let st: [number,number] = [uv[0]-pos[0],uv[1]-pos[1]]
    return smoothstep(distance(uv,pos),radius-0.008,radius)
}

//things for mandelbrot (i have no idea ((well a little but still)))
function squareImaginary(number:[number,number]){
	return [
		Math.pow(number[0],2)-Math.pow(number[1],2),
		2*number[0]*number[1]
    ]
}

function iterateMandelbrot(coord:[number,number],maxIterations:number){
	let z : [number,number] = [0,0];
	for(let i=0;i<maxIterations;i++){
		z = [squareImaginary(z)[0] + coord[0],squareImaginary(z)[1] + coord[1]];
		if(lengthVec2(z)>2) return i/maxIterations;
	}
	return 1;
}

//zooms ...
function zoom(uv:[number,number],num:number):[number,number]{
    return [uv[0]*num,uv[1]*num]
}

//translates by pos
function move(uv:[number,number],pos:[number,number]):[number,number]{
    return [uv[0]+pos[0],uv[1]+pos[1]]
}

// THE shader
function shaderMain(x:number,y:number,w:number,h:number,time:number):[number,number,number,number]{
    let fragColor: [number,number,number,number] = [1,1,1,1];
    let uv: [number,number] = [x/w,y/h]
    uv = [uv[0]-0.5,uv[1]-0.5]
    uv = zoom(uv, zoomScale)
    uv = [uv[0]+0.5,uv[1]+0.5]

    uv = move(uv, [xScale,yScale])

    fragColor[0] = (1-iterateMandelbrot(uv,25))
    fragColor[1] = fragColor[0]
    fragColor[2] =  circle(uv,[0.5,0.5],0.01)
    return fragColor;
}

//I dont even remember adding this here
function plot(st: [number,number], pct:number){
    return  smoothstep( pct-0.02, pct, st[1]) -
            smoothstep( pct, pct+0.02, st[1]);
  }

//adds custom shader from website
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
//I wont explain what these do

function stepVec2(xy:[number,number],edge:number){

    if(xy[0] > edge && xy[1]>edge)
        return 1
    else return 0
}

function step(x,edge:number){

    if(x > edge)
        return 1
    else return 0
}

function smoothstep(x, edge0,edge1){
    let t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}

function distance(xy1:[number,number],xy2:[number,number]){
    return Math.sqrt((xy1[0]-xy2[0])*(xy1[0]-xy2[0])+(xy1[1]-xy2[1])*(xy1[1]-xy2[1]))
}

function clamp(x:number,minVal:number,maxVal:number){
    return Math.min(Math.max(x, minVal), maxVal)
}
function clampVec2(xy:[number,number],minVal:[number,number],maxVal:[number,number]){
    return [Math.min(Math.max(xy[0], minVal[0]), maxVal[0]),Math.min(Math.max(xy[1], minVal[1]), maxVal[1])]
}
function lengthVec2(xy:[number,number]){
    return Math.sqrt(xy[0]*xy[0]+xy[1]*xy[1])
}

//
// COLOUR CONVERTING
//

//converts to the weird rgba format for css/canvas/idkwhat styling, uses 0.0-1.0 like in shaders
function canvasRgba(rgb:[number,number,number],a=1.0){
    return "rgba("+rgb[0]*255+","+rgb[1]*255+","+rgb[2]*255+","+a+")";

}

//rgb to greyscale (0.0-1.0)
function rgb2grey(rgb:[number,number,number],a=1.0) : [number,number,number]{
    let greyScale = rgb[0]*0.299+rgb[1]*0.587+rgb[2]*0.144
    return [greyScale,greyScale,greyScale]
}

//
// CANVAS FUNCTIONS
//

// just copied somehitng not working really, but I dont think this is even necessary you can litterally
// just right click and save image
function saveCanvasImg():void{
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");

    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 


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

//
// buttons
//

function asciiDrawButton(){
    let ascii = asciiFromCanvas()
    console.log(ascii)
    let out = document.getElementById("asciiOut")
    out.innerHTML = ascii
}


