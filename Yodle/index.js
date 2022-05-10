const orangeColor = "rgb(181, 159, 59)"
const greenColor = "rgb(83, 141, 78)"
const greyColor = "rgb(58, 58, 60)"

const WORD_SEED = 25
const COPIED_TO_CLIPBOARD_TIME = 10000

const USE_PREDEFINED_WORDS = true
const PREDEFINED_WORDS = ["lunge","tweak","wired","vapor","decal","fight","crane","nasty","xored"]

let WORD_LENGTH = 5
let NUM_OF_GUESSES = 6
let game = {
    guessingWord: "error",
    wordLength: WORD_LENGTH,
    numOfGuesses: NUM_OF_GUESSES,
    guesses:[""],
    win: false,
    end:false
}

const emptyGame = {
    guessingWord: "error",
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

String.prototype.includesNum = function(char){
    let count = 0
    for (let i = 0; i < this.length; i++) {
        if(char === this[i])
            count++
    }
    return count
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
//run at start
function init(){
    //if first start
    if (localStorage.getItem("firstStart") === null || localStorage.getItem("firstStart") ===false)
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
    let todayWord = ""
    if (USE_PREDEFINED_WORDS && d.getDate()+d.getMonth()+d.getYear() - 134 <= PREDEFINED_WORDS.length) {
        todayWord = PREDEFINED_WORDS[d.getDate()+d.getMonth()+d.getYear() - 134]
    }else{
        todayWord = WORDS[(d.getDate()*d.getMonth()*d.getYear()*WORD_SEED)%WORDS.length]
    }
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
    let result = `Yodle ${d.getDate()+d.getMonth()+d.getYear() - 133} ${game.win? obj.guesses.length-1 : "x"}/${obj.numOfGuesses}`
    result += breakSymbol
    if (html) 
        result += "<a href='https://pesopes.github.io/Yodle/' style='color:white'>pesopes.github.io</a>"
    else
        result += "pesopes.github.io/Yodle/"
    result += breakSymbol
    for (let guessIndex = 0; guessIndex < obj.guesses.length-1; guessIndex++) {
        let currentRow = gEls("row")[guessIndex]
        for (let i = 0; i < obj.wordLength; i++) {
            let currentBox = currentRow.children[i]
            let currentColour = currentBox.style.backgroundColor
            if (currentColour === greenColor) {
                result += "🟩"
            }else if(currentColour === orangeColor){
                result += "🟨"
            }else if(currentColour === greyColor){
                result += "⬛"
            }
        }
        result += breakSymbol   
    }
    return result
}
function copyGame(caller){
    //sharing (not supported everywhere)
    if (navigator.share) {
        navigator.share({
            text: makeEmojiBoard(game)
        }).then(() => {
            console.log('Succesful share');
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
        console.log('Sharing not supported :(');
    }
    //always copy to clipboard
    navigator.clipboard.writeText(makeEmojiBoard(game));

    //display confirm message for some time and change bacground
    let originalText = caller.innerHTML
    setTimeout(() => {
        caller.innerHTML = originalText
    }, COPIED_TO_CLIPBOARD_TIME);
    caller.innerHTML = "Copied to clipboard"
    caller.style.backgroundColor = "rgb(37, 37, 37)"
}

//Main functin for game
function handleWordleObject(obj){
    let currentNumGuess = 0

    //loop trough guesses
    for (let guessIndex = 0; guessIndex < obj.guesses.length; guessIndex++) {
        const word = obj.guesses[guessIndex];
        //loop trough letters
        let guessingWordCopy = obj.guessingWord
        for (let i = 0; i < word.length; i++) {
            const letter = word[i]
            let currentRow = gEls("row")[currentNumGuess]
            let currentBox = currentRow.children[i]
            
            //if not last word (the one you are writing)
            if (guessIndex < obj.guesses.length-1) {
                //shading letters
                let letterColour = greyColor
                if (obj.guessingWord[i] === letter) {
                    guessingWordCopy = guessingWordCopy.replaceAt(i,"#")
                    letterColour = greenColor
                }else if (obj.guessingWord.includes(letter)) {
                    letterColour = orangeColor
                }
                //little hacky solution but i dont care (triggers even if you delete your current word)
                if (guessIndex == obj.guesses.length-2 && obj.guesses[guessIndex +1] === "") {
                    let delay = 250 * i
                    setTimeout(()=> {
                        //shade box
                        currentBox.style.backgroundColor = letterColour
                        shadeKeyBoard(letter, letterColour)
                    }, delay)
                }else{
                    currentBox.style.backgroundColor = letterColour
                    shadeKeyBoard(letter, letterColour)
                }
                //Win condition
                if (word === obj.guessingWord) {
                    game.win = true
                }
            }
            currentBox.textContent = letter
            
        }
        for (let i = 0; i < word.length; i++) {
            if (guessingWordCopy[i] === "#") {
                continue
            }
            const letter = word[i]
            let currentRow = gEls("row")[currentNumGuess]
            let currentBox = currentRow.children[i]
            
            //if not last word (the one you are writing)
            if (guessIndex < obj.guesses.length-1) {
                //shading letters
                let letterColour = greyColor
                if (guessingWordCopy.includes(letter)) {
                    letterColour = orangeColor
                    guessingWordCopy = guessingWordCopy.replaceAt(guessingWordCopy.indexOf(letter),'#')
                }
                //little hacky solution but i dont care (triggers even if you delete your current word)
                if (guessIndex == obj.guesses.length-2 && obj.guesses[guessIndex +1] === "") {
                    let delay = 250 * i
                    setTimeout(()=> {
                        //shade box
                        currentBox.style.backgroundColor = letterColour
                        shadeKeyBoard(letter, letterColour)
                    }, delay)
                }else{
                    currentBox.style.backgroundColor = letterColour
                    shadeKeyBoard(letter, letterColour)
                }
            }
            currentBox.textContent = letter
            
        }
        currentNumGuess++
    }
    //WIN
    if (game.win){
        game.end = true
        setTimeout(()=> {
            toggleGame();
            gEl("win-screen-result").innerHTML = makeEmojiBoard(game, true)
            toggleElById("win-screen", "block")
        }, 1300)
        
        //alert("You won but I won (read in russian accent)")
    }else if(game.guesses.length > game.numOfGuesses){ //LOSS
        game.end = true
        setTimeout(()=> {
            toggleGame();
            gEl("loss-screen-result").innerHTML = makeEmojiBoard(game, true)
            gEl("loss-screen-answer").innerHTML = obj.guessingWord
            toggleElById("loss-screen", "block")
        }, 1300)
        
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
    if(game.end)
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
    if (target.id === "back-button") {
        key = "Backspace"   
    }

    //because mobile -_-
    //document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
    //document.dispatchEvent(new KeyboardEvent("input", {'key': key}))
    MyKeyboardEvent(e={'key':key})
})




function MyKeyboardEvent(e){
    if(game.end)
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
}

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