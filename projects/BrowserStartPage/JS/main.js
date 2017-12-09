$(document).ready(function () {

  //Background
  //changeBackgroundColor();

  //------Welcome Textfield--------
  var date = new Date();
  var hour = date.getHours();
  var welcomeText = "";
  if(hour<12 && hour>4){
    welcomeText = "Guten Morgen";
  }else if (hour>11 && hour<14) {
    welcomeText = "Guten Mittag"
  }else if (hour>13 && hour<17) {
    welcomeText = "Guten Nachmittag";
  }else if (hour>16 && hour<21) {
    welcomeText = "Guten Abend";
  }else if (hour>20) {
    welcomeText = "Gute Nacht";
  }else {
    welcomeText = "Hello";
  }
  $('.welcomeText').html(welcomeText);
  $('.welcomeText').css('font-size', $('.welcomeText').height() / 2 - 20);
  $(window).on('resize', function () {
    $('.welcomeText').css('font-size', $('.welcomeText').height() / 2 -20);
  });

  //addScrollable();
  //addScrollable2();
});


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addScrollable() {
  let totalContainerHeight = $('.scrollable').height();
  $('.scrollable').css('position', 'static');
  $('.scrollable').css('overflow', 'hidden');
  $('.scrollable').append('<span class="scrollBar"></span><span class="scroller"></span>');
  let marginTop = 0;
  let marginTopScroller = 0;
  let heightScroller = $('.scroller').height();
  let containerHeight = $('.scrollable').height();
  let timesToScroll = (totalContainerHeight-containerHeight)/10;
  let totalScrollDistance = containerHeight - heightScroller;
  let scrollDistance = Math.round(totalScrollDistance/timesToScroll, -5);
  //console.log($('.scrollable').children().height());
  //console.log(containerHeight/ ($('.scrollable').children().height() * ($('.scrollable').children().length -2) + 30*($('.scrollable').children().length -2)));
  $('.scrollable').bind('mousewheel DOMMouseScroll', (e) =>{
    if(e.originalEvent.detail > 0){
      //Scroll down
      marginTop = marginTop < -(totalContainerHeight-containerHeight) ? marginTop : marginTop-10;
      marginTopScroller = (marginTopScroller+heightScroller+10) >= containerHeight ? marginTopScroller : marginTopScroller+scrollDistance;
      $('.scrollable').css('margin-top', marginTop+'px');
      $('.scroller').css('margin-top', marginTopScroller+'px');
    }else {
      marginTop = marginTop == 10 ? 10 : marginTop+10;
      marginTopScroller = marginTopScroller <= 0 ? 0 : marginTopScroller-scrollDistance;
      $('.scrollable').css('margin-top', marginTop+'px');
      $('.scroller').css('margin-top', marginTopScroller+'px');
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
