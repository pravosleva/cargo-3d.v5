import {
  // SphereBufferGeometry,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import { linear } from 'math-interpolate'
// @ts-ignore
import colorRangePicker from 'color-range-getter'

const picker = colorRangePicker.init('#ffffff','#fb5b53');

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
  const targetPercentage = linear({
    x1: 0,
    y1: 0,
    x2: mass.maxLimit,
    y2: 100,
    x: mass.target,
  })
  const targetRadius = linear({
    x1: 0,
    y1: radiusRange[0],
    x2: mass.maxLimit,
    y2: radiusRange[1],
    x: mass.target,
  })
  const targetColor = picker.getHexColor(targetPercentage)
  const geo = new SphereGeometry(targetRadius)
  const mat = new MeshBasicMaterial({
    color: targetColor, // 0xFFFFFF,
  })
  const mesh = new Mesh(geo, mat)
  mesh.position.set(x, y, z)
  mesh.name = name
  return mesh
}
