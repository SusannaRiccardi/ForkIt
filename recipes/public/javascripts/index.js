window.onload = function() {
  var pageContent = document.getElementById('page-content');
  pageContent.innerHTML = mainTemplate();

  //menu buttons and functionality
  let btnMenu = document.getElementsByClassName('menu-btn')[0].parentNode;
  let btnMain = document.getElementById('btn-about').parentNode;
  let btnCreate = document.getElementById('btn-create').parentNode;
  let btnDiscover = document.getElementById('btn-discover').parentNode;
  let btnAbout = document.getElementById('btn-about').parentNode;
  let btnSearchSubmit = document.getElementById('search-submit-btn');
  let btnCategories = document.getElementById('btn-categories').parentNode;

  btnCategories.href = "categories";
  btnCreate.href = "create";
  btnDiscover.href = "discover";
  btnAbout.href = "about";
  btnMenu.href = "menu";

  btnMenu.addEventListener('click', displayPage);
  btnCreate.addEventListener('click', displayPage);
  btnDiscover.addEventListener('click', displayPage);
  btnAbout.addEventListener('click', displayPage);
  btnCategories.addEventListener('click', displayPage)


  let menubar = document.getElementById('menubar');
  let recipesBtn = document.getElementById('recipes-view-btn');
  let menuwrapper = document.getElementById('menuwrapper');
  let login = document.getElementById('login');
  let recipeView = document.getElementById('recipe-view');
  let mainView = document.getElementById('main-view');
  let menuBtnFont = document.getElementsByClassName('btn-img')[0].getElementsByTagName('i')[0];
  let mainPageSearch = document.getElementById('mainPageSearch');
  let mainPageSearchContent = document.getElementById('food');

  let searchBtn = document.getElementById('search-btn');
  let searchBackBtn = document.getElementById('search-btn-back');
  let search = document.getElementById('search');

  let inputField = document.getElementsByTagName('input');

  menuwrapper.addEventListener('mouseenter', function() {
    menuBtnFont.setAttribute('Style', '-ms-transform: rotate(90deg); -webkit-transform: rotate(90deg); transform: rotate(90 deg);');
  });

  menuwrapper.addEventListener('mouseleave', function() {
    menuBtnFont.removeAttribute('Style');
  });

  mainPageSearchContent.addEventListener('focus', function() {
    mainPageSearchContent.removeAttribute('placeholder');
  });

  mainPageSearchContent.addEventListener('blur', function() {
    mainPageSearchContent.setAttribute('placeholder', 'SEACH FOOD');
  });
}



// Display different pages when the menu buttons are clicked
function displayPage(e){
  e.preventDefault();
  var pageContent = document.getElementById('page-content');
  let href = e.target.href.split('/').pop();
  if(href == 'categories'){
    pageContent.innerHTML = categoriesTemplate();
    clickCategory();
  }
  if (href == 'create'){
    pageContent.innerHTML = createTemplate();
    create();
  }
  if (href == 'discover'){
    doJSONRequest('GET', '/recipes', null, null, function(res, req){

      pageContent.innerHTML = discoverTemplate(res);
      accessToSingleRecipeMongo();

    })
  }
  if (href == 'about'){
    pageContent.innerHTML = "";
  }
  if (href == 'search'){
    search();
  }
  if (href == 'menu'){
    pageContent.innerHTML = mainTemplate();
  }
}




// CREAT RECIPE VIEW
// Creation of the recipe with the post request
function create() {
  addIngredients();
  let createBtn = document.getElementById('submit-recipe');
  createBtn.addEventListener('click', createRecipe);
}



