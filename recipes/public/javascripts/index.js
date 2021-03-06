window.onload = function() {
  // Display main page.
  var pageContent = document.getElementById('page-content');
  pageContent.innerHTML = mainTemplate();

  // Icons in the main view.
  let icons = document.getElementById('icon-carousel').getElementsByTagName('img');
  for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', function() {
      iconsMainClick(icons[i].getAttribute('id'));
    });
  }

  // Menuwrapper: list of buttons in the menu.
  let menuwrapper = document.getElementById('menuwrapper');
  let menuBtnFont = document.getElementsByClassName('btn-img')[0].getElementsByTagName('i')[0];

  menuwrapper.addEventListener('mouseenter', function() {
    menuBtnFont.setAttribute('Style', '-ms-transform: rotate(90deg); -webkit-transform: rotate(90deg); transform: rotate(90 deg);');
    document.getElementsByClassName('btn-text')[0].innerHTML = 'HOME';
  });

  menuwrapper.addEventListener('mouseleave', function() {
    menuBtnFont.removeAttribute('Style');
    document.getElementsByClassName('btn-text')[0].innerHTML = 'MENU';
  });

  // Select buttons in the website and add event listener.
  let btnMenu = document.getElementsByClassName('menu-btn')[0].parentNode;
  let btnCategories = document.getElementById('btn-categories').parentNode;
  let btnSearchSubmit = document.getElementById('search-submit-btn');
  let btnCreate = document.getElementById('btn-create').parentNode;
  let btnBestRecipe = document.getElementById('btn-about').parentNode;
  let inputField = document.getElementsByTagName('input');

  btnCategories.href = "categories";
  btnCreate.href = "create";
  btnMenu.href = "menu";
  btnBestRecipe.href = "bestRecipe";

  btnMenu.addEventListener('click', displayPage);
  btnCreate.addEventListener('click', displayPage);
  btnCategories.addEventListener('click', displayPage);
  btnBestRecipe.addEventListener('click', displayPage);
  btnSearchSubmit.addEventListener('click', searchSubmit);
}

// === global variables ===
let history;
let counter;
let jsonResponse;
let toRender;
let parameterSearch;

// === scrollToTop ===
// Scroll to the top of the page.
function scrollToTop() {
  window.scrollTo(0, 0);
}

// === showToast ===
// Alert messages
function showToast() {
    var x = document.getElementById("toast")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// === displayPage ===
// Display the different views when the menu buttons are clicked.
function displayPage(e){
  e.preventDefault();
  var pageContent = document.getElementById('page-content');
  let href = e.target.href.split('/').pop();
  // Click on 'menu':
  if (href == 'menu') {
    pageContent.innerHTML = mainTemplate();
    icons = document.getElementById('icon-carousel').getElementsByTagName('img');

    for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener('click', function() {
      iconsMainClick(icons[i].getAttribute('id'));
    });
    }
  }
  // Click on 'search':
  if (href == 'search') {
    search();
  }
  // Click on 'categories':
  if (href == 'categories') {
    pageContent.innerHTML = categoriesTemplate();
    clickCategory();
    scrollToTop();
  }
  // Click on 'create':
  if (href == 'create') {
    pageContent.innerHTML = createTemplate();
    displayCreate();
    scrollToTop();
  }
  // Click on 'best recipe'
  if (href == 'bestRecipe') {
    findBestRecipe();
  }
}

// === iconsMainClick ===
// When click on icon on main view, open set category.
function iconsMainClick(category) {
  history = category;
  var pageContent = document.getElementById('page-content');
  counter = 0;
  let parameters = "/search?name=" + category + "&ingredient=";

  doJSONRequest("GET", parameters, null, null, function(res, req) {
    jsonResponse = res;
    toRender = jsonResponse.results.slice(counter, counter + 6);
    if (jsonResponse.results.length > counter + 6){
      counter += 6;
    } else {
      counter = 0;
    }
    pageContent.innerHTML = discoverTemplate({results: toRender});
    arrowDown = document.getElementById('arrow-down');
    arrowU(counter-6);
    arrowD(counter);
    let backButtonMain = document.getElementById('back-button-discover');
    backButtonMain.addEventListener('click', function() {
      pageContent.innerHTML = mainTemplate();
      icons = document.getElementById('icon-carousel').getElementsByTagName('img');

      for (let i = 0; i < icons.length; i++) {
      icons[i].addEventListener('click', function() {
        iconsMainClick(icons[i].getAttribute('id'));
      });
      }
    })
    accessToSingleRecipe();
  })
}

