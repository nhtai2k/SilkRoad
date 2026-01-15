import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-three3',
  imports: [],
  templateUrl: './three3.component.html',
  styleUrl: './three3.component.scss'
})
export class Three3Component implements AfterViewInit, OnDestroy {
  //#region Properties
  @ViewChild('canvasContainer', { static: true }) containerRef!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Object3D;
  //#endregion
  //#region Hooks
    ngOnDestroy(): void {
    this.renderer?.dispose();
    this.controls?.dispose();
  }
  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }
  //#endregion
  //#region Private Methods
  private initThree(): void {
    // Get the container element
    const container = this.containerRef.nativeElement;

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    // Create camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 0.5, 3); // Adjust the camera position as needed

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // Create controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;
    this.controls.screenSpacePanning = false; // Prevents panning in screen space
    this.controls.maxPolarAngle = Math.PI / 2; // Prevents the camera from going below the ground
    //Load a model
    const loader = new GLTFLoader();
    loader.load('assets/models/header.glb', (gltf) => {
      this.model = gltf.scene;
      // Scale and position the model appropriately
      this.model.scale.setScalar(1);
      this.model.position.set(0, -1, 0);

      // Enable shadows for the model
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      this.scene.add(this.model);
    });

    //Create light
    const color = 0xffffff;
    const intensity = 100;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(-1, 2, 4);// Position the light above the scene
    this.scene.add(light);
  }

    private animate(): void {
    requestAnimationFrame(() => this.animate());
    if (this.model) {
      this.model.rotation.y += 0.01; // Rotate the model
    }
    this.renderer.render(this.scene, this.camera);
  }
  //#endregion

}
