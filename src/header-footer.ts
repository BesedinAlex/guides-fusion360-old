function header() {
    const pane1 = document.querySelector('#header') as HTMLBaseElement;
    pane1.style.backgroundColor = '#563d7c';
    pane1.classList.add('py-2');
    const pane2 = document.createElement('div');
    pane2.classList.add('container');
    pane1.appendChild(pane2);
    const a = document.createElement('a');
    a.classList.add('navbar-brand');
    a.href = 'home.html?id=1';
    a.style.color = '#fff';
    a.style.fontSize = '2rem';
    a.innerText = 'FUSION360GUIDE';
    pane2.appendChild(a);
}

function footer() {
    const pane1 = document.querySelector('#footer') as HTMLBaseElement;
    pane1.classList.add('card-footer', 'bg-dark');
    pane1.style.color = '#fff';
    const pane2 = document.createElement('div');
    pane2.classList.add('container');
    pane1.appendChild(pane2);
    const line1 = document.createElement('span');
    line1.innerHTML = 'Данный сайт разработан студентами <a href="https://mospolytech.ru">Московского Политеха</a>.';
    pane2.appendChild(line1);
    pane2.appendChild(document.createElement('br'));
    const line2 = document.createElement('span');
    line2.innerHTML = 'Исходный код можно найти на <a href="https://github.com/BesedinAlex/guides-fusion360">Github</a>.';
    pane2.appendChild(line2);
    pane2.appendChild(document.createElement('br'));
    const line3 = document.createElement('span');
    line3.innerHTML = 'Узнать больше про Fusion 360 можно на сайте <a href="https://autodesk.com/products/fusion-360/overview">Autodesk</a>.';
    pane2.appendChild(line3);
    pane2.appendChild(document.createElement('br'));
    const links = document.querySelectorAll('#footer > div > span > a');
    for (let i = 0; i < 3; i++)
        links[i].classList.add('text-warning');
}
