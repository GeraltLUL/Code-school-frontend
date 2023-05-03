function activateHome(){
    document.querySelector('.home__wrapper').style.display = "block";
    document.querySelector('.inf__wrapper').style.display = "none";
    document.querySelector('.settings__wrapper').style.display = "none";

    document.querySelector(".profile__home").classList.add("active_btn");
    document.querySelector(".profile__inf").classList.remove("active_btn");
    document.querySelector(".profile__settings").classList.remove("active_btn");
}

function activateInf(){
    document.querySelector('.home__wrapper').style.display = "none";
    document.querySelector('.inf__wrapper').style.display = "block";
    document.querySelector('.settings__wrapper').style.display = "none";

    document.querySelector(".profile__home").classList.remove("active_btn");
    document.querySelector(".profile__inf").classList.add("active_btn");
    document.querySelector(".profile__settings").classList.remove("active_btn");

}

function activateSettings(){
    document.querySelector('.home__wrapper').style.display = "none";
    document.querySelector('.inf__wrapper').style.display = "none";
    document.querySelector('.settings__wrapper').style.display = "block";

    document.querySelector(".profile__home").classList.remove("active_btn");
    document.querySelector(".profile__inf").classList.remove("active_btn");
    document.querySelector(".profile__settings").classList.add("active_btn");
}

let chek1 = 0;
window.addEventListener('scroll', e => {
    if (chek1 === 0){
        window.scrollTo({top: 0})
    }
})



document.body.onload = function (){
    setTimeout(function (){
        var preloader = document.querySelector('.preloader');
        if( !preloader.classList.contains('done')){
            preloader.classList.add('done');
            chek1 = 1;
        }
    }, 1000)
}

const restbutton = document.querySelector('#resetbutton');
restbutton.addEventListener('click', clearAll);
function clearAll(){
    let name = document.querySelector(".name").textContent;
    document.querySelector("#name").value = name;

    let surname = document.querySelector(".surname").textContent;
    document.querySelector("#surname").value = surname;

    let patronymic = document.querySelector(".patronymic").textContent;
    document.querySelector("#patronymic").value = patronymic;

    let email = document.querySelector(".email").textContent;
    document.querySelector("#email").value = email;

    let DD = document.querySelector(".DD").textContent;
    document.querySelector("#DD").value = DD;

    let MM = document.querySelector(".MM").textContent;
    document.querySelector("#MM").value = MM;

    let YYYY = document.querySelector(".YYYY").textContent;
    document.querySelector("#YYYY").value = YYYY;
}


let name = document.querySelector(".name").textContent;
document.querySelector("#name").value = name;

let surname = document.querySelector(".surname").textContent;
document.querySelector("#surname").value = surname;

let patronymic = document.querySelector(".patronymic").textContent;
document.querySelector("#patronymic").value = patronymic;

let email = document.querySelector(".email").textContent;
document.querySelector("#email").value = email;

let DD = document.querySelector(".DD").textContent;
document.querySelector("#DD").value = DD;

let MM = document.querySelector(".MM").textContent;
document.querySelector("#MM").value = MM;

let YYYY = document.querySelector(".YYYY").textContent;
document.querySelector("#YYYY").value = YYYY;


//
// function validateForm() {
//     var x = document.forms["changing_inf"]["fname"].value;
//     if (x == "") {
//         alert("Необходимо ввести имя");
//         return false;
//     }
// }