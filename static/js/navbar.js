let navbar = 1;

const togglebtn = document.querySelector(".toggle_btn")
const togglebtnicon = document.querySelector(".toggle_btn i")
const toggledropmenu = document.querySelector(".dropdown_menu")


togglebtn.onclick = function () {
    toggledropmenu.classList.toggle('open');
    if (toggledropmenu.classList.contains('open')){
        document.querySelector('#brs').classList.remove('fa-bars');
        document.querySelector('#brs').classList.add('fa-xmark');

        navbar = 0;
    }
    else{
        document.querySelector('#brs').classList.add('fa-bars');
        document.querySelector('#brs').classList.remove('fa-xmark');

        navbar = 1;
    }
}



window.addEventListener('scroll', b => {
    if (navbar === 0){
        window.scrollTo({top: 0})
    }
})



var btn3 = document.querySelector('.svg__to__top');
var hiddenElement3 = document.querySelector('.header-preview-wrapper')

btn3.addEventListener('click', handleButtonClick3);
function handleButtonClick3() {
    hiddenElement3.scrollIntoView({block: "center", behavior: "smooth"});
}