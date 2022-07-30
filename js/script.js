var selectedDifficult;
var limit;
var playing = false;
var score = 0;
var dynamicScorePoint = 1;
var buttonClicked;
var startTiming;

//Initialization

function init() {

    difficultChanger();
    populateDiv();
    responsiveElementsRemove(limit);
    loadScore();
    dynamicScoreSpan();
}

function populateDiv() {

    responsiveButtonsGrid();

    let n = 0;

    while (n != limit) {

        let button = document.createElement("button");
        button.classList.add("button-reflex");
        button.setAttribute("id", "button" + n);
        button.style.opacity = 0.1;
        button.innerHTML = "&nbsp";

        button.onclick = function () {
            buttonClick(this);
        };

        if (limit < 37) {

            let buttonByDivWidth = ((document.getElementById("container").offsetWidth) / 7);
            button.style.width = buttonByDivWidth + "px";
            button.style.height = buttonByDivWidth + "px";

        }

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

//Visual

function tipChange() {

    let tip = document.getElementById("difficult-detail");
    let menuBorder = document.getElementById("menu");
    let containerBorder = document.getElementById("container");
    switch (selectedDifficult) {

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

            tip.innerHTML = "I'm ninja!";
            tip.style.color = "red";
            menuBorder.style.borderColor = "red";
            containerBorder.style.borderColor = "red";
            break;
    }

    

   


}


function loadScore() {
    let elementScore = document.getElementById("score");
    elementScore.innerHTML = ("SCORE: " + parseFloat(score).toFixed(5)).replace(".", "");
}

//Responsive

function responsiveElementsRemove(limit) {


    if (limit == 165) {
        while (document.getElementById("jump-line")) {
            document.getElementById("jump-line").remove();
        }
    } else {
        while (document.getElementById("separator")) {
            document.getElementById("separator").remove();
        }
    }

}

function responsiveButtonsGrid() {

    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width > 900) {
        limit = 165;
    } else {
        limit = 36;
    }

}

//Start

function difficultMilis() {

    switch (selectedDifficult) {

        case "easy":
            return 1500;

        case "medium":
            return 1100;

        case "hard":
            return 900;

        case "expert":
            return 700;

    }

}

function startGame() {

    dynamicScorePoint = 1;
    startTimer();
    randomButtonAppear();
   
}

function stopGame() {
    playing = false;
    document.getElementById("button-start").onclick = startGame;
    stopTimer();
}


function clearScore() {
    score = 0;
    dynamicScorePoint = 1;
    loadScore();
    dynamicScoreSpan();
}

async function randomButtonAppear() {

    playing = true;

    document.getElementById("button-start").onclick = null;

    while (playing) {

        let sorted = Math.floor(Math.random() * limit);
        let sortedButton = document.getElementById("button" + sorted);
        sortedButton.style.opacity = "1";
        sortedButton.innerText = dynamicScorePoint;
        await sleep(difficultMilis());

        if (!buttonClicked) {
            dynamicScorePoint = 1;
            dynamicScoreSpan();
        }

        buttonClicked = false;

        sortedButton.style.opacity = "0.1";
        sortedButton.innerHTML = "&nbsp";
    }
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function buttonClick(button) {

    if (button.style.opacity == "1") {

        buttonClicked = true;
        button.style.opacity = "0.1";
        score += dynamicScore();
        loadScore();
        dynamicScorePoint++;

    } else {
        dynamicScorePoint = 1;
    }

    dynamicScoreSpan();

}


function dynamicScore() {

    if (dynamicScorePoint > 50) { return 0.00100 };

    switch (dynamicScorePoint) {

        case 1:
            return 0.00001;

        case 2:
            return 0.00002;

        case 3:
            return 0.00003;

        case 4:
            return 0.00004;

        case 5:
            return 0.00005;

        case 6:
            return 0.00010;

        case 7:
            return 0.00020;

        case 50:
            return 0.00100;

        default:
            return 0.00020;

    }

}

function dynamicScoreSpan() {
    let span = document.getElementById("points-chain");
    span.innerHTML = "Chain:" + dynamicScorePoint;
    span.innerHTML += " [" + plusSerie() + "]";

    function plusSerie() {


        switch (dynamicScorePoint) {

            case 1:

                removeAnimation()
                return "+";

            case 2:

                removeAnimation()
                return "++";

            case 3:

                removeAnimation()
                return "+++";

            case 4:

                removeAnimation()
                return "++++";

            case 5:

                removeAnimation()
                return "+++++";

            case 6:

                animateSpan(5)
                return "++++++";

            case 7:

                animateSpan(3)
                return "+++++++";

            case 50:
                animateSpan(1);
                return "Awesome+";


        }

        function animateSpan(seconds) {
            span.style.animationName = "rainbow";
            span.style.animationIterationCount = "infinite";
            span.style.animationDuration = seconds + "s";
        }

        function removeAnimation() {
            span.style.animationName = null;;
            span.style.animationIterationCount = null;
            span.style.animationDuration = null;

        }

        if (dynamicScorePoint > 50) { return "Awesome+"; }
        if (dynamicScorePoint > 7) { return "+++++++"; }
    }
}

function startTimer() {

    let timeSelected = document.getElementById("time");
    let time = timeSelected.options[timeSelected.selectedIndex].value;

    if (time == "infinite") { return; }

    function timer(limit) {

        let spanTimer = document.getElementById("timer");
       
        let milis = 0;
        let seconds = 0;
        let minutes = 0;

        function loadSpanTimer() {
            
            spanTimer.innerHTML = "0" + minutes + ":";
            spanTimer.innerHTML += ( (seconds > 9) ? seconds : "0" + seconds ) + ":";
            spanTimer.innerHTML += ( ( (milis / 10) > 9 ) ? milis/10: "0" + milis/10) ;

        }
                
        startTiming = setInterval(function() {
            
            milis += 10;  

            if (minutes == limit) {
                milis = 0;
                stopGame();
            }

            if (milis == 1000) {
                seconds++;
                milis = 0;
            }

            if (seconds == 60) {
                minutes++;
                seconds = 0;
            }
            
            loadSpanTimer();
            
            
        },10);

                

    }

    switch (time) {

        case "one-min":

            timer(1);
            break;

        case "two-min":

            timer(2);
            break;

        case "five-min":

            timer(5)
            break;

    }

    
}

function stopTimer() {
    clearInterval(startTiming);
    document.getElementById("timer").innerHTML = "00:00:00";
}