var timer = document.querySelector('.timer');
var isBreak = false;

var initialSessionMin = 25,
    initialBreakMin = 5;

var sessionMin = initialSessionMin,
    breakMin = initialBreakMin,
    sec = 60;




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
        }

    });
});



function countdown() {
    console.log(isBreak)
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

// function stop() {
//     clearInterval(interval);
// }

// var start = document.querySelector('.start');

// start.addEventListener('click', function () {
//     interval = setInterval(function () {
//         countdown()
//     }, 1000);
// });

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