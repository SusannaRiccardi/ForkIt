window.onload = function() {
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

  // franchini -->

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
    });
  }

};
