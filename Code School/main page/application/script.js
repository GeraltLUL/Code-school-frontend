const btn = document.querySelector('.btn');

console.log(btn);


btn.addEventListener('mouseenter', () => {
    btn.classList.add('btn_active');
});

btn.addEventListener('mouseout', () => {
    btn.classList.remove('btn_active');
});