var timer = document.querySelector('.timer');
var isBreak = false;



var initialSessionMin = 25,
    initialBreakMin = 5;

var sessionMin = initialSessionMin,
    breakMin = initialBreakMin,
    sec = 60;

var timerHeight = document.querySelector('.timer_wrap').clientHeight;
var h = 0;
var fillStep = 0;
fillStep = timerHeight/(sessionMin*60);


    timer.innerHTML = sessionMin + '.00';

//min--;
var lengthControlButton = document.querySelectorAll('.length_control');

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
        fillStep = timerHeight/(sessionMin*60);
    });
});



function countdown() {
    h += fillStep;
    console.log(h);
    document.querySelector(".fill").style.height = h+"px";
    if(sessionMin == initialSessionMin){
        sessionMin--;
    }
    if(breakMin == initialBreakMin){
        breakMin--;
    }
    if (isBreak) {
        if (sec == 0) {
            if (breakMin !== 0) {
                breakMin--;
            }
            else {
                isBreak = false;
                resetTimer();
            }
            sec = 60;
        }
        timer.innerHTML = breakMin + '.' + sec;
    }
    else {
        if (sec == 0) {
            if (sessionMin !== 0) {
                sessionMin--;
            }
            else {
                isBreak = true;
                resetTimer();
            }
            sec = 60;
        }
        timer.innerHTML = sessionMin + '.' + sec;
    }
    sec--;
}

function resetTimer() {
    sessionMin = initialSessionMin;
    breakMin = initialBreakMin;
}
////intervals
var interval;

var stopped = true;
document.querySelector('.timer_wrap').addEventListener('click', function () {
    if(stopped == true){
        interval = setInterval(function () {
            countdown()
        }, 1000);
        stopped = false;
    }
    else{
        clearInterval(interval);
        stopped = true;
    }
});