import {OrthographicCamera, 
  Scene, 
  PlaneBufferGeometry,
   VideoTexture, 
   Mesh, 
   MeshBasicMaterial, 
   PerspectiveCamera} from 'three';

export class CameraPreview{
  
  constructor(scene, renderer){
    this.scene = scene;
    this.renderer = renderer;
    this.renderer.autoClear = false;
    this.texCamera = new OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 10);

    this.texScene = new Scene();
    this.video = document.createElement("video");
    this.video.setAttribute("autoplay", true);
    this.video.setAttribute("playsinline", true);
    this.video.setAttribute("display", "none");
    document.body.appendChild(this.video);
    this.geom = new PlaneBufferGeometry(); //0.5, 0.5);
    this.texture = new VideoTexture(this.video);
    this.material = new MeshBasicMaterial( { map: this.texture } );
    const mesh = new Mesh(this.geom, this.material);
    this.texScene.add(mesh);
  }

  play(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = { video: {
          facingMode: 'environment' }
      };
      navigator.mediaDevices.getUserMedia(constraints).then( stream=> {
          this.video.srcObject = stream;    
          this.video.play();
      })
      .catch(e => { alert(`Webcam error: ${e}`); });
    } else {
        alert('sorry - media devices API not supported');
    }
  }

  update() {
    this.renderer.clear();
    this.renderer.render(this.texScene, this.texCamera);
    this.renderer.clearDepth();
  }

  pause(){
    this.video.srcObject.getTracks().forEach ( track => {
      track.stop();
    });
  }

  dispose(){
    this.material.dispose();
    this.texture.dispose();
    this.geom.dispose();
  }
}