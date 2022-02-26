import '../css/style.css';

import { Scene, PerspectiveCamera, WebGLRenderer, Group, BoxGeometry, MeshBasicMaterial, Mesh, DirectionalLight, AmbientLight} from 'three';

import { createArrow } from './shapes';
import { Compass3d} from './Compass3d';
import { ArjsDeviceOrientationControls } from './ArjsDeviceOrientationControls';
import { Vector3 } from 'three';

let scene, camera, renderer;
let world;
let arrow;
let orientation;
let orientationControls

function init(){
  scene = new Scene();
  camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new WebGLRenderer({antialias:true});
  resize();
  document.body.appendChild(renderer.domElement);
  setupSceneContent();
  //initOrientation();
  initDeviceOrientationControls();
  update();
}

function initOrientation(){
  Compass3d.init();
  Compass3d.getBearing$().subscribe((value) => {
    orientation = value;
  }) 
}

function initDeviceOrientationControls(){
  orientationControls = new ArjsDeviceOrientationControls(world);
  orientationControls.alphaOffset = Math.PI;
}

function setupSceneContent(){
 
  world = new Group();
  scene.add(world);
  setLights();
  arrow = createArrow();
  arrow.position.set(0, -1  , 0);
  world.add(arrow);

  camera.position.set(0, 0, 3);
  camera.lookAt(new Vector3(0,0,0));
}

function setLights(){
  const directionalLight = new DirectionalLight( 0xffffff, 0.5 );
  scene.add( directionalLight );
  const light = new AmbientLight( 0x333333 ); // soft white light
  scene.add( light );
}

function test(){
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial( { color: 0x00ff00 } );
  const cube = new Mesh( geometry, material );
  world.add( cube );
}

function update(){
  requestAnimationFrame(update);

  //world.rotation.set(0, orientation, 0 )
  orientationControls.update();
  renderer.render(scene, camera);
}

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('DOMContentLoaded', init);