window.onload = function() {
    let pageContent = document.getElementById('page-content');
    pageContent.innerHTML = mainTemplate();

    let btnTdRecipe = document.getElementById('btn-tdRecipe');;
    let btnCreate = document.getElementById('btn-create');;
    let btnDiscover = document.getElementById('btn-discover');;
    let btnAbout = document.getElementById('btn-about');;

    btnTdRecipe.addEventListener('click', function() {
        pageContent.innerHTML = recipeTemplate();
    });

    btnCreate.addEventListener('click', function() {
        pageContent.innerHTML = createTemplate();
    });

    btnDiscover.addEventListener('click', function() {
        pageContent.innerHTML = discoverTemplate();
    });

    btnAbout.addEventListener('click', function() {
        pageContent.innerHTML = "";
    });



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

    for (input of inputField) {
        input.addEventListener('click', function() {
            input.removeAttribute('placeholder');
        });
    }

};