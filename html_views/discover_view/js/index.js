window.onload = function() {
    let menubar = document.getElementById('menubar');

    let searchBtn = document.getElementById('search-btn');
    let searchBackBtn = document.getElementById('search-btn-back');
    let search = document.getElementById('search');

    let inputField = document.getElementsByTagName('input');
    let stars = document.getElementsByClassName('star');
    let starContainer = document.getElementById('stars');

    let loginBtn = document.getElementById('login-btn');
    let loginBackBtn = document.getElementById('login-btn-back');
    let menuwrapper = document.getElementById('menuwrapper');
    let login = document.getElementById('login');


    searchBtn.addEventListener('click', function () {
        menuwrapper.setAttribute('Style', 'display: none;');
        search.removeAttribute('Style');
    });

    searchBackBtn.addEventListener('click', function() {
        search.setAttribute('Style', 'display: none;');
        menuwrapper.removeAttribute('Style');
    });

    loginBtn.addEventListener('click', function() {
        menuwrapper.setAttribute('Style', 'display: none;');
        login.removeAttribute('Style');
    });

    loginBackBtn.addEventListener('click', function() {
        console.log('test')
        login.setAttribute('Style', 'display: none;');
        menuwrapper.removeAttribute('Style');
    });

    for (star of stars){
        star.addEventListener('mouseover', function (event) {
            let starNr = event.toElement.id;

            switch (starNr){
                case 'star5':
                    document.getElementById('star1').removeAttribute('Style');
                    document.getElementById('star2').removeAttribute('Style');
                    document.getElementById('star3').removeAttribute('Style');
                    document.getElementById('star4').removeAttribute('Style');
                    document.getElementById('star5').removeAttribute('Style');
                    break;
                case 'star4':
                    document.getElementById('star1').removeAttribute('Style');
                    document.getElementById('star2').removeAttribute('Style');
                    document.getElementById('star3').removeAttribute('Style');
                    document.getElementById('star4').removeAttribute('Style');
                    document.getElementById('star5').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    break;
                case 'star3':
                    document.getElementById('star1').removeAttribute('Style');
                    document.getElementById('star2').removeAttribute('Style');
                    document.getElementById('star3').removeAttribute('Style');
                    document.getElementById('star4').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    document.getElementById('star5').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    break;
                case 'star2':
                    document.getElementById('star1').removeAttribute('Style');
                    document.getElementById('star2').removeAttribute('Style');
                    document.getElementById('star3').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    document.getElementById('star4').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    document.getElementById('star5').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    break;
                case 'star1':
                    document.getElementById('star1').removeAttribute('Style');
                    document.getElementById('star2').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    document.getElementById('star3').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    document.getElementById('star4').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    document.getElementById('star5').setAttribute('Style', 'color: rgba(0,0,0,0);');
                    break;
            }
        })
    }


    for (input of inputField){
        input.addEventListener('click', function () {
            input.removeAttribute('placeholder');

        })
    }




};