var carsDB = localforage.createInstance({
  name: "carsDB"
});
var fuel = localforage.createInstance({
  name: "fuelList"
});
var carNames = [];
carsDB.iterate(function(value, key, iterationNumber) {
  carNames.push(value.name);
}).then(function () {
  if (carNames.length>0) {
    showCars(carNames);
  }else {
    showAddCar();
  }
}).catch(function(err){
  console.log(err);
});


function showAddCar() {
  var addCarForm = document.getElementsByClassName('addCarForm')[0];
  addCarForm.removeAttribute("hidden");
}

function showCars(value) {
  for (var i = 0; i < value.length; i++) {
    addCarToDom(value[i])
  }
  addEventListenerToButtons();
}

function addCarToDom(pName) {
  var name = pName;
  var carBtn= "<div class='carBtn' id='car_"+name+"' name="+name+">"+name+"</div>";
  var listOfCars = document.getElementById('listOfCars');
  listOfCars.insertAdjacentHTML('beforeend', carBtn);
}
