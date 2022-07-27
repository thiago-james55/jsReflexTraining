var selectedDifficult;

function init() {
    
    difficultChanger();
    populateDiv();
}

function populateDiv() {
    let button = document.createElement("button");
    button.classList.add("button-reflex");
    
    let n = 0
    while (n != 176) {

        let button = document.createElement("button");
        button.classList.add("button-reflex");
        button.setAttribute("id", "button" + n);
        document.getElementById("container").appendChild(button);
        
        n++;
        
    }

}

function difficultChanger() {

    var selectDifficult = document.getElementById("difficult");

    function onDifficultChange() {
      
      selectedDifficult = selectDifficult.options[selectDifficult.selectedIndex].value;

      tipChange();
     
    }

    selectDifficult.onchange = onDifficultChange;
    onDifficultChange();
 
    
}

function tipChange() {

    let tip = document.getElementById("difficult-detail");
    let menuBorder = document.getElementById("menu");
    let containerBorder = document.getElementById("container");
    switch(selectedDifficult) {

        case "easy":
            
            tip.innerHTML = "Just for Fun!";
            tip.style.color = "green";
            menuBorder.style.borderColor = "green";
            containerBorder.style.borderColor = "green";
            break;

        
        case "medium":
            
            tip.innerHTML = "Let's Train!";
            tip.style.color = "blue";
            menuBorder.style.borderColor = "blue";
            containerBorder.style.borderColor = "blue";
            break;
        
        case "hard":
            
            tip.innerHTML = "Rock on!";
            tip.style.color = "purple";
            menuBorder.style.borderColor = "purple";
            containerBorder.style.borderColor = "purple";
            break;
       
        case "expert":
            
            tip.innerHTML = "Became a god!";
            tip.style.color = "red";
            menuBorder.style.borderColor = "red";
            containerBorder.style.borderColor = "red";
            break;
    }

}