// =================== SEARCH ===================
// === searchSubmit ===
// When click on search, look for the searched recipes.
function searchSubmit(e, back) {
  e.preventDefault();
  var pageContent = document.getElementById('page-content');
  let searchName = document.getElementById('searchName').value;
  let excludeField = document.getElementById('excludeField').value;
  let c1 = document.getElementById("c1").checked;
  let c2 = document.getElementById("c2").checked;
  let c3 = document.getElementById("c3").checked;
  counter = 0;
  let parameters;
  if (back == true) {
    parameters = parameterSearch;
  } else {
    parameters = "/search?name=" + searchName + "&ingredient=" + excludeField;
    parameterSearch = parameters;
  }

  if (c1 && c2) {
    parameters+= "&intolerances=" + document.getElementById("c1").name + "," + document.getElementById("c2").name;
  } else if (c1) {
    parameters+= "&intolerances=" + document.getElementById("c1").name;
  } else if (c2) {
    parameters+= "&intolerances=" + document.getElementById("c2").name;
  }
  if (c3) {
    parameters+= "&diet=" + document.getElementById("c3").name;
  }

  doJSONRequest("GET", parameters, null, null, function(res, req) {
    jsonResponse = res;
    toRender = jsonResponse.results.slice(counter, counter + 6);
    if (jsonResponse.results.length > counter + 6){
      counter += 6;
    } else {
      counter = 0;
    }
    history = 'search';
    pageContent.innerHTML = discoverTemplate({results: toRender});
    backButtonDiscover();
    arrowU(counter-6);
    arrowD(counter);
    accessToSingleRecipe();
    scrollToTop();
  })
}

// =================== CATEGORIES ===================
// === clickCategory ===
// Click on a single category and open all the recipes of that category.
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

// === openCategory ===
// Makes requests to open the single category clicked.
function openCategory(e, back) {
  let recipeCategory;
  // History for the back button.
  if (back === true) {
    recipeCategory = history;
  } else {
    recipeCategory = e.target.alt;
    history = recipeCategory;
  }

  var pageContent = document.getElementById('page-content');
  let arrowDown = document.getElementById('arrow-down');
  let arrowUp = document.getElementById('arrow-up');
  counter = 0;

  // User category:
  if (recipeCategory === 'Users') {
    doJSONRequest('GET', '/recipes', null, null, function(res, req) {
      jsonResponse = res;
      toRender = jsonResponse.results.slice(counter, counter + 6);
      if (jsonResponse.results.length > counter + 6){
        counter += 6;
      }
      pageContent.innerHTML = discoverTemplate({results : toRender});
      arrowD(counter);
      arrowU(counter-6);
      accessToSingleRecipe();
      backButtonDiscover();
      scrollToTop();
    })
  } else if (recipeCategory === 'search') {
    searchSubmit(e, true);
  } else {
    // All other categories:
    doJSONRequest('GET', '/category/' + recipeCategory, null, null, function(res, req) {
      jsonResponse = res;
      doJSONRequest('GET', '/recipes', null, null, function(res,req) {
        let response = {results : []};
        for (let recipe of res.results) {
          if ((recipe.category).toLowerCase() == recipeCategory.toLowerCase()) {
            response.results.push(recipe);
          }
        }
        // Show six recipes:
        jsonResponse.results = response.results.concat(jsonResponse.results);
        toRender = jsonResponse.results.slice(counter, counter + 6);
        if (jsonResponse.results.length > counter + 6){
          counter += 6;
        }

        pageContent.innerHTML = discoverTemplate({results: toRender});
        arrowD(counter);
        arrowU(counter-6);
        accessToSingleRecipe();
        backButtonDiscover();
        scrollToTop();
      })
    });
  }
}

