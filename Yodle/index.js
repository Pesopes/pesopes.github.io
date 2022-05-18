// const greenColor = "#538d4e"
// const orangeColor = "#b59f3b" 
// const greyColor = "#3a3a3c"

const WORD_SEED = 25
const COPIED_TO_CLIPBOARD_TIME = 10000

const USE_PREDEFINED_WORDS = true
const PREDEFINED_WORDS = ["lunge","tweak","wired"]

const SETTINGS_IMPORT_INDICATOR = "My settings: "


let WORD_LENGTH = 5
let NUM_OF_GUESSES = 6
let game = {
    guessingWord: "error",
    gameNum:0,
    wordLength: WORD_LENGTH,
    numOfGuesses: NUM_OF_GUESSES,
    guesses:[""],
    win: false,
    end:false,
    screen:{
        id:"game",
        display:"block"
    },
    settings:{
        colors:{
            green:"#538d4e",
            yellow:"#b59f3b",
            grey:"#3a3a3c",
            notInList:"#422b29",
            inList:"#343b33"
        },
        titleName:"Yodle"
    }
}
//template
const emptyGame = {
    guessingWord: "error",
    gameNum:0,
    wordLength: WORD_LENGTH,
    numOfGuesses: NUM_OF_GUESSES,
    guesses:[""],
    win: false,
    end:false,
    screen:{
        id:"game",
        display:"block"
    },
    settings:{
        colors:{
            green:"#538d4e",
            yellow:"#b59f3b",
            grey:"#3a3a3c",
            notInList:"#422b29",
            inList:"#343b33"
        },
        titleName:"Yodle"
    }
}

