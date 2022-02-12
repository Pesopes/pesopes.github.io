//I DECLARE THIS PROJECT AS (almost) COMPLETE
//I HAVE FINISHED SOMETHING REASONABLY BIG AND ALSO KIND OF TRIED TO COMMENT EVERYTHING
//I SHOULD PROBABLY STOP WRITING THIS BECAUSE IT DOESNT MAKE SENSE
//I MADE SHADERS IN JS FOR SOME WEIRD REASON
//IT IS 20:35 15/01/2022 AND I SHOULD PROBABLY STOP WRITING THIS
//WAIT I ALREADY SAID THAT
//IF SOMEBODY FINDS THIS IN THE FUTURE THEY WILL BE CONFUSED OR WILL MOST LIKELY JUST LEAVE BUT I DONT CARE
//
// - more shader functions ( colormix, idk, blah, ...) (dont mind me just googling how does the "idk" function work)
// - presets (mandelbrot, circle, something using time)
// - continous updating (maybe only at lower resolutions) -> better time variable(resets to 0 when refreshing script)  kind of implemented
// - atleast delete the previous shader when creating the new ones (i dont know what i meant lol)


//logs draw method time taken
const LogDrawTime = true
//when moving sliders res
const Badres = 20
//how fast to decrease resolution
const ResStep = 7
//delay to start decreasing res
const ResDecreaseDelay = 400


let canvasHeight = 800;
let canvasWidth  = 800;

let resScale = 3; // higher = more pixelated , changes trough slider

//variables used to dynamicllly(nice spelling) change resolution
let lastResScale = 3
let lastTimeToRender = 100
let hasStartedMoving = true
let getResBack:number = null
let gradualRes:number = null

//some options (checkboxes)
let grey = false
let invert = false
let flipX = false
let flipY = false
//(sliders)
let zoomScale = 3;
let xScale = 0
let yScale = 0


//  ONLOAD - adds all oninput/onchange functions to sliders and checkboxes and all inputs really
function load(){
    //displays styled "My bad shader" in console
    console.log('%c My bad shader', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');
    console.log("%c It works but barely! Yay!", "font-size: 20px;font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;")
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
        // let zoomNum = <HTMLInputElement> document.getElementById("zoomNum");
        // zoomNum.innerHTML = "  " + zoomSlider.value;
        draw()
    }

    // configure slider : x
    let xSlider = <HTMLInputElement> document.getElementById("xSlider");
    xSlider.oninput = function(){
        //wtf I dont even know , it decreases the resolution when moving the moving sliders(yes makes sense)
        //not used
        let sliderDelta = Math.abs((parseFloat(xSlider.value)-xScale))
        //console.log(`\n     last res scale:${lastResScale} res scale:${resScale}   hasStartedMoving: ${hasStartedMoving}   gradRes: ${gradualRes === null}`)

        clearTimeout(getResBack)
        getResBack = setTimeout(()=>{
            gradualRes = setInterval(()=>{
                //console.log("Pomalu menin zpatky: na:" + (lastResScale)+" z "+resScale)
                
                if (lastResScale < resScale) {
                    if (resScale -ResStep < lastResScale) {
                        resScale -= 1
                    }else
                        resScale -= ResStep

                    draw();
                    hasStartedMoving = false
                }else{
                    hasStartedMoving = true

                    clearTimeout(gradualRes)
                    gradualRes = null
                }
            },50)
                draw();
        },400)

        if (hasStartedMoving) {
            //console.log("PAMATUJU SI RES:"+resScale)
            lastResScale = resScale
            resScale = Badres;
            hasStartedMoving = false
        }
        if (gradualRes != null) {
            //console.log("Clear timeout gradual res, startedmoving = true, resscale = Badres")
            resScale = Badres

            //clears gradual decrease of res
            clearTimeout(gradualRes)
            gradualRes = null
        }
            
            
        
        xScale = parseFloat(xSlider.value);
        let xNum = <HTMLInputElement> document.getElementById("xNum");
        xNum.innerHTML = "  " + (Math.round(parseFloat(xSlider.value) * 100) / 100).toFixed(2);
        draw()
    }

    // configure slider : y
    let ySlider = <HTMLInputElement> document.getElementById("ySlider");
    ySlider.oninput = function(){
        //wtf I dont even know , it decreases the resolution when moving the moving sliders(yes makes sense)
        //not used
        let sliderDelta = Math.abs((parseFloat(ySlider.value)-yScale))
        //console.log(`\n     last res scale:${lastResScale} res scale:${resScale}   hasStartedMoving: ${hasStartedMoving}   gradRes: ${gradualRes === null}`)

        clearTimeout(getResBack)
        getResBack = setTimeout(()=>{
            gradualRes = setInterval(()=>{
                //console.log("Pomalu menin zpatky: na:" + (lastResScale)+" z "+resScale)
                
                if (lastResScale < resScale) {
                    if (resScale -ResStep < lastResScale) {
                        resScale -= 1
                    }else
                        resScale -= ResStep

                    draw();
                    hasStartedMoving = false
                }else{
                    hasStartedMoving = true

                    clearTimeout(gradualRes)
                    gradualRes = null
                }
            },50)
                draw();
        },ResDecreaseDelay)

        if (hasStartedMoving) {
            //console.log("PAMATUJU SI RES:"+resScale)
            lastResScale = resScale
            resScale = Badres;
            hasStartedMoving = false
        }
        if (gradualRes != null) {
            //console.log("Clear timeout gradual res, startedmoving = true, resscale = Badres")
            resScale = Badres

            //clears gradual decrease of res
            clearTimeout(gradualRes)
            gradualRes = null
        }
            
            
        //this is - becuase the slider is vertically
        yScale = -parseFloat(ySlider.value);
        let yNum = <HTMLInputElement> document.getElementById("yNum");
        yNum.innerHTML = "  " + (Math.round(parseFloat(ySlider.value) * 100) / 100).toFixed(2);
        draw()
    }

    //reset checkboxes when refreshing the page(why do I have to do this there has to be a better way)
    var checkboxes = document.getElementsByTagName("input");
    for(var i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = false; 
    }  
}

    //pastes current shaderMain func into text field
    var codeInput = document.getElementById("code");
    codeInput.innerHTML = shaderMain.toString()
    
    
    draw()
   
    

    //SecURitY RiSk HAHAHahHahaHa I hate you (this was supposed to display some image so you can "ascii-fy" it)
    // let base_image = new Image();
    // //base_image.crossOrigin = "anonymous";
    // base_image.src = "js/img/thumbs-up.jpg";
    // base_image.onload = function(){
    //     ctx.drawImage(base_image, 0, 0,800,800);
    //     console.log(asciiFromCanvas())
    // }
}

