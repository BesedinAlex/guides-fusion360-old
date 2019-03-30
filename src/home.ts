let homeIndex: string, guides: [object];

window.onload = async function() {
    header();
    homeIndex = window.location.search.match(/[0-9]+/)[0];
    guides = await getGuides();
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
        pane4.classList.add('col-md-4', 'd-flex', 'align-items-stretch');
        pane3.appendChild(pane4);
        const pane5 = document.createElement('div');
        pane5.classList.add('card', 'mb-4', 'box-shadow');
        pane4.appendChild(pane5);
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.style.height = '16rem';
        img.style.width = '100%';
        img.src = 'content/home/img/guide-' + (Number(homeIndex) * Number(i)) +'.png';
        img.alt = 'preview image of model';
        pane5.appendChild(img);
        const pane6 = document.createElement('div');
        pane6.classList.add('card-body', 'd-flex', 'flex-column');
        pane5.appendChild(pane6);
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerText = content[i].name;
        pane6.appendChild(title);
        const text = document.createElement('p');
        text.classList.add('card-text');
        text.innerText = content[i].text;
        pane6.appendChild(text);
        const a = document.createElement('a');
        a.href = 'guide.html?id=' + (Number(homeIndex) * Number(i));
        a.classList.add('btn', 'btn-primary', 'mt-auto');
        a.style.width = '120px';
        a.innerText = 'Приступить';
        pane6.appendChild(a);
    }
}
