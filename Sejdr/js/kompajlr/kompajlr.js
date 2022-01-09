function getTextAndCompile(){
    let outputField = document.getElementById("output");
    outputField.value = "";

    let codeField = document.getElementById("code");
    
    //measures compile time (in console)
    console.time('compile time')
    outputCodeAndLength(compile(codeField.value))
    console.timeEnd('compile time') 
}

//output to text field and shows length of code
function outputCodeAndLength(text){
    let outputField = document.getElementById("output");
    let lengthField = document.getElementById("codeLength");
    outputField.value = text;
    lengthField.value = text.length;
    console.log("Length of code:" + text.length)
}

//okay. I do not know what I am doing this is too much

function compile(code){
    //the final code variable
    let c = []
    let run = true;
    let line = 0
    while(run){
        let i = 0;
        if (code[i]==";") {
            
        }else{
            handleParam(code,getParam(code,line,i))
        }
        line++
    }
    return c.join("");
}

function getTrueIndex(code, line){

}

function getParam(code, line, i){

}

function handleParam(code, param){

}