import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotService } from '@services/chatbot-services/chatbot.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-three1',
  imports: [CommonModule],
  templateUrl: './three1.component.html',
  styleUrl: './three1.component.scss'
})
export class Three1Component implements AfterViewInit, OnDestroy, OnInit {
  //#region Properties
  @ViewChild('canvasContainer', { static: true }) containerRef!: ElementRef;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private cube!: THREE.Mesh;
  private audio?: HTMLAudioElement; // Add audio property for cleanup
  private audioContext?: AudioContext;
  audioLoaded = false; // Make public for template access
  userInteracted = false; // Make public for template access
  isAudioPlaying = false; // Track audio playing state


  //#endregion
  //#region hooks
  constructor(private chatBotService: ChatbotService) {
    // Constructor logic if needed
  }
  ngOnInit(): void {
    this.setupUserInteractionListener();
    this.loadAudio();
  }
  ngOnDestroy(): void {
    this.renderer?.dispose();
    this.controls?.dispose();
    // Clean up audio resources
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = undefined;
    }
    // Clean up audio context
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    // Remove event listeners
    document.removeEventListener('click', this.handleUserInteraction);
    document.removeEventListener('keydown', this.handleUserInteraction);
  }
  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
  }
  //#endregion
  //#region Private Methods
  
  private setupUserInteractionListener(): void {
    // Add event listeners for user interaction
    document.addEventListener('click', this.handleUserInteraction, { once: true });
    document.addEventListener('keydown', this.handleUserInteraction, { once: true });
  }

  private handleUserInteraction = (): void => {
    this.userInteracted = true;
    
    // Try to play audio if it's loaded
    if (this.audioLoaded && this.audio) {
      this.playAudio();
    }
    
    // Initialize audio context if needed
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Public method for template access
  public enableAudio(): void {
    this.handleUserInteraction();
  }

  public toggleAudio(): void {
    if (!this.audio) return;
    
    if (this.isAudioPlaying) {
      this.audio.pause();
      this.isAudioPlaying = false;
    } else {
      this.playAudio();
    }
  }

  private loadAudio(): void {
    this.chatBotService.getMusic().subscribe({
      next: (data) => {
        // Check if music file is not empty (blob exists and has size > 0)
        if (data && data.size > 0) {
          const audioUrl = URL.createObjectURL(data);
          this.audio = new Audio(audioUrl);
          this.audio.loop = true;
          this.audio.preload = 'auto';
          
          // Set up audio event handlers
          this.audio.addEventListener('canplaythrough', () => {
            this.audioLoaded = true;
            console.log('Audio loaded successfully');
            
            // Try to play if user has already interacted
            if (this.userInteracted) {
              this.playAudio();
            }
          });
          
          this.audio.addEventListener('play', () => {
            this.isAudioPlaying = true;
          });
          
          this.audio.addEventListener('pause', () => {
            this.isAudioPlaying = false;
          });
          
          this.audio.addEventListener('error', (error) => {
            console.error('Audio loading error:', error);
          });
          
          console.log('Audio setup completed, waiting for user interaction');
        } else {
          console.log('Music file is empty or not available');
        }
      },
      error: (error) => {
        console.error('Error fetching music:', error);
      }
    });
  }

  private async playAudio(): Promise<void> {
    if (!this.audio || !this.userInteracted) {
      console.log('Cannot play audio: audio not loaded or user has not interacted');
      return;
    }

    try {
      await this.audio.play();
      console.log('Audio playing successfully');
    } catch (error) {
      console.error('Error playing audio:', error);
      
      // If autoplay fails, we could show a play button to the user
      this.showPlayButton();
    }
  }

  private showPlayButton(): void {
    // You could implement a UI button here for manual audio control
    console.log('Consider adding a play button for manual audio control');
  }

  private initThree(): void {
    const container = this.containerRef.nativeElement;

    //Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee);

    //Create camera
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    this.camera.position.set(0, 2, 3);

    //Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    //Create controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.25;



    //Create cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x44aa88, flatShading: false });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    //Create wireframe
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    this.cube.add(wireframe);

    //Create light
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);


  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.004;
    this.cube.rotation.y += 0.004;
    this.controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    this.renderer.render(this.scene, this.camera);
  }
  //#endregion

}
