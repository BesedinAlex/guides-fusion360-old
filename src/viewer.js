let scene, camera, renderer, controls, modelIndex, raycaster, mouse;

window.onload = async function() {
    modelIndex = new URLSearchParams(window.location.search).get('id');
    document.title += ' № ' + modelIndex;
    init();
    await Annotations.init();
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
    document.querySelector('body').appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(225, 150, 375);

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 2;
    controls.zoomSpeed = 2;

    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.load('content/' + modelIndex + '/model.mtl', (materials) => {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('content/' + modelIndex + '/model.obj', (mesh) => scene.add(mesh));
    });

    window.addEventListener('resize', onWindowResize);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    window.addEventListener('click', getCoordinatesOfClick);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    Annotations.update();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function getCoordinatesOfClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.lenght !== 0) {
        currentPoint = intersects[0].point;
        console.log(currentPoint);
    }
}
