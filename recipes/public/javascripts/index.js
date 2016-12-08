window.onload = function() {
  var pageContent = document.getElementById('page-content');
  pageContent.innerHTML = mainTemplate();

  //menu buttons and functionality
  let btnMain = document.getElementById('btn-about');
  let btnTdRecipe = document.getElementById('btn-tdRecipe');
  let btnCreate = document.getElementById('btn-create');
  let btnDiscover = document.getElementById('btn-discover');
  let btnAbout = document.getElementById('btn-about');
  let btnSearchSubmit = document.getElementById('search-submit-btn');

  // Da togliere quando cambiano nell'html
  btnTdRecipe.href = "todayRecipe";
  btnCreate.href = "create";
  btnDiscover.href = "discover";
  btnAbout.href = "about";

  btnTdRecipe.addEventListener('click', displayPage);
  btnCreate.addEventListener('click', displayPage);
  btnDiscover.addEventListener('click', displayPage);
  btnAbout.addEventListener('click', displayPage);

}


// Display different pages when the menu buttons are clicked
function displayPage(e){
  e.preventDefault();
  var pageContent = document.getElementById('page-content');
  let href = e.target.href.split('/').pop();
  if (href == 'todayRecipe'){
    pageContent.innerHTML = recipeTemplate({ recipe: { title: 'Sushi',
    instructions: 'Go to McDonald',
    author: "Andrea",
    comments: [{ text: 'Buonissimo', username: 'samuelebischof' }, { text: 'Che schifo', username: 'lucaferrari' }],
    ingredients: [{ name: 'pane', quantity: '1Kg' }, { name: 'acqua', quantity: '3dl' }] } });
  }
  if (href == 'create'){
    pageContent.innerHTML = createTemplate();

    create();
  }
  if (href == 'discover'){
    pageContent.innerHTML = discoverTemplate({ recipes: [{ image: './images/1.jpg' }, { image: './images/2.jpg' },{ image: './images/3.jpg' }, { image: './images/4.jpg' },{ image: './images/5.jpg' }, { image: './images/6.jpg' }] });
  }
  if (href == 'about'){
    pageContent.innerHTML = "";
  }
  // if (href == search){
  //
  // }
}


