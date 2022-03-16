
var obtiz = ""
const inter = document.getElementById("interface")
const txt = document.getElementById("text")
const btn = document.getElementById("tlacitka")
const inv = document.getElementById("inventar")
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
//mrtvý člověk hi tech vesta je kul a ochrani








/*POHYBoVANI


*/
function obtiznostVyber() {
    var p = document.createElement("p");
    var pText = document.createTextNode("Neco")
    p.appendChild(pText);
    txt.appendChild(p)
}