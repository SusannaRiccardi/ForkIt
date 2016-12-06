window.onload = function() {
    let menubar = document.getElementById('menubar');
    let recipesBtn = document.getElementById('recipes-view-btn');
    let loginBtn = document.getElementById('login-btn');
    let loginBackBtn = document.getElementById('login-btn-back');
    let menuwrapper = document.getElementById('menuwrapper');
    let login = document.getElementById('login');
    let recipeView = document.getElementById('recipe-view');
    let mainView = document.getElementById('main-view');
    let menuBtnFont = document.getElementsByClassName('btn-img')[0].getElementsByTagName('i')[0];
    let mainPageSearch = document.getElementById('mainPageSearch');
    let mainPageSearchContent = document.getElementById('food');

    console.log(mainPageSearch.getAttribute('placeholder'));

    menuwrapper.addEventListener('mouseenter', function() {
        menuBtnFont.setAttribute('Style', '-ms-transform: rotate(90deg); -webkit-transform: rotate(90deg); transform: rotate(90 deg);');
    });

    menuwrapper.addEventListener('mouseleave', function() {
        menuBtnFont.removeAttribute('Style');
    });

    mainPageSearchContent.addEventListener('focus', function() {
        console.log('inside');
        mainPageSearchContent.removeAttribute('placeholder');
    });

    mainPageSearchContent.addEventListener('blur', function() {
        console.log('outside');
        mainPageSearchContent.setAttribute('placeholder', 'SEACH FOOD');
    });

};