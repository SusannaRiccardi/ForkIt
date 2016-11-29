window.onload = function() {
    let receipes = document.getElementsByClassName('receipe-preview');

    for (let i = 0; i < receipes.length; i++) {
        receipes[i].addEventListener('mouseover', function() {
            console.log(receipes[i]);
            receipes[i].getElementsByClassName('receipe-text')[0].setAttribute('style', 'display: none;');
        });
    }
    for (let i = 0; i < receipes.length; i++) {
        receipes[i].addEventListener('mouseout', function() {
            console.log(receipes[i]);
            receipes[i].getElementsByClassName('receipe-text')[0].removeAttribute('style');
        });
    }
}