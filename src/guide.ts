let guideIndex: string, guide: [any];

window.onload = async function() {
    header();
    guideIndex = window.location.search.match(/[0-9]+/)[0];
    document.title += ' № ' + guideIndex;
    guide = await getGuide();
    fillGuide();
    footer();
    fixFooter();
};

async function getGuide () {
    const response = await fetch('content/' + guideIndex + '/guide.json');
    return await response.json();
}

function fillGuide() {
    (document.querySelector('#model') as HTMLBaseElement).href = 'viewer.html?id=' + guideIndex;
    const ul = document.querySelector('ul');
    for (const i in guide) {
        const li = document.createElement('li');
        li.classList.add('px-2');
        ul.appendChild(li);
        const a = document.createElement('a');
        a.classList.add('btn', 'btn-success');
        a.innerText = guide[i].name.substr(1);
        a.style.color = '#fff';
        a.setAttribute('data-toggle', 'modal');
        a.setAttribute('data-target', '#modal');
        a.addEventListener('click',() => fillModal(i));
        li.appendChild(a);
    }
}

function fillModal(index: string) {
    // @ts-ignore
    const content = guide[index];
    document.querySelector('#modal-title').innerHTML = content.name.substr(1);
    const window = document.querySelector('#modal-body');
    window.innerHTML = '';
    for (const i in content) {
        const firstSym = content[i][0];
        switch (firstSym) {
            case '*': // Image
                const jsonImg = content[i].substr(1);
                const linkToImg = 'content/' + guideIndex + '/img/' + jsonImg;
                const img = document.createElement('img');
                img.style.maxWidth = '100%';
                img.src = linkToImg;
                window.appendChild(img);
                break;
            case '@': // Video
                // TODO: Input video.
                break;
            case '$': // Fusion Model
                // TODO: Make downloadable fusion model.
                break;
            case '!': // Name of model
                break;
            default:  // Text
                const p = document.createElement('p');
                p.innerText = content[i];
                window.appendChild(p);
                break;
        }
    }
}

function fixFooter() {
    const footer = document.querySelector('#footer') as HTMLBaseElement;
    footer.style.position = 'absolute';
    footer.style.bottom = '0';
    footer.style.width = '100%';
}
