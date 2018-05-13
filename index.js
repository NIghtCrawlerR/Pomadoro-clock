var audio = new Audio('audio/sound.mp3');
//audio.play();
const timer = document.querySelector('.timer');
let isBreak = false;



let initialSessionMin = 25,
    initialBreakMin = 5;

let sessionMin = initialSessionMin,
    breakMin = initialBreakMin,
    sec = 60;

let timerHeight = document.querySelector('.timer_wrap').clientHeight;
let h = 0;
let fillStep = 0;


function calcFillStep(){
    if(isBreak){
        fillStep = timerHeight / (breakMin * 60);
    }
    else{
      fillStep = timerHeight / (sessionMin * 60);  
    }
}
calcFillStep();
timer.innerHTML = sessionMin + '.00';

//min--;
let lengthControlButton = document.querySelectorAll('.length_control');

lengthControlButton.forEach(function (btn) {
    btn.addEventListener('click', function () {
        if (btn.closest('.timer_block').id == 'session') {
            if (btn.classList[0] == 'plus') {
                sessionMin++;
            }
            else {
                if (sessionMin == 0) { return false }
                sessionMin--;
            }
            btn.closest('.timer_block').querySelector('.timer_length').innerHTML = sessionMin + '.00';
            timer.innerHTML = sessionMin + '.00';
            initialSessionMin = sessionMin;
        }
        else {
            if (btn.classList[0] == 'plus') {
                breakMin++;
            }
            else {
                if (breakMin == 0) { return false }
                breakMin--;
            }
            btn.closest('.timer_block').querySelector('.timer_length').innerHTML = breakMin + '.00';
            initialBreakMin = breakMin;
        }
        fillStep = timerHeight / (sessionMin * 60);
    });
});



const countdown = () => {
    h += fillStep;

    if (sessionMin == initialSessionMin) {
        sessionMin--;
    }
    if (breakMin == initialBreakMin) {
        breakMin--;
    }
    if (isBreak) {
        document.querySelector(".RedFill").style.height = 0;
        document.querySelector(".GreenFill").style.height = h + "px";
        if (sec == 0) {
            if (breakMin !== 0) {
                breakMin--;
            }
            else {
                h = 0;
                isBreak = false;
                resetTimer();
            }
            sec = 60;
        }
        timer.innerHTML = breakMin + '.' + sec;
    }
    else {
        document.querySelector(".GreenFill").style.height = 0;
        document.querySelector(".RedFill").style.height = h + "px";
        if (sec == 0) {
            if (sessionMin !== 0) {
                sessionMin--;
            }
            else {
                h = 0;
                isBreak = true;
                resetTimer();
            }
            sec = 60;
        }
        timer.innerHTML = sessionMin + '.' + sec;
    }
    sec--;
} ////end countdown

const resetTimer = () => {
    audio.play();

    sessionMin = initialSessionMin;
    breakMin = initialBreakMin;
    calcFillStep();
} ////end reset timer


////intervals
let interval;

let stopped = true;
document.querySelector('.timer_wrap').addEventListener('click', function () {
    if (stopped == true) {
        interval = setInterval(function () {
            countdown()
        }, 1000);
        stopped = false;
    }
    else {
        clearInterval(interval);
        stopped = true;
    }
});