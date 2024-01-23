// import GUI from 'lil-gui'
import {
  AmbientLight,
  AxesHelper,
  BoxGeometry,
  Clock,
  GridHelper,
  Group,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  PointLightHelper,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import * as animations from './helpers/animations'
import { toggleFullScreen } from './helpers/fullscreen'
import { resizeRendererToDisplaySize } from './helpers/responsiveness'
import './style.css'
import { showNotif } from './utils/showNotif'
import { paramsCfg } from './utils/paramsCfg'
import { checkCfg } from './utils/checkCfg'
import { inSI } from './utils/inSI'
import { retail } from './utils/retail'
import { TSearchParamsNormalized } from './utils/types'
import { createPointMesh } from './utils/three/createPointMesh'

const CANVAS_ID = 'scene'

let canvas: HTMLElement
let renderer: WebGLRenderer
let scene: Scene
let loadingManager: LoadingManager
let ambientLight: AmbientLight
let pointLight: PointLight
// let cube: Mesh
let plane: Mesh
let camera: PerspectiveCamera
let cameraControls: OrbitControls
let dragControls: DragControls
let axesHelper: AxesHelper
let pointLightHelper: PointLightHelper
let clock: Clock
let stats: Stats
// let gui: GUI

const animation = { enabled: false, play: true }

init()
animate()

function init() {
  try {
    // ===== 🚫 CHECK URL PARAMS =====
    let searchParamsNormalized: TSearchParamsNormalized | undefined = undefined
    // NOTE: Link example https://pravosleva.pro/dist.cargo-3d?wagonLength=13600&wagonWidth=2400&wagonHeight=3000&wagonCarryingCapacity=20000&maxInWagon=13&maxRowsInWagon_byWagonWidth=2&maxRowsInWagon_byWagonLength=50&maxFloorsInWagon=1&cargoType=thermocold_chillers&modelName=tst&containerType=truck_v1&productList=W3siaWQiOiLRg9C90LjQutCw0LvRjNC90YvQuV%2FQsNC50LTQuF82IiwibmFtZSI6IlBST0RVQ1QgNiIsImxlbmd0aCI6MTYwMCwid2lkdGgiOjE2MDAsImhlaWdodCI6MTYwMCwid2VpZ2h0IjoxMDAwLCJjb21tZW50IjoidHN0IDYiLCJhZGRTaXplIjo1MH0seyJpZCI6ItGD0L3QuNC60LDQu9GM0L3Ri9C5X9Cw0LnQtNC4XzUiLCJuYW1lIjoiUFJPRFVDVCA1IiwibGVuZ3RoIjoxNTAwLCJ3aWR0aCI6MTUwMCwiaGVpZ2h0IjoxNTAwLCJ3ZWlnaHQiOjEwMDAsImNvbW1lbnQiOiJ0c3QgNSIsImFkZFNpemUiOjUwfSx7ImlkIjoi0YPQvdC40LrQsNC70YzQvdGL0Llf0LDQudC00LhfNCIsIm5hbWUiOiJQUk9EVUNUIDQiLCJsZW5ndGgiOjE0MDAsIndpZHRoIjoxNDAwLCJoZWlnaHQiOjE0MDAsIndlaWdodCI6MTAwMCwiY29tbWVudCI6ItCV0YnQtSDQvtC00L3QsCDQtdC00LjQvdC40YbQsCDQsiDQvNCw0YjQuNC90LUhIiwiYWRkU2l6ZSI6NTB9LHsiaWQiOiLRg9C90LjQutCw0LvRjNC90YvQuV%2FQsNC50LTQuF8zIiwibmFtZSI6IlBST0RVQ1QgMyIsImxlbmd0aCI6MTMwMCwid2lkdGgiOjEzMDAsImhlaWdodCI6MTMwMCwid2VpZ2h0IjoxMDAwLCJjb21tZW50Ijoi0JHQvtC70YzRiNC%2B0Lkg0JrRg9Cx0LjQuiAyIHggMiB4IDIiLCJhZGRTaXplIjo1MH0seyJpZCI6ItGD0L3QuNC60LDQu9GM0L3Ri9C5X9Cw0LnQtNC4XzAiLCJuYW1lIjoiUFJPRFVDVCAwIiwibGVuZ3RoIjoxMDAwLCJ3aWR0aCI6MTAwMCwiaGVpZ2h0IjoxMDAwLCJ3ZWlnaHQiOjQwMCwiY29tbWVudCI6ItCa0YPQsdC40Log0LzQtdGC0YAg0L3QsCDQvNC10YLRgCDQvdCwINC80LXRgtGAIiwiYWRkU2l6ZSI6NTB9LHsiaWQiOiLRg9C90LjQutCw0LvRjNC90YvQuV%2FQsNC50LTQuF8yIiwibmFtZSI6IlBST0RVQ1QgMiIsImxlbmd0aCI6MTIwMCwid2lkdGgiOjEyMDAsImhlaWdodCI6MTIwMCwid2VpZ2h0IjoxMDAwLCJjb21tZW50Ijoi0JHQvtC70YzRiNC%2B0Lkg0JrRg9Cx0LjQuiAyIHggMiB4IDIiLCJhZGRTaXplIjo1MH0seyJpZCI6ItGD0L3QuNC60LDQu9GM0L3Ri9C5X9Cw0LnQtNC4XzEiLCJuYW1lIjoiUFJPRFVDVCAxIiwibGVuZ3RoIjoxMTAwLCJ3aWR0aCI6MTEwMCwiaGVpZ2h0IjoxMTAwLCJ3ZWlnaHQiOjQwMCwiY29tbWVudCI6ItCa0YPQsdC40Log0LzQtdGC0YAg0L3QsCDQvNC10YLRgCDQvdCwINC80LXRgtGAIiwiYWRkU2l6ZSI6NTB9XQ%3D%3D
    const queryParams = new Proxy<URLSearchParams>(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: string) => searchParams.get(prop),
    });
    // NOTE: Get the value of "some_key" in eg "https://example.com/?some_key=some_value"; const val = queryParams.some_key
    const validateParamsResult = checkCfg<URLSearchParams>({ cfg: paramsCfg, tested: queryParams, isDebugEnabled: true })
    if (!validateParamsResult.ok) throw new Error(validateParamsResult.reason)
    else {
      showNotif({ type: 'success', title: 'Query params checked', description: validateParamsResult.reason })
      if (!!validateParamsResult.output) searchParamsNormalized = validateParamsResult.output
    }
    if (!searchParamsNormalized) throw new Error(`🚫 searchParamsNormalized is ${typeof searchParamsNormalized}`)
    // ===== 🖼️ CANVAS, RENDERER, & SCENE =====
    {
      canvas = document.querySelector(`canvas#${CANVAS_ID}`)!
      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = PCFSoftShadowMap
      scene = new Scene()
    }

    // ===== 👨🏻‍💼 LOADING MANAGER =====
    {
      loadingManager = new LoadingManager()

      loadingManager.onStart = () => {
        console.log('loading started')
      }
      loadingManager.onProgress = (url, loaded, total) => {
        console.log('loading in progress:')
        console.log(`${url} -> ${loaded} / ${total}`)
      }
      loadingManager.onLoad = () => {
        console.log('loaded!')
      }
      loadingManager.onError = () => {
        console.log('❌ error while loading')
      }
    }

    // ===== 💡 LIGHTS =====
    {
      ambientLight = new AmbientLight('white', 0.4)
      pointLight = new PointLight('#ffdca8', 1.2, 100)
      pointLight.position.set(-2, 3, 3)
      pointLight.castShadow = true
      pointLight.shadow.radius = 4
      pointLight.shadow.camera.near = 0.5
      pointLight.shadow.camera.far = 4000
      pointLight.shadow.mapSize.width = 2048
      pointLight.shadow.mapSize.height = 2048
      scene.add(ambientLight)
      scene.add(pointLight)
    }

    // ===== 📦 OBJECTS =====
    {
      const p = document.createElement('p')
      p.innerHTML = 'PAR'
      p.style.width = '320px'
      // p.style.width = '100%'
      // p.style.maxWidth = 'calc(100vw - 16px - 16px)'
      p.style.height = 'auto'
      p.style.padding = '16px'
      p.style.border = '4px solid transparent'
      // p.style.backgroundColor = '#fff'
      p.style.borderRadius = 'inherit'
      p.style.color = 'black'
      p.style.maxHeight = 'calc(100svh - 16px - 16px)'
      p.style.overflowY = 'auto'
      p.style.display = 'flex'
      p.style.flexDirection = 'column'
      p.style.gap = '16px'
      const wrapper = document.createElement('div')
      wrapper.style.position = 'fixed'
      wrapper.style.bottom = '16px'
      wrapper.style.right = '16px'
      wrapper.style.opacity = '0'
      wrapper.className = 'backdrop-blur--lite'
      wrapper.style.transition = 'all 0.3s linear'
      wrapper.style.borderRadius = '16px'
      wrapper.appendChild(p)
      document.body.appendChild(wrapper)
      const cPointLabel = new CSS2DObject(wrapper)
      scene.add(cPointLabel);

      // -- PATFORM & CUBES
      let offsetX = inSI.getMeters(searchParamsNormalized.wagonLength) / 2.1
      let offsetY = 0
      // let offsetZ_cargoOnly = inSI.getMeters(searchParamsNormalized.wagonWidth) / 4
      let degToRad = (deg: number) => deg * Math.PI / 180;
      const wagonLengthSI = inSI.getMeters(searchParamsNormalized.wagonLength)
      const wagonWidthSI = inSI.getMeters(searchParamsNormalized.wagonWidth)
      const wagonHeightSI = inSI.getMeters(searchParamsNormalized.wagonHeight)
      const yxPlaneGeometry = new PlaneGeometry(wagonLengthSI, wagonWidthSI)
      // NOTE: The X axis is red. The Y axis is green. The Z axis is blue.

      // NOTE: материал для рисования (плоским или каркасным способом),
      // по умолчанию плоский, wireframe:true - каркасный        
      const yxPlaneMaterial = new MeshBasicMaterial({ color: 0xdddddd })
      // NOTE: 1.1 YX (green + red)
      const yxPlane = new Mesh(yxPlaneGeometry, yxPlaneMaterial)
      yxPlane.rotation.x = 0
      yxPlane.rotation.y = 0
      yxPlane.rotation.z = 0
      yxPlane.position.x = (wagonLengthSI / 2) - offsetX
      yxPlane.position.y = (wagonWidthSI / 2) + offsetY
      yxPlane.position.z = 0
      scene.add(yxPlane)
      // NOTE: 1.2 YZ (green + blue)
      const yzPlaneGeometry = new PlaneGeometry(wagonHeightSI, wagonWidthSI)
      const yzPlaneMaterial = new MeshBasicMaterial({ color: 0xdddddd })
      const yzPlane = new Mesh(yzPlaneGeometry, yzPlaneMaterial)
      yzPlane.rotation.x = 0
      yzPlane.rotation.y = degToRad(90)
      yzPlane.rotation.z = 0
      yzPlane.position.x = 0 - offsetX
      yzPlane.position.y = wagonWidthSI / 2 + offsetY
      yzPlane.position.z = wagonHeightSI / 2
      scene.add(yzPlane)
      // NOTE: 1.3 ZX (blue + red) - Пол
      const zxPlaneGeometry = new PlaneGeometry(wagonLengthSI, wagonHeightSI)
      const zxPlaneMaterial = new MeshBasicMaterial({ color: 0xd0d0d0 })
      const zxPlane = new Mesh(zxPlaneGeometry, zxPlaneMaterial)
      zxPlane.rotation.x = degToRad(-90)
      zxPlane.rotation.y = 0
      zxPlane.rotation.z = 0
      zxPlane.position.x = wagonLengthSI / 2 - offsetX
      zxPlane.position.y = 0 + offsetY
      zxPlane.position.z = wagonHeightSI / 2
      scene.add(zxPlane)
      const cargoLength: {[key: string]: number} = {}
      const cargoWidth: {[key: string]: number} = {}
      const cargoHeight: {[key: string]: number} = {}
      // const cargoWeight: {[key: string]: number} = {}
      const cargoAddSize: {[key: string]: number} = {} // #{addSize};
      const products = searchParamsNormalized.productList.map((product) => {
        const {
          id,
          length,
          width,
          height,
          weight,
          addSize,
        } = product;
        const cargoConfig = retail.inWagon({
          length,
          width,
          height,
          weight,
          addSize,
          maxInWagon: searchParamsNormalized?.maxInWagon,
          maxRowsInWagon_byWagonWidth: searchParamsNormalized?.maxRowsInWagon_byWagonWidth,
          maxRowsInWagon_byWagonLength: searchParamsNormalized?.maxRowsInWagon_byWagonLength,
          maxFloorsInWagon: searchParamsNormalized?.maxFloorsInWagon,
          wagon: {
            maxLength: searchParamsNormalized?.wagonLength,
            maxWidth: searchParamsNormalized?.wagonWidth,
            maxHeight: searchParamsNormalized?.wagonHeight,
            maxWeight: searchParamsNormalized?.wagonCarryingCapacity,
          }
        })
        cargoLength[id] = length
        cargoWidth[id] = width
        cargoHeight[id] = height
        cargoAddSize[id] = addSize
        
        return ({
          ...product,
          cargoConfig,
          horizontalOrientation: cargoConfig.horizontalOrientation,
        })
      })
      products.forEach(({
        id,
        width,
        // length,
        horizontalOrientation,
        // cargoConfig,
      }) => {
        // const cargoType = normalizedParams.cargoType
        // const modelName = normalizedParams.modelName
        // const { config, sizes } = cargoConfig
        // console.log(config)
        let _l_tpm = cargoLength[id]
        switch (horizontalOrientation) {
          case 'byLength':
            cargoLength[id] = _l_tpm;
            cargoWidth[id] = width;
            break;
          case 'byWidth':
            cargoLength[id] = width;
            cargoWidth[id] = _l_tpm;
            break;
          default:;
        }
      })

      const getCubeGeometry = (
        cargoLength: number,
        cargoWidth: number,
        cargoHeight: number,
      ) => new BoxGeometry(
        inSI.getMeters(cargoLength),
        inSI.getMeters(cargoWidth),
        inSI.getMeters(cargoHeight),
      );
      let _pcs = 0;// количество отображаемых кубиков
      const _fact_inWagon = {
        result: products.reduce((acc, { cargoConfig }) => acc + cargoConfig.result, 0),
        comment: 'In progress',
        sizes: { comment: 'In progress' },
      }
      if (!_fact_inWagon.result)
        throw new Error(`_fact_inWagon err! ${_fact_inWagon.comment}`)

      let mayBeOffsetY = 0
      let mayBeDowngradeOffsetX = 0
      let isCorrectCube = false
      let totalX = 0
      const group = new Group()
      const cubesData: {
        [key: string]: {
          target: Mesh;
          x: number;
          y: number;
          z: number;
          _details: any;
          descr: string;
        };
      } = {}
      products.forEach((
        { cargoConfig, id, name, comment, ...rest },
        // pi
      ) => {
        // const { config } = cargoConfig
        // const {
        //   specialConfig: {
        //     cargoWidth,
        //     cargoLength,
        //     cargoHeight,
        //     cargoAddSize
        //   },
        // } =  details
        for (let iX = 0; iX < 1; iX++) {
          // For each by X (red)
          let coordX = iX * inSI.getMeters(cargoLength[id]) + (inSI.getMeters(cargoLength[id]) / 2) + inSI.getMeters(cargoAddSize[id]);
          for (let iY = 0; iY < 1; iY++) {
            // For each by Y (green)
            let coordY = iY * inSI.getMeters(cargoHeight[id]) + (inSI.getMeters(cargoHeight[id]) / 2);
            for (let iZ = 0; iZ < 1; iZ++) {
              // For each by Z (blue)
              let coordZ = iZ * inSI.getMeters(cargoWidth[id]) + (inSI.getMeters(cargoWidth[id]) / 2) + (iZ + 1) * inSI.getMeters(cargoAddSize[id])
              let cubeMaterial
              if (
                _pcs >= _fact_inWagon.result
                || (searchParamsNormalized?.wagonWidth || 0) < (cargoWidth[id] + cargoAddSize[id])
                || (searchParamsNormalized?.maxInWagon || 0) <= _pcs
              ) {
                cubeMaterial = new MeshStandardMaterial({
                  color: 0xff7373,
                  emissive: '#ff7373',
                  wireframe: true,
                  metalness: 0.5,
                  roughness: 0.7,
                })
                isCorrectCube = false;
              } else {
                cubeMaterial = new MeshStandardMaterial({
                  color: 0x007bff,
                  emissive: '#007bff',
                  wireframe: true,
                  metalness: 0.3,
                  roughness: 0.7,
                });
                _pcs += 1;
                isCorrectCube = true;
              }
              
              let cube = new Mesh(getCubeGeometry(cargoLength[id], cargoWidth[id], cargoHeight[id]), cubeMaterial);
              cube.name = id
              cube.castShadow = true
              if (
                (mayBeOffsetY > 0 && ((inSI.getMeters(searchParamsNormalized?.wagonWidth || 0) - mayBeOffsetY) > inSI.getMeters(cargoWidth[id])))
                && ((mayBeDowngradeOffsetX - inSI.getMeters(cargoLength[id])) > 0)
              ) {
                cube.position.x = coordX - offsetX - mayBeDowngradeOffsetX;
                cube.position.z = coordZ + offsetY + mayBeOffsetY;
                mayBeOffsetY = 0
              } else {
                cube.position.x = coordX - offsetX;
                cube.position.z = coordZ + offsetY;
                mayBeOffsetY = inSI.getMeters(cargoWidth[id]) + inSI.getMeters(cargoAddSize[id])
                mayBeDowngradeOffsetX = inSI.getMeters(cargoLength[id]) + inSI.getMeters(cargoAddSize[id])
                if (isCorrectCube) {
                  // console.log(`-> correct: +${inSI.getMeters(cargoLength[id]).toFixed(2)} +${inSI.getMeters(cargoAddSize[id]).toFixed(2)} =${inSI.getMeters(cargoLength[id]) + inSI.getMeters(cargoAddSize[id])}`)
                  totalX += inSI.getMeters(cargoLength[id]) + inSI.getMeters(cargoAddSize[id])
                }
              }
              cube.position.y = coordY + offsetY
              scene.add(cube);
    
              const sphereMesh = createPointMesh({
                name,
                x: cube.position.x,
                y: cube.position.y,
                z: cube.position.z,
              })
              cubesData[name] = {
                target: cube,
                x: cube.position.x,
                y: cube.position.y,
                z: cube.position.z,
                descr: comment,
                _details: {
                  isCorrectCube, cargoConfig, id, name, comment, ...rest,
                },
              }
              group.add(sphereMesh)
            }
          }
    
          scene.add(group)
        }
    
        const mousePos = new Vector2()
        const raycaster = new Raycaster()

        function tooltipHandler (e: any) {
          switch (e.button) {
            case 0: // NOTE: Left click
            // case 2: // NOTE: Right click
              mousePos.x = (e.clientX / innerWidth) * 2 - 1
              mousePos.y = -(e.clientY / innerHeight) * 2 + 1
              raycaster.setFromCamera(mousePos, camera)
              const intersects = raycaster.intersectObject(group, true)
              const cleanup = () => {
                for (const cubeKey in cubesData) {
                  const { target } = cubesData[cubeKey]
                  // @ts-ignore
                  target.material.wireframe = true
                }
              }
              cleanup()

              if (intersects.length > 0) {
                // @ts-ignore
                if (!!intersects[0].object.name && !!cubesData[intersects[0].object.name]) {
                  // @ts-ignore
                  // cPointLabel.position.set(cubesData[intersects[0].object.name].x, cubesData[intersects[0].object.name].y, cubesData[intersects[0].object.name].z)
                  // cPointLabel.position.set(1, 1, 1)
                  p.className = 'tooltip--active'
                  // p.textContent = intersects[0].object.name
                  const { _details, target } = cubesData[intersects[0].object.name]
                  p.innerHTML = `<h3>${_details.name}</h3><pre style="white-space:pre-wrap;overflow-wrap:break-word;">${JSON.stringify(_details, null, 2)}</pre>`
                  wrapper.style.opacity = '1'
                  // @ts-ignore
                  target.material.wireframe = false
                  if (_details.isCorrectCube) p.style.borderColor = '#007bff'
                  else p.style.borderColor = '#ff7373'
                }
              } else {
                p.className = 'tooltip--hidden'
                p.textContent = 'OFF'
                p.style.borderColor = 'transparent'
                wrapper.style.opacity = '0'
              }
              break
            case 1: // NOTE: Wheel click
              break
            default:
              break
          }
        }

        window.removeEventListener('mousedown', tooltipHandler)
        window.addEventListener('mousedown', tooltipHandler)
    
        if (mayBeOffsetY !== 0) offsetX -= inSI.getMeters(cargoLength[id]) + inSI.getMeters(cargoAddSize[id])
        
        mayBeDowngradeOffsetX = inSI.getMeters(cargoLength[id]) + inSI.getMeters(cargoAddSize[id])
      })
      showNotif({
        type: 'success',
        title: 'Ok',
        description: `totalX is ${totalX.toFixed(2)} m`,
      })
      // --

      // const sideLength = 1
      // const cubeGeometry = new BoxGeometry(sideLength, sideLength, sideLength)
      // const cubeMaterial = new MeshStandardMaterial({
      //   color: '#f69f1f',
      //   metalness: 0.5,
      //   roughness: 0.7,
      // })
      // cube = new Mesh(cubeGeometry, cubeMaterial)
      // cube.castShadow = true
      // cube.position.y = 0.5

      const planeGeometry = new PlaneGeometry(1, 1)
      const planeMaterial = new MeshLambertMaterial({
        color: 'gray',
        emissive: 'teal',
        emissiveIntensity: 0.2,
        side: 2,
        transparent: true,
        opacity: 0.4,
      })
      plane = new Mesh(planeGeometry, planeMaterial)
      plane.rotateX(Math.PI / 2)
      plane.receiveShadow = true

      plane.position.y = -0.5

      // scene.add(cube)
      scene.add(plane)
    }

    // ===== 🎥 CAMERA =====
    {
      camera = new PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
      camera.position.set(5, 8, 10)
    }

    // ===== 🕹️ CONTROLS =====
    {
      cameraControls = new OrbitControls(camera, canvas)
      cameraControls.target = plane.position.clone()
      cameraControls.enableDamping = true
      cameraControls.autoRotate = false
      cameraControls.update()

      dragControls = new DragControls([plane], camera, renderer.domElement)
      dragControls.addEventListener('hoveron', (event) => {
        // event.object.material.emissive.set('orange')
        console.log(event.object)
      })
      dragControls.addEventListener('hoveroff', (event) => {
        // event.object.material.emissive.set('black')
        console.log(event.object)
      })
      dragControls.addEventListener('dragstart', (event) => {
        cameraControls.enabled = false
        animation.play = false

        // event.object.material.emissive.set('black')
        // event.object.material.opacity = 0.7
        // event.object.material.needsUpdate = true
        console.log(event.object)
      })
      dragControls.addEventListener('dragend', (event) => {
        cameraControls.enabled = true
        animation.play = true
        // event.object.material.emissive.set('black')
        // event.object.material.opacity = 1
        // event.object.material.needsUpdate = true
        console.log(event.object)
      })
      dragControls.enabled = false

      // Full screen
      window.addEventListener('dblclick', (event) => {
        if (event.target === canvas) {
          toggleFullScreen(canvas)
        }
      })
    }

    // ===== 🪄 HELPERS =====
    {
      axesHelper = new AxesHelper(4)
      axesHelper.visible = false
      scene.add(axesHelper)

      pointLightHelper = new PointLightHelper(pointLight, undefined, 'orange')
      pointLightHelper.visible = false
      scene.add(pointLightHelper)

      const gridHelper = new GridHelper(20, 20, 'teal', 'darkgray')
      gridHelper.position.y = -0.01
      scene.add(gridHelper)
    }

    // ===== 📈 STATS & CLOCK =====
    {
      clock = new Clock()
      stats = new Stats()
      document.body.appendChild(stats.dom)
    }

    // ==== 🐞 DEBUG GUI ====
    // {
    //   gui = new GUI({ title: '🐞 Debug GUI', width: 300 })

    //   const cubeOneFolder = gui.addFolder('Cube one')

    //   cubeOneFolder.add(cube.position, 'x').min(-5).max(5).step(0.5).name('pos x')
    //   cubeOneFolder.add(cube.position, 'y').min(-5).max(5).step(0.5).name('pos y')
    //   cubeOneFolder.add(cube.position, 'z').min(-5).max(5).step(0.5).name('pos z')

    //   cubeOneFolder.add(cube.material, 'wireframe')
    //   cubeOneFolder.addColor(cube.material, 'color')
    //   cubeOneFolder.add(cube.material, 'metalness', 0, 1, 0.1)
    //   cubeOneFolder.add(cube.material, 'roughness', 0, 1, 0.1)

    //   cubeOneFolder.add(cube.rotation, 'x', -Math.PI * 2, Math.PI * 2, Math.PI / 4).name('rotate x')
    //   cubeOneFolder.add(cube.rotation, 'y', -Math.PI * 2, Math.PI * 2, Math.PI / 4).name('rotate y')
    //   cubeOneFolder.add(cube.rotation, 'z', -Math.PI * 2, Math.PI * 2, Math.PI / 4).name('rotate z')

    //   cubeOneFolder.add(animation, 'enabled').name('animated')

    //   const controlsFolder = gui.addFolder('Controls')
    //   controlsFolder.add(dragControls, 'enabled').name('drag controls')

    //   const lightsFolder = gui.addFolder('Lights')
    //   lightsFolder.add(pointLight, 'visible').name('point light')
    //   lightsFolder.add(ambientLight, 'visible').name('ambient light')

    //   const helpersFolder = gui.addFolder('Helpers')
    //   helpersFolder.add(axesHelper, 'visible').name('axes')
    //   helpersFolder.add(pointLightHelper, 'visible').name('pointLight')

    //   const cameraFolder = gui.addFolder('Camera')
    //   cameraFolder.add(cameraControls, 'autoRotate')

    //   // persist GUI state in local storage on changes
    //   gui.onFinishChange(() => {
    //     const guiState = gui.save()
    //     localStorage.setItem('guiState', JSON.stringify(guiState))
    //   })

    //   // load GUI state if available in local storage
    //   const guiState = localStorage.getItem('guiState')
    //   if (guiState) gui.load(JSON.parse(guiState))

    //   // reset GUI state button
    //   const resetGui = () => {
    //     localStorage.removeItem('guiState')
    //     gui.reset()
    //   }
    //   gui.add({ resetGui }, 'resetGui').name('RESET')

    //   gui.close()
    // }
  } catch (err: any) {
    showNotif({ type: 'error', title: 'Oops...', description: err?.message || 'Что-то пошло не так' })
  }
}

function animate() {
  requestAnimationFrame(animate)

  stats.update()

  if (animation.enabled && animation.play) {
    animations.rotate(plane, clock, Math.PI / 3)
    animations.bounce(plane, clock, 1, 0.5, 0.5)
  }

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }

  cameraControls.update()

  renderer.render(scene, camera)
}
