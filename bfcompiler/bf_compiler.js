function compile(code){
    let ptr = 0
    let arr = Array(20).fill(0)
    let loop = true
    let i = 0
    while(loop){
        //console.log("LOOP NA INDEXU:"+i)
        // console.log("PTR:"+ptr)

        let char = code[i];



        if (char == ">") ptr++;


        else if (char == "<") ptr--;

        
        else if (char == "+") arr[ptr]++;
        

        else if (char == "-") arr[ptr]--;

        //converts number to UTF-16 character
        else if (char == ".") {
            console.log(String.fromCharCode( arr[ptr]));
            display(String.fromCharCode( arr[ptr]))
        }

        else if (char == ","){
            let val = prompt("INSERT VALUE(at position: "+ptr+")")
            arr[ptr] = val
        }


        else if (char == "["){
            if (arr[ptr]==0){
                while(code[i] != "]"){
                    //console.log("i++, i:"+i)
                    i++
                }
            }
        }


        else if (char == "]") {
            if (arr[ptr]!=0){
                while(code[i] != "["){
                    //console.log("i--, i:"+i)
                    i--
                }
            }

        }

        if(i>=code.length){
            loop = false;
            break;
        }
        i++;
    }

   
}

function display(text){
    let outputField = document.getElementById("output");
    outputField.value += text;
}

function getCodeAndCompile(){
    let outputField = document.getElementById("output");
    outputField.value = "";

    let code = document.getElementById("code").value;
    compile(code);
}

function test(num){
    let arr = Array(5).fill(0);
    arr[-5] = 1
    console.log(arr[arr.length-1])
    return "WADA"
}
