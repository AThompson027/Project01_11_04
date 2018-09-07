/*  Project 01_11_04

    Author: 
    Date:   

    Filename: script.js
*/

"use strict";

// global variables
 var httpRequest = false;
var countrySel;

// event listeners
var zip = document.getElementById("zip");
var germany = document.getElementById("germany");
var us = document.getElementById("us");
if(us.addEventListener){
 germany.addEventListener("click", checkButtons, false);
 us.addEventListener("click", checkButtons, false);
} else if(us.attachEvent) {
    germany.attachEvent("onclick", checkButtons);
    us.attachEvent("onclick", checkButtons);
}


if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false);
} else if(zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}

// function to check the length of te data in the input element
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation()
    }
    else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}

// function that sends a request to the server
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    }
    catch (requestError) {
        document.getElementById("csset").style.visibility = "visible";
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            zip.removeEventListener("keyup", checkInput, false);
        }
        else if (zip.attachEvent) {
            zip.attachEvent("onkeyup", checkInput);
        }
        return false;
    }
    console.log(httpRequest);
    return httpRequest;
}

// function to get the location of the zip codes from the server
function getLocation() {
    var zip = document.getElementById("zip").value;
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/us/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }
}

function checkButtons() {
    alert("checkButtons()");
}