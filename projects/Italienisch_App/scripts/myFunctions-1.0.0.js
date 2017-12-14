$(document).ready(()=>{


  /*
  *-----Window Resizing Functions----
  */
  $(window).resize(()=>{

    //Add Scroller if Necessary
    if (scrollContainer[i].wrapperHeight < scrollContainer[i].scrollContainerHeight) {
      $('.scrollContainer:eq('+i+')').children('.scroller').css('opacity', '0');
    }else {
      $('.scrollContainer:eq('+i+')').children('.scroller').css('opacity', '1');
    }
  })

  /*
  *-----Scrolling Function----
  *Function to add Scroll funtion to all HTML Elements with the class 'scrollable'
  */
  let numScrollContainer = $('.scrollContainer').length;
  let scrollContainer = new Array(numScrollContainer);
  for (var i = 0; i < numScrollContainer; i++) {
    $('.scrollContainer:eq('+i+')').wrapInner('<div class="wrapper"></div>');
    scrollContainer[i] = new ScrollContainer(i);
    $('.scrollContainer:eq('+i+')').prepend('<div class="scroller" style="height: '+scrollContainer[i].scrollerHeight+'px;"></div>');
    $('.scrollContainer:eq('+i+')').attr('value', i);
    if (scrollContainer[i].wrapperHeight < scrollContainer[i].scrollContainerHeight) {
      $('.scrollContainer:eq('+i+')').children('.scroller').css('opacity', '0');
    }
  }

  $('.scrollContainer').on('mousewheel DOMMouseScroll', (e)=>{
    e.stopPropagation();
    let idxCurrentSC = e.currentTarget.attributes['value'].value;
    if(e.originalEvent.detail > 0){
      //Scroll down
      if (scrollContainer[idxCurrentSC].scrolled >= scrollContainer[idxCurrentSC].timesToScroll) {
        idxCurrentSC = idxCurrentSC>0? idxCurrentSC-1: idxCurrentSC;
      }
      scrollContainer[idxCurrentSC].scrolled = scrollContainer[idxCurrentSC].scrolled >= scrollContainer[idxCurrentSC].timesToScroll ? scrollContainer[idxCurrentSC].scrolled : scrollContainer[idxCurrentSC].scrolled+1;
    }else {
      //Scroll Up
      if (scrollContainer[idxCurrentSC].scrolled <= 0) {
        idxCurrentSC = idxCurrentSC>0? idxCurrentSC-1: idxCurrentSC;
      }
      scrollContainer[idxCurrentSC].scrolled = scrollContainer[idxCurrentSC].scrolled <= 0 ? 0 : scrollContainer[idxCurrentSC].scrolled-1;
    }
    $('.wrapper:eq('+idxCurrentSC+')').css('margin-top', -(scrollContainer[idxCurrentSC].scrolled*scrollContainer[idxCurrentSC].scrollDistance)+'px');
    $('.scroller:eq('+idxCurrentSC+')').css('margin-top', (scrollContainer[idxCurrentSC].scrolled*scrollContainer[idxCurrentSC].scrollerScrollDistance)+'px');
  });

  addListeners();
  let draggedScroller;
  let downY;
  let positionBefore;
  let marginTop;
  let startMarginTop;
  function addListeners(){
    let allScroller = document.getElementsByClassName('scroller');
    for (var i in allScroller) {
      if (!isNaN(parseFloat(i)) && isFinite(i)) {
        allScroller[i].addEventListener('mousedown', mouseDown, false);
      }
    }
    window.addEventListener('mouseup', mouseUp, false);
  }

  function mouseUp()
  {
      window.removeEventListener('mousemove', divMove, true);
  }

  function mouseDown(e){
    window.addEventListener('mousemove', divMove, true);
    draggedScroller = e.originalTarget;
    draggedScroller.style.marginTop = draggedScroller.style.marginTop ? draggedScroller.style.marginTop : 0;
    startMarginTop =  parseInt(draggedScroller.style.marginTop);
    idxCurrentSC = e.target.parentElement.attributes['value'].value;
    downY = e.clientY;
  }

  function divMove(e){
    let diffScrolled = e.clientY - downY;
    marginTop = parseInt(draggedScroller.style.marginTop);
    draggedScroller.style.marginTop = startMarginTop + diffScrolled + "px";
    if(diffScrolled > 0 ){
      if ((scrollContainer[idxCurrentSC].scrollContainerHeight - scrollContainer[idxCurrentSC].scrollerHeight) > marginTop) {
        draggedScroller.style.marginTop = startMarginTop + diffScrolled + "px";
      }else{
        draggedScroller.style.marginTop = marginTop +"px";
      }
    }else{
      if (marginTop >= 0) {
        draggedScroller.style.marginTop = startMarginTop + diffScrolled + "px";
      }else{
        draggedScroller.style.marginTop = marginTop + "px";
      }
    }
    $('.wrapper:eq('+idxCurrentSC+')').css('margin-top', -(parseInt(draggedScroller.style.marginTop))*scrollContainer[idxCurrentSC].diffScrollDistance+'px');
  }
});

