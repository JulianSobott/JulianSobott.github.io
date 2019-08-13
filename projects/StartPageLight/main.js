$(document).ready(function () {

  //Background
  var num_images = 6;
  var number = Math.floor(Math.random() * num_images + 1);
  var image_number = "";
  if (number < 10){
    image_number = "0" + number;
  }else{
    image_number = "" + number;
  }
  var date = new Date();
  var hour = date.getHours();
  var welcomeText = "";
  if(hour<12 && hour>4){
    document.body.style.backgroundImage = "url('images/backgrounds/morning_" + image_number + ".jpg')";
  }else if (hour>11 && hour<14) {
    document.body.style.backgroundImage = "url('images/backgrounds/day_" + image_number + ".jpg')";
  }else if (hour>13 && hour<17) {
    document.body.style.backgroundImage = "url('images/backgrounds/day_" + image_number + ".jpg')";
  }else if (hour>16 && hour<21) {
    document.body.style.backgroundImage = "url('images/backgrounds/evening_" + image_number + ".jpg')";
  }else if (hour>20 || hour <= 4) {
    document.body.style.backgroundImage = "url('images/backgrounds/night_" + image_number + ".jpg')";
  }else {
    document.body.style.backgroundImage = "url('images/backgrounds/day_" + image_number + ".jpg')";
  }
});


