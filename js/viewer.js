var scene, camera, renderer, mesh;
var meshFloor, ambientLight, light;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

function main(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Model/material loading!
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("model/material.mtl", function(materials) {

        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("model/object.obj", function(mesh) {

            mesh.traverse(function(node) {
                if( node instanceof THREE.Mesh ) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });

            scene.add(mesh);
            mesh.position.set(0, 0, 0);
            mesh.rotation.y = -Math.PI/4;
        });

    });

    camera.position.set(0, player.height, -5);
    camera.lookAt(new THREE.Vector3(0, player.height,0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(1280, 720);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;

    document.body.appendChild(renderer.domElement);

    animate();
}

function animate(){
    requestAnimationFrame(animate);

    if(keyboard[87]){ // W key
        camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
        camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
    }
    if(keyboard[83]){ // S key
        camera.position.x += Math.sin(camera.rotation.y) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
    }
    if(keyboard[65]){ // A key
        camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
    }
    if(keyboard[68]){ // D key
        camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
        camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
    }

    if(keyboard[37]){ // left arrow key
        camera.rotation.y -= player.turnSpeed;
    }
    if(keyboard[39]){ // right arrow key
        camera.rotation.y += player.turnSpeed;
    }

    renderer.render(scene, camera);
}

function keyDown(event){
    keyboard[event.keyCode] = true;
}

function keyUp(event){
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = main;