////////////////////// Create Recipe /////////////////////////////
function createRecipe(e) {
  e.preventDefault();
  let title = document.getElementById('create-name').value;
  let instructions = document.getElementById('create-description').value;
  let ingredients = [];
  let isGlutenFree = document.getElementById('c11').checked;
  let isDairy = document.getElementById('c22').checked;
  let isVegan = document.getElementById('c33').checked;
  let names = document.getElementsByClassName('create-ingredient-name');
  let quantities = document.getElementsByClassName('create-ingredient-quantity');
  let inputFile = document.getElementById('file-upload').files[0];
  let selectCategory = document.getElementById('selectCategory').value;
  let selectTime = document.getElementById('selectTime').value;
  let data = new FormData();

  if(title == ''){
    window.alert('The title of the recipe is a compulsory field');
  }
  else if(instructions == ''){
    window.alert('Description of the preparation of the recipe is a compulsory field');
  }
  else if(names[0].value == ''){
    window.alert('Ingredients of the recipe are compulsory fields');
  }
  else {
    for (i = 0; i < names.length; i++) {
      let q = (quantities[i].value).split(/(\d+)/);

      let ing = {};
      ing.name = names[i].value;
      ing.amount = Number(q[1]);
      ing.unit = q[2];
      ingredients.push(ing);
    }
    data.append('title', title);
    data.append('category', selectCategory);
    data.append('readyInMinutes', selectTime);
    data.append('instructions', instructions);
    data.append('ingredients', JSON.stringify(ingredients));
    data.append('lactosefree', isDairy);
    data.append('glutenfree', isGlutenFree);
    data.append('vegan', isVegan);
    if (inputFile === undefined) {
      data.append('image', '');
    } else {
      let inputField = document.getElementById('file-upload')
      data.append('image', inputField.value.split('.')[inputField.value.split('.').length-1]);
    }

    data.append('file', inputFile);
    doFormDataRequest('POST', '/recipes', data)
    var pageContent = document.getElementById('page-content');
    pageContent.innerHTML = mainTemplate();
  }
}

////////////////////// Add ingredient /////////////////////////////
function addIngredients(){
  let ingredientsContainer = document.getElementById('recipe-create-ingredients');
  let btnAddIngredient = document.getElementById('btnAddIngredient');
  let addIngredient = function() {
    btnAddIngredient.addEventListener('click', function(e) {
      document.getElementById("btnAddIngredient").outerHTML = '';
      var container = document.createElement("div");
      container.className = 'recipe-create-single-ing';
      container.innerHTML = ingredientTemplate();
      ingredientsContainer.lastChild.appendChild(container);
      btnAddIngredient = document.getElementById('btnAddIngredient');
      addIngredient();
    })
  }
  addIngredient();
}

function accessToSingleRecipeMongo(){
  let recipes = document.getElementsByClassName('grid-cell');
  console.log(recipes)

  for (let i = 0; i<recipes.length;i++){
    console.log(recipes[i]);
    recipes[i].addEventListener('click', openSingleRecipeMongo)
  }
}


// CATEGORIES VIEW
// click on a single category and open all the recipes of that category
function clickCategory() {
  let greek = document.getElementById('greek');
  let british = document.getElementById('british');
  let indian = document.getElementById('indian');
  let japanese = document.getElementById('japanese');
  let chinese = document.getElementById('chinese');
  let thai = document.getElementById('thai');
  let italian = document.getElementById('italian');
  let mexican = document.getElementById('mexican');
  let french = document.getElementById('french');
  let spanish = document.getElementById('spanish');
  let usersrecipes = document.getElementById('usersrecipes');

  greek.addEventListener('click', openCategory);
  british.addEventListener('click', openCategory);
  indian.addEventListener('click', openCategory);
  japanese.addEventListener('click', openCategory);
  chinese.addEventListener('click', openCategory);
  thai.addEventListener('click', openCategory);
  italian.addEventListener('click', openCategory);
  mexican.addEventListener('click', openCategory);
  french.addEventListener('click', openCategory);
  spanish.addEventListener('click', openCategory);
  usersrecipes.addEventListener('click', function(){
    var pageContent = document.getElementById('page-content');
    doJSONRequest('GET', '/recipes', null, null, function(res, req){
      pageContent.innerHTML = discoverTemplate(res);
      accessToSingleRecipeMongo();
    })
  });
}

function openCategory(e) {
  var pageContent = document.getElementById('page-content');
  let recipeId = e.target.alt;
  doJSONRequest('GET', '/category/'+ recipeId, null, null, function(res, req){
    pageContent.innerHTML = discoverTemplate(res);
    accessToSingleRecipe();
  });
}

function accessToSingleRecipe(){
  let recipes = document.getElementsByClassName('grid-cell');
  for (let recipe of recipes){
    recipe.addEventListener('click', openSingleRecipe);
  }
}

function openSingleRecipe (e){
  var pageContent = document.getElementById('page-content');
  doJSONRequest('GET', '/singlerecipe/' + e.target.id, null, null, function(res, req){
    let recipe = res;
    let obj = {};
    obj.title = recipe.title;
    obj.author = 'Vanessa';
    obj.instructions = recipe.instructions;
    obj.ingredients = [];
    for (let ingr of recipe.extendedIngredients){
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = ingr.amount + " " +ingr.unit;
      obj.ingredients.push(ingredient);
    }
    obj.image = recipe.image;
    obj.comments = [];
    pageContent.innerHTML = recipeTemplate({recipe : obj});
  })
}

