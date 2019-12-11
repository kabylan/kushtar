

////////////////////////////////////
// used colors
var bgColor1 = "#000";
var bgColor2 = "#fff";

// cadrsNums
var currentCadrN = 0;
var cadrsQuotity = 0;


// default time 0.1 second
var oneTimeForCadr = 100;
// times in words
var slowest = 2400;
var slow = 1200;
var middle = 600;
var fast = 200;
var fastest = 50;

// all times for cadrs
var timesForCadrs = [];

var minTime = 10;
var maxTime = 10000;

// current cadr's time value
var timeForCadrVal = 0;

// all cadrs
var cadrs = [];

// empty cadr
var oneCadr = [false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false];

// current cadr's values
var isCubeClicked = [false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false];

// to change values of current cadr
function cubeClicked(cubeN) {

    if (!isCubeClicked[cubeN]) {
        document.querySelectorAll(".ha-button")[cubeN].style.background = bgColor2;
        document.querySelectorAll(".ha-button")[cubeN].style.color = bgColor2;
        isCubeClicked[cubeN] = true;
    } else {
        document.querySelectorAll(".ha-button")[cubeN].style.background = bgColor1;
        document.querySelectorAll(".ha-button")[cubeN].style.color = bgColor1;
        isCubeClicked[cubeN] = false;
    }
}

function cubeHovered(cubeN, e) {

    if (e.ctrlKey) {
        if (!isCubeClicked[cubeN]) {
            document.querySelectorAll(".ha-button")[cubeN].style.background = bgColor2;
            document.querySelectorAll(".ha-button")[cubeN].style.color = bgColor2;
            isCubeClicked[cubeN] = true;
        } else {
            document.querySelectorAll(".ha-button")[cubeN].style.background = bgColor1;
            document.querySelectorAll(".ha-button")[cubeN].style.color = bgColor1;
            isCubeClicked[cubeN] = false;
        }
    }
}


// display cadr's values
function displayCadr(cadrToDisplay) {

    // check all values of array and ..... display! but don't change nothing.
    for (var i = 0; i < cadrToDisplay.length; i++) {

        if (cadrToDisplay[i]) {
            document.querySelectorAll(".ha-button")[i].style.background = bgColor2;
            document.querySelectorAll(".ha-button")[i].style.color = bgColor2;
        } else {
            document.querySelectorAll(".ha-button")[i].style.background = bgColor1;
            document.querySelectorAll(".ha-button")[i].style.color = bgColor1;
        }

    }

}

// initialize current cadr's values from other cadr
function initCadr(cadrToInit, cadrN) {

    // current cadr gets values gived cadr
    for (var i = 0; i < cadrToInit.length; i++) {

        isCubeClicked[i] = cadrToInit[i];

    }

}



// Several cadrs

// save current cadr's values
function Save() {
    cadrs[currentCadrN] = isCubeClicked.slice();
    timesForCadrs[currentCadrN] = timeForCadrVal;
}

// add empty cadr
function Add() {

    // add empty cadr
    cadrs.push(oneCadr);

    // change cadrs quotity
    cadrsQuotity++;

    // add default time for cadr
    timesForCadrs.push(oneTimeForCadr);

    // update
    showCadrsNum();
}

// previus cadr
function Prev() {
    Apply();
    if (currentCadrN > 0) {

        // firstly, save current cadr's values int currentCadrN
        Save();

        // prev cadr
        currentCadrN--;

        // initialize previuos cadr's values
        initCadr(cadrs[currentCadrN], currentCadrN);

        // show previuos cadr
        displayCadr(cadrs[currentCadrN]);

        // update cadrsNum
        showCadrsNum();

        setTimeForCadr(currentCadrN);

        showTimes();

    }
}


// next cadr
function Next() {
    Apply();
    if (currentCadrN + 1 < cadrsQuotity) {

        // firstly, save current cadr's values int currentCadrN
        Save();

        // next cadr
        currentCadrN++;

        // initialize next cadr's values
        initCadr(cadrs[currentCadrN], currentCadrN);

        // show next cadr
        displayCadr(cadrs[currentCadrN]);

        // update cadrsNum
        showCadrsNum();

        // update time for cadr
        setTimeForCadr(currentCadrN);


        showTimes();
    }

}