// === arrowD ===
// When clicking on the arrow down in the list of recipes, show other six recipes.
function arrowD(cn) {
  let arrowDown = document.getElementById('arrow-down');
  let pageContent = document.getElementById('page-content');

  arrowDown.addEventListener('click', function () {
    toRender = jsonResponse.results.slice(cn, cn + 6);
    if (jsonResponse.results.length+6 > cn + 6){
      cn += 6;
    }
    pageContent.innerHTML = discoverTemplate({results: toRender});

    // Remove arrow when no more recipes.
    if (cn >= jsonResponse.results.length) {
      document.getElementById('arrow-down').style.visibility = 'hidden';
    }

    arrowD(cn);
    arrowU(cn-6);
    accessToSingleRecipe();
    backButtonDiscover();
  });
}

// === arrowU ===
// When clicking on the arrow up in the list of recipes, show other six recipes.
function arrowU(cn) {
  let arrowUp = document.getElementById('arrow-up');
  let pageContent = document.getElementById('page-content');

  // Remove arrow when no more recipes.
  if (cn == 0) {
    document.getElementById('arrow-up').style.visibility = 'hidden';
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
    backButtonDiscover();
  });
}

// === backButtonDiscover ===
// Button to go back from the list of recipes to the categories view.
function backButtonDiscover() {
  let pageContent = document.getElementById('page-content');
  let buttonDiscover = document.getElementById('back-button-discover');
  buttonDiscover.addEventListener('click', function(e) {
    pageContent.innerHTML = categoriesTemplate();
    clickCategory();
    scrollToTop();
  });
}

// === accessToSingleRecipe ===
// When click on a recipe, open the single recipe view.
function accessToSingleRecipe(){
  let recipes = document.getElementsByClassName('grid-cell');

  for (let i = 0; i < recipes.length; i++) {
    recipes[i].id = recipes[i].firstChild.id;
    recipes[i].addEventListener('click', function (event) {
      let id = event.target.id;
      // Open recipe from API:
      if ((event.target.id).length <= 10) {
        console.log(jsonResponse);
        for(let i=0; i<jsonResponse.results.length; i++){
          if(id == jsonResponse.results[i].id){
            console.log(i);
            openSingleRecipe(event, i);
          }
        }
      }
      else {
        for(let i=0; i<jsonResponse.results.length; i++){
          if(id == jsonResponse.results[i]._id){
            openSingleRecipeMongo(event, i);
          }
        }
      }
    })
  }
}

// === openSingleRecipe ===
// Open single recipe from foodAPI.
function openSingleRecipe (e, index) {
  var pageContent = document.getElementById('page-content');
  let recipeApi = {};
  doJSONRequest("GET", "/api/" + e.target.id, null, null, function(res, req) {
    recipeApi.comments = res[0].comments;
    recipeApi.upvotes = res[0].upvotes;
    recipeApi.downvotes = res[0].downvotes;
  })
  doJSONRequest('GET', '/singlerecipe/' + e.target.id, null, null, function(res, req) {
    let recipe = res;
    let obj = {};
    obj.title = recipe.title;
    obj.author = 'FoodAPI';
    obj.instructions = recipe.instructions;
    obj.ingredients = [];
    let h = recipe.readyInMinutes / 60 | 0;
    let m = recipe.readyInMinutes % 60 | 0;
    if (h == 0) {
      obj.readyInMinutes = m + " minutes";
    } else {
      obj.readyInMinutes = h + " hours and " + m + " minutes";
    }
    obj.comments = recipeApi.comments;
    obj.upvotes = recipeApi.upvotes;
    obj.downvotes = recipeApi.downvotes;
    for (let ingr of recipe.extendedIngredients) {
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = Math.round(ingr.amount * 100)/100 + " " +ingr.unit;
      obj.ingredients.push(ingredient);
    }
    obj.lactosefree = obj.dairyFree;
    obj.glutenfree = recipe.glutenFree;
    obj.vegan = recipe.vegan;
    obj.image = {
      actual:recipe.image
    };
    pageContent.innerHTML = recipeTemplate({recipe : obj});

    // Change button upvote and downvote colors.
    if (localStorage.getItem(recipe.id) === 'up') {
      document.getElementById("up").style.color = "#4CAF50";
    } else if (localStorage.getItem(recipe.id) === "down") {
      document.getElementById("down").style.color = "#D32F2F";
    }

    if (recipe.glutenFree === true) {
      document.getElementById("glutenfree").className = "i fa fa-check fa-1x";
      document.getElementById("glutenfree").style.color = 'green';
    } else {
      document.getElementById("glutenfree").style.color = 'red';
    }
    if (recipe.dairyFree === true) {
      document.getElementById("dairyfree").className = "i fa fa-check fa-1x";
      document.getElementById("dairyfree").style.color = 'green';
    } else {
      document.getElementById("dairyfree").style.color = 'red';
    }
    if (recipe.vegan === true) {
      document.getElementById("vegan").className = "i fa fa-check fa-1x";
      document.getElementById("vegan").style.color = 'green';
    } else {
      document.getElementById("vegan").style.color = 'red';
    }

    let backButton = document.getElementById('back-button');

    backButton.addEventListener('click', function(e) {
      if (history == 'chinese' || history == 'bread' || history == 'cake' || history == 'drink') {
        iconsMainClick(history);
      } else {
        openCategory(e, true);
      }
    });

    arrowsEvent(index-1, index+1);
    upvotesApi(e.target.id, index);
    downvotesApi(e.target.id, index);
    commentRecipeApi(e.target.id, index);
  })
}