function openSingleRecipeMongo (e){
  var pageContent = document.getElementById('page-content');
  doJSONRequest('GET', '/recipes/' + e.target.id, null, null, function(res, req){
    console.log(res);
    let recipe = res;
    let obj = {};
    obj.title = recipe.title;
    obj.author = 'Susanna';
    obj.instructions = recipe.instructions;
    obj.ingredients = [];
    for (let ingr of recipe.ingredients){
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = ingr.amount + " " +ingr.unit;
      obj.ingredients.push(ingredient);
    }
    obj.image = recipe.image;
    obj.comments = [];
    pageContent.innerHTML = recipeTemplate({recipe : obj});
    // upvotes(e.target.id);
    // downvotes(e.target.id);
  })
}




// Upvote and dowvote the recipe
function upvotes(idRecipe) {
  const mongoose = require('mongoose');
  let upvote = document.getElementById('arrow-back');
  upvote.addEventListener('click', function(){
    doJSONRequest('GET', '/recipes/'+idRecipe, null, null, function(res, req){
      let recipe = res;
      let up = recipe.likes;
      res.update({_id:idRecipe}, {$set:{likes:up++}}, function(err, result) {
        // if (err)
        // console.log(result);
      });
    })
  })
}

function downvotes(idRecipe) {
  let downvote = document.getElementById('arrow-next');
  downvote.addEventListener('click', function(){
    doJSONRequest('GET', '/recipes/'+idRecipe, null, null, function(res, req){
      let recipe = res;
      let down = recipe.dislikes;
      res.update({_id:idRecipe}, {$set:{dislikes:down++}}, function(err, result) {
        // if (err)
        // console.log(result);
      });
    })
  })
}



// AJAX
function doJSONRequest(method, url, headers, data, callback) {
  if (arguments.length != 5) {
    throw new Error('Illegal argument count');
  }

  doRequestChecks(method, true, data);

  //create an ajax request
  const r = new XMLHttpRequest();

  //open a connection to the server using method method on the url API
  r.open(method, url, true);

  //set the headers
  doRequestSetHeaders(r, method, headers);

  //wait for the response from the server
  r.onreadystatechange = function() {
    //correctly handle the errors based on the HTTP status returned by the called API
    if (r.readyState != 4 || (r.status != 200 && r.status != 201 && r.status != 204)) {
      return;
    } else {
      if (isJSON(r.responseText))
      callback(JSON.parse(r.responseText));
      else
      callback();
    }
  };

  //set the data
  let dataToSend = null;
  if (!("undefined" == typeof data)
  && !(data === null))
  dataToSend = JSON.stringify(data);

  //send the request to the server
  r.send(dataToSend);
}

function doFormDataRequest(method, url, data) {
  var xhr = new XMLHttpRequest();
  xhr.open( method, url, true );
  // xhr.onreadystatechange = handler;
  xhr.send( data );
}

function canJSON(value) {
  try {
    const jsonString = JSON.stringify(value);
    if (!("undefined" == typeof jsonString)
    && !(jsonString === null)
    && !(jsonString == typeof String))
    return true;
    else
    return false;
  } catch (ex) {
    return false;
  }
}

function isJSON(jsonString) {

  try {
    const o = JSON.parse(jsonString);

    if (o && typeof o === "object" && o !== null) {
      return true;
    }
  }
  catch (e) {}

  return false;
}

function doRequestSetHeaders(r, method, headers) {

  //set the default JSON header according to the method parameter
  r.setRequestHeader("Accept", "application/json");

  if (method === "POST" || method === "PUT") {
    r.setRequestHeader("Content-Type", "application/json");
  }

  //set the additional headers
  if (!("undefined" == typeof headers)
  && !(headers === null)){

    for (header in headers) {
      r.setRequestHeader(header,headers[header]);
    }

  }
}

function doRequestChecks(method, isAsynchronous, data) {

  //verify the request method
  if (method!="GET" && method!="POST" && method!="PUT" && method!="DELETE") {
    throw new Error('Illegal method: ' + method + ". It should be one of: GET, POST, PUT, DELETE.");
  }

  //verify the data parameter
  if (!("undefined" == typeof data)
  && !(data === null))
  if(!canJSON(data)) {
    throw new Error('Illegal data: ' + data + ". It should be an object that can be serialized as JSON.");
  }
}
