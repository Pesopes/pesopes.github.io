

var obdelnik = document.getElementById("obdelnik")

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown":
        setTimeout(function(){
         obdelnik.classList.remove("animateD")   
        },500);
        
        break;
      case "ArrowUp":
        if (obdelnik.classList != "animateN") {  
         obdelnik.classlist.add("animateN")
        } 
        setTimeout(function(){
             obdelnik.classList.remove("animateN")   
        },500);
        break;
      case "ArrowLeft":
        if (obdelnik.classList != "animateL") {    
         obdelnik.classlist.add("animateL")
        }  
        setTimeout(function(){
             obdelnik.classList.remove("animateL")   
        },500);
        break;
      case "ArrowRight":
        if (obdelnik.classList != "animateP") {  
         obdelnik.classlist.add("animateP")
        
        }    setTimeout(function(){
         obdelnik.classList.remove("animateP")   
        },500);
        break;
      default:
        return;
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);