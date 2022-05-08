const orangeColor = "rgb(181, 159, 59)"
const greenColor = "rgb(83, 141, 78)"
const greyColor = "rgb(58, 58, 60)"


let WORD_LENGTH = 5
let NUM_OF_GUESSES = 6
let game = {
    guessingWord: "ondra",
    wordLength: WORD_LENGTH,
    numOfGuesses: NUM_OF_GUESSES,
    guesses:[""],
    win: false,
    end:false
}

const emptyGame = {
    guessingWord: "nulls",
    wordLength: WORD_LENGTH,
    numOfGuesses: NUM_OF_GUESSES,
    guesses:[""],
    win: false,
    end:false
}
function gEl(id){
    return document.getElementById(id)
}

function gEls(className){
    return document.getElementsByClassName(className)
}

//run at start
function init(){
    //if first start
    if (localStorage.getItem("firstStart") === null)
    {
        console.log("FIRST START")
        toggleGame()
        toggleElById("start-screen", "block")
    }
    localStorage.setItem("firstStart", true)
    
    //loading game
    if(localStorage.getItem("game") != null)
        game = JSON.parse(localStorage.getItem("game"))

    
    //picking word
    const d = new Date()
    const todayWord = WORDS[(d.getDate()*d.getMonth()*d.getYear())%WORDS.length]
    if(game.guessingWord != todayWord){
        game = emptyGame
        game.guessingWord = todayWord
    }
    
    makeBoard()
    refresh()
    
}

function makeBoard(){
    let board = gEl("board")
    clearBoard()

    for (let i = 0; i < NUM_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "row"
        for (let j = 0; j < WORD_LENGTH; j++) {
            let box = document.createElement("div")
            box.className = "box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}
function toggleGame() {
    toggleElById("board", "flex")
    toggleElById("keyboard-cont", "flex")
}


function toggleElById(id,normal){
    if (gEl(id).style.display === "none") {
        gEl(id).style.display = normal
    }else{
        gEl(id).style.display = "none"
    }
}

function makeEmojiBoard(obj, html = false){
    let breakSymbol = "\n"
    if (html) {
        breakSymbol = "<br>"
    }
    const d = new Date()
    let result = `Yodle ${d.getDate()+d.getMonth()+d.getYear() - 133} ${game.guesses.length-1}/${game.numOfGuesses}`
    result += breakSymbol
    result += breakSymbol
    
    for (let guessIndex = 0; guessIndex < obj.guesses.length; guessIndex++) {
        const word = obj.guesses[guessIndex];
        
        for (let i = 0; i < word.length; i++) {
            const letter = word[i]

            if (obj.guessingWord[i] === letter) {
                result += "🟩"
            }else if (obj.guessingWord.includes(letter)) {
                result += "🟨"

            }else{
                result += "⬛"
            }
        }
        	result += breakSymbol
    }
    return result
}

function copyGame(){
    if (navigator.share) {
        navigator.share({
            text: "makeEmojiBoard(game)"
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
        console.log('Sharing not supported :(');
    }
    navigator.clipboard.writeText(makeEmojiBoard(game));
}

function handleWordleObject(obj){
    let currentNumGuess = 0

    for (let guessIndex = 0; guessIndex < obj.guesses.length; guessIndex++) {
        const word = obj.guesses[guessIndex];
        
        for (let i = 0; i < word.length; i++) {
            const letter = word[i]
            let currentRow = gEls("row")[currentNumGuess]
            let currentBox = currentRow.children[i]

            //if not last word
            if (guessIndex < obj.guesses.length-1) {
                if (obj.guessingWord[i] === letter) {
                    currentBox.style.backgroundColor = greenColor
                    shadeKeyBoard(letter,greenColor)
                }else if (obj.guessingWord.includes(letter)) {
                    currentBox.style.backgroundColor = orangeColor
                    shadeKeyBoard(letter,orangeColor)
                }else{
                    currentBox.style.backgroundColor = greyColor
                    shadeKeyBoard(letter,greyColor)
                }

                //Win condition
                if (word === obj.guessingWord) {
                    game.win = true
                    
                }
            }
            currentBox.textContent = letter
            
        }
        currentNumGuess++
    }
    //WIN
    if (game.win){
        game.end = true
        toggleGame();
        gEl("win-screen-result").innerHTML = makeEmojiBoard(game, true)
        toggleElById("win-screen", "block")
        //alert("You won but I won (read in russian accent)")
    }else if(game.guesses.length > game.numOfGuesses){ //LOSS
        game.end = true
        toggleGame();
        gEl("loss-screen-result").innerHTML = makeEmojiBoard(game, true)
        toggleElById("loss-screen", "block")
        // alert("Loss")
    }
    localStorage.setItem("game", JSON.stringify(game))
}
function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === greenColor) {
                return
            } 

            if (oldColor === orangeColor && color !== greenColor) {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function clearBoard(){
    let rows = gEls("row")
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].children.length; j++) {
            rows[i].children[j].textContent = ""
            rows[i].children[j].style.backgroundColor = "transparent"
        }
    }
}

function refresh(){
    clearBoard()
    handleWordleObject(game)
}

document.addEventListener( "keyup", (e)=>{
    if(game.win)
        return
    let k = e.key
    if(k == "Enter"){
        enterWord()
    }else if(k == "Backspace" && e.ctrlKey){
        removeCurrentWord()
    }else if(k == "Backspace"){
        removeLastLetter()
    }else{
        let found = k.match(/[a-z]/gi)
        if (!found || found.length > 1)
            return
        addLetter(found)
    }
    refresh()
})
//mobile
document.addEventListener( "input", (e)=>{
    if(game.win)
        return
    let k = e.key
    if(k == "Enter"){
        enterWord()
    }else if(k == "Backspace" && e.ctrlKey){
        removeCurrentWord()
    }else if(k == "Backspace"){
        removeLastLetter()
    }else{
        let found = k.match(/[a-z]/gi)
        if (!found || found.length > 1)
            return
        addLetter(found)
    }
    refresh()
})
gEl("keyboard-cont").addEventListener("click", (e)=>{
    const target = e.target
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent
    // if (key === "Del") {
    //     key = "Backspace"
    // } 
    if (e.originalTarget.id === "back-button") {
        key = "Backspace"   
    }

    //because mobile -_-
    //document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
    document.dispatchEvent(new KeyboardEvent("input", {'key': key}))
})

function enterWord(){
    //if word exists
    if(game.guesses[game.guesses.length-1].length >= game.wordLength)
    {
        if(WORDS.includes(game.guesses[game.guesses.length-1]))
            game.guesses[game.guesses.length] = ""
    }
}

function removeCurrentWord(){
    game.guesses[game.guesses.length-1] = ""
}

function removeLastLetter(){
    game.guesses[game.guesses.length-1] = game.guesses[game.guesses.length-1].slice(0, -1)
}

function addLetter(letter){
    let index = game.guesses.length-1
    if (game.guesses[index].length < game.wordLength) {
        game.guesses[index] += letter
    }
}

init()