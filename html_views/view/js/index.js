window.onload = function() {
    let menubar = document.getElementById('menubar');
    let loginBtn = document.getElementById('login-btn');
    let loginBackBtn = document.getElementById('login-btn-back');
    let menuwrapper = document.getElementById('menuwrapper');
    let login = document.getElementById('login');

    loginBtn.addEventListener('click', function() {
        menuwrapper.setAttribute('Style', 'display: none;');
        login.removeAttribute('Style');
    })

    loginBackBtn.addEventListener('click', function() {
        console.log('test')
        login.setAttribute('Style', 'display: none;');
        menuwrapper.removeAttribute('Style');
    })
};