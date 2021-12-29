function getTextAndConvert(method){
    let outputField = document.getElementById("output");
    outputField.value = "";

    let code = document.getElementById("code").value;
    convert(code, method);
    
}

function convert(text , method){
    let code = "";
    switch(method){
        case 1:
            code = textToCode(text)
        break;
        case 2:
            code = textToCodeOptimized(text)
        break;
        case 3:
            code = textToCodeOptimized2(text)
        break;
        case 4:
            code = textToCodeOptimized3(text)
        break;
    }
    outputCodeAndLength(code)
}



//output to text field and shows length of code
function outputCodeAndLength(text){
    let outputField = document.getElementById("output");
    let lengthField = document.getElementById("codeLength");
    outputField.value = text;
    lengthField.value = text.length;
    console.log(text.length)
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




//  the road to the most optimized text to code funtion
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

//even more optimized, treshold is predefined
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