// === openSingleRecipeMongo ===
// Open single recipe from database.
function openSingleRecipeMongo (e, index) {
  console.log(index);
  var pageContent = document.getElementById('page-content');
  doJSONRequest('GET', '/recipes/' + e.target.id, null, null, function(res, req) {
    let recipe = res;
    let obj = {};
    obj.title = recipe.title;
    obj.author = recipe.author;
    obj.instructions = recipe.instructions;
    obj.upvotes = recipe.upvotes;
    obj.downvotes = recipe.downvotes;
    obj.ingredients = [];
    obj.comments = recipe.comments;
    let h = recipe.readyInMinutes / 60 | 0;
    let m = recipe.readyInMinutes % 60 | 0;
    if (h == 0) {
      obj.readyInMinutes = m + " minutes";
    } else {
      obj.readyInMinutes = h + " hours and " + m + " minutes";
    }
    for (let ingr of recipe.ingredients) {
      let ingredient = {};
      ingredient.name = ingr.name;
      ingredient.quantity = ingr.quantity;
      obj.ingredients.push(ingredient);
    }
    if(recipe.image == './images/cloche.jpg'){
      obj.image = {actual: './images/cloche.jpg'};
    } else {
      obj.image = {
        actual:'./uploads/' + recipe._id + '.' + recipe.image
      };
    }
    obj.lactosefree = obj.lactosefree;
    obj.glutenfree = recipe.glutenfree;
    obj.vegan = recipe.vegan;

    pageContent.innerHTML = recipeTemplate({recipe : obj});

    // Change button upvote and downvote colors.
    if (localStorage.getItem(recipe._id) == 'up') {
      document.getElementById("up").style.color = "#4CAF50";
    } else if (localStorage.getItem(recipe._id) === "down") {
      document.getElementById("down").style.color = "#D32F2F";
    }

    if (recipe.glutenfree === true) {
      document.getElementById("glutenfree").className = "i fa fa-check fa-1x";
      document.getElementById("glutenfree").style.color = 'green';
    } else {
      document.getElementById("glutenfree").style.color = 'red';
    }
    if (recipe.lactosefree === true) {
      document.getElementById("dairyfree").className = "i fa fa-check fa-1x";
      document.getElementById("dairyfree").style.color = 'green';
    } else {
      document.getElementById("dairyfree").style.color = 'red';
    }
    if (recipe.vegan === true) {
      document.getElementById("vegan").className = "i fa fa-check fa-1x";
      document.getElementById("vegan").style.color = 'green';
    } else {
      document.getElementById("vegan").style.color = 'red';
    }

    let backButton = document.getElementById('back-button');

    backButton.addEventListener('click', function(e) {
      openCategory(e, true);
    });

    arrowsEvent(index-1, index+1);
    upvotes(e.target.id, index);
    downvotes(e.target.id, index);
    console.log(index);
    commentRecipe(e.target.id, index);
  })
}

