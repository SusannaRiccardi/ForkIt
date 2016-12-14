window.onload = function() {
  var pageContent = document.getElementById('page-content');
  pageContent.innerHTML = mainTemplate();

  //menu buttons and functionality
  let btnMenu = document.getElementsByClassName('menu-btn')[0].parentNode;
  let btnCreate = document.getElementById('btn-create').parentNode;
  let btnSearchSubmit = document.getElementById('search-submit-btn');
  let btnCategories = document.getElementById('btn-categories').parentNode;
  let icons = document.getElementById('icon-carousel').getElementsByTagName('img');

  btnCategories.href = "categories";
  btnCreate.href = "create";
  btnMenu.href = "menu";

  btnMenu.addEventListener('click', displayPage);
  btnCreate.addEventListener('click', displayPage);
  btnCategories.addEventListener('click', displayPage);
  btnSearchSubmit.addEventListener('click', searchSubmit);

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
  if (href == 'search'){
    search();
  }
  if (href == 'menu'){
    pageContent.innerHTML = mainTemplate();
    icons = document.getElementById('icon-carousel').getElementsByTagName('img');
    mainSearch = document.getElementById('food');

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
  let user = document.getElementById('user-name').value;
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
  let selectHour = document.getElementById('selectHour').value;
  let selectMinutes = document.getElementById('selectMinutes').value;
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
      let ing = {};
      ing.name = names[i].value;
      ing.quantity = quantities[i].value;
      ingredients.push(ing);
    }
    let time = (Number(selectHour) * 60) + Number(selectMinutes);
    data.append('author', user);
    data.append('title', title);
    data.append('category', selectCategory);
    data.append('readyInMinutes', time);
    data.append('instructions', instructions);
    data.append('ingredients', JSON.stringify(ingredients));
    data.append('lactosefree', isDairy);
    data.append('glutenfree', isGlutenFree);
    data.append('vegan', isVegan);
    if (inputFile === undefined) {
      data.append('image', './images/cloche.jpg');
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

let history;

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
  nordic.addEventListener('click', openCategory);
  usersrecipes.addEventListener('click', openCategory);
}

let counter;
let jsonResponse;
let toRender;

function openCategory(e, back) {
  let arrowDown = document.getElementById('arrow-down');
  let arrowUp = document.getElementById('arrow-up');
  let recipeId;
  if (back === true){
    recipeId = history;
  } else {
    recipeId = e.target.alt;
    history = recipeId;
  }
  let pageContent = document.getElementById('page-content');
  counter = 0;

  if (recipeId === 'Users') {
    doJSONRequest('GET', '/recipes', null, null, function(res, req){
      jsonResponse = res;
      pageContent.innerHTML = discoverTemplate(res);
      accessToSingleRecipe();
      buttonDiscover();
    })
  } else {
    doJSONRequest('GET', '/category/'+ recipeId, null, null, function(res, req){
      jsonResponse = res;
      doJSONRequest('GET', '/recipes', null, null, function(res,req){
        let response = {results : []};
        for (let recipe of res.results){
          if ((recipe.category).toLowerCase() == recipeId.toLowerCase()){
            response.results.push(recipe);
          }
        }
        jsonResponse.results = response.results.concat(jsonResponse.results);
        toRender = jsonResponse.results.slice(counter, counter + 6);

        if (jsonResponse.results.length > counter + 6){
          counter += 6;
        }
        else {
          // Far sparire la freccia
        }

        pageContent.innerHTML = discoverTemplate({results: toRender});

        arrowD(counter);
        arrowU(counter-6);
        accessToSingleRecipe();
        buttonDiscover();
      })
    });
  }
}

function buttonDiscover() {
  let pageContent = document.getElementById('page-content');
  let backButtonDiscover = document.getElementById('back-button-discover');
  backButtonDiscover.addEventListener('click', function(e) {
    pageContent.innerHTML = categoriesTemplate();
    clickCategory();
  });
}


function arrowD(cn) {
  let arrowDown = document.getElementById('arrow-down');
  let pageContent = document.getElementById('page-content');

  arrowDown.addEventListener('click', function () {
    toRender = jsonResponse.results.slice(cn, cn + 6);

    if (jsonResponse.results.length+6 > cn + 6){
      cn += 6;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});

    if(cn >= jsonResponse.results.length){
      document.getElementById('arrow-down').style.display = 'none';
    }

    arrowD(cn);
    arrowU(cn-6);
    accessToSingleRecipe();
    buttonDiscover();
  });
}

function arrowU(cn) {
  let arrowUp = document.getElementById('arrow-up');
  let pageContent = document.getElementById('page-content');
  if(cn==0){
    document.getElementById('arrow-up').style.display = 'none';
  }

  arrowUp.addEventListener('click', function () {
    toRender = jsonResponse.results.slice(cn - 6, cn);

    if (cn-6 >= 0){
      cn = cn - 6;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});

    arrowD(cn);
    arrowU(cn);
    accessToSingleRecipe();
    buttonDiscover();
  });
}

