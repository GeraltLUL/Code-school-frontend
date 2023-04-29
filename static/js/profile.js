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