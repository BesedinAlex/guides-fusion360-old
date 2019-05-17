import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContentService} from '../services/content.service';
import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';

@Component({
  selector: 'app-three-viewer',
  templateUrl: './three-viewer.component.html',
  styleUrls: ['./three-viewer.component.sass']
})
export class ThreeViewerComponent implements OnInit {

  private id: number;
  private host: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: TrackballControls;
  private mouse: THREE.Vector2;
  private raycaster: THREE.Raycaster;
  private currentPoint: any;
  private annotations;

  constructor(
    private elRef: ElementRef,
    private currentRoute: ActivatedRoute,
    private data: ContentService
  ) {
    this.host = this.elRef.nativeElement;
    this.currentRoute.params.subscribe(param => this.id = param.id);
    this.annotations = data.annotations.find(annotations => annotations.id === +this.id).annotations;
  }

  ngOnInit() {
    this.init();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color(0xf0f0f0);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    new MTLLoader().load(`../../assets/guides/${this.id}/model.mtl`, (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      // @ts-ignore
      objLoader.setMaterials(materials);
      objLoader.load(`../../assets/guides/${this.id}/model.obj`, (mesh) => this.scene.add(mesh));
    });

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.host.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 5000);
    this.camera.position.set(225, 150, 375);

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);
    this.controls.rotateSpeed = 2;
    this.controls.zoomSpeed = 2;

    window.addEventListener('resize', this.onWindowResize);

    // tslint:disable-next-line:forin
    for (const i in this.annotations) {
      this.addAnnotation(i);
    }

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    window.addEventListener('click', this.getCoordinatesOfClick);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    // tslint:disable-next-line:forin
    // for (const i in this.annotations) {
    //   const coords = this.annotations[i];
    //   // @ts-ignore
    //   const p2 = new THREE.Vector3(coords.x, coords.y, coords.z);
    //   const annotation = document.querySelector('#annotation-' + i) as HTMLFormElement;
    //   const annotationIndex = document.querySelector('#annotation-index-' + i) as HTMLFormElement;
    //   p2.project(this.camera);
    //   p2.x = Math.round((p2.x + 1) * this.renderer.domElement.width / 2 / window.devicePixelRatio);
    //   p2.y = Math.round((-p2.y + 1) * this.renderer.domElement.height / 2 / window.devicePixelRatio);
    //   annotation.style.left = p2.x + 'px';
    //   annotation.style.top = p2.y + 'px';
    //   annotationIndex.style.left = p2.x - 15 + 'px';
    //   annotationIndex.style.top = p2.y - 15 + 'px';
    // }
  }

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  getCoordinatesOfClick = (event) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    if (intersects.length !== 0) {
      this.currentPoint = intersects[0].point;
      console.log(this.currentPoint);
    }
  }

  addAnnotation(index) {
    const annotation = document.createElement('div');
    annotation.id = 'annotation-' + index;
    annotation.classList.add('annotation', 'hidden');

    const annotationText = document.createElement('p');
    annotationText.id = 'annotation-text-' + index;
    annotation.appendChild(annotationText);

    const annotationNumber = document.createElement('div');
    annotationNumber.id = 'annotation-index-' + index;
    annotationNumber.classList.add('annotation-number');
    annotationNumber.innerText = (+index + 1).toString();
    annotationNumber.addEventListener('click', () => this.hide(index));

    this.host.appendChild(annotation);
    this.host.appendChild(annotationNumber);
  }

  hide(index) {
    const annotation = document.querySelector('#annotation-' + index);
    const annotationText = document.querySelector('#annotation-text-' + index);
    const hidden = annotation.classList.contains('hidden');
    annotationText.innerHTML = hidden ? this.annotations[index].text : '';
    if (hidden) {
      annotation.classList.remove('hidden');
    } else {
      annotation.classList.add('hidden');
    }
  }
}
