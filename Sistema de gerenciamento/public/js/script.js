window.addEventListener('scroll', function(){
    var scrollHeight = window.scrollY;
    var header = document.getElementById('myHeader');

    if(scrollHeight > 100){
        header.classList.add('headerFinal');
        header.classList.remove('headerInicial');
    }else{
        header.classList.remove('headerFinal');
        header.classList.add('headerInicial');
    }
})