// === arrowsEvent ===
// Go to the previous or next recipe
function arrowsEvent(prev, next){
  let arrowBack = document.getElementById('arrow-back');
  let arrowNext = document.getElementById('arrow-next');

  if(prev < 0){
    document.getElementById('arrow-back').style.visibility = 'hidden';
  }
  if(next > jsonResponse.results.length-1){
    document.getElementById('arrow-next').style.visibility = 'hidden';
  }

  arrowBack.addEventListener('click', function(e){
    let previousRecipe = jsonResponse.results[prev];
    if(previousRecipe.id){
      arrowBack.id = previousRecipe.id;
      openSingleRecipe(e, prev);
    }
    else {
      arrowBack.id = previousRecipe._id;
      openSingleRecipeMongo(e, prev);
    }
  })

  arrowNext.addEventListener('click', function(e){
    let nextRecipe = jsonResponse.results[next];
    if(nextRecipe.id){
      arrowNext.id = nextRecipe.id;
      openSingleRecipe(e, next);
    }
    else {
      arrowNext.id = nextRecipe._id;
      openSingleRecipeMongo(e, next);
    }
  })
}


// === upvotesApi ===
// Upvote the recipe in the foodAPI.
function upvotesApi(idRecipe, index) {
  let upvote = document.getElementById('up');
  upvote.id = idRecipe;
  upvote.addEventListener('click', function(e) {
    if (localStorage.getItem(idRecipe) == null) {
      console.log("CLICCHI UP, HAI NULL")
      localStorage.setItem(idRecipe, "up");
      doJSONRequest('GET', '/api/' + idRecipe, null, null, function(res, req) {
        let recipe = res[0];
        let up = recipe.upvotes + 1;
        let down = recipe.downvotes;
        doJSONRequest('PUT', '/api/' + idRecipe, null, {upvotes : up}, function() {
          openSingleRecipe(e, index);
        });
      })
    }
    else if (localStorage.getItem(idRecipe) == 'up'){
      console.log("CLICCHI UP, HAI UP")
      localStorage.removeItem(idRecipe);
      doJSONRequest('GET', '/api/' + idRecipe, null, null, function(res, req) {
        let recipe = res[0];
        let up = recipe.upvotes - 1;
        let down = recipe.downvotes;
        doJSONRequest('PUT', '/api/' + idRecipe, null, {upvotes : up}, function() {
          openSingleRecipe(e, index);
        });
      })
    }
    else if(localStorage.getItem(idRecipe) == 'down'){
      console.log("CLICCHI UP, HAI DOWN")
      localStorage.setItem(idRecipe, 'up');
      doJSONRequest('GET', '/api/' + idRecipe, null, null, function(res, req) {
        let recipe = res[0];
        let up = recipe.upvotes + 1;
        let down = recipe.downvotes - 1;
        doJSONRequest('PUT', '/api/' + idRecipe, null, {upvotes : up, downvotes : down}, function() {
          openSingleRecipe(e, index);
        });
      })
    }
  })
}

// === downvotesApi ===
// Downvote the recipe in the foodAPI.
function downvotesApi(idRecipe, index) {
  let downvote = document.getElementById('down');
  downvote.id = idRecipe;
  downvote.addEventListener('click', function(e) {
    if (localStorage.getItem(idRecipe) == null) {
      console.log("CLICCHI DOWN, HAI NULL")
      localStorage.setItem(idRecipe, "down");
      doJSONRequest('GET', '/api/' + idRecipe, null, null, function(res, req) {
        let recipe = res[0];
        let up = recipe.upvotes;
        let down = recipe.downvotes + 1;
        console.log(recipe.downvotes);
        doJSONRequest('PUT', '/api/' + idRecipe, null, {downvotes : down}, function() {
          console.log(recipe.downvotes);
          openSingleRecipe(e, index);
        });
      })
    }
    else if (localStorage.getItem(idRecipe) == 'down') {
      console.log("CLICCHI DOWN, HAI DOWN")
      localStorage.removeItem(idRecipe);
      doJSONRequest('GET', '/api/' + idRecipe, null, null, function(res, req) {
        let recipe = res[0];
        let up = recipe.upvotes;
        let down = recipe.downvotes - 1;
        console.log(recipe.downvotes);
        doJSONRequest('PUT', '/api/' + idRecipe, null, {downvotes : down}, function() {
          console.log(recipe.downvotes);
          openSingleRecipe(e, index);
        });
      })
    }
    else if (localStorage.getItem(idRecipe) == 'up') {
      console.log("CLICCHI DOWN, HAI UP")
      localStorage.setItem(idRecipe, "down");
      doJSONRequest('GET', '/api/' + idRecipe, null, null, function(res, req) {
        let recipe = res[0];
        let up = recipe.upvotes - 1;
        let down = recipe.downvotes + 1;
        console.log(recipe.downvotes);
        doJSONRequest('PUT', '/api/' + idRecipe, null, {upvotes : up, downvotes : down}, function() {
          openSingleRecipe(e, index);
        });
      })
    }
  })
}