//
//  DRAW FUNCTIONS
//
function draw(){
    //used to calculate execution time
    const t0 = window.performance.now()

    //clears the canvas (i know great comments)
    clearCanvas()

    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    if(canvas.getContext){
        let ctx = canvas.getContext("2d");
        const screenW = canvas.width/resScale;
        const screenH = canvas.height/resScale;
        const timeAtStart = Date.now()
        //this runs the shader for every block on the canvas (more res more blocks more lagggg)
        for (let x = 0; x < screenH; x++) {
            for (let y = 0; y < screenW; y++) {
                
                //shader colour
                let sc = shaderMain(flipX ? screenH-x : x,flipY ? screenW-y : y,screenW,screenH,timeAtStart);
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
    //used to calculate execution time and log it
    const t1 = window.performance.now()
    lastTimeToRender = t1-t0
    if (LogDrawTime)
        console.log(`The draw method took ${t1 - t0} milliseconds.`);
}

//there was a ascii function that ran the shader if you really want it you will have to go to the github history


//returns an ascii representation of the canvas TODO: more options (resolution, size, types of characters,...)
function asciiFromCanvas(blockSize:number = 20){
    const asciiSymbols = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. "
    let drawing = "";

    let canvas = <HTMLCanvasElement>document.getElementById("canvas");
    let ctx : CanvasRenderingContext2D = canvas.getContext("2d");

    const screenW = canvas.width;
    const screenH = canvas.height;

    for (let y = 0; y < screenH/blockSize ; y++) {
        for (let x = 0; x < screenW/blockSize ; x++) {
            //ctx.getImageData(x,y,blockSize,blockSize).data
            drawing += convertColorToSymbol(averageColour(ctx.getImageData(x*blockSize,y*blockSize,blockSize,blockSize).data)) + " "
        }
        drawing += "\n"
    }
    return drawing

    //returns symbol from asciiSymbols based on luminance
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

//adds custom shader from website (appends script element and if it exists it just deletes the old one)
function runCustomShader() {
    let headID = document.getElementsByTagName("head")[0];
    let newScript = <HTMLScriptElement>document.getElementById("customShader");
    if (newScript != null) {
        newScript.remove()
    }
    newScript = document.createElement("script")

    newScript.id = "customShader"
    newScript.type = "text/javascript";
    newScript.innerHTML = (<HTMLTextAreaElement> document.getElementById("code")).value;
    headID.appendChild(newScript);
}

//
// SHADER FUNCTIONS
//
//I wont explain what these do just go to thebookofshaders.com lol

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

function fract(x:number){
    return x - Math.floor(x)
}

function fractVec2(xy:[number,number]):[number,number]{
    return [xy[0] - Math.floor(xy[0]),xy[1] - Math.floor(xy[1])]
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


//clears canvas (wow)
function clearCanvas(){
    let canvas = <HTMLCanvasElement> document.getElementById("canvas");
    if(canvas.getContext){
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// just copied somehitng not working really, but I dont think this is even necessary you can litterally
// just right click and save image
function saveCanvasImg():void{
    let canvas = <HTMLCanvasElement>document.getElementById("canvas");

    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 

    window.location.href=image; // it will save locally

}

//
// BUTTONS
//

//generating ascii art when button press, also warns if it will be too slow
function asciiDrawButton(){
    //gets the resolution from the number box
    let num = parseFloat((<HTMLInputElement> document.getElementById("asciiRes")).value)
    if (num<7) {
        console.warn("THIS WILL BE SLOW \n It may not even finish \n You have been warned (well you already clicked it so this isn't really a warning)")
    }
    let ascii = asciiFromCanvas(num)
    console.log(ascii)
    let out = document.getElementById("asciiOut")
    out.innerHTML = ascii
}
