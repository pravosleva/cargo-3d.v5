import {
  // SphereBufferGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'


export const createPointMesh = ({ name, x, y, z }: {
  name: string;
  x: number;
  y: number;
  z: number;
}) => {
  const geo = new SphereGeometry(0.3)
  const mat = new MeshBasicMaterial({
    color: 0xFFFFFF,
  })
  const mesh = new Mesh(geo, mat)
  mesh.position.set(x, y, z)
  mesh.name = name
  return mesh
}
