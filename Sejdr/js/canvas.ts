let canvasHeight = 800;
let canvasWidth = 800;
let resScale = 3; // higher = more pixelated 

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
                ctx.fillStyle = canvasRgba([sc[0]*0.3+sc[1]*0.3+sc[2]*0.3,sc[0]*0.3+sc[1]*0.3+sc[2]*0.3,sc[0]*0.3+sc[1]*0.3+sc[2]*0.3]);
                ctx.fillRect(x*resScale,y*resScale,resScale,resScale);
            }
        }
    }
}

function shaderMain(x:number,y:number,w:number,h:number,time:number):[number,number,number]{
    let fragColor: [number,number,number] = [0,0,0];
    let uv: [number,number] = [x/w,y/h]
    fragColor[0] = distance(uv,[0.5,0.5]) * Math.sin(time)
    fragColor[1] = distance(uv,[0.8,0.5])
    fragColor[2] = distance(uv,[0.8,0.9])
    return fragColor;
}


function step(xy:[number,number],edge:number){

    if(xy[0] > edge && xy[1]>edge)
        return 1
    else return 0
}

function distance(xy1:[number,number],xy2:[number,number]){
    return Math.sqrt((xy1[0]-xy2[0])*(xy1[0]-xy2[0])+(xy1[1]-xy2[1])*(xy1[1]-xy2[1]))
}

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

//converts to the weird rgba format for css styling, uses 0.0-1.0 like in shaders
function canvasRgba(rgb:[number,number,number],a=1.0){

    return "rgba("+rgb[0]*255+","+rgb[1]*255+","+rgb[2]*255+","+a+")";

}

function load(){
    let canvas = <HTMLCanvasElement> document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let resSlider = <HTMLInputElement> document.getElementById("resSlider");
    resSlider.oninput = function(){
        //why cant I use this.value i do not know, I know you haave to specify that its a slider (or input in general)
        resScale = parseFloat(resSlider.value);
        resSlider.innerHTML = resSlider.value;
        draw()
    }







    draw()
    setInterval(draw,10000);
    console.log(asciiDraw())
}