// show current cadr num and cadrs quotity
function showCadrsNum() {

    // show current cadr num
    document.querySelectorAll("#cadrsQuotity > span")[0].textContent = currentCadrN + 1;

    // show cadrs quotity
    document.querySelectorAll("#cadrsQuotity > span")[1].textContent = cadrsQuotity;

}

// set
function Apply() {

    var rangeVal2 = document.querySelector("#rangeVal").value;

    if (rangeVal2 < minTime || rangeVal2 > maxTime) {
        rangeVal2 = oneTimeForCadr;
    }

    timeForCadrVal = rangeVal2;

    document.querySelector("#rangeVal").value = "";

    document.querySelector("#rangeVal").value = timeForCadrVal;

}

function setTimeForCadr(cadrN) {

    //timeForCadrVal = rangeVal2;

    timeForCadrVal = timesForCadrs[cadrN];

    document.querySelector("#rangeVal").value = "";

    document.querySelector("#rangeVal").value = timeForCadrVal;

}


// Default start
// add 1 cadr
Add();
// show cadr num
showCadrsNum();
// init cadr
initCadr(cadrs[currentCadrN], currentCadrN);
//
displayCadr(cadrs[currentCadrN]);
// time for cadr по умолчанию
Apply();

// Kom Sred Avto System

// play all cadrs
function Play() {

    var l = cadrs.length; // or timesForCadrs.length

    var iii = 0;



    var timerId = setTimeout(function tick() {



        if (iii < l) {
            ms = timesForCadrs[iii];// * 1000;
        } else {
            console.log("timeout end");
            clearTimeout(timerId);
            return;
        }

        timerId = setTimeout(tick, ms);

        displayCadr(cadrs[iii]);
        iii++;

    }, 100);

}


// setTime from words SLOWEST, SLOW, MIDDLE, FAST, FASTEST
function setTimeFromWord(sWord) {

    var sTime = oneTimeForCadr;

    if (sWord == "SLOWEST") {
        sTime = slowest;
    }

    if (sWord == "SLOW") {
        sTime = slow;
    }

    if (sWord == "MIDDLE") {
        sTime = middle;
    }

    if (sWord == "FAST") {
        sTime = fast;
    }

    if (sWord == "FASTEST") {
        sTime = fastest;
    }

    timesForCadrs[currentCadrN] = sTime;

    setTimeForCadr(currentCadrN);

    showTimes();
}


// show times
function showTimes() {

    //show times from 1 to current cadr
    var timesFromOneToCurrentN = 0;

    for (var i = 0; i < currentCadrN + 1; i++) {
        timesFromOneToCurrentN += timesForCadrs[i] / 1000;
    }

    //
    var timesFull = 0;

    for (var i = 0; i < timesForCadrs.length; i++) {

        timesFull += timesForCadrs[i] / 1000;
    }

    document.querySelectorAll("#timesQuotity > span")[0].textContent = Math.round((timeForCadrVal / 1000) * 100) / 100;

    document.querySelectorAll("#timesQuotity > span")[1].textContent = Math.round(timesFromOneToCurrentN * 100) / 100;

    // show times quotity
    document.querySelectorAll("#timesQuotity > span")[2].textContent = Math.round(timesFull * 100) / 100;

}

// publish 
function Publish() {

    var musicVal = document.querySelector("#music").value;
    var authorVal = document.querySelector("#author").value;
    var cadrsVal = JSON.stringify(cadrs);
    var timesVal = JSON.stringify(timesForCadrs);

    document.querySelector("#inputMusic").value = musicVal;
    document.querySelector("#inputAuthor").value = authorVal;
    document.querySelector("#inputCadrs").value = cadrsVal;
    document.querySelector("#inputTimes").value = timesVal;

    document.querySelector("#publish").click();

}