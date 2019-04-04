let homeIndex: string, guides: [object];

window.onload = async function() {
    homeIndex = window.location.search.match(/[0-9]+/)[0];
    guides = await getGuides();
    fillGuides();
};

async function getGuides() {
    const response = await fetch('content/home/guides.json');
    return await response.json();
}

function fillGuides() {
    const pane1 = document.querySelector('#content');
    // @ts-ignore
    const content = guides[homeIndex];
    for (const i in content) {
        const pane2 = document.createElement('div');
        pane2.classList.add('col-md-4', 'd-flex', 'align-items-stretch');
        pane1.appendChild(pane2);
        const pane3 = document.createElement('div');
        pane3.classList.add('card', 'mb-4', 'box-shadow');
        pane2.appendChild(pane3);
        const img = document.createElement('img');
        img.classList.add('card-img-top', 'border-bottom');
        img.style.height = '16rem';
        img.style.width = '100%';
        img.src = 'content/home/img/guide-' + (Number(homeIndex) * Number(i)) +'.png';
        img.alt = 'preview of the model';
        pane3.appendChild(img);
        const pane4 = document.createElement('div');
        pane4.classList.add('card-body', 'd-flex', 'flex-column');
        pane3.appendChild(pane4);
        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.innerText = content[i].name;
        pane4.appendChild(title);
        const text = document.createElement('p');
        text.classList.add('card-text');
        text.innerText = content[i].text;
        pane4.appendChild(text);
        const a = document.createElement('a');
        a.href = 'guide.html?id=' + (Number(homeIndex) * Number(i));
        a.classList.add('btn', 'btn-success', 'mt-auto');
        a.style.width = '125px';
        a.innerText = 'Приступить';
        pane4.appendChild(a);
    }
}
