let homeIndex: string, guides: [object];

window.onload = async function() {
    homeIndex = window.location.search.match(/[0-9]+/)[0];
    guides = await getGuides();
    header();
    fillGuides();
    footer();
};

async function getGuides() {
    const response = await fetch('content/home/guides.json');
    return await response.json();
}

function fillGuides() {
    const pane1 = document.createElement('div');
    pane1.classList.add('album', 'py-5', 'bg-light');
    document.querySelector('body').appendChild(pane1);
    const pane2 = document.createElement('div');
    pane2.classList.add('container');
    pane1.appendChild(pane2);
    const pane3 = document.createElement('div');
    pane3.classList.add('row');
    pane2.appendChild(pane3);
    // @ts-ignore
    const content = guides[homeIndex];
    for (const i in content) {
        const pane4 = document.createElement('div');
        pane4.classList.add('col-md-4');
        pane3.appendChild(pane4);
        const pane5 = document.createElement('div');
        pane5.classList.add('card', 'mb-4', 'box-shadow');
        pane4.appendChild(pane5);
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.style.height = '255px';
        img.style.width = '100%';
        img.style.display = 'block';
        img.src = 'content/home/img/guide-' + (Number(homeIndex) * Number(i)) +'.png';
        pane5.appendChild(img);
        const pane6 = document.createElement('div');
        pane6.classList.add('card-body');
        pane5.appendChild(pane6);
        const title = document.createElement('h4');
        title.innerText = content[i].name;
        pane6.appendChild(title);
        const text = document.createElement('p');
        text.classList.add('card-text');
        text.innerText = content[i].text;
        pane6.appendChild(text);
        const pane7 = document.createElement('div');
        pane7.classList.add('d-flex', 'justify-content-between', 'align-items-center');
        pane6.appendChild(pane7);
        const pane8 = document.createElement('div');
        pane8.classList.add('btn-group');
        pane7.appendChild(pane8);
        const a = document.createElement('a');
        a.href = 'guide.html?id=' + (Number(homeIndex) * Number(i));
        pane8.appendChild(a);
        const button = document.createElement('button');
        button.type = 'submit';
        button.classList.add('btn', 'btn-primary');
        button.innerText = 'Приступить';
        a.appendChild(button);
    }
}
