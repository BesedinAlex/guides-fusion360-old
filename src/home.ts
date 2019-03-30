let homeIndex: string, guides: [object];

window.onload = async function() {
    homeIndex = window.location.search.match(/[0-9]+/)[0];
    guides = await getGuides();
    fillHomePage();
};

async function getGuides() {
    const response = await fetch('content/home/guides.json');
    return await response.json();
}

function fillHomePage() {
    // @ts-ignore
    const content = guides[homeIndex];
    const page = document.querySelector('#content');
    for (const i in content) {
        const pane1 = document.createElement('div');
        pane1.classList.add('col-md-4');
        page.appendChild(pane1);
        const pane2 = document.createElement('div');
        pane2.classList.add('card', 'mb-4', 'box-shadow');
        pane1.appendChild(pane2);
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.style.height = '255px';
        img.style.width = '100%';
        img.style.display = 'block';
        img.src = 'content/home/img/guide-' + (Number(homeIndex) * Number(i)) +'.png';
        pane2.appendChild(img);
        const pane3 = document.createElement('div');
        pane3.classList.add('card-body');
        pane2.appendChild(pane3);
        const title = document.createElement('h4');
        title.innerText = content[i].name;
        pane3.appendChild(title);
        const text = document.createElement('p');
        text.classList.add('card-text');
        text.innerText = content[i].text;
        pane3.appendChild(text);
        const pane4 = document.createElement('div');
        pane4.classList.add('d-flex', 'justify-content-between', 'align-items-center');
        pane3.appendChild(pane4);
        const pane5 = document.createElement('div');
        pane5.classList.add('btn-group');
        pane4.appendChild(pane5);
        const a = document.createElement('a');
        a.href = 'guide.html?id=' + (Number(homeIndex) * Number(i));
        pane5.appendChild(a);
        const button = document.createElement('button');
        button.type = 'submit';
        button.classList.add('btn', 'btn-primary');
        button.innerText = 'Приступить';
        a.appendChild(button);
    }
}