function accessToSingleRecipe(){
  let recipes = document.getElementsByClassName('grid-cell');

  for (let i = 0; i < recipes.length; i++) {
    recipes[i].id = recipes[i].firstChild.id;
    recipes[i].addEventListener('click', function (event) {
      if((event.target.id).length == 6){
        openSingleRecipe(event, i)
      }
      else{
        openSingleRecipeMongo(event, i);
      }
    })
  }
}

function openSingleRecipe (e, activeRecipe){
  var pageContent = document.getElementById('page-content');
  let recipeApi = {};
  doJSONRequest("GET", "/api/" + e.target.id, null, null, function(res, req) {
    console.log(res);
    recipeApi.comments = res[0].comments;
    recipeApi.upvotes = res[0].upvotes;
    recipeApi.downvotes = res[0].downvotes;
  })
  doJSONRequest('GET', '/singlerecipe/' + e.target.id, null, null, function(res, req){
    let recipe = res;
    let obj = {};
    obj.activeRecipe = activeRecipe;
    obj.title = recipe.title;
    obj.author = 'FoodAPI';
    obj.instructions = recipe.instructions;
    obj.ingredients = [];
    let h = recipe.readyInMinutes / 60 | 0;
    let m = recipe.readyInMinutes % 60 | 0;
    if(h == 0){
      obj.readyInMinutes = m + " minutes";
    }
    else {
      obj.readyInMinutes = h + " hours and " + m + " minutes";
    }
    for (let ingr of recipe.extendedIngredients){
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = ingr.amount + " " +ingr.unit;
      obj.ingredients.push(ingredient);
    }

    let recipeBack = (obj.activeRecipe - 1 < 0) ? jsonResponse.results.length - 1 : obj.activeRecipe - 1;
    let recipeNext = (obj.activeRecipe + 1 > jsonResponse.results.length - 1) ? 0 : obj.activeRecipe + 1;

    obj.image = {
      actual:recipe.image
    };

    obj.comments = recipeApi.comments;
    obj.upvotes = recipeApi.upvotes;
    obj.downvotes = recipeApi.downvotes;

    pageContent.innerHTML = recipeTemplate({recipe : obj});
    let arrowBack = document.getElementById('arrow-back');
    let arrowNext = document.getElementById('arrow-next');
    let backButton = document.getElementById('back-button');

    arrowEvtListener(arrowBack,recipeBack);
    arrowEvtListener(arrowNext,recipeNext);
    backButton.addEventListener('click', function(e) {
      openCategory(e, true);
    });

    upvotesApi(e.target.id);
    downvotesApi(e.target.id);
    commentRecipeApi(e.target.id);
  })
}


// Upvote and dowvote the recipe
function upvotesApi(idRecipe) {
  let upvote = document.getElementById('up');
  upvote.id = idRecipe;
  upvote.addEventListener('click', function(e){
    if (localStorage.getItem(idRecipe) == null) {
      localStorage.setItem(idRecipe, 1);
      doJSONRequest('GET', '/api/' + idRecipe, null, null, function(res, req) {
        let recipe = res[0];
        let up = recipe.upvotes + 1;
        let down = recipe.downvotes;
        doJSONRequest('PUT', '/api/' + idRecipe, null, {upvotes : up}, function(){
          openSingleRecipe(e);
        });
      })
    } else {
      alert('You already voted');
    }
  })
}

function downvotesApi(idRecipe) {
  let downvote = document.getElementById('down');
  downvote.id = idRecipe;
  downvote.addEventListener('click', function(e){
    if (localStorage.getItem(idRecipe) == null) {
      doJSONRequest('GET', '/api/'+idRecipe, null, null, function(res, req){
        let recipe = res[0];
        let up = recipe.upvotes;
        let down = recipe.downvotes + 1;
        doJSONRequest('PUT', '/api/'+idRecipe, null, {downvotes : down}, function(){
          openSingleRecipe(e);
        });
      })
    } else {
      alert('You already voted');
    }
  })
}

function commentRecipeApi(idRecipe) {
  let commentSubmit = document.getElementById('submit-comment');
  commentSubmit.id = idRecipe;
  let comment = document.getElementById('comment');
  let username = document.getElementById('username');
  commentSubmit.addEventListener('click', function(e){
    if(comment.value == ''){
      alert('You have to insert a comment before submit');
    }
    else {
      if (username.value == '') {
        username.value = 'Anonymous'
      }
      doJSONRequest('PUT', '/api/'+idRecipe, null, {username: username.value, comment : comment.value}, function(){
        openSingleRecipe(e);
      });
    }
  })

}


