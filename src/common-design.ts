function header() {
    const pane1 = document.createElement('div');
    pane1.classList.add('navbar', 'navbar-inverse', 'navbar-fixed-top', 'card-header');
    document.querySelector('body').appendChild(pane1);
    const pane2 = document.createElement('div');
    pane2.classList.add('container');
    pane1.appendChild(pane2);
    const pane3 = document.createElement('div');
    pane3.classList.add('navbar-header');
    pane2.appendChild(pane3);
    const a = document.createElement('a');
    a.classList.add('navbar-brand');
    a.href = 'home.html?id=1';
    a.innerText = 'Гайды по Fusion 360';
    pane3.appendChild(a);
}

function footer() {
    const pane1 = document.createElement('div');
    pane1.classList.add('card-footer');
    document.querySelector('body').appendChild(pane1);
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
}