//  Helper functions
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
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHexString(str) {
    str = str.slice(4, -1).split(", ")
    let r = parseInt(str[0])
    let g = parseInt(str[1])
    let b = parseInt(str[2])
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function gEl(id){
    return document.getElementById(id)
}

function gEls(className){
    return document.getElementsByClassName(className)
}

function loadScreen(id, display = "block"){
    gEl(game.screen.id).style.display = "none"
    gEl(id).style.display = display
    game.screen.id = id
    game.screen.display = display
}

function toggleElById(id,normal){
    if (gEl(id).style.display === "none") {
        gEl(id).style.display = normal
    }else{
        gEl(id).style.display = "none"
    }
}

//run at start
function init(){
    
    //loading game
    if(localStorage.getItem("game") != null)
    game = JSON.parse(localStorage.getItem("game"))
    
    
    //picking word
    const d = new Date()
    let todayWord = ""
    let gameNumber = d.getDate()+d.getMonth()+d.getYear() - 134
    //prioritize picking from array then random
    if (USE_PREDEFINED_WORDS &&  (gameNumber < PREDEFINED_WORDS.length)) {
        todayWord = PREDEFINED_WORDS[gameNumber]
    }else{
        todayWord = WORDS[(d.getDate()*d.getMonth()*d.getYear()*WORD_SEED)%WORDS.length]
    }
    //This actaully resets the game each day
    if(game.gameNum != gameNumber){
        resetGame()
        game.guessingWord = todayWord
        game.gameNum = gameNumber
    }
    makeBoard()
    
    updateSplashScreen()
    updateSettings()

    //if first start
    if (localStorage.getItem("firstStart") === null || localStorage.getItem("firstStart") ===false)
    {
        console.log("%cFIRST START", "color:green")
        loadScreen("start-screen", "block")
    }else{
        loadScreen("game")
    }
    localStorage.setItem("firstStart", true)

    refresh()
    //loadScreen(game.screen.id,game.screen.display)
}
function updateSplashScreen(gameNumber=game.gameNum){
    let splash = gEl("splash-text")
    splash.textContent = SPLASH_TEXTS[gameNumber]
    const colorArr = [game.settings.colors.green,"rgb(165, 165, 165)", "rgb(255, 224, 83)","rgb(128, 217, 120)",game.settings.colors.yellow]
    //splash.style.color = colorArr[Math.floor(Math.random()*colorArr.length)]
    //completely random colours
    splash.style.color = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
}

function resetSettings(){
    game.settings = emptyGame.settings
    updateSettings()
}

function updateSettings(){
    gEl("settings-screen")
    const pickers = gEls("color-picker")
    pickers[0].value = game.settings.colors.green
    pickers[1].value = game.settings.colors.yellow
    pickers[2].value = game.settings.colors.grey

    gEl("title").textContent = game.settings.titleName

    refresh(false)
}

function importSettings(val){
    if (val === "" || val === null) {
        return
    }
    let settingsImport = val.substring(val.indexOf(SETTINGS_IMPORT_INDICATOR)+SETTINGS_IMPORT_INDICATOR.length)
    game.settings = JSON.parse(settingsImport);
    updateSettings()
}

function resetGame(){
    //there has to be a better solution (maybe store settings then delete everythinh then place settings back)
    game.guesses = emptyGame.guesses
    game.guessingWord = emptyGame.guessingWord
    game.gameNum = emptyGame.gameNum
    game.win = emptyGame.win
    game.end = emptyGame.end
    game.screen = emptyGame.screen
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

function makeEmojiBoard(obj, html = false, tooMuchInfo = false){
    
    let breakSymbol = "\n"
    if (html) {
        breakSymbol = "<br>"
    }
    const d = new Date()
    let gameName = game.settings.titleName
    let result = `${gameName} ${d.getDate()+d.getMonth()+d.getYear() - 133} ${game.win? obj.guesses.length-1 : "x"}/${obj.numOfGuesses}`
    result += breakSymbol
    if (html) 
    result += "<a href='https://pesopes.github.io/Yodle/' style='color:white'>pesopes.github.io/Yodle</a>"
    else
    result += "pesopes.github.io/Yodle/"
    result += breakSymbol
    if (tooMuchInfo) {
        result += SETTINGS_IMPORT_INDICATOR
        result += JSON.stringify(game.settings)
        return result
    }
    for (let guessIndex = 0; guessIndex < obj.guesses.length-1; guessIndex++) {
        let currentRow = gEls("row")[guessIndex]
        for (let i = 0; i < obj.wordLength; i++) {
            let currentBox = currentRow.children[i]
            let currentColour = rgbToHexString(currentBox.style.backgroundColor)
            if (currentColour === game.settings.colors.green) {
                result += "🟩"
            }else if(currentColour === game.settings.colors.yellow){
                result += "🟨"
            }else if(currentColour === game.settings.colors.grey){
                result += "⬛"
            }
        }
        result += breakSymbol   
    }
    return result
}
//TODO: make general copy func
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
    let originalText = caller.textContent
    setTimeout(() => {
        caller.textContent = originalText
    }, COPIED_TO_CLIPBOARD_TIME);
    caller.textContent = "Copied to clipboard"
    caller.style.backgroundColor = "rgb(37, 37, 37)"
}
function copySettings(caller){
    //sharing (not supported everywhere)
    if (navigator.share) {
        navigator.share({
            text: makeEmojiBoard(game,false,true)
        }).then(() => {
            console.log('Succesful share');
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
        console.log('Sharing not supported :(');
    }
    //always copy to clipboard
    navigator.clipboard.writeText(makeEmojiBoard(game,false,true));

    //display confirm message for some time and change bacground
    let originalText = caller.textContent
    setTimeout(() => {
        caller.textContent = originalText
    }, COPIED_TO_CLIPBOARD_TIME);
    caller.textContent = "Copied to clipboard"
    caller.style.backgroundColor = "rgb(37, 37, 37)"
}
//Main function for game VERY MESSY i am scared to change it -_-
//also i intended to make this general for any _obj_ but then forgot and its a mess
function handleWordleObject(obj, showEndScreen = true){
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
                let letterColour = game.settings.colors.grey
                if (obj.guessingWord[i] === letter) {
                    guessingWordCopy = guessingWordCopy.replaceAt(i,"#")
                    letterColour = game.settings.colors.green
                }else if (obj.guessingWord.includes(letter)) {
                    letterColour = game.settings.colors.yellow
                }
                //little hacky solution but i dont care
                if (guessIndex == obj.guesses.length-2 && obj.guesses[guessIndex +1] === "ENTER") {
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
                let letterColour = game.settings.colors.grey
                if (guessingWordCopy.includes(letter)) {
                    letterColour = game.settings.colors.yellow
                    guessingWordCopy = guessingWordCopy.replaceAt(guessingWordCopy.indexOf(letter),'#')
                }
                //little hacky solution but i dont care
                if (guessIndex == obj.guesses.length-2 && obj.guesses[guessIndex +1] === "ENTER") {
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
        //animation now doesnt play when hitting backspace
        if(obj.guesses[guessIndex +1] === "ENTER"){
            obj.guesses[guessIndex +1] = ""
        }
        currentNumGuess++
    }
    shadeLastWord()
    if(showEndScreen)
        handleEnd()
    localStorage.setItem("game", JSON.stringify(game))
}
function shadeLastWord(){
    if(game.guesses[game.guesses.length-1].length === game.wordLength){
        let finalColor
        if (wordExists(game.guesses[game.guesses.length-1])) {
            finalColor = game.settings.colors.inList
        }else{
            finalColor = game.settings.colors.notInList
        }
        for(const elem of gEls("row")[game.guesses.length-1].children){
            elem.style.backgroundColor = finalColor
        }
    }
}
function handleEnd(animSpeed = 1300){
    // WIN
    if (game.win){
        game.end = true
        setTimeout(()=> {
            gEl("win-screen-result").innerHTML = makeEmojiBoard(game, true)
            loadScreen("win-screen","block")
        }, animSpeed)
        
        //alert("You won but I won (read in russian accent)")
    }// LOSS
    else if(game.guesses.length > game.numOfGuesses){ //LOSS
        game.end = true
        setTimeout(()=> {
            gEl("loss-screen-result").innerHTML = makeEmojiBoard(game, true)
            gEl("loss-screen-answer").innerHTML = game.guessingWord
            loadScreen("loss-screen", "block")
        }, animSpeed)
        
        // alert("Loss")
    }
}
function shadeKeyBoard(letter, color) {
    for (const elem of gEls("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === game.settings.colors.green) {
                return
            } 

            if (oldColor === game.settings.colors.yellow && color !== game.settings.colors.green) {
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

function refresh(showEndScreen = true){
    clearBoard()
    handleWordleObject(game,showEndScreen)
}

document.addEventListener( "keyup", (e)=>{
    MyKeyboardEvent(e)
})
//mobile
document.addEventListener( "input", (e)=>{
    if(game.end)
        return
    let k = e.key
    if (k === undefined) 
        return
    
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
    if(game.screen.id != "game")
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
    if (game.end) 
        return
    refresh()
}

function enterWord(){
    
    if(game.guesses[game.guesses.length-1].length >= game.wordLength && !game.end)
    {
        //if word exists
        if(wordExists(game.guesses[game.guesses.length-1]))
            game.guesses[game.guesses.length] = "ENTER"
    }else if(game.end){
        handleEnd(0)
    }
}

function removeCurrentWord(){
    game.guesses[game.guesses.length-1] = ""
}

function removeLastLetter(){
    game.guesses[game.guesses.length-1] = game.guesses[game.guesses.length-1].slice(0, -1)
}

function addLetter(letter){
    if (game.end) 
        return
    let index = game.guesses.length-1
    if (game.guesses[index].length < game.wordLength) {
        game.guesses[index] += letter
    }
}
//TODO: make general for any length (so download more words i guess)
function wordExists(word){
    return WORDS.includes(word)
}

//at start
init()