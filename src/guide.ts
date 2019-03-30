let guideIndex: string, guide: [any];

window.onload = async function() {
    header();
    guideIndex = window.location.search.match(/[0-9]+/)[0];
    document.title += ' № ' + guideIndex;
    guide = await getGuide();
    fillGuide();
    footer();
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
        a.classList.add('btn', 'btn-primary');
        a.innerText = guide[i].name.substr(1);
        a.style.color = '#fff';
        a.setAttribute('data-toggle', 'modal');
        a.setAttribute('data-target', '#modal');
        li.appendChild(a);

    }



    // for (const i in guide) {
    //     const li = document.createElement('li');
    //     li.classList.add('nav-item');
    //     ul.appendChild(li);
    //     const a = document.createElement('a');
    //     a.classList.add('nav-link');
    //     a.setAttribute('role', 'tab');
    //     a.setAttribute('aria-selected', 'false');
    //     a.setAttribute('aria-controls', 'tab-' + i);
    //     // a.setAttribute('data-toggle', 'pill');
    //     a.setAttribute('data-toggle', 'modal');
    //     a.setAttribute('data-target', '#exampleModal');
    //     a.href = '#tab-' + i;
    //     const name = guide[i].name.substr(1);
    //     // @ts-ignore
    //     a.innerText = name;
    //     li.appendChild(a);
    //     const pane3 = document.createElement('div');
    //     pane3.classList.add('tab-pane', 'fade');
    //     pane3.id = 'tab-' + i;
    //     pane2.appendChild(pane3);
    //     for (const j in guide[i]) {
    //         // @ts-ignore
    //         const firstSym = guide[i][j][0];
    //             switch (firstSym) {
    //                 case '*': // Image
    //                     const jsonImg = guide[i][j].substr(1);
    //                     const linkToImg = 'content/' + guideIndex + '/img/' + jsonImg;
    //                     const img = document.createElement('img');
    //                     img.src = linkToImg;
    //                     pane3.appendChild(img);
    //                     break;
    //                 case '@': // Video
    //                     // TODO: Input video.
    //                     break;
    //                 case '$': // Fusion Model
    //                     // TODO: Make downloadable fusion model.
    //                     break;
    //                 case '!':
    //                     break;
    //                 default:  // Text
    //                     const p = document.createElement('p');
    //                     p.innerText = guide[i][j];
    //                     pane3.appendChild(p);
    //                     break;
    //             }
    //     }
    // }
}
