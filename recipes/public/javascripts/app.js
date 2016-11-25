window.onload = function() {
    let receipts = document.getElementsByClassName('receipt-preview');

    for (let i = 0; i < receipts.length; i++) {
        receipts[i].addEventListener('mouseover', function() {
            console.log(receipts[i]);
            receipts[i].getElementsByClassName('receipt-text')[0].setAttribute('style', 'display: none;');
        });
    }
    for (let i = 0; i < receipts.length; i++) {
        receipts[i].addEventListener('mouseout', function() {
            console.log(receipts[i]);
            receipts[i].getElementsByClassName('receipt-text')[0].removeAttribute('style');
        });
    }
}

