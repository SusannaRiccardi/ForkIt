window.onload = function() {
  var pageContent = document.getElementById('page-content');
  pageContent.innerHTML = mainTemplate();

  //menu buttons and functionality
  let btnMenu = document.getElementsByClassName('menu-btn')[0].parentNode;
  // let btnMain = document.getElementById('btn-about').parentNode;
  let btnCreate = document.getElementById('btn-create').parentNode;
  let btnDiscover = document.getElementById('btn-discover').parentNode;
  // let btnAbout = document.getElementById('btn-about').parentNode;
  let btnSearchSubmit = document.getElementById('search-submit-btn');
  let btnCategories = document.getElementById('btn-categories').parentNode;
  let icons = document.getElementById('icon-carousel').getElementsByTagName('img');
  let mainSearch = document.getElementById('food');

  btnCategories.href = "categories";
  btnCreate.href = "create";
  btnDiscover.href = "discover";
  // btnAbout.href = "about";
  btnMenu.href = "menu";

  btnMenu.addEventListener('click', displayPage);
  btnCreate.addEventListener('click', displayPage);
  btnDiscover.addEventListener('click', displayPage);
  // btnAbout.addEventListener('click', displayPage);
  btnCategories.addEventListener('click', displayPage);
  btnSearchSubmit.addEventListener('click', searchSubmit);
  mainSearch.addEventListener('keyup', function(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
        mainIconsEvtListener(mainSearch.value);
    }
  });
  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', function() {
      mainIconsEvtListener(icons[i].getAttribute('id'));
    });
  }


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
    icons = document.getElementById('icon-carousel').getElementsByTagName('img');
    mainSearch = document.getElementById('food');
    mainSearch.addEventListener('keyup', function(e) {
      e.preventDefault();
      if (e.keyCode == 13) {
        mainIconsEvtListener(mainSearch.value);
      }
    });
    for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', function() {
      mainIconsEvtListener(icons[i].getAttribute('id'));
    });
  }
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

  for (let i = 0; i<recipes.length;i++){
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
  let nordic = document.getElementById('nordic');
  let jewish = document.getElementById('jewish');
  // let usersrecipes = document.getElementById('usersrecipes');

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
  nordic.addEventListener('click', openCategory);
  jewish.addEventListener('click', openCategory);


  // usersrecipes.addEventListener('click', function(){
  //   var pageContent = document.getElementById('page-content');
  //   doJSONRequest('GET', '/recipes', null, null, function(res, req){
  //     pageContent.innerHTML = discoverTemplate(res);
  //     accessToSingleRecipeMongo();
  //   })
  // });
}

let jsonResponse;
let jsonResponseCounter;
let toRender;
let arrowDown;
let pageContent;

function openCategory(e) {
  let recipeId = e.target.alt;
  pageContent = document.getElementById('page-content');
  jsonResponseCounter = 0;

  doJSONRequest('GET', '/category/'+ recipeId, null, null, function(res, req){
    jsonResponse = res;
    toRender = jsonResponse.results.slice(jsonResponseCounter, jsonResponseCounter + 6);

    if (jsonResponse.results.length > jsonResponseCounter + 6){
      jsonResponseCounter += 6;
    }
    else {
      jsonResponseCounter = 0;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});
    arrowDown = document.getElementById('arrow-down');

    arrowDownEvListener();
    accessToSingleRecipe();
  });
}

function arrowDownEvListener() {
  arrowDown = document.getElementById('arrow-down');
  pageContent = document.getElementById('page-content');

  arrowDown.addEventListener('click', function () {
    toRender = jsonResponse.results.slice(jsonResponseCounter, jsonResponseCounter + 6);

    if (jsonResponse.results.length > jsonResponseCounter + 6){
      jsonResponseCounter += 6;
    }
    else {
      jsonResponseCounter = 0;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});

    arrowDownEvListener();
    accessToSingleRecipe();
  });
}

function accessToSingleRecipe(){
  let recipes = document.getElementsByClassName('grid-cell');

  for (let i = 0; i < recipes.length; i++) {
    recipes[i].onclick = function () {
      openSingleRecipe(event, i)
    }
  }
}

function openSingleRecipe (e, activeRecipe){
  var pageContent = document.getElementById('page-content');
  doJSONRequest('GET', '/singlerecipe/' + e.target.id, null, null, function(res, req){
    let recipe = res;
    let obj = {};
    obj.activeRecipe = activeRecipe;
    obj.title = recipe.title;
    obj.author = '';
    obj.instructions = recipe.instructions;
    obj.ingredients = [];
    for (let ingr of recipe.extendedIngredients){
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = ingr.amount + " " +ingr.unit;
      obj.ingredients.push(ingredient);
    }

    let recipeBack = (obj.activeRecipe - 1 < 0) ? jsonResponse.results.length - 1 : obj.activeRecipe - 1;
    let recipeNext = (obj.activeRecipe + 1 > jsonResponse.results.length - 1) ? 0 : obj.activeRecipe + 1;

    obj.image = {
      actual:recipe.image,
      back:jsonResponse.baseUri + jsonResponse.results[recipeBack].image,
      next: jsonResponse.baseUri + jsonResponse.results[recipeNext].image
    };

    obj.comments = [];
    pageContent.innerHTML = recipeTemplate({recipe : obj});

    let arrowBack = document.getElementById('arrow-back');
    let arrowNext = document.getElementById('arrow-next');

    arrowEvtListener(arrowBack,recipeBack);
    arrowEvtListener(arrowNext,recipeNext);
  })
}

