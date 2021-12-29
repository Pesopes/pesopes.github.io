let maxNumOfIterations = 1000000;
function compile2(code){
    let iterationCounter = 0;
    let ptr = 0
    let arr = Array(1000).fill(0)
    let loop = true
    let i = 0
    let mem = 0
    while(loop){
        iterationCounter++;
        //console.log("LOOP NA INDEXU:"+i)
        // console.log("PTR:"+ptr)

        let char = code[i];



        if (char == ">") ptr++;


        else if (char == "<") ptr--;

        
        else if (char == "+") arr[ptr]++;
        

        else if (char == "-") arr[ptr]--;

        else if (char == "*") mem = arr[ptr]*arr[ptr];

        else if (char == "&") mem = arr[ptr]+arr[ptr-1];

        else if (char == "¤") mem = Math.max(arr[ptr],arr[ptr-1]);

        else if (char == "?") mem = Math.round(Math.random());

        else if (char == "@") mem = ptr;

        else if (char == "|") mem = arr[ptr];

        else if (char == "^") arr[ptr] = mem;

        else if (char == ";") printBoth(mem);

        else if (char == "~") mem = Math.abs(arr[ptr]);


        //factorial of number
        else if (char == "!") mem = factorial(arr[ptr]);
        
        //makes space
        else if (char == "_") {
            console.log(" ");
            display2(" ")
        }

        //doesnt convert
        else if (char == "$") printBoth(String(arr[ptr]));


        //converts number to UTF-16 character
        else if (char == ".") printBoth(String.fromCharCode( arr[ptr]));

        else if (char == ","){
            let val = prompt("INSERT VALUE(at position: "+ptr+")")
            arr[ptr] = val
        }


        else if (char == "["){
            if (arr[ptr]==0){
                let sameCounter = 1;
                let differentCounter = 0;
                i++;
                while(true){
                    //console.log("same:"+sameCounter+"diff:"+differentCounter)
                    if(code[i]=="[")
                        sameCounter++;
                    else if(code[i]=="]")
                        differentCounter++;
                    if(sameCounter == differentCounter)
                        break;
                    i++
                    
                }
            }
        }


        else if (char == "]") {
            if (arr[ptr]!=0){
                let sameCounter = 1;
                let differentCounter = 0;
                i--
                while(true){
                    //console.log("same:"+sameCounter+"diff:"+differentCounter)
                    if(code[i]=="]")
                        sameCounter++;
                    else if(code[i]=="[")
                        differentCounter++;
                    if(sameCounter == differentCounter)
                        break;
                    i--
                }
            }

        }

        if(i>=code.length){
            loop = false;
            break;
        }
        if(iterationCounter>maxNumOfIterations){
            console.error("Shutting down (too many iterations)")
            loop = false;
            break;
        }
        i++;
    }

   
}

//used for output (outputs to text field and console logs)
function printBoth(text){
    //console.log(text);
    display2(text);
}

//output to text field
function display2(text){
    let outputField = document.getElementById("output");
    outputField.value += text;
}

//when clicking compile button -> gets code from textbox -> runs the code
function getCodeAndCompile2(){
    let outputField = document.getElementById("output");
    outputField.value = "";

    let code = document.getElementById("code").value;
    compile2(code);
    
}


//change values, display confirmation message
function changeSettings2(){
    console.log("Changing settings")
    let maxIt = document.getElementById("maxIterations");
    maxNumOfIterations = maxIt.value;
    document.getElementById("confirmMsg").innerHTML = "Changed settings"
    setTimeout(hideSettingsMessage2,3000)
}

//gets triggered by changeSettings after time
function hideSettingsMessage2(){
    document.getElementById("confirmMsg").innerHTML = ""
}

//does not work 
function highlighter2(){
    let code = document.getElementById("code").value;
    code+="BRUH"
    document.getElementById("code").value = code;
}

//just calculates factorial 
function factorial(num){
    let ans = 1;
    for(i=0;i<num;i++){
        ans *= num-i;
    }
    return ans
}

//just random testing (not used)
function test2(num){
    let arr = Array(5).fill(0);
    arr[-5] = 1
    console.log(arr[arr.length-1])
    return "WADA"
}


//the road to the most optimized text to code funtion
function textToCode(text){
    let finalCode = "";
    for(i=0;i<text.length;i++){
        
        for(p=0;p<text.charCodeAt(i);p++){
            finalCode += "+";
        }
        finalCode += "."
        finalCode += ">"
    }
    return finalCode
}

function textToCodeOptimized(text){
    let finalCode = "";
    for(let i=0;i<text.length;i++){
        const plus = "+";
        let utf = text.charCodeAt(i);
        let closeNum = Math.floor(Math.sqrt(utf));

        finalCode += plus.repeat(closeNum);
        finalCode += "*";
        finalCode += "^";
        finalCode += plus.repeat(utf - (closeNum*closeNum));

        finalCode += "."
        finalCode += ">"
    }
    return finalCode
}

//even more optimized
function textToCodeOptimized2(text, activateTreshold = 20){
    let finalCode = "";
    for(let i=0;i<text.length;i++){
        const plus = "+";
        const minus = "-";


        let utf = text.charCodeAt(i);
        let prevUtf = text.charCodeAt(i-1);
        //the closest number to square
        let closeNum = Math.floor(Math.sqrt(utf));

        //this uses the values before it so it is maybe shorter
        if (i > 0 && (Math.abs(utf-prevUtf)<activateTreshold)){
            finalCode += "<";
            if(utf > prevUtf)
                finalCode += plus.repeat(utf-prevUtf);
            else if (utf < prevUtf) 
                finalCode += minus.repeat(prevUtf - utf);

        }else{
            finalCode += plus.repeat(closeNum);
            finalCode += "*";
            finalCode += "^";
            finalCode += plus.repeat(utf - (closeNum*closeNum));
        }

        finalCode += "."
        finalCode += ">"
    }
    return finalCode
}

function textToCodeOptimized3(text){
    return textToCodeOptimized2(text,tresholdTester(text,0,100)[1])
}

function tresholdTester(text,min,max){
    let lengths = [0,0]
    for(let i=min;i<max;i++){
        let len = textToCodeOptimized2(text,i).length;
        if(len<lengths[0]||i==min){
            
            lengths[0] = len
            lengths[1] = i
        }

    }
    return lengths
}