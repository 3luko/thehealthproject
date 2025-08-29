function noNewTab() {
  window.location.href = "home.html";
}

let time = 
console.log(time)
const timerElement = document.getElementById("timer-circle")

function timer(){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    timerElement.textContent = 
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (time > 0){
        time--;
    } else{
        clearInterval(timer);
        timerElement.textContent = "TIME'S UP"
    }
}

timer();
const timerInterval = setInterval(updateTimer, 1000);