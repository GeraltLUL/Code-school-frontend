const texts = document.querySelectorAll('.text');

for (let i = 1; i < texts.length; i++){
    texts[i].classList.add('hide');
}


const first_btn = document.getElementById('first');
const second_btn = document.getElementById('second');

let i = 0; //номер цитаты, которая отображается

first_btn.addEventListener('click', () => {
    texts[i].classList.remove('show');
    texts[i].classList.add('hide');
    i--;
    i = math.abs(i % 3);
    texts[i].classList.add('show');
});

second_btn.addEventListener('click', () => {
    texts[i].classList.remove('show');
    texts[i].classList.add('hide');
    i++;
    i = i % 3;
    texts[i].classList.add('show');
});

