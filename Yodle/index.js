// By pesopes, adapted from Wordle by Josh Wardle
//  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. 
//  | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |
//  | |  ____  ____  | || |     ____     | || |  ________    | || |   _____      | || |  _________   | |
//  | | |_  _||_  _| | || |   .'    `.   | || | |_   ___ `.  | || |  |_   _|     | || | |_   ___  |  | |
//  | |   \ \  / /   | || |  /  .--.  \  | || |   | |   `. \ | || |    | |       | || |   | |_  \_|  | |
//  | |    \ \/ /    | || |  | |    | |  | || |   | |    | | | || |    | |   _   | || |   |  _|  _   | |
//  | |    _|  |_    | || |  \  `--'  /  | || |  _| |___.' / | || |   _| |__/ |  | || |  _| |___/ |  | |
//  | |   |______|   | || |   `.____.'   | || | |________.'  | || |  |________|  | || | |_________|  | |
//  | |              | || |              | || |              | || |              | || |              | |
//  | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |
//   '----------------'  '----------------'  '----------------'  '----------------'  '----------------' 

const WORD_SEED = 25
const COPIED_TO_CLIPBOARD_TIME = 10000

const SETTINGS_IMPORT_INDICATOR = "My settings: "

const CURATED_WORDS = Object.keys(JSON.parse(CURATED_WORDS_JSON))

const KEY_HOLD_DELAY = 700
const KEY_HOLD_INTERVAL = 130

let greenSymbol = "🟩"
let yellowSymbol = "🟨"
let greySymbol = "⬛"

//template
const emptyGame = {
    guessingWord: "error",
    gameNum:0,
    wordLength: 5,
    numOfGuesses: 6,
    gameMode: "normal",
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
            background:"#1b1b1b",
            notInList:"#422b29",
            inList:"#343b33"
        },
        titleName:"Yodle",
        displaySplash:true
    }
}

let game = copyObject(emptyGame)
//does this work the same?
//let game = {...emptyGame}


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

// kinda dumb but im lazy to make a function for this 
// (oh this is so it isnt by reference)
function copyObject(obj){
    return JSON.parse(JSON.stringify(obj))
}

// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;

//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);

//     var dataURL = canvas.toDataURL("image/png");

//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

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

function setVisibility(id,visible,normal = "block"){
    if (visible) {
        gEl(id).style.display = normal
    }else{
        gEl(id).style.display = "none"
    }
}


function getTodayWord(gameNumber){
    const d = new Date()
    return CURATED_WORDS[(d.getDate()*d.getMonth()*d.getYear()*WORD_SEED)%CURATED_WORDS.length]
}

function presetEasterEggs(gameNumber = game.gameNum){
    if (gameNumber === 18) {
        for (let i = 0; i < gEls("box").length; i++) {
            const el = gEls("box")[i]
            el.style.color = "green"
            el.style.animation = "spin3d 20.6s infinite reverse"
        }
    }else if (gameNumber === 26) {
        for (let i = 0; i < gEls("box").length; i++) {
            const el = gEls("box")[i]
            el.style.borderRadius = "100px"
        }
        for (let i = 0; i < gEls("keyboard-button").length; i++) {
            const el = gEls("keyboard-button")[i]
            el.style.borderRadius = "100px"
        }
    }else if (gameNumber === 28){
        for (let i = 0; i < gEls("box").length; i++) {
            const el = gEls("box")[i]
            el.style.borderRadius = "100px"
        }
        for (let i = 0; i < gEls("keyboard-button").length; i++) {
            const el = gEls("keyboard-button")[i]
            el.style.borderRadius = "100px"
        }
        greenSymbol = "🟢"
        yellowSymbol = "🟡"
        greySymbol = "⚫"
    }else if (gameNumber === 30){
        for (let i = 0; i < gEls("keyboard-button").length; i++) {
            const el = gEls("keyboard-button")[i]
            el.style.cursor = "wait"
            el.style.transform = "rotate(180deg)"
        }
    }else if (gameNumber === 35){
        gEl("splash-text").style.animation = "splashText 0.3s infinite cubic-bezier(0.445, 0.05, 0.55, 0.95)"
    }
}

//run at start
function init(){
    
    //loading game
    if(localStorage.getItem("game") != null)
    game = JSON.parse(localStorage.getItem("game"))
    
    
    //picking word
    //const d = new Date()
    // let gameNumber = d.getDate()+d.getMonth()+d.getYear() - 134 I am leaving this here so I learn from my mistakes
    let gameNumber = Math.floor(Date.now()/1000/60/60/24) - 19119
    let todayWord = getTodayWord(gameNumber)
    //This actaully resets the game each day
    if(game.gameNum != gameNumber){
        resetGame()
        game.guessingWord = todayWord
        game.gameNum = gameNumber
    }
    if (game.gameMode !== "normal") {
        resetGame()
        game.gameMode = "normal"
    }
    makeBoard()
    
    updateSplashScreen()
    presetEasterEggs()
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
    const splash = gEl("splash-text")
    splash.textContent = SPLASH_TEXTS[gameNumber]
    const colorArr = [game.settings.colors.green,"rgb(165, 165, 165)", "rgb(255, 224, 83)","rgb(128, 217, 120)",game.settings.colors.yellow]
    //splash.style.color = colorArr[Math.floor(Math.random()*colorArr.length)]
    //completely random colours
    splash.style.color = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
}

