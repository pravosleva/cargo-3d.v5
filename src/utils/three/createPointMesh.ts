import {
  // SphereBufferGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import { linear } from 'math-interpolate'

export const createPointMesh = ({ name, x, y, z, mass }: {
  name: string;
  x: number;
  y: number;
  z: number;
  mass: {
    maxLimit: number;
    target: number;
  };
}) => {
  const radiusRange = [0.1, 0.3]
  const targetRadius = linear({
    x1: 0,
    y1: radiusRange[0],
    x2: mass.maxLimit,
    y2: radiusRange[1],
    x: mass.target,
  })
  const geo = new SphereGeometry(targetRadius)
  const mat = new MeshBasicMaterial({
    color: 0xFFFFFF,
  })
  const mesh = new Mesh(geo, mat)
  mesh.position.set(x, y, z)
  mesh.name = name
  return mesh
}
