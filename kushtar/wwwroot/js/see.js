
// used colors
var bgColor1 = "#000";
var bgColor2 = "#fff";

// cadrsNums
var currentCadrN = 0;
var cadrsQuotity = 0;


// default time 0.1 second
var oneTimeForCadr = 100;
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
    timesForCadrs[currentCadrN] = timeForCadrVal / 1;
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

    }

}

// show current cadr num and cadrs quotity
function showCadrsNum() {

   
}

// set
function Apply() {

}

function setTimeForCadr(cadrN) {

    //timeForCadrVal = rangeVal2;

    timeForCadrVal = timesForCadrs[cadrN];

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


// play all cadrs
function Play() {

    var l = cadrs.length; // or timesForCadrs.length

    var iii = 0;

    var ms = timesForCadrs[iii];// * 1000; // ms = s * 1000

    var timerId = setTimeout(function tick() {

        displayCadr(cadrs[iii]);

        iii++;

        if (iii < l) {
            ms = timesForCadrs[iii];// * 1000;
        } else {
            console.log("timeout end");
            clearTimeout(timerId);
            return;
        }

        timerId = setTimeout(tick, ms);

    }, ms);

}


// publish 
function Publish() {

}