const navData = document.querySelector('.nav__data');
const nav     = document.querySelector('.nav');
const navIcon = document.querySelector('.nav__icon');
const cover   = document.querySelector('.cover');
const list    = document.querySelector('.list');

//Función que despliega el menu del nav en mobile
export const navShow = ()=>{
    navData.addEventListener('click', (e)=>{
        e.preventDefault();
        nav.classList.toggle('nav--active');
        navIcon.classList.toggle('nav__icon--active');
        cover.classList.toggle('cover--active');

        if(matchMedia('screen and (min-width: 768px)')){
            list.classList.toggle('list--active');
        }
    });

    cover.addEventListener('click', ()=>{
        nav.classList.remove('nav--active');
        navIcon.classList.remove('nav__icon--active');
        cover.classList.remove('cover--active');

        if(matchMedia('screen and (min-width: 768px)')){
            list.classList.remove('list--active');
        }
    })
}

navShow();

