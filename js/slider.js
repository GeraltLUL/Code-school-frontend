/* Слайдер с цитатами */
const texts = document.querySelectorAll('.text'); //Получаем все цитаты


//Скрываем все кроме начальной
for (let i = 1; i < texts.length; i++){
    texts[i].classList.add('hide');
}

//Получаем кнопки
const first_btn = document.getElementById('first');
const second_btn = document.getElementById('second');

//номер цитаты, которая отображается
let i = 0;

//Обработчик для первой кнопки (показывает предыдущую цитату)
first_btn.addEventListener('click', () => {
    texts[i].classList.add('hide');
    texts[i].classList.remove('fade');
    i--;
    if (i < 0){
        i = 2;
    }
    texts[i].classList.remove('hide');
    texts[i].classList.add('fade');
});

//Обработчик для второй кнопки (показывает следующую цитату)
second_btn.addEventListener('click', () => {
    texts[i].classList.add('hide');
    texts[i].classList.remove('fade');
    i++;
    i = i % 3;
    texts[i].classList.remove('hide');
    texts[i].classList.add('fade');
});


function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}



while (1){
    timerNext();
    sleep(2000);
}


function timerNext(){
    texts[i].classList.add('hide');
    texts[i].classList.remove('fade');
    i++;
    i = i % 3;
    texts[i].classList.remove('hide');
    texts[i].classList.add('fade');
}



/* Кнопка в блоке с заявлением на оценку уровня знаний */
// const offer_btn = document.querySelector('.offer_btn');
//
// offer_btn.addEventListener('mouseenter', () => {
//     offer_btn.classList.add('offer_btn__active');
// });
//
// offer_btn.addEventListener('mouseout', () => {
//     offer_btn.classList.remove('offer_btn__active');
// });