function resetSettings(){
    game.settings = copyObject(emptyGame.settings)
    updateSettings()
}

function updateSettings(){
    const pickers = gEls("color-picker")
    pickers[0].value = game.settings.colors.green
    pickers[1].value = game.settings.colors.yellow
    pickers[2].value = game.settings.colors.grey
    pickers[3].value = game.settings.colors.background

    gEl("title").textContent = game.settings.titleName

    document.getElementsByTagName("body")[0].style.backgroundColor = game.settings.colors.background
    setVisibility("splash-text",game.settings.displaySplash)

    gEl("displaySplash").checked = game.settings.displaySplash
    gEl("title-name").value = game.settings.titleName

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
    const temp = copyObject(emptyGame)
    game.numOfGuesses = temp.numOfGuesses
    game.wordLength = temp.wordLength
    game.guesses = temp.guesses
    game.guessingWord = temp.guessingWord
    game.gameNum = temp.gameNum
    game.win = temp.win
    game.end = temp.end
    game.screen = temp.screen
}

function makeBoard(){
    const board = gEl("board")
    // will delete first
    board.innerHTML = ""
    clearBoard()

    for (let i = 0; i < game.numOfGuesses; i++) {
        let row = document.createElement("div");
        row.className = "row"
        for (let j = 0; j < game.wordLength; j++) {
            let box = document.createElement("div")
            box.className = "box"
            row.appendChild(box)
        }
        board.appendChild(row)
    }
}