function create() {
  let ingredientsContainer = document.getElementById('recipe-create-ingredients');
  let btnAddIngredient = document.getElementById('btnAddIngredient');
  let addIngredient = function() {
    btnAddIngredient.addEventListener('click', function() {
      document.getElementById("btnAddIngredient").outerHTML = '';
      ingredientsContainer.innerHTML += ingredientTemplate();
      btnAddIngredient = document.getElementById('btnAddIngredient');
      addIngredient();
    })
  }
  addIngredient();
  let createBtn = document.getElementsByClassName('custom-label-right');
  createBtn.addEventListener('click', createRecipe);
}
function createRecipe(e) {
  e.preventDefault();

  // let obj = {};
  // let el = document.getElementsByClassName('form-control');
  // let ingredients = {};
  // for(let i of el){
  //   let id = i.getAttribute('id');
  //   if(id == 'title'){
  //     obj.title = i.value;
  //   }
  //   if(id == 'instructions'){
  //     obj.instructions = i.value;
  //   }
  //   if(id == 'image'){
  //     obj.image = i.value;
  //   }
  //   if(id == 'video'){
  //     obj.video = i.video;
  //   }
  //   if(id == 'ingredient'){
  //     ingredient.name = i.value;
  //   }
  //   if(id == 'quantity'){
  //     ingredient.quantity = i.value;
  //   }
  // }
  // obj.ingredients = [ingredients];
  // console.log(obj);
  // doJSONRequest('POST', '/recipes', null, obj, function(){});
}









    //   btnMain.addEventListener('click', function() {
    //     pageContent.innerHTML = mainTemplate();
    //   });
    //
    //   btnTdRecipe.addEventListener('click', function(e) {
    //     // example
    //     e.preventDefault();
    //     pageContent.innerHTML = recipeTemplate({ recipe: { title: 'Sushi', instructions: 'Go to McDonald', author: "Andrea", comments: [{ text: 'Buonissimo', username: 'samuelebischof' }, { text: 'Che schifo', username: 'lucaferrari' }], ingredients: [{ name: 'pane', quantity: '1Kg' }, { name: 'acqua', quantity: '3dl' }] } });
    //   });
    //
    //   btnCreate.addEventListener('click', function(e) {
    //     // load page
    //     e.preventDefault();
    //     pageContent.innerHTML = createTemplate();
    //
    //     // actions
    //     let ingredientsContainer = document.getElementById('recipe-create-ingredients');
    //     let btnAddIngredient = document.getElementById('btnAddIngredient');
    //     let addIngredient = function() {
    //       btnAddIngredient.addEventListener('click', function() {
    //         document.getElementById("btnAddIngredient").outerHTML = '';
    //         ingredientsContainer.innerHTML += ingredientTemplate();
    //         btnAddIngredient = document.getElementById('btnAddIngredient');
    //         addIngredient();
    //       })
    //     }
    //     addIngredient();
    //
    //
    //   });
    //
    //
    //
    //
    //   let receivedArray = [];
    //   let receivedJSONPos = 0;
    //   btnDiscover.addEventListener('click', function(e) {
    //     // doJSONRequest('GET', '/discover', {}, null, function(req, res) {
    //     //     let receivedJSON = req.body;
    //
    //     //     for (let recipe of receivedJSON) {
    //     //         receivedArray.push(recipe);
    //     //     }
    //
    //     //     pageContent.innerHTML = discoverTemplate({ recipes: receivedArray.slice(receivedJSONPos, receivedJSONPos + 6) });
    //     //     receivedJSONPos += 6;
    //     // })
    //     // example
    //     e.preventDefault();
    //     pageContent.innerHTML = discoverTemplate({ recipes: [{ image: './images/1.jpg' }, { image: './images/2.jpg' }, { image: './images/3.jpg' }, { image: './images/4.jpg' }, { image: './images/5.jpg' }, { image: './images/6.jpg' }] });
    //   });
    //
    //   btnSearchSubmit.addEventListener('click', function(e) {
    //     e.preventDefault;
    //     let search = document.getElementById('searchField').value;
    //     let exclude = document.getElementById('excludeField').value;
    //     let filter = {
    //       search: search,
    //       exclude: exclude
    //     };
    //     let filterJson = JSON.stringify(filter);
    //
    //     // doJSONRequest(method, url, headers, data, callback){
    //     doJSONRequest('GET', '/discover', {}, filterJson, function(req, res) {})
    //     // pageContent.innerHTML = discoverTemplate();
    //   });
    //
    //   btnAbout.addEventListener('click', function(e) {
    //     e.preventDefault();
    //     pageContent.innerHTML = "";
    //   });
    //
    //
    //
    //   let menubar = document.getElementById('menubar');
    //   let recipesBtn = document.getElementById('recipes-view-btn');
    //   let menuwrapper = document.getElementById('menuwrapper');
    //   let login = document.getElementById('login');
    //   let recipeView = document.getElementById('recipe-view');
    //   let mainView = document.getElementById('main-view');
    //   let menuBtnFont = document.getElementsByClassName('btn-img')[0].getElementsByTagName('i')[0];
    //   let mainPageSearch = document.getElementById('mainPageSearch');
    //   let mainPageSearchContent = document.getElementById('food');
    //
    //   let searchBtn = document.getElementById('search-btn');
    //   let searchBackBtn = document.getElementById('search-btn-back');
    //   let search = document.getElementById('search');
    //
    //   let inputField = document.getElementsByTagName('input');
    //   let stars = document.getElementsByClassName('star');
    //   let starContainer = document.getElementById('stars');
    //
    //   console.log(mainPageSearch.getAttribute('placeholder'));
    //
    //   menuwrapper.addEventListener('mouseenter', function() {
    //     menuBtnFont.setAttribute('Style', '-ms-transform: rotate(90deg); -webkit-transform: rotate(90deg); transform: rotate(90 deg);');
    //   });
    //
    //   menuwrapper.addEventListener('mouseleave', function() {
    //     menuBtnFont.removeAttribute('Style');
    //   });
    //
    //   mainPageSearchContent.addEventListener('focus', function() {
    //     mainPageSearchContent.removeAttribute('placeholder');
    //   });
    //
    //   mainPageSearchContent.addEventListener('blur', function() {
    //     mainPageSearchContent.setAttribute('placeholder', 'SEACH FOOD');
    //   });
    //
    //   // for (input of inputField) {
    //   //     input.addEventListener('click', function() {
    //   //         input.removeAttribute('placeholder');
    //   //     });
    //   // }
    //
    // };
    //


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

      //console.log(dataToSend)

      //send the request to the server
      r.send(dataToSend);
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