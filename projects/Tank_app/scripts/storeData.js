var numKeys;


function addCar(carName, totalDistance) {

  carsDB.length().then(function (numberOfKeys) {
    numKeys = numberOfKeys;
    console.log(numKeys);
  }).catch(function () {
    numKeys = -1;
  });

  var newCar = new Car(carName, totalDistance);
  carsDB.setItem('car'+numKeys, newCar).then(function (value) {
    console.log("call SW");
    navigator.serviceWorker.ready.then(function(swRegistration) {
        return swRegistration.sync.register('syncCars');
    });
    console.log(value);
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  });
  //console.log(dummyCar);
  // var cars = {};
  // carsDB.iterate(function(value, key, iterationNumber) {
  //   cars[iterationNumber-1] = value;
  // }).then(function () {
  //   if (navigator.onLine) {
  //     //Store Data On the server NOW
  //     $.ajax({
  //       method: "POST",
  //       url: "php/syncData.php",
  //       data: {data: data}
  //     }).done(function (resp) {
  //         console.log(resp);
  //     });
  //   }else {
  //     //Try to Store Data on the server when internet connection exists
  //     navigator.serviceWorker.ready.then(function(swRegistration) {
  //         return swRegistration.sync.register('syncCars');
  //     });
  //   }
  //   //console.log(cars);
  //   var data = JSON.stringify(cars);
  //   //console.log(data);
  //   $.ajax({
  //     method: "POST",
  //     url: "php/syncData.php",
  //     data: {data: data}
  //   }).done(function (resp) {
  //       console.log(resp);
  //   });
  // }).catch(function(err){
  //   console.log(err);
  // });

}


// carsDB.getItem('cars').then(function(value) {
//   console.log(value);
// }).catch(function(err){
//   console.log(err);
// });

function Car(name, totalDistance) {
  this.name = name;
  this.totalDistance = totalDistance;
}


//Store Fuel Data
var form = document.getElementById('fuelForm');

form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Show Homescreen
  showScreen("home");

  updateHomeScreen();
});
