window.onload = function() {
    let pageContent = document.getElementById('page-content');
    pageContent.innerHTML = mainTemplate();

    let btnMain = document.getElementById('btn-about');
    let btnTdRecipe = document.getElementById('btn-tdRecipe');
    let btnCreate = document.getElementById('btn-create');
    let btnDiscover = document.getElementById('btn-discover');
    let btnAbout = document.getElementById('btn-about');

    let btnSearchSubmit = document.getElementById('search-submit-btn');

    btnMain.addEventListener('click', function() {
        pageContent.innerHTML = mainTemplate();
    });

    btnTdRecipe.addEventListener('click', function() {
        pageContent.innerHTML = recipeTemplate();
    });

    btnCreate.addEventListener('click', function() {
        // load page
        pageContent.innerHTML = createTemplate();

        // actions
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


    });




    let receivedArray = [];
    let receivedJSONPos = 0;
    btnDiscover.addEventListener('click', function() {
        // doJSONRequest('GET', '/discover', {}, null, function(req, res) {
        //     let receivedJSON = req.body;

        //     for (let recipe of receivedJSON) {
        //         receivedArray.push(recipe);
        //     }

        //     pageContent.innerHTML = discoverTemplate({ recipes: receivedArray.slice(receivedJSONPos, receivedJSONPos + 6) });
        //     receivedJSONPos += 6;
        // })
        pageContent.innerHTML = discoverTemplate({});
    });

    btnSearchSubmit.addEventListener('click', function(e) {
        e.preventDefault;
        let search = document.getElementById('searchField').value;
        let exclude = document.getElementById('excludeField').value;
        let filter = {
            search: search,
            exclude: exclude
        };
        let filterJson = JSON.stringify(filter);

        // doJSONRequest(method, url, headers, data, callback){
        doJSONRequest('GET', '/discover', {}, filterJson, function(req, res) {
                // console.log(req);
                // console.log(res);
            })
            // pageContent.innerHTML = discoverTemplate();
    });

    // btnAbout.addEventListener('click', function() {
    //     pageContent.innerHTML = "";
    // });



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
    let stars = document.getElementsByClassName('star');
    let starContainer = document.getElementById('stars');

    console.log(mainPageSearch.getAttribute('placeholder'));

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

    // for (input of inputField) {
    //     input.addEventListener('click', function() {
    //         input.removeAttribute('placeholder');
    //     });
    // }

};

//Error checker and json stringify
function errorHandler(method, url, headers, data, callback) {

    if (method !== "GET" &&
        method !== "POST" &&
        method !== "PUT" &&
        method !== "DELETE") {
        throw "Method error"
    };

    if (url === undefined ||
        url === '' ||
        url === null) {
        throw "Url error";
    }


    if (headers === undefined ||
        headers === null) {
        throw "Header error"
    };

    let dataToJson;

    try {
        if (data !== undefined &&
            data !== null) {
            dataToJson = JSON.stringify(data);
            JSON.parse(dataToJson);
        }
    } catch (e) {
        throw "Data error";
    }

    if (typeof callback !== "function")
        throw "Not a function";

    //Return json string
    return dataToJson
}

////////////////////////////////////
function doJSONRequest(method, url, headers, data, callback) {

    //Check # params
    if (arguments.length !== 5)
        throw "Required parameters 5";

    let dataToJson;

    try { dataToJson = errorHandler(method, url, headers, data, callback) } catch (e) {
        throw e;
    }

    const req = new XMLHttpRequest();

    req.open(method, url, true);

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200)
                callback(JSON.parse(req.responseText));
            else if (req.status === 204)
                callback();
            else
                console.log(req.status);
        }
    };

    // dust.render('contactitem', created, function(err, out) {
    //     if (!err) document.getElementById('contactList').innerHTML += out;

    //     addDeleteListener();
    // });

    req.setRequestHeader("Accept", "application/json");

    if (method === "POST" || method === "PUT") {
        req.setRequestHeader("Content-Type", "application/json;charset=utf-8")
    };

    for (let header in headers) {
        req.setRequestHeader(header, headers[header])
    };

    req.send(dataToJson);
}

/* AJAX */