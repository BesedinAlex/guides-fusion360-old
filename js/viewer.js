/*
* https://www.giftofspeed.com/javascript-compressor/
* Перед загрузкой на сервер
* */

var scene, camera, renderer, controls;

window.onload = function() {
    init();
    animate();
};

function init() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdcdcdc);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(300, 0, 0);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 400;

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("model/material.mtl", function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load("model/object.obj", function (mesh) {
            mesh.traverse(function (node) {
                if (node instanceof THREE.Mesh)
                    node.castShadow = node.receiveShadow = true;
            });
            scene.add(mesh);
            mesh.position.set(0, 0, 0);
        });
    });

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
