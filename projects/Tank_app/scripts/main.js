
/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  //'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                console.log("New content is available; please refresh.");
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });

    // navigator.serviceWorker.ready.then(
    //   function(swRegistration) {
    //   return swRegistration.sync.register('syncData');
    // });
  }

  // Your custom JavaScript goes here
})();
//Get all Elements
var listOfCarsEl = document.getElementById('listOfCars');
var fuelEl = document.getElementById('fuel');
var carNameH2 = document.getElementById('carNameH2');
var datePicker = document.getElementById('datePicker');
var homeScreen = document.getElementById('home');
var closeFullScreenBtn = document.getElementById('closeFullScreen');
var carStatisticsEl = document.getElementsByClassName('carStatistics');
var addCarForm = document.getElementsByClassName('addCarForm')[0];
//console.log(carStatisticsEl);
showScreen("listOfCars");
function addEventListenerToButtons(){
  var carBtns = document.getElementsByClassName('carBtn');
  for (var i = 0; i < carBtns.length; i++) {
    var dummyCar = document.getElementById(carBtns[i].attributes.id.value);
    dummyCar.addEventListener('click', function(event) {
      console.log(event);
      carBtnClick(event.target.attributes.name.value);
    });
  }
  //console.log(carBtns);
  //console.log(carBtns[0].attributes.id.value);

}
function carBtnClick(name) {
  console.log(name);
  listOfCarsEl.setAttribute("hidden", "hidden");
  fuelEl.removeAttribute("hidden");
  carNameH2.innerHTML = name;
  var date = new Date;
  date = date.toISOString().slice(0, 10);
  datePicker.value = date;
}
// Cars List
addCarForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var carName = document.getElementsByName('carName')[0].value;
  var totalDistance = document.getElementsByName('totalDistance')[0].value;
  addCar(carName, totalDistance);
  return false;
});
//Section ---------Home Screen-----------
closeFullScreenBtn.addEventListener('click', function() {
  closeFullScreen();
});

function openFullScreen(e) {
  closeFullScreenBtn.removeAttribute("hidden");
  console.log("opened Full Screen");
  console.log(e);
  e.target.classList.add("fullScreen");
  console.log(e.target);
  var fullScreenEl = document.getElementsByClassName('fullScreen');
  addOwnEventListener(
    fullScreenEl,
    "swipedown",
    function() {
      closeFullScreen();
    })
}

function closeFullScreen() {
  document.getElementsByClassName('fullScreen')[0].classList.remove('fullScreen');
  closeFullScreenBtn.setAttribute("hidden", "hidden");
}

addOwnEventListener(carStatisticsEl, "dblclick dbltap",
  function(e) {
    openFullScreen(e);
  }
);


// for (var i = 0; i < carStatisticsEl.length; i++) {
//   carStatisticsEl[i].addEventListener("t")
// }
// // carStatisticsEl[0].addEventListener('click', function() {
// //   carStatisticsEl[0].classList.add("fullScreen");
// // });

function updateHomeScreen() {

}


function showScreen(screenName) {
  if (screenName == "listOfCars") {
    listOfCarsEl.removeAttribute("hidden");
    fuelEl.setAttribute("hidden", "hidden");
    home.setAttribute("hidden", "hidden");
  }else if (screenName == "fuel") {
    listOfCarsEl.setAttribute("hidden", "hidden");
    fuelEl.removeAttribute("hidden");
    home.setAttribute("hidden", "hidden");
  }else if (screenName == "home") {
    listOfCarsEl.setAttribute("hidden", "hidden");
    fuelEl.setAttribute("hidden", "hidden");
    home.removeAttribute("hidden");
  }
}

//Function Library

function addOwnEventListener(element, listener, functionName){
  var listenerList = listener.split(' ');
  //console.log(listenerList);
  if (typeof element === 'object') {
    for (var i = 0; i < element.length; i++) {
      for (var j = 0; j < listenerList.length; j++) {
        element[i].addEventListener(listenerList[j], functionName);
      }
    }
  }else {
  }
}

var lastTapTime;
document.addEventListener("click", function(e) {
  var currentTapTime = new Date().getTime();
  var diffTime = currentTapTime - lastTapTime;
  if ((diffTime < 600) && (diffTime > 0)) {
    var event = new CustomEvent("dbltap", {bubbles: true, detail: "Double tapped"});
    e.target.dispatchEvent(event);
  }
  lastTapTime = new Date().getTime();
});

//Touch events
var touchstartLocation;
var touchendLocation;
document.addEventListener("touchstart", function(e) {
  touchstartLocation = new Array(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
});
document.addEventListener("touchmove", function(e) {
  //console.log(e);
});
document.addEventListener("touchend", function (e) {
  touchendLocation = new Array(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
  var diffPointY = touchendLocation[1] - touchstartLocation[1];
  if (diffPointY > 50) {
    var event = new CustomEvent("swipedown", {bubbles: true, detail: "Swiped down"});
    e.target.dispatchEvent(event);
  }
});


//-------Syncing Data in Background-----------

function add(one, two){
  return one + two;
}
//Scroll Animation
//addScrollable();
function addScrollable() {
  let scrolledDone = 0;
  $('#listOfCars').bind('mousewheel DOMMouseScroll', (e) =>{
    if(e.originalEvent.detail > 0){
      //Scroll down
      $('.carBtn:eq('+scrolledDone+')').css('transform', 'scale(0.7)');
      $('.carBtn:eq('+add(scrolledDone,1)+')').css('transform', 'scale(0.8)');
      console.log($('.carBtn:eq('+ (scrolledDone+1) +')'));
      console.log((scrolledDone+1));
      scrolledDone++;
    }else {
      $('.carBtn:eq('+scrolledDone+')').css('transform', 'scale(1)');
      $('.carBtn:eq('+add(scrolledDone,1)+')').css('transform', 'scale(0.9)');
      scrolledDone--;
    }
  });


  //Drag and Drop scroller
  let mousedown = false;

  $('.scroller').mousedown((e)=>{
    mousedown = true;
    $('.scroller').mousemove((e)=>{
      if (mousedown) {
        console.log(e.pageY);
        marginTopScroller = (marginTopScroller+heightScroller+10) > containerHeight ? marginTopScroller : e.pageY - heightScroller/2;
        $('.scroller').css('margin-top', marginTopScroller+'px');
      }
    });
    $('.scroller').mouseup((e)=>{
      mousedown = false;
    });
  });


}
