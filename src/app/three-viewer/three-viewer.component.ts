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

  constructor(
    private elRef: ElementRef,
    private currentRoute: ActivatedRoute,
    private data: ContentService
  ) {
    this.host = this.elRef.nativeElement;
    this.currentRoute.params.subscribe(param => this.id = param.id);
  }

  ngOnInit() {
    this.init();
    this.animate();
  }

  private init() {
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

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    window.addEventListener('click', this.getCoordinatesOfClick);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
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

}
