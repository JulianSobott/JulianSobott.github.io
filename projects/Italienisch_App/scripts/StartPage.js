var shownElements = [];
var allJSON;
var actualPath = [];
var level = 0;
var pathStr;
var searchPrecision = 0;
let vocabulary;

let isLoaded = false;
$(document).ready(function() {
  init();
  $('#categorieContainer').on('click touch', ".categorie", function(e) {
    openLowerLevel(this.value, e);
  });
  $('.back').click(function() {
    back();
  });

  $('.closeDownload').click(function() {
    $('.download').remove();
    $('.closeDownload').remove();
    $('.back').css('top', '0');
  });

  //Search function
  $('.search_button').click(function(){
    if ($('.searchField').hasClass('open')) {
      $('.searchField').removeClass('open');
      $('#categorieContainer').removeClass('openSearch');
      $('.searchContainer').removeClass('open');
      $('.searchField').val("");
      $('.search_button').attr('src', 'images/icons/search.svg');
      showCategories();
    }else{
      $('.searchField').addClass('open');
      $('#categorieContainer').addClass('openSearch');
      $('.searchContainer').addClass('open');
      $('.search_button').attr('src', 'images/icons/close.svg');
      $('.searchField').focus();
    }

  });
  $('.searchField').keyup( function () {
    $('.element').remove();
    if ($('.searchField').val().length > searchPrecision) {
      search($('.searchField').val());
    }else if ($('.searchField').val().length == 0) {
      showCategories();
    }else {
      $('.element').remove();
      $('#categorieContainer').children().remove();
    };
  });
});

function init() {
  loadCategories
    .then(()=>{
      showCategories();
      //addListeners();
      $('.loaderContainer').remove();})
    .catch((error)=>{
    console.log(error);
  })
  //showCategories();
  addListeners();
  $('.back').fadeOut();
  $('.headerText').html("Alle Kategorien");
}

let loadCategories = new Promise((resolve, reject)=>{
  $.getJSON("Vocabulary.json" , (data)=> {
    vocabulary = data;
  }).done(()=>{
    resolve("Loaded");
  }).fail((err)=>{
    let error = new Error("Failed to Load Data");
    reject(error);
  });
});

function showCategories() {
  // $.getJSON("Vocabulary2.json", function( data ) {  // TODO: Maybe execute just once this function
  //   pathStr = "";
  //   for (var i = 0; i < level; i++) {
  //     pathStr += "."+actualPath[i];
  //   }
  //   console.log(pathStr);
  //   data = eval("data"+pathStr);
  //   $.each( data, function(key, val) {
  //     if(isNaN(key)){
  //       addElementToDom(key, "categorie");
  //     }else {
  //       addElementToDom(val, "phrase");
  //     }
  //   });
  // }).done(function () {
  //   designCategories();
  // });
  $('#categorieContainer').children().remove();
  $.each( vocabulary, function(key, val) {
    //console.log(key);
    if(isNaN(key)){
      addElementToDom(key, "categorie");
    }else {
      addElementToDom(val, "phrase");
    }
  });
  designCategories();
}

function addElementToDom(value, type) {
  if (type == "categorie") {
    var categorie = "<button class='categorie element "+value+"' value='"+value+"'>"+value+"</button>";
    $("#categorieContainer").append(categorie);
  }else {
    var element = '<div class="vocElement element"><b>'+value[0]+' </b><br><i> '+value[1]+'</i></div>';
    $("#categorieContainer").append(element);
  }
}
function designCategories() {
  $('.categorie').insertBefore('.vocElement:first-child');
  var numCategories = document.getElementsByClassName('categorie');
  numCategories = numCategories.length;
  let index = 0;
  let interval = setInterval(()=>{
    $('.categorie:eq('+index+')').addClass('in');
    index++;
    if(index >= numCategories)
      clearInterval(interval);
  }, 100);

}

function openLowerLevel(categorie, e) {
  $('.back').fadeIn();
  $('#categorieContainer').children().remove();
  $('#categorieContainer').removeClass("closeContainer");
  $('#categorieContainer').addClass("open");
  $.each( vocabulary[categorie], function(key, val) {
    // console.log(val);
    if(isNaN(key)){
      // console.log("if");
      addElementToDom(key, "categorie");
    }else {
      // console.log("else");
      addElementToDom(val, "phrase");
    }
  });
  designCategories();
  level++;
  $('.headerText').html(categorie);
}

function back() {
  if (level != 0) {
    level--;
  }
  $('#categorieContainer').removeClass("open");
  $('#categorieContainer').addClass("closeContainer");
  $('.back').fadeOut();
  $('.categorie').remove();
  $('#categorieContainer').children().remove();
  $('.headerText').html("Alle Kategorien");
  showCategories();
}

function search(value) {
  value = value.toLowerCase();
  eachSearch(value, vocabulary);
};

function eachSearch(value, data){
  $.each( data, function(key, val) {
    if (typeof key === 'string') {
      if(key.toLowerCase().indexOf(value) !== -1){
        //addElementToDom(key, "categorie");
        console.log("addedkey: "+ key);
      }
    }
    if(typeof val[0] === 'string'){
      if(val[0].toLowerCase().indexOf(value) !== -1 || val[1].toLowerCase().indexOf(value) !== -1) {
      valArray = [];
      valArray.push(val[0]);
      valArray.push(val[1]);
       addElementToDom(valArray, "phrase");
      }
    }else{
      //console.log(val);
      eachSearch(value, val);
    }
  });
}

function fitTextToContainer() { // TODO: Finish this function
  widthContainer = $('#categorieContainer').css('width');
  heightContainer = $('#categorieContainer').css('height');
  console.log(widthContainer);
  console.log(heightContainer);
  fontSize = 2;
  $('.categorie').each(function() {
    do {
      fontSize +=0.5;
      widthText = $('#categorieContainer').css('width');
      heightText = $('#categorieContainer').css('height');
      $('#categorieContainer').css('font-size', (fontSize) + "em");
      console.log(fontSize);
    } while (widthText<widthContainer && heightText<heightContainer);
  })
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addListeners(){
  var body = document.getElementsByTagName('html');
  addOwnEventListener(
    body,
    "swiperight",
    function() {
      back();
    })
}