function startOneGuessMode(numberOfGuesses, numberOfWords){
    // the game would just instantly end
    if (numberOfGuesses <= numberOfWords)
        return
    if (isNaN(parseInt(numberOfGuesses)) || isNaN(parseInt(numberOfWords)))
        return
    resetGame()
    game.gameMode = "one guess"
    game.numOfGuesses = numberOfGuesses
    game.guesses = getRandomWords(numberOfWords,5)
    game.guesses.push("")

    game.guessingWord = getRandomWords(1,5)[0]
    loadScreen("game")
    makeBoard()
    refresh()
}
function makeEmojiBoard(html = false, tooMuchInfo = false){
    // for One guess game mode
    if (game.gameMode === "one guess") {
        greenSymbol = "🟥"
        yellowSymbol = "🟧"
        greySymbol = "⬛"
    }
    // for web or for share
    let breakSymbol = "\n"
    if (html) {
        breakSymbol = "<br>"
    }
    // vars
    const d = new Date()
    let gameName = game.settings.titleName
    let showGameMode = false
    if (game.gameMode !== "normal")
        showGameMode = true

    // start
    let result = `${gameName}${showGameMode? "("+game.gameMode+")" : ""} ${showGameMode?"":game.gameNum} ${game.win? game.guesses.length-1 : "x"}/${game.numOfGuesses}`
    result += breakSymbol
    // html link or url
    if (html) 
        result += "<a href='https://pesopes.github.io/Yodle/' style='color:white'>pesopes.github.io/Yodle</a>"
    else
        result += "pesopes.github.io/Yodle/"
    
    result += breakSymbol
    // adding squares
    if (tooMuchInfo) {
        result += SETTINGS_IMPORT_INDICATOR
        result += JSON.stringify(game.settings)
        return result
    }
    for (let guessIndex = 0; guessIndex < game.guesses.length-1; guessIndex++) {
        let currentRow = gEls("row")[guessIndex]
        for (let i = 0; i < game.wordLength; i++) {
            let currentBox = currentRow.children[i]
            let currentColour = rgbToHexString(currentBox.style.backgroundColor)
            if (currentColour === game.settings.colors.green) {
                result += greenSymbol
            }else if(currentColour === game.settings.colors.yellow){
                result += yellowSymbol
            }else if(currentColour === game.settings.colors.grey){
                result += greySymbol
            }
        }
        result += breakSymbol   
    }
    return result
}
//TODO: make general copy func
function copyGame(caller){
    let emojiBoard = makeEmojiBoard()
    //sharing (not supported everywhere)
    if (navigator.share) {
        navigator.share({
            text: emojiBoard
        }).then(() => {
            console.log('Succesful share');
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
        console.log('Sharing not supported :(');
    }
    //always copy to clipboard
    navigator.clipboard.writeText(emojiBoard);

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
            text: makeEmojiBoard(false,true)
        }).then(() => {
            console.log('Succesful share');
        })
        .catch((error) => console.error("Error sharing", error));
    } else {
        console.log('Sharing not supported :(');
    }
    //always copy to clipboard
    navigator.clipboard.writeText(makeEmojiBoard(false,true));

    //display confirm message for some time and change bacground
    let originalText = caller.textContent
    setTimeout(() => {
        caller.textContent = originalText
    }, COPIED_TO_CLIPBOARD_TIME);
    caller.textContent = "Copied to clipboard"
    caller.style.backgroundColor = "rgb(37, 37, 37)"
}
//Main function for game VERY MESSY i am scared to change it -_-
function handleWordleObject(showEndScreen = true){
    let currentNumGuess = 0
    //loop trough guesses
    for (let guessIndex = 0; guessIndex < game.guesses.length; guessIndex++) {
        const word = game.guesses[guessIndex];
        //loop trough letters
        let guessingWordCopy = game.guessingWord
        for (let i = 0; i < word.length; i++) {
            const letter = word[i]
            let currentRow = gEls("row")[currentNumGuess]
            let currentBox = currentRow.children[i]
            
            //if not last word (the one you are writing)
            if (guessIndex < game.guesses.length-1) {
                //add class
                currentBox.classList.add("filled-box")
                //shading letters
                let letterColour = game.settings.colors.grey
                if (game.guessingWord[i] === letter) {
                    guessingWordCopy = guessingWordCopy.replaceAt(i,"#")
                    letterColour = game.settings.colors.green
                }else if (game.guessingWord.includes(letter)) {
                    letterColour = game.settings.colors.yellow
                }
                //little hacky solution but i dont care
                if (guessIndex == game.guesses.length-2 && game.guesses[guessIndex +1] === "ENTER") {
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
                if (word === game.guessingWord) {
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
            if (guessIndex < game.guesses.length-1) {
                //shading letters
                let letterColour = game.settings.colors.grey
                if (guessingWordCopy.includes(letter)) {
                    letterColour = game.settings.colors.yellow
                    guessingWordCopy = guessingWordCopy.replaceAt(guessingWordCopy.indexOf(letter),'#')
                }
                //little hacky solution but i dont care
                if (guessIndex == game.guesses.length-2 && game.guesses[guessIndex +1] === "ENTER") {
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
        if(game.guesses[guessIndex +1] === "ENTER"){
            game.guesses[guessIndex +1] = ""
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
            gEl("win-screen-result").innerHTML = makeEmojiBoard(true)
            loadScreen("win-screen","block")
            startConfetti()
            setTimeout(()=>{
                stopConfetti()
            },6000)
        }, animSpeed)
        //alert("You won but I won (read in russian accent)")
    }// LOSS
    else if(game.guesses.length > game.numOfGuesses){ //LOSS
        game.end = true
        setTimeout(()=> {
            gEl("loss-screen-result").innerHTML = makeEmojiBoard(true)
            gEl("loss-screen-answer").innerHTML = game.guessingWord
            loadScreen("loss-screen", "block")
        }, animSpeed)
        
        // alert("Loss")
    }
}
function shadeKeyBoard(letter, color) {
    for (const elem of gEls("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = rgbToHexString(elem.style.backgroundColor)
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
    const rows = gEls("row")
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].children.length; j++) {
            rows[i].children[j].textContent = ""
            rows[i].children[j].style.backgroundColor = "transparent"
            rows[i].children[j].classList.remove("filled-box")
        }
    }
}

function refresh(showEndScreen = true){
    clearBoard()
    handleWordleObject(showEndScreen)
}

document.addEventListener( "keyup", (e)=>{
    MyKeyboardEvent(e)
})
let holdInterval = null
let holdTimeout = null
let holdingKey = false
gEl("keyboard-cont").addEventListener("pointerup", (e)=>{
    holdingKey = false
    clearInterval(holdInterval)
    clearTimeout(holdTimeout)
    holdInterval = null
    holdTimeout = null
    const target = e.target
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent
    if (target.id === "back-button") {
        key = "Backspace"   
    }

    //because mobile -_-
    //document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
    //document.dispatchEvent(new KeyboardEvent("input", {'key': key}))
    MyKeyboardEvent(e={'key':key})
})
// holding keys will repeat them
gEl("keyboard-cont").addEventListener("pointerdown", (e)=>{
    holdingKey = true
    if (holdTimeout === null && holdInterval === null) {
        holdTimeout = setTimeout((e)=>{
            holdInterval = setInterval((e)=>{
                const target = e.target
                if (!target.classList.contains("keyboard-button")) {
                    return
                }
                let key = target.textContent
                if (target.id === "back-button") {
                    key = "Backspace"   
                }
                MyKeyboardEvent(e={'key':key})
            },KEY_HOLD_INTERVAL,e)
        },KEY_HOLD_DELAY,e)
    }
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

function getRandomWords(num, length){
    let words = []
    if (length === 5) {
        for (let i = 0; i < num; i++) {
            let currentWord = WORDS[Math.floor(Math.random()*WORDS.length)]
            if (!words.includes(currentWord)) {
                words.push(currentWord)
            }else{
                i--
            }
        }
    }
    return words
}

//TODO: make general for any length (so download more words i guess)
function wordExists(word){
    return WORDS.includes(word)
}

//at start
init()