function arrowEvtListener(dom, index) {
    dom.addEventListener('click', function () {
      let target = {target: {id: jsonResponse.results[index].id}};
      openSingleRecipe(target, index)
    })
}

function openSingleRecipeMongo (e){
  var pageContent = document.getElementById('page-content');
  doJSONRequest('GET', '/recipes/' + e.target.id, null, null, function(res, req){
    let recipe = res;
    let obj = {};
    obj.title = recipe.title;
    obj.author = '';
    obj.instructions = recipe.instructions;
    obj.ingredients = [];
    for (let ingr of recipe.ingredients){
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = ingr.amount + " " +ingr.unit;
      obj.ingredients.push(ingredient);
    }
    obj.image = {
      actual:'./uploads/' + recipe._id + '.' + recipe.image
    };
    obj.comments = [];
    pageContent.innerHTML = recipeTemplate({recipe : obj});
    upvotes(e.target.id);
    downvotes(e.target.id);
    commentRecipe(e.target.id);
  })
}


//SEARCHRECIPE
// When clicking on search it looks for the recipes you want to find
function searchSubmit(e) {
  e.preventDefault();
  var pageContent = document.getElementById('page-content');
  let searchName = document.getElementById('searchName').value;
  let excludeField = document.getElementById('excludeField').value;
  pageContent = document.getElementById('page-content');
  jsonResponseCounter = 0;

  let c1 = document.getElementById("c1").checked;
  let c2 = document.getElementById("c2").checked;
  let c3 = document.getElementById("c3").checked;


  let parameters = "/search?name=" + searchName + "&ingredient=" + excludeField

  if(c1 && c2){
    parameters+= "&intolerances=" + document.getElementById("c1").name + "," + document.getElementById("c2").name;
  }
  else if (c1){
    parameters+= "&intolerances=" + document.getElementById("c1").name;
  }
  else if (c2){
    parameters+= "&intolerances=" + document.getElementById("c2").name;
  }

  if(c3){
    parameters+= "&diet=" + document.getElementById("c3").name;
  }

  doJSONRequest("GET", parameters, null, null, function(res, req) {
    jsonResponse = res;
    toRender = jsonResponse.results.slice(jsonResponseCounter, jsonResponseCounter + 6);

    if (jsonResponse.results.length > jsonResponseCounter + 6){
      jsonResponseCounter += 6;
    }
    else {
      jsonResponseCounter = 0;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});
    arrowDown = document.getElementById('arrow-down');

    arrowDownEvListener();
    accessToSingleRecipe();
  })

}


// Upvote and dowvote the recipe
function upvotes(idRecipe) {
  let upvote = document.getElementById('arrow-back');
  upvote.addEventListener('click', function(){
    doJSONRequest('GET', '/recipes/'+idRecipe, null, null, function(res, req){
      let recipe = res;
      let up = recipe.upvotes + 1;
      let down = recipe.downvotes;
      doJSONRequest('PUT', '/recipes/'+idRecipe, null, {upvotes : up}, function(){});
    })
  })
}

function downvotes(idRecipe) {
  let downvote = document.getElementById('arrow-next');
  downvote.addEventListener('click', function(){
    doJSONRequest('GET', '/recipes/'+idRecipe, null, null, function(res, req){
      let recipe = res;
      let up = recipe.upvotes;
      let down = recipe.downvotes + 1;
      doJSONRequest('PUT', '/recipes/'+idRecipe, null, {downvotes : down}, function(){});
    })
  })
}

function commentRecipe(idRecipe) {
  let commentSubmit = document.getElementById('submit-comment');
  let comment = document.getElementById('comment');
  console.log(comment.value);
  commentSubmit.addEventListener('click', function(){
    if(comment.value == ''){
      alert('You have to insert a comment before submit');
    }
    else {
      doJSONRequest('PUT', '/recipes/'+idRecipe, null, {comment : comment.value}, function(){});
    }
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

function mainIconsEvtListener(category) {
  console.log(category)
  var pageContent = document.getElementById('page-content');
  jsonResponseCounter = 0;

  let parameters = "/search?name=" + category + "&ingredient=";


  doJSONRequest("GET", parameters, null, null, function(res, req) {
    jsonResponse = res;
    toRender = jsonResponse.results.slice(jsonResponseCounter, jsonResponseCounter + 6);

    if (jsonResponse.results.length > jsonResponseCounter + 6){
      jsonResponseCounter += 6;
    }
    else {
      jsonResponseCounter = 0;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});
    arrowDown = document.getElementById('arrow-down');

    arrowDownEvListener();
    accessToSingleRecipe();
  })

}