function noNewTab() {
  window.location.href = "/";
}


const timerId = document.getElementById("timer-circle-id");
let stopped = false;
let countdownInterval;


const timerCircleElement = document.querySelector(".timer-circle");


let timerText = timerCircleElement.textContent;
let time = parseInt(timerText, 10)




function timer(){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    timerCircleElement.textContent = 
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (time > 0 && !stopped){
        time--;
    }else if (time <= 0){
        clearInterval(countdownInterval);
        timerCircleElement.textContent = "Time's up!";
    }

    if (time <= 10){
        timerCircleElement.style.backgroundColor = "red"
    }
}

timerCircleElement.addEventListener("click", function(){
    stopped = !stopped;

    if(!stopped){
        countdownInterval = setInterval(timer, 1000);
        timerCircleElement.style.backgroundColor = "green";
    } else {
        clearInterval(countdownInterval);
        countdownInterval = null;
        timerCircleElement.style.backgroundColor = "black";
    }      
});

function resetTimer(){
    timerId.textContent = "15";
    time = 15;
    stopped = true;
    clearInterval(countdownInterval);
    countdownInterval = null;
    timerCircleElement.style.backgroundColor = "black";
}


function setTimer(){
    let userInput = prompt("Enter time in seconds:");
    let newTime = parseInt(userInput, 10);
    if (!isNaN(newTime) && newTime > 0){
        timerId.textContent = newTime;
        time = newTime;
        stopped = true;
        clearInterval(countdownInterval);
        countdownInterval = null;
        timerCircleElement.style.backgroundColor = "black";
    }
}

function startDayTimer(){

}