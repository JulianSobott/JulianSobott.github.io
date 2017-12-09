function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev);
}

$('.box').click(()=>{
  $('.box').toggleClass('animate');
})
var body = document.getElementsByTagName('html');
addOwnEventListener(
  body,
  "swipedown",
  function() {
    console.log("swipedown");
  });
addOwnEventListener(
  body,
  "swipeup",
  function() {
    console.log("swipeup");
  });

addOwnEventListener(
  body,
  "swipeleft",
  function() {
    console.log("swipeleft");
  });

addOwnEventListener(
  body,
  "swiperight",
  function() {
    console.log("swiperight");
  });
