//pozor s pozadim nejde interaktovat to je vse jo taky jsem nej

var inv = {
            slot1:{
                jmeno:" ",
                obrazekSrc:"",
                id:""
            },
            slot2:{
                jmeno:" ",
                obrazekSrc:"",
                id:""
            },
            slot3:{
                jmeno:" ",
                obrazekSrc:"",
                id:""
            },
            slot4:{
                jmeno:" ",
                obrazekSrc:"",
                id:""
            },
        }
//var selectedItem = " "


function zniceniItem(id){
    if(inv.slot1.id == id){
        inv.slot1.jmeno = " "
        inv.slot1.obrazekSrc = ""
        inv.slot1.id = ""
    } else if(inv.slot2.id == id){
        inv.slot2.jmeno = " "
        inv.slot2.obrazekSrc = ""
        inv.slot2.id = ""
    }else if(inv.slot3.id == id){
        inv.slot3.jmeno = " "
        inv.slot3.obrazekSrc = ""
        inv.slot3.id = ""
    }else if(inv.slot4.id == id){
        inv.slot4.jmeno = " "
        inv.slot4.obrazekSrc = ""
        inv.slot4.id = ""
    } else alert("Pokud tohle vidíš něco je špatně.")
    updateInv()
}

function vzit(vecJmeno, obrazek, id) {
    if(inv.slot1.jmeno != " " && inv.slot2.jmeno != " " && inv.slot3.jmeno != " " && inv.slot4.jmeno != " ") {
        alert("              ⚠️Žadné volné místo v inventáři⚠️");
        return;
    }
    if(inv.slot1.jmeno == " "){
        inv.slot1.jmeno = vecJmeno
        inv.slot1.obrazekSrc = obrazek
        inv.slot1.id = id
    } else if(inv.slot2.jmeno == " " && inv.slot1.jmeno != vecJmeno){
        inv.slot2.jmeno = vecJmeno
        inv.slot2.obrazekSrc = obrazek
        inv.slot2.id = id
    }else if(inv.slot3.jmeno == " "&& inv.slot1.jmeno != vecJmeno && inv.slot2.jmeno != vecJmeno){
        inv.slot3.jmeno = vecJmeno
        inv.slot3.obrazekSrc = obrazek
        inv.slot3.id = id
    }else if(inv.slot4.jmeno == " "&& inv.slot1.jmeno != vecJmeno && inv.slot2.jmeno != vecJmeno && inv.slot3.jmeno != vecJmeno){
        inv.slot4.jmeno = vecJmeno
        inv.slot4.obrazekSrc = obrazek
        inv.slot4.id = id
    } 

updateInv()
}
function updateInv(){
        $("#slot1txt").text(inv.slot1.jmeno)
        $("#slot1obr").attr("src", inv.slot1.obrazekSrc)
        $("#slot1obr").attr("class", inv.slot1.id)

        $("#slot2txt").text(inv.slot2.jmeno)
        $("#slot2obr").attr("src", inv.slot2.obrazekSrc)
        $("#slot2obr").attr("class", inv.slot2.id)

        $("#slot3txt").text(inv.slot3.jmeno)
        $("#slot3obr").attr("src", inv.slot3.obrazekSrc)
        $("#slot3obr").attr("class", inv.slot3.id)

        $("#slot4txt").text(inv.slot4.jmeno)
        $("#slot4obr").attr("src", inv.slot4.obrazekSrc)
        $("#slot4obr").attr("class", inv.slot4.id)
        }
           
        var jeElektrina = 0
        
        setInterval(test,5)
        
        function test(){
            var pos = $("#pohybujiciSe").position()
            $("#line").attr({x2: pos.left, y2: pos.top})
            //console.log(pos)
            }

        /*Reset pozic inventáře*/
        function resetPozicInv(){
            $("#slot1obr").css({
                'top':'0%',
                'left':'0%'
            });
            $("#slot2obr").css({
                'top':'0%',
                'left':'0%'
            });
            $("#slot3obr").css({
                'top':'0%',
                'left':'0%'
            });
            $("#slot4obr").css({
                'top':'0%',
                'left':'0%'
            });
        }
        
        setInterval(animace, 14000);
        function animace(){
            if($("#obraz1").is(":hidden")){
                
            }else {
                setTimeout(function(){ $("#obraz1").hide(); }, 000);
                setTimeout(function(){ $("#obraz2").show(); }, 000);
                setTimeout(function(){ $("#obraz2").hide(); }, 100);
                setTimeout(function(){ $("#obraz3").show(); }, 100);
                setTimeout(function(){ $("#obraz3").hide(); }, 200);
                setTimeout(function(){ $("#obraz2").show(); }, 200);
                setTimeout(function(){ $("#obraz2").hide(); }, 300);
                setTimeout(function(){ $("#obraz1").show(); }, 300);
                
            }
        }
       
        $(function(){
        //______________________testovani_________________________
            
            /*$("#slot1").draggable({ containment: "#body", scroll: false })//VVVVVVVVVVVVVVVVVEEEEEEEEEEEEEEEERRRRRRRRRRRRRRYYYYYYYYYYYYY FFFFFFFFFFFFUUUUUUUUUUUUNNNNNNNNNNN VYMAZAT DELA SLOTY DRAGGABLE ale JE TO fun!!!
            $("#slot2").draggable({revert:true, scroll: false })
            $("#slot3").draggable({scroll: false })
            $("#slot4").draggable({scroll: false })*/
            
            

            

            /*$("#tv").droppable({accept: ".rucicka", drop: function(){
                alert("dsadads")
                zniceniItem("rucicka")
            }})*/
        //___________________________________inventář_______________________
        
        updateInv()
        
        /* starý system klikni na slot pak klikni jinam

        $("#slot1").click(function(){
            if(selectedItem==inv.slot1.jmeno){
                $("#slot1").css("border", "3px solid black")
                selectedItem = " "
            }else{
                selectedItem = inv.slot1.jmeno
                $("#slot1").css("border", "3px solid red")
                $("#slot2").css("border", "3px solid black")
                $("#slot3").css("border", "3px solid black")
                $("#slot4").css("border", "3px solid black")
            }
        })

        $("#slot2").click(function(){
            if(selectedItem==inv.slot2.jmeno){
                $("#slot2").css("border", "3px solid black")
                selectedItem = " "
            }else{
                selectedItem = inv.slot2.jmeno
                $("#slot2").css("border", "3px solid red")
                $("#slot1").css("border", "3px solid black")
                $("#slot3").css("border", "3px solid black")
                $("#slot4").css("border", "3px solid black")
            }
        })

        $("#slot3").click(function(){
            if(selectedItem==inv.slot3.jmeno || selectedItem == " "){
                $("#slot3").css("border", "3px solid black")
                selectedItem = " "
            }else{
                selectedItem = inv.slot3.jmeno
                $("#slot3").css("border", "3px solid red")
                $("#slot2").css("border", "3px solid black")
                $("#slot1").css("border", "3px solid black")
                $("#slot4").css("border", "3px solid black")
            }
        })

        $("#slot4").click(function(){
            if(selectedItem==inv.slot4.jmeno){
                $("#slot4").css("border", "3px solid black")
                selectedItem = " "
            }else{
                selectedItem = inv.slot4.jmeno
                $("#slot4").css("border", "3px solid red")
                $("#slot2").css("border", "3px solid black")
                $("#slot3").css("border", "3px solid black")
                $("#slot1").css("border", "3px solid black")
            }
        })*/
            $("#slot1obr").draggable({scroll:false, revert: "invalid"})
            $("#slot2obr").draggable({scroll:false, revert: "invalid"})
            $("#slot3obr").draggable({scroll:false, revert: "invalid"})
            $("#slot4obr").draggable({scroll:false, revert: "invalid"})
        




        //POPUP_Obecně
        function popupOtev(){
            $("#krizek").toggle()
            $("#popupPozadi").toggle()
        }
        function popupZavr(){
            $("#krizek").hide()
            $("#popupPozadi").hide()
            $(".popup").hide()
        }
        $("#krizek").click(function(){
            popupZavr()
        })
        $("#popupPozadi").click(function(){
            popupZavr()
        })  

        
        
        //tlacitka vlevo a vpravo
        $("#1do2").click(function(){
            $("#mistnost1").hide();
            $("#mistnost2").show();
            popupZavr()
        })
        $("#2do3").click(function(){
            $("#mistnost2").hide()
            $("#mistnost3").show()
            popupZavr()
        })
        $("#3do4").click(function(){
            $("#mistnost3").hide()
            $("#mistnost4").show()
            popupZavr()
        })
        $("#4do1").click(function(){
            $("#mistnost4").hide()
            $("#mistnost1").show()
            popupZavr()
        })
        
        
        $("#4do3").click(function(){
            $("#mistnost4").hide()
            $("#mistnost3").show()
            popupZavr()
        })
        $("#3do2").click(function(){
            $("#mistnost3").hide()
            $("#mistnost2").show()
            popupZavr()
        })
        $("#2do1").click(function(){
            $("#mistnost2").hide()
            $("#mistnost1").show()
            popupZavr()
        })
        $("#1do4").click(function(){
            $("#mistnost1").hide()
            $("#mistnost4").show()
            popupZavr()
        })



        //mistnost 1111111111111111111111111111111111111111111111
        
        
        
        
        
        $("#pohybujiciSe").draggable({containment: "#svg", scroll: false})

            $("#zasuvkaTv").droppable({accept: "#pohybujiciSe", drop: function(){
                $("#pohybujiciSe").css({"left":"46%","top":"25.3%"})
                jeElektrina = 1
                $('#pohybujiciSe').draggable( "destroy" )
                $("#pohybujiciSe").css({"pointer-events": "none"})
            }})
        
        
        
        
        var tvZap = 0
        

        $("#btnTV1").click(function(){
            //můžes vypnout tv jen pokud neni zobrazen sum
            if(jeElektrina == 1){
            
            if($("#sum").css("display")=="none"){
                $("#vPolicce").toggle()
            }else return;
            //ukazuje jestli je tv zapnutá
            if($("#vPolicce").css("display")=="none"){
                tvZap = 0
            }else tvZap = 1
            }
        })
    
        $("#btnTV2").click(function(){
            //mění programy
            if(tvZap == 1){
                $("#vPolicce").toggle()
                $("#sum").toggle()
        }

        })

        
       
        //mistnost2222222222222222222222222222222222222222222222222222
       
        
        $("#trezor").click(function(){
            $("#trezorPop").show()
            popupOtev()
        })
  
            //je kod v trezoru spravny? kod
        $("#kodTrezor").on("keypress", function(e){
            if(e.which==13 && $("#kodTrezor").val()==1548){
               $("#trezor").hide()
               $("#trezorOtevreny").show()
               $("#rucickaTrezor").show()
               popupZavr()
            }
        })

        $("#rucickaTrezor").click(function(){
            $("#rucickaTrezor").hide()
            vzit("Hodinová ručička", "svg/rucickaTrezor.svg", "rucicka")//<------TOTO pak ikona do inventare
            
        })
        //mistnost33333333333333333333333333333333333333333333333333333333333333333333333333333333333

        //Kukačky
        $("#kukacky").click(function(){
            $("#kukackyPop").show()
            popupOtev()
        })

        $("#kukackyPop").droppable({accept: ".rucicka", drop: function(){
            zniceniItem("rucicka")
            $("#minutovaRucicka").show()
            resetPozicInv()
        }})

        var hodinovaRucicka=0;
        var minutovaRucicka=0;
        var otaceniHodinovaRucicka=0;
        var otaceniMinutovaRucicka=0;
        $("#hodinovaRucicka").click(function(){
            otaceniHodinovaRucicka += 30;
            hodinovaRucicka++;
            $("#otaceniHodinovaRucicka").rotate(otaceniHodinovaRucicka);
            kontrolaKoduKukacky()
        })
        $("#minutovaRucicka").click(function(){
            otaceniMinutovaRucicka += 30;
            minutovaRucicka++;
            $("#otaceniMinutovaRucicka").rotate(otaceniMinutovaRucicka);
            kontrolaKoduKukacky()
        })

        $.fn.rotate = function(degrees) {
            $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                         '-moz-transform' : 'rotate('+ degrees +'deg)',
                         '-ms-transform' : 'rotate('+ degrees +'deg)',
                         'transform' : 'rotate('+ degrees +'deg)'});
            return $(this);
        };

        function kontrolaKoduKukacky(){
            if(hodinovaRucicka%12==5 && minutovaRucicka%12==8){
                $("#kukacky").hide()
                $("#kukackyOtevrene").show()
                $("#poklopKod").show()
                popupZavr()
            }
        }
        $("#poklopKod").click(function()
        {
            $(this).remove()
            vzit("Papír s čísly","svg/poklopKod.svg","poklopKod")
        })
        //Poklop
        $("#poklop").click(function(){
            $("#poklopPop").show()
            popupOtev()
        })
        var poklopCislo=1;
        $(".poklopTlacitka").click(function(){
            if(poklopCislo==this.id.charAt(1))
            {
                $(this).css({"background-color" : "green"})
                if(poklopCislo==9)
                {
                    $("#poklop").hide()
                    $("#poklopOtevreny").show()
                    popupZavr()
                }
                poklopCislo++;
            }
            else
            {
                $(this).css({"background-color":"red"})
                setTimeout(reset,500)
                
                poklopCislo=1;
            }
        })
        function reset(){
            $(".poklopTlacitka").css({"background-color":"gray"})
        }
        
        



//mistnost 44444444444444444444444444444444444444444444
        $("#policka").click(function(){
            $("#policka").hide()
            $("#otevrenaPolicka").show()
            $("#testItem").show()
        })
        $("#otevrenaPolicka").click(function(){
            $("#otevrenaPolicka").hide()
            $("#policka").show()
            $("#testItem").hide()
        })
        $("#testItem").click(function(){
            $("#testItem").remove()
            vzit("testovací", "svg/testIkona.svg", "testovaci")
           
        })

})
 