// === commentRecipeApi ===
// Comment the recipe from the API.
function commentRecipeApi(idRecipe, index) {
  let commentSubmit = document.getElementById('submit-comment');
  commentSubmit.id = idRecipe;
  let username = document.getElementById('username');
  let comment = document.getElementById('comment');
  commentSubmit.addEventListener('click', function(e) {
    if (comment.value == '') {
      document.getElementById('toast').innerHTML = "You have to insert a comment before submit";
      showToast();
    } else {
      let usname = username.value;
      if (usname == '') {
        usname = 'Anonymous'
      }
      doJSONRequest('PUT', '/api/' + idRecipe, null, {username: usname, comment : comment.value}, function() {
        openSingleRecipe(e, index);
      });
    }
  })
}

// === upvotes ===
// Upvote the recipe from the database.
function upvotes(idRecipe, index) {
  let upvote = document.getElementById('up');
  upvote.id = idRecipe;
  upvote.addEventListener('click', function(e) {
    console.log('CLICCO UP');
    if (localStorage.getItem(idRecipe) == null) {
      localStorage.setItem(idRecipe, "up");
      doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
        let recipe = res;
        let up = recipe.upvotes + 1;
        let down = recipe.downvotes;
        doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up}, function() {
          openSingleRecipeMongo(e, index);
        });
      })
    }
    else if (localStorage.getItem(idRecipe) == 'up'){
      localStorage.removeItem(idRecipe);
      doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
        let recipe = res;
        let up = recipe.upvotes - 1;
        let down = recipe.downvotes;
        doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up}, function() {
          openSingleRecipeMongo(e, index);
        });
      })
    }
    else if(localStorage.getItem(idRecipe) == 'down'){
      localStorage.setItem(idRecipe, "up");
      doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
        let recipe = res;
        let up = recipe.upvotes + 1;
        let down = recipe.downvotes - 1;
        doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up, downvotes : down}, function() {
          openSingleRecipeMongo(e, index);
        });
      })
    }
  })

}

// === downvotes ===
// Downvote the recipe from the database.
function downvotes(idRecipe, index) {
  let downvote = document.getElementById('down');
  downvote.id = idRecipe;
  downvote.addEventListener('click', function(e) {
    console.log('CLICCO DOWN');
    if (localStorage.getItem(idRecipe) == null) {
      localStorage.setItem(idRecipe, "down");
      doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
        let recipe = res;
        let up = recipe.upvotes;
        let down = recipe.downvotes + 1;
        doJSONRequest('PUT', '/recipes/' + idRecipe, null, {downvotes : down}, function() {
          openSingleRecipeMongo(e, index);
        });
      })
    }
    else if (localStorage.getItem(idRecipe) == 'down'){
      localStorage.removeItem(idRecipe);
      doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
        let recipe = res;
        let up = recipe.upvotes;
        let down = recipe.downvotes - 1;
        doJSONRequest('PUT', '/recipes/' + idRecipe, null, {downvotes : up}, function() {
          openSingleRecipeMongo(e, index);
        });
      })
    }
    else if(localStorage.getItem(idRecipe) == 'up'){
      localStorage.setItem(idRecipe, "down");
      doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
        let recipe = res;
        let up = recipe.upvotes - 1;
        let down = recipe.downvotes + 1;
        doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up, downvotes : down}, function() {
          openSingleRecipeMongo(e, index);
        });
      })
    }
  })
}

