const windowInnerWidth = document.documentElement.clientWidth

function activateHome(){
    document.querySelector('.home__wrapper').style.display = "flex";
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
    document.querySelector('.settings__wrapper').style.display = "flex";

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

function closeOrder(){

    document.querySelector('.order__form').style.display = "none";
    document.querySelector('.preview').style.paddingBottom = "10rem";
}
function openOrder(){
    document.querySelector('.order__form').style.display = "block";

    document.querySelector('.preview').style.paddingBottom = "80rem";

}


function closeAddfile(){
    document.querySelector('.addfile__form').style.display = "none";
}
function openAddfile(){
    document.querySelector('.addfile__form').style.display = "flex";
}


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



let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {
    let label = input.nextElementSibling,
        labelVal = label.querySelector('.input__file-button-text').innerText;

    input.addEventListener('change', function (e) {
        let countFiles = '';
        if (this.files && this.files.length >= 1)
            countFiles = this.value;


        var reverse = countFiles.split('').reverse().join('');

        var from = reverse.indexOf("\\");
        var to = reverse.length;


        countFiles = reverse.substring(0,from);

        countFiles = countFiles.split('').reverse().join('');

        if (countFiles.length > 15 && windowInnerWidth > 600){
            document.querySelector(".input__file-button-text").style.fontSize = "1vw";
        }
        else if(windowInnerWidth > 600){
            document.querySelector(".input__file-button-text").style.fontSize = "2vw";
        }
        else if(countFiles.length > 15 && windowInnerWidth < 600){
            document.querySelector(".input__file-button-text").style.fontSize = "3vw";
        }
        else{
            document.querySelector(".input__file-button-text").style.fontSize = "5vw";
        }


        if (countFiles)
            label.querySelector('.input__file-button-text').innerText = countFiles;
        else
            label.querySelector('.input__file-button-text').innerText = labelVal;
    });
});






//
// function validateForm() {
//     var x = document.forms["changing_inf"]["fname"].value;
//     if (x == "") {
//         alert("Необходимо ввести имя");
//         return false;
//     }
// }