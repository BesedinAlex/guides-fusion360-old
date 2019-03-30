let guideIndex: string, guide: [string];

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
    // TODO: Make it look better.
    const pane1 = document.createElement('div');
    pane1.classList.add('container');
    document.querySelector('body').appendChild(pane1);
    for (const i in guide) {
        const firstSym = guide[i][0];
        switch (firstSym) {
            case '*': // Image
                const jsonImg = guide[i].substr(1);
                const linkToImg = 'content/' + guideIndex + '/img/' + jsonImg;
                const img = document.createElement('img');
                img.src = linkToImg;
                pane1.appendChild(img);
                break;
            case '@': // Video
                // TODO: Input video.
                break;
            case '$': // Fusion Model
                // TODO: Make downloadable fusion model.
                break;
            default:  // Text
                const p = document.createElement('p');
                p.innerText = guide[i];
                pane1.appendChild(p);
                break;
        }
    }
}
