var inv = {
            slot1:{
                jmeno:"nic",
                obrazekSrc:"Deda.gif"
            },
            slot2:{
                jmeno:"nic",
                obrazekSrc:"Deda.gif"
            },
            slot3:{
                jmeno:"nic",
                obrazekSrc:"Deda.gif"
            },
            slot4:{
                jmeno:"nic",
                obrazekSrc:"Deda.gif"
            },
        }
        $(function(){
        
        
        $("#slot1txt").text(inv.slot1.jmeno)
        $("#slot1obr").attr("src", inv.slot1.obrazekSrc)

        $("#slot2txt").text(inv.slot2.jmeno)
        $("#slot2obr").attr("src", inv.slot2.obrazekSrc)

        $("#slot3txt").text(inv.slot3.jmeno)
        $("#slot3obr").attr("src", inv.slot3.obrazekSrc)

        $("#slot4txt").text(inv.slot4.jmeno)
        $("#slot4obr").attr("src", inv.slot4.obrazekSrc)
        
        
        
        
        
        
        
            function vzit(vecJmeno, obrazek) {
            if(inv.slot1.jmeno != "nic" && inv.slot2.jmeno != "nic" && inv.slot3.jmeno != "nic" && inv.slot4.jmeno != "nic") {
                alert("              ⚠️Žadné volné místo v inventáři⚠️");
                return;
            }
            if(inv.slot1.jmeno == "nic"){
                inv.slot1.jmeno = vecJmeno
                inv.slot1.obrazekSrc = obrazek
            } else if(inv.slot2.jmeno == "nic" && inv.slot1.jmeno != vecJmeno){
                inv.slot2.jmeno = vecJmeno
                inv.slot2.obrazekSrc = obrazek
            }else if(inv.slot3.jmeno == "nic"&& inv.slot1.jmeno != vecJmeno && inv.slot2.jmeno != vecJmeno){
                inv.slot3.jmeno = vecJmeno
                inv.slot3.obrazekSrc = obrazek
            }else if(inv.slot4.jmeno == "nic"&& inv.slot1.jmeno != vecJmeno && inv.slot2.jmeno != vecJmeno && inv.slot3.jmeno != vecJmeno){
                inv.slot4.jmeno = vecJmeno
                inv.slot4.obrazekSrc = obrazek
            } 
        
        }
        //mistnost 1111111111111111111111111111111111111111111111
        var tvZap = 0
        $("#policka").click(function(){
            $("#policka").hide()
            $("#otevrenaPolicka").show()
        })
        $("#otevrenaPolicka").click(function(){
            $("#otevrenaPolicka").hide()
            $("#policka").show()
        })

        $("#btnTV1").click(function(){
            //můžes vypnout tv jen pokud neni zobrazen sum
            if($("#sum").css("display")=="none"){
                $("#vPolicce").toggle()
            }else return;
            //ukazuje jestli je tv zapnutá
            if($("#vPolicce").css("display")=="none"){
                tvZap = 0
            }else tvZap = 1
        })
        $("#btnTV2").click(function(){
            //mění programy
            if(tvZap == 1){
                $("#vPolicce").toggle()
                $("#sum").toggle()
        }

        })
        //tlacitka vlevo a vpravo
        $("#1do2").click(function(){
            $("#mistnost1").hide()
            $("#mistnost2").show()
        })
        $("#2do3").click(function(){
            $("#mistnost2").hide()
            $("#mistnost3").show()
        })
        $("#3do4").click(function(){
            $("#mistnost3").hide()
            $("#mistnost4").show()
        })
        $("#4do1").click(function(){
            $("#mistnost4").hide()
            $("#mistnost1").show()
        })
        
        
        $("#4do3").click(function(){
            $("#mistnost4").hide()
            $("#mistnost3").show()
        })
        $("#3do2").click(function(){
            $("#mistnost3").hide()
            $("#mistnost2").show()
        })
        $("#2do1").click(function(){
            $("#mistnost2").hide()
            $("#mistnost1").show()
        })
        $("#1do4").click(function(){
            $("#mistnost1").hide()
            $("#mistnost4").show()
        })

       /* $("#hvn").click(function(){
            vzit("ee", "svg/h.svg")
            $("#hvn").hide()
        })*/
        //mistnost2222222222222222222222222222222222222222222222222222
        $("#trezor").click(function(){
            $("#trezorPop").toggle()
        })
        $("#krizekTrezor").click(function(){
            $("#trezorPop").toggle()
        })
        $("#popupPozadiTrezor").click(function(){
            $("#trezorPop").toggle()
        })


})

    