function ScrollContainer(index) {
  this.wrapperHeight = $('.wrapper:eq('+index+')').height();
  this.scrollContainerHeight = $('.scrollContainer:eq('+index+')').height();
  this.scrollerHeight = 100;

  this.scrolled = 0;
  this.idxTopItem = 0;

  this.scrollDistance = 50;
  this.heightDifference = this.wrapperHeight -this.scrollContainerHeight ;
  this.timesToScroll = Math.ceil(this.heightDifference/this.scrollDistance);
  this.scrollDistance = this.heightDifference/this.timesToScroll;

  this.scrollerScrollDistance = (this.scrollContainerHeight - this.scrollerHeight)/this.timesToScroll;
  this.diffScrollDistance = this.scrollDistance/this.scrollerScrollDistance;
}

/*
*-----Custom Event Listener Function----
*Function to add Custom Event Listener to Elements
*TODO universalize Functions
*/

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
    e.preventDefault();
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
  var diffPointX = touchendLocation[0] - touchstartLocation[0];
  console.log(diffPointX);
  console.log(diffPointY);

  if (diffPointY > 50) {
    var event = new CustomEvent("swipedown", {bubbles: true, defaultPrevented: true, detail: "Swiped down"});
    e.target.dispatchEvent(event);
    e.preventDefault();
  }
  if (diffPointY < -50) {
    var event = new CustomEvent("swipeup", {bubbles: true, defaultPrevented: true, detail: "Swiped up"});
    e.target.dispatchEvent(event);
    e.preventDefault();
  }
  if (diffPointX > 200) {
    var event = new CustomEvent("swiperight", {bubbles: true, defaultPrevented: true, detail: "Swiped right"});
    e.target.dispatchEvent(event);
    e.preventDefault();
  }
  if (diffPointX < -200) {
    var event = new CustomEvent("swipeleft", {bubbles: true, defaultPrevented: true, detail: "Swiped left"});
    e.target.dispatchEvent(event);
    e.preventDefault();
  }
});

/*Build in Elements*/
/*-----------Side Menu-------------*/
$('.sidemenuOpener').click(()=>{
  $('.sidemenu').toggleClass('open');
  $('.sidemenuOpener').toggleClass('open');
});

/*-------------flowMenu---------*/
let numSlides = $('.slide');
numSlides = numSlides.length
let idxSlide = 1;
//Add Components to Menu
//Add Dots
$('.flowMenu').append("<div class='counter'></div> ");
for(let i = 0; i < numSlides; i++ ){
  $('.counter').append("<span class='fmDot'></span>")
}
$('.fmDot:first-child').addClass('actual');
//Add Arrows
$('.flowMenu').append("<div class='arrow arrowRight'>></div><div class='arrow arrowLeft'><</div> ");
$('.arrowLeft').fadeOut();
//Add functionality
$('.arrowRight').click(()=>{
  if(idxSlide < numSlides){
    idxSlide++;
    go2Slide(idxSlide, "right");
  }
  if(idxSlide == numSlides){
    $('.arrowRight').fadeOut();
  }if(idxSlide > 1) {
    $('.arrowLeft').fadeIn();
  }
});
$('.arrowLeft').click(()=>{
  if(idxSlide > 1){
    idxSlide--;
    go2Slide(idxSlide, "left");
  }
  if(idxSlide == 1){
    $('.arrowLeft').fadeOut();
  }if(idxSlide != numSlides) {
    $('.arrowRight').fadeIn();
  }
});

$('.fmDot').click((e)=>{
  idxSlide= $('.fmDot').index(e.target)+1;
  go2Slide(idxSlide);
});

function go2Slide(index, arrow="left") {
  $('.actual').removeClass('actual');
  $('.left_in').removeClass('left_in');
  $('.right_in').removeClass('right_in');
  $('.left_out').removeClass('left_out');
  $('.right_out').removeClass('right_out');
  if (arrow == "left") {
    $('.slide:nth-child('+(index+1)+')').addClass(arrow+'_out');
  }else{
      $('.slide:nth-child('+(index-1)+')').addClass(arrow+'_out');
  }
  $('.slide:nth-child('+index+')').addClass('actual '+arrow+'_in');
  $('.fmDot:nth-child('+index+')').addClass('actual');
}
