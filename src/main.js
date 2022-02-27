import '../css/style.css';

import { Scene, PerspectiveCamera, WebGLRenderer, Group, BoxGeometry, MeshBasicMaterial, Mesh, DirectionalLight, AmbientLight} from 'three';

import { createArrow } from './shapes';
import { GeoMap } from './geomap';

import { ArjsDeviceOrientationControls } from './ArjsDeviceOrientationControls';
import { Vector3 } from 'three';
import { CameraPreview } from './camera-preview';
import { isIOS} from './device';

let scene, camera, renderer;
let world, geoMap;
let arrow;
let orientationControls;
let cameraPreview;
let started = false;

function init(){
  console.log('v 0.0.3');
  scene = new Scene();
  camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new WebGLRenderer({antialias:true, alpha:true});
  
  resize();
  const main = document.getElementById('main');
  main.appendChild(renderer.domElement);
  world = new Group();
 
  if(isIOS){
    setupPermissions();
    started = false;
  }
  else {
    setupSceneContent();
    
  }
  initDeviceOrientationControls();
 
  cameraPreview = new CameraPreview(scene, renderer);
  cameraPreview.play();
  update();
}

function setupPermissions(){
  const overlay = document.querySelector('.overlay');
  overlay.style.display = 'block';
  const startBtn = document.querySelector('.start-btn');
  startBtn.addEventListener('click', () => {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === "granted") {
          orientationControls.startIOSCompass();
          setupSceneContent();
          overlay.remove();

        } else {
          alert("has to be allowed!");
        }
      })
      .catch(() => alert("not supported"));

  })

}

function testLocation(){
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(()=>{
    console.log('onsuccess')
  }, 
  (err) => {
    console.warn('error', err);
  }
  , options)
}

function initDeviceOrientationControls(){
  orientationControls = new ArjsDeviceOrientationControls(world);
  if(!isIOS){
    orientationControls.alphaOffset = Math.PI;
  }
}

function setupSceneContent(){
 
  
  scene.add(world);
  setLights();
  arrow = createArrow();
  arrow.position.set(0, -1  , 0);

  geoMap = new GeoMap(world, arrow);
  world.add(arrow);


  camera.position.set(0, 0, 3);
  camera.lookAt(new Vector3(0,0,0));

  started = true;
}

function setLights(){
  const directionalLight = new DirectionalLight( 0xffffff, 0.5 );
  scene.add( directionalLight );
  const light = new AmbientLight( 0x333333 ); // soft white light
  scene.add( light );
}



function update(){
  requestAnimationFrame(update);
  if(!started) return;
  orientationControls.update();
  cameraPreview.update();
  geoMap.update();
  renderer.render(scene, camera);
}

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('DOMContentLoaded', init);