// === commentRecipe ===
// Comment the recipe from the database.
function commentRecipe(idRecipe, index) {
  let commentSubmit = document.getElementById('submit-comment');
  commentSubmit.id = idRecipe;
  let username = document.getElementById('username');
  let comment = document.getElementById('comment');
  commentSubmit.addEventListener('click', function(e) {
    if (comment.value == '') {
      document.getElementById('toast').innerHTML = "You have to insert a comment before submit";
      showToast();
    } else {
      if (username.value == '') {
        username.value = 'Anonymous'
      }
      doJSONRequest('PUT', '/recipes/' + idRecipe, null, {username: username.value, comment : comment.value}, function() {
        openSingleRecipeMongo(e, index);
      });
    }
  })
}

// === findBestRecipe ===
// Find the best Recipe in the database and visualize it
function findBestRecipe() {
  var pageContent = document.getElementById('page-content');
  doJSONRequest('GET', '/recipes', null, null, function(res, req){
    let recipes = res.results;
    let bestRecipe = recipes[0];
    for (let i=1; i<recipes.length; i++) {
      if((recipes[i].upvotes - recipes[i].downvotes) > (bestRecipe.upvotes - bestRecipe.downvotes)){
        bestRecipe = recipes[i];
      }
    }
    openBestRecipe(bestRecipe);
  })
}

function upvoteBestRecipe(bestRecipe){
    let idRecipe = bestRecipe._id;
    // Upvote
    let upvote = document.getElementById('up');
    upvote.id = idRecipe;
    upvote.addEventListener('click', function(e) {
      if (localStorage.getItem(idRecipe) == null) {
        localStorage.setItem(idRecipe, "up");
        doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
          let recipe = res;
          let up = recipe.upvotes + 1;
          let down = recipe.downvotes;
          doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up}, function() {
            doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req){
              openBestRecipe(res);
            })
          });
        })
      }
      else if (localStorage.getItem(idRecipe) == 'up'){
        localStorage.removeItem(idRecipe);
        doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
          let recipe = res;
          let up = recipe.upvotes - 1;
          let down = recipe.downvotes;
          doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up}, function() {
            doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req){
              openBestRecipe(res);
            })
          });
        })
      }
      else if(localStorage.getItem(idRecipe) == 'down'){
        localStorage.setItem(idRecipe, "up");
        doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
          let recipe = res;
          let up = recipe.upvotes + 1;
          let down = recipe.downvotes - 1;
          doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up, downvotes : down}, function() {
            doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req){
              openBestRecipe(res);
            })
          });
        })
      }
    })
}

function downvoteBestRecipe(bestRecipe){
  let idRecipe = bestRecipe._id;
    //downvote
    let downvote = document.getElementById('down');
    downvote.id = idRecipe;
    downvote.addEventListener('click', function(e) {
      if (localStorage.getItem(idRecipe) == null) {
        localStorage.setItem(idRecipe, "down");
        doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
          let recipe = res;
          let up = recipe.upvotes;
          let down = recipe.downvotes + 1;
          doJSONRequest('PUT', '/recipes/' + idRecipe, null, {downvotes : down}, function() {
            doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req){
              openBestRecipe(res);
            })
          });
        })
      }
      else if (localStorage.getItem(idRecipe) == 'down'){
        localStorage.removeItem(idRecipe);
        doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
          let recipe = res;
          let up = recipe.upvotes;
          let down = recipe.downvotes - 1;
          doJSONRequest('PUT', '/recipes/' + idRecipe, null, {downvotes : up}, function() {
            doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req){
              openBestRecipe(res);
            })
          });
        })
      }
      else if(localStorage.getItem(idRecipe) == 'up'){
        localStorage.setItem(idRecipe, "down");
        doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req) {
          let recipe = res;
          let up = recipe.upvotes - 1;
          let down = recipe.downvotes + 1;
          doJSONRequest('PUT', '/recipes/' + idRecipe, null, {upvotes : up, downvotes : down}, function() {
            doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req){
              openBestRecipe(res);
            })
          });
        })
      }
    })

  }

