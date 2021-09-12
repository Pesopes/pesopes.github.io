function randomCislo(min, max) {
  min = parseInt(document.getElementById(cislo1)).value
  max = parseInt(document.getElementById(cislo2)).value
  min = Math.ceil(min);
  max = Math.floor(max);
   document.write(Math.floor(Math.random() * (max - min)) + min);
}
  //document.write(randomCislo())
alert(TOHLE NEFUNGUJE KA NEVIM PROX AAAAAAA)