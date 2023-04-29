const loginDiv = document.querySelector('#login');
const registerDiv = document.querySelector('#register');

function showRegisterForm() {
    loginDiv.style.display = "none";
    registerDiv.style.display = "block";
}

function showLoginForm() {
    loginDiv.style.display = "block";
    registerDiv.style.display = "none";
}

function erorrHandlerReg() {
    document.querySelector('#floatingInputL1').classList.add('errorInput');
    document.querySelector('#floatingPasswordL1').classList.add('errorInput');
}
function erorrHandlerLog() {
    document.querySelector('#floatingInputR1').classList.add('errorInput');
    document.querySelector('#floatingInputR2').classList.add('errorInput');
    document.querySelector('#floatingInputR3').classList.add('errorInput');
    document.querySelector('#floatingInputR4').classList.add('errorInput');
    document.querySelector('#floatingInputR5').classList.add('errorInput');
}

function Timer(n) {
    if (n == 1) {
        setTimeout(erorrHandlerLog, 2500);
    }
    else {
        setTimeout(erorrHandlerReg, 2500);
    }
}