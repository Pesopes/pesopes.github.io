var inv = {
    slot1:{
        jmeno:"nic",
        dur:0,
        typ:"zadny"
    },
    slot2:{
        jmeno:"nic",
        dur:0,
        typ:"zadny"
    },
    slot3:{
        jmeno:"nic",
        dur:0,
        typ:"zadny"
    },
    slot4:{
        jmeno:"nic",
        dur:0,
        typ:"zadny"
    },
}

var stat = {
    sila:0,
    charisma:0,
    inteligence:0,
    zivoty:0,
    obrana:0
}
var obtiz = ""

function Boj(zbran, jmenoZ, zivotZ, silaZ){
    console.log("liul")

}

function pripravaBoj(jmenoP, zivotP, silaP, originalniMisto) {
    document.getElementById("text").innerHTML = 'Začal jsi souboj s ' + jmenoP + ' ma ' + zivotP + ' životů a jeho síla je ' + silaP + '<br>Vyber si zbraň z inventáře.<br>Slot:<select id="vyberZbrane"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option></select><br><button onclick="' + originalniMisto + '()">Odejít z bitvy</button><button onclick="boj('+ vybranaZbran +',' + jmenoP + ','+ zivotP + ',' + silaP + '1)">Pokračovat</button>';    
    let zbrn = setInterval(berZbran(), 1000);
    
}

let vybranaZbran = ""
function berZbran() {
    vybranaZbran = document.getElementById("vyberZbrane").value
    console.log(vybranaZbran)
    var e = document.getElementById("ddlViewBy");
    var strUser = e.options[e.selectedIndex].value;
}






function vzit(vecJmeno, durability, typVeci) {
    if(inv.slot1.jmeno != "nic" && inv.slot2.jmeno != "nic" && inv.slot3.jmeno != "nic" && inv.slot4.jmeno != "nic") {
        alert("              ⚠️Žadné volné místo v inventáři⚠️\nVyhoď libovolný předmět pro uvolnení místa ");
        return;
    }
    if(inv.slot1.jmeno == "nic"){
        inv.slot1.jmeno = vecJmeno
        inv.slot1.dur = durability
        inv.slot1.typ = typVeci
    } else if(inv.slot2.jmeno == "nic" && inv.slot1.jmeno != vecJmeno){
        inv.slot2.jmeno = vecJmeno
        inv.slot2.dur = durability
        inv.slot2.typ = typVeci
    }else if(inv.slot3.jmeno == "nic"&& inv.slot1.jmeno != vecJmeno && inv.slot2.jmeno != vecJmeno){
        inv.slot3.jmeno = vecJmeno
        inv.slot3.dur = durability
        inv.slot3.typ = typVeci
    }else if(inv.slot4.jmeno == "nic"&& inv.slot1.jmeno != vecJmeno && inv.slot2.jmeno != vecJmeno && inv.slot3.jmeno != vecJmeno){
        inv.slot4.jmeno = vecJmeno
        inv.slot4.dur = durability
        inv.slot4.typ = typVeci
    } else alert(vecJmeno + " nemůžes sebrat dvakrát.")

}
function obtiznost() {
    document.getElementById("text").innerHTML = 'Vítej,<br>vyber si obtížnost<br><button onclick="lehka()">velmi lehká</button><button onclick="normal()">normal</button><button onclick="hard()">Mega hard</button>'
}
obtiznost()

function lehka() {
    obtiz ="lehka"
    stat.sila = 5
    stat.charisma = 5
    stat.inteligence = 5
    stat.zivoty = 5
    zacatek()
}
var ce11 = 0
function normal() {
    obtiz = "normal"
    stat.sila = 5
    stat.charisma = 5
    stat.inteligence = 5
    stat.zivoty = 5
    zacatek()
}

function hard() {
    obtiz = "hard"
    stat.sila = 5
    stat.charisma = 5
    stat.inteligence = 5
    stat.zivoty = 5
    zacatek()
}

function zacatek() {
    document.getElementById("text").innerHTML = 'Jsi v lese a kolem tebe jsou 3 cesty.<br>Z první se vydávají zvuky nějáké bytosti. Uprostřed cesty druhé je velká cedule s nápisem "pozor Ugafuni"(málo vyspělá rasa skřetů). Třetí je zase velmi temná.<br><button onclick="cesta1()">Cesta první</button><button onclick="cesta2()">Cesta druhá</button><button onclick="cesta3()">Cesta třetí</button>'
}

function cesta3() {
    document.getElementById("text").innerHTML = 'Je tu tma a špatně vidíš, ale cesty doleva a doprava rozeznáš.<br>Otázka je kam se rozhodneš jít.<br><button onclick="c11()">Doleva</button><button onclick="c12()">Doprava</button><button onclick="zacatek()">Vrátit se</button>'
}

function cesta2() {
    if(obtiz =="lehka") {
        var con = confirm("Zde bude 1. souboj. Máš dost zbraní z jiných cest?")
    }
    if(con == false) {
        return;
    }
    pripravaBoj("bojovníkem Ugufanů", 1, 2, "zacatek")
}

function cesta1() {


}

function c11() {

    document.getElementById("text").innerHTML = 'Na zemi je podivné zařízení. <br><img width="640" height="400"src="https://img2.cgtrader.com/items/1030250/7a7b439217/sci-fi-gun-3d-model-obj-mtl-fbx.jpg"><br><button onclick="vzit(\'Podivné svíticí zařízení\', 1, \'Laserová zbraň\')">Vzít</button><button onclick="cesta3()">Vrátit se</button>'
}
//mrtvý člověk hi tech vesta je kul a ochrani


function minihra(){
    document.getElementById("text").innerHTML = ''
}