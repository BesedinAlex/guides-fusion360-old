let guideIndex, guide;

window.onload = async function() {
    guideIndex = new URLSearchParams(window.location.search).get('id');
    document.title += ' № ' + guideIndex;
    guide = await getGuide();
    fillGuide();
};

async function getGuide () {
    const response = await fetch('content/' + guideIndex + '/guide.json');
    return await response.json();
}

function fillGuide() {
    const preview = document.querySelector('#preview') as HTMLImageElement;
    preview.src = 'content/home/img/guide-' + guideIndex + '.png';

    const ul = document.querySelector('ul');

    for (const i in guide) {

        const li = document.createElement('li');
        li.classList.add('px-2', 'py-2');
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
    const li = document.createElement('li');
    li.classList.add('px-2', 'py-2');
    ul.appendChild(li);

    const a = document.createElement('a');
    a.classList.add('btn', 'btn-warning');
    a.innerText = 'Посмотреть в 3D';
    a.href = 'viewer.html?id=' + guideIndex;
    a.style.color = '#fff';
    li.appendChild(a);
}

function fillModal(index: string) {
    // @ts-ignore
    const content = guide[index];
    const modalTitle = document.querySelector('#modal-title');
    modalTitle.innerHTML = content.name.substr(1)
    ;
    const modalWindow = document.querySelector('#modal-body');
    modalWindow.innerHTML = '';

    for (const i in content) {

        const firstSym = content[i][0];
        switch (firstSym) {
            case '!': // Name of model
                break;
            case '*': // Image
                const jsonImg = content[i].substr(1);
                const linkToImg = 'content/' + guideIndex + '/img/' + jsonImg;
                const img = document.createElement('img');

                img.style.maxWidth = '100%';
                img.src = linkToImg;
                modalWindow.appendChild(img);

                const openImg = document.createElement('a');
                openImg.innerText = 'Рис. ' + jsonImg.match(/[0-9]+/)[0];
                openImg.href = linkToImg;
                openImg.onclick = (event) => {
                    event.preventDefault();
                    window.open(linkToImg, '_blank');
                };

                modalWindow.appendChild(openImg);
                modalWindow.appendChild(document.createElement('br'));
                break;
            case '@': // Video
                const iframeDiv = document.createElement('div');
                iframeDiv.classList.add('embed-responsive', 'embed-responsive-16by9');

                modalWindow.appendChild(iframeDiv);
                modalWindow.appendChild(document.createElement('br'));

                const iframe = document.createElement('iframe');
                iframe.classList.add('embed-responsive-item');
                iframe.src = content[i].substr(1);
                iframe.allowFullscreen = true;
                iframeDiv.appendChild(iframe);
                break;
            case '$': // Fusion Models
                // TODO: Make downloadable fusion models (better use .zip).
                break;
            default:  // Text
                const p = document.createElement('p');
                p.innerText = content[i];
                modalWindow.appendChild(p);
                break;
        }
    }
}