function arrowEvtListener(dom, index) {
    dom.addEventListener('click', function () {
      let target;
      if(jsonResponse.results[index].id){
        target = {target: {id: jsonResponse.results[index].id}};
        openSingleRecipe(target, index)
      }
      else {
        target = {target: {id: jsonResponse.results[index]._id}};
        openSingleRecipeMongo(target, index)
      }
    })
}

function openSingleRecipeMongo (e, activeRecipe){
  var pageContent = document.getElementById('page-content');
  doJSONRequest('GET', '/recipes/' + e.target.id, null, null, function(res, req){
    let recipe = res;
    let obj = {};
    obj.activeRecipe = activeRecipe;
    obj.title = recipe.title;
    obj.author = recipe.author;
    obj.instructions = recipe.instructions;
    obj.upvotes = recipe.upvotes;
    obj.downvotes = recipe.downvotes;
    obj.ingredients = [];
    obj.comments = recipe.comments;
    let h = recipe.readyInMinutes / 60 | 0;
    let m = recipe.readyInMinutes % 60 | 0;
    if(h == 0){
      obj.readyInMinutes = m + " minutes";
    }
    else {
      obj.readyInMinutes = h + " hours and " + m + " minutes";
    }
    for (let ingr of recipe.ingredients){
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = ingr.quantity;
      obj.ingredients.push(ingredient);
    }
    if(recipe.image == './images/cloche.jpg'){
      obj.image = {actual: './images/cloche.jpg'};
    }
    else {
      obj.image = {
        actual:'./uploads/' + recipe._id + '.' + recipe.image
      };
    }
    pageContent.innerHTML = recipeTemplate({recipe : obj});
    let recipeBack = (obj.activeRecipe - 1 < 0) ? jsonResponse.results.length - 1 : obj.activeRecipe - 1;
    let recipeNext = (obj.activeRecipe + 1 > jsonResponse.results.length - 1) ? 0 : obj.activeRecipe + 1;

    let arrowBack = document.getElementById('arrow-back');
    let arrowNext = document.getElementById('arrow-next');
    let backButton = document.getElementById('back-button');
    arrowEvtListener(arrowBack,recipeBack);
    arrowEvtListener(arrowNext,recipeNext);
    backButton.addEventListener('click', function(e) {
      openCategory(e, true);
    });

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
  counter = 0;

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
    toRender = jsonResponse.results.slice(counter, counter + 6);

    if (jsonResponse.results.length > counter + 6){
      counter += 6;
    }
    else {
      counter = 0;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});
    arrowDown = document.getElementById('arrow-down');
    document.getElementById('back-button-discover').style.display = 'none';
    arrowU(counter);
    arrowD(counter);
    accessToSingleRecipe();
  })

}


// Upvote and dowvote the recipe
function upvotes(idRecipe) {
  let upvote = document.getElementById('up');
  upvote.id = idRecipe;
  upvote.addEventListener('click', function(e){
    doJSONRequest('GET', '/recipes/'+idRecipe, null, null, function(res, req){
      let recipe = res;
      let up = recipe.upvotes + 1;
      let down = recipe.downvotes;
      doJSONRequest('PUT', '/recipes/'+idRecipe, null, {upvotes : up}, function(){
        openSingleRecipeMongo(e);
      });
    })
  })
}

function downvotes(idRecipe) {
  let downvote = document.getElementById('down');
  downvote.id = idRecipe;
  downvote.addEventListener('click', function(e){
    doJSONRequest('GET', '/recipes/'+idRecipe, null, null, function(res, req){
      let recipe = res;
      let up = recipe.upvotes;
      let down = recipe.downvotes + 1;
      doJSONRequest('PUT', '/recipes/'+idRecipe, null, {downvotes : down}, function(){
        openSingleRecipeMongo(e);
      });
    })
  })
}

function commentRecipe(idRecipe) {
  let commentSubmit = document.getElementById('submit-comment');
  commentSubmit.id = idRecipe;
  let username = document.getElementById('username');
  let comment = document.getElementById('comment');

  commentSubmit.addEventListener('click', function(e){
    if(comment.value == ''){
      alert('You have to insert a comment before submit');
    } else {
      if (username.value == '') {
        username.value = 'Anonymous'
      }
      doJSONRequest('PUT', '/recipes/'+idRecipe, null, {username: username.value, comment : comment.value}, function(){
        openSingleRecipeMongo(e);
      });
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
  var pageContent = document.getElementById('page-content');
  counter = 0;

  let parameters = "/search?name=" + category + "&ingredient=";


  doJSONRequest("GET", parameters, null, null, function(res, req) {
    jsonResponse = res;
    toRender = jsonResponse.results.slice(counter, counter + 6);

    if (jsonResponse.results.length > counter + 6){
      counter += 6;
    }
    else {
      counter = 0;
    }

    pageContent.innerHTML = discoverTemplate({results: toRender});
    arrowDown = document.getElementById('arrow-down');

    arrowDownEvListener();
    accessToSingleRecipe();
  })

}
