var base;
var playPause = 0;

// storing the data in the form of JSON
function storeEvent(timestamp, event) {
    let eventsJSON = JSON.parse(sessionStorage.getItem('events'));

    if (!eventsJSON) {
        eventsJSON = {};   
    }

    eventsJSON[timestamp] = event;
    sessionStorage.setItem('events', JSON.stringify(eventsJSON));

    return;
}

function getEvents() {
    let eventsJSON = JSON.parse(sessionStorage.getItem('events'));

    if (!eventsJSON) {
        eventsJSON = {};   
    }

    return eventsJSON;
}

function playFunc() {
    playPause = playPause + 1;

    if (playPause === 1) {
        play();
        document.getElementById("play").classList.add("pause");
        storeEvent(new Date().getTime(), 'play');
    } else if (playPause === 2) {
        document.getElementById("play").classList.remove("pause");
        playPause = 0;
        storeEvent(new Date().getTime(), 'pause');
        stop();
    }
}

function play() {
    base = setInterval(timer, 10); // millisecond
}

function stop() {
    clearInterval(base);
}

// default value
var millisecond = 0;
var second = 0;
var minute = 0;
var hour = 0;

// value it will return
var millisecondVal = 0;
var secondVal = 0;
var minuteVal = 0;
var hourVal = 0;

function timer() {
    millisecondVal = updateTime(millisecond);
    secondVal = updateTime(second);
    minuteVal = updateTime(minute);
    hourVal = updateTime(hour);

    millisecond =  ++millisecond;

    if (millisecond === 100) { //millisecond    
        millisecond = 0;
        second = ++second;
    }
    if (second == 60) {
        minute = ++minute;
        second = 0;
    }
    if (minute == 60) {
        minute = 0;
        hour = ++hour;
    }
    
    $("#millisecond").text(millisecondVal);
    $("#second").text(secondVal);
    $("#minute").text(minuteVal);
    $("#hour").text(hourVal);
}

// updating time every millisecond; it reset to zero after every 100 iter.... with updating its preceding number by 1
function updateTime(i) {
    if(i < 10){
        i = "0" + i;
    }
    return i;
}

// reset Function and store data event to store the values.
function resetFunc() {
    storeEvent(new Date().getTime(), 'reset');
    
    millisecond = 0;
    second = 0;
    minute = 0;
    hour = 0;

    $("#millisecond").text("00");
    $("#second").text("00");
    $("#minute").text("00");
    $("#hour").text("00");

}

// stop function and store data event to store the values.
function stopFunc() {
    storeEvent(new Date().getTime(), 'stop');
    clearInterval(base);
    resetFunc();
}