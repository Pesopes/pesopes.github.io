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
        else if (char == "!") arr[ptr] = factorial(arr[ptr]);
        
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

//gets triggered by change settings after time
function hideSettingsMessage2(){
    document.getElementById("confirmMsg").innerHTML = ""
}

//does not work 
function highlighter2(){
    let code = document.getElementById("code").value;
    code+="BRUH"
    document.getElementById("code").value = code;
}

//just calculates factiorial 
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