function commentBestRecipe(bestRecipe){
  let idRecipe = bestRecipe._id;
    // Comment
    let commentSubmit = document.getElementById('submit-comment');
    commentSubmit.id = idRecipe;
    let username = document.getElementById('username');
    let comment = document.getElementById('comment');
    commentSubmit.addEventListener('click', function(e) {
      if (comment.value == '') {
        document.getElementById('toast').innerHTML = 'You have to insert a comment before submit';
        showToast();
      } else {
        if (username.value == '') {
          username.value = 'Anonymous'
        }
        doJSONRequest('PUT', '/recipes/' + idRecipe, null, {username: username.value, comment : comment.value}, function(res, req) {
          doJSONRequest('GET', '/recipes/' + idRecipe, null, null, function(res, req){
            openBestRecipe(res);
          })
        });
      }
    })
  }


function openBestRecipe (recipe) {
  console.log(recipe.image)
  recipe.image = {actual : './uploads/' + recipe._id + "." + recipe.image};
  console.log(recipe.image.actual);
  var pageContent = document.getElementById('page-content');
  console.log(recipe)
    pageContent.innerHTML = recipeTemplate({recipe : recipe});

    // Change button upvote and downvote colors.
    if (localStorage.getItem(recipe._id) == 'up') {
      document.getElementById("up").style.color = "#4CAF50";
    } else if (localStorage.getItem(recipe._id) === "down") {
      document.getElementById("down").style.color = "#D32F2F";
    }

    if (recipe.glutenfree === true) {
      document.getElementById("glutenfree").className = "i fa fa-check fa-1x";
      document.getElementById("glutenfree").style.color = 'green';
    } else {
      document.getElementById("glutenfree").style.color = 'red';
    }
    if (recipe.lactosefree === true) {
      document.getElementById("dairyfree").className = "i fa fa-check fa-1x";
      document.getElementById("dairyfree").style.color = 'green';
    } else {
      document.getElementById("dairyfree").style.color = 'red';
    }
    if (recipe.vegan === true) {
      document.getElementById("vegan").className = "i fa fa-check fa-1x";
      document.getElementById("vegan").style.color = 'green';
    } else {
      document.getElementById("vegan").style.color = 'red';
    }

    document.getElementById('arrow-back').style.visibility = 'hidden';
    document.getElementById('arrow-next').style.visibility = 'hidden';
    document.getElementById('back-button').style.display = "none";
  upvoteBestRecipe(recipe);
  downvoteBestRecipe(recipe);
  commentBestRecipe(recipe);
}

// =================== CREATE ===================
// === displayCreate ===
// Creation of the recipe with the post request.
function displayCreate() {
  addIngredients();
  let createBtn = document.getElementById('submit-recipe');
  document.getElementById('file-upload').onchange = function() {
    document.getElementsByClassName('custom-label-left')[0].innerHTML = 'Image Loaded';
    document.getElementsByClassName('custom-label-left')[0].addEventListener('click', function(e){
      e.preventDefault();
    })
  };
  createBtn.addEventListener('click', createRecipe);
}

// === createRecipe ===
// Crete recipe and save in database.
function createRecipe(e) {
  e.preventDefault();
  let user = document.getElementById('user-name').value || 'Anonymous';
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

  if(title == '') {
    document.getElementById('toast').innerHTML = "The title of the recipe is a compulsory field";
    showToast();
  } else if(instructions == '') {
    document.getElementById('toast').innerHTML = "The preparation of the recipe is a compulsory field";
    showToast();
  } else if(names[0].value == '') {
    document.getElementById('toast').innerHTML = "ingredients of the recipe are compulsory fields";
    showToast();
  } else {
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
      let inputField = document.getElementById('file-upload');
      data.append('image', inputField.value.split('.')[inputField.value.split('.').length-1]);
    }
    data.append('file', inputFile);
    doFormDataRequest('POST', '/recipes', data)
    var pageContent = document.getElementById('page-content');
    pageContent.innerHTML = mainTemplate();
    scrollToTop();
  }
}

// === addIngredients ===
// Add more than one ingredient.
function addIngredients() {
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

// === doJSONRequest ===
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
  xhr.open(method, url, true);
  xhr.send(data);
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
