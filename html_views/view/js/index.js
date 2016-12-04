window.onload = function() {
    let recipes = document.getElementsByClassName('recipe-preview');

    for (let i = 0; i < recipes.length; i++) {
        recipes[i].addEventListener('mouseover', function() {
            console.log(recipes[i]);
            recipes[i].getElementsByClassName('recipe-text')[0].setAttribute('style', 'display: none;');
        });
    }
    for (let i = 0; i < recipes.length; i++) {
        recipes[i].addEventListener('mouseout', function() {
            console.log(recipes[i]);
            recipes[i].getElementsByClassName('recipe-text')[0].removeAttribute('style');
        });
    }
}