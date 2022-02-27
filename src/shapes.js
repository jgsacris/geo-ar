import { MeshStandardMaterial } from 'three';
import { Shape, ExtrudeGeometry, MeshBasicMaterial, Mesh} from 'three';

export function createArrow(){
  const size = 2;
  const halfSize = size/2;
  const shape = new Shape();
  shape.moveTo(0, -halfSize);
  shape.lineTo(-halfSize, -halfSize);
  shape.lineTo(0, size);
  shape.lineTo(halfSize, -halfSize);
  shape.lineTo(0, -halfSize);

  const extrudeSettings = {
    steps: 100,
    depth: 0.01
  }

  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  const material = new MeshStandardMaterial({color: 0x00ff00});
  const mesh = new Mesh(geometry, material);
  mesh.scale.multiplyScalar(0.5);
  mesh.rotation.x = Math.PI/2;
  return mesh;

}