var megaKonec = 0
var ok10 = 0
var ok20 = 0
var odz = 0
var dop = "Doopravdy"
function zacatek() {
    document.getElementById("text").innerHTML = "8 ráno<br>Jsi u sebe doma a ležíš v posteli.<br>Máš takový divný pocit, ale ten hned zmizí<br>Co uděláš?";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='jduSpat()'>Jdu spát.</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='vstat()'>Vstanu</button>";
    odz = 1
}

function jduSpat() {
    document.getElementById("text").innerHTML = "Zrovna ses probudil, a proto se ti nechce spát.";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='vstat()'>Vstanu.</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='jduSpatZase()'>Zkusím ještě spát.</button>";
}

function jduSpatZase() {
    dop = dop + " doopravdy"
    document.getElementById("text").innerHTML = dop + " se ti nechce spát";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='vstat()'>Vstanu.</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='if(megaKonec == 1){KONEC()} else jduSpatZase()'>Pokusím se ještě jednou usnout.</button>";

}

function vstat() {
    document.getElementById("text").innerHTML = "Vstal jsi. Co teď";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='snidane()'>Nasnídam se.</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='jduSpat()'>Lehnu si zase do postele a zkusím usnout.</button>";
}

function snidane() {
    document.getElementById("text").innerHTML = "Dal sis chutný toast, ale potom si cítil déjà vu.<br>Přemýšlel si o tom, když tu náhle na tebe spadlo 1 tunové závaží.";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='ok1()'>Ok.</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='ok2()'>OK?</button>";
}

function ok1() {
    document.getElementById("text").innerHTML = '<img src="https://gymscrotes.files.wordpress.com/2012/01/20080519124818_tonne_weight_prop_02.jpg" alt="Prostě obrázek závaží" srcset="">'
    document.getElementById("tlacitko1").innerHTML = "<button onclick='zacatek()'>Spinkat...</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='if(odz == 1){dalsiCyklus()}'>Už zase?</button>";
    ok10 = 1
}

function ok2() {
    document.getElementById("text").innerHTML = '<img src="https://gymscrotes.files.wordpress.com/2012/01/20080519124818_tonne_weight_prop_02.jpg" alt="Prostě obrázek závaží" srcset="">'
    document.getElementById("tlacitko1").innerHTML = "<button onclick='zacatek()'>Spinkat...</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='if(odz == 1){dalsiCyklus()}'>Už zase?</button>";
    ok20 = 1
}


function dalsiCyklus() {
    document.getElementById("text").innerHTML = "Sic mundus creatus est";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='zacatek()'>Ano.</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='znicitSvet()'>Ne.</button>";
    
}

function znicitSvet() {
    document.getElementById("text").innerHTML = "<img width='2175' height='1062' src='https://themaritimepost.com/wp-content/uploads/2020/05/explosion-on-tanker-ship.jpg' alt='BUMBUM'>";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='if(ok10 == 1 && ok20 == 1){konec()} else zacatek()'>Kdy bude konec?<br>Nikdy<br>bum mozek nebo někdy bude hmmmm</button>"
    document.getElementById("tlacitko2").innerHTML = "<button onclick='if(ok10 == 1 && ok20 == 1){konec()} else zacatek()'>Kdy bude konec?<br>Nikdy<br>bum mozek třeba pokud projdeš víckrát</button>"
}

function konec() {
    megaKonec = 1
    document.getElementById("text").innerHTML = "8 ráno<br>Jsi u sebe doma a ležíš v posteli...pocit tu ... není...<br>Co uděláš...?";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='jduSpat()'>Jdu spát...</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='vstat()'>Vstanu</button>";
}
function KONEC() {
    document.getElementById("text").innerHTML = "YAY udělal jsi to😃<br>Přiznej, že ti někdo pomohl nebo ses podíval do kódu.";
    document.getElementById("tlacitko1").innerHTML = "<button onclick='party()'>🎉</button>";
    document.getElementById("tlacitko2").innerHTML = "<button onclick='party()'>🎂</button>";

}
function party() {
    var audio = new Audio('party.mp3');audio.play();
}