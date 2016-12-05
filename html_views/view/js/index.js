window.onload = function() {
    let menubar = document.getElementById('menubar');
    let recipesBtn = document.getElementById('recipes-view-btn');
    let loginBtn = document.getElementById('login-btn');
    let loginBackBtn = document.getElementById('login-btn-back');
    let menuwrapper = document.getElementById('menuwrapper');
    let login = document.getElementById('login');
    let recipeView = document.getElementById('recipe-view');
    let mainView = document.getElementById('main-view');

    loginBtn.addEventListener('click', function() {
        login.removeAttribute('style');
        menuwrapper.setAttribute('style', 'display: none;');
    })

    loginBackBtn.addEventListener('click', function() {
        menuwrapper.removeAttribute('style');
        login.setAttribute('style', 'display: none;');
    })

    recipesBtn.addEventListener('click', function() {
        recipeView.removeAttribute('style');
        mainView.setAttribute('style', 'display: none;');
    });
};