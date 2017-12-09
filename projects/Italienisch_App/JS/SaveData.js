
$(document).ready(function() {
  init();
})
$('.btnAddCategorie').click(function() {
  allCategories = new Array({
    "name": "c1",
  });
  categorie = {
    "name": "c2",
  };
  allCategories.push(categorie);
  categorie = {
    "name": "c3",
  };
  allCategories.push(categorie);
  localStorage.setItem('allCategories', JSON.stringify(allCategories));
  //console.log(allCategories);
  allCategories = localStorage.getItem('allCategories');
  allCategories = JSON.parse(allCategories);
  //console.log(allCategories);
  allCategories.push(categorie);
  //console.log(allCategories);
})

function init() {
  allCategories = getCategories()
  //console.log(allCategories);
  for (var i = 0; i < allCategories.length; i++) {
    categorieName = allCategories[i];
    categorieName = categorieName.name;
    //console.log(categorieName);
    showCategorie(categorieName);
  }
}

function getCategories() {
  var allCategories = localStorage.getItem('allCategories');
  if (!allCategories) {
    allCategories = [];
    localStorage.setItem('allCategories', JSON.stringify(allCategories));
  }else {
    allCategories = JSON.parse(allCategories);
  }
  return allCategories;
}

function showCategorie(categorieName) {
  var categorie = "<div class='categorie "+categorieName+"'><p>"+categorieName+"</p></div>";
  //console.log(categorie);
  $("#categorieContainer").append(categorie);
}
