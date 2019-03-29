var scene, camera, renderer, controls;
var modelIndex, annotations;
// var raycaster, mouse;

window.onload = async function() {
    modelIndex = window.location.search.match(/[0-9]+/)[0];
    document.title += ' № ' + modelIndex;
    annotations = await getAnnotations();
    init();
    animate();
};

function init() {
    scene = new THREE.Scene();

    scene.background = new THREE.Color(0xf0f0f0);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = 'model';
    document.querySelector('#viewer').appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(225, 150, 375);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2;
    controls.zoomSpeed = 2;

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load(modelIndex + '/example/material.mtl', (materials) => {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load(modelIndex + '/example/object.obj', (mesh) => scene.add(mesh));
    });

    for (const i in annotations)
        addAnnotation(i);

    window.addEventListener('resize', onWindowResize);

    // raycaster = new THREE.Raycaster();
    // mouse = new THREE.Vector2();
    // window.addEventListener('click', onMouseClick);
}

function animate() {
    requestAnimationFrame(animate);
    for (const i in annotations) {
        const p2 = new THREE.Vector3(annotations[i].x, annotations[i].y, annotations[i].z);
        p2.project(camera);
        p2.x = Math.round((p2.x + 1) * document.querySelector('#model').width / 4);
        p2.y = Math.round((-p2.y + 1) * document.querySelector('#model').height / 4);
        document.querySelector('#annotation-' + i).style.left = p2.x + "px";
        document.querySelector('#annotation-' + i).style.top = p2.y + "px";
        document.querySelector('#annotation-index-' + i).style.left = p2.x - 15 + "px";
        document.querySelector('#annotation-index-' + i).style.top = p2.y - 15 + "px";
    }
    controls.update();
    renderer.render(scene, camera);
    changeVisibilityOfAnnotations();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

async function getAnnotations () {
    let response = await fetch(modelIndex + '/example/annotations.json');
    return await response.json();
}

function addAnnotation(index) {
    const annotation = document.createElement('div');
    annotation.id = 'annotation-' + index;
    annotation.classList.add('annotation', 'hidden');
    document.querySelector('body').appendChild(annotation);
    const annotationText = document.createElement('p');
    annotationText.id = 'annotation-text-' + index;
    annotation.appendChild(annotationText);
    const annotationNumber = document.createElement('div');
    annotationNumber.id = 'annotation-index-' + index;
    annotationNumber.classList.add('annotation-number');
    annotationNumber.innerText = + index + 1;
    annotationNumber.addEventListener('click', () => hideAnnotation(index));
    document.querySelector('body').appendChild(annotationNumber);
}

function hideAnnotation(index) {
    const annotation = document.querySelector('#annotation-' + index);
    const hidden = annotation.classList.contains('hidden');
    document.querySelector('#annotation-text-' + index).innerHTML = hidden ? annotations[index].text : '';
    if (hidden)
        annotation.classList.remove('hidden');
    else
        annotation.classList.add('hidden');
}

function getClosestAnnotation() {
    let indexOfClosest;
    let distToClosest = Math.pow(2, 32);
    for (const i in annotations) {
        const camPos = camera.position;
        const pPos = annotations[i];
        const dist = Math.sqrt(Math.pow((camPos.x - pPos.x),2) + Math.pow((camPos.y - pPos.y),2) + Math.pow((camPos.z - pPos.z),2));
        if (distToClosest > dist) {
            distToClosest = dist;
            indexOfClosest = +i;
        }
    }
    return indexOfClosest;
}

function changeVisibilityOfAnnotations() {
    for (const i in annotations) {
        document.querySelector('#annotation-' + i).style.zIndex = getClosestAnnotation() === +i ? 1 : 0;
        document.querySelector('#annotation-index-' + i).style.zIndex = getClosestAnnotation() === +i ? 1 : 0;
    }
}

// function onMouseClick(event) {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(scene.children, true);
//     if (intersects.lenght !== 0) {
//         currentPoint = intersects[0].point;
//         console.log(currentPoint);